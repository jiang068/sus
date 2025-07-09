// 倒计时配置
const COUNTDOWN_SECONDS = 5;

// 创建跳转页面的函数
function createRedirectPage(longLink, shortLink) {
    // 清空body内容
    document.body.innerHTML = '';
    
    // 设置页面标题
    document.title = '🔗 外部链接跳转';
    
    // 创建页面内容
    const container = document.createElement('div');
    container.className = 'container';
    
    container.innerHTML = `
        <div class="title">🔗 外部链接跳转</div>
        <div style="color: #666; font-size: 16px; margin-bottom: 20px; line-height: 1.6;">
            您即将离开本站，请确认以下链接
        </div>
        <div class="short-link">短链接: ${shortLink}</div>
        <div style="color: #333; font-size: 14px; margin-bottom: 15px; font-weight: bold;">您将会跳转到:</div>
        <div class="long-link">${longLink}</div>
        <a href="${longLink}" class="button" style="text-decoration: none; display: inline-block; pointer-events: none; background: #ccc;" id="jump-button">立即跳转 (<span id="jump-countdown">${COUNTDOWN_SECONDS}</span>)</a>
        <button class="button copy-button" onclick="copyLink('${longLink.replace(/'/g, "\\'")}');">复制链接</button>
        <div class="progress-bar">
            <div class="progress-fill" id="progress-fill"></div>
        </div>
        <div class="safari-notice">
            <strong>📢 Safari 浏览器提示：</strong>
            <div style="text-align: left; margin-top: 5px;">
                如果您使用 Safari 浏览器访问较长的链接时遇到问题，建议您手动复制链接后粘贴到地址栏访问，以确保链接完整性。
            </div>
        </div>
    `;
    
    document.body.appendChild(container);
    
    // 开始倒计时
    startCountdown(longLink);
}

// 倒计时函数
function startCountdown(link) {
    let countdown = COUNTDOWN_SECONDS;
    const progressFill = document.getElementById('progress-fill');
    const jumpButton = document.getElementById('jump-button');
    const jumpCountdown = document.getElementById('jump-countdown');
    
    // 初始化进度条
    progressFill.style.width = '100%';
    
    const countdownInterval = setInterval(() => {
        countdown--;
        
        if (countdown > 0) {
            jumpCountdown.textContent = countdown;
            // 更新进度条
            progressFill.style.width = (countdown / COUNTDOWN_SECONDS * 100) + '%';
        } else {
            clearInterval(countdownInterval);
            progressFill.style.width = '0%';
            
            // 启用跳转按钮
            jumpButton.style.pointerEvents = 'auto';
            jumpButton.style.background = 'linear-gradient(45deg, #667eea, #764ba2)';
            jumpButton.innerHTML = '立即跳转';
            
            window.countdownInterval = null;
        }
    }, 1000);
    
    // 保存interval ID以便可能的取消
    window.countdownInterval = countdownInterval;
}

// 复制链接函数
function copyLink(link) {
    if (link) {
        // 使用传统的document.execCommand方法，兼容性更好
        const textArea = document.createElement('textarea');
        textArea.value = link;
        textArea.style.position = 'fixed';
        textArea.style.left = '-999999px';
        textArea.style.top = '-999999px';
        document.body.appendChild(textArea);
        textArea.focus();
        textArea.select();
        
        // 更新按钮状态的函数
        function updateButton(success) {
            const button = event.target;
            const originalText = button.textContent;
            if (success) {
                button.textContent = '已复制!';
                button.style.background = '#218838';
                setTimeout(() => {
                    button.textContent = originalText;
                    button.style.background = '#28a745';
                }, 2000);
            }
        }
        
        try {
            const successful = document.execCommand('copy');
            if (successful) {
                updateButton(true);
            } else {
                throw new Error('Copy failed');
            }
        } catch (e) {
            // 如果execCommand也失败，尝试现代API
            if (navigator.clipboard && window.isSecureContext) {
                navigator.clipboard.writeText(link).then(() => {
                    updateButton(true);
                }).catch(() => {
                    showCopyFallback(link);
                });
            } else {
                showCopyFallback(link);
            }
        }
        
        document.body.removeChild(textArea);
    }
}

