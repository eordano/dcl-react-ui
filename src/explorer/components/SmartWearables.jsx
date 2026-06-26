import "./smartwearables.css";

function SmartBadge() {
  return (
    <span className="sw__smart">
      <svg viewBox="0 0 24 24" width="13" height="13" aria-hidden="true" fill="currentColor">
        <path d="M13 2 4 14h6l-1 8 9-12h-6z" />
      </svg>
      SMART
    </span>
  );
}

export default function SmartWearables({
  name = "Magic Sneakers",
  capability = "your wallet (buy, transfer)",
  recurring = false,
  onDecision = () => {},
}) {
  return (
    <div
      className={"sw" + (recurring ? " sw--recurring" : "")}
      role="alertdialog"
      aria-modal="true"
      aria-label={`${name} permission request`}
    >
      <div className="sw__head">
        <span className="sw__preview" aria-hidden="true">
          <span className="sw__ribbon" />
        </span>
        <SmartBadge />
      </div>

      <h2 className="sw__name">{name}</h2>
      <p className="sw__detail">wants to control on your behalf:</p>
      <p className="sw__capability">{capability}</p>
      <p className="sw__ask">Allow this?</p>

      {recurring ? (
        <>
          <div className="sw__actions sw__actions--quad">
            <button className="sw__btn sw__btn--deny" onClick={() => onDecision("never")}>
              No, don't ask again
            </button>
            <button className="sw__btn sw__btn--soft" onClick={() => onDecision("not-now")}>
              Not this time
            </button>
            <button className="sw__btn sw__btn--soft" onClick={() => onDecision("once")}>
              Yes, once
            </button>
            <button className="sw__btn sw__btn--primary" onClick={() => onDecision("always")}>
              Yes, always
            </button>
          </div>
          <p className="sw__note">
            You can review persistent decisions later in the settings area.
          </p>
        </>
      ) : (
        <div className="sw__actions">
          <button className="sw__btn sw__btn--soft" onClick={() => onDecision("no")}>
            No
          </button>
          <button className="sw__btn sw__btn--primary" onClick={() => onDecision("yes")}>
            Yes
          </button>
        </div>
      )}
    </div>
  );
}
