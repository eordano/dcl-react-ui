import ChromeShell from "../../components/ChromeShell.jsx";
import DclTopBar from "../../web/frames/DclTopBar.jsx";
import { ChevronLeft } from "../../atoms/icons.jsx";
import "./builderchrome.css";

export const BUILDER_TABS = [
  { id: "land", label: "Land", href: "/builder/land" },
  { id: "names", label: "Names", href: "/builder/names" },
];

export default function BuilderChrome({
  active = "overview",
  onTab,
  children,
  signedIn = false,
  account = "",
}) {
  return (
    <ChromeShell
      className="bd"
      ariaLabel="Builder"
      topbar={<DclTopBar active="create" signedIn={signedIn} account={account} />}
      brand={
        <a className="cs__tab" href="/create" aria-label="Back to Creator Hub">
          <ChevronLeft size={16} />
          Back to Creator Hub
        </a>
      }
      tabs={BUILDER_TABS}
      active={active}
      onTab={onTab}
      tabsLabel="Builder sections"
    >
      {children}
    </ChromeShell>
  );
}
