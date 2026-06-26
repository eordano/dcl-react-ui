import { useMemo, useRef, useState } from "react";
import SitesChrome from "../frames/SitesChrome.jsx";
import { asset } from "../../asset.js";
import "./streport.css";
import { Caret } from "../../atoms/icons.jsx";

const ReportReason = {
  SCAM_PHISHING: "scam_phishing",
  ILLEGAL_CONTENT: "illegal_content",
  HARASSMENT: "harassment",
  CHEATING: "cheating",
  IMPERSONATION: "impersonation",
};

const REASON_OPTIONS = [
  { value: ReportReason.SCAM_PHISHING, label: "Scam/Phishing" },
  { value: ReportReason.ILLEGAL_CONTENT, label: "Illegal Content" },
  { value: ReportReason.HARASSMENT, label: "Harassment" },
  { value: ReportReason.CHEATING, label: "Cheating" },
  { value: ReportReason.IMPERSONATION, label: "Impersonation" },
];

const DESCRIPTION_MAX = 500;
const COMMENTS_MAX = 500;
const MAX_FILES = 5;

const isEthAddress = (v) => /^0x[a-fA-F0-9]{40}$/.test((v || "").trim());

function FormLogoMark() {
  return (
    <img className="streport__logo" src={asset("assets/dcl-logo.png")} alt="Decentraland" width="64" height="64" />
  );
}

function NumberBullet({ number }) {
  return <span className="streport__bullet">{number}</span>;
}

function FormField({ number, label, optional, required, helper, error, children }) {
  return (
    <div className="streport__field">
      <div className="streport__label">
        <NumberBullet number={number} />
        {label}
        {optional && <span className="streport__optional">(Optional)</span>}
        {required && <span className="streport__required">*</span>}
      </div>
      <div className="streport__helper">{helper}</div>
      {children}
      {error && <div className="streport__fielderror">{error}</div>}
    </div>
  );
}

function FileUpload({ files, onFilesChange }) {
  const inputRef = useRef(null);

  function handleSelect(e) {
    const selected = Array.from(e.target.files || []);
    const remaining = MAX_FILES - files.length;
    const next = selected.slice(0, remaining).map((file, i) => ({
      id: `${Date.now()}-${i}`,
      name: file.name,
      size: file.size,
    }));
    if (next.length > 0) onFilesChange([...files, ...next]);
    if (inputRef.current) inputRef.current.value = "";
  }

  function remove(id) {
    onFilesChange(files.filter((f) => f.id !== id));
  }

  return (
    <div className="streport__fileupload">
      <input
        ref={inputRef}
        type="file"
        multiple
        className="streport__fileinput"
        accept="image/png,image/jpeg,image/gif,image/webp,video/mp4,video/webm,application/pdf"
        onChange={handleSelect}
      />
      {files.length > 0 && (
        <div className="streport__chips">
          {files.map((file) => (
            <span key={file.id} className="streport__chip">
              {file.name}
              <button
                type="button"
                className="streport__chipx"
                aria-label={`Remove ${file.name}`}
                onClick={() => remove(file.id)}
              >
                ✕
              </button>
            </span>
          ))}
        </div>
      )}
      <button
        type="button"
        className="streport__addfile"
        onClick={() => inputRef.current?.click()}
        disabled={files.length >= MAX_FILES}
      >
        Add File
      </button>
    </div>
  );
}

function ReportSuccess() {
  return (
    <div className="streport streport--success">
      <div className="streport__bg" aria-hidden="true" />
      <div className="streport__content">
        <div className="streport__card streport__card--success">
          <div className="streport__logowrap">
            <FormLogoMark />
            <h1 className="streport__title">Report Submitted</h1>
          </div>
          <div className="streport__successtext">
            <p className="streport__successbody">Your report has been received and will be reviewed shortly.</p>
            <p className="streport__successdismiss">You can close this window now.</p>
          </div>
        </div>
      </div>
    </div>
  );
}

