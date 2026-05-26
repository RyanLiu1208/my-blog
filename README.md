# Neon Trae Blog

一个带有 **Trae 风格代码流光特效** 的个人博客模板：前端可直接通过 GitHub Pages 打开，后端提供本地 Node.js API 示例。

## 在线打开

推送到 GitHub 后，可在仓库 Settings → Pages 中选择 `main` 分支 `/root` 发布。

如果仓库名是 `my-blog`，页面通常会是：

```text
https://RyanLiu1208.github.io/my-blog/
```

## 本地预览前端

```bash
npm run dev
```

然后打开终端提示的本地地址。

## 启动后端 API 示例

```bash
npm install
npm run server
```

API：

- `GET http://localhost:3001/api/posts` 获取文章列表
- `GET http://localhost:3001/api/health` 健康检查

> GitHub Pages 只能托管静态前端，不能直接运行 Node 后端。后端可部署到 Render、Railway、Vercel Serverless、Fly.io 等平台。

## 项目结构

```text
.
├── index.html          # GitHub Pages 入口
├── styles.css          # 炫酷视觉样式
├── script.js           # 代码雨、打字机、博客交互效果
├── server.js           # Express 后端 API 示例
├── package.json        # 本地开发脚本
└── README.md
```