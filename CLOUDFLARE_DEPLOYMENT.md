# Cloudflare Pages 部署指南

本项目已配置为通过 Cloudflare Pages 自动部署。每次推送到 GitHub 主分支时，Cloudflare 会自动构建和部署应用。

## 前置要求

1. GitHub 账号
2. Cloudflare 账号（免费账号即可）
3. 项目已推送到 GitHub 仓库

## 部署步骤

### 1. 推送代码到 GitHub

确保你的代码已经推送到 GitHub：

```bash
git add .
git commit -m "准备部署到 Cloudflare Pages"
git push origin main
```

### 2. 在 Cloudflare 创建 Pages 项目

1. 登录 [Cloudflare Dashboard](https://dash.cloudflare.com/)
2. 点击左侧菜单的 **Workers & Pages**
3. 点击 **Create application** 按钮
4. 选择 **Pages** 标签
5. 点击 **Connect to Git**

### 3. 连接 GitHub 仓库

1. 选择 **GitHub** 作为 Git 提供商
2. 授权 Cloudflare 访问你的 GitHub 账号
3. 选择你的仓库：`deepseek-ai-chat/react-frontend`（或你的仓库名称）
4. 点击 **Begin setup**

### 4. 配置构建设置

在构建配置页面，填入以下信息：

- **项目名称**：自定义名称（例如：`deepseek-chat`）
- **生产分支**：`main`
- **构建命令**：`npm run build`
- **构建输出目录**：`dist`
- **根目录**：留空（或填写 `/` 如果前端在子目录中）

**环境变量**（如果需要）：
如果你的应用需要环境变量（如 API 端点），点击 **Add variable** 添加：
- 变量名：`VITE_API_URL`
- 值：你的后端 API 地址

### 5. 开始部署

1. 点击 **Save and Deploy**
2. Cloudflare 会自动开始构建和部署
3. 等待几分钟，直到部署完成

### 6. 访问你的应用

部署完成后，你会获得一个 Cloudflare Pages 域名：
- `https://your-project-name.pages.dev`

你也可以：
- 绑定自定义域名
- 查看部署历史
- 设置预览部署（用于 pull requests）

## 自动部署

配置完成后，每次你推送代码到 GitHub 的 `main` 分支时：
1. Cloudflare 会自动检测到新的提交
2. 运行构建命令 `npm run build`
3. 将 `dist` 目录的内容部署到 CDN
4. 你的网站会在几分钟内更新

## 预览部署

Cloudflare Pages 还支持预览部署：
- 每个 Pull Request 都会生成一个独立的预览 URL
- 在合并 PR 前可以先预览效果
- 预览 URL 格式：`https://[commit-hash].[project-name].pages.dev`

## 高级配置（可选）

### 自定义域名

1. 在 Cloudflare Pages 项目中，点击 **Custom domains**
2. 点击 **Set up a custom domain**
3. 输入你的域名
4. 按照提示添加 DNS 记录

### 环境变量管理

在 Cloudflare Dashboard 中：
1. 进入你的 Pages 项目
2. 点击 **Settings** > **Environment variables**
3. 添加生产环境和预览环境的变量

### 构建缓存

Cloudflare Pages 会自动缓存 `node_modules`，加快后续构建速度。

## 故障排查

### 构建失败

1. 检查 Cloudflare 构建日志
2. 确认 Node.js 版本（项目使用 Node 18，已配置在 `.node-version`）
3. 确认所有依赖都在 `package.json` 中

### 环境变量问题

- Vite 环境变量必须以 `VITE_` 开头
- 在 Cloudflare 中添加环境变量后需要重新部署

### 路由问题（SPA）

如果你的应用使用客户端路由，可能需要添加重定向规则。
创建 `public/_redirects` 文件：

```
/*    /index.html   200
```

## 资源链接

- [Cloudflare Pages 文档](https://developers.cloudflare.com/pages/)
- [Vite 部署指南](https://vitejs.dev/guide/static-deploy.html)
- [Cloudflare Dashboard](https://dash.cloudflare.com/)
