# CLAUDE.md — 明珠·海底游乐苑（中文版）

## 项目定位

Three.js（WebGPU + TSL）+ Rapier 物理的第一人称海底游乐园探索游戏，中文版。
纯静态站，部署在 GitHub Pages 子路径 `https://shushuitie2017.github.io/pearl-sea-park/`。
**仅支持桌面版 Chromium + WebGPU**（`src/ui/browserGate.ts` 会拦截其它环境）。

## 中文化范围与约定

- 面向玩家的文本已全部中文化：入场闸/加载票据/暂停卡（`src/ui/*`）、
  设施招牌（`src/world/parkLayout.ts` 的 `FACILITY_ENTRANCE_SIGNS`）、
  交互提示（各 `src/rides/*`、`src/games/*`、`src/vehicles/*`、`src/player/teleport.ts` 的 `prompt`）、
  时刻表（`src/shows/scheduleBoard.ts`）、WebGPU 报错（`src/main.ts`）、`index.html` 元数据。
- **只翻人类可读文本**：代码标识符、event 名（`domain/event`）、对象 `id:`/`name:`（作标识符时）、
  mesh `.name`、`throw new Error(...)` 开发者报错、KeyboardEvent.code 一律保留英文。
- 园名 The Pearl → 明珠；型号/专名保留；美好年代典雅口吻。
- 时刻表标签与 event 标识符解耦：`scheduleBoard.ts` 里 `SCHEDULE_DISPLAY_NAMES`
  做「标识符→中文显示名」映射，`scheduler.ts` 的 `PARK_SCHEDULE.name` 标识符不动。

## 关键坑

1. **canvas 中文字体**：招牌与时刻表用 canvas `fillText`，字体族已补 CJK 回退
   （`"Noto Serif SC", Georgia, "Songti SC", serif` 等），否则中文字形依赖系统默认。
   DOM UI 的 `--serif`（`src/styles.css`）同样补了 CJK serif 回退。
2. **`vite.config.ts` 的 `base: '/pearl-sea-park/'`** 必须与仓库名一致；Vite 会自动为
   `index.html` 里 `/` 开头的资源与 `import.meta.env.BASE_URL` 补前缀。换仓库名要同步改。
3. 入场闸靠 `navigator.userAgentData.brands` 判 Chromium；自动化 Chrome 常报空 brands
   导致误判，真人 Chrome 正常。

## 部署

推 `main` → GitHub Actions（`.github/workflows/deploy.yml`）用 pnpm 构建 `dist/` 并发布。
Pages 源必须设为 **GitHub Actions**（build_type=workflow）。CI pnpm 版本（8.5.1）与
`packageManager` 字段、本地锁文件一致，否则 `--frozen-lockfile` 会失败。

## 包管理器

用 pnpm，不用 npm。
