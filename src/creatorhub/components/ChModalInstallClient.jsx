import { asset } from "../../asset.js";
import CreatorHubChrome from "../frames/CreatorHubChrome.jsx";
import "./chmodalinstallclient.css";

const PlatformIcon = ({ os }) => {
  if (os === "macos") {
    return (
      <svg
        className="chic__cta-icon"
        viewBox="-52.01 0 560.035 560.035"
        width="16"
        height="16"
        aria-hidden="true"
      >
        <path
          fill="#fff"
          d="M380.844 297.529c.787 84.752 74.349 112.955 75.164 113.314-.622 1.988-11.754 40.191-38.756 79.652-23.343 34.117-47.568 68.107-85.731 68.811-37.499.691-49.557-22.236-92.429-22.236-42.859 0-56.256 21.533-91.753 22.928-36.837 1.395-64.889-36.891-88.424-70.883-48.093-69.53-84.846-196.475-35.496-282.165 24.516-42.554 68.328-69.501 115.882-70.192 36.173-.69 70.315 24.336 92.429 24.336 22.1 0 63.59-30.096 107.208-25.676 18.26.76 69.517 7.376 102.429 55.552-2.652 1.644-61.159 35.704-60.523 106.559M310.369 89.418C329.926 65.745 343.089 32.79 339.498 0 311.308 1.133 277.22 18.785 257 42.445c-18.121 20.952-33.991 54.487-29.709 86.628 31.421 2.431 63.52-15.967 83.078-39.655"
        />
      </svg>
    );
  }
  return (
    <svg
      className="chic__cta-icon"
      viewBox="0 0 24 24"
      width="16"
      height="16"
      aria-hidden="true"
    >
      <path
        fill="#fff"
        d="M3,12V6.75L9,5.43V11.91L3,12M20,3V11.75L10,11.9V5.21L20,3M3,13L9,13.09V19.9L3,18.75V13M20,13.25V22L10,20.09V13.1L20,13.25Z"
      />
    </svg>
  );
};

const CTA_LABEL = {
  macos: "DOWNLOAD FOR MACOS",
  windows: "DOWNLOAD FOR WINDOWS",
  unknown: "Download",
};

export default function ChModalInstallClient({
  os = "windows",
  withChrome = true,
  onDownload = () => {},
  onClose = () => {},
}) {
  const label = CTA_LABEL[os] || CTA_LABEL.unknown;

  const modal = (
    <div className="chic" onClick={onClose}>
      <div
        className="chic__card"
        role="dialog"
        aria-modal="true"
        aria-label="Install Decentraland"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="chic__box">
          <div className="chic__logo-wrap">
            <img
              src={asset("assets/dcl-logo.png")}
              alt="Decentraland Logo"
              className="chic__logo"
            />
          </div>

          <h5 className="chic__title">
            To jump in, you'll need to install Decentraland first
          </h5>

          <div className="chic__actions">
            <button
              type="button"
              className="chic__btn chic__btn--primary"
              onClick={onDownload}
            >
              {os !== "unknown" ? <PlatformIcon os={os} /> : null}
              <span>{label}</span>
            </button>
            <button
              type="button"
              className="chic__btn chic__btn--cancel"
              onClick={onClose}
            >
              NOT NOW
            </button>
          </div>
        </div>
      </div>
    </div>
  );

  if (!withChrome) return modal;

  return (
    <CreatorHubChrome active="scenes">
      <div className="chic__stage">
        <div className="chic__stage-hint">Scene preview</div>
      </div>
      {modal}
    </CreatorHubChrome>
  );
}
