import WearablePreview from "../../wearable-preview/WearablePreview.jsx";

// Real 3D avatar via the isolated three.js-only WearablePreview (lazy/code-split;
// three is not in ui3). Transparent canvas; Storybook Controls drive camera/emote.
const PROFILE = "0xf12c21d3edb2c0e68935a3bbe5d68ae4bf9dcd7c";

// an explicit asset list (base wearables) — pick exactly what the avatar wears
const BODY = "urn:decentraland:off-chain:base-avatars:BaseMale";
const OUTFIT_URNS = [
  "urn:decentraland:off-chain:base-avatars:eyes_00",
  "urn:decentraland:off-chain:base-avatars:eyebrows_00",
  "urn:decentraland:off-chain:base-avatars:mouth_00",
  "urn:decentraland:off-chain:base-avatars:cornrows",
  "urn:decentraland:off-chain:base-avatars:beard",
  "urn:decentraland:off-chain:base-avatars:green_hoodie",
  "urn:decentraland:off-chain:base-avatars:brown_pants",
  "urn:decentraland:off-chain:base-avatars:sneakers",
];

export default {
  title: "Explorer/Components/AvatarPreview",
  component: WearablePreview,
  parameters: { layout: "fullscreen" },
  argTypes: {
    emote: { control: "select", options: ["", "idle", "wave", "dance", "clap", "dab"] },
    zoom: { control: { type: "range", min: 0.5, max: 3, step: 0.1 } },
    yaw: { control: { type: "range", min: -180, max: 180, step: 5 } },
    pitch: { control: { type: "range", min: -45, max: 45, step: 1 } },
    fov: { control: { type: "range", min: 15, max: 70, step: 1 } },
    targetY: { control: { type: "range", min: 0, max: 1, step: 0.02 } },
    spin: { control: "boolean" },
    controls: { control: "boolean" },
    background: { control: "color" },
  },
  args: {
    profile: PROFILE,
    emote: "dance",
    zoom: 1,
    yaw: 0,
    pitch: 20,
    fov: 34,
    targetY: 0.5,
    spin: true,
    controls: true,
  },
};

const wrap = {
  minHeight: "100vh",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  padding: "48px",
  background: "#15151c",
};
const box = {
  width: "min(420px, 80vw)",
  height: "min(620px, 86vh)",
  background: "radial-gradient(60% 70% at 50% 36%, #2a2540 0%, #15151c 78%)",
  borderRadius: 20,
};

// Drives the live Controls panel (zoom / yaw / pitch / fov / emote / spin / background).
export const Default = {
  name: "Live (3D · controls)",
  render: (args) => (
    <div style={wrap}>
      <div style={box}>
        <WearablePreview {...args} />
      </div>
    </div>
  ),
};

// Transparent canvas demonstrated over a checkerboard — only the avatar is opaque.
export const Transparent = {
  args: { emote: "wave", spin: false },
  render: (args) => (
    <div
      style={{
        ...wrap,
        background: "repeating-conic-gradient(#26262e 0% 25%, #17171d 0% 50%) 0 / 30px 30px",
      }}
    >
      <div style={{ width: "min(420px, 80vw)", height: "min(620px, 86vh)" }}>
        <WearablePreview {...args} background={undefined} />
      </div>
    </div>
  ),
};

// Framed-in portrait: zoomed, angled, head-height target, no spin.
export const Headshot = {
  args: { emote: "", zoom: 1.8, yaw: 18, pitch: 4, targetY: 0.84, spin: false },
  render: (args) => (
    <div style={wrap}>
      <div style={box}>
        <WearablePreview {...args} />
      </div>
    </div>
  ),
};

// Dress the avatar from an explicit list of wearable URNs (no profile).
export const AssetList = {
  name: "Asset list (urns)",
  render: () => (
    <div style={wrap}>
      <div style={box}>
        <WearablePreview body={BODY} urns={OUTFIT_URNS} emote="wave" />
      </div>
    </div>
  ),
};

// Render a saved outfit (fetched from /lambdas/outfits/<address>).
export const SavedOutfit = {
  name: "Saved outfit (slot)",
  render: () => (
    <div style={wrap}>
      <div style={box}>
        <WearablePreview outfit={{ address: "0x4274c2545f2263f820f4e5dc19cca999c955238c", slot: 0 }} emote="wave" />
      </div>
    </div>
  ),
};
