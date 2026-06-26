import { useState } from "react";
import CreatorHubChrome from "../frames/CreatorHubChrome.jsx";
import "./chsnackbarpersistentnotificationsystem.css";

const SuccessIcon = () => (
  <svg viewBox="0 0 24 24" width="22" height="22" aria-hidden="true">
    <path
      fill="currentColor"
      d="M12 2a10 10 0 1 0 0 20 10 10 0 0 0 0-20Zm0 18a8 8 0 1 1 0-16 8 8 0 0 1 0 16Zm4.6-11.4L10 15.2 7.4 12.6 6 14l4 4 8-8-1.4-1.4Z"
    />
  </svg>
);
const ErrorIcon = () => (
  <svg viewBox="0 0 24 24" width="22" height="22" aria-hidden="true">
    <path
      fill="currentColor"
      d="M11 15h2v2h-2v-2Zm0-8h2v6h-2V7Zm.99-5C6.47 2 2 6.48 2 12s4.47 10 9.99 10C17.52 22 22 17.52 22 12S17.52 2 11.99 2ZM12 20a8 8 0 1 1 0-16 8 8 0 0 1 0 16Z"
    />
  </svg>
);
const InfoIcon = () => (
  <svg viewBox="0 0 24 24" width="22" height="22" aria-hidden="true">
    <path
      fill="currentColor"
      d="M11 7h2v2h-2V7Zm0 4h2v6h-2v-6Zm1-9C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2Zm0 18a8 8 0 1 1 0-16 8 8 0 0 1 0 16Z"
    />
  </svg>
);
const WarningIcon = () => (
  <svg viewBox="0 0 24 24" width="22" height="22" aria-hidden="true">
    <path fill="currentColor" d="M1 21h22L12 2 1 21Zm12-3h-2v-2h2v2Zm0-4h-2v-4h2v4Z" />
  </svg>
);
const BellIcon = () => (
  <svg viewBox="0 0 24 24" width="22" height="22" aria-hidden="true">
    <path
      fill="currentColor"
      d="M12 23a2 2 0 0 0 2-2h-4a2 2 0 0 0 2 2Zm6-6v-5c0-3.07-1.63-5.64-4.5-6.32V5a1.5 1.5 0 0 0-3 0v.68C7.64 6.36 6 8.92 6 12v5l-2 2v1h16v-1l-2-2Zm-5-4h-2V8h2v5Zm0 3h-2v-2h2v2Z"
    />
  </svg>
);
const CloseIcon = () => (
  <svg viewBox="0 0 24 24" width="18" height="18" aria-hidden="true">
    <path
      fill="currentColor"
      d="M19 6.41 17.59 5 12 10.59 6.41 5 5 6.41 10.59 12 5 17.59 6.41 19 12 13.41 17.59 19 19 17.59 13.41 12 19 6.41Z"
    />
  </svg>
);

const Loader = () => (
  <span className="chsnk__loader" aria-hidden="true">
    <svg viewBox="22 22 44 44" width="20" height="20">
      <circle className="chsnk__loaderpath" cx="44" cy="44" r="20.2" fill="none" strokeWidth="3.6" />
    </svg>
  </span>
);

const SEV_ICON = {
  success: <SuccessIcon />,
  error: <ErrorIcon />,
  info: <InfoIcon />,
  warning: <WarningIcon />,
};

function Alert({ severity, icon, title, message, description, action, alignCenter }) {
  const glyph = icon !== undefined ? icon : SEV_ICON[severity];
  return (
    <div
      className={
        "chsnk__alert" +
        (severity ? " chsnk__alert--" + severity : "") +
        (alignCenter ? " chsnk__alert--center" : "")
      }
      role="alert"
    >
      {glyph != null && <div className="chsnk__icon">{glyph}</div>}
      <div className="chsnk__message">
        {title ? (
          <>
            <div className="chsnk__title">{title}</div>
            {description != null && <pre className="chsnk__desc">{description}</pre>}
          </>
        ) : (
          message
        )}
      </div>
      {action && <div className="chsnk__action">{action}</div>}
    </div>
  );
}

function TextButton({ children, onClick }) {
  return (
    <button type="button" className="chsnk__btn" onClick={onClick}>
      {children}
    </button>
  );
}

function CloseButton({ onClick }) {
  return (
    <button type="button" className="chsnk__iconbtn" aria-label="Close" onClick={onClick}>
      <CloseIcon />
    </button>
  );
}

