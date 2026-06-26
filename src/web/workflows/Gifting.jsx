import { useState } from "react";
import Modal from "../../components/Modal.jsx";
import { rarityColor } from "../../atoms/primitives.jsx";
import "./gifting.css";

const WEARABLES = [
  { name: "Forest Cloak", rarity: "epic", qty: 2, isNew: true },
  { name: "Cyber Jacket", rarity: "legendary", qty: 3 },
  { name: "Neon Visor", rarity: "epic", qty: 1 },
  { name: "Gold Chain", rarity: "unique", qty: 2 },
  { name: "Wizard Hat", rarity: "legendary", qty: 1 },
  { name: "Festival Mask", rarity: "mythic", qty: 5 },
  { name: "Diamond Earring", rarity: "exotic", qty: 1 },
  { name: "Classic Tee", rarity: "common", qty: 9 },
  { name: "Aviators", rarity: "rare", qty: 23 },
];

const EMOTES = [
  { name: "Crab Rave", rarity: "exotic", qty: 1 },
  { name: "Disco", rarity: "mythic", qty: 2 },
  { name: "Backflip", rarity: "legendary", qty: 1 },
  { name: "Headspin", rarity: "epic", qty: 4 },
];

function ItemTile({ it, picked, onPick }) {
  return (
    <button
      className={"gf__tile" + (picked ? " is-picked" : "")}
      style={{ "--r": rarityColor(it.rarity) }}
      onClick={onPick}
      title={it.name}
    >
      {it.isNew && <span className="gf__tilenew">NEW</span>}
      <span className="gf__tileart" />
      <span className="gf__tileqty">x{it.qty}</span>
    </button>
  );
}

function GiftSearch({ value, onChange, placeholder = "Search" }) {
  return (
    <label className="gf__searchbox">
      <svg viewBox="0 0 16 16" width="15" height="15" aria-hidden="true" className="gf__searchicon">
        <circle cx="7" cy="7" r="5" fill="none" stroke="currentColor" strokeWidth="1.6" />
        <path d="M11 11l3.5 3.5" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" />
      </svg>
      <input
        className="gf__searchinput" type="text" aria-label={placeholder}
        placeholder={placeholder} value={value}
        onChange={(e) => onChange(e.target.value)}
      />
      <button type="button" className="gf__searchclear" aria-label="Clear search" onClick={() => onChange("")}>
        <svg viewBox="0 0 16 16" width="13" height="13" aria-hidden="true">
          <path d="M4 4l8 8M12 4l-8 8" stroke="currentColor" strokeWidth="1.3" strokeLinecap="round" />
        </svg>
      </button>
    </label>
  );
}

function InfoIcon({ size = 16 }) {
  return (
    <svg viewBox="0 0 24 24" width={size} height={size} aria-hidden="true">
      <circle cx="12" cy="12" r="9" fill="none" stroke="currentColor" strokeWidth="1.6" />
      <circle cx="12" cy="7.6" r="1.1" fill="currentColor" />
      <path d="M12 10.6v6" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
    </svg>
  );
}

function SelectionDialog({ recipient, wallet, onClose, onSend, loading }) {
  const [tab, setTab] = useState("wearables");
  const [picked, setPicked] = useState(null);
  const [query, setQuery] = useState("");
  const source = tab === "wearables" ? WEARABLES : EMOTES;
  const list = query
    ? source.filter((it) => it.name.toLowerCase().includes(query.toLowerCase()))
    : source;
  const sel = list[picked];

  return (
    <Modal width={560} onClose={onClose}>
      <div className="gf gf--purple">
        <header className="gf__head">
          <span className="gf__avatar" aria-hidden="true" />
          <div className="gf__headtext">
            <h2 className="gf__title">Choose a Gift for <span className="gf__name">{recipient}</span></h2>
            {wallet && <div className="gf__wallet">{wallet}</div>}
          </div>
          <button className="gf__info" aria-label="More info" type="button"><InfoIcon size={18} /></button>
        </header>

        <div className="gf__toprow">
          <div className="gf__tabs" role="tablist">
            <button className={"gf__tab" + (tab === "wearables" ? " is-active" : "")} onClick={() => { setTab("wearables"); setPicked(null); }}>WEARABLES</button>
            <button className={"gf__tab" + (tab === "emotes" ? " is-active" : "")} onClick={() => { setTab("emotes"); setPicked(null); }}>EMOTES</button>
          </div>
          <div className="gf__search"><GiftSearch value={query} onChange={(q) => { setQuery(q); setPicked(null); }} placeholder="Search" /></div>
        </div>

        {loading ? (
          <div className="gf__loading"><div className="gf__spinner gf__spinner--gold" aria-label="Loading" /></div>
        ) : list.length === 0 ? (
          <div className="gf__noassets">No assets match your search terms.</div>
        ) : (
          <div className="gf__grid">
            {list.map((it, i) => (
              <ItemTile key={it.name} it={it} picked={i === picked} onPick={() => setPicked(i)} />
            ))}
          </div>
        )}

        <p className="gf__warn"><InfoIcon size={15} /> Gifting an item cannot be undone.</p>

        <div className="gf__actions">
          <button className="gf__cancel" onClick={onClose}>CANCEL</button>
          <button className="gf__send" disabled={!sel} onClick={() => onSend(sel)}>SEND GIFT</button>
        </div>
      </div>
    </Modal>
  );
}

