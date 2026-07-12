import type { ReactNode } from "react";
import ChromeShell from "../../components/ChromeShell";
import DclTopBar from "../../web/frames/DclTopBar";
import "./marketplacechrome.css";

export const MARKET_TABS: { id: string; label: string; href: string }[] = [
  { id: "overview", label: "Overview", href: "/shop" },
  { id: "collectibles", label: "Collectibles", href: "/shop?tab=all-assets" },
  { id: "names", label: "NAMEs", href: "/marketplace/names" },
  { id: "my-assets", label: "My Assets", href: "/marketplace/account" },
  { id: "my-lists", label: "My Lists", href: "/marketplace/lists" },
  { id: "cart", label: "Cart", href: "/marketplace/cart" },
];

type MarketplaceChromeProps = {
  active?: string;
  onTab?: (id: string) => void;
  children?: ReactNode;
  signedIn?: boolean;
  mana?: string;
  account?: string;
  onSignIn?: () => void;
};

export default function MarketplaceChrome({
  active = "overview",
  onTab,
  children,
  signedIn,
  mana,
  account,
  onSignIn,
}: MarketplaceChromeProps) {
  return (
    <ChromeShell
      className="mk"
      ariaLabel="Marketplace"
      topbar={
        <DclTopBar
          variant="sites"
          active="shop"
          signedIn={signedIn}
          mana={mana}
          account={account}
          onSignIn={onSignIn}
        />
      }
      tabs={MARKET_TABS}
      active={active}
      onTab={onTab}
      tabsLabel="Marketplace sections"
    >
      {children}
    </ChromeShell>
  );
}

export function MarketplaceChromeMaybe({
  chrome = true,
  children,
  ...rest
}: MarketplaceChromeProps & { chrome?: boolean }) {
  if (!chrome) return <>{children}</>;
  return <MarketplaceChrome {...rest}>{children}</MarketplaceChrome>;
}
