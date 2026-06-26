import MkMySalesHistory from "./MkMySalesHistory.jsx";

export default {
  title: "Marketplace/Pages/My Sales history",
  component: MkMySalesHistory,
  parameters: { layout: "fullscreen" },
};

export const Default = {
  render: () => <MkMySalesHistory />,
};

export const Loading = {
  render: () => <MkMySalesHistory isLoading />,
};

export const Empty = {
  render: () => (
    <MkMySalesHistory
      stats={{
        totalSales: 0,
        totalEarnings: "0",
        royalties: "0",
        ethereumEarned: "0",
        maticEarned: "0",
      }}
      sales={[]}
      count={0}
    />
  ),
};
