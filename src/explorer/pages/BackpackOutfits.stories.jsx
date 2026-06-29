import WearablePreview from "../../wearable-preview/WearablePreview.jsx";
import BackpackOutfits from "./BackpackOutfits.jsx";

export default {
  title: "Explorer/Pages/BackpackOutfits",
  component: BackpackOutfits,
  parameters: { layout: "fullscreen" },
};

const SHOWCASE_ADDRESS = "0xf12c21d3edb2c0e68935a3bbe5d68ae4bf9dcd7c";
const avatar = (emote = "wave") => (
  <div style={{ width: "100%", height: "100%" }}>
    <WearablePreview profile={SHOWCASE_ADDRESS} emote={emote} zoom={1.05} />
  </div>
);

export const Default = {
  render: () => <BackpackOutfits avatarPreview={avatar()} />,
};

export const Placeholder = {
  render: () => <BackpackOutfits />,
};