function ReportForm({
  walletAddress = "",
  reportedAddress = "",
  hasValidIdentity = true,
  walletMismatch = false,
  submitError = false,
  isSubmitting = false,
}) {
  const [formState, setFormState] = useState({
    playerAddress: walletAddress,
    reportedAddress: reportedAddress,
    reason: "",
    description: "",
    evidence: [],
    additionalComments: "",
    confirmAccuracy: false,
  });
  const [submitted, setSubmitted] = useState(false);
  const [reasonOpen, setReasonOpen] = useState(false);

  const set = (field, value) => setFormState((prev) => ({ ...prev, [field]: value }));

  const errors = useMemo(
    () => ({
      playerAddress: !isEthAddress(formState.playerAddress) ? "Please enter a valid wallet address" : "",
      reportedAddress: !isEthAddress(formState.reportedAddress) ? "Please enter a valid wallet address" : "",
      reason: !formState.reason ? "Please choose a reason" : "",
      description: !formState.description.trim() ? "Please include a description of your report" : "",
      evidence: formState.evidence.length === 0 ? "Please upload the evidence of your issue" : "",
      confirmAccuracy: !formState.confirmAccuracy ? "You must confirm this information is accurate" : "",
    }),
    [formState]
  );

  const hasErrors = Object.values(errors).some((v) => v !== "");

  function handleSubmit() {
    setSubmitted(true);
    if (hasErrors || walletMismatch) return;
  }

  const selectedReason = REASON_OPTIONS.find((o) => o.value === formState.reason);

  return (
    <div className="streport">
      <div className="streport__bg" aria-hidden="true" />
      <div className="streport__content">
        <div className="streport__card">
          <div className="streport__logowrap">
            <FormLogoMark />
            <h1 className="streport__title">Report User</h1>
          </div>

          {walletMismatch && (
            <div className="streport__mismatch">
              The connected wallet does not match the player address. Please connect with the correct wallet to submit this
              report.
            </div>
          )}

          <FormField
            number={1}
            label="Your Wallet Address"
            required
            helper="Reports are tied to your wallet to prevent abuse. Your identity will not be publicly shared."
            error={submitted ? errors.playerAddress : undefined}
          >
            <input
              className="streport__input"
              placeholder="Write or paste your address here..."
              value={formState.playerAddress}
              disabled
              readOnly
            />
          </FormField>

          {!hasValidIdentity && (
            <div className="streport__signin">
              <span>Please sign in with your wallet to submit a report.</span>
              <button type="button" className="streport__signinbtn">
                Sign In
              </button>
            </div>
          )}

          <FormField
            number={2}
            label="Reported User Wallet"
            required
            helper="This is the wallet address of the user you are reporting."
            error={submitted ? errors.reportedAddress : undefined}
          >
            <input
              className="streport__input"
              placeholder="Write or paste an address here..."
              value={formState.reportedAddress}
              onChange={(e) => set("reportedAddress", e.target.value)}
              disabled={!!reportedAddress}
            />
          </FormField>

          <FormField
            number={3}
            label="Reason for Report"
            required
            helper="Select the option that best describes the issue."
            error={submitted ? errors.reason : undefined}
          >
            <div className="streport__selectwrap">
              <button
                type="button"
                className={
                  "streport__select" +
                  (submitted && errors.reason ? " is-error" : "") +
                  (reasonOpen ? " is-open" : "")
                }
                onClick={() => setReasonOpen((v) => !v)}
                aria-haspopup="listbox"
                aria-expanded={reasonOpen}
              >
                <span className={selectedReason ? "" : "streport__selectplaceholder"}>
                  {selectedReason ? selectedReason.label : "Choose a reason"}
                </span>
                <Caret size={18} strokeWidth={1.6} />
              </button>
              {reasonOpen && (
                <ul className="streport__menu" role="listbox">
                  {REASON_OPTIONS.map((opt) => (
                    <li
                      key={opt.value}
                      role="option"
                      aria-selected={formState.reason === opt.value}
                      className={"streport__option" + (formState.reason === opt.value ? " is-selected" : "")}
                      onClick={() => {
                        set("reason", opt.value);
                        setReasonOpen(false);
                      }}
                    >
                      {opt.label}
                    </li>
                  ))}
                </ul>
              )}
            </div>
          </FormField>

          <FormField
            number={4}
            label="Description"
            required
            helper="Describe what happened. Include when and where the incident occurred if possible."
            error={submitted ? errors.description : undefined}
          >
            <div className="streport__inputgroup">
              <textarea
                className="streport__textarea"
                rows={4}
                placeholder="Write your description here..."
                value={formState.description}
                onChange={(e) => set("description", e.target.value.slice(0, DESCRIPTION_MAX))}
              />
              <div className="streport__counter">{`${formState.description.length} / ${DESCRIPTION_MAX}`}</div>
              <div className="streport__hint">
                The more detail you provide, the easier it is for moderators to review your report.
              </div>
            </div>
          </FormField>

          <FormField
            number={5}
            label="Evidence"
            required
            helper="Upload up to 5 screenshots, videos, or links to support your report."
            error={submitted ? errors.evidence : undefined}
          >
            <FileUpload files={formState.evidence} onFilesChange={(files) => set("evidence", files)} />
          </FormField>

          <FormField
            number={6}
            label="Additional Comments"
            optional
            helper="Provide any extra information that might help moderators investigate."
          >
            <div className="streport__inputgroup">
              <textarea
                className="streport__textarea"
                rows={3}
                placeholder="Write your comments here..."
                value={formState.additionalComments}
                onChange={(e) => set("additionalComments", e.target.value.slice(0, COMMENTS_MAX))}
              />
              <div className="streport__counter">{`${formState.additionalComments.length} / ${COMMENTS_MAX}`}</div>
            </div>
          </FormField>

          <div className="streport__field">
            <label className="streport__confirm">
              <input
                type="checkbox"
                className="streport__checkboxinput"
                checked={formState.confirmAccuracy}
                onChange={(e) => set("confirmAccuracy", e.target.checked)}
              />
              <span
                className={
                  "streport__checkbox" +
                  (formState.confirmAccuracy ? " is-checked" : "") +
                  (submitted && errors.confirmAccuracy ? " is-error" : "")
                }
              >
                {formState.confirmAccuracy && (
                  <svg viewBox="0 0 16 16" width="12" height="12" aria-hidden="true">
                    <path
                      d="M3 8.5l3 3 7-7"
                      fill="none"
                      stroke="#fff"
                      strokeWidth="2.2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                )}
              </span>
              <span className="streport__confirmlabel">I confirm this report is accurate.</span>
            </label>
            {submitted && errors.confirmAccuracy && (
              <div className="streport__fielderror">{errors.confirmAccuracy}</div>
            )}
          </div>

          {submitError && <div className="streport__submiterror">We couldn't submit your report. Please try again.</div>}

          <button
            type="button"
            className="streport__submit"
            onClick={handleSubmit}
            disabled={walletMismatch || !hasValidIdentity || !formState.confirmAccuracy || isSubmitting}
          >
            {isSubmitting ? "Submitting..." : "Submit Report"}
          </button>
        </div>

        <p className="streport__footer">
          Need help instead?
          <br />
          For urgent issues or security concerns, please{" "}
          <a className="streport__footerlink" href="https://decentraland.org/help" target="_blank" rel="noopener noreferrer">
            contact the Support team
          </a>
          .
        </p>
      </div>
    </div>
  );
}

export default function StReport({ view = "form", ...props }) {
  return <SitesChrome active="legal" overlayNav>{view === "success" ? <ReportSuccess /> : <ReportForm {...props} />}</SitesChrome>;
}

export { ReportForm, ReportSuccess, ReportReason };
