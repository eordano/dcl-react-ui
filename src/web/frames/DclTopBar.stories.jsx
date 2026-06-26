import DclTopBar from "./DclTopBar.jsx";

export default {
  title: "Web/Frames/DclTopBar",
  component: DclTopBar,
  parameters: { layout: "fullscreen" },
};

export const SignedOut = {
  render: () => <DclTopBar active="shop" signedIn={false} />,
};

export const SignedIn = {
  render: () => <DclTopBar active="shop" signedIn mana="2,480.55" account="0x9f3c…7a21" />,
};

export const DaoVariant = {
  render: () => <DclTopBar variant="dao" active="vote" />,
};

export const SitesVariant = {
  render: () => <DclTopBar variant="sites" active="whatson" />,
};
