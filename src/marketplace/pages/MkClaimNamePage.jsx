import { useMemo, useState } from "react";
import { asset } from "../../asset.js";
import MarketplaceChrome from "../frames/MarketplaceChrome.jsx";
import Button from "../../atoms/Button.jsx";
import ManaMark from "../../atoms/ManaMark.jsx";
import "./mkclaimnamepage.css";

const MAX_NAME_SIZE = 15;
const PLACEHOLDER_NAME = "yourName";

const TAKEN_NAMES = ["decentraland", "metaverse", "vitalik", "satoshi"];

function classifyName(raw) {
  const name = raw.trim();
  if (name === "" || name === PLACEHOLDER_NAME) return { kind: "idle" };
  if (/\s/.test(name)) return { kind: "invalid", message: "NAMEs can't contain spaces." };
  if (name.length < 2)
    return {
      kind: "invalid",
      warn: true,
      message: "NAME too short: NAMEs must be at least 2 characters long.",
    };
  if (name.length > MAX_NAME_SIZE)
    return { kind: "invalid", message: "NAMEs can contain up to 15 characters." };
  if (!/^[a-zA-Z0-9]+$/.test(name))
    return { kind: "invalid", message: "NAMEs can only contain alphanumeric characters." };
  if (TAKEN_NAMES.includes(name.toLowerCase())) return { kind: "unavailable" };
  return { kind: "available" };
}

function CreditsMark() {
  return (
    <svg viewBox="0 0 24 24" width="20" height="20" aria-hidden="true">
      <circle cx="12" cy="12" r="9" fill="none" stroke="#ffd84d" strokeWidth="2" />
      <path d="M12 7v10M7 12h10" stroke="#ffd84d" strokeWidth="2" strokeLinecap="round" />
    </svg>
  );
}

function PassportGlyph() {
  return (
    <img
      src={asset("assets/claim-name.svg")}
      width="97"
      height="106"
      alt=""
      aria-hidden="true"
      className="mkclaimnamepage__passportglyph"
    />
  );
}

function ClaimNameFatFingerModal({ name, onClose }) {
  const [confirm, setConfirm] = useState("");
  const mismatch = confirm.length > 0 && confirm !== name;
  return (
    <div className="mkclaimnamepage__scrim" onClick={onClose}>
      <div
        className="mkclaimnamepage__modal"
        role="dialog"
        aria-modal="true"
        aria-label="Confirm your new NAME"
        onClick={(e) => e.stopPropagation()}
      >
        <button type="button" className="mkclaimnamepage__modalclose" onClick={onClose} aria-label="Close">
          ✕
        </button>
        <h2 className="mkclaimnamepage__modaltitle">Confirm your new NAME</h2>
        <p className="mkclaimnamepage__modaldesc">
          You have chosen <strong>{name}</strong>.
          <br />
          Re-enter your NAME to confirm your selection.
        </p>

        <div
          className={
            "mkclaimnamepage__modalfield" + (mismatch ? " is-error" : "")
          }
        >
          <input
            value={confirm}
            placeholder="Your unique NAME"
            onChange={(e) => setConfirm(e.target.value.replace(/\s/g, ""))}
          />
        </div>
        {mismatch ? <span className="mkclaimnamepage__modalerror">Names do not match</span> : null}

        <div className="mkclaimnamepage__capswarning">
          <span className="mkclaimnamepage__infocircle">i</span>
          The capitalization of NAMEs cannot be modified once claimed.
        </div>

        <div className="mkclaimnamepage__pricerow">
          <div className="mkclaimnamepage__pricelabel">PRICE</div>
          <div className="mkclaimnamepage__pricevalue">
            <span className="mkclaimnamepage__pricemana"><ManaMark size={26} /></span>
            <span className="mkclaimnamepage__priceamount">100</span>
            <span className="mkclaimnamepage__pricefiat">($31.42)</span>
          </div>
        </div>

        <div className="mkclaimnamepage__modalactions">
          <Button variant="primary" disabled={confirm !== name}>
            <span className="mkclaimnamepage__btnmana"><ManaMark size={16} /></span> Buy with MANA
          </Button>
          <Button variant="secondary" disabled={confirm !== name}>
            Buy with card
          </Button>
        </div>
      </div>
    </div>
  );
}

