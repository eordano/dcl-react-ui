import AssetPreviewTile from "./AssetPreviewTile.jsx";
import ManaMark from "../../atoms/ManaMark.jsx";

const THUMB = (urn) =>
  `https://peer.decentraland.org/lambdas/collections/contents/${urn}/thumbnail`;

const ITEMS = {
  common: { name: "Macarena", urn: "urn:decentraland:matic:collections-v2:0xb53081d7db78456eb436702c2f50a90436c8633f:0" },
  uncommon: { name: "Pride Jetpack", urn: "urn:decentraland:matic:collections-v2:0xee6d52f3f05eb4540ab754d0f3fabbf97f8555fc:0" },
  rare: { name: "Wren", urn: "urn:decentraland:matic:collections-v2:0x2e3a685b2cbcf10ded65860f8bc63a865658ae0c:0" },
  epic: { name: "Stand with Crypto Hoodie", urn: "urn:decentraland:matic:collections-v2:0x2e4615470f56bbb5780262b9297bc4e968e8fb3e:0" },
  legendary: { name: "Skillit Hoodie", urn: "urn:decentraland:matic:collections-v2:0xe2750c571568e434d5351d25a97bcb0ea12ceed0:4" },
  mythic: { name: "Potion Maker Top", urn: "urn:decentraland:matic:collections-v2:0x11b804bec37cddc70aef6eab0b88d6c6c59c4621:0" },
  unique: { name: "Relic of Opulence", urn: "urn:decentraland:matic:collections-v2:0x2d19c4f2212ec37ed48eb8134ffbc0a695612986:0" },
  exotic: { name: "Space Force Ones", urn: "urn:decentraland:matic:collections-v2:0xa780096910ce7fc4663ad3a954b34e2d842f0374:0" },
};
const img = (r) => THUMB(ITEMS[r].urn);
const alt = (r) => ITEMS[r].name;

export default {
  title: "Marketplace/Components/AssetPreviewTile",
  component: AssetPreviewTile,
  parameters: {
    layout: "centered",
    backgrounds: { default: "panel", values: [{ name: "panel", value: "#161518" }] },
  },
  decorators: [
    (Story) => (
      <div style={{ minWidth: 280, boxSizing: "border-box" }}>
        <Story />
      </div>
    ),
  ],
};

export const Default = () => (
  <AssetPreviewTile rarity="legendary" image={img("legendary")} alt={alt("legendary")} />
);

export const PlateBottomChip = () => (
  <AssetPreviewTile rarity="mythic" figure="plate" chipPosition="bottom" />
);

export const InsetNoChip = () => (
  <AssetPreviewTile rarity="epic" figure="inset" label={null} />
);

export const CustomLabel = () => (
  <AssetPreviewTile rarity="rare" label="For sale" image={img("rare")} alt={alt("rare")} />
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
        <AssetPreviewTile
          key={r}
          rarity={r}
          image={img(r)}
          alt={alt(r)}
          style={{ width: 150, height: 150 }}
        />
      )
    )}
  </div>
);
