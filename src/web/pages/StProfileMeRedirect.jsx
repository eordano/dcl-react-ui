import { useMemo } from "react";
import SitesChrome from "../frames/SitesChrome.jsx";
import Spinner from "../../atoms/Spinner.jsx";
import "./stprofilemeredirect.css";

export function resolveMeRedirect(address, tab) {
  const tabSegment = tab ? `/${tab}` : "";
  return `/profile/${String(address).toLowerCase()}${tabSegment}`;
}

export function resolveSignInRedirect(pathname, search = "") {
  const redirect = encodeURIComponent(`${pathname}${search}`);
  return `/sign-in?redirect=${redirect}`;
}

const SAMPLE = {
  address: "0xA1B2C3D4E5F6789012345678901234567890ABCD",
  tab: "overview",
};

export default function StProfileMeRedirect({
  variant = "redirect",
  address = SAMPLE.address,
  tab = SAMPLE.tab,
  pathname,
  search = "",
  settled = false,
}) {
  const isSignIn = variant === "signin";

  const fromPath = useMemo(() => {
    if (pathname) return `${pathname}${search}`;
    const tabSeg = tab ? `/${tab}` : "";
    return `/profile/me${tabSeg}`;
  }, [pathname, search, tab]);

  const toPath = useMemo(() => {
    if (isSignIn) return resolveSignInRedirect(pathname || (tab ? `/profile/me/${tab}` : "/profile/me"), pathname ? search : "");
    return resolveMeRedirect(address, tab);
  }, [isSignIn, address, tab, pathname, search]);

  const title = isSignIn ? "Sign in to view your profile" : "Taking you to your profile…";
  const text = isSignIn
    ? "We couldn't find a Decentraland identity on this device. Sign in and we'll bring you right back to your profile."
    : "Resolving “me” to your wallet address — redirecting you to your profile page.";
  const ctaLabel = isSignIn ? "Sign in" : "Continue to profile";

  return (
    <SitesChrome active={undefined}>
      <div className="stpmr">
        <div className="stpmr__inner" role="status" aria-live="polite">
          <svg className="stpmr__gem" viewBox="0 0 32 32" aria-hidden="true">
            <circle cx="16" cy="16" r="16" fill="var(--brand)" />
            <path
              d="M16 7l6 6-6 6-6-6 6-6zm0 13.5l5.5-5.5v3L16 23.5 10.5 18v-3L16 20.5z"
              fill="#fff"
            />
          </svg>

          {!settled && (
            <span className="stpmr__spinner">
              <Spinner size={34} />
            </span>
          )}

          <h1 className="stpmr__title">{settled && !isSignIn ? "This page moved" : title}</h1>
          <p className="stpmr__text">{text}</p>

          <div className={"stpmr__route" + (isSignIn ? " stpmr__route--gate" : "")} aria-label="Redirect">
            <code className="stpmr__path stpmr__path--from" title={fromPath}>
              {fromPath}
            </code>
            <svg className="stpmr__arrow" viewBox="0 0 24 16" aria-hidden="true">
              <path
                d="M2 8h18M15 3l5 5-5 5"
                stroke="currentColor"
                strokeWidth="1.8"
                strokeLinecap="round"
                strokeLinejoin="round"
                fill="none"
              />
            </svg>
            <code className="stpmr__path stpmr__path--to" title={toPath}>
              {toPath}
            </code>
          </div>

          <a className="stpmr__cta" href={toPath}>
            {isSignIn && (
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
            )}
            {ctaLabel}
            {!isSignIn && (
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
            )}
          </a>
        </div>
      </div>
    </SitesChrome>
  );
}
