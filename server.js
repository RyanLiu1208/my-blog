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
    title: "高级感页面不一定要很复杂",
    tag: "Frontend FX",
    excerpt: "真正耐看的特效通常是低频、克制、服务内容，而不是抢走读者注意力。",
  },
  {
    id: 3,
    title: "静态博客也能拥有后端能力",
    tag: "Backend",
    excerpt: "通过独立 API 服务为 GitHub Pages 注入数据、评论、统计与自动化能力。",
  },
  {
    id: 4,
    title: "我的每日开发记录模板",
    tag: "Notes",
    excerpt: "记录今天解决的问题、踩过的坑、学到的概念，以及明天最重要的一件事。",
  },
  {
    id: 5,
    title: "暗色博客的排版细节",
    tag: "Design",
    excerpt: "暗色页面要注意文字对比度、行高、卡片层级和发光效果的克制使用。",
  },
  {
    id: 6,
    title: "为什么我喜欢写技术博客",
    tag: "Life",
    excerpt: "写作能迫使我把模糊经验变成清晰结构，也能让后来的人少走一点弯路。",
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