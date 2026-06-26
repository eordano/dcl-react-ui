import { useState } from "react";
import ViewToggleChip from "./ViewToggleChip.jsx";

export default {
  title: "Atoms/ViewToggleChip",
  component: ViewToggleChip,
  parameters: { layout: "centered" },
};

export const Default = { args: { view: "grid", active: true } };

export const Pair = () => {
  const [view, setView] = useState("grid");
  return (
    <div style={{ display: "inline-flex" }}>
      <ViewToggleChip view="grid" active={view === "grid"} onClick={() => setView("grid")} />
      <ViewToggleChip view="list" active={view === "list"} onClick={() => setView("list")} />
    </div>
  );
};