const WHY_CARDS = [
  {
    kind: "stand_out",
    img: "assets/names-create.png",
    title: "Stand out with a unique alias for your avatar",
    body: "Own your presence in the metaverse with a username free from numbers on the end (e.g. Genesis#1234).",
  },
  {
    kind: "unlock",
    img: "assets/names-own-space.png",
    title: "Unlock your own World",
    body: (
      <>
        Customize your own virtual 3D space in the metaverse. Host events, build, and experiment.{" "}
        <a className="mkclaimnamepage__learnmore" href="https://decentraland.org/blog/about-decentraland/decentraland-worlds-your-own-virtual-space">
          Learn more
        </a>
      </>
    ),
  },
  {
    kind: "governance",
    img: "assets/names-governance.png",
    title: "Participate in Governance",
    body: (
      <>
        Shape the future of Decentraland—each NAME grants you{" "}
        <b className="mkclaimnamepage__voting">100 Voting Power</b> when voting on DAO proposals.{" "}
        <a className="mkclaimnamepage__learnmore" href="https://docs.decentraland.org/dao/dao/what-is-the-dao">
          Learn more
        </a>
      </>
    ),
  },
  {
    kind: "get_url",
    img: "assets/names-landmark.png",
    title: "A dedicated URL for your virtual spaces",
    body: (
      <>
        Guide visitors with an exclusive, memorable URL for your LAND or Worlds{" "}
        <b className="mkclaimnamepage__namelink">https://name.dcl.eth</b>
      </>
    ),
  },
];

