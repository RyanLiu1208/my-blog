const posts = [
  {
    id: 1,
    tag: "AI IDE",
    title: "像 Trae 一样组织你的编码工作流",
    desc: "从需求拆解、上下文收集到渐进式实现，构建更稳定的 AI Coding 节奏。",
    content: [
      "好的 AI 编码不是把需求一次性丢给模型，而是像搭建工程一样逐步推进：先明确目标，再收集上下文，最后小步实现与验证。",
      "我更推荐把任务拆成“理解项目、制定方案、修改代码、运行检查、复盘提交”五步。这样即使需求发生变化，也能很快定位影响范围。",
      "当你把 AI 当作结对工程师，而不是魔法按钮，产出的代码会更稳定，也更容易维护。",
    ],
    date: "2026-05-26",
    read: "6 min",
  },
  {
    id: 2,
    tag: "Frontend FX",
    title: "高级感页面不一定要很复杂",
    desc: "真正耐看的特效通常是低频、克制、服务内容，而不是抢走读者注意力。",
    content: [
      "很多个人网站会把动效做得很满：快速流动的背景、强烈的发光、持续闪烁的元素。第一眼很酷，但读文章时会累。",
      "更好的做法是控制运动速度、降低透明度、减少同时运动的图层，让视觉效果成为氛围，而不是噪音。",
      "这版博客把代码雨速度降下来，并把文章放到更核心的位置，就是为了让页面既有科技感，也能长期阅读。",
    ],
    date: "2026-05-22",
    read: "8 min",
  },
  {
    id: 3,
    tag: "Backend",
    title: "静态博客也能拥有后端能力",
    desc: "通过独立 API 服务为 GitHub Pages 注入数据、评论、统计与自动化能力。",
    content: [
      "GitHub Pages 很适合放静态前端，但它不能直接运行 Node.js 服务。解决方式是把前端和后端分开部署。",
      "前端负责展示，后端提供文章、评论、访问统计等接口。后端可以放在 Render、Railway、Vercel 或其他云服务上。",
      "这种结构简单、便宜、容易维护，也很适合个人博客从静态页面逐步升级为全栈项目。",
    ],
    date: "2026-05-18",
    read: "5 min",
  },
  {
    id: 4,
    tag: "Notes",
    title: "我的每日开发记录模板",
    desc: "记录今天解决的问题、踩过的坑、学到的概念，以及明天最重要的一件事。",
    content: [
      "开发记录不需要写成长篇论文，最重要的是持续和可检索。每天只需要回答四个问题：今天做了什么？遇到什么问题？怎么解决？明天做什么？",
      "长期坚持后，它会变成你的个人知识库。很多看似零散的经验，会在未来某个项目中突然派上用场。",
    ],
    date: "2026-05-12",
    read: "4 min",
  },
  {
    id: 5,
    tag: "Design",
    title: "暗色博客的排版细节",
    desc: "暗色页面要注意文字对比度、行高、卡片层级和发光效果的克制使用。",
    content: [
      "暗色设计的难点不是把背景调黑，而是保证内容清晰。正文颜色不要太灰，行高要足够舒展，段落之间要留出呼吸感。",
      "霓虹色适合作为强调色，不适合大面积铺满。它最好出现在按钮、标签、边框和少量关键标题上。",
    ],
    date: "2026-05-08",
    read: "7 min",
  },
  {
    id: 6,
    tag: "Life",
    title: "为什么我喜欢写技术博客",
    desc: "写作能迫使我把模糊经验变成清晰结构，也能让后来的人少走一点弯路。",
    content: [
      "很多知识只停留在脑子里时是模糊的，只有写出来才会发现哪里没有理解透。写博客就是一次自我调试。",
      "它不一定要追求流量。只要能帮未来的自己快速回忆，或者帮另一个开发者解决问题，就已经有价值。",
    ],
    date: "2026-05-01",
    read: "5 min",
  },
];

const codeSample = `type Idea = "blog" | "code" | "future";

const traeBlog = createExperience({
  theme: "neon-cyberpunk",
  effects: ["matrix-rain", "glass-card", "typewriter"],
  deploy: "GitHub Pages",
});

async function ship() {
  await traeBlog.compile(Idea);
  return "Write. Glow. Deploy.";
}`;

const snippets = [
  "> booting neon renderer... done",
  "> scanning markdown galaxy... 24 posts indexed",
  "> injecting code particles... stable",
  "> connecting backend API /api/posts... ready",
  "> experience status: ✨ cinematic",
];

