import OpenDclTerminal from "../frames/OpenDclTerminal.jsx";
import { SelectRow } from "../pages/OdSlashCommands.jsx";

const CHOICES = ["Allow", "Always allow", "Deny"];

function Gate({ reason, detail, selected = 0 }) {
  return (
    <OpenDclTerminal status={<>claude-sonnet-4</>}>
      <div className="od-box">
        <div className="od-box__title">
          {reason}
          <span className="od-dim">{detail}</span>
        </div>
        <div className="od-box__list">
          {CHOICES.map((label, i) => (
            <SelectRow key={label} active={i === selected} marker="›" label={label} />
          ))}
        </div>
      </div>
    </OpenDclTerminal>
  );
}

export default function OdPermissionGate() {
  return <Gate reason="Potentially destructive command" detail="Command: rm -rf dist" />;
}

export function FileWriteGate() {
  return <Gate reason="Write outside working directory" detail="File: ../secrets.env" selected={2} />;
}
