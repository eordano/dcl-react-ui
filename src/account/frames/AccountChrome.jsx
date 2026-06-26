import ChromeShell from "../../components/ChromeShell.jsx";
import DclTopBar from "../../web/frames/DclTopBar.jsx";
import "./accountchrome.css";

export default function AccountChrome({
  children,
  signedIn = false,
  mana = "2,480.55",
  account = "0x9f3c…7a21",
}) {
  return (
    <ChromeShell
      className="ac"
      ariaLabel="Account"
      subnav={false}
      topbar={<DclTopBar variant="sites" active="" signedIn={signedIn} mana={mana} account={account} />}
    >
      {children}
    </ChromeShell>
  );
}
