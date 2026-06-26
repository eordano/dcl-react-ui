import { useState } from "react";
import { Avatar } from "../../atoms/primitives.jsx";
import { asset } from "../../asset.js";
import "./stdownload.css";

const L = {
  title: "Download Decentraland\nand Come Hang Out!",
  preTitle: (name) => `${name} is Ready!`,
  yourAccount: "Your Account",
  downloadForShort: "DOWNLOAD FOR",
  downloadOn: "DOWNLOAD ON",
  totalDownloads: (n) => `Total Downloads: ${n}`,
  alreadyDownloaded: "Already downloaded?",
  jumpIn: "Jump In",
  signIn: "Sign In",
  avatarPreview: "Decentraland Avatar Preview",
  modalLine1: "You don't have the",
  modalLine2: "Decentraland app yet",
  modalCta: "Got it",
};

const ICON = {
  windows:
    "data:image/svg+xml;utf8," +
    encodeURIComponent(
      '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><path fill="%23000" d="M3 5.6 10.3 4.6V11.4H3V5.6Zm0 12.8 7.3 1V12.6H3v5.8Zm8.4 1.2L21 21V12.6h-9.6v8Zm0-15.6V11.4H21V3l-9.6 1Z"/></svg>',
    ),
  apple:
    "data:image/svg+xml;utf8," +
    encodeURIComponent(
      '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><path fill="%23000" d="M16.4 12.6c0-2.3 1.9-3.4 2-3.5-1.1-1.6-2.8-1.8-3.4-1.8-1.4-.1-2.8.8-3.5.8-.7 0-1.8-.8-3-.8-1.5 0-2.9.9-3.7 2.3-1.6 2.8-.4 6.8 1.1 9 .7 1.1 1.6 2.3 2.8 2.3 1.1 0 1.5-.7 2.9-.7 1.3 0 1.7.7 2.9.7 1.2 0 1.9-1.1 2.7-2.2.8-1.3 1.2-2.5 1.2-2.6-.1 0-2.3-.9-2.3-3.5Zm-2.3-6.4c.6-.8 1-1.8.9-2.9-.9 0-2 .6-2.6 1.4-.6.7-1.1 1.7-.9 2.8 1 0 2-.5 2.6-1.3Z"/></svg>',
    ),
  epic:
    "data:image/svg+xml;utf8," +
    encodeURIComponent(
      '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><path fill="%23000" d="M5.5 2A1.5 1.5 0 0 0 4 3.5v14c0 .4.2.7.5.9l7 3.4c.3.2.7.2 1 0l7-3.4c.3-.2.5-.5.5-.9v-14A1.5 1.5 0 0 0 18.5 2h-13Zm3 4h6v1.7h-4v2.1h3.6v1.7H10.5v2.3h4V16h-6V6Z"/></svg>',
    ),
  ios:
    "data:image/svg+xml;utf8," +
    encodeURIComponent(
      '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><path fill="%23fff" d="M16.4 12.6c0-2.3 1.9-3.4 2-3.5-1.1-1.6-2.8-1.8-3.4-1.8-1.4-.1-2.8.8-3.5.8-.7 0-1.8-.8-3-.8-1.5 0-2.9.9-3.7 2.3-1.6 2.8-.4 6.8 1.1 9 .7 1.1 1.6 2.3 2.8 2.3 1.1 0 1.5-.7 2.9-.7 1.3 0 1.7.7 2.9.7 1.2 0 1.9-1.1 2.7-2.2.8-1.3 1.2-2.5 1.2-2.6-.1 0-2.3-.9-2.3-3.5Zm-2.3-6.4c.6-.8 1-1.8.9-2.9-.9 0-2 .6-2.6 1.4-.6.7-1.1 1.7-.9 2.8 1 0 2-.5 2.6-1.3Z"/></svg>',
    ),
  googlePlay:
    "data:image/svg+xml;utf8," +
    encodeURIComponent(
      '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><path fill="%23fff" d="M3.6 2.3c-.3.2-.5.6-.5 1v17.4c0 .4.2.8.5 1l9.8-9.7L3.6 2.3Zm11.2 7.9 2.6-1.5-3.7-2.1L11 9.8l3.8.4Zm0 3.6L11 14.2l2.7 2.7 3.7-2.1-2.6-1Zm5-2.6-2.4-1.4-2.9 1.7 2.9 1.7 2.4-1.4c.4-.3.4-.9 0-1.2Z"/></svg>',
    ),
};

const CheckCircle = () => (
  <svg
    className="stdownload__check"
    viewBox="0 0 24 24"
    width="35"
    height="35"
    aria-hidden="true"
  >
    <path
      fill="currentColor"
      d="M12 2a10 10 0 1 0 0 20 10 10 0 0 0 0-20Zm-1.2 14.2-4-4 1.4-1.4 2.6 2.6 5.6-5.6 1.4 1.4-7 7Z"
    />
  </svg>
);

