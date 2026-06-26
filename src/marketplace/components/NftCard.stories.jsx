import NftCard from "./NftCard.jsx";

export default {
  title: "Marketplace/Components/NftCard",
  component: NftCard,
  parameters: {
    layout: "centered",
    backgrounds: { default: "market", values: [{ name: "market", value: "#0e0d10" }] },
  },
};

const Frame = ({ children }) => <div style={{ width: 220 }}>{children}</div>;

export const Default = () => (
  <Frame>
    <NftCard name="Cyber Ronin Jacket" collection="NeonForge" price="1,250" rarity="legendary" tag="Mint" />
  </Frame>
);

export const NotForSale = () => (
  <Frame>
    <NftCard name="Aurora Wings" collection="Skybound" rarity="mythic" />
  </Frame>
);

export const Rarities = () => (
  <div style={{ display: "flex", gap: 16, flexWrap: "wrap", width: 760 }}>
    {["common", "uncommon", "rare", "epic", "legendary", "mythic", "unique", "exotic"].map((r) => (
      <div key={r} style={{ width: 170 }}>
        <NftCard name={r[0].toUpperCase() + r.slice(1)} collection="Sample Set" price="500" rarity={r} />
      </div>
    ))}
  </div>
);
