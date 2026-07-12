import { existsSync } from "node:fs";
import { fileURLToPath } from "node:url";
import type { StorybookConfig } from "@storybook/react-vite";
import { mswStaticBuildAliases, siteAliases } from "./site-aliases";

const REPO_ROOT = fileURLToPath(new URL("../..", import.meta.url));

const config = {
  stories: [
    "../src/**/*.stories.@(js|jsx|ts|tsx)",
    "../src/**/*.mdx",
    ...(existsSync(new URL("../../sites/app", import.meta.url))
      ? [
          "../../sites/app/route-stories/**/*.stories.@(ts|tsx)",
          "../../sites/app/stories/**/*.stories.@(ts|tsx)",
          "../../sites/app/stories/**/*.mdx",
        ]
      : []),
  ],
  addons: [
    "@storybook/addon-links",
    "@storybook/addon-vitest",
    "@storybook/addon-docs",
    "@storybook/addon-a11y",
  ],
  framework: { name: "@storybook/react-vite", options: {} },
  staticDirs: [
    "../public",
    "./public",
    ...(existsSync(new URL("../../tools/screen-tour/tours", import.meta.url))
      ? [{ from: "../../tools/screen-tour/tours", to: "/tours" }]
      : []),
  ],
  viteFinal: async (config, { configType }) => {
    config.base = "./";
    const aliases =
      configType === "PRODUCTION" ? { ...siteAliases, ...mswStaticBuildAliases } : siteAliases;
    const resolve = (config.resolve ??= {});
    if (Array.isArray(resolve.alias)) {
      resolve.alias = [
        ...resolve.alias,
        ...Object.entries(aliases).map(([find, replacement]) => ({ find, replacement })),
      ];
    } else {
      resolve.alias = { ...(resolve.alias as Record<string, string> | undefined), ...aliases };
    }
    resolve.dedupe = [...new Set([...(resolve.dedupe ?? []), "react", "react-dom"])];
    const server = (config.server ??= {});
    const fs = (server.fs ??= {});
    fs.allow = [...(fs.allow ?? []), REPO_ROOT];
    const od = (config.optimizeDeps ??= {});
    od.include = [
      ...(od.include ?? []),
      "react", "react-dom", "react-dom/client", "react/jsx-runtime",
      "react/jsx-dev-runtime",
      "@tanstack/react-query", "react-router", "zod", "three",
      "qrcode-generator", "viem", "viem/accounts",
    ];
    if (process.env.DCL_SB_SCRATCH_CACHE) {
      config.cacheDir = process.env.DCL_SB_SCRATCH_CACHE;
    }
    const build = (config.build ??= {});
    const ro = ((build as { rollupOptions?: { external?: unknown[] } }).rollupOptions ??= {});
    ro.external = [...((ro.external as unknown[]) ?? []), /^monaco-editor/];
    return config;
  },
} satisfies StorybookConfig;

export default config;
