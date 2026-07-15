import { defineConfig } from 'vite'

// 部署在 GitHub Pages 子路径 https://shushuitie2017.github.io/pearl-sea-park/
export default defineConfig({
  base: '/pearl-sea-park/',
  build: {
    target: 'esnext',
    chunkSizeWarningLimit: 2200,
  },
})
