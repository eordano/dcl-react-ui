import RedirectInterstitial from "./RedirectInterstitial.jsx";

export default {
  title: "Components/RedirectInterstitial",
  component: RedirectInterstitial,
  parameters: { layout: "fullscreen" },
};

const Frame = ({ bg = "#1a0230", children }) => (
  <div style={{ minHeight: "100vh", position: "relative", background: bg }}>
    {children}
  </div>
);

const SignInIcon = (
  <svg viewBox="0 0 24 24" width="16" height="16" aria-hidden="true">
    <path
      d="M11 4H6a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2h5M15 8l4 4-4 4M19 12H9"
      stroke="currentColor"
      strokeWidth="1.8"
      strokeLinecap="round"
      strokeLinejoin="round"
      fill="none"
    />
  </svg>
);

export const SitesCatchAll = {
  render: () => (
    <RedirectInterstitial
      surface="hero"
      title="Taking you home…"
      text="That page couldn't be found, so we're sending you back to the Decentraland homepage."
      fromPath="/marketpalce/collectibles"
      toPath="/"
      strikeFrom
      ctaLabel="Go to the homepage"
      ctaHref="/"
    />
  ),
};

export const SitesCatchAllSettled = {
  render: () => (
    <RedirectInterstitial
      surface="hero"
      settled
      title="This page doesn't exist"
      text="We couldn't find the page you were looking for. Let's get you back to Decentraland."
      fromPath="/marketpalce/collectibles"
      toPath="/"
      strikeFrom
      showReplaceBadge
      ctaLabel="Go to the homepage"
      ctaHref="/"
    />
  ),
};

export const ProfileMeRedirect = {
  render: () => (
    <Frame>
      <RedirectInterstitial
        title="Taking you to your profile…"
        text="Resolving “me” to your wallet address — redirecting you to your profile page."
        fromPath="/profile/me/overview"
        toPath="/profile/0xa1b2c3d4e5f6789012345678901234567890abcd/overview"
        ctaLabel="Continue to profile"
        ctaHref="/profile/0xa1b2c3d4e5f6789012345678901234567890abcd/overview"
      />
    </Frame>
  ),
};

export const ProfileMeSignIn = {
  render: () => (
    <Frame>
      <RedirectInterstitial
        title="Sign in to view your profile"
        text="We couldn't find a Decentraland identity on this device. Sign in and we'll bring you right back to your profile."
        fromPath="/profile/me/overview"
        toPath="/sign-in?redirect=%2Fprofile%2Fme%2Foverview"
        chipTone="neutral"
        ctaLabel="Sign in"
        ctaHref="/sign-in?redirect=%2Fprofile%2Fme%2Foverview"
        ctaIcon={SignInIcon}
      />
    </Frame>
  ),
};

export const MarketplaceCatchAll = {
  render: () => (
    <Frame bg="#0c0c10">
      <RedirectInterstitial
        surface="dark"
        title="Taking you to the homepage…"
        text="We couldn't find that page, so we're sending you back to the marketplace home."
        fromPath="/collectons/0x9f…/tokn/42"
        routeStyle="single"
        ctaLabel="Go to the homepage"
        ctaHref="/"
      />
    </Frame>
  ),
};

export const MarketplaceSettled = {
  render: () => (
    <Frame bg="#0c0c10">
      <RedirectInterstitial
        surface="dark"
        settled
        title="This page moved"
        text="The page you were looking for doesn't exist here anymore."
        fromPath="/lands/100,100/detial"
        routeStyle="single"
        ctaLabel="Go to the homepage"
        ctaHref="/"
      />
    </Frame>
  ),
};
