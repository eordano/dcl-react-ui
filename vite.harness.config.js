import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

export default defineConfig({
  root: "interactions-harness",
  plugins: [react()],
  build: {
    outDir: "../dist-harness",
    emptyOutDir: true,
  },
});
