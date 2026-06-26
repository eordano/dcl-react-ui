import OpenDclTerminal from "../frames/OpenDclTerminal.jsx";
import { SelectRow } from "./OdSlashCommands.jsx";

export const TASKS = [
  { name: "DCL Preview Server", info: "http://localhost:8000" },
];

function TasksMenu({ selected = 0 }) {
  const rows = [
    ...TASKS.map((t) => (t.info ? `${t.name} — ${t.info}` : t.name)),
    "Close menu",
  ];
  return (
    <OpenDclTerminal status={<><span className="od-accent">▶ dcl preview server</span>{"    claude-sonnet-4"}</>}>
      <div className="od-box">
        <div className="od-box__title">Background tasks</div>
        <div className="od-box__list">
          {rows.map((label, i) => (
            <SelectRow key={label} active={i === selected} marker="›" label={label} />
          ))}
        </div>
      </div>
    </OpenDclTerminal>
  );
}

function StopConfirmView({ selected = 0 }) {
  const rows = ["Stop it", "Back"];
  return (
    <OpenDclTerminal status={<><span className="od-accent">▶ dcl preview server</span>{"    claude-sonnet-4"}</>}>
      <div className="od-box">
        <div className="od-box__title">DCL Preview Server</div>
        <div className="od-box__list">
          {rows.map((label, i) => (
            <SelectRow key={label} active={i === selected} marker="›" label={label} />
          ))}
        </div>
      </div>
    </OpenDclTerminal>
  );
}

export default function OdTasks() {
  return <TasksMenu />;
}

export { TasksMenu, StopConfirmView };
