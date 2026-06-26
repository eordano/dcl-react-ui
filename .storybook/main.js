export default {
  stories: ["../src/**/*.stories.@(js|jsx)"],
  addons: ["@storybook/addon-links"],
  framework: { name: "@storybook/react-vite", options: {} },
  staticDirs: ["../public"],
  viteFinal: async (config) => {
    // Relative base so the catalog works under the /ui/ subpath and on Pages.
    config.base = "./";
    return config;
  },
};
