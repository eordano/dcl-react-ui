import ChromeShell from "../../components/ChromeShell.jsx";
import DclTopBar from "../../web/frames/DclTopBar.jsx";
import "./governancechrome.css";

export const GOV_TABS = [
  { id: "home", label: "DAO Home" },
  { id: "proposals", label: "Proposals" },
  { id: "projects", label: "Projects" },
  { id: "transparency", label: "Transparency" },
];

export default function GovernanceChrome({
  active = "proposals",
  onTab,
  children,
  signedIn = false,
  mana = "2,480.55",
  account = "0x9f3c…7a21",
}) {
  return (
    <ChromeShell
      className="gv"
      ariaLabel="Governance"
      footer={false}
      topbar={<DclTopBar variant="dao" active="" signedIn={signedIn} mana={mana} account={account} />}
      tabs={GOV_TABS}
      active={active}
      onTab={onTab}
      tabsLabel="Governance sections"
      right={
        <label className="gv__search">
          <svg className="gv__searchicon" viewBox="0 0 24 24" width="16" height="16" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" aria-hidden="true">
            <circle cx="11" cy="11" r="7" />
            <path d="M20 20l-3.5-3.5" />
          </svg>
          <input className="gv__searchfield" type="search" placeholder="Search..." aria-label="Search" />
        </label>
      }
    >
      {children}
    </ChromeShell>
  );
}
