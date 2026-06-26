import BuilderChrome from "./BuilderChrome.jsx";

export default {
  title: "Builder/Frames/BuilderChrome",
  component: BuilderChrome,
  parameters: { layout: "fullscreen" },
};

const Body = () => (
  <div style={{ padding: 40, color: "rgba(255,255,255,.55)", fontSize: 14 }}>
    Page body renders here.
  </div>
);

export const Default = {
  render: () => (
    <BuilderChrome active="overview">
      <Body />
    </BuilderChrome>
  ),
};

export const SignedIn = {
  render: () => (
    <BuilderChrome active="overview" signedIn>
      <Body />
    </BuilderChrome>
  ),
};
