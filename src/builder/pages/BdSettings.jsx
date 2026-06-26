import { useState } from "react";
import BuilderChrome from "../frames/BuilderChrome.jsx";
import Spinner from "../../atoms/Spinner.jsx";
import "./bdsettings.css";
import { Caret } from "../../atoms/icons.jsx";

const WALLET_ADDRESS = "0x9f3c5b1a4d2e8f7c0b6a9e3d1f7a4c8b2e0d5a21";

const AUTHORIZATIONS = [
  { address: "0x3b8c1d4f2a7e9c05b6a8d1e3f0c2a4b7d9e6f1a2", type: "parcel" },
  { address: "0x71a2c3d4e5f60718293a4b5c6d7e8f90a1b2c3d4", type: "estate" },
];

function shorten(addr) {
  return addr.slice(0, 6) + "…" + addr.slice(-4);
}

function Blockie({ seed }) {
  let h = 0;
  for (let i = 0; i < seed.length; i++) h = (h * 31 + seed.charCodeAt(i)) >>> 0;
  const rand = () => {
    h ^= h << 13;
    h ^= h >>> 17;
    h ^= h << 5;
    h >>>= 0;
    return h / 4294967296;
  };
  const hue = Math.floor(rand() * 360);
  const fg = `hsl(${hue} 62% 56%)`;
  const bg = `hsl(${hue} 28% 22%)`;
  const N = 8;
  const cells = [];
  for (let y = 0; y < N; y++) {
    for (let x = 0; x < N / 2 + 1; x++) {
      const on = rand() > 0.5;
      cells.push({ x, y, on });
      if (x < N / 2) cells.push({ x: N - 1 - x, y, on });
    }
  }
  return (
    <span className="bdset__blockie" style={{ background: bg }} aria-hidden="true">
      {cells.map((c, i) =>
        c.on ? (
          <span
            key={i}
            className="bdset__blockiecell"
            style={{
              left: `${(c.x / N) * 100}%`,
              top: `${(c.y / N) * 100}%`,
              background: fg,
            }}
          />
        ) : null,
      )}
    </span>
  );
}

function Profile({ address }) {
  let h = 0;
  for (let i = 0; i < address.length; i++) h = (h * 31 + address.charCodeAt(i)) >>> 0;
  const hue = h % 360;
  return (
    <span className="bdset__profile">
      <span
        className="bdset__profileavatar"
        style={{ background: `hsl(${hue} 45% 32%)` }}
        aria-hidden="true"
      />
      <span className="bdset__profilename">{shorten(address)}</span>
    </span>
  );
}

const TYPE_PLURAL = { parcel: "Parcels", estate: "Estates" };

export default function BdSettings({
  address = WALLET_ADDRESS,
  authorizations = AUTHORIZATIONS,
  loading = false,
}) {
  const [tab, setTab] = useState("");
  const [copied, setCopied] = useState(false);
  const [managerAddress, setManagerAddress] = useState("");
  const [type, setType] = useState("parcel");
  const [typeOpen, setTypeOpen] = useState(false);

  const isValidAddress = /^0x[a-fA-F0-9]{40}$/.test(managerAddress);
  const submitDisabled = managerAddress.length === 0 || !isValidAddress;

  const copy = () => {
    setCopied(true);
    setTimeout(() => setCopied(false), 1200);
  };

  if (loading) {
    return (
      <BuilderChrome active={tab} onTab={setTab}>
        <div className="bdset bdset--loading">
          <Spinner size={48} />
        </div>
      </BuilderChrome>
    );
  }

  return (
    <BuilderChrome active={tab} onTab={setTab}>
      <div className="bdset">
        <div className="bdset__grid">
          <div className="bdset__row">
            <div className="bdset__leftcol">Address</div>
            <div className="bdset__rightcol">
              <div className="bdset__blockiecontainer">
                <Blockie seed={address} />
              </div>
              <div className="bdset__addresscontainer">
                <div className="bdset__address">{address}</div>
                <div role="button" className="bdset__copy" onClick={copy}>
                  {copied ? (
                    <span>Copied</span>
                  ) : (
                    <span className="bdset__link">Copy Address</span>
                  )}
                </div>
              </div>
            </div>
          </div>

          <div className="bdset__row">
            <div className="bdset__leftcol">Authorizations</div>
            <div className="bdset__rightcol">
              <div className="bdset__disclaimer">
                You can assign other addresses to operate all your parcels or
                estates on your behalf. They <strong>will not</strong> be able to
                transfer or sell them, they will just be allowed to publish
                content on them.
              </div>

              <div className="bdset__action">
                <span className="bdset__actiontext">Authorize</span>
                <span className="bdset__field">
                  <input
                    type="text"
                    value={managerAddress}
                    onChange={(e) => setManagerAddress(e.target.value)}
                    placeholder="0x..."
                    className={
                      "bdset__input" +
                      (managerAddress.length > 0 && !isValidAddress
                        ? " bdset__input--error"
                        : "")
                    }
                  />
                </span>
                <span className="bdset__actiontext">to operate all your</span>
                <span className="bdset__dropdown">
                  <button
                    type="button"
                    className="bdset__dropdowntrigger"
                    aria-haspopup="listbox"
                    aria-expanded={typeOpen}
                    onClick={() => setTypeOpen((o) => !o)}
                  >
                    <span>{TYPE_PLURAL[type]}</span>
                    <Caret size={12} />
                  </button>
                  {typeOpen ? (
                    <div className="bdset__dropdownmenu" role="listbox">
                      {["parcel", "estate"].map((opt) => (
                        <button
                          key={opt}
                          type="button"
                          role="option"
                          aria-selected={type === opt}
                          className={
                            "bdset__dropdownitem" +
                            (type === opt ? " is-selected" : "")
                          }
                          onClick={() => {
                            setType(opt);
                            setTypeOpen(false);
                          }}
                        >
                          {TYPE_PLURAL[opt]}
                        </button>
                      ))}
                    </div>
                  ) : null}
                </span>
                <span className="bdset__actiontext">on your behalf.</span>

                <button
                  type="button"
                  className="bdset__submit"
                  disabled={submitDisabled}
                >
                  Submit
                </button>
              </div>

              {authorizations.length > 0 ? (
                <div className="bdset__section">
                  <h4 className="bdset__subheader">Active Authorizations</h4>
                  {authorizations.map((authorization) => (
                    <div className="bdset__authorization" key={authorization.address}>
                      <span className="bdset__authtext">
                        You authorized <Profile address={authorization.address} />{" "}
                        to operate all your{" "}
                        <strong>&nbsp;{TYPE_PLURAL[authorization.type]}&nbsp;</strong>{" "}
                        on your behalf.
                      </span>
                      <button type="button" className="bdset__revoke">
                        Revoke
                      </button>
                    </div>
                  ))}
                </div>
              ) : null}
            </div>
          </div>
        </div>
      </div>
    </BuilderChrome>
  );
}

export { WALLET_ADDRESS, AUTHORIZATIONS };
