import ChromeShell from "../../components/ChromeShell.jsx";
import DclTopBar from "../../web/frames/DclTopBar.jsx";
import "./builderchrome.css";

export const BUILDER_TABS = [
  { id: "overview", label: "Overview" },
  { id: "collections", label: "Collections" },
  { id: "scenes", label: "Scenes" },
  { id: "land", label: "Land" },
  { id: "names", label: "Names" },
  { id: "worlds", label: "Worlds" },
];

export default function BuilderChrome({
  active = "overview",
  onTab,
  children,
  signedIn = false,
  account = "0x9f3c…7a21",
}) {
  return (
    <ChromeShell
      className="bd"
      ariaLabel="Builder"
      topbar={<DclTopBar active="create" signedIn={signedIn} account={account} />}
      tabs={BUILDER_TABS}
      active={active}
      onTab={onTab}
      tabsLabel="Builder sections"
    >
      {children}
    </ChromeShell>
  );
}
