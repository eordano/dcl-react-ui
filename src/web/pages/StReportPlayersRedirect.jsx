import SitesChrome from "../frames/SitesChrome.jsx";
import Spinner from "../../atoms/Spinner.jsx";
import "./streportplayersredirect.css";

function NumberBullet({ n }) {
  return <span className="rpr__bullet">{n}</span>;
}

function FormField({ n, label, required, optional, helper, children }) {
  return (
    <div className="rpr__field">
      <div className="rpr__flabel">
        <NumberBullet n={n} />
        <span>{label}</span>
        {optional && <span className="rpr__optional">(Optional)</span>}
        {required && <span className="rpr__required">*</span>}
      </div>
      <p className="rpr__fhelper">{helper}</p>
      {children}
    </div>
  );
}

const REASONS = ["Scam/Phishing", "Illegal Content", "Harassment", "Cheating", "Impersonation"];

// Sample data mirrored from sites/app/fixtures/landings-report-abuse.json so the
// signed-in form looks like a real in-progress report.
const PREFILL = {
  reporterAddress: "0x1a2b3c4d5e6f7a8b9c0d1e2f3a4b5c6d7e8f9a0b",
  reportedAddress: "0x6d7e3b6e5e3c3f3d4f5a6b7c8d9e0f1a2b3c4d5e",
  reason: "Harassment",
  description: "Repeatedly followed my avatar to spam abusive messages in chat at Genesis Plaza.",
  additional: "Happened around 14:30 UTC near the central fountain.",
};

function CardHeader() {
  return (
    <div className="rpr__logowrap">
      <span className="rpr__logo" aria-hidden="true">
        <svg viewBox="0 0 24 24" width="34" height="34">
          <path d="M12 2 3 12l9 10 9-10L12 2Z" fill="#fff" />
        </svg>
      </span>
      <h1 className="rpr__title">Report User</h1>
    </div>
  );
}

function Footer() {
  return (
    <p className="rpr__footer">
      Need help instead?
      <br />
      For urgent issues or security concerns, please{" "}
      <a className="rpr__footlink" href="https://decentraland.org/help" target="_blank" rel="noopener noreferrer">
        contact the Support team
      </a>
      .
    </p>
  );
}

function Caret() {
  return (
    <svg className="rpr__caret" viewBox="0 0 16 16" width="18" height="18" aria-hidden="true">
      <path d="M4 6l4 4 4-4" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" fill="none" />
    </svg>
  );
}

// Logged-out: the user is redirected to /report but has no wallet connected, so
// the form is gated behind a single clean Sign In button.
function ReportFormGate() {
  return (
    <div className="rpr__bg">
      <div className="rpr__content">
        <div className="rpr__card rpr__card--gate">
          <CardHeader />
          <p className="rpr__gate-text">
            Sign in with your wallet to report a player. Reports are tied to your
            wallet to prevent abuse — your identity will not be publicly shared.
          </p>
          <button type="button" className="rpr__signin-btn">
            Sign In
          </button>
        </div>
        <Footer />
      </div>
    </div>
  );
}

// Logged-in: the full report form, pre-filled so it reads like a real
// in-progress report ready to submit.
function ReportFormFilled() {
  const p = PREFILL;
  return (
    <div className="rpr__bg">
      <div className="rpr__content">
        <div className="rpr__card">
          <CardHeader />

          <FormField
            n={1}
            label="Your Wallet Address"
            required
            helper="Reports are tied to your wallet to prevent abuse. Your identity will not be publicly shared."
          >
            <input className="rpr__input" type="text" value={p.reporterAddress} readOnly />
          </FormField>

          <FormField
            n={2}
            label="Reported User Wallet"
            required
            helper="This is the wallet address of the user you are reporting."
          >
            <input className="rpr__input" type="text" value={p.reportedAddress} readOnly />
          </FormField>

          <FormField
            n={3}
            label="Reason for Report"
            required
            helper="Select the option that best describes the issue."
          >
            <div className="rpr__select" role="button" tabIndex={0}>
              <span className="rpr__select-value">{p.reason}</span>
              <Caret />
            </div>
            <div className="rpr__select-hidden">
              {REASONS.map((r) => (
                <span key={r}>{r}</span>
              ))}
            </div>
          </FormField>

          <FormField
            n={4}
            label="Description"
            required
            helper="Describe what happened. Include when and where the incident occurred if possible."
          >
            <div className="rpr__inputgroup">
              <textarea className="rpr__textarea" rows={4} value={p.description} readOnly />
              <span className="rpr__counter">{p.description.length} / 500</span>
              <span className="rpr__hint">
                The more detail you provide, the easier it is for moderators to review your report.
              </span>
            </div>
          </FormField>

          <FormField
            n={5}
            label="Evidence"
            required
            helper="Upload up to 5 screenshots, videos, or links to support your report."
          >
            <button type="button" className="rpr__addfile">
              Add File
            </button>
          </FormField>

          <FormField
            n={6}
            label="Additional Comments"
            optional
            helper="Provide any extra information that might help moderators investigate."
          >
            <div className="rpr__inputgroup">
              <textarea className="rpr__textarea" rows={3} value={p.additional} readOnly />
              <span className="rpr__counter">{p.additional.length} / 500</span>
            </div>
          </FormField>

          <label className="rpr__confirm">
            <span className="rpr__checkbox is-checked" aria-hidden="true" />
            <span>I confirm this report is accurate.</span>
          </label>

          <button type="button" className="rpr__submit">
            Submit Report
          </button>
        </div>

        <Footer />
      </div>
    </div>
  );
}

// The /report/players redirect splash. While the redirect happens the user sees
// a loading title; a real <a href="/report"> fallback is revealed after 3s with
// pure CSS, so it still works with JavaScript disabled.
function RedirectSplash() {
  return (
    <div className="rpr__bg rpr__bg--center">
      <div className="rpr__redir">
        <Spinner size={40} />
        <p className="rpr__redir-label">Loading…</p>
        <a className="rpr__redir-continue" href="/report">
          Continue →
        </a>
      </div>
    </div>
  );
}

export default function StReportPlayersRedirect({ branch = "destination", signedIn = false }) {
  return (
    <SitesChrome>
      <div className="rpr">
        {branch === "redirect" ? (
          <RedirectSplash />
        ) : signedIn ? (
          <ReportFormFilled />
        ) : (
          <ReportFormGate />
        )}
      </div>
    </SitesChrome>
  );
}
