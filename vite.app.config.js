import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

// Second Vite build, ALONGSIDE the untouched vite.overlay.config.js IIFE HUD.
// This is a normal HTML app build (NOT lib/iife) so React.lazy() dynamic-import
// chunks actually emit and code-splitting works. Same base/plugin/define as the
// overlay so assets and process.env stubs behave identically.
//
// root = src/app so index.html (the rollup input) emits at dist-app/index.html.
// base MUST be "/overlay/" (the subpath the bundle is deployed + served at on
// play.dcl.one), because the SPA is INJECTED into the bevy index.html at the
// site root — so runtime asset() URLs (asset.js = BASE_URL + path, resolved vs
// document.baseURI = https://play.dcl.one/) must point at /overlay/, not the
// page root. With base:"./" every asset() image 404'd (logo, icons) → broken
// chrome + a console-error storm. publicDir/outDir point at the ui3 root.
export default defineConfig({
  root: "src/app",
  base: "/",
  publicDir: "../../public",
  plugins: [react()],
  define: {
    "process.env.NODE_ENV": JSON.stringify("production"),
    "process.env": "{}",
  },
  // Fixtures + reused components live outside src/app; allow the dev server to
  // read them. The production build resolves the relative imports directly.
  server: {
    fs: { strict: false },
  },
  build: {
    outDir: "../../dist-app",
    emptyOutDir: true,
    rollupOptions: {
      output: {
        manualChunks(id) {
          if (!id.includes("node_modules")) return undefined;
          if (id.includes("react-dom") || /\/react\/|\/react\/jsx/.test(id))
            return "vendor-react";
          if (id.includes("@tanstack")) return "vendor-query";
          if (id.includes("react-router")) return "vendor-router";
          if (id.includes("zod")) return "vendor-zod";
          return undefined;
        },
      },
    },
  },
});
