<div align="center">

# 🌊 明珠 · 海底游乐苑

**海底奇观 · 中文版**

在阳光可及的海底，独自游历一座华美的美好年代（Belle Époque）游乐园——第一人称漫游，实时 WebGPU 渲染。

[![在线体验](https://img.shields.io/badge/在线体验-shushuitie2017.github.io/pearl--sea--park-0b3d4f?style=for-the-badge)](https://shushuitie2017.github.io/pearl-sea-park/)

![明珠 · 海底游乐苑](assets/pearl.jpeg)

</div>

---

## ✨ 在线体验

👉 **[https://shushuitie2017.github.io/pearl-sea-park/](https://shushuitie2017.github.io/pearl-sea-park/)**

> ⚠️ 本体验以 **WebGPU** 实时渲染，**仅支持桌面版 Chromium 内核浏览器**（新版 Chrome / Edge 等）。移动端与非 Chromium 浏览器会看到入场提示。

穿过水面，踏上阳光照耀的礁石——一位梦想家在此建起一座由玻璃穹顶、黄铜花饰与白色大理石构成的美好年代仙境。这里的海如空气般透明，你只需漫步在林荫大道上，蝠鲼与海龟自头顶掠过，光柱在马赛克地面上缓缓扫过。没有人潮，没有时钟，没有失败——你手握一号金票，整座乐园都在为你一人旋转、鸣响、闪耀。

进入后：鼠标环视，`W A S D` 移动，走近游乐设施按 `E` 交互，`Q` 打开传送菜单，`Esc` 暂停。

## 🎡 园中一览

| 设施 | 说明 |
|------|------|
| 大转轮 | 缓缓转动的巨型摩天轮，登乘俯瞰全园 |
| 激流 | 弹射过山车 |
| 旋转木马 · 深渊之环 | 会奏乐的旋转木马 |
| 明珠线 | 贯穿全园的空中缆车 |
| 下潜钟 | 往返水面与园区的升降舱 |
| 潮汐庭院 / 阳光花园 / 月水母庭 / 海龟泻湖 | 喷泉、珊瑚与海中生灵 |

## 🛠️ 技术栈

- [Three.js](https://threejs.org/)（WebGPU + TSL 着色语言）
- [Rapier](https://rapier.rs/) 物理引擎
- TypeScript · Vite
- 全程程序化建模与材质，实时光影，无 WebGL 退路

## 💻 本地运行

```bash
pnpm install
pnpm dev        # 开发预览
pnpm build      # 产出静态站到 dist/
pnpm typecheck  # 类型检查
```

## 📦 部署

推送到 `main` 分支即自动触发 GitHub Actions 构建并发布到 Pages（见 `.github/workflows/deploy.yml`）。
站点部署在 `/pearl-sea-park/` 子路径下，`vite.config.ts` 已配置 `base`。
