import { defineConfig } from 'vite'

// https://vitejs.dev/config/
export default defineConfig({
  base: "ThreeJS-Donut",
  server: {
    host: true,
    port: 3000,
    strictPort: true,
  },
  plugins: [],
})
