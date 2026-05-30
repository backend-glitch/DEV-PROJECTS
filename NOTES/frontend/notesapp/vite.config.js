
import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

export default defineConfig({
  plugins: [react()],

  server: {
    proxy: {
      "/notes": {
        target: "https://turbo-succotash-pj6vq9wpj9gjc9r65-8000.app.github.dev",
        changeOrigin: true,
        secure: false,
      },
    },
  },
});

