---
title: Markdown常用语法指南
date: 2025-04-08 22:42:18
category: 技术
tags: [Markdown, 写作]
cover: /img/抽象2.jpg
toc: true
mathjax: false
---
![](/img/抽象2.jpg)
# Markdown常用语法指南

> 写这篇文章的初衷是记录自己常用的Markdown语法，免得每次都要查。虽然现在有AI，但自己记住一些基础的东西还是很有必要的。

## 一、基础语法

### 1. 标题
```markdown
# 一级标题
## 二级标题
### 三级标题
#### 四级标题
```

### 2. 文本格式
```markdown
*斜体* 或 _斜体_
**粗体** 或 __粗体__
~~删除线~~
`代码`
```

### 3. 列表
```markdown
- 无序列表
  - 子列表
  - 子列表
1. 有序列表
2. 第二项
3. 第三项
```

### 4. 引用
```markdown
> 引用内容
>> 嵌套引用
```

### 5. 代码块
```markdown
```python
def hello():
    print("Hello, World!")
```
```

## 二、进阶语法

### 1. 表格
```markdown
| 表头1 | 表头2 |
|-------|-------|
| 内容1 | 内容2 |
| 内容3 | 内容4 |
```

### 2. 链接和图片
```markdown
[链接文本](链接地址)
![图片描述](图片地址)

<img src="图片地址" width="50%" height="50%" alt="图片描述">
```

### 3. 分割线
```markdown
---
或
***
或
___
```

### 4. 任务列表
```markdown
- [ ] 未完成任务
- [x] 已完成任务
```

## 三、Hexo博客特殊语法

### 1. 文章头部配置
```markdown
---
title: 文章标题
date: 2024-04-02
category: 技术
tags: [标签1, 标签2]
cover: /img/cover.jpg
toc: true
mathjax: false
---
```

### 2. 图片居中显示
```markdown
<div align="center">
  <img src="/img/posts/图片名称.jpg" width="50%" alt="图片描述">
</div>
```

### 3. 图片画廊
```markdown
<div class="gallery-group-main">
  <div class="gallery-group">
    <div class="gallery-group-img">
      <img src="/img/posts/图片1.jpg" alt="图片1">
    </div>
    <div class="gallery-group-img">
      <img src="/img/posts/图片2.jpg" alt="图片2">
    </div>
  </div>
</div>
```

## 四、实用技巧

### 1. 快捷键
- 标题：Ctrl + 1~6
- 加粗：Ctrl + B
- 斜体：Ctrl + I
- 引用：Ctrl + Q
- 代码块：Ctrl + K

### 2. 常用组合
```markdown
> **提示：** 这是一个提示框
> **注意：** 这是一个注意框
> **警告：** 这是一个警告框
```

### 3. 数学公式
```markdown
$E = mc^2$
$$
\frac{n!}{k!(n-k)!} = \binom{n}{k}
$$
```

## 五、常见问题

### 1. 转义字符
```markdown
\* 这不是斜体 \*
\` 这不是代码 \`
```

### 2. 空格处理
```markdown
&nbsp;  # 不换行空格
<br>    # 换行
```

### 3. 特殊字符
```markdown
&copy;  # 版权符号
&reg;   # 注册商标
&trade; # 商标
```

## 六、个人经验

没什么想说的，死脑子总是忘
AI真好使，后记是他AI自己发挥的。

## 后记

> 写这篇文章的时候，我发现自己对Markdown的了解其实很有限。很多高级功能都没用过，比如数学公式、任务列表等。不过没关系，先记住常用的，其他的需要时再查。

> 就像建站一样，不要追求完美，先写出来再说。这篇文章可能不够全面，但对我来说已经够用了。以后遇到新的语法，再补充就是了。

> 最后，希望这篇文章能帮助到和我一样在写博客的朋友。如果有什么错误或遗漏的地方，欢迎指出。

![](/img/窗外蓝天与绿树.jpg)

---

```

