import BdNameDetail from "../pages/BdNameDetail.jsx";
import BdNamesList from "../pages/BdNamesList.jsx";
import ManaMark from "../../atoms/ManaMark.jsx";
import "./bdmintnamewizard.css";

export default function BdMintNameView({
  value,
  step,
  activeName,
  ens,
  draft = "",
  draftValid = false,
  names =([]),
  alias = "",
  reason,
  error,
  resultTxHash,
  priceMana,
  maxNameSize,
  onDraftChange,
  onSubmitName,
  onEdit,
  onBack,
  onApproveMana,
  onSignMint,
  onRetry,
}) {
  const cost = (
    <span className="mint-name-wizard__cost">
      <ManaMark className="" /> {priceMana} MANA
    </span>
  );

  if (value === "done") {
    return (
      <div className="mint-name-wizard" data-step={step}>
        <BdNamesList names={names} alias={alias} />
        <div className="mint-name-wizard__controls" role="group" aria-label="NAME minted">
          <p className="mint-name-wizard__status" aria-live="polite">
            Minted <strong>{activeName}.dcl.eth</strong>.{" "}
            <span className="mint-name-wizard__note">
              (simulated on-chain register — tx{" "}
              {resultTxHash?.slice(0, 10) ?? "0x…"}…, stub)
            </span>
          </p>
          <a className="mint-name-wizard__btn mint-name-wizard__btn--primary" href="/builder/names">
            View your NAMEs
          </a>
        </div>
      </div>
    );
  }

  if (value === "blocked") {
    return (
      <div className="mint-name-wizard" data-step={step}>
        <BdNameDetail ens={ens} error="Name unavailable" />
        <div className="mint-name-wizard__controls" role="group" aria-label="NAME unavailable">
          <p className="mint-name-wizard__status" aria-live="polite">
            <span className="mint-name-wizard__reason">
              {reason ?? `${activeName}.dcl.eth is unavailable.`}
            </span>
          </p>
          <button
            type="button"
            className="mint-name-wizard__btn mint-name-wizard__btn--primary"
            onClick={onEdit}
          >
            Try another name
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="mint-name-wizard" data-step={step}>
      <BdNameDetail
        ens={ens}
        alias={ens.subdomain}
        isLoading={value === "checking" || value === "minting"}
      />

      {value === "searching" && (
        <div className="mint-name-wizard__controls" role="group" aria-label="Search a NAME">
          <label className="mint-name-wizard__field">
            <span className="mint-name-wizard__label">Desired NAME</span>
            <input
              className="mint-name-wizard__input"
              value={draft}
              maxLength={maxNameSize}
              onChange={(e) => onDraftChange?.(e.target.value)}
              placeholder="yourName"
              aria-label="NAME to mint"
            />
            <span className="mint-name-wizard__suffix">.dcl.eth</span>
          </label>
          <button
            type="button"
            className="mint-name-wizard__btn mint-name-wizard__btn--primary"
            disabled={!draftValid}
            onClick={onSubmitName}
          >
            Check availability
          </button>
        </div>
      )}

      {value === "checking" && (
        <div className="mint-name-wizard__controls">
          <p className="mint-name-wizard__status" aria-live="polite">
            Checking availability of <strong>{activeName}.dcl.eth</strong>…
            <span className="mint-name-wizard__note"> (simulated registrar read)</span>
          </p>
        </div>
      )}

      {value === "preview" && (
        <div className="mint-name-wizard__controls" role="group" aria-label="Preview NAME">
          <p className="mint-name-wizard__status" aria-live="polite">
            <strong>{activeName}.dcl.eth</strong> is available. Mint it for {cost} on
            Ethereum Mainnet.
          </p>
          <button
            type="button"
            className="mint-name-wizard__btn"
            onClick={onBack}
          >
            Back
          </button>
          <button
            type="button"
            className="mint-name-wizard__btn mint-name-wizard__btn--primary"
            onClick={onApproveMana}
          >
            Approve {priceMana} MANA
          </button>
        </div>
      )}

      {value === "approving" && (
        <div className="mint-name-wizard__controls" role="group" aria-label="Approve MANA">
          <p className="mint-name-wizard__status" aria-live="polite">
            MANA approved for the DCLRegistrar. Sign to register{" "}
            <strong>{activeName}.dcl.eth</strong> ({cost}).
            <span className="mint-name-wizard__note">
              {" "}
              Simulated approval — no on-chain transaction is sent (read-only realm).
            </span>
          </p>
          <button
            type="button"
            className="mint-name-wizard__btn"
            onClick={onBack}
          >
            Back
          </button>
          <button
            type="button"
            className="mint-name-wizard__btn mint-name-wizard__btn--primary"
            onClick={onSignMint}
          >
            Sign &amp; register
          </button>
        </div>
      )}

      {value === "minting" && (
        <div className="mint-name-wizard__controls">
          <p className="mint-name-wizard__status" aria-live="polite">
            Registering <strong>{activeName}.dcl.eth</strong>…
            <span className="mint-name-wizard__note"> (simulated DCLRegistrar.register)</span>
          </p>
        </div>
      )}

      {value === "error" && (
        <div className="mint-name-wizard__controls" role="group" aria-label="Mint failed">
          <p className="mint-name-wizard__status" aria-live="polite">
            <span className="mint-name-wizard__reason">
              Register failed: {error ?? "mint failed"}.
            </span>
          </p>
          <button
            type="button"
            className="mint-name-wizard__btn mint-name-wizard__btn--primary"
            onClick={onRetry}
          >
            Retry mint
          </button>
        </div>
      )}
    </div>
  );
}
