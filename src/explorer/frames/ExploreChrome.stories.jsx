import ExploreChrome from "./ExploreChrome.jsx";

export default {
  title: "Explorer/Frames/ExploreChrome",
  component: ExploreChrome,
  parameters: { layout: "fullscreen" },
};

export const Default = {
  args: {
    active: "events",
    user: "Evaristo",
    children: (
      <div style={{ padding: 32, color: "#fff", fontSize: 18 }}>
        Active screen content renders here.
      </div>
    ),
  },
};

export const PlacesActive = {
  args: {
    ...Default.args,
    active: "places",
  },
};

export const BackpackActive = {
  args: {
    ...Default.args,
    active: "backpack",
  },
};
