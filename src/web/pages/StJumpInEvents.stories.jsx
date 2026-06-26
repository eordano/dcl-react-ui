import StJumpInEvents from "./StJumpInEvents.jsx";

export default {
  title: "Web/Pages/Jump In/Events",
  component: StJumpInEvents,
  parameters: { layout: "fullscreen" },
  argTypes: {
    state: {
      name: "State",
      description:
        "Lifecycle of the event landing page. `invalid` renders the shared 'Oops!' fallback (folded in from the old Events Invalid component).",
      control: "select",
      options: ["upcoming", "reminded", "live", "ended", "deleted", "loading", "invalid"],
    },
    isReminded: {
      name: "Reminded",
      description: "Pre-toggle the REMIND ME bell (only meaningful for the upcoming state).",
      control: "boolean",
      if: { arg: "state", eq: "upcoming" },
    },
    invalidVariant: {
      name: "Invalid layout",
      description: "Desktop vs. mobile rendering of the invalid fallback.",
      control: "inline-radio",
      options: ["desktop", "mobile"],
      if: { arg: "state", eq: "invalid" },
    },
  },
  args: {
    state: "upcoming",
    isReminded: false,
    invalidVariant: "desktop",
  },
};

// Single story; flip `state` in Controls to walk the lifecycle, or pick `invalid` for the fallback.
export const Events = {};
