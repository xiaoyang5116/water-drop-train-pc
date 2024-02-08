import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import eslint from "vite-plugin-eslint";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react(), eslint()],

  server: {
    proxy: {
      "/api": {
        target: "http://localhost:3000", // 你的 API 服务器地址
        changeOrigin: true,
        rewrite: (path) => path.replace(/^\/api/, ""), // 可选的路径重写规则
      },
    },
  },
});
