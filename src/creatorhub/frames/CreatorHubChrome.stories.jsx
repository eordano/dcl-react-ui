import CreatorHubChrome from "./CreatorHubChrome.jsx";

export default {
  title: "CreatorHub/Frames/CreatorHubChrome",
  component: CreatorHubChrome,
  parameters: { layout: "fullscreen" },
};

const Body = () => (
  <div style={{ padding: 40, color: "rgba(255,255,255,.55)", fontSize: 14 }}>
    Page body renders here.
  </div>
);

export const Default = {
  render: () => (
    <CreatorHubChrome active="home">
      <Body />
    </CreatorHubChrome>
  ),
};

export const SignedIn = {
  render: () => (
    <CreatorHubChrome active="home" signedIn>
      <Body />
    </CreatorHubChrome>
  ),
};
