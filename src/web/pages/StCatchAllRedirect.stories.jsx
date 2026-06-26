import StCatchAllRedirect from "./StCatchAllRedirect.jsx";

// Unmatched paths fall through to a client-side <Navigate> redirect
export default {
  title: "Web/Pages/Redirects/Catch-all",
  component: StCatchAllRedirect,
  parameters: { layout: "fullscreen" },
};

export const Default = {
  args: {
    fromPath: "/marketpalce/collectibles",
  },
};

export const LegacyDeepLink = {
  args: {
    fromPath: "/world/genesis-plaza/about",
  },
};

export const WithQueryString = {
  args: {
    fromPath: "/explore?tab=trending&page=3",
  },
};

export const ManualFallback = {
  args: {
    fromPath: "/marketpalce/collectibles",
    settled: true,
  },
};
