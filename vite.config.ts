import { defineConfig, loadEnv } from "vite";
import react from "@vitejs/plugin-react";

// https://vitejs.dev/config/
export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, process.cwd(), "");
  return {
    build: {
      rollupOptions: {
        output: {
          manualChunks: {
            vendor: ["react", "react-dom"]
          },
        },
      },
      chunkSizeWarningLimit: 1000
    },
    define: {
      "process.env": env,
    },
    plugins: [react()],
  };
});