// 显示手动复制提示
function showCopyFallback(link) {
    const modal = document.createElement('div');
    modal.style.cssText = `
        position: fixed;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        background: rgba(0,0,0,0.5);
        display: flex;
        justify-content: center;
        align-items: center;
        z-index: 1000;
    `;
    
    const content = document.createElement('div');
    content.style.cssText = `
        background: white;
        padding: 30px;
        border-radius: 10px;
        max-width: 90%;
        text-align: center;
        box-shadow: 0 10px 30px rgba(0,0,0,0.3);
    `;
    
    content.innerHTML = `
        <h3 style="margin-top: 0; color: #333;">请手动复制链接</h3>
        <div style="background: #f5f5f5; padding: 10px; border-radius: 5px; margin: 20px 0; word-break: break-all; font-size: 14px; max-height: 150px; overflow-y: auto;">${link}</div>
        <button onclick="document.body.removeChild(this.parentElement.parentElement)" style="background: #667eea; color: white; border: none; padding: 10px 20px; border-radius: 5px; cursor: pointer;">关闭</button>
    `;
    
    modal.appendChild(content);
    document.body.appendChild(modal);
    
    // 点击背景关闭
    modal.onclick = function(e) {
        if (e.target === modal) {
            document.body.removeChild(modal);
        }
    };
}

// 创建错误页面的函数
function createErrorPage(errorMessage) {
    // 清空body内容
    document.body.innerHTML = '';
    
    // 设置页面标题
    document.title = '杂鱼~杂鱼~';
    
    // 创建页面内容
    const container = document.createElement('div');
    container.className = 'container';
    
    container.innerHTML = `
        <div class="title">🔗 外部链接跳转</div>
        <div style="color: #666; font-size: 16px; margin-bottom: 20px; line-height: 1.6;">
            ${errorMessage}
        </div>
        <button class="button" onclick="history.back()" style="background: #667eea; color: white; border: none; padding: 12px 24px; border-radius: 6px; cursor: pointer; font-size: 16px; text-decoration: none; display: inline-block;">返回上一页</button>
    `;
    
    document.body.appendChild(container);
}

// 主程序逻辑
const protocol = window.location.protocol === 'https:' ? 'https:' : 'http:';
const xhr = new XMLHttpRequest();

// 文件名Base64加密
function getEncryptedFileName() {
    const encryptedName = "bGlua3MudHh0";
    return atob(encryptedName);
}

xhr.open('GET', getEncryptedFileName(), true);

xhr.onreadystatechange = function () {
    if (xhr.readyState === 4) {
        if (xhr.status === 200) {
            const lines = xhr.responseText.split('\n');
            const shortLinkMapping = {};
            lines.forEach(line => {
                const parts = line.split(',');
                if (parts.length >= 2) {
                    const shortLink = parts[0].trim();
                    const longLink = parts.slice(1).join(',').trim(); // 处理URL中可能包含逗号的情况
                    if (shortLink && longLink) {
                        shortLinkMapping[shortLink] = longLink;
                    }
                }
            });
            const shortLink = window.location.pathname.replace(/^\//, '');
            const longLink = shortLinkMapping[shortLink];
            if (longLink) {
                // 所有浏览器都显示跳转页面
                createRedirectPage(longLink, shortLink);
            } else {
                createErrorPage("杂鱼~这里还什么都没有哦~");
            }
        } else {
            createErrorPage("被你玩坏了！去找我主人！");
        }
    }
};
xhr.onerror = function () {
    createErrorPage("被你玩坏了！去找我主人！<br>网络错误");
};
xhr.send();
