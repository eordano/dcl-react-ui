import ContextMenu from "../../components/ContextMenu.jsx";

const MENU = [
  { kind: "caption", label: "Alice.dcl", avatar: true, hue: 300 },
  { kind: "button", label: "Member" },
  { kind: "button", label: "View Profile", to: "Explorer/Pages/Passport" },
  { kind: "button", label: "Chat", to: "Explorer/Frames/Chat" },
  { kind: "button", label: "Call", to: "Explorer/Components/VoiceChat" },
  { kind: "button", label: "Gift" },
  { kind: "button", label: "Jump to Location", to: "Explorer/Workflows/SceneLoading" },
  { kind: "separator" },
  { kind: "button", label: "Report", danger: true },
  { kind: "button", label: "Block", danger: true, to: "Explorer/Components/Confirm" },
];

export default {
  title: "Explorer/Components/ContextMenuDemo",
  component: ContextMenu,
  parameters: { layout: "centered" },
};

export const Default = {
  render: () => <ContextMenu items={MENU} />,
};
