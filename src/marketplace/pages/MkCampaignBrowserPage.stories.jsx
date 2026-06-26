import MkCampaignBrowserPage from "./MkCampaignBrowserPage.jsx";

export default {
  title: "Marketplace/Pages/CampaignBrowser",
  component: MkCampaignBrowserPage,
  parameters: { layout: "fullscreen" },
};

export const Default = {};

export const Loading = {
  args: { isLoadingCampaign: true },
};

export const Empty = {
  args: { isEmpty: true },
};
