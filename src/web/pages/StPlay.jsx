import SitesChrome from "../frames/SitesChrome.jsx";
import "./stplay.css";

const DOWNLOAD_URLS = {
  desktop: "/download_success?os=Windows&place=play_hero",
  epic: "https://store.epicgames.com/en-US/p/decentraland",
  appStore: "https://apps.apple.com/app/decentraland/id6502420950",
  googlePlay: "https://play.google.com/store/apps/details?id=org.decentraland.foundation",
};
const JUMP_IN_URL = "decentraland://?";
const BEVY_WEB_URL = "https://decentraland.org/bevy-web";

const VerifiedIcon = () => (
  <svg className="stplay__verified" viewBox="0 0 24 24" width="20" height="20" aria-hidden="true">
    <path
      d="M12 2 14.9 4.6 18.8 4.2 19.8 8 23 10.3 21.2 13.6 22.4 17.3 18.6 18.1 16.8 21.5 13 20.1 9.2 21.5 7.4 18.1 3.6 17.3 4.8 13.6 3 10.3 6.2 8 7.2 4.2 11.1 4.6 12 2Z"
      fill="var(--brand)"
    />
    <path d="m8.5 12 2.4 2.4 4.6-4.8" stroke="#fff" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" fill="none" />
  </svg>
);

const WindowsLogo = () => (
  <svg viewBox="0 0 24 24" width="28" height="28" aria-hidden="true">
    <path d="M3 5.5 10.8 4.4V11.4H3V5.5Zm0 13L10.8 19.6V12.6H3V18.5Zm8.8 1.2L21 21V12.6H11.8V19.7Zm0-15.4V11.4H21V3L11.8 4.3Z" fill="currentColor" />
  </svg>
);

const EpicLogo = () => (
  <svg viewBox="0 0 40 40" width="40" height="40" aria-hidden="true">
    <path d="M8 4h24a2 2 0 0 1 2 2v22.6a3 3 0 0 1-1.8 2.7l-11 4.5a3.2 3.2 0 0 1-2.4 0l-11-4.5A3 3 0 0 1 6 28.6V6a2 2 0 0 1 2-2Z" fill="#202020" />
    <path d="M14 11h10v2.4h-7.3v3.4h6.6v2.4h-6.6v3.6H24V25H14V11Zm14 0h2.6v14H28V11Z" fill="#fff" />
  </svg>
);

const AppleGlyph = () => (
  <svg viewBox="0 0 24 24" width="26" height="26" aria-hidden="true">
    <path
      d="M16.4 12.5c0-2.2 1.8-3.3 1.9-3.3-1-1.5-2.6-1.7-3.2-1.7-1.4-.1-2.6.8-3.3.8-.7 0-1.7-.8-2.8-.8-1.5 0-2.8.9-3.6 2.2-1.5 2.7-.4 6.7 1.1 8.9.7 1.1 1.6 2.3 2.7 2.2 1.1 0 1.5-.7 2.8-.7s1.6.7 2.8.7c1.1 0 1.9-1.1 2.6-2.1.8-1.2 1.2-2.4 1.2-2.5-.1 0-2.2-.9-2.2-3.6Zm-2.2-6.6c.6-.7 1-1.7.9-2.7-.9 0-1.9.6-2.5 1.3-.6.6-1 1.6-.9 2.6 1 .1 2-.5 2.5-1.2Z"
      fill="#fff"
    />
  </svg>
);

const GooglePlayGlyph = () => (
  <svg viewBox="0 0 24 24" width="24" height="24" aria-hidden="true">
    <path d="M3.6 2.3 13.5 12 3.6 21.7c-.4-.2-.6-.6-.6-1.1V3.4c0-.5.2-.9.6-1.1Z" fill="#00d3ff" />
    <path d="M16.7 8.8 13.5 12 3.6 2.3c.4-.2.9-.2 1.3 0l11.8 6.5Z" fill="#00f076" />
    <path d="M16.7 15.2 4.9 21.7c-.4.2-.9.2-1.3 0L13.5 12l3.2 3.2Z" fill="#ff3a44" />
    <path d="M20.4 10.9c.7.4.7 1.8 0 2.2l-3.7 2.1L13.5 12l3.2-3.2 3.7 2.1Z" fill="#ffc107" />
  </svg>
);

