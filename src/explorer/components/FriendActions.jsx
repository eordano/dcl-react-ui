import { useState } from "react";
import ConfirmDialog from "./ConfirmDialog.jsx";
import "./friendactions.css";

const MODES = [
  { id: "unfriend", label: "Unfriend" },
  { id: "block", label: "Block" },
  { id: "unblock", label: "Unblock" },
  { id: "sent", label: "Request sent" },
];

const NAME = "kurd";

const DIALOGS = {
  unfriend: {
    title: `Are you sure you want to unfriend ${NAME}?`,
    confirmLabel: "UNFRIEND", danger: true,
  },
  block: {
    title: `Are you sure you want to block ${NAME}?`,
    body: "If you block someone in Decentraland, you will no longer see their avatar or messages, and they won't be able to see yours.",
    confirmLabel: "BLOCK", danger: true,
  },
  unblock: {
    title: `Are you sure you want to unblock ${NAME}?`,
    body: "If you unblock someone, you will see their avatar in-world, and you will be able to message each other again.",
    confirmLabel: "UNBLOCK", danger: false,
  },
};

const BADGES = ["#c98a4b", "#3aa0b8", "#3a3a3a", "#c98a4b", "#b8543a", "#5a3aa0", "#2a8a5a", "#a03a7a", "#c9b84b", "#b89a3a"];

function PassportBackdrop() {
  return (
    <div className="fa__passport" aria-hidden="true">
      <div className="fa__pp-avatar" />
      <div className="fa__pp-panel">
        <div className="fa__pp-header">
          <div className="fa__pp-name">kurd <span className="fa__pp-dot" /></div>
          <div className="fa__pp-addr">0x6e51…8b635</div>
          <div className="fa__pp-mutual">1 Mutual</div>
          <div className="fa__pp-actions">
            <span className="fa__pp-friend">FRIEND</span>
            <span className="fa__pp-ico" title="Message">
              <svg viewBox="0 0 16 16" width="15" height="15" fill="none" stroke="currentColor" strokeWidth="1.4"><path d="M2 3.5h12v8H6l-3 2.5v-2.5H2z" strokeLinejoin="round" /></svg>
            </span>
            <span className="fa__pp-ico" title="Call">
              <svg viewBox="0 0 16 16" width="15" height="15" fill="none" stroke="currentColor" strokeWidth="1.4"><path d="M3 2.5c0 5 5.5 10.5 10.5 10.5l-.5 1.5c-.5.5-1.5.5-2.5 0C7 13 3 9 1.5 5c-.5-1 0-2 .5-2.5z" strokeLinejoin="round" /></svg>
            </span>
            <span className="fa__pp-ico" title="More">
              <svg viewBox="0 0 16 16" width="15" height="15" fill="currentColor"><circle cx="3" cy="8" r="1.4" /><circle cx="8" cy="8" r="1.4" /><circle cx="13" cy="8" r="1.4" /></svg>
            </span>
            <span className="fa__pp-ico fa__pp-ico--close" title="Close">
              <svg viewBox="0 0 16 16" width="15" height="15" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round"><path d="M4 4l8 8M12 4l-8 8" /></svg>
            </span>
          </div>
        </div>
        <div className="fa__pp-tabs">
          <span className="is-active">OVERVIEW</span>
          <span>BADGES</span>
          <span>PHOTOS</span>
        </div>
        <div className="fa__pp-section">BADGES</div>
        <div className="fa__pp-badges">
          {BADGES.map((c, i) => <span key={i} style={{ background: c }} />)}
        </div>
        <div className="fa__pp-info">
          <div className="fa__pp-field">
            <span className="fa__pp-flabel">Relationship Status</span>
            <span className="fa__pp-fvalue">Single</span>
          </div>
          <div className="fa__pp-field">
            <span className="fa__pp-flabel">Employment Status</span>
            <span className="fa__pp-fvalue">Working</span>
          </div>
          <div className="fa__pp-field">
            <span className="fa__pp-flabel">Favorite Hobby</span>
            <span className="fa__pp-fvalue">games, movie, party</span>
          </div>
        </div>
        <div className="fa__pp-realname">
          <div className="fa__pp-section">REAL NAME</div>
          <div className="fa__pp-fvalue">mohammad</div>
        </div>
        <div className="fa__pp-links">
          <div className="fa__pp-section">LINKS</div>
          <div className="fa__pp-linkrow">
            <span className="fa__pp-link">x account</span>
            <span className="fa__pp-link">discord</span>
          </div>
        </div>
      </div>
    </div>
  );
}

export default function FriendActions() {
  const [mode, setMode] = useState("unfriend");

  const d = DIALOGS[mode];

  return (
    <div className="fa">
      <PassportBackdrop />

      <div className="fa__modes" data-dev>
        {MODES.map((m) => (
          <button
            key={m.id}
            className={"fa__modebtn" + (m.id === mode ? " is-active" : "")}
            onClick={() => setMode(m.id)}
          >{m.label}</button>
        ))}
      </div>

      {mode === "sent" ? (
        <div className="fa__scrim">
          <div className="fa__toast">
            <span className="fa__toastcheck" aria-hidden="true">
              <svg viewBox="0 0 16 16" width="13" height="13"><path d="M3 8.5l3 3 7-7" fill="none" stroke="#fff" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" /></svg>
            </span>
            Friend Request Sent To <span className="fa__toastuser">{NAME}</span>
          </div>
        </div>
      ) : (
        <div className="fa__dialog">
          <ConfirmDialog
            variant="gradient"
            gradient="purple"
            avatar={<span className="fa__cardavatar" />}
            title={d.title}
            body={d.body}
            cancelLabel="CANCEL"
            confirmLabel={d.confirmLabel}
            confirmTone={d.danger ? "primary" : undefined}
          />
        </div>
      )}
    </div>
  );
}
