import AccountChip from "../../components/AccountChip.jsx";
import ManaPill from "../../components/ManaPill.jsx";
import ChromeShell from "../../components/ChromeShell.jsx";
import DclTopBar from "../../web/frames/DclTopBar.jsx";
import "./marketplacechrome.css";

export const MARKET_TABS = [
  { id: "overview", label: "Overview" },
  { id: "collectibles", label: "Collectibles" },
  { id: "land", label: "Land" },
  { id: "names", label: "NAMEs" },
  { id: "my-assets", label: "My Assets" },
  { id: "my-lists", label: "My Lists" },
];

export default function MarketplaceChrome({
  active = "overview",
  onTab,
  children,
  signedIn = false,
  mana = "2,480.55",
  account = "0x9f3c…7a21",
}) {
  return (
    <ChromeShell
      className="mk"
      ariaLabel="Marketplace"
      topbar={<DclTopBar active="shop" signedIn={signedIn} mana={mana} account={account} />}
      tabs={MARKET_TABS}
      active={active}
      onTab={onTab}
      tabsLabel="Marketplace sections"
      right={
        signedIn ? (
          <>
            <ManaPill value={mana} />
            <AccountChip account={account} />
          </>
        ) : null
      }
    >
      {children}
    </ChromeShell>
  );
}
