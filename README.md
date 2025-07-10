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

### 1. 部署方式

## 🖥️ 标准服务器部署（推荐）

### 适用场景
- 自有服务器或VPS
- 虚拟主机
- 现代静态托管服务（Vercel、Netlify、Cloudflare Pages等）

### 部署步骤

1. **准备服务器环境**
   - 确保服务器支持静态文件托管
   - 建议支持自定义404页面

2. **上传文件到根目录**
   将以下文件上传到网站根目录：
   ```
   ├── index.html      # 主页面
   ├── script.js       # 核心逻辑
   ├── style.css       # 样式文件
   └── links.txt       # 链接映射文件
   ```

3. **配置服务器（根据环境选择）**
   
   **方式A：现代托管服务（推荐）**
   - 大多数现代托管服务自动支持SPA路由
   - 包括：Vercel、Netlify、Cloudflare Pages等
   - 无需任何配置，直接上传4个文件即可
   
   **方式B：传统服务器需要配置**
   
   **Apache服务器(.htaccess)**：
   ```apache
   RewriteEngine On
   RewriteCond %{REQUEST_FILENAME} !-f
   RewriteCond %{REQUEST_FILENAME} !-d
   RewriteRule ^(.*)$ index.html [L]
   ```
   
   **Nginx配置**：
   ```nginx
   location / {
       try_files $uri $uri/ /index.html;
   }
   ```
   
   **WordPress环境（子目录部署）**：
   如果在WordPress环境中部署，需要将项目文件放在子目录（如 `t` 目录），然后在WordPress根目录的 `.htaccess` 文件中添加：
   ```apache
   # 短链接系统规则（添加在WordPress规则之前）
   RewriteRule ^t/(.*)$ t/index.html [L]
   ```
   注意：将 `t` 替换为你的实际目录名，并备份原有的 `.htaccess` 文件。
   
   **方式C：使用404.html（兜底方案）**
   - 如果以上方式都不适用
   - 添加404.html文件到根目录
   - 适用于不支持SPA路由的传统主机

4. **访问短链接**
   - 访问：`https://yourdomain.com/短链接`
   - 例如：`https://example.com/abc`

### 标准部署说明
- **最佳选择**：现代托管服务（4个文件，零配置）
- **传统服务器**：需要配置URL重写规则
- **兜底方案**：添加404.html（5个文件，适用于任何环境）
- **建议**：先尝试直接上传4个文件，如果短链接无法访问再考虑其他方式

---

## 🌐 GitHub Pages 部署

### 特点
- ✅ 免费托管
- ✅ 自动HTTPS
- ✅ 支持自定义域名
- ✅ 支持404重定向
- ✅ CDN加速

### 部署步骤

1. **创建GitHub仓库**
   - 登录GitHub，创建新仓库（如：`sus`）
   - 可以选择公开或私有仓库

2. **上传项目文件**
   将以下文件上传到仓库根目录：
   ```
   ├── index.html      # 主页面
   ├── script.js       # 核心逻辑
   ├── style.css       # 样式文件
   ├── links.txt       # 链接映射文件
   └── 404.html        # 404处理（必需）
   ```

3. **启用GitHub Pages**
   - 进入仓库设置（Settings）
   - 找到"Pages"选项
   - 选择"Deploy from a branch"
   - 源分支选择"main"或"master"
   - 目录选择"/ (root)"
   - 点击"Save"

4. **配置短链接**
   - 编辑`links.txt`文件，添加你的短链接映射
   - 提交更改，GitHub Pages会自动更新

5. **访问短链接**
   - 部署完成后，访问：`https://用户名.github.io/仓库名/短链接`
   - 例如：`https://jiang068.github.io/sus/abc`

### GitHub Pages环境说明
- 系统会自动检测GitHub Pages环境
- 支持子路径部署（如：`/sus/`）
- 404.html文件必需，用于处理动态路由

---

### 2. 配置链接映射

编辑 `links.txt` 文件，格式为：`短链接,长链接`

```
abc,https://www.bilibili.com
tf,https://live.bilibili.com/22603245
gi,https://example.com/very-long-url
```

### 3. 访问短链接

**标准服务器部署：**
- `https://yourdomain.com/短链接` → 跳转到对应链接

**WordPress子目录部署：**
- `https://yourdomain.com/目录名/短链接` → 跳转到对应链接

**GitHub Pages部署：**
- `https://用户名.github.io/仓库名/短链接` → 跳转到对应链接

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

### 服务器配置注意事项
1. **规则顺序**：短链接重写规则必须放在其他规则之前（如WordPress规则）
2. **缓存清理**：修改配置文件后需要清除缓存
3. **权限检查**：确保项目目录有正确的读取权限
4. **插件冲突**：某些缓存或SEO插件可能影响重写规则
5. **备份配置**：修改 `.htaccess` 等配置文件前先备份

---

**注意：** 此README文件仅用于项目说明，不需要上传到网站目录。
