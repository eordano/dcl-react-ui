import { useState } from "react";
import { ManaIcon } from "../../atoms/icons.jsx";
import "./donations.css";

const PLACE = "Genesis Plaza";
const PRESETS = [166, 333, 500];
const AVAILABLE = 0;
const USD_RATE = 0.0667;

function ManaDiamond({ size = 16 }) {
  return (
    <svg viewBox="0 0 24 24" width={size} height={size} aria-hidden="true" className="dn__diamond">
      <path d="M12 2l8 10-8 10-8-10z" fill="#f5871f" stroke="#fff" strokeWidth="1.4" />
    </svg>
  );
}

function CopyIcon({ size = 13 }) {
  return (
    <svg viewBox="0 0 24 24" width={size} height={size} aria-hidden="true">
      <rect x="8" y="8" width="12" height="12" rx="2" fill="none" stroke="currentColor" strokeWidth="2" />
      <path d="M4 16V4h12" fill="none" stroke="currentColor" strokeWidth="2" />
    </svg>
  );
}

export default function Donations() {
  const [amount, setAmount] = useState(166);
  const [custom, setCustom] = useState(false);
  const [sent, setSent] = useState(false);

  const mana = amount;
  const usd = (mana * USD_RATE).toFixed(2);
  const tooHigh = mana > AVAILABLE;
  const invalid = mana < 1 || tooHigh;

  if (sent) {
    return (
      <div className="dn__backdrop">
        <div className="dn dn--confirmed">
          <div className="dn__burst"><ManaIcon size={44} className="dn__mana" /></div>
          <h2 className="dn__ctitle">Tip Sent!</h2>
          <p className="dn__csub">You sent <b>{mana} MANA</b> to <b>{PLACE}</b>'s Creator.</p>
          <button className="dn__ok" onClick={() => setSent(false)}>OK</button>
        </div>
      </div>
    );
  }

  return (
    <div className="dn__backdrop">
      <div className="dn">
        <h2 className="dn__title">Send a Tip to {PLACE} 's Creator</h2>

        <div className="dn__creator">
          <span className="dn__avatar" />
          <div className="dn__creatorname">
            lle <span className="dn__verified" aria-hidden="true">✔</span>
          </div>
          <div className="dn__wallet">
            <span>0x1E9...AA52b</span>
            <button className="dn__copy" aria-label="Copy wallet address"><CopyIcon /></button>
          </div>
        </div>

        <div className="dn__amountlabel">Enter tip amount</div>

        <div className="dn__presets">
          {PRESETS.map((p) => (
            <button
              key={p}
              className={"dn__preset" + (!custom && amount === p ? " is-active" : "")}
              onClick={() => { setCustom(false); setAmount(p); }}
            >
              <ManaDiamond /> {p}
            </button>
          ))}
          <button
            className={"dn__preset dn__preset--custom" + (custom ? " is-active" : "")}
            onClick={() => setCustom(true)}
          >Custom</button>
        </div>

        <div className="dn__fields">
          <div className="dn__field">
            <div className="dn__fieldlabel">MANA</div>
            <input
              className="dn__input" type="number" min="1" inputMode="numeric"
              value={amount}
              onChange={(e) => { setCustom(true); setAmount(Math.max(0, Number(e.target.value))); }}
            />
          </div>
          <div className="dn__equals" aria-hidden="true">=</div>
          <div className="dn__field">
            <div className="dn__fieldlabel">USD</div>
            <div className="dn__usd">{usd}</div>
          </div>
        </div>

        <div className="dn__warning">
          <ManaIcon size={14} className="dn__mana" />
          <span>{AVAILABLE} Insufficient MANA.</span>
          <button className="dn__buy">BUY MANA</button>
        </div>

        <div className="dn__actions">
          <button className="dn__cancel">Cancel</button>
          <button className="dn__send" disabled={invalid} onClick={() => setSent(true)}>
            Send Tip
          </button>
        </div>
      </div>
    </div>
  );
}
