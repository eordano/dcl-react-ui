import GuardModal from "./GuardModal.jsx";

function AvatarMark({ size = 64 }) {
  return (
    <svg viewBox="0 0 64 64" width={size} height={size} aria-hidden="true">
      <defs>
        <linearGradient id="urg" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0" stopColor="#ff2d55" />
          <stop offset="1" stopColor="#ffb03a" />
        </linearGradient>
      </defs>
      <circle cx="32" cy="32" r="32" fill="url(#urg)" />
      <circle cx="32" cy="25" r="8" fill="#fff" />
      <path d="M18 50 C18 41 24.5 36 32 36 C39.5 36 46 41 46 50 Z" fill="#fff" />
    </svg>
  );
}

export default function UpdateRequired({ current = "v0.146.0-alpha-main", latest = "0.151.0-alpha" }) {
  return (
    <GuardModal
      width={540}
      icon={<AvatarMark size={64} />}
      title="Update Required"
      body={
        <>
          Your current Explorer version {current} is outdated (latest version is{" "}
          {latest}). Please update to the latest version to continue using it and
          access all new features and improvements.
        </>
      }
      actions={
        <>
          <button className="guard__btn guard__btn--primary">Update Now</button>
          <button className="guard__btn guard__btn--dark">Exit Application</button>
        </>
      }
    />
  );
}
