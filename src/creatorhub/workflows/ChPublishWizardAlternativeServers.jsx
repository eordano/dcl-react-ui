import { useState } from "react";
import { ChevronLeft, ChevronDownAlt, Close } from "../../atoms/icons.jsx";
import "./chpublishwizardalternativeservers.css";

const GenesisPlazaThumb = () => (
  <svg className="cpwas__thumbimg" viewBox="0 0 318 200" width="318" height="200" preserveAspectRatio="xMidYMid slice" aria-label="Genesis Plaza">
    <defs>
      <linearGradient id="cpwas-sky" x1="0" y1="0" x2="0" y2="1">
        <stop offset="0" stopColor="#2a1b54" />
        <stop offset="0.55" stopColor="#5a3aa8" />
        <stop offset="1" stopColor="#ff7a8f" />
      </linearGradient>
      <linearGradient id="cpwas-top" x1="0" y1="0" x2="1" y2="1">
        <stop offset="0" stopColor="#8e7bff" />
        <stop offset="1" stopColor="#6b54e8" />
      </linearGradient>
      <linearGradient id="cpwas-left" x1="0" y1="0" x2="0" y2="1">
        <stop offset="0" stopColor="#6a52d6" />
        <stop offset="1" stopColor="#3f2f96" />
      </linearGradient>
      <linearGradient id="cpwas-right" x1="0" y1="0" x2="0" y2="1">
        <stop offset="0" stopColor="#5b46c2" />
        <stop offset="1" stopColor="#352780" />
      </linearGradient>
    </defs>
    <rect x="0" y="0" width="318" height="200" fill="url(#cpwas-sky)" />
    <circle cx="159" cy="150" r="46" fill="#ffd98a" opacity="0.9" />
    <polygon points="159,70 290,140 159,210 28,140" fill="url(#cpwas-top)" />
    <polygon points="28,140 159,210 159,236 28,166" fill="url(#cpwas-left)" />
    <polygon points="290,140 159,210 159,236 290,166" fill="url(#cpwas-right)" />
    <polygon points="150,96 168,96 168,150 150,150" fill="#bfe9ff" opacity="0.92" />
    <polygon points="150,96 159,90 168,96 159,102" fill="#e7f6ff" />
    <polygon points="168,96 168,150 159,156 159,102" fill="#7fb6e8" />
    <circle cx="208" cy="128" r="9" fill="#46d3ff" />
    <circle cx="222" cy="118" r="6" fill="#3f7bff" />
    <circle cx="98" cy="150" r="8" fill="#e79bff" />
    <rect x="112" y="138" width="14" height="20" rx="2" fill="#2f8de8" />
    <circle cx="119" cy="135" r="5" fill="#62c7ff" />
  </svg>
);

const PROJECT = { title: "Neon Night Market" };

const OPTION_LABEL = { test: "Test Server", custom: "Custom Server" };
const ACTION_LABEL = { test: "Publish to Test Server", custom: "Publish to Custom Server" };

export default function ChPublishWizardAlternativeServers({
  option: optionProp = "test",
  error: errorProp = false,
}) {
  const [option, setOption] = useState(optionProp);
  const [open, setOpen] = useState(false);
  const [customUrl, setCustomUrl] = useState("");
  const [error, setError] = useState(
    errorProp ? "Invalid URL" : ""
  );

  const isCustom = option === "custom";

  const pick = (value) => {
    setOption(value);
    setOpen(false);
  };

  return (
    <div className="cpwas__backdrop">
      <div className="cpwas__modal" role="dialog" aria-modal="true" aria-label="Publish to a different server">
        <header className="cpwas__header">
          <button type="button" className="cpwas__iconbtn cpwas__back" aria-label="back">
            <ChevronLeft size={22} />
          </button>
          <h2 className="cpwas__title">Publish to a different server</h2>
          <button type="button" className="cpwas__iconbtn cpwas__close" aria-label="close">
            <Close size={20} />
          </button>
        </header>

        <p className="cpwas__subtitle">{`Publish "${PROJECT.title}"`}</p>

        <div className="cpwas__content">
          <div className="cpwas__box">
            <div className="cpwas__selection">
              <div className="cpwas__selcol">
                <h3 className="cpwas__h3">Alternate Servers</h3>

                <div className="cpwas__selectwrap">
                  <button
                    type="button"
                    className="cpwas__select"
                    aria-haspopup="listbox"
                    aria-expanded={open}
                    onClick={() => setOpen((o) => !o)}
                  >
                    <span className="cpwas__selectval">{OPTION_LABEL[option]}</span>
                    <ChevronDownAlt size={20} />
                  </button>
                  {open ? (
                    <div className="cpwas__menu" role="listbox" aria-label="Servers">
                      <div
                        className={"cpwas__menuitem" + (option === "test" ? " is-selected" : "")}
                        role="option"
                        aria-selected={option === "test"}
                        onClick={() => pick("test")}
                      >
                        Test Server
                      </div>
                      <div
                        className={"cpwas__menuitem" + (option === "custom" ? " is-selected" : "")}
                        role="option"
                        aria-selected={option === "custom"}
                        onClick={() => pick("custom")}
                      >
                        Custom Server
                      </div>
                    </div>
                  ) : null}
                </div>

                {isCustom ? (
                  <div className="cpwas__custominput">
                    <span className="cpwas__customtitle">Server URL</span>
                    <input
                      className="cpwas__customfield"
                      value={customUrl}
                      placeholder="https://"
                      onChange={(e) => {
                        if (error) setError("");
                        setCustomUrl(e.target.value);
                      }}
                    />
                    <span className="cpwas__error">{error}</span>
                  </div>
                ) : null}
              </div>

              <div className="cpwas__thumbnail">
                <GenesisPlazaThumb />
              </div>
            </div>

            <div className="cpwas__actions">
              <span className="cpwas__learnmore">LEARN MORE</span>
              <button type="button" className="cpwas__btn cpwas__btn--primary">
                {ACTION_LABEL[option]}
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
