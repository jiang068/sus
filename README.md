# 🔗 短链接跳转服务

一个简洁美观的短链接跳转服务，支持自定义短链接映射和倒计时跳转功能。

## ✨ 特性

- 🚀 **快速跳转**：支持自定义短链接到长链接的映射
- ⏰ **倒计时跳转**：可配置倒计时后自动跳转，提升用户体验
- 📋 **一键复制**：支持复制原始链接到剪贴板
- 🎨 **现代化UI**：渐变背景、圆角设计、响应式布局
- 🔒 **安全设计**：使用Base64编码隐藏数据文件名
- 📱 **兼容性强**：支持各种浏览器和设备

## 🚀 快速开始

### 1. 部署文件

#### 标准部署（根目录）
将以下文件上传到你的网站根目录：

```
├── index.html      # 主页面
├── script.js       # 核心逻辑
├── style.css       # 样式文件
└── links.txt       # 链接映射文件
```

#### WordPress环境部署
如果在WordPress环境中部署，需要：
1. 将项目文件放在子目录（如 `t` 目录）
2. 修改WordPress根目录的 `.htaccess` 文件

**WordPress多站点网络配置：**
```apache
RewriteEngine On
RewriteRule .* - [E=HTTP_AUTHORIZATION:%{HTTP:Authorization}]
RewriteBase /

# 短链接系统规则（添加在WordPress规则之前）
# 如果请求的是t目录下的具体文件，直接访问
RewriteCond %{REQUEST_FILENAME} -f
RewriteCond %{REQUEST_URI} ^/t/
RewriteRule ^.*$ - [L]

# 如果请求的是t目录下的目录，直接访问
RewriteCond %{REQUEST_FILENAME} -d
RewriteCond %{REQUEST_URI} ^/t/
RewriteRule ^.*$ - [L]

# 对于t目录下的其他请求（短链接），重定向到t/index.html
RewriteRule ^t/(.*)$ t/index.html [L]

# 以下是原有的WordPress多站点规则
RewriteRule ^index\.php$ - [L]

# add a trailing slash to /wp-admin
RewriteRule ^([_0-9a-zA-Z-]+/)?wp-admin$ $1wp-admin/ [R=301,L]

RewriteCond %{REQUEST_FILENAME} -f [OR]
RewriteCond %{REQUEST_FILENAME} -d
RewriteRule ^ - [L]
RewriteRule ^([_0-9a-zA-Z-]+/)?(wp-(content|admin|includes).*) $2 [L]
RewriteRule ^([_0-9a-zA-Z-]+/)?(.*\.php)$ $2 [L]
RewriteRule . index.php [L]
```

**⚠️ 重要提示：**
- 短链接规则必须放在WordPress规则之前
- 将 `t` 替换为你的实际目录名
- 备份原有的 `.htaccess` 文件

### 2. 配置链接映射

编辑 `links.txt` 文件，格式为：`短链接,长链接`

```
abc,https://www.bilibili.com
tf,https://live.bilibili.com/22603245
gi,https://example.com/very-long-url
```

### 3. 访问短链接

**标准部署（根目录）：**
- 访问 `https://yourdomain.com/` 进入主页，系统会自动处理短链接

**WordPress环境（子目录）：**
- `https://yourdomain.com/t/abc` → 跳转到对应链接

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
- 建议短链接代码简短易记（2-10个字符）

### 自定义数据文件名

为了安全考虑，链接数据文件名使用了Base64编码。当前配置：`links.txt → bGlua3MudHh0`

**修改文件名的步骤：**
1. 将新文件名进行Base64编码
2. 在 `script.js` 中找到 `encryptedName` 变量
3. 替换为新的Base64编码值

## 🎯 功能详解

### 跳转页面

当用户访问短链接时，会显示一个美观的跳转页面，包含：
- 短链接信息展示
- 目标链接预览
- 可配置倒计时自动跳转
- 手动复制链接功能
- 进度条显示

### 错误处理

- 短链接不存在：显示"杂鱼~这里还什么都没有哦~"
- 文件加载失败：显示"被你玩坏了！去找我主人！"
- 网络错误：显示网络错误提示

## 🔧 自定义配置

### 修改倒计时时间

在 `script.js` 文件顶部修改：

```javascript
const COUNTDOWN_SECONDS = 3; // 修改为你想要的秒数
```

### 自定义样式

修改 `style.css` 文件中的关键样式：
- 背景渐变：`background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);`
- 主题色：`#667eea`
- 圆角大小：`border-radius: 15px;`

### 错误信息自定义

在 `script.js` 中修改错误提示信息：
```javascript
createErrorPage("杂鱼~这里还什么都没有哦~");  // 404错误
createErrorPage("被你玩坏了！去找我主人！");    // 服务器错误
```

## 🚨 注意事项

### 通用注意事项
1. **安全性**：不要在链接映射文件中包含敏感信息
2. **性能**：链接映射文件不宜过大
3. **维护**：定期检查和清理无效的链接映射
4. **备份**：建议定期备份链接映射文件

### WordPress环境特殊注意事项
1. **规则顺序**：短链接重写规则必须放在WordPress规则之前
2. **缓存清理**：修改 `.htaccess` 后需要清除WordPress缓存
3. **权限检查**：确保项目目录有正确的读取权限
4. **插件冲突**：某些缓存或SEO插件可能影响重写规则
5. **多站点网络**：使用上述完整配置适用于WordPress多站点网络

---

**注意：** 此README文件仅用于项目说明，不需要上传到网站目录。
