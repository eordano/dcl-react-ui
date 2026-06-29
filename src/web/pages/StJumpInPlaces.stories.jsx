import StJumpInPlaces from "./StJumpInPlaces.jsx";

export default {
  title: "Web/Pages/Jump In/Places",
  component: StJumpInPlaces,
  parameters: { layout: "fullscreen" },
  argTypes: {
    variant: {
      name: "Variant",
      description:
        "Which place landing to render. `invalid` shows the shared 'Oops!' fallback (folded in from the old Places Invalid component).",
      control: "select",
      options: ["place", "world", "generic", "loading", "invalid"],
    },
    invalidVariant: {
      name: "Invalid layout",
      description: "Desktop vs. mobile rendering of the invalid fallback.",
      control: "inline-radio",
      options: ["desktop", "mobile"],
      if: { arg: "variant", eq: "invalid" },
    },
  },
  args: {
    variant: "place",
    invalidVariant: "desktop",
  },
};

export const Places = {};
