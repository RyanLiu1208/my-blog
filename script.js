const posts = [
  {
    tag: "AI IDE",
    title: "像 Trae 一样组织你的编码工作流",
    desc: "从需求拆解、上下文收集到渐进式实现，构建更稳定的 AI Coding 节奏。",
    date: "2026-05-26",
    read: "6 min",
  },
  {
    tag: "Frontend FX",
    title: "用 Canvas 与 CSS 打造霓虹代码雨",
    desc: "让背景不只是背景，而是一个持续呼吸、流动、响应用户动作的数字空间。",
    date: "2026-05-22",
    read: "8 min",
  },
  {
    tag: "Backend",
    title: "静态博客也能拥有后端能力",
    desc: "通过独立 API 服务为 GitHub Pages 注入数据、评论、统计与自动化能力。",
    date: "2026-05-18",
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
  grid.innerHTML = posts
    .map(
      (post) => `<article class="post-card">
        <span class="tag"># ${post.tag}</span>
        <h3>${post.title}</h3>
        <p>${post.desc}</p>
        <div class="post-meta"><span>${post.date}</span><span>${post.read}</span></div>
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

  const resize = () => {
    canvas.width = window.innerWidth * devicePixelRatio;
    canvas.height = window.innerHeight * devicePixelRatio;
    ctx.setTransform(devicePixelRatio, 0, 0, devicePixelRatio, 0, 0);
    columns = Array.from({ length: Math.ceil(window.innerWidth / 18) }, () => Math.random() * window.innerHeight);
  };

  const draw = () => {
    ctx.fillStyle = "rgba(5, 7, 17, 0.14)";
    ctx.fillRect(0, 0, window.innerWidth, window.innerHeight);
    ctx.font = "14px JetBrains Mono";
    columns.forEach((y, i) => {
      const text = chars[Math.floor(Math.random() * chars.length)];
      ctx.fillStyle = Math.random() > 0.985 ? "#ff4fd8" : "#38e8ff";
      ctx.fillText(text, i * 18, y);
      columns[i] = y > window.innerHeight + Math.random() * 1200 ? 0 : y + 18;
    });
    requestAnimationFrame(draw);
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