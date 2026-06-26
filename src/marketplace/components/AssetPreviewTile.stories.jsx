import AssetPreviewTile from "./AssetPreviewTile.jsx";
import ManaMark from "../../atoms/ManaMark.jsx";

export default {
  title: "Marketplace/Components/AssetPreviewTile",
  component: AssetPreviewTile,
  parameters: {
    layout: "centered",
    backgrounds: { default: "panel", values: [{ name: "panel", value: "#161518" }] },
  },
  // Width floor for the centered canvas — without it the tile's responsive width:100%
  // (≤768px) collapses to 0 when the addon panel narrows the canvas, hiding the tile.
  decorators: [
    (Story) => (
      <div style={{ minWidth: 280, boxSizing: "border-box" }}>
        <Story />
      </div>
    ),
  ],
};

export const Default = () => <AssetPreviewTile rarity="legendary" />;

export const PlateBottomChip = () => (
  <AssetPreviewTile rarity="mythic" figure="plate" chipPosition="bottom" />
);

export const InsetNoChip = () => (
  <AssetPreviewTile rarity="epic" figure="inset" label={null} />
);

export const CustomLabel = () => (
  <AssetPreviewTile rarity="rare" label="For sale" />
);

export const SmallModalImage = () => (
  <AssetPreviewTile rarity="legendary" label={null} size={55} radius={6}>
    <ManaMark size={22} />
  </AssetPreviewTile>
);

export const AllRarities = () => (
  <div style={{ display: "flex", flexWrap: "wrap", gap: 16 }}>
    {["common", "uncommon", "rare", "epic", "legendary", "mythic", "unique", "exotic"].map(
      (r) => (
        <AssetPreviewTile key={r} rarity={r} style={{ width: 150, height: 150 }} />
      )
    )}
  </div>
);
