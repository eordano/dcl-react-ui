import Button from "../../atoms/Button.jsx";
import "./rewardpanel.css";

function InfoIcon() {
  return (
    <svg viewBox="0 0 24 24" width="16" height="16" fill="none" stroke="currentColor"
      strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <circle cx="12" cy="12" r="9" /><path d="M12 11v5M12 7.5h.01" />
    </svg>
  );
}

export default function RewardPanel() {
  return (
    <div className="rw__scrim">
      <div className="rw__rays" aria-hidden="true" />
      <div className="rw" role="dialog" aria-modal="true">
        <div className="rw__header">quest reward</div>
        <h1 className="rw__title">New Item Unlocked!</h1>

        <div className="rw__stage">
          <div className="rw__rarity" aria-hidden="true">
            <div className="rw__thumb">
              <span className="rw__eyes" />
            </div>
          </div>
        </div>

        <div className="rw__name">Test Reward Wearable</div>

        <div className="rw__toast">
          <span className="rw__toasticon"><InfoIcon /></span>
          <span>Processing may take a few minutes, but you'll be notified as soon as it's in your Backpack!</span>
        </div>

        <Button variant="primary" size="lg" className="rw__collect">collect</Button>
      </div>
    </div>
  );
}