const STACKS = {
  default: [
    { key: "n-generic-loading", kind: "generic", severity: "loading", message: "Installing dependencies..." },
    {
      key: "n-deploy-pending",
      kind: "deploy",
      status: "pending",
      title: "My Awesome Scene publishing is in process...",
    },
    { key: "n-missing", kind: "missing-scenes", scenes: 2 },
    { key: "n-dependency", kind: "new-dependency-version" },
    {
      key: "n-generic-success",
      kind: "generic",
      severity: "success",
      message: "Scene dependencies were updated",
    },
  ],
  single: [
    { key: "n-url", kind: "generic", severity: "success", message: "URL copied to clipboard" },
  ],
  error: [
    {
      key: "n-err",
      kind: "generic",
      severity: "error",
      message: "Failed installing dependencies",
      description:
        "npm ERR! code ELIFECYCLE\nnpm ERR! errno 1\nnpm ERR! @dcl/sdk@7.5.6 build: `tsc -p tsconfig.json`\nnpm ERR! Exit status 1\nnpm ERR!\nnpm ERR! Failed at the @dcl/sdk@7.5.6 build script.",
    },
  ],
  deploy: [
    { key: "n-dep-pending", kind: "deploy", status: "pending", title: "My Awesome Scene publishing is in process..." },
    { key: "n-dep-success", kind: "deploy", status: "complete", title: "My Awesome Scene has been published successfully" },
    { key: "n-dep-failed", kind: "deploy", status: "failed", title: "My Awesome Scene publishing process failed" },
  ],
};

function renderNotification(n, onClose) {
  switch (n.kind) {
    case "generic": {
      if (n.severity === "loading") {
        return <Alert icon={<Loader />} alignCenter message={n.message} />;
      }
      if (n.description) {
        return (
          <Alert
            severity={n.severity}
            title={n.message}
            description={n.description}
            action={<CloseButton onClick={onClose} />}
          />
        );
      }
      return <Alert severity={n.severity} alignCenter message={n.message} />;
    }
    case "missing-scenes":
      return (
        <Alert
          severity="error"
          message={`${n.scenes} ${n.scenes === 1 ? "scene" : "scenes"} could not be loaded due to missing files`}
          action={
            <>
              <TextButton onClick={onClose}>View</TextButton>
              <TextButton onClick={onClose}>Discard all</TextButton>
            </>
          }
        />
      );
    case "new-dependency-version":
      return (
        <Alert
          severity="info"
          icon={<BellIcon />}
          alignCenter
          message="New dependencies version detected"
          action={
            <>
              <TextButton onClick={onClose}>Update</TextButton>
              <CloseButton onClick={onClose} />
            </>
          }
        />
      );
    case "deploy": {
      if (n.status === "pending") {
        return (
          <Alert
            icon={<Loader />}
            alignCenter
            message={n.title}
            action={
              <>
                <TextButton onClick={onClose}>View</TextButton>
                <CloseButton onClick={onClose} />
              </>
            }
          />
        );
      }
      if (n.status === "complete") {
        return (
          <Alert
            severity="success"
            alignCenter
            message={n.title}
            action={
              <>
                <TextButton onClick={onClose}>View</TextButton>
                <CloseButton onClick={onClose} />
              </>
            }
          />
        );
      }
      return (
        <Alert
          severity="error"
          alignCenter
          message={n.title}
          action={
            <>
              <TextButton onClick={onClose}>Retry</TextButton>
              <CloseButton onClick={onClose} />
            </>
          }
        />
      );
    }
    default:
      return null;
  }
}

export default function ChSnackbarPersistentNotificationSystem({
  state = "default",
  installing = false,
}) {
  const initial = STACKS[state] || STACKS.default;
  const [notifications, setNotifications] = useState(initial);

  const close = (key) => () => setNotifications((list) => list.filter((n) => n.key !== key));

  const count = notifications.length;

  return (
    <CreatorHubChrome active="scenes">
      <div className="chsnk__stage">
        <div className="chsnk__stagehint">Scene editor</div>
      </div>

      {installing && <div className="chsnk__backdrop" />}

      <div className="chsnk__stack" role="region" aria-label="Notifications">
        {notifications.map((n, idx) => (
          <div
            key={n.key}
            className="chsnk__toast"
            style={{ bottom: `${(count - idx) * 60}px` }}
          >
            <div className="chsnk__paper">{renderNotification(n, close(n.key))}</div>
          </div>
        ))}
      </div>
    </CreatorHubChrome>
  );
}
