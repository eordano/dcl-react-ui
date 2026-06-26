import WearablePreview from "../../wearable-preview/WearablePreview.jsx";
import ChatProfile from "./ChatProfile.jsx";

export default {
  title: "Explorer/Pages/ChatProfile",
  component: ChatProfile,
  tags: ["overlay"],
  parameters: { layout: "fullscreen" },
};

// Chat profile popup hero: real 3D avatar injected via the zero-dep avatarPreview
// prop (story supplies three.js; the component stays dependency-free).
const SHOWCASE_ADDRESS = "0x4274c2545f2263f820f4e5dc19cca999c955238c";
const avatar = (emote = "wave") => (
  <div style={{ width: "100%", height: "100%" }}>
    <WearablePreview profile={SHOWCASE_ADDRESS} emote={emote} zoom={1.1} />
  </div>
);

export const Default = {
  render: () => <ChatProfile avatarPreview={avatar()} />,
};

// Zero-dep fallback: the Avatar circle when no 3D preview is injected.
export const Placeholder = {
  render: () => <ChatProfile />,
};
