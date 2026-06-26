import ProfileWidget from "./ProfileWidget.jsx";

export default {
  title: "Explorer/Components/ProfileWidget",
  component: ProfileWidget,
  parameters: { layout: "fullscreen" },
};

const Backdrop = (Story) => (
  <div style={{ minHeight: "100vh", background: "#0d0d12" }}>
    <Story />
  </div>
);

export const Default = {
  decorators: [Backdrop],
  args: {
    name: "Evaristo",
    tag: "#d5f0",
    wallet: "0x23b...7d5f0",
  },
};

export const LongName = {
  decorators: [Backdrop],
  args: {
    name: "Decentralandia",
    tag: "#a1c9",
    wallet: "0x9f4...1a2b3",
  },
};
