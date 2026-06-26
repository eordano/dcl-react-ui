import { addons } from "storybook/manager-api";

// Start with every group collapsed. `showRoots: false` demotes each top-level
// title segment (ExplorerMolecules, Account, Sites, …) from a force-expanded
// "root" header to a normal collapsible group, which the sidebar leaves
// collapsed by default. Only the auto-selected story's own branch expands.
addons.setConfig({
  sidebar: {
    showRoots: false,
  },
});

// Visual dividers (Storybook has no native sidebar separator), drawn as a rule
// above specific top-level groups per the storySort order in preview.jsx:
//   • above "web"     — splits the shared design system (Atoms, Components) from surfaces
//   • above "builder" — splits the active surfaces from experimental/deprecated ones
// Each sits above its row whether neighbouring groups are expanded or collapsed.
if (typeof document !== "undefined") {
  const style = document.createElement("style");
  style.textContent = `
    .sidebar-item[data-item-id="web"],
    [data-nodetype][data-item-id="web"],
    .sidebar-item[data-item-id="builder"],
    [data-nodetype][data-item-id="builder"] {
      margin-top: 12px !important;
      padding-top: 12px !important;
      border-top: 1px solid rgba(150, 150, 170, 0.22) !important;
    }
  `;
  document.head.appendChild(style);
}
