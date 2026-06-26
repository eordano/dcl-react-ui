import { useState } from "react";
import { asset } from "../../asset.js";
import "./acunifiedemailconfirmation.css";

function descFor(state, source) {
  if (state === "confirmed") {
    if (source === "credits") {
      return (
        <>
          You're ready to go.
          <br />
          Jump back over to the Decentraland app and start earning{" "}
          <b>Marketplace Credits!</b>
        </>
      );
    }
    return (
      <>
        You're ready to go.
        <br />
        Jump back over to the Decentraland app and start using your account!
      </>
    );
  }
  if (source === "credits") {
    return (
      <>
        Complete the security challenge below and click "Confirm Email" to start
        earning <b>Marketplace Credits!</b>
      </>
    );
  }
  return (
    <>
      Complete the security challenge below and click "Confirm Email" to activate
      your account notifications.
    </>
  );
}

function TurnstileWidget({ verified }) {
  return (
    <div className={"uec__widget" + (verified ? " is-verified" : "")}>
      <span className="uec__widget-check" aria-hidden="true" />
      <span className="uec__widget-label">
        {verified ? "Success!" : "Verify you are human"}
      </span>
      <span className="uec__widget-brand" aria-hidden="true">
        <strong>CLOUDFLARE</strong>
        <span>Privacy · Terms</span>
      </span>
    </div>
  );
}

function CreditsAnimation() {
  const sparks = [
    { top: "18%", left: "20%" },
    { top: "26%", left: "78%" },
    { top: "62%", left: "14%" },
    { top: "70%", left: "82%" },
    { top: "14%", left: "52%" },
    { top: "78%", left: "46%" },
  ];
  return (
    <div className="uec__anim">
      <div className="uec__anim-stage">
        {sparks.map((s, i) => (
          <span key={i} className="uec__anim-spark" style={s} />
        ))}
        <div className="uec__anim-coin">◇</div>
      </div>
    </div>
  );
}

export default function AcUnifiedEmailConfirmation({
  state: initialState = "challenge",
  source = "account",
}) {
  const [state, setState] = useState(initialState);
  const [verified, setVerified] = useState(false);

  const guard =
    state === "invalid-link"
      ? { title: "Invalid Link", desc: "This confirmation link is invalid or expired." }
      : state === "invalid-source"
        ? {
            title: "Invalid Source",
            desc: "Invalid confirmation source. Please check your email link.",
          }
        : state === "missing-address"
          ? {
              title: "Missing Address",
              desc: "Address parameter is required in the URL. Please check your email link.",
            }
          : null;

  const isLoading = state === "confirming";
  const isConfirmed = state === "confirmed";
  const isButtonDisabled = isLoading || !verified;

  const title = isConfirmed ? "Email Confirmed!" : "Confirm Your Email";

  return (
    <div className="uec">
      <img className="uec__logo" src={asset("assets/dcl-logo.png")} alt="Logo" />

      <div className="uec__card">
        {guard ? (
          <>
            <h2 className="uec__title">{guard.title}</h2>
            <p className="uec__desc">{guard.desc}</p>
          </>
        ) : (
          <>
            {isConfirmed && source === "credits" && <CreditsAnimation />}

            <h2 className="uec__title">{title}</h2>
            <p className="uec__desc">{descFor(isConfirmed ? "confirmed" : "challenge", source)}</p>

            {!isConfirmed && (
              <>
                <div className="uec__turnstile">
                  <TurnstileWidget verified={verified} />
                </div>

                <div className="uec__btnwrap">
                  <button
                    type="button"
                    className="uec__btn"
                    disabled={isButtonDisabled}
                    onClick={() => {
                      if (!verified) {
                        setVerified(true);
                        return;
                      }
                      setState("confirming");
                      setTimeout(() => setState("confirmed"), 900);
                    }}
                  >
                    {isLoading ? "Confirming..." : "Confirm Email"}
                  </button>
                </div>
              </>
            )}

            {isConfirmed && (
              <div className="uec__btnwrap">
                <button type="button" className="uec__btn">
                  {source === "credits" ? "Go to Marketplace" : "Go back to Account"}
                </button>
              </div>
            )}
          </>
        )}
      </div>
    </div>
  );
}
