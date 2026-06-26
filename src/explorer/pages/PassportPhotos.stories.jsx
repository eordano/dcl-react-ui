import WearablePreview from "../../wearable-preview/WearablePreview.jsx";
import PassportPhotos from "./PassportPhotos.jsx";

export default {
  title: "Explorer/Pages/PassportPhotos",
  component: PassportPhotos,
  parameters: { layout: "fullscreen" },
};

// Hero shows the REAL 3D avatar (story supplies three.js via the avatarPreview
// prop; the component stays zero-dep). A real catalyst address loads an avatar.
const SHOWCASE_ADDRESS = "0xf12c21d3edb2c0e68935a3bbe5d68ae4bf9dcd7c";
const avatar = (emote = "wave") => (
  <div style={{ width: "100%", height: "100%" }}>
    <WearablePreview profile={SHOWCASE_ADDRESS} emote={emote} zoom={1.1} />
  </div>
);

export const Default = {
  render: () => <PassportPhotos avatarPreview={avatar()} />,
};

// Zero-dep fallback: the Avatar circle when no 3D preview is injected.
export const Placeholder = {
  render: () => <PassportPhotos />,
};
