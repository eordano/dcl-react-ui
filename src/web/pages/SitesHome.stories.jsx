import SitesHome from "./SitesHome.jsx";

export default {
  title: "Web/Pages/Home",
  component: SitesHome,
  parameters: { layout: "fullscreen" },
};

export const Default = {
  render: () => <SitesHome />,
};
