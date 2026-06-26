import { useState } from "react";
import TabbedSectionLayout from "./TabbedSectionLayout.jsx";

export default {
  title: "Components/TabbedSectionLayout",
  component: TabbedSectionLayout,
  parameters: { layout: "fullscreen" },
};

const SettingsIcon = () => (
  <svg viewBox="0 0 24 24" width="24" height="24" aria-hidden="true">
    <path
      fill="currentColor"
      d="M19.14 12.94c.04-.3.06-.61.06-.94 0-.32-.02-.64-.07-.94l2.03-1.58c.18-.14.23-.41.12-.61l-1.92-3.32c-.12-.22-.37-.29-.59-.22l-2.39.96c-.5-.38-1.03-.7-1.62-.94l-.36-2.54c-.04-.24-.24-.41-.48-.41h-3.84c-.24 0-.43.17-.47.41l-.36 2.54c-.59.24-1.13.57-1.62.94l-2.39-.96c-.22-.08-.47 0-.59.22L2.74 8.87c-.12.21-.08.47.12.61l2.03 1.58c-.05.3-.09.63-.09.94s.02.64.07.94l-2.03 1.58c-.18.14-.23.41-.12.61l1.92 3.32c.12.22.37.29.59.22l2.39-.96c.5.38 1.03.7 1.62.94l.36 2.54c.05.24.24.41.48.41h3.84c.24 0 .44-.17.47-.41l.36-2.54c.59-.24 1.13-.56 1.62-.94l2.39.96c.22.08.47 0 .59-.22l1.92-3.32c.12-.22.07-.47-.12-.61l-2.01-1.58zM12 15.6c-1.98 0-3.6-1.62-3.6-3.6s1.62-3.6 3.6-3.6 3.6 1.62 3.6 3.6-1.62 3.6-3.6 3.6z"
    />
  </svg>
);
const LockIcon = () => (
  <svg viewBox="0 0 24 24" width="22" height="22" aria-hidden="true">
    <path
      fill="currentColor"
      d="M18 8h-1V6c0-2.76-2.24-5-5-5S7 3.24 7 6v2H6c-1.1 0-2 .9-2 2v10c0 1.1.9 2 2 2h12c1.1 0 2-.9 2-2V10c0-1.1-.9-2-2-2zM9 6c0-1.66 1.34-3 3-3s3 1.34 3 3v2H9V6zm3 11c-1.1 0-2-.9-2-2s.9-2 2-2 2 .9 2 2-.9 2-2 2z"
    />
  </svg>
);

const FieldStub = ({ label }) => (
  <div style={{ display: "flex", flexDirection: "column", gap: 8, paddingBottom: 24 }}>
    <span style={{ color: "#fff", fontSize: 14 }}>{label}</span>
    <span style={{ height: 40, borderRadius: 6, border: "1px solid rgba(255,255,255,.23)" }} />
  </div>
);

const Spinner = () => (
  <span
    style={{
      width: 40,
      height: 40,
      borderRadius: "50%",
      border: "3px solid rgba(255,255,255,.2)",
      borderTopColor: "#ff2d55",
      display: "inline-block",
      animation: "tsl-demo-spin .9s linear infinite",
    }}
  />
);

const WS_TABS = [
  { id: "details", label: "Details", panel: <><FieldStub label="World Title" /><FieldStub label="Description" /></> },
  { id: "layout", label: "Layout", panel: <FieldStub label="World Layout" /> },
  { id: "general", label: "Misc.", panel: <FieldStub label="World Skybox" /> },
];

export const WorldSettings = () => {
  const [active, setActive] = useState("details");
  return (
    <TabbedSectionLayout
      icon={<SettingsIcon />}
      title="World Settings - mystore.dcl.eth"
      onClose={() => {}}
      tabs={WS_TABS}
      active={active}
      onTabChange={setActive}
      width="wide"
    />
  );
};

export const WorldPermissions = () => {
  const [active, setActive] = useState("access");
  const tabs = [
    { value: "access", label: "Access", panel: <FieldStub label="Manage who can access your World" /> },
    { value: "collaborators", label: "Collaborators", panel: <FieldStub label="Collaborators" /> },
  ];
  return (
    <TabbedSectionLayout
      icon={<LockIcon />}
      title="Permissions - myworld.dcl.eth"
      titleAs="span"
      onClose={() => {}}
      tabs={tabs}
      active={active}
      onTabChange={setActive}
      width="wide"
      radius="sm"
      tabAlign="top"
      firstChildPad
    />
  );
};

export const AppSettings = () => {
  const [active, setActive] = useState("scenes");
  const tabs = [
    { value: "scenes", label: "Scenes", panel: <FieldStub label="Scenes Folder" /> },
    { value: "editor", label: "Editor", panel: <FieldStub label="Code editor of choice" /> },
    { value: "about", label: "About", panel: <FieldStub label="Decentraland Creator Hub" /> },
  ];
  return (
    <TabbedSectionLayout
      icon={<SettingsIcon />}
      title="App Preferences"
      iconWrap
      onClose={() => {}}
      tabs={tabs}
      active={active}
      onTabChange={setActive}
      radius="sm"
      tabAlign="top"
      tint
      firstChildPad
    />
  );
};

export const NoRail = () => (
  <TabbedSectionLayout
    icon={<SettingsIcon />}
    title="World Settings - mystore.dcl.eth"
    onClose={() => {}}
    tabs={[]}
    width="collab"
  >
    <FieldStub label="Layout" />
  </TabbedSectionLayout>
);

export const WithActions = () => {
  const [active, setActive] = useState("details");
  return (
    <TabbedSectionLayout
      icon={<SettingsIcon />}
      title="App Preferences"
      onClose={() => {}}
      tabs={WS_TABS.map(({ panel, ...t }) => t)}
      active={active}
      onTabChange={setActive}
      actions={
        <>
          <span style={{ color: "#ffffffb2", marginRight: "auto" }}>You have unsaved changes.</span>
          <button style={{ padding: "5px 20px", borderRadius: 6, border: "none", background: "transparent", color: "#ffffffb2", cursor: "pointer" }}>
            Discard
          </button>
          <button style={{ padding: "5px 20px", borderRadius: 6, border: "none", background: "#ff2d55", color: "#fff", cursor: "pointer" }}>
            Save changes
          </button>
        </>
      }
    >
      <FieldStub label="Scenes Folder" />
    </TabbedSectionLayout>
  );
};

export const Loading = () => (
  <>
    <style>{"@keyframes tsl-demo-spin{to{transform:rotate(360deg)}}"}</style>
    <TabbedSectionLayout
      icon={<SettingsIcon />}
      title="World Settings - mystore.dcl.eth"
      onClose={() => {}}
      tabs={WS_TABS}
      active="details"
      loading
      loader={<Spinner />}
    />
  </>
);
