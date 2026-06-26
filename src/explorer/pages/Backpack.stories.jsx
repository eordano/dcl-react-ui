import WearablePreview from "../../wearable-preview/WearablePreview.jsx";
import Backpack from "./Backpack.jsx";

export default {
  title: "Explorer/Pages/Backpack",
  component: Backpack,
  parameters: { layout: "fullscreen" },
};

// The Backpack is the avatar editor — it must show the REAL 3D avatar. The story
// supplies three.js via the avatarPreview prop so the component stays zero-dep.
const SHOWCASE_ADDRESS = "0xf12c21d3edb2c0e68935a3bbe5d68ae4bf9dcd7c";
const avatar = (emote = "wave") => (
  <div style={{ width: "100%", height: "100%" }}>
    <WearablePreview profile={SHOWCASE_ADDRESS} emote={emote} zoom={1.05} />
  </div>
);

export const Default = {
  render: () => <Backpack avatarPreview={avatar()} />,
};

// Zero-dep fallback: the Avatar circle when no 3D preview is injected.
export const Placeholder = {
  render: () => <Backpack />,
};
