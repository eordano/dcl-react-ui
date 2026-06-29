import BuilderChrome from "../frames/BuilderChrome.jsx";
import Button from "../../atoms/Button.jsx";
import Spinner from "../../atoms/Spinner.jsx";
import { asset } from "../../asset.js";
import "./bdnotfound.css";

const HERO_STYLE = { "--bdnotfound-hero": `url(${asset("assets/dev-hero.webp")})` };

export default function BdNotFound({
  loading = false,
  bare = false,
}) {
  if (loading) {
    const loadingBody = (
      <div className="bdnotfound--loading" style={HERO_STYLE} role="status" aria-live="polite">
        <div className="bdnotfound__loader">
          <Spinner size={58} />
          <span className="u-visually-hidden">Loading…</span>
        </div>
      </div>
    );
    return bare ? (
      loadingBody
    ) : (
      <BuilderChrome active="" account="">
        {loadingBody}
      </BuilderChrome>
    );
  }

  const body = (
    <div className="bdnotfound" style={HERO_STYLE}>
      <div className="bdnotfound__center">
        <h1 className="bdnotfound__title">404</h1>
        <p className="bdnotfound__subtitle">
          Sorry, we couldn't find the Scene you were looking for
        </p>
        <Button variant="primary" size="lg" className="bdnotfound__back">
          Back to your Scenes
        </Button>
      </div>
    </div>
  );

  return bare ? (
    body
  ) : (
    <BuilderChrome active="" account="">
      {body}
    </BuilderChrome>
  );
}