const VerifiedBadge = () => (
  <svg
    className="stdownload__verified"
    viewBox="0 0 24 24"
    width="20"
    height="20"
    aria-hidden="true"
  >
    <path
      fill="currentColor"
      d="M12 1l2.6 1.9 3.2-.3 1 3.1 2.7 1.8-1 3.1 1 3.1-2.7 1.8-1 3.1-3.2-.3L12 23l-2.6-1.9-3.2.3-1-3.1L2.5 14.5l1-3.1-1-3.1 2.7-1.8 1-3.1 3.2.3L12 1Zm-1.3 14.2 5.6-5.6-1.4-1.4-4.2 4.2-1.9-1.9-1.4 1.4 3.3 3.3Z"
    />
  </svg>
);

const FileDownloadIcon = () => (
  <svg viewBox="0 0 24 24" width="24" height="24" aria-hidden="true">
    <path
      fill="currentColor"
      d="M19 9h-4V3H9v6H5l7 7 7-7Zm-14 9v2h14v-2H5Z"
    />
  </svg>
);

const PROFILE_NAME = "Your Account";
const PRIMARY = { os: "Windows", icon: ICON.windows, link: "https://decentraland.org/download" };
const SECONDARY = [
  { os: "macOS", icon: ICON.apple, link: "https://decentraland.org/download" },
  { os: "iOS", icon: ICON.ios, link: "https://apps.apple.com/app/apple-store/id6478403840" },
  { os: "Google Play", icon: ICON.googlePlay, link: "https://play.google.com/store/apps/details?id=org.decentraland.godotexplorer" },
];
const DOWNLOAD_COUNT = "1.2M";

export default function StDownload({ signedIn = true, modalOpen = false }) {
  const [openModal, setOpenModal] = useState(modalOpen);

  return (
    <main
      className={"stdownload" + (signedIn ? "" : " stdownload--signedout")}
      style={{ "--dl-scene": `url(${asset("assets/download-bg.webp")})` }}
    >
        <div className="stdownload__container">
          {!signedIn && (
            <>
              <a
                className="stdownload__logo"
                href="https://decentraland.org"
                aria-label="Decentraland Home"
              >
                <img src={asset("assets/dcl-logo.png")} alt="" width="48" height="48" />
              </a>
              <button type="button" className="stdownload__signin">
                {L.signIn}
              </button>
            </>
          )}

          <div className="stdownload__options">
            {signedIn && (
              <div className="stdownload__pretitle">
                <CheckCircle />
                <h2 className="stdownload__pretitle-text">{L.preTitle(PROFILE_NAME)}</h2>
              </div>
            )}

            <h1 className="stdownload__title">{L.title}</h1>

            <div className="stdownload__actions">
              <div className="stdownload__buttons">
                <a className="stdownload__btn" href={PRIMARY.link}>
                  {L.downloadForShort}
                  <img src={PRIMARY.icon} alt={PRIMARY.os} width="32" height="32" />
                </a>
                <a
                  className="stdownload__btn stdownload__btn--epic"
                  href="https://store.epicgames.com/en-US/p/decentraland-b692fb"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  {L.downloadOn}
                  <img src={ICON.epic} alt="Epic Games" width="40" height="40" />
                </a>
              </div>

              <div className="stdownload__alt">
                <div className="stdownload__counts">
                  <VerifiedBadge /> {L.totalDownloads(DOWNLOAD_COUNT)}
                </div>
                <div className="stdownload__altwrap">
                  {SECONDARY.map((opt) => (
                    <a
                      key={opt.os}
                      className="stdownload__alticon"
                      href={opt.link}
                      aria-label={opt.os}
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      <img src={opt.icon} alt="" width="24" height="24" />
                    </a>
                  ))}
                </div>
              </div>
            </div>
          </div>

          {signedIn && (
            <div className="stdownload__image">
              <div className="stdownload__preview" title={L.avatarPreview}>
                <Avatar size={200} name={PROFILE_NAME} className="stdownload__avatar" />
              </div>
            </div>
          )}

          <div className="stdownload__already">
            <p className="stdownload__already-text">
              {L.alreadyDownloaded}{" "}
              <button
                type="button"
                className="stdownload__already-link"
                onClick={() => setOpenModal(true)}
              >
                {L.jumpIn}
              </button>
            </p>
          </div>
        </div>

        {openModal && (
          <div
            className="stdownload__scrim"
            role="dialog"
            aria-modal="true"
            aria-label={`${L.modalLine1} ${L.modalLine2}`}
          >
            <div className="stdownload__modal">
              <div className="stdownload__modal-content">
                <div className="stdownload__modal-icon">
                  <FileDownloadIcon />
                </div>
                <h2 className="stdownload__modal-title">
                  {L.modalLine1}
                  <br />
                  {L.modalLine2}
                </h2>
                <button
                  type="button"
                  className="stdownload__modal-cta"
                  onClick={() => setOpenModal(false)}
                >
                  {L.modalCta}
                </button>
              </div>
            </div>
          </div>
        )}
    </main>
  );
}
