import SitesChrome from "./SitesChrome.jsx";

export default {
  title: "Web/Frames/LandingChrome",
  component: SitesChrome,
  parameters: { layout: "fullscreen" },
};

const Body = () => (
  <div
    style={{
      minHeight: "60vh",
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      color: "var(--ink-6)",
      font: "600 15px/1.5 Inter, sans-serif",
      background:
        "linear-gradient(160deg, #45106a 0%, #39055c 50%, #220040 100%)",
    }}
  >
    Page content renders here
  </div>
);

export const Default = {
  render: () => (
    <SitesChrome active="play">
      <Body />
    </SitesChrome>
  ),
};

export const SignedIn = {
  render: () => (
    <SitesChrome active="play" signedIn>
      <Body />
    </SitesChrome>
  ),
};
