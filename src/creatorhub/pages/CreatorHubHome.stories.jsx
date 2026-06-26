import CreatorHubHome from "./CreatorHubHome.jsx";

export default {
  title: "CreatorHub/Pages/Home",
  component: CreatorHubHome,
  parameters: { layout: "fullscreen" },
};

export const Default = {
  render: () => <CreatorHubHome />,
};

export const Empty = {
  render: () => <CreatorHubHome scenes={[]} />,
};

export const Unauthenticated = {
  render: () => <CreatorHubHome signedIn={false} />,
};
