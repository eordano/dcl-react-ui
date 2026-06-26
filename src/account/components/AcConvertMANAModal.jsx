import { useState } from "react";
import AccountChrome from "../frames/AccountChrome.jsx";
import ManaMark from "../../atoms/ManaMark.jsx";
import { Close } from "../../atoms/icons.jsx";
import "./acconvertmanamodal.css";

const COPY = {
  ethereum: {
    title: "Convert to Polygon MANA",
    subtitle: "Deposit MANA from Ethereum into Polygon",
    button: "Complete Deposit",
  },
  matic: {
    title: "Convert to Ethereum MANA",
    subtitle: "Withdraw MANA from Polygon into Ethereum",
    button: "Start Withdrawal",
  },
};

const FEES_WARNING =
  "Remember, any transaction that moves assets within, to, or from the Ethereum " +
  "blockchain will incur gas fees. Only transactions conducted exclusively on " +
  "Polygon are gas-less.";

function withdrawalCostCopy(cost) {
  return (
    <>
      This operation consists of two steps. The first step won't have any cost.
      The second one will cost approximately <b>{cost}</b> ETH of gas fees.
    </>
  );
}

function AmountForm({ network, amount, balance, manaPrice, onAmount, onMax }) {
  const overBalance = balance < amount;
  const button = COPY[network].button;
  const disabled = overBalance || amount <= 0;
  return (
    <>
      <div className="acconvertmanamodal__field">
        <label className="acconvertmanamodal__fieldlabel">Amount</label>
        <div className="acconvertmanamodal__inputrow">
          <input
            className="acconvertmanamodal__input"
            inputMode="numeric"
            placeholder="0"
            value={amount === 0 ? "" : String(amount)}
            onChange={(e) => onAmount(e.target.value)}
          />
          <button
            type="button"
            className="acconvertmanamodal__maxbtn"
            onClick={onMax}
          >
            Max
          </button>
        </div>
      </div>

      {overBalance ? (
        <div className="acconvertmanamodal__amounterror">
          You don't have enough balance
        </div>
      ) : (
        <div className="acconvertmanamodal__usd">
          {(amount * manaPrice).toFixed(2)} USD
        </div>
      )}

      <div className="acconvertmanamodal__feeswarning">{FEES_WARNING}</div>

      <button
        type="button"
        className={
          "acconvertmanamodal__cta" +
          " acconvertmanamodal__cta--" +
          network +
          (disabled ? " is-disabled" : "")
        }
        disabled={disabled}
      >
        {button}
      </button>
    </>
  );
}

function AuthorizationStep({ amount, onBack }) {
  return (
    <div className="acconvertmanamodal__auth">
      <div className="acconvertmanamodal__authsteps">
        <span className="acconvertmanamodal__step is-active">
          <span className="acconvertmanamodal__stepdot">1</span>
          Authorize MANA
        </span>
        <span className="acconvertmanamodal__steprule" />
        <span className="acconvertmanamodal__step">
          <span className="acconvertmanamodal__stepdot">2</span>
          Confirm transaction
        </span>
      </div>

      <div className="acconvertmanamodal__authcard">
        <div className="acconvertmanamodal__authcaplabel">MANA Approved</div>
        <p className="acconvertmanamodal__authdesc">
          Enter what you want to deposit {amount} MANA or a higher amount you're
          comfortable with. You can change the limit at any time.
        </p>
        <div className="acconvertmanamodal__capfield">
          <input
            className="acconvertmanamodal__capinput"
            value={amount}
            readOnly
          />
          <span className="acconvertmanamodal__capunit">MANA</span>
        </div>
      </div>

      <button type="button" className="acconvertmanamodal__cta acconvertmanamodal__cta--ethereum">
        Authorize
      </button>
      <button
        type="button"
        className="acconvertmanamodal__authback"
        onClick={onBack}
      >
        Back
      </button>
    </div>
  );
}

export default function AcConvertMANAModal({
  stage: initialStage = "form",
  network = "ethereum",
  manaEth = 2480.55,
  manaMatic = 1320.0,
  manaPrice = 0.41,
  cost = "0.0021",
}) {
  const [stage, setStage] = useState(initialStage);
  const [amount, setAmount] = useState(stage.startsWith("form") ? 120 : 0);

  const balance = network === "matic" ? manaMatic : manaEth;
  const copy = COPY[network];

  const effectiveAmount =
    stage === "form-error" ? Math.ceil(balance) + 500 : amount;

  function handleAmount(raw) {
    if (raw.length === 0) return setAmount(0);
    const n = parseInt(raw, 10);
    if (!isNaN(n)) setAmount(n);
  }

  const body =
    stage === "cost" || stage === "cost-loading" ? (
      <div className="acconvertmanamodal__feeswarning acconvertmanamodal__costgate">
        {stage === "cost-loading" ? (
          <span className="acconvertmanamodal__loader" aria-label="Loading cost" />
        ) : (
          withdrawalCostCopy(cost)
        )}
      </div>
    ) : stage === "auth" ? (
      <AuthorizationStep
        amount={effectiveAmount}
        onBack={() => setStage("form")}
      />
    ) : (
      <AmountForm
        network={network}
        amount={effectiveAmount}
        balance={balance}
        manaPrice={manaPrice}
        onAmount={handleAmount}
        onMax={() => setAmount(Math.floor(balance))}
      />
    );

  return (
    <div className="acconvertmanamodal">
      <AccountChrome
        mana={manaEth.toLocaleString(undefined, { maximumFractionDigits: 2 })}
        account="0x9f3c…7a21"
      >
        <div className="acconvertmanamodal__shellfill">
          <p className="acconvertmanamodal__shellhint">
            Convert MANA modal — overlaid on the Wallets dashboard.
          </p>
        </div>
      </AccountChrome>

      <div className="acconvertmanamodal__scrim">
        <div
          className="acconvertmanamodal__card"
          role="dialog"
          aria-modal="true"
          aria-label={copy.title}
        >
          <button
            type="button"
            className="acconvertmanamodal__close"
            aria-label="Close"
          >
            <Close size={14} strokeWidth={2.2} />
          </button>

          <header className="acconvertmanamodal__header">
            <div className="acconvertmanamodal__title">
              <span className="acconvertmanamodal__titlemark">
                <ManaMark size={18} />
              </span>
              {copy.title}
            </div>
            <div className="acconvertmanamodal__subtitle">{copy.subtitle}</div>
          </header>

          <div className="acconvertmanamodal__content">{body}</div>

          {stage === "cost" || stage === "cost-loading" ? (
            <div className="acconvertmanamodal__actions">
              <button
                type="button"
                className="acconvertmanamodal__cta acconvertmanamodal__cta--secondary"
              >
                Cancel
              </button>
              <button
                type="button"
                className="acconvertmanamodal__cta acconvertmanamodal__cta--matic"
                onClick={() => setStage("form")}
              >
                Proceed
              </button>
            </div>
          ) : null}
        </div>
      </div>
    </div>
  );
}
