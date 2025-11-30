---
title: linux初体验
date: 2025-05-10 16:43:31
tags:
    - WSL
    - Ubuntu
    - Vim
    - 开发环境
---

# WSL、Ubuntu和Vim使用指南

本文将详细介绍如何在Windows系统中使用WSL（Windows Subsystem for Linux）安装Ubuntu，以及如何使用Vim编辑器进行开发。

## 1. WSL安装与配置

### 1.1 启用WSL功能

在Windows中启用WSL功能有两种方式：

1. 使用PowerShell（管理员权限）：
```powershell
dism.exe /online /enable-feature /featurename:Microsoft-Windows-Subsystem-Linux /all /norestart
dism.exe /online /enable-feature /featurename:VirtualMachinePlatform /all /norestart
```

2. 通过Windows功能：
   - 打开"控制面板"
   - 进入"程序和功能"
   - 点击"启用或关闭Windows功能"
   - 勾选"适用于Linux的Windows子系统"

### 1.2 安装Ubuntu

1. 从Microsoft Store安装Ubuntu：
   - 打开Microsoft Store
   - 搜索"Ubuntu"
   - 选择最新版本（如Ubuntu 22.04 LTS）
   - 点击"获取"或"安装"

2. 首次启动配置：
   - 启动Ubuntu
   - 创建用户名和密码
   - 等待系统初始化完成

## 2. Ubuntu基础使用

### 2.1 系统更新

```bash
# 更新软件包列表
sudo apt update

# 升级已安装的软件包
sudo apt upgrade

# 清理不需要的软件包
sudo apt autoremove
```

### 2.2 常用命令

```bash
# 查看当前目录
pwd

# 列出文件
ls
ls -l    # 详细信息
ls -a    # 显示隐藏文件

# 切换目录
cd /path/to/directory
cd ..    # 返回上级目录
cd ~     # 返回家目录

# 创建目录
mkdir directory_name

# 删除文件/目录
rm file_name
rm -r directory_name    # 递归删除目录
```

## 3. Vim编辑器使用

### 3.1 安装Vim

```bash
sudo apt install vim
```

### 3.2 Vim基础操作

#### 3.2.1 模式切换
- 普通模式（默认）：按`Esc`键
- 插入模式：按`i`键
- 可视模式：按`v`键
- 命令模式：按`:`键

#### 3.2.2 基本命令
```vim
# 文件操作
:w          # 保存文件
:q          # 退出
:wq         # 保存并退出
:q!         # 强制退出不保存

# 光标移动
h           # 左移
j           # 下移
k           # 上移
l           # 右移
0           # 行首
$           # 行尾
gg          # 文件开头
G           # 文件末尾

# 编辑操作
dd          # 删除当前行
yy          # 复制当前行
p           # 粘贴
u           # 撤销
Ctrl+r      # 重做
```

### 3.3 Vim配置

创建或编辑`~/.vimrc`文件：

```bash
vim ~/.vimrc
```

常用配置示例：
```vim
" 显示行号
set number

" 语法高亮
syntax on

" 自动缩进
set autoindent

" 显示匹配的括号
set showmatch

" 搜索时忽略大小写
set ignorecase

" 设置缩进为4个空格
set tabstop=4
set shiftwidth=4
set expandtab

" 显示状态行
set laststatus=2

" 设置主题
colorscheme desert
```

## 4. 开发环境配置

### 4.1 安装开发工具

```bash
# 安装编译工具
sudo apt install build-essential

# 安装Git
sudo apt install git

# 安装Python
sudo apt install python3 python3-pip

# 安装Node.js
curl -fsSL https://deb.nodesource.com/setup_lts.x | sudo -E bash -
sudo apt install nodejs
```

### 4.2 配置Git

```bash
# 配置用户名和邮箱
git config --global user.name "Your Name"
git config --global user.email "your.email@example.com"

# 生成SSH密钥
ssh-keygen -t rsa -b 4096
```

## 5. 实用技巧

### 5.1 WSL与Windows文件系统互访

- Windows访问WSL文件：`\\wsl$\Ubuntu\`
- WSL访问Windows文件：`/mnt/c/`

### 5.2 Vim插件管理

推荐使用Vim插件管理器（如vim-plug）：

```bash
# 安装vim-plug
curl -fLo ~/.vim/autoload/plug.vim --create-dirs \
    https://raw.githubusercontent.com/junegunn/vim-plug/master/plug.vim
```

在`.vimrc`中添加插件：
```vim
call plug#begin('~/.vim/plugged')
Plug 'preservim/nerdtree'
Plug 'vim-airline/vim-airline'
Plug 'vim-airline/vim-airline-themes'
call plug#end()
```

安装插件：
```vim
:PlugInstall
```

## 6. 常见问题解决

1. WSL启动失败
   - 检查Windows功能是否启用
   - 重启WSL：`wsl --shutdown`
   - 重置WSL：`wsl --unregister Ubuntu`

2. Vim中文乱码
   - 在`.vimrc`中添加：
   ```vim
   set encoding=utf-8
   set fileencoding=utf-8
   set termencoding=utf-8
   ```

3. 权限问题
   - 使用`sudo`执行需要权限的命令
   - 修改文件权限：`chmod`
   - 修改文件所有者：`chown`

## 7. 进阶建议

1. 使用WSL2而不是WSL1
   - 更好的性能
   - 完整的Linux内核
   - 更好的系统调用兼容性

2. 配置WSL的默认版本
```powershell
wsl --set-default-version 2
```

3. 使用Windows Terminal
   - 更好的终端体验
   - 多标签支持
   - 自定义主题

4. 配置Vim为IDE
   - 使用插件增强功能
   - 配置代码补全
   - 设置代码格式化