function typeWriter() {
  const target = document.querySelector("#typewriter");
  let index = 0;
  const tick = () => {
    target.textContent = codeSample.slice(0, index++);
    if (index <= codeSample.length) window.setTimeout(tick, 24);
  };
  tick();
}

function renderPosts() {
  const grid = document.querySelector("#postGrid");
  const featured = document.querySelector("#featuredArticle");
  const [firstPost, ...restPosts] = posts;

  featured.innerHTML = `<span class="tag"># ${firstPost.tag}</span>
    <h3>${firstPost.title}</h3>
    <p>${firstPost.desc}</p>
    <div class="article-content">${firstPost.content.map((paragraph) => `<p>${paragraph}</p>`).join("")}</div>
    <div class="post-meta"><span>${firstPost.date}</span><span>${firstPost.read}</span></div>`;

  grid.innerHTML = restPosts
    .map(
      (post) => `<article class="post-card">
        <span class="tag"># ${post.tag}</span>
        <h3>${post.title}</h3>
        <p>${post.desc}</p>
        <div class="post-meta"><span>${post.date}</span><span>${post.read}</span></div>
        <button type="button" data-post-id="${post.id}">阅读摘要 →</button>
      </article>`
    )
    .join("");

  grid.querySelectorAll(".post-card").forEach((card) => {
    card.addEventListener("pointermove", (event) => {
      const rect = card.getBoundingClientRect();
      card.style.setProperty("--x", `${event.clientX - rect.left}px`);
      card.style.setProperty("--y", `${event.clientY - rect.top}px`);
    });
  });

  grid.querySelectorAll("button[data-post-id]").forEach((button) => {
    button.addEventListener("click", () => {
      const post = posts.find((item) => item.id === Number(button.dataset.postId));
      featured.innerHTML = `<span class="tag"># ${post.tag}</span>
        <h3>${post.title}</h3>
        <p>${post.desc}</p>
        <div class="article-content">${post.content.map((paragraph) => `<p>${paragraph}</p>`).join("")}</div>
        <div class="post-meta"><span>${post.date}</span><span>${post.read}</span></div>`;
      featured.scrollIntoView({ behavior: "smooth", block: "center" });
    });
  });
}

function initTerminal() {
  const terminal = document.querySelector("#terminalBody");
  const button = document.querySelector("#runSnippet");
  let line = 0;
  const addLine = () => {
    const p = document.createElement("p");
    p.textContent = snippets[line % snippets.length];
    terminal.appendChild(p);
    terminal.scrollTop = terminal.scrollHeight;
    line += 1;
  };
  snippets.slice(0, 3).forEach((text) => {
    const p = document.createElement("p");
    p.textContent = text;
    terminal.appendChild(p);
  });
  button.addEventListener("click", addLine);
}

function initMatrixRain() {
  const canvas = document.querySelector("#matrixCanvas");
  const ctx = canvas.getContext("2d");
  const chars = "01<>/{}[]const async await AI BLOG TRAE".split("");
  let columns = [];
  let lastFrame = 0;

  const resize = () => {
    canvas.width = window.innerWidth * devicePixelRatio;
    canvas.height = window.innerHeight * devicePixelRatio;
    ctx.setTransform(devicePixelRatio, 0, 0, devicePixelRatio, 0, 0);
    columns = Array.from({ length: Math.ceil(window.innerWidth / 18) }, () => Math.random() * window.innerHeight);
  };

  const draw = () => {
    requestAnimationFrame(draw);
    const now = performance.now();
    if (now - lastFrame < 72) return;
    lastFrame = now;

    ctx.fillStyle = "rgba(5, 7, 17, 0.14)";
    ctx.fillRect(0, 0, window.innerWidth, window.innerHeight);
    ctx.font = "14px JetBrains Mono";
    columns.forEach((y, i) => {
      const text = chars[Math.floor(Math.random() * chars.length)];
      ctx.fillStyle = Math.random() > 0.992 ? "#8b5cf6" : "#38e8ff";
      ctx.fillText(text, i * 18, y);
      columns[i] = y > window.innerHeight + Math.random() * 1200 ? 0 : y + 8;
    });
  };

  window.addEventListener("resize", resize);
  resize();
  draw();
}

document.querySelector("#year").textContent = new Date().getFullYear();
renderPosts();
typeWriter();
initTerminal();
initMatrixRain();