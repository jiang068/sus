# 🔗 短链接跳转服务

一个简洁美观的短链接跳转服务，支持自定义短链接映射和倒计时跳转功能。

## ✨ 特性

- 🚀 **快速跳转**：支持自定义短链接到长链接的映射
- ⏰ **倒计时跳转**：5秒倒计时后自动跳转，提升用户体验
- 📋 **一键复制**：支持复制原始链接到剪贴板
- 🎨 **现代化UI**：渐变背景、圆角设计、响应式布局
- 🔒 **安全设计**：使用Base64编码隐藏数据文件名
- 📱 **兼容性强**：支持各种浏览器和设备

## 🚀 快速开始

### 1. 部署文件

将以下文件上传到你的网站根目录：

```
├── index.html      # 主页面
├── script.js       # 核心逻辑
├── style.css       # 样式文件
└── links.txt       # 链接映射文件
```

### 2. 配置链接映射

编辑 `links.txt` 文件，格式为：`短链接,长链接`

```
abc,https://www.bilibili.com
tf,https://live.bilibili.com/22603245
gi,https://example.com/very-long-url
```

### 📝 links.txt 配置示例

**基础示例：**
```
# 常用网站
bili,https://www.bilibili.com
gh,https://github.com
blog,https://myblog.com
```

**复杂URL示例：**
```
# 带参数的长链接
search,https://www.google.com/search?q=短链接服务&hl=zh-CN
file,https://drive.google.com/file/d/1BxiMVs0XRA5nFMdKvBdBZjgmUUqptlbs74OgvE2upms/view?usp=sharing
```

**实际应用示例：**
```
# 工作相关
docs,https://project-docs.readthedocs.io
meeting,https://zoom.us/j/123456789
survey,https://forms.google.com/survey123
```

### 3. 访问短链接

访问 `https://yourdomain.com/abc` 即可跳转到对应的长链接。

## 📖 使用说明

### 链接映射文件格式

`links.txt` 文件中每行一个映射关系：
```
短链接代码,完整的目标URL
```

**格式要求：**
- 短链接代码不要包含逗号、空格或特殊字符
- 建议使用字母、数字、短横线组合
- 如果目标URL包含逗号，程序会自动处理
- 空行和以 `#` 开头的注释行会被忽略
- 建议短链接代码简短易记（2-10个字符）

**推荐命名规则：**
```
# 按类别分组
social-*     # 社交媒体：social-bili, social-wb
dev-*        # 开发工具：dev-gh, dev-vsc
work-*       # 工作相关：work-docs, work-meet
personal-*   # 个人链接：personal-blog, personal-cv
```

### 自定义数据文件名

为了安全考虑，链接数据文件名使用了Base64编码。

**当前配置：**
```
原始文件名 → Base64编码
links.txt → bGlua3MudHh0
```

**修改文件名的步骤：**
1. 将新文件名进行Base64编码
2. 在 `script.js` 中找到 `encryptedName` 变量
3. 替换为新的Base64编码值

**Base64编码工具：**
- 在线工具：https://www.base64encode.org/
- JavaScript编码：`btoa("文件名")`
- JavaScript解码：`atob("编码后的字符串")`

**编码示例：**
```
data.cfg → ZGF0YS5jZmc=
config.json → Y29uZmlnLmpzb24=
secret.txt → c2VjcmV0LnR4dA==
```

## 🎯 功能详解

### 跳转页面

当用户访问短链接时，会显示一个美观的跳转页面，包含：
- 短链接信息展示
- 目标链接预览
- 5秒倒计时自动跳转
- 手动复制链接功能
- 进度条显示

### 错误处理

- 短链接不存在：显示"杂鱼~这里还什么都没有哦~"
- 文件加载失败：显示"被你玩坏了！去找我主人！"
- 网络错误：显示网络错误提示

### 兼容性

- 支持HTTP和HTTPS协议
- 兼容各种浏览器的复制功能
- 响应式设计，适配移动设备

## 🔧 技术栈

- **前端**：原生HTML5 + CSS3 + JavaScript
- **样式**：CSS渐变、Flexbox布局、响应式设计
- **安全**：Base64编码、XSS防护
- **兼容**：支持现代浏览器和传统浏览器

## 📝 自定义配置

### 修改倒计时时间

在 `script.js` 中找到 `startCountdown` 函数，修改初始倒计时值：

```javascript
let countdown = 5; // 修改为你想要的秒数
```

### 自定义样式

修改 `style.css` 文件中的样式变量：
- 背景渐变：`background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);`
- 主题色：`#667eea`
- 圆角大小：`border-radius: 15px;`

### 错误信息自定义

在 `script.js` 中修改错误提示信息：
```javascript
document.write("杂鱼~这里还什么都没有哦~");  // 404错误
document.write("被你玩坏了！去找我主人！");    // 服务器错误
```

## 🚨 注意事项

1. **安全性**：不要在链接映射文件中包含敏感信息
2. **性能**：链接映射文件不宜过大，建议控制在合理范围内
3. **维护**：定期检查和清理无效的链接映射
4. **备份**：建议定期备份链接映射文件

## 📄 许可证

MIT License - 自由使用和修改。

---

**注意：** 此README文件仅用于项目说明，不需要上传到网站目录。