function TransferDialog({ recipient, item, onClose }) {
  return (
    <Modal width={420} onClose={onClose}>
      <div className="gf gf--center">
        <div className="gf__previewart" style={{ "--r": rarityColor(item.rarity) }}>
          <span className="gf__previewqty">x{item.qty}</span>
        </div>
        <div className="gf__previewname">{item.name}</div>
        <h2 className="gf__title gf__title--center">Preparing Gift for <span className="gf__name">{recipient}</span></h2>
        <div className="gf__spinner" aria-hidden="true" />
        <p className="gf__note">A browser window should open for you to confirm this transfer.</p>
        <p className="gf__note gf__note--dim">Sending your gift is taking longer than expected. You can close this window.</p>
        <button className="gf__cancel gf__cancel--wide" onClick={onClose}>CLOSE</button>
      </div>
    </Modal>
  );
}

function SuccessDialog({ recipient, onClose }) {
  return (
    <Modal width={420} onClose={onClose}>
      <div className="gf gf--center">
        <div className="gf__check" aria-hidden="true">
          <svg viewBox="0 0 64 64" width="64" height="64">
            <circle cx="32" cy="32" r="30" fill="none" stroke="var(--online)" strokeWidth="3" />
            <path d="M19 33l9 9 17-19" fill="none" stroke="var(--online)" strokeWidth="4" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        </div>
        <h2 className="gf__title gf__title--center">Gift Sent to <span className="gf__name">{recipient}</span>!</h2>
        <button className="gf__send gf__send--wide" onClick={onClose}>OK</button>
      </div>
    </Modal>
  );
}

function ReceivedDialog({ onClose }) {
  return (
    <Modal width={420} onClose={onClose}>
      <div className="gf gf--center gf--received">
        <div className="gf__opened">GIFT OPENED</div>
        <div className="gf__previewart gf__previewart--purple">
          <span className="gf__sparkle" aria-hidden="true">
            <svg viewBox="0 0 24 24" width="22" height="22">
              <path d="M12 2l2 7 7 2-7 2-2 7-2-7-7-2 7-2z" fill="currentColor" />
            </svg>
          </span>
        </div>
        <div className="gf__previewname">Asset Name</div>
        <div className="gf__from">FROM PLAYERNAME</div>
        <div className="gf__actions gf__actions--stack">
          <button className="gf__send gf__send--wide">GO TO BACKPACK</button>
          <button className="gf__cancel gf__cancel--wide" onClick={onClose}>CLOSE</button>
        </div>
      </div>
    </Modal>
  );
}

const RECIPIENT = "Playername";
const WALLET = "0x1f…a92";

export default function Gifting() {
  const [mode, setMode] = useState("send");
  const [stage, setStage] = useState("select");
  const [item, setItem] = useState(null);

  function onSend(it) {
    setItem(it);
    setStage("transfer");
    setTimeout(() => setStage("success"), 900);
  }

  return (
    <div className="ep__backdrop gf__backdrop">
      <div className="gf__switch">
        <button className={mode === "send" ? "is-active" : ""} onClick={() => { setMode("send"); setStage("select"); }}>Send a Gift</button>
        <button className={mode === "received" ? "is-active" : ""} onClick={() => setMode("received")}>Gift Received</button>
      </div>

      {mode === "send" && (
        <>
          {stage === "select" && (
            <SelectionDialog recipient={RECIPIENT} wallet={WALLET} onClose={() => setStage("select")} onSend={onSend} />
          )}
          {stage === "transfer" && item && (
            <TransferDialog recipient={RECIPIENT} item={item} onClose={() => setStage("select")} />
          )}
          {stage === "success" && (
            <SuccessDialog recipient={RECIPIENT} onClose={() => setStage("select")} />
          )}
        </>
      )}

      {mode === "received" && <ReceivedDialog onClose={() => setMode("send")} />}
    </div>
  );
}
