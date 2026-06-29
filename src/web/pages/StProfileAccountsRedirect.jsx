import { useEffect, useMemo, useState } from "react";
import SitesChrome from "../frames/SitesChrome.jsx";
import Spinner from "../../atoms/Spinner.jsx";
import "./stprofileaccountsredirect.css";

export function resolveProfileRedirect(address, tab) {
  if (!address) return "/profile";
  const tabSegment = tab ? `/${tab}` : "";
  return `/profile/${address.toLowerCase()}${tabSegment}`;
}

const SAMPLE = {
  address: "0xA1B2C3D4E5F6789012345678901234567890ABCD",
  tab: "creations",
};

export default function StProfileAccountsRedirect({
  variant = "redirect",
  address = SAMPLE.address,
  tab = variant === "redirect" ? SAMPLE.tab : undefined,
  settled = false,
}) {
  const isFallback = variant === "fallback";
  const effectiveAddress = isFallback ? "" : address;
  const effectiveTab = isFallback ? undefined : tab;

  const fromPath = useMemo(() => {
    if (isFallback) return "/profile/accounts/";
    const tabSeg = effectiveTab ? `/${effectiveTab}` : "";
    return `/profile/accounts/${effectiveAddress}${tabSeg}`;
  }, [isFallback, effectiveAddress, effectiveTab]);

  const toPath = useMemo(
    () => resolveProfileRedirect(effectiveAddress, effectiveTab),
    [effectiveAddress, effectiveTab]
  );

  const [manualHidden, setManualHidden] = useState(false);
  useEffect(() => {
    setManualHidden(true);
    const t = setTimeout(() => setManualHidden(false), 3000);
    return () => clearTimeout(t);
  }, []);
  const ctaHidden = !settled && manualHidden;

  const title = isFallback
    ? "Taking you to your profile…"
    : "Decentraland profiles have a new page";
  const text = isFallback
    ? "The address was missing from the link, so we're sending you to your profile."
    : "Redirecting you…";

  return (
    <SitesChrome active={undefined}>
      <meta httpEquiv="refresh" content={`3;url=${toPath}`} />
      <div className="stpar">
        <div className="stpar__inner" role="status" aria-live="polite">
          <svg className="stpar__gem" viewBox="0 0 32 32" aria-hidden="true">
            <circle cx="16" cy="16" r="16" fill="var(--brand)" />
            <path
              d="M16 7l6 6-6 6-6-6 6-6zm0 13.5l5.5-5.5v3L16 23.5 10.5 18v-3L16 20.5z"
              fill="#fff"
            />
          </svg>

          {!settled && (
            <span className="stpar__spinner">
              <Spinner size={34} />
            </span>
          )}

          <h1 className="stpar__title">{title}</h1>
          <p className="stpar__text">{text}</p>

          <div className="stpar__route" aria-label="Redirect">
            <code className="stpar__path stpar__path--from" title={fromPath}>
              {fromPath}
            </code>
            <svg className="stpar__arrow" viewBox="0 0 24 16" aria-hidden="true">
              <path
                d="M2 8h18M15 3l5 5-5 5"
                stroke="currentColor"
                strokeWidth="1.8"
                strokeLinecap="round"
                strokeLinejoin="round"
                fill="none"
              />
            </svg>
            <code className="stpar__path stpar__path--to" title={toPath}>
              {toPath}
            </code>
          </div>

          <a
            className={"stpar__cta" + (ctaHidden ? " stpar__cta--hidden" : "")}
            href={toPath}
            aria-hidden={ctaHidden ? "true" : undefined}
            tabIndex={ctaHidden ? -1 : undefined}
          >
            Continue to profile
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
    </SitesChrome>
  );
}
