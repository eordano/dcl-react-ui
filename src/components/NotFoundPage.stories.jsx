import NotFoundPage from "./NotFoundPage.jsx";

export default {
  title: "Components/NotFoundPage",
  component: NotFoundPage,
  parameters: { layout: "fullscreen" },
};

const Frame = ({ bg = "#0c0c10", children }) => (
  <div style={{ height: "100vh", position: "relative", background: bg }}>
    {children}
  </div>
);

const HomeIcon = (
  <svg viewBox="0 0 24 24" aria-hidden="true">
    <path d="M10 20v-6h4v6h5v-8h3L12 3 2 12h3v8z" fill="currentColor" />
  </svg>
);
const BookIcon = (
  <svg viewBox="0 0 24 24" aria-hidden="true">
    <path
      d="M21 5c-1.11-.35-2.33-.5-3.5-.5-1.95 0-4.05.4-5.5 1.5-1.45-1.1-3.55-1.5-5.5-1.5S2.45 4.9 1 6v14.65c0 .25.25.5.5.5.1 0 .15-.05.25-.05C3.1 20.45 5.05 20 6.5 20c1.95 0 4.05.4 5.5 1.5 1.35-.85 3.8-1.5 5.5-1.5 1.65 0 3.35.3 4.75 1.05.1.05.15.05.25.05.25 0 .5-.25.5-.5V6c-.6-.45-1.25-.75-2-1z"
      fill="currentColor"
    />
  </svg>
);

export const BuilderHero = {
  render: () => (
    <Frame>
      <NotFoundPage
        surface="hero"
        surfaceStyle={{ "--notfound-hero": "linear-gradient(135deg,#2a1746,#4a1170)" }}
        code="404"
        title="Scene not found"
        subtitle="Sorry, we couldn't find the Scene you were looking for"
        ctaLabel="Back to your Scenes"
        onCta={() => {}}
      />
    </Frame>
  ),
};

export const BuilderLoading = {
  render: () => (
    <Frame>
      <NotFoundPage
        surface="hero"
        surfaceStyle={{ "--notfound-hero": "linear-gradient(135deg,#2a1746,#4a1170)" }}
        loading
      />
    </Frame>
  ),
};

export const GovernanceGlyph = {
  render: () => (
    <Frame bg="#f3f2f5">
      <NotFoundPage
        surface="light"
        code="404"
        codeVariant="glyph"
        title="Not found"
        subtitle="You just hit a route that doesn't exist..."
      />
    </Frame>
  ),
};

export const StorageLink = {
  render: () => (
    <Frame bg="#141019">
      <NotFoundPage
        surface="dark"
        code="404"
        title="Page Not Found"
        subtitle="The page you are looking for does not exist."
        ctaLabel="Go Home"
        ctaHref="https://decentraland.org/storage/select"
        ctaIcon={HomeIcon}
      />
    </Frame>
  ),
};

export const TwoCtas = {
  render: () => (
    <Frame bg="#0d1117">
      <NotFoundPage
        surface="dark"
        codeVariant="none"
        title="404 - Page Not Found"
        subtitle="This Cast 2.0 stream doesn't exist. Stream links are generated on-demand by the Admin Smart Item in Decentraland scenes."
        ctaLabel="Go Home"
        ctaHref="https://decentraland.org"
        ctaIcon={HomeIcon}
        secondaryLabel="View Documentation"
        secondaryHref="https://docs.decentraland.org/creator/worlds/cast/"
        secondaryIcon={BookIcon}
      />
    </Frame>
  ),
};
