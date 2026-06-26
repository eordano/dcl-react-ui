import { useMemo } from "react";
import SitesChrome from "../frames/SitesChrome.jsx";
import Spinner from "../../atoms/Spinner.jsx";
import "./stsigninredirect.css";

export function buildAuthRedirectUrl(path, origin, queryParams) {
  const url = new URL(path, origin);
  if (queryParams) {
    Object.entries(queryParams).forEach(([key, value]) => url.searchParams.set(key, value));
  }
  return url.pathname + url.search;
}

export function resolveAuthUrl(authUrl, { origin, hostname }) {
  const value = authUrl ?? "/auth";
  if (value.startsWith("http")) return value;
  const isLocalhost = hostname === "localhost" || hostname === "127.0.0.1";
  if (isLocalhost) return value;
  return new URL(value, origin).toString().replace(/\/+$/, "");
}

export function getRedirectPath({ pathname, search }) {
  const currentRedirectTo = new URLSearchParams(search).get("redirectTo");
  return currentRedirectTo || `${pathname}${search}`;
}

export function buildLoginRedirect(loc, authUrl, queryParams) {
  const redirectPath = getRedirectPath(loc);
  const redirectTo = buildAuthRedirectUrl(redirectPath, loc.origin, queryParams);
  const resolved = resolveAuthUrl(authUrl, loc);
  return `${resolved}/login?redirectTo=${encodeURIComponent(redirectTo)}`;
}

const PRD_AUTH_URL = "https://decentraland.org/auth";

const SAMPLE_LOCATION = {
  origin: "https://decentraland.org",
  hostname: "decentraland.org",
  pathname: "/sign-in",
  search: "?redirectTo=%2Fwhats-on",
};

export default function StSignInRedirect({
  location = SAMPLE_LOCATION,
  authUrl = PRD_AUTH_URL,
  settled = false,
}) {
  const toUrl = useMemo(
    () => buildLoginRedirect(location, authUrl),
    [location, authUrl],
  );

  return (
    <SitesChrome active={undefined}>
      <div className="stsir">
        <div
          className={"stsir__inner" + (settled ? " stsir__inner--settled" : "")}
          role="status"
          aria-live="polite"
        >
          <svg className="stsir__gem" viewBox="0 0 32 32" aria-hidden="true">
            <circle cx="16" cy="16" r="16" fill="var(--brand)" />
            <path
              d="M16 7l6 6-6 6-6-6 6-6zm0 13.5l5.5-5.5v3L16 23.5 10.5 18v-3L16 20.5z"
              fill="#fff"
            />
          </svg>

          {!settled && (
            <span className="stsir__spinner">
              <Spinner size={34} />
            </span>
          )}

          <h1 className="stsir__title">
            {settled ? "Continue to sign in" : "Signing you in…"}
          </h1>

          <code className="stsir__target" title={toUrl}>
            {toUrl}
          </code>

          <a className="stsir__cta" href={toUrl}>
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
            Sign in
          </a>
        </div>
      </div>
    </SitesChrome>
  );
}