export default function MkClaimNamePage({
  initialName = PLACEHOLDER_NAME,
  forceStatus,
  initialFocused,
  insufficientMana = false,
}) {
  const [active, setActive] = useState("names");
  const [name, setName] = useState(initialName);
  const [focused, setFocused] = useState(
    initialFocused ?? (initialName !== PLACEHOLDER_NAME)
  );
  const [showModal, setShowModal] = useState(false);

  const status = useMemo(() => {
    if (forceStatus) return forceStatus;
    return classifyName(name);
  }, [forceStatus, name]);

  const canClaim = status.kind === "available" && !insufficientMana;
  const charCount = name === PLACEHOLDER_NAME ? 0 : name.length;

  function onClaim() {
    if (!canClaim) return;
    setShowModal(true);
  }

  return (
    <MarketplaceChrome active={active} onTab={setActive}>
      <div className="mkclaimnamepage">
        <div className="mkclaimnamepage__inner">
          <div className="mkclaimnamepage__gradient">
            <div className="mkclaimnamepage__claim">
              <div className="mkclaimnamepage__hero">
                <PassportGlyph />
                <h2 className="mkclaimnamepage__title">Claim your NAME, Unlock Your World!</h2>
              </div>

              <span className="mkclaimnamepage__subtitle">
                Activate the full potential of Decentraland citizenship with a unique NAME, Voting
                Power, &amp; your own World!
              </span>

              <div className="mkclaimnamepage__inputwrap">
                <div
                  className={"mkclaimnamepage__field" + (focused ? " is-focus" : "")}
                  onClick={() => setFocused(true)}
                >
                  <input
                    className="mkclaimnamepage__input"
                    value={name === PLACEHOLDER_NAME ? "" : name}
                    placeholder="Your NAME goes here"
                    onFocus={() => {
                      setFocused(true);
                      if (name === PLACEHOLDER_NAME) setName("");
                    }}
                    onChange={(e) => setName(e.target.value)}
                    onKeyDown={(e) => e.key === "Enter" && onClaim()}
                  />
                  <span className="mkclaimnamepage__suffix">.dcl.eth</span>
                  <span className="mkclaimnamepage__counter">
                    {charCount}/{MAX_NAME_SIZE}
                  </span>
                </div>
                <Button
                  variant="primary"
                  className="mkclaimnamepage__claimbtn"
                  disabled={!canClaim}
                  onClick={onClaim}
                >
                  Claim NAME
                </Button>

                {focused && status.kind === "available" ? (
                  <div className="mkclaimnamepage__availability">
                    <span className="mkclaimnamepage__ok">✓</span> NAME available
                  </div>
                ) : null}
                {focused && status.kind === "unavailable" ? (
                  <div className="mkclaimnamepage__availability">
                    <span className="mkclaimnamepage__no">✕</span> Unavailable NAME.{" "}
                    <a className="mkclaimnamepage__resoldlink" href={`/marketplace/names?search=${encodeURIComponent(name)}`}>
                      See if it's on sale in the Marketplace. <span aria-hidden="true">↗</span>
                    </a>
                  </div>
                ) : null}
                {focused && status.kind === "invalid" ? (
                  <div className="mkclaimnamepage__availability">
                    <span className={status.warn ? "mkclaimnamepage__warn" : "mkclaimnamepage__no"}>
                      {status.warn ? "⚠" : "✕"}
                    </span>{" "}
                    {status.message}
                  </div>
                ) : null}
                {insufficientMana && status.kind === "available" ? (
                  <div className="mkclaimnamepage__availability">
                    <span className="mkclaimnamepage__no">✕</span> You don't have enough MANA to
                    claim a new NAME
                  </div>
                ) : null}
              </div>

              <div className={"mkclaimnamepage__cost" + (focused ? " is-faded" : "")}>
                <div className="mkclaimnamepage__costrow">
                  <div className="mkclaimnamepage__pricesection">
                    A NAME costs{" "}
                    <span className="mkclaimnamepage__costmana">
                      <ManaMark className="mkclaimnamepage__managlyph" /> 100 MANA
                    </span>{" "}
                    <span className="mkclaimnamepage__costnetwork">Ethereum Mainnet Network</span>
                    <span className="mkclaimnamepage__infotip" title="All proceeds from NAME sales are redirected to the DAO treasury.">
                      i
                    </span>
                  </div>
                  <span className="mkclaimnamepage__divider">|</span>
                  <div className="mkclaimnamepage__credit">
                    <CreditsMark /> Credit Compatible!
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="mkclaimnamepage__ctas">
            <h1 className="mkclaimnamepage__whytitle">Why get a NAME?</h1>
            <div className="mkclaimnamepage__cards">
              {WHY_CARDS.map((card) => (
                <div key={card.kind} className="mkclaimnamepage__card">
                  <div className={"mkclaimnamepage__whyimg mkclaimnamepage__whyimg--" + card.kind}>
                    <img src={asset(card.img)} alt="" />
                  </div>
                  <div className="mkclaimnamepage__whytext">
                    <span>{card.title}</span>
                    <p>{card.body}</p>
                  </div>
                </div>
              ))}
            </div>

            <div className="mkclaimnamepage__bottom">
              <div className="mkclaimnamepage__nametaken">
                <div className="mkclaimnamepage__ctabody">
                  <div className="mkclaimnamepage__ctaicon" aria-hidden="true">
                    <img src={asset("assets/names-chest.png")} alt="" />
                  </div>
                  <div className="mkclaimnamepage__ctacopy">
                    <h2>Has your chosen NAME already been claimed?</h2>
                    <span>
                      Claimed NAMEs can be sold in the Marketplace—see if the NAME you want is
                      available.
                    </span>
                    <a href="/marketplace/names" className="mkclaimnamepage__ctalink">
                      <Button variant="secondary" className="mkclaimnamepage__ctabtn">
                        Browse NAMEs being resold
                      </Button>
                    </a>
                  </div>
                </div>
              </div>
              <div className="mkclaimnamepage__manage">
                <div className="mkclaimnamepage__ctabody">
                  <div className="mkclaimnamepage__ctaicon" aria-hidden="true">
                    <img src={asset("assets/names-passports.png")} alt="" />
                  </div>
                  <div className="mkclaimnamepage__ctacopy mkclaimnamepage__ctacopy--center">
                    <h2>Already have Decentraland NAMEs?</h2>
                    <a href="https://builder.decentraland.org/names" target="_blank" rel="noopener noreferrer" className="mkclaimnamepage__ctalink">
                      <Button variant="secondary" className="mkclaimnamepage__ctabtn">
                        Manage your NAMEs
                      </Button>
                    </a>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {showModal ? (
          <ClaimNameFatFingerModal name={name} onClose={() => setShowModal(false)} />
        ) : null}
      </div>
    </MarketplaceChrome>
  );
}
