import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

export default defineConfig({
  base: "./",
  plugins: [react()],
  define: {
    "process.env.NODE_ENV": JSON.stringify("production"),
    "process.env": "{}",
  },
  build: {
    outDir: "dist-overlay",
    emptyOutDir: true,
    assetsInlineLimit: 0,
    cssCodeSplit: false,
    lib: {
      entry: "src/overlay/overlay-main.jsx",
      name: "Ui3Overlay",
      formats: ["iife"],
      fileName: () => "overlay.js",
      cssFileName: "overlay",
    },
  },
});
