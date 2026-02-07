# Tasmania Travel Website 2025

A modern, interactive travel website showcasing the Tasmania journey in January 2025.

## GitHub Pages 部署指南 / Deployment Guide

### 中文说明

#### 1. 创建 GitHub 仓库
1. 登录 GitHub，点击右上角的 `+` -> `New repository`
2. 仓库名称建议：`tasmania-2025` 或 `tasmania-travel`
3. 选择 **Public**（公开仓库才能使用 GitHub Pages）
4. 不要勾选 "Add a README file"（我们已经有了）
5. 点击 `Create repository`

#### 2. 上传文件到 GitHub
在本地终端运行以下命令：

```bash
cd tasmania-deploy
git init
git add .
git commit -m "Initial commit: Tasmania travel website"
git branch -M main
git remote add origin https://github.com/你的用户名/tasmania-2025.git
git push -u origin main
```

或者使用 GitHub Desktop：
1. 打开 GitHub Desktop
2. File -> Add Local Repository -> 选择 `tasmania-deploy` 文件夹
3. 创建初始提交
4. Publish repository

#### 3. 启用 GitHub Pages
1. 进入你的仓库页面
2. 点击 `Settings`（设置）
3. 在左侧菜单找到 `Pages`
4. 在 **Source** 下拉菜单中选择：
   - Branch: `main`
   - Folder: `/ (root)`
5. 点击 `Save`（保存）

#### 4. 访问网站
等待 1-2 分钟后，页面会显示：
```
Your site is live at https://你的用户名.github.io/tasmania-2025/
```

点击链接即可访问！你可以把这个链接分享给朋友。

### 需要上传的文件（已包含在此文件夹）
- `index.html` - 主页面
- `styles.css` - 样式文件
- `script.js` - 交互功能
- `Travel/` - 美食图片文件夹
- `Jan 2025 Tassie/` - 行程图片文件夹
- `README.md` - 说明文档（可选）

### English Instructions

#### Deploy to GitHub Pages:
1. Create a new **public** repository on GitHub
2. Upload all files from this folder
3. Go to Settings -> Pages
4. Select branch `main` and folder `/ (root)`
5. Save and wait for deployment
6. Access your site at `https://username.github.io/repo-name/`

## Features

- Interactive timeline with 8-day itinerary
- Lightbox image gallery with keyboard navigation
- Dark/Light theme toggle
- Smooth scrolling navigation
- Responsive design for all devices
- Hotel and restaurant reviews with prices

## Technologies

- HTML5
- CSS3 (Custom Properties, Flexbox, Grid)
- Vanilla JavaScript (ES6+)
- Intersection Observer API
- LocalStorage for theme persistence

---

Made with ❤️ for Tasmania Journey 2025
