import { useState } from "react";
import "./privateworlds.css";

function ShieldIcon() {
  return (
    <svg viewBox="0 0 48 48" width="64" height="64" aria-hidden="true">
      <defs>
        <linearGradient id="pvwShield" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stopColor="#9fe2ff" />
          <stop offset="1" stopColor="#358fe0" />
        </linearGradient>
      </defs>
      <path
        d="M24 3l16 6v11c0 10.5-6.8 19.3-16 22-9.2-2.7-16-11.5-16-22V9l16-6z"
        fill="url(#pvwShield)" stroke="#fff" strokeWidth="2.5" strokeLinejoin="round"
      />
      <circle cx="24" cy="20" r="4.4" fill="#0f2f50" />
      <rect x="22.4" y="22" width="3.2" height="8.5" rx="1.6" fill="#0f2f50" />
    </svg>
  );
}

export default function PrivateWorlds() {
  const [mode, setMode] = useState("password");
  const [pvw, setPw] = useState("");
  const invitation = mode === "invitation";

  return (
    <div className="pvw" role="dialog" aria-modal="true">
      <div className="pvw__icon"><ShieldIcon /></div>

      {invitation ? (
        <>
          <h2 className="pvw__title">This place is Invitation Only</h2>
          <p className="pvw__status">Only invited users can join</p>
          <div className="pvw__actions pvw__actions--single">
            <button className="pvw__ok" onClick={() => setMode("password")}>OK</button>
          </div>
        </>
      ) : (
        <>
          <h2 className="pvw__title">This place is password protected</h2>
          <div className="pvw__field">
            <input
              className="pvw__input" type="password" placeholder="Enter Password"
              value={pvw} onChange={(e) => setPw(e.target.value)}
            />
          </div>
          <div className="pvw__actions">
            <button className="pvw__cancel">CANCEL</button>
            <button className="pvw__confirm" data-sb-linkto="Explorer/Workflows/SceneLoading">CONFIRM</button>
          </div>
        </>
      )}
    </div>
  );
}