function StoreBadge({ glyph, top, bottom }) {
  return (
    <span className="stplay__badge">
      {glyph}
      <span className="stplay__badgetext">
        <span className="stplay__badgetop">{top}</span>
        <span className="stplay__badgebottom">{bottom}</span>
      </span>
    </span>
  );
}

export default function StPlay({
  title = "The Web Version Is No Longer Available.",
  subtitle = "Continue Playing on Desktop or Mobile App.",
  downloadFor = "DOWNLOAD FOR",
  downloadOn = "DOWNLOAD ON",
  totalDownloads = "Total Downloads: 1,254,318",
  alsoAvailableOn = "Also Available on",
  alreadyDownloaded = "Already Downloaded?",
  jumpIn = "JUMP IN!",
  mobile = false,
}) {
  if (mobile) {
    return (
      <SitesChrome active="play" overlayNav>
        <div className="stplay">
          <div className="stplay__bg" aria-hidden="true" />
          <div className="stplay__bgpattern" aria-hidden="true" />
          <div className="stplay__mobile">
            <div className="stplay__titlegroup">
              <h1 className="stplay__title">{title}</h1>
              <p className="stplay__subtitle">{subtitle}</p>
            </div>

            <a
              className="stplay__badgelink stplay__mobilebadge"
              href={DOWNLOAD_URLS.googlePlay}
              target="_blank"
              rel="noopener noreferrer"
            >
              <StoreBadge glyph={<GooglePlayGlyph />} top="GET IT ON" bottom="Google Play" />
            </a>

            <p className="stplay__already">
              {alreadyDownloaded}{" "}
              <a className="stplay__jumpin" href={JUMP_IN_URL}>
                {jumpIn}
              </a>
            </p>
          </div>
        </div>
      </SitesChrome>
    );
  }

  return (
    <SitesChrome active="play" overlayNav>
      <div className="stplay">
        <div className="stplay__bg" aria-hidden="true" />
        <div className="stplay__bgpattern" aria-hidden="true" />

        <div className="stplay__card">
          <div className="stplay__titlegroup">
            <h1 className="stplay__title">{title}</h1>
            <p className="stplay__subtitle">{subtitle}</p>
          </div>

          <div className="stplay__cta">
            <div className="stplay__ctabuttons">
              <a className="stplay__download" href={DOWNLOAD_URLS.desktop}>
                {downloadFor}
                <WindowsLogo />
              </a>
              <a
                className="stplay__epic"
                href={DOWNLOAD_URLS.epic}
                target="_blank"
                rel="noopener noreferrer"
              >
                {downloadOn}
                <EpicLogo />
              </a>
            </div>

            <p className="stplay__counts">
              <VerifiedIcon /> {totalDownloads}
            </p>

            <div className="stplay__divider">
              <span className="stplay__dividerline" aria-hidden="true" />
              <span className="stplay__dividerlabel">{alsoAvailableOn}</span>
              <span className="stplay__dividerline" aria-hidden="true" />
            </div>

            <div className="stplay__badges">
              <a
                className="stplay__badgelink"
                href={DOWNLOAD_URLS.appStore}
                target="_blank"
                rel="noopener noreferrer"
              >
                <StoreBadge glyph={<AppleGlyph />} top="Download on the" bottom="App Store" />
              </a>
              <a
                className="stplay__badgelink"
                href={DOWNLOAD_URLS.googlePlay}
                target="_blank"
                rel="noopener noreferrer"
              >
                <StoreBadge glyph={<GooglePlayGlyph />} top="GET IT ON" bottom="Google Play" />
              </a>
            </div>
          </div>

          <p className="stplay__already">
            {alreadyDownloaded}{" "}
            <a className="stplay__jumpin" href={JUMP_IN_URL}>
              {jumpIn}
            </a>
          </p>
        </div>

        <p className="stplay__experimental">
          Want to keep playing on web? Try the experimental version{" "}
          <a
            className="stplay__experimentallink"
            href={BEVY_WEB_URL}
            target="_blank"
            rel="noopener noreferrer"
          >
            HERE
          </a>
        </p>
      </div>
    </SitesChrome>
  );
}
