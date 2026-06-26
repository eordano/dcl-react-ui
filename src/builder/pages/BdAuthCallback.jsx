import BuilderChrome from "../frames/BuilderChrome.jsx";
import Spinner from "../../atoms/Spinner.jsx";
import "./bdauthcallback.css";

export default function BdAuthCallback() {
  return (
    <BuilderChrome active="" account="">
      <div className="bdauthcallback" role="status" aria-live="polite">
        <Spinner size={58} />
        <span className="u-visually-hidden">Finalizing sign-in…</span>
      </div>
    </BuilderChrome>
  );
}
