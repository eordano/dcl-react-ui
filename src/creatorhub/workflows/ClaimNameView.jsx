import MkClaimNamePage from "../../marketplace/pages/MkClaimNamePage.jsx";
import MkSuccessPage from "../../marketplace/pages/MkSuccessPage.jsx";
import ChPublishWizardPublishToWorld from "./ChPublishWizardPublishToWorld.jsx";
import AssetActionLayout from "../../marketplace/frames/AssetActionLayout.jsx";
import Button from "../../atoms/Button.jsx";
import ManaMark from "../../atoms/ManaMark.jsx";
import "./claimnameview.css";

export default function ClaimNameView({
  view = "naming",
  step = "name",
  name = "myWorld",
  worldName = "",
  activeName = "",
  priceMana = "100",
  onClaim =(undefined),
  onBack =(undefined),
  onConfirmMint =(undefined),
  onReturnToPublish =(undefined),
  onRetry =(undefined),
}) {
  const forceStatus =
    view === "checking"
      ? { kind: "available" }
      : view === "unavailable"
        ? { kind: "unavailable" }
        : undefined;

  return (
    <div className="ch-claim-name-wizard" data-step={step}>
      {(view === "naming" || view === "checking" || view === "unavailable") && (
        <MkClaimNamePage
          initialName={name}
          initialFocused={view !== "naming"}
          forceStatus={forceStatus}
          onClaim={onClaim}
        />
      )}

      {view === "reviewing" && (
        <AssetActionLayout
          theme="dark"
          media={null}
          icon={null}
          title={`Confirm minting ${worldName}`}
          subtitle={
            <>
              You are about to mint <strong>{worldName}</strong> for{" "}
              <ManaMark className="" /> {priceMana} MANA on Ethereum
              Mainnet. This NAME grants a free World you can publish to, plus extra
              Voting Power.
            </>
          }
          warning="Simulated mint — DCLRegistrar.register is stubbed; no on-chain transaction is sent (read-only realm)."
          onBack={onBack}
        >
          <div className="ch-claim-name-wizard__controls">
            <Button variant="primary" onClick={onConfirmMint}>
              Confirm &amp; mint ({priceMana} MANA)
            </Button>
          </div>
        </AssetActionLayout>
      )}

      {view === "minting" && (
        <MkSuccessPage
          state="loading"
          asset={{ category: "ens", name: activeName, rarity: "rare" }}
        />
      )}

      {view === "done" && (
        <>
          <div className="ch-claim-name-wizard__handoff" role="status">
            <span>
              Minted <strong>{worldName}</strong> (simulated). Return to publish your
              scene to this World.
            </span>
            <Button variant="primary" onClick={onReturnToPublish}>
              Back to Publish to World
            </Button>
          </div>
          <ChPublishWizardPublishToWorld state="selection" />
        </>
      )}

      {view === "error" && (
        <>
          <MkSuccessPage
            state="error"
            asset={{ category: "ens", name: activeName, rarity: "rare" }}
          />
          <div className="ch-claim-name-wizard__controls">
            <Button variant="primary" onClick={onRetry}>
              Retry mint
            </Button>
          </div>
        </>
      )}
    </div>
  );
}
