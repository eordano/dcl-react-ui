import CardGrid from "./CardGrid.jsx";
import NftCard from "../marketplace/components/NftCard.jsx";
import CardSkeleton from "./CardSkeleton.jsx";

export default {
  title: "Components/CardGrid",
  component: CardGrid,
  parameters: {
    layout: "fullscreen",
    backgrounds: { default: "market", values: [{ name: "market", value: "#0e0d10" }] },
  },
};

const Pad = ({ children }) => <div style={{ padding: 24 }}>{children}</div>;

const SAMPLE = [
  { name: "Cyber Ronin Jacket", collection: "NeonForge", price: "1,250", rarity: "legendary", tag: "Mint" },
  { name: "Aurora Wings", collection: "Skybound", price: "880", rarity: "mythic" },
  { name: "Parcel 64,12", collection: "Decentraland", price: "4,200", rarity: "unique" },
  { name: "Glass Visor", collection: "Sample Set", price: "120", rarity: "rare" },
  { name: "Forest Cloak", collection: "Sample Set", price: "240", rarity: "epic" },
  { name: "Pixel Boots", collection: "Sample Set", price: "60", rarity: "uncommon" },
];

export const Default = () => (
  <Pad>
    <CardGrid>
      {SAMPLE.map((it, i) => (
        <NftCard key={i} {...it} />
      ))}
    </CardGrid>
  </Pad>
);

export const TighterCards = () => (
  <Pad>
    <CardGrid min={228} gap={18}>
      {SAMPLE.map((it, i) => (
        <NftCard key={i} {...it} />
      ))}
    </CardGrid>
  </Pad>
);

export const WideCards = () => (
  <Pad>
    <CardGrid min={320} gap={20}>
      {SAMPLE.map((it, i) => (
        <NftCard key={i} {...it} />
      ))}
    </CardGrid>
  </Pad>
);

export const Loading = () => (
  <Pad>
    <CardGrid>
      {Array.from({ length: 8 }).map((_, i) => (
        <CardSkeleton key={i} />
      ))}
    </CardGrid>
  </Pad>
);

export const FixedTwoColumns = () => (
  <Pad>
    <CardGrid cols={2} gap={22}>
      {SAMPLE.slice(0, 4).map((it, i) => (
        <NftCard key={i} {...it} />
      ))}
    </CardGrid>
  </Pad>
);

export const ResponsiveColumns = () => (
  <Pad>
    <CardGrid cols={{ base: 4, lg: 3, md: 2 }} gap={16}>
      {SAMPLE.map((it, i) => (
        <NftCard key={i} {...it} />
      ))}
    </CardGrid>
  </Pad>
);

export const ReservedHeight = () => (
  <Pad>
    <CardGrid min={250} gap={12} minHeight={606} style={{ outline: "1px dashed rgba(255,255,255,.2)" }}>
      {SAMPLE.slice(0, 3).map((it, i) => (
        <NftCard key={i} {...it} />
      ))}
    </CardGrid>
  </Pad>
);
