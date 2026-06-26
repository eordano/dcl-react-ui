import { useEffect, useMemo, useState } from "react";
import AccountChrome from "../frames/AccountChrome.jsx";
import Spinner from "../../atoms/Spinner.jsx";
import AccountSettingsRail from "../components/AccountSettingsRail.jsx";
import "./acemailcardstates.css";

const COPY = {
  pageTitle: "Email Notifications",
  pageDesc:
    "Don't miss any Decentraland notifications when you're AFK! Sign up to receive email notifications and pick & choose which ones you want to get below.",
  cardTitle: "Your Email Address",
  desc: {
    without_email:
      "Enter your email, then check your inbox for an email with the confirmation link. After confirming, you will be able to customize the notifications below.",
    pending_approval: "Confirmation email sent, check your inbox.",
    confirmed: "Your email has been confirmed.",
    with_email:
      "If you'd like to update your email address, edit it below. Make sure to check for the confirmation email in your inbox afterwards!",
  },
  placeholder: "example@decentraland.org",
  submit: "submit",
  resend: "resend",
  save: "save",
  pending_approval: "pending approval",
  confirmed: "confirmed",
  invalid_email: "Invalid email",
};

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

function CardSwitch({ checked, onChange }) {
  return (
    <button
      type="button"
      role="switch"
      aria-checked={checked}
      className={"acec__switch" + (checked ? " is-on" : "")}
      onClick={() => onChange(!checked)}
    >
      <span className="acec__switch-track" />
      <span className="acec__switch-thumb" />
    </button>
  );
}

function NotificationEmailCard({
  email: emailProp = "",
  unconfirmedEmail = "",
  hasConfirmEmail = false,
  isIgnoringAllEmail = false,
  isLoading = false,
  forceInvalid = false,
  onChangeEmail = () => {},
}) {
  const [isValidEmail, setIsValidEmail] = useState(!forceInvalid);
  const [email, setEmail] = useState(unconfirmedEmail || emailProp);
  const [ignoring, setIgnoring] = useState(isIgnoringAllEmail);

  useEffect(() => {
    if (unconfirmedEmail || emailProp) setEmail(unconfirmedEmail || emailProp);
  }, [emailProp, unconfirmedEmail]);

  const descriptionText = useMemo(() => {
    if (!emailProp && !unconfirmedEmail && !hasConfirmEmail) return COPY.desc.without_email;
    if (unconfirmedEmail) return COPY.desc.pending_approval;
    if (hasConfirmEmail) return COPY.desc.confirmed;
    return COPY.desc.with_email;
  }, [emailProp, unconfirmedEmail, hasConfirmEmail]);

  const buttonText = useMemo(() => {
    if (!emailProp && !unconfirmedEmail && !hasConfirmEmail) return COPY.submit;
    if (unconfirmedEmail && unconfirmedEmail === email) return COPY.resend;
    return COPY.save;
  }, [emailProp, unconfirmedEmail, hasConfirmEmail, email]);

  const handleSaveEmail = () => {
    if (EMAIL_RE.test(email)) {
      setIsValidEmail(true);
      onChangeEmail(email);
    } else {
      setIsValidEmail(false);
    }
  };

  const buttonDisabled = isLoading || (email === emailProp && !unconfirmedEmail) || email === "";
  const showBadge = hasConfirmEmail || unconfirmedEmail;
  const badgeConfirmed = hasConfirmEmail && !unconfirmedEmail;

  return (
    <div className="acec__card">
      <div className="acec__titlerow">
        <h2 className="acec__cardtitle">
          {COPY.cardTitle}
          {showBadge && (
            <span className={"acec__badge" + (badgeConfirmed ? " is-confirmed" : " is-pending")}>
              {badgeConfirmed ? COPY.confirmed : COPY.pending_approval}
            </span>
          )}
        </h2>
        {!!emailProp && <CardSwitch checked={!ignoring} onChange={(on) => setIgnoring(!on)} />}
      </div>

      <p className="acec__desc">{descriptionText}</p>

      <div className="acec__inputrow">
        <div className="acec__field">
          <input
            type="email"
            className={"acec__input" + (!isValidEmail ? " is-error" : "")}
            placeholder={COPY.placeholder}
            value={email}
            disabled={isLoading}
            onChange={(e) => {
              setEmail(e.target.value);
              if (!isValidEmail) setIsValidEmail(true);
            }}
          />
          {!isValidEmail && <span className="acec__helper">{COPY.invalid_email}</span>}
        </div>
        <button
          type="button"
          className="acec__button"
          disabled={buttonDisabled}
          onClick={handleSaveEmail}
        >
          {isLoading ? <Spinner size={20} color="#fff" /> : buttonText}
        </button>
      </div>
    </div>
  );
}

const STATES = [
  {
    key: "no_email",
    label: "No email (Submit)",
    props: { email: "", unconfirmedEmail: "", hasConfirmEmail: false },
  },
  {
    key: "pending",
    label: "Pending approval (Resend)",
    props: { email: "", unconfirmedEmail: "user@decentraland.org", hasConfirmEmail: false },
  },
  {
    key: "confirmed",
    label: "Confirmed",
    props: { email: "user@decentraland.org", unconfirmedEmail: "", hasConfirmEmail: true, isIgnoringAllEmail: false },
  },
  {
    key: "invalid",
    label: "Invalid email error",
    props: { email: "not-an-email", unconfirmedEmail: "", hasConfirmEmail: false, forceInvalid: true },
  },
];

export default function AcEmailCardStates({
  showAllStates = true,
  email = "",
  unconfirmedEmail = "",
  hasConfirmEmail = false,
  isIgnoringAllEmail = false,
  isLoading = false,
}) {
  const [tab, setTab] = useState("notifications");

  return (
    <AccountChrome>
      <div className="acec-page">
        <div className="acec-page__layout">
          <AccountSettingsRail active={tab} onTab={setTab} />

          <div className="acec-page__content">
            <div className="acec">
              <header className="acec__header">
                <h1 className="acec__pagetitle">{COPY.pageTitle}</h1>
                <p className="acec__pagedesc">{COPY.pageDesc}</p>
              </header>

              {showAllStates ? (
                <div className="acec__states">
                  {STATES.map((s) => (
                    <section className="acec__state" key={s.key}>
                      <span className="acec__statelabel">{s.label}</span>
                      <NotificationEmailCard {...s.props} />
                    </section>
                  ))}
                </div>
              ) : (
                <div className="acec__wrapper">
                  <NotificationEmailCard
                    email={email}
                    unconfirmedEmail={unconfirmedEmail}
                    hasConfirmEmail={hasConfirmEmail}
                    isIgnoringAllEmail={isIgnoringAllEmail}
                    isLoading={isLoading}
                  />
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </AccountChrome>
  );
}
