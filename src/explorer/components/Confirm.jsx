import ConfirmDialog from "./ConfirmDialog.jsx";
import Communities from "../pages/Communities.jsx";
import "./confirm.css";

export default function Confirm({ backdrop = true }) {
  return (
    <div className={"confirm-screen" + (backdrop ? "" : " confirm-screen--bare")} aria-hidden={false}>
      {backdrop && (
        <div className="confirm-screen__backdrop" aria-hidden="true">
          <Communities />
        </div>
      )}
      <ConfirmDialog
        variant="gradient"
        gradient="purple"
        title="Are you sure?"
        confirmLabel="Confirm"
        cancelLabel="Cancel"
        confirmTone="primary"
      />
    </div>
  );
}
