import express from "express";
import cors from "cors";

const app = express();
const port = process.env.PORT || 3001;

app.use(cors());
app.use(express.json());

const posts = [
  {
    id: 1,
    title: "像 Trae 一样组织你的编码工作流",
    tag: "AI IDE",
    excerpt: "从需求拆解、上下文收集到渐进式实现，构建更稳定的 AI Coding 节奏。",
  },
  {
    id: 2,
    title: "用 Canvas 与 CSS 打造霓虹代码雨",
    tag: "Frontend FX",
    excerpt: "让背景不只是背景，而是一个持续呼吸、流动、响应用户动作的数字空间。",
  },
  {
    id: 3,
    title: "静态博客也能拥有后端能力",
    tag: "Backend",
    excerpt: "通过独立 API 服务为 GitHub Pages 注入数据、评论、统计与自动化能力。",
  },
];

app.get("/api/health", (_req, res) => {
  res.json({ ok: true, service: "neon-trae-blog-api", timestamp: new Date().toISOString() });
});

app.get("/api/posts", (_req, res) => {
  res.json({ data: posts });
});

app.listen(port, () => {
  console.log(`Neon Trae Blog API running at http://localhost:${port}`);
});