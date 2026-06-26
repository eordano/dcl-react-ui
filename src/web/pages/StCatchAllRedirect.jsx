import { useMemo } from "react";
import SitesChrome from "../frames/SitesChrome.jsx";
import RedirectInterstitial from "../../components/RedirectInterstitial.jsx";

// the explicit routes falls through to a client-side react-router <Navigate>

export const REDIRECT_TARGET = "/";

const SAMPLE_PATH = "/marketpalce/collectibles";

export default function StCatchAllRedirect({
  fromPath = SAMPLE_PATH,
  settled = false,
}) {
  const displayFrom = useMemo(() => fromPath || SAMPLE_PATH, [fromPath]);

  return (
    <SitesChrome active={undefined}>
      <RedirectInterstitial
        surface="hero"
        settled={settled}
        title={settled ? "This page doesn't exist" : "Taking you home…"}
        text={
          settled
            ? "We couldn't find the page you were looking for. Let's get you back to Decentraland."
            : "That page couldn't be found, so we're sending you back to the Decentraland homepage."
        }
        fromPath={displayFrom}
        toPath={REDIRECT_TARGET}
        routeStyle="mapping"
        strikeFrom
        showReplaceBadge
        ctaLabel="Go to the homepage"
        ctaHref={REDIRECT_TARGET}
      />
    </SitesChrome>
  );
}
