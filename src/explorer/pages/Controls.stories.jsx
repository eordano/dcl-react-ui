import Controls from "./Controls.jsx";

export default {
  title: "Explorer/Pages/Controls",
  component: Controls,
  parameters: {
    layout: "fullscreen",
    docs: {
      description: {
        component:
          "In-world **Settings** overlay for the Explorer HUD — the screen that opens on " +
          "the *Settings* tab of `ExploreChrome` (the in-world Explore menu). It hosts the " +
          "settings sections (Graphics / Sounds / Controls / Chat); this mock currently shows " +
          "the **Controls** section: mouse vertical & horizontal sensitivity, Head Sync, and " +
          "Point-At marker visibility.\n\n" +
          "Despite the file name, it is not a generic control widget — read it as the " +
          "*Settings panel*. **Default** renders it inside the full ExploreChrome HUD (top-nav " +
          "tabs + this panel active). **Panel** renders it `bare` — just the settings panel over " +
          "the in-world scene — i.e. the standalone surface on its own.",
      },
    },
  },
  argTypes: {
    bare: {
      control: "boolean",
      description:
        "Render only the settings panel, without the surrounding ExploreChrome HUD nav.",
    },
  },
};

export const Default = {
  args: { bare: false },
};

export const Panel = {
  args: { bare: true },
};
