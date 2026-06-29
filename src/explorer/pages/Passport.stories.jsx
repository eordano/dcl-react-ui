import WearablePreview from "../../wearable-preview/WearablePreview.jsx";
import Passport from "./Passport.jsx";

export default {
  title: "Explorer/Pages/Passport",
  component: Passport,
  parameters: { layout: "fullscreen" },
};

const SHOWCASE_ADDRESS = "0xf12c21d3edb2c0e68935a3bbe5d68ae4bf9dcd7c";
const avatar = (emote = "wave") => (
  <div style={{ width: "100%", height: "100%" }}>
    <WearablePreview profile={SHOWCASE_ADDRESS} emote={emote} zoom={1.1} />
  </div>
);

export const Default = {
  render: () => <Passport avatarPreview={avatar()} />,
};

export const Placeholder = {
  render: () => <Passport />,
};
