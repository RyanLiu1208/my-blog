# 光学焦距实验室

一个不需要后端的纯静态交互实验页面，用来理解 **焦距、焦点、凸透镜光路、光的散射** 等基础光学知识。

页面支持在底部拖拽焦距滑块，实时改变光线经过透镜后的轨迹。

## GitHub Pages 打开

仓库推送到 GitHub 后，在 Settings → Pages 中选择：

- Branch：`main`
- Folder：`/root`

如果仓库名是 `my-blog`，页面通常会是：

```text
https://RyanLiu1208.github.io/my-blog/
```

## 本地预览

```bash
npm run dev
```

然后打开：

```text
http://localhost:3000
```

也可以直接双击 `index.html` 打开。

## 实验内容

- 拖拽焦距：观察焦距变短/变长时光线汇聚位置如何变化
- 平行光线：平行主光轴入射后通过右侧焦点
- 中心光线：经过透镜光心近似不偏折
- 散射光点：模拟微粒对光线的散射，让光束路径更容易观察
- 成像关系：用简化薄透镜公式 `1/f = 1/u + 1/v` 展示像距变化

## 项目结构

```text
.
├── index.html          # GitHub Pages 入口
├── styles.css          # 实验页面样式
├── script.js           # Canvas 光路模拟与焦距拖拽交互
├── package.json        # 本地静态服务脚本
└── README.md
```