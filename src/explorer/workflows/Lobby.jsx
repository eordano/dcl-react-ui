import { useState } from "react";
import AuthLayout from "../../web/frames/AuthLayout.jsx";
import Checkbox from "../../atoms/Checkbox.jsx";
import BackPill from "../components/BackPill.jsx";
import AuthFooterChrome from "../frames/AuthFooterChrome.jsx";
import { asset } from "../../asset.js";
import "./lobby.css";

export default function Lobby() {
  const [name, setName] = useState("");
  const [body, setBody] = useState("A");

  const avatar = (
    <div
      className="lobby__avatar"
      style={{ backgroundImage: `url(${asset("assets/lobby-src.png")})` }}
    />
  );

  return (
    <AuthLayout
      avatar={avatar}
      hideBrand
      hideFooter
      topLeft={<BackPill />}
      bottomLeft={<AuthFooterChrome />}
    >
      <div className="lobby__mark" aria-hidden="true">
        <svg viewBox="0 0 24 24" width="28" height="28">
          <circle cx="12" cy="9" r="4" fill="#fff" />
          <path d="M4.5 20a7.5 7.5 0 0 1 15 0z" fill="#fff" />
        </svg>
      </div>
      <h1 className="lobby__title">Welcome to Decentraland!</h1>

      <div className="lobby__group">
        <label className="lobby__label" htmlFor="lobby-name">
          Username
        </label>
        <input
          id="lobby-name"
          className="lobby__field"
          aria-label="Username"
          placeholder="Name"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
        <div className="lobby__help">This is how others will see you.</div>
      </div>

      <div className="lobby__checks">
        <Checkbox>
          Subscribe to newsletter for updates on features, events, contests, and
          more.
        </Checkbox>
        <Checkbox>
          I agree with Decentraland&rsquo;s{" "}
          <a className="lobby__link" href="#terms">Terms of Use</a> and{" "}
          <a className="lobby__link" href="#privacy">Privacy Policy</a> *
        </Checkbox>
      </div>

      <button className="lobby__jump" type="button" data-sb-linkto="Explorer/Workflows/Loading">
        JUMP IN
        <span className="lobby__jump-arrow" aria-hidden="true">
          <svg viewBox="0 0 24 24" width="14" height="14" fill="none">
            <path
              d="M5 12h13M13 6l6 6-6 6"
              stroke="currentColor"
              strokeWidth="2.2"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </span>
      </button>

      <div className="lobby__avatarbar">
        <div className="lobby__bodycard">
          <button
            type="button"
            className={"lobby__bodyrow" + (body === "A" ? " is-active" : "")}
            onClick={() => setBody("A")}
          >
            <span className="lobby__bodyrow-glyph" aria-hidden="true">&#x2660;</span>
            <span className="lobby__bodyrow-label">BODY TYPE A</span>
            {body === "A" && (
              <span className="lobby__bodyrow-check" aria-hidden="true">&#x2713;</span>
            )}
          </button>
          <button
            type="button"
            className={"lobby__bodyrow" + (body === "B" ? " is-active" : "")}
            onClick={() => setBody("B")}
          >
            <span className="lobby__bodyrow-glyph" aria-hidden="true">&#x2660;</span>
            <span className="lobby__bodyrow-label">BODY TYPE B</span>
            {body === "B" && (
              <span className="lobby__bodyrow-check" aria-hidden="true">&#x2713;</span>
            )}
          </button>
        </div>
        <div className="lobby__avataractions">
          <button type="button" className="lobby__bodydrop">
            <span className="lobby__bodydrop-glyph" aria-hidden="true">&#x2660;</span>
            BODY TYPE {body}
            <span className="lobby__bodydrop-caret" aria-hidden="true">&#x25BE;</span>
          </button>
          <button type="button" className="lobby__randomize">
            <span aria-hidden="true">&#x21BB;</span> RANDOMIZE
          </button>
        </div>
        <div className="lobby__caption">You can customize your avatar later.</div>
      </div>
    </AuthLayout>
  );
}
