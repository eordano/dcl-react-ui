import { useCallback, useState } from "react";
import { Close } from "../../atoms/icons.jsx";
import "./chworldpermissionsaddcollaboratordialog.css";

const ADDRESS_RE = /^0x[0-9a-fA-F]{40}$/;
function isValidAddress(addr) {
  return ADDRESS_RE.test(addr.trim());
}

const WORLD_NAME = "mystore.dcl.eth";
const INVALID_ADDRESS = "Invalid address";

const LockIcon = ({ size = 20 }) => (
  <svg viewBox="0 0 24 24" width={size} height={size} aria-hidden="true">
    <rect x="5" y="10.5" width="14" height="10" rx="2" fill="currentColor" />
    <path d="M8 10.5V8a4 4 0 0 1 8 0v2.5" stroke="currentColor" strokeWidth="2" fill="none" strokeLinecap="round" />
  </svg>
);

function AddCollaboratorForm({ value = "", error = null }) {
  const [address, setAddress] = useState(value);
  const [err, setErr] = useState(error);

  const handleChange = useCallback((e) => {
    setAddress(e.target.value);
    setErr(null);
  }, []);

  const handleSubmit = useCallback(() => {
    if (!address || !isValidAddress(address)) {
      setErr(INVALID_ADDRESS);
      return;
    }
    setErr(null);
  }, [address]);

  const isValid = address.length > 0 && !err;

  return (
    <div className="acd__form">
      <h5 className="acd__title">Add Collaborator</h5>

      <div className={"acd__field" + (err ? " is-error" : "")}>
        <input
          className="acd__input"
          type="text"
          placeholder="0x..."
          /* eslint-disable-next-line jsx-a11y/no-autofocus */
          autoFocus
          value={address}
          onChange={handleChange}
          aria-invalid={!!err}
          aria-label="Wallet address"
        />
        {err && <p className="acd__helper">{err}</p>}
      </div>

      <div className="acd__actions">
        <button type="button" className="acd__btn acd__btn--secondary">
          Cancel
        </button>
        <button
          type="button"
          className="acd__btn acd__btn--primary"
          disabled={!isValid}
          onClick={handleSubmit}
        >
          Confirm
        </button>
      </div>
    </div>
  );
}

function ModalChrome({ children }) {
  const TABS = [
    { value: "access", label: "Access" },
    { value: "collaborators", label: "Collaborators" },
  ];
  return (
    <div className="acd__modal" role="dialog" aria-modal="true" aria-label="Add collaborator">
      <header className="acd__header">
        <div className="acd__headertitle">
          <LockIcon />
          <h6>Permissions - {WORLD_NAME}</h6>
        </div>
        <button type="button" className="acd__close" aria-label="close">
          <Close size={22} />
        </button>
      </header>

      <div className="acd__layout">
        <div className="acd__tabslist" role="tablist">
          {TABS.map((tb) => (
            <button
              key={tb.value}
              type="button"
              role="tab"
              aria-selected={tb.value === "collaborators"}
              className={"acd__tab" + (tb.value === "collaborators" ? " is-selected" : "")}
            >
              {tb.label}
            </button>
          ))}
        </div>
        <div className="acd__content">
          <div className="acd__centered">{children}</div>
        </div>
      </div>
    </div>
  );
}

export default function ChWorldPermissionsAddCollaboratorDialog({
  value = "",
  error = null,
  chrome = true,
}) {
  const form = <AddCollaboratorForm value={value} error={error} />;
  return (
    <div className="acd__backdrop">
      {chrome ? <ModalChrome>{form}</ModalChrome> : form}
    </div>
  );
}
