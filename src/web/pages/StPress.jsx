import SitesChrome from "../frames/SitesChrome.jsx";
import { asset } from "../../asset.js";
import "./stpress.css";

const PRESS_KIT_URL = "https://dcl.gg/press";
const PRESS_EMAIL = "press@decentraland.org";

const COPY = {
  title: "Decentraland Press Kit",
  pageDescription:
    "We've put together all sorts of goodies that you're welcome to use when writing and talking about our project. Please direct any questions to ",
  downloadButton: "Download Press Kit",
};

export default function StPress({
  title = COPY.title,
  pageDescription = COPY.pageDescription,
  downloadButton = COPY.downloadButton,
  pressKitUrl = PRESS_KIT_URL,
  pressEmail = PRESS_EMAIL,
}) {
  return (
    <SitesChrome active="legal" overlayNav>
      <div className="stpress">
        <div className="stpress__container">
          <div className="stpress__logowrap">
            <img className="stpress__logo" src={asset("assets/dcl-logo.png")} alt="Decentraland" width="96" height="96" />
          </div>
          <h1 className="stpress__title">{title}</h1>
          <p className="stpress__description">
            {pageDescription}
            <a className="stpress__email" href={`mailto:${pressEmail}`}>
              {pressEmail}
            </a>
            .
          </p>
          <a
            className="stpress__cta"
            href={pressKitUrl}
            target="_blank"
            rel="noopener noreferrer"
          >
            {downloadButton}
          </a>
        </div>
      </div>
    </SitesChrome>
  );
}
