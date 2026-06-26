import WearablePreview from "../../wearable-preview/WearablePreview.jsx";
import StProfile from "./StProfile.jsx";

export default {
  title: "Web/Pages/Profile/Profile",
  component: StProfile,
  parameters: { layout: "fullscreen" },
};

// Default fixtures use placeholder addresses; this real one renders an actual catalyst profile.
const SHOWCASE_ADDRESS = "0xf12c21d3edb2c0e68935a3bbe5d68ae4bf9dcd7c";
// Fill the column and zoom in so the avatar reads as a hero, not a lost figure.
const avatar = (emote = "wave") => (
  <div style={{ width: "100%", height: "100%" }}>
    <WearablePreview profile={SHOWCASE_ADDRESS} emote={emote} zoom={1.2} />
  </div>
);

export const Default = {
  render: () => <StProfile avatarPreview={avatar()} />,
};

export const OwnProfile = {
  render: () => <StProfile isOwnProfile avatarPreview={avatar("dance")} />,
};

export const Empty = {
  render: () => (
    <StProfile
      profile={{
        address: "0x9b8a7c6d5e4f3a2b1c0d9e8f7a6b5c4d3e2f1a0b",
        name: "newcomer",
        hasClaimedName: false,
        nameColor: "#73D3D3",
        mutualCount: 0,
        badges: [],
        bio: "",
        info: [],
        links: [],
        equipped: [],
      }}
    />
  ),
};

export const Loading = {
  render: () => <StProfile loading />,
};
