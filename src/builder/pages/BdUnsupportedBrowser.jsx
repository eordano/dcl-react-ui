import BuilderChrome from "../frames/BuilderChrome.jsx";
import { asset } from "../../asset.js";
import "./bdunsupportedbrowser.css";

const HERO_STYLE = { "--bdunsup-hero": `url(${asset("assets/dev-hero.webp")})` };

export default function BdUnsupportedBrowser() {
  return (
    <BuilderChrome active="" account="">
      <div className="bdunsup" style={HERO_STYLE}>
        <div className="bdunsup__center">
          <h1 className="bdunsup__title">Oops!</h1>
          <p className="bdunsup__subtitle">
            The Builder does not support your browser.
            <br />
            Please visit this page using{" "}
            <a
              className="bdunsup__link"
              href="https://www.google.com/chrome/"
              target="_blank"
              rel="noreferrer"
            >
              Google Chrome
            </a>{" "}
            or{" "}
            <a
              className="bdunsup__link"
              href="https://www.mozilla.org/firefox/new/"
              target="_blank"
              rel="noreferrer"
            >
              Mozilla Firefox
            </a>
          </p>
        </div>
      </div>
    </BuilderChrome>
  );
}
