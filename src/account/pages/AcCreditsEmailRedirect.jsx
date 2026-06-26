import { asset } from "../../asset.js";
import Button from "../../atoms/Button.jsx";
import Spinner from "../../atoms/Spinner.jsx";
import "./accreditsemailredirect.css";

function CreditsAnimation() {
  const sparks = [
    { top: "16%", left: "22%" },
    { top: "24%", left: "76%" },
    { top: "60%", left: "16%" },
    { top: "68%", left: "80%" },
    { top: "12%", left: "50%" },
    { top: "76%", left: "48%" },
  ];
  return (
    <div className="cer__anim">
      <div className="cer__anim-stage">
        {sparks.map((s, i) => (
          <span key={i} className="cer__anim-spark" style={s} />
        ))}
        <div className="cer__anim-coin">◇</div>
      </div>
    </div>
  );
}

function RedirectingSplash({ to }) {
  return (
    <div className="cer__redir">
      <Spinner size={40} />
      <p className="cer__redir-label">Redirecting…</p>
      <code className="cer__redir-to">{to}</code>
    </div>
  );
}

export default function AcCreditsEmailRedirect({
  branch = "confirmed",
  token = "8f2a1c9d4b6e",
}) {
  const redirectTo = `/confirm-email-challenge/${token}?source=credits`;

  return (
    <div className="cer">
      <img className="cer__logo" src={asset("assets/dcl-logo.png")} alt="Logo" />

      {branch === "redirect" ? (
        <RedirectingSplash to={redirectTo} />
      ) : (
        <div className="cer__card">
          <CreditsAnimation />
          <h2 className="cer__title">Email Confirmed!</h2>
          <p className="cer__desc">
            You're ready to go.
            <br />
            Jump back over to the Decentraland app and start earning{" "}
            <b>Marketplace Credits!</b>
          </p>
          <Button
            variant="primary"
            size="lg"
            className="cer__cta"
            onClick={() => {
              if (typeof window !== "undefined") window.location.href = "https://decentraland.org/download";
            }}
          >
            Open Decentraland
          </Button>
        </div>
      )}
    </div>
  );
}
