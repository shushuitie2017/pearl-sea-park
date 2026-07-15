import { defineConfig } from 'vite'
import wasm from 'vite-plugin-wasm'

// 部署在 GitHub Pages 子路径 https://shushuitie2017.github.io/pearl-sea-park/
export default defineConfig({
  base: '/pearl-sea-park/',
  // 非 compat 版 @dimforge/rapier3d 把 wasm 作独立文件流式编译，需 wasm 插件
  // 处理 .wasm 导入。rapier 走动态 import（async chunk），其顶层 await 在
  // esnext 目标下原生支持，无需 vite-plugin-top-level-await 兜底。
  plugins: [wasm()],
  build: {
    target: 'esnext',
    chunkSizeWarningLimit: 2200,
  },
})
