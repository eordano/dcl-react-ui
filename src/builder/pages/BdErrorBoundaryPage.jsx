import { useCallback } from "react";
import BuilderChrome from "../frames/BuilderChrome.jsx";
import Button from "../../atoms/Button.jsx";
import { asset } from "../../asset.js";
import "./bderrorboundarypage.css";

const SAMPLE_STACK = `TypeError: Cannot read properties of undefined (reading 'name')
    at SceneDetailPage (SceneDetailPage.tsx:118:34)
    at renderWithHooks (react-dom.development.js:14985:18)
    at mountIndeterminateComponent (react-dom.development.js:17811:13)
    at beginWork (react-dom.development.js:19049:16)
    at HTMLUnknownElement.callCallback (react-dom.development.js:3945:14)
    at Object.invokeGuardedCallbackDev (react-dom.development.js:3994:16)
    at invokeGuardedCallback (react-dom.development.js:4056:31)
    at beginWork$1 (react-dom.development.js:23964:7)
    at performUnitOfWork (react-dom.development.js:22779:12)
    at workLoopSync (react-dom.development.js:22707:5)`;

export default function BdErrorBoundaryPage({ stackTrace = SAMPLE_STACK }) {
  const handleSelectText = useCallback((e) => {
    e.currentTarget.focus();
    e.currentTarget.select();
  }, []);

  return (
    <BuilderChrome active="" account="">
      <div
        className="bderror"
        style={{
          backgroundImage: `url(${asset("assets/dev-hero.webp")})`,
        }}
      >
        <div className="bderror__panel">
          <h1 className="bderror__title">Oops!</h1>
          <p className="bderror__subtitle">There was an error, this is all we know:</p>

          <textarea
            className="bderror__trace"
            cols={70}
            rows={10}
            value={stackTrace}
            onClick={handleSelectText}
            readOnly
          />

          <p className="bderror__message">
            Our team is working on it! Want to chat with them?
          </p>

          <Button className="bderror__back" variant="primary" size="lg">
            <span className="bderror__chat-icon" aria-hidden="true">
              <svg viewBox="0 0 24 24" width="18" height="18" fill="none">
                <path
                  d="M4 5h16v11H9l-4 3v-3H4z"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinejoin="round"
                />
              </svg>
            </span>
            Chat with us
          </Button>

          <span className="bderror__suggestion">
            or try <a href=".">reloading the page</a>
          </span>
        </div>
      </div>
    </BuilderChrome>
  );
}

export { SAMPLE_STACK };
