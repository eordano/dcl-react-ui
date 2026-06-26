import { asset } from "../../asset.js";
import "./acemailconfirmationerrorstates.css";

const ERRORS = {
  "invalid-link": {
    label: "Invalid Link",
    title: "Invalid Link",
    desc: "This confirmation link is invalid or expired.",
  },
  "invalid-source": {
    label: "Invalid Source",
    title: "Invalid Source",
    desc: "Invalid confirmation source. Please check your email link.",
  },
  "missing-address": {
    label: "Missing Address",
    title: "Missing Address",
    desc: "Address parameter is required in the URL. Please check your email link.",
  },
};

export default function AcEmailConfirmationErrorStates({
  state = "invalid-link",
}) {
  const error = ERRORS[state] ? ERRORS[state] : ERRORS["invalid-link"];

  return (
    <div className="acemailconfirmationerrorstates">
      <img
        className="acemailconfirmationerrorstates__logo"
        src={asset("assets/dcl-logo.png")}
        alt="Logo"
      />

      <div className="acemailconfirmationerrorstates__card">
        <h2 className="acemailconfirmationerrorstates__title">{error.title}</h2>
        <p className="acemailconfirmationerrorstates__desc">{error.desc}</p>
      </div>
    </div>
  );
}
