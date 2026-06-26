import CardSkeleton from "./CardSkeleton.jsx";
import CardGrid from "./CardGrid.jsx";

export default {
  title: "Components/CardSkeleton",
  component: CardSkeleton,
  parameters: {
    layout: "centered",
    backgrounds: { default: "market", values: [{ name: "market", value: "#0e0d10" }] },
  },
};

const Frame = ({ children }) => <div style={{ width: 240 }}>{children}</div>;

export const Default = () => (
  <Frame>
    <CardSkeleton />
  </Frame>
);

export const ThreeLines = () => (
  <Frame>
    <CardSkeleton lines={3} />
  </Frame>
);

export const TextOnly = () => (
  <Frame>
    <CardSkeleton thumb={0} lines={3} />
  </Frame>
);

export const Grid = () => (
  <div style={{ width: 760 }}>
    <CardGrid>
      {Array.from({ length: 8 }).map((_, i) => (
        <CardSkeleton key={i} />
      ))}
    </CardGrid>
  </div>
);
