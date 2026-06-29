import WearablePreview from "../../wearable-preview/WearablePreview.jsx";
import BackpackEmotes from "./BackpackEmotes.jsx";

export default {
  title: "Explorer/Pages/BackpackEmotes",
  component: BackpackEmotes,
  parameters: { layout: "fullscreen" },
};

const SHOWCASE_ADDRESS = "0xf12c21d3edb2c0e68935a3bbe5d68ae4bf9dcd7c";
const avatar = (emote = "dance") => (
  <div style={{ width: "100%", height: "100%" }}>
    <WearablePreview profile={SHOWCASE_ADDRESS} emote={emote} zoom={1.05} />
  </div>
);

export const Default = {
  render: () => <BackpackEmotes avatarPreview={avatar()} />,
};

export const Placeholder = {
  render: () => <BackpackEmotes />,
};
