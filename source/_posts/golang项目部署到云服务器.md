---
title: golang项目部署到云服务器
date: 2025-05-10 16:25:50
tags:
    - Golang
    - 服务器
---

# Golang项目部署到云服务器详细教程

项目部署到云服务器的过程包括本地编译、文件上传、服务器配置和后台运行等步骤。

## 1. 本地编译

在Windows环境下，我们需要先配置交叉编译环境，以便生成Linux系统可执行文件：

```powershell
# 配置编译环境
set GOOS=linux  #设置编译目标系统为Linux
set GOARCH=amd64 #设置编译目标的指令集架构为64位 x86架构

# 执行编译
go build -o huancuilou  # 生成名为huancuilou的可执行文件
```

编译完成后，会在当前目录生成`huancuilou`可执行文件。

## 2. 文件上传

1. 登录宝塔面板
2. 在文件管理器中找到目标目录（通常是`/www/wwwroot/default`）
3. 将编译好的`huancuilou`文件上传到该目录

## 3. 服务器配置

### 3.1 运行程序

通过SSH连接到服务器，执行以下命令：

```bash
# 进入项目目录
cd /www/wwwroot/default

# 查看文件是否存在
ls

# 运行程序
./huancuilou
```

### 3.2 处理端口占用

如果遇到端口被占用的情况，可以使用以下命令：

```bash
# 查看占用端口的进程
lsof -i:8080

# 终止占用端口的进程
kill -9 [进程ID]
```

## 4. 配置后台运行

为了确保程序在服务器重启或面板关闭后仍能继续运行，我们需要创建一个后台运行脚本：

1. 创建运行脚本：
```bash
vim run.sh
```

2. 在脚本中添加以下内容：
```bash
nohup ./huancuilou >output.log 2>&1 &
```

这个命令的含义：
- `nohup`: 使进程忽略所有挂断（SIGHUP）信号
- `>output.log`: 将标准输出重定向到output.log文件
- `2>&1`: 将标准错误也重定向到标准输出
- `&`: 在后台运行

3. 保存并退出vim：
- 按`Esc`键确保在英文输入状态
- 输入`:wq`保存并退出

4. 给脚本添加执行权限：
```bash
chmod +x run.sh
```

5. 运行脚本：
```bash
./run.sh
```

6. 验证程序是否在后台运行：
```bash
ps -ef | grep huancuilou
```

## 5. 注意事项

1. 确保服务器防火墙已开放相应端口
2. 定期检查日志文件大小，必要时进行日志轮转
3. 建议配置监控，及时发现程序异常
4. 重要数据建议配置备份机制

## 6. 常见问题排查

1. 程序无法启动
   - 检查文件权限
   - 检查端口占用
   - 查看错误日志

2. 程序意外退出
   - 检查系统资源使用情况
   - 查看程序日志
   - 确认是否有内存泄漏

3. 性能问题
   - 使用`top`命令监控系统资源
   - 检查程序日志中的性能相关信息
   - 考虑是否需要优化代码或增加服务器配置

## 7. 其他部署方式

除了上述直接部署的方式外，还有以下几种常用的部署方案：

### 7.1 Docker容器化部署

1. 创建Dockerfile：
```dockerfile
FROM golang:1.21-alpine AS builder
WORKDIR /app
COPY . .
RUN go build -o main .

FROM alpine:latest
WORKDIR /app
COPY --from=builder /app/main .
EXPOSE 8080
CMD ["./main"]
```

2. 构建和运行Docker镜像：
```bash
# 构建镜像
docker build -t myapp .

# 运行容器
docker run -d -p 8080:8080 myapp
```

优点：
- 环境隔离，避免依赖冲突
- 部署简单，一次构建到处运行
- 便于版本管理和回滚
- 资源利用率高

缺点：
- 需要学习Docker相关知识
- 镜像体积可能较大
- 需要额外的Docker环境

### 7.2 使用Supervisor进程管理

1. 安装Supervisor：
```bash
apt-get install supervisor
```

2. 创建配置文件：
```ini
[program:myapp]
directory=/www/wwwroot/default
command=/www/wwwroot/default/huancuilou
autostart=true
autorestart=true
stderr_logfile=/var/log/myapp.err.log
stdout_logfile=/var/log/myapp.out.log
```

3. 启动服务：
```bash
supervisorctl update
supervisorctl start myapp
```

优点：
- 进程管理更专业
- 自动重启功能
- 日志管理更完善
- 可以管理多个进程

缺点：
- 配置相对复杂
- 需要额外安装Supervisor
- 仅适用于进程管理

### 7.3 使用Systemd服务

1. 创建服务文件：
```ini
[Unit]
Description=My Golang Application
After=network.target

[Service]
Type=simple
User=root
WorkingDirectory=/www/wwwroot/default
ExecStart=/www/wwwroot/default/huancuilou
Restart=always

[Install]
WantedBy=multi-user.target
```

2. 启动服务：
```bash
systemctl enable myapp
systemctl start myapp
```

优点：
- 系统级服务管理
- 开机自启动
- 完善的日志系统
- 系统集成度高

缺点：
- 配置相对复杂
- 需要root权限
- 仅适用于Linux系统

## 8. 部署方式对比

| 部署方式 | 优点 | 缺点 | 适用场景 |
|---------|------|------|----------|
| 直接部署 | 简单直接，无需额外配置 | 进程管理不够完善，重启需要手动操作 | 小型项目，快速部署 |
| Docker部署 | 环境隔离，部署简单，便于管理 | 需要Docker环境，学习成本较高 | 微服务架构，需要环境隔离的项目 |
| Supervisor | 进程管理专业，自动重启，日志完善 | 仅适用于进程管理，配置较复杂 | 需要稳定运行的生产环境 |
| Systemd | 系统级服务管理，开机自启动 | 仅适用于Linux，需要root权限 | 系统级服务，需要开机自启动的项目 |

## 9. 选择建议

1. 小型项目或快速原型：
   - 推荐使用直接部署方式
   - 简单直接，快速上线

2. 微服务架构：
   - 推荐使用Docker部署
   - 便于服务管理和扩展

3. 生产环境：
   - 推荐使用Supervisor或Systemd
   - 提供更完善的进程管理和监控

4. 系统服务：
   - 推荐使用Systemd
   - 与系统深度集成

