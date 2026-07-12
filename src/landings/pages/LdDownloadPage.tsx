import { siteBase } from "../../data/site";
import type { CSSProperties, MouseEvent } from "react";

import { AvatarStage } from "../../explorer/components/AvatarPreview";
import { asset } from "../../asset";
import Modal from "../../components/Modal";
import "../../web/workflows/stdownload.css";
import "./lddownloadpage.css";

const L = {
  title: "Download Decentraland\nand Come Hang Out!",
  preTitle: (name: string) => `${name} is Ready!`,
  downloadForShort: "DOWNLOAD FOR",
  downloadOn: "DOWNLOAD ON",
  totalDownloads: (n: string) => `${n} GitHub downloads`,
  alreadyDownloaded: "Already downloaded?",
  jumpIn: "Jump In",
  signIn: "Sign in",
  avatarPreview: "Decentraland Avatar Preview",
  modalLine1: "You don't have the",
  modalLine2: "Decentraland app yet",
  modalCta: "Got it",
};

type LdDownloadPageProps = {
  signedIn?: boolean;
  profileName?: string;
  os?: string;
  osLabel?: string;
  primaryHref?: string | null;
  epicVisible?: boolean;
  epicStoreHref?: string;
  appStoreHref?: string;
  googlePlayHref?: string;
  totalDownloads?: string;
  launcherHref?: string;
  successHref?: string;
  modalOpen?: boolean;
  onSignIn?: () => void;
  onPrimaryClick?: () => void;
  onEpicClick?: () => void;
  onContinueClick?: (e: MouseEvent<HTMLAnchorElement>) => void;
  onJumpIn?: () => void;
  onLaunch?: () => void;
  onCloseModal?: () => void;
};

export default function LdDownloadPage({
  signedIn = false,
  profileName = "Your Account",
  os = "windows",
  osLabel = "",
  primaryHref = null,
  epicVisible = false,
  epicStoreHref = "",
  appStoreHref = "",
  googlePlayHref = "",
  totalDownloads = "",
  launcherHref = "",
  successHref = "",
  modalOpen = false,
  onSignIn = undefined,
  onPrimaryClick = undefined,
  onEpicClick = undefined,
  onContinueClick = undefined,
  onJumpIn = undefined,
  onLaunch = undefined,
  onCloseModal = undefined,
}: LdDownloadPageProps) {
  return (
    <main
      className={"stdownload" + (signedIn ? "" : " stdownload--signedout")}
      style={{ "--dl-scene": `url(${asset("assets/download-bg.webp")})` } as CSSProperties}
    >
      <div className="stdownload__container">
        {!signedIn && (
          <>
            <a className="stdownload__logo" href={siteBase()} aria-label="Decentraland Home">
              <img src={asset("assets/dcl-logo.png")} alt="" width={48} height={48} />
            </a>
            <button type="button" className="stdownload__signin" onClick={onSignIn}>
              {L.signIn}
            </button>
          </>
        )}

        <div className="stdownload__options">
          {signedIn && (
            <div className="stdownload__pretitle">
              <CheckCircle />
              <h2 className="stdownload__pretitle-text">{L.preTitle(profileName)}</h2>
            </div>
          )}

          <h1 className="stdownload__title">{L.title}</h1>

          <div className="stdownload__actions">
            <div className="stdownload__buttons">
              {primaryHref ? (
                <a
                  className="stdownload__btn"
                  href={primaryHref}
                  target="_blank"
                  rel="noopener noreferrer"
                  onClick={onPrimaryClick}
                  data-os={os}
                  aria-label={`${L.downloadForShort} ${osLabel}`}
                >
                  {L.downloadForShort} {osLabel}
                </a>
              ) : null}
              {epicVisible ? (
                <a
                  className="stdownload__btn stdownload__btn--epic"
                  href={epicStoreHref}
                  target="_blank"
                  rel="noopener noreferrer"
                  onClick={onEpicClick}
                >
                  {L.downloadOn} Epic Games
                </a>
              ) : null}
            </div>

            <div className="stdownload__alt">
              {totalDownloads ? (
                <div className="stdownload__counts">
                  <VerifiedBadge /> {L.totalDownloads(totalDownloads)}
                </div>
              ) : null}
              <div className="stdownload__altwrap">
                <a
                  className="stdownload__alticon"
                  href={appStoreHref}
                  aria-label="Download on the App Store"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <AppleGlyph />
                  iOS
                </a>
                <a
                  className="stdownload__alticon"
                  href={googlePlayHref}
                  aria-label="Get it on Google Play"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <PlayStoreGlyph />
                  Play
                </a>
              </div>
            </div>

            <a
              className="dl-route__continue"
              href={successHref}
              onClick={onContinueClick}
            >
              Continue to install guide →
            </a>
          </div>
        </div>

        {signedIn && (
          <div className="stdownload__image">
            <div className="stdownload__preview" title={L.avatarPreview}>
              <AvatarStage />
            </div>
          </div>
        )}

        <div className="stdownload__already">
          <p className="stdownload__already-text">
            {L.alreadyDownloaded}{" "}
            <button
              type="button"
              className="stdownload__already-link"
              onClick={onJumpIn}
            >
              {L.jumpIn}
            </button>
          </p>
        </div>
      </div>

      {modalOpen && (
        <Modal
          onClose={onCloseModal}
          className="modal__card--plain stdownload__modal"
          showClose={false}
          width={360}
          ariaLabel={`${L.modalLine1} ${L.modalLine2}`}
        >
          <div className="stdownload__modal-content">
            <h2 className="stdownload__modal-title">
              {L.modalLine1}
              <br />
              {L.modalLine2}
            </h2>
            <a
              className="dl-route__launch"
              href={launcherHref}
              onClick={onLaunch}
            >
              Open Decentraland
            </a>
            <button
              type="button"
              className="stdownload__modal-cta"
              onClick={onCloseModal}
            >
              {L.modalCta}
            </button>
          </div>
        </Modal>
      )}
    </main>
  );
}

