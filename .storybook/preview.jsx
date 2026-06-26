import { linkTo } from "@storybook/addon-links";
import "./preview.css";

// Experience flow: any element carrying data-sb-linkto="<Story Title>" navigates
// to that story when clicked, recreating the real explorer journey (Sidebar rail,
// ExploreChrome tabs, etc.). Keeps ui3 zero-dep — components only emit a string
// attribute; linkTo (addon-links) lives here in the dev-only manager/preview.
const withExperienceLinks = (Story) => {
  const onClick = (e) => {
    const el = e.target.closest && e.target.closest("[data-sb-linkto]");
    if (!el) return;
    e.preventDefault();
    e.stopPropagation();
    linkTo(el.getAttribute("data-sb-linkto"))(e);
  };
  return (
    <div style={{ display: "contents" }} onClick={onClick}>
      <Story />
    </div>
  );
};

const SCRIM_STYLE = {
  position: "fixed",
  inset: 0,
  background: "rgba(0, 0, 0, .502)",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  padding: 24,
};
const withOverlayScrim = (Story, ctx) => {
  const tagged = ctx.tags?.includes("overlay") || ctx.parameters?.overlay;
  if (!tagged) return <Story />;
  return (
    <div style={SCRIM_STYLE}>
      <Story />
    </div>
  );
};

const withSceneBackdrop = (Story, ctx) => {
  const tagged = ctx.tags?.includes("scene-backdrop") || ctx.parameters?.sceneBackdrop;
  if (!tagged) return <Story />;
  return (
    <>
      <div className="scene-bd" aria-hidden="true">
        <div className="scene-bd__rail" />
        <div className="scene-bd__minimap" />
        <div className="scene-bd__chat" />
      </div>
      <Story />
    </>
  );
};

// Dapp surfaces adopt ui2's rectangular design system (.ui2 scope). Whole dapp
// web-app namespaces match ui2 — their chrome stories already inherit .ui2 via
// *Chrome, and their standalone modal/page stories are scoped here too. In-world
// explorer/social surfaces (Islands HUD, OpenDCL overlays, and the in-world
// menus under ExplorerPages/ — Backpack/Map/Settings/Places/Events/Friends/
// Communities/Passport/Reel/Gallery, plus Login-adjacent Lobby + loading/scene
// screens) stay explorer-styled and are NOT scoped. The 9 dapp pages that remain
// under Pages/ are listed individually in UI2_PAGE_TITLES below. A story can also
// opt in via tags:["ui2"]
// or parameters:{ui2:true}. (ExploreChrome is in-world HUD — intentionally exempt.)
const UI2_NAMESPACES = [
  "Account/",
  "Builder/",
  "Marketplace/",
  "Governance/",
  "Sites/",
  "CreatorHub/",
  "Forum/",
  "SceneLab/",
  "DCLEditor/",
];
const UI2_PAGE_TITLES = new Set([
  // dapp pages that live under Pages/ (not an in-world menu)
  "Pages/Donations",
  "Pages/Gifting",
  "Pages/MarketplaceCredits",
  "Pages/MarketplaceUnlocked",
  "Pages/CreditsStates",
  // auth (per parity contract: auth must match ui2)
  "Pages/Login",
  "Pages/Otp",
  "Pages/Verify",
  "Pages/Web3Confirm",
]);
const withDappScope = (Story, ctx) => {
  const t = ctx.title || "";
  const scoped =
    ctx.tags?.includes("ui2") ||
    ctx.parameters?.ui2 ||
    UI2_PAGE_TITLES.has(t) ||
    UI2_NAMESPACES.some((ns) => t.startsWith(ns));
  if (!scoped) return <Story />;
  return (
    <div className="ui2" style={{ display: "contents" }}>
      <Story />
    </div>
  );
};

const withTheme = (Story, ctx) => {
  if (typeof document !== "undefined") {
    const light = ctx.globals.theme === "light";
    document.documentElement.classList.toggle("theme-light", light);
    document.documentElement.classList.toggle("mp-light", light);
  }
  return <Story />;
};

const preview = {
  decorators: [withExperienceLinks, withTheme, withDappScope, withOverlayScrim, withSceneBackdrop],
  globalTypes: {
    theme: {
      description: "App theme — Dark (default, app-consistent) / Light (faithful upstream)",
      toolbar: {
        title: "Theme",
        icon: "contrast",
        items: [
          { value: "dark", title: "Theme: Dark" },
          { value: "light", title: "Theme: Light" },
        ],
        dynamicTitle: true,
      },
    },
  },
  parameters: {
    layout: "fullscreen",
    controls: { matchers: { color: /(background|color)$/i, date: /Date$/i } },
    options: {
      // Sidebar order by "complexity": shared primitives first, then the active
      // surfaces (most-used first), then everything else alphabetically (the "*"
      // bucket), and finally the experimental/deprecated surfaces. Two dividers
      // (before Web, before Builder) are drawn in .storybook/manager.js.
      storySort: {
        order: [
          "Atoms", "Components",
          "Web", "Explorer", "Marketplace", "*",
          "Builder", "CreatorHub", "Forum", "OpenDCL", "SceneLab", // experimental / deprecated
        ],
      },
    },
  },
  initialGlobals: { theme: "dark" },
};

export default preview;
