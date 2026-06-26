import ChInspectorAssetsPanel from "./ChInspectorAssetsPanel.jsx";

export default {
  title: "CreatorHub/Components/Inspector: Assets",
  component: ChInspectorAssetsPanel,
  parameters: { layout: "fullscreen" },
};

export const Default = { args: { tab: "packs", theme: null } };

export const AssetPackCategories = { args: { tab: "packs", theme: "shapes" } };

export const LocalAssets = { args: { tab: "local", theme: null } };

export const CustomItems = { args: { tab: "custom", theme: null } };

export const DebugConsole = { args: { tab: "console", theme: null } };
