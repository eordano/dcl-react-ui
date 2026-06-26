import MarketplaceChrome from "../frames/MarketplaceChrome.jsx";
import Spinner from "../../atoms/Spinner.jsx";
import "./mkcatchallredirect.css";

// matches none of the explicit <Route>s falls through to a client-side

const HOME = "/";
const BROWSE = "/browse?assetType=item&section=wearables&vendor=decentraland";

const SAMPLE_PATHS = {
  root: "/collectons/0x9f…/tokn/42",
  browse: "/browse",
  manual: "/lands/100,100/detial",
};

export default function MkCatchAllRedirect({
  variant = "root",
  fromPath,
  manual = false,
}) {
  const isBrowse = variant === "browse";
  const target = isBrowse ? BROWSE : HOME;
  const targetLabel = isBrowse ? "/browse" : "the homepage";
  const path = fromPath || SAMPLE_PATHS[variant] || SAMPLE_PATHS.root;
  const settled = manual || variant === "manual";

  return (
    <MarketplaceChrome active="overview">
      <div className="mkcar">
        <div className="mkcar__inner" role="status" aria-live="polite">
          <svg className="mkcar__gem" viewBox="0 0 32 32" aria-hidden="true">
            <circle cx="16" cy="16" r="16" fill="var(--brand)" />
            <path
              d="M16 7l6 6-6 6-6-6 6-6zm0 13.5l5.5-5.5v3L16 23.5 10.5 18v-3L16 20.5z"
              fill="#fff"
            />
          </svg>

          {settled ? (
            <>
              <h1 className="mkcar__title">This page moved</h1>
              <p className="mkcar__text">
                The page you were looking for doesn&apos;t exist here anymore.
              </p>
            </>
          ) : (
            <>
              <span className="mkcar__spinner">
                <Spinner size={34} />
              </span>
              <h1 className="mkcar__title">
                Taking you to {isBrowse ? "the marketplace" : "the homepage"}…
              </h1>
              <p className="mkcar__text">
                {isBrowse
                  ? "The address you used has moved — redirecting you to the latest browse experience."
                  : "We couldn't find that page, so we're sending you back to the marketplace home."}
              </p>
            </>
          )}

          <code className="mkcar__path" title={path}>
            {path}
          </code>

          <a className="mkcar__cta" href={target}>
            Go to {targetLabel}
            <svg viewBox="0 0 16 16" width="14" height="14" aria-hidden="true">
              <path
                d="M3 8h9M8.5 4l4 4-4 4"
                stroke="currentColor"
                strokeWidth="1.7"
                strokeLinecap="round"
                strokeLinejoin="round"
                fill="none"
              />
            </svg>
          </a>
        </div>
      </div>
    </MarketplaceChrome>
  );
}
