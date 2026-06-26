import AssetActionLayout from "./AssetActionLayout.jsx";
import AssetPreviewTile from "../components/AssetPreviewTile.jsx";
import ManaMark from "../../atoms/ManaMark.jsx";

export default {
  title: "Marketplace/Frames/AssetActionLayout",
  component: AssetActionLayout,
  parameters: { layout: "fullscreen" },
};

const Buttons = ({ submit = "List for sale" }) => (
  <div style={{ display: "flex", gap: 14 }}>
    <button type="button" style={{ padding: "10px 20px", borderRadius: 999 }}>Cancel</button>
    <button type="button" style={{ padding: "10px 20px", borderRadius: 999 }}>{submit}</button>
  </div>
);

export const Light = {
  render: () => (
    <AssetActionLayout
      theme="light"
      title="List for sale"
      subtitle={<>Set a price and expiration date for <b>Cyber Ronin Jacket</b>.</>}
      media={<AssetPreviewTile rarity="legendary" />}
    >
      <Buttons />
    </AssetActionLayout>
  ),
};

export const Dark = {
  render: () => (
    <AssetActionLayout
      theme="dark"
      center
      maxWidth={980}
      title="Place a bid"
      subtitle={<>Set a price and expiration date for your bid on <b>Pioneer Jacket</b>.</>}
      warning={<span style={{ fontSize: 13, color: "var(--ink-6)" }}>Pay with Polygon MANA to have gas fees covered for you by the DAO.</span>}
      media={<AssetPreviewTile rarity="mythic" figure="plate" chipPosition="bottom" />}
    >
      <Buttons submit="Bid" />
    </AssetActionLayout>
  ),
};

export const IconBack = {
  render: () => (
    <AssetActionLayout
      theme="dark"
      backLabel={null}
      maxWidth={920}
      title="Transfer Wearable"
      subtitle={<><b>Cyber Ronin Jacket</b> can't be transferred because it's on sale.</>}
      subtitleTone="danger"
      media={<AssetPreviewTile rarity="epic" figure="inset" label={null} />}
    >
      <Buttons submit="Transfer" />
    </AssetActionLayout>
  ),
};

export const Status = {
  render: () => (
    <AssetActionLayout
      theme="dark"
      variant="status"
      hideBack
      iconTone="success"
      icon={
        <svg viewBox="0 0 24 24" width="34" height="34" fill="none" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round">
          <path d="M20 6 9 17l-5-5" />
        </svg>
      }
      title="Listing removed"
      subtitle="Your listing has been removed. The item is no longer for sale."
    >
      <Buttons submit="View item" />
    </AssetActionLayout>
  ),
};

export const SmallTile = {
  render: () => (
    <div style={{ padding: 40, background: "var(--panel)" }}>
      <AssetPreviewTile
        rarity="legendary"
        label={null}
        size={55}
        radius={6}
      >
        <ManaMark size={22} />
      </AssetPreviewTile>
    </div>
  ),
};
