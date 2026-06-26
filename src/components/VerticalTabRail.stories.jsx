import { useState } from "react";
import VerticalTabRail from "./VerticalTabRail.jsx";

export default {
  title: "Components/VerticalTabRail",
  component: VerticalTabRail,
  parameters: {
    layout: "centered",
    backgrounds: { default: "hub", values: [{ name: "hub", value: "#161518" }] },
  },
};

const Frame = ({ children }) => (
  <div style={{ background: "#242129", height: 320, display: "flex", borderRadius: 8, overflow: "hidden" }}>
    {children}
  </div>
);

const TABS = [
  { id: "details", label: "Details" },
  { id: "layout", label: "Layout" },
  { id: "general", label: "Misc." },
];

export const Default = () => {
  const [active, setActive] = useState("details");
  return (
    <Frame>
      <VerticalTabRail tabs={TABS} active={active} onChange={setActive} ariaLabel="World Settings" />
    </Frame>
  );
};

export const ValueKeyed = () => {
  const [active, setActive] = useState("access");
  return (
    <Frame>
      <VerticalTabRail
        tabs={[
          { value: "access", label: "Access" },
          { value: "collaborators", label: "Collaborators" },
        ]}
        active={active}
        onChange={setActive}
        ariaLabel="Permissions"
      />
    </Frame>
  );
};
