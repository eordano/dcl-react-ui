import ForumChrome from "./ForumChrome.jsx";

export default {
  title: "Forum/Frames/ForumChrome",
  component: ForumChrome,
  parameters: { layout: "fullscreen" },
};

const Body = () => (
  <div style={{ padding: 40, color: "#646464", fontSize: 14 }}>
    Page body renders here.
  </div>
);

export const SignedOut = {
  render: () => (
    <ForumChrome active="latest">
      <Body />
    </ForumChrome>
  ),
};

export const SignedIn = {
  render: () => (
    <ForumChrome active="latest" signedIn>
      <Body />
    </ForumChrome>
  ),
};