const AppleGlyph = () => (
  <svg viewBox="0 0 24 24" width="18" height="18" aria-hidden="true">
    <path
      fill="currentColor"
      d="M12.152 6.896c-.948 0-2.415-1.078-3.96-1.04-2.04.027-3.91 1.183-4.961 3.014-2.117 3.675-.546 9.103 1.519 12.09 1.013 1.454 2.208 3.09 3.792 3.039 1.52-.065 2.09-.987 3.935-.987 1.831 0 2.35.987 3.96.948 1.637-.026 2.676-1.48 3.676-2.948 1.156-1.688 1.636-3.325 1.662-3.415-.039-.013-3.182-1.221-3.22-4.857-.026-3.04 2.48-4.494 2.597-4.559-1.429-2.09-3.623-2.324-4.39-2.376-2-.156-3.675 1.09-4.61 1.09zM15.53 3.83c.843-1.012 1.4-2.427 1.245-3.83-1.207.052-2.662.805-3.532 1.818-.78.896-1.454 2.338-1.273 3.714 1.338.104 2.715-.688 3.559-1.701"
    />
  </svg>
);

const PlayStoreGlyph = () => (
  <svg viewBox="0 0 24 24" width="18" height="18" aria-hidden="true">
    <path
      fill="currentColor"
      d="M3 20.5V3.5c0-.59.34-1.11.84-1.35L13.69 12l-9.85 9.85c-.5-.25-.84-.76-.84-1.35Zm13.81-5.38L6.05 21.34l8.49-8.49 2.27 2.27Zm3.35-4.31c.34.27.59.68.59 1.19s-.22.9-.57 1.18l-2.29 1.32-2.5-2.5 2.5-2.5 2.27 1.31ZM6.05 2.66l10.76 6.22-2.27 2.27-8.49-8.49Z"
    />
  </svg>
);

const CheckCircle = () => (
  <svg className="stdownload__check" viewBox="0 0 24 24" width="35" height="35" aria-hidden="true">
    <path
      fill="currentColor"
      d="M12 2a10 10 0 1 0 0 20 10 10 0 0 0 0-20Zm-1.2 14.2-4-4 1.4-1.4 2.6 2.6 5.6-5.6 1.4 1.4-7 7Z"
    />
  </svg>
);

const VerifiedBadge = () => (
  <svg className="stdownload__verified" viewBox="0 0 24 24" width="20" height="20" aria-hidden="true">
    <path
      fill="currentColor"
      d="M12 1l2.6 1.9 3.2-.3 1 3.1 2.7 1.8-1 3.1 1 3.1-2.7 1.8-1 3.1-3.2-.3L12 23l-2.6-1.9-3.2.3-1-3.1L2.5 14.5l1-3.1-1-3.1 2.7-1.8 1-3.1 3.2.3L12 1Zm-1.3 14.2 5.6-5.6-1.4-1.4-4.2 4.2-1.9-1.9-1.4 1.4 3.3 3.3Z"
    />
  </svg>
);
