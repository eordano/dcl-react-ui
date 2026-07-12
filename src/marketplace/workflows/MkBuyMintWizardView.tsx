import MkAssetPage from "../pages/MkAssetPage";
import MkBuyFlow from "./MkBuyFlow";
import MkBuyStatusPage from "../pages/MkBuyStatusPage";
import MkSuccessPage from "../pages/MkSuccessPage";
import AssetActionLayout from "../frames/AssetActionLayout";
import Button from "../../atoms/Button";
import "./mkbuymintwizardview.css";

export type MkBuyMintWizardAsset = {
  name: string;
  description: string;
  category: string;
  kind: string;
  rarity: string;
  network: "ethereum" | "polygon";
  networkToken: "ETHEREUM" | "MATIC";
  thumbnail: string | null;
  priceMana: string | null;
  available: number | null;
  contractAddress: string;
};

export type MkBuyMintWizardViewProps = {
  asset: MkBuyMintWizardAsset;
  value: string;
  step: string;
  onStartMint: () => void;
  onConfirm: () => void;
  onBack: () => void;
  onRetry: () => void;
};

function toAssetPageNft(asset: MkBuyMintWizardAsset) {
  return {
    name: asset.name,
    issuedId: 0,
    category: asset.category,
    rarity: asset.rarity,
    bodyShape: "Unisex",
    isSmart: false,
    network: asset.network,
    image: asset.thumbnail ?? null,
    description: asset.description || "A primary-market collectible available to mint.",
    owner: { address: "", name: "" },
    collection: { name: asset.category, address: asset.contractAddress },
    order: asset.priceMana
      ? { price: asset.priceMana, issuedId: 0, expiresLabel: "Available to mint" }
      : null,
  };
}

function toBuyFlowAsset(asset: MkBuyMintWizardAsset) {
  return {
    name: asset.name,
    rarity: asset.rarity,
    network: asset.networkToken,
    kind: asset.kind,
    image: asset.thumbnail ?? null,
    priceMana: asset.priceMana ?? "—",
  };
}

export default function MkBuyMintWizardView({
  asset,
  value,
  step,
  onStartMint,
  onConfirm,
  onBack,
  onRetry,
}: MkBuyMintWizardViewProps) {
  const buyFlowAsset = toBuyFlowAsset(asset);

  const media = (
    <div
      className="buymint-wizard__preview u-rar-bg"
      style={{ ["--rb" as string]: `var(--rar-bg-${asset.rarity})` }}
      aria-hidden="true"
    >
      <span className="buymint-wizard__previewname">{asset.name}</span>
    </div>
  );

  return (
    <div className="buymint-wizard" data-step={step}>
      {value === "review" && (
        <div className="buymint-wizard__review">
          <MkAssetPage
            nft={toAssetPageNft(asset) as never}
            listings={[]}
            emptyListings
          />
          <div className="buymint-wizard__reviewbar" role="group" aria-label="Mint this item">
            <div className="buymint-wizard__reviewinfo">
              <span className="buymint-wizard__reviewlabel">Mint price</span>
              <span className="buymint-wizard__reviewprice">
                {asset.priceMana ? `${asset.priceMana} MANA` : "Price unavailable"}
              </span>
              {asset.available != null && (
                <span className="buymint-wizard__reviewsupply">
                  {asset.available.toLocaleString()} available to mint
                </span>
              )}
            </div>
            <Button variant="primary" disabled={!asset.priceMana} onClick={onStartMint}>
              {asset.priceMana ? "Mint this item" : "Unavailable"}
            </Button>
          </div>
        </div>
      )}

      {value === "connecting" && (
        <AssetActionLayout
          variant="status"
          theme="dark"
          hideBack
          iconTone="neutral"
          icon={<span className="buymint-wizard__spinner" />}
          media={null}
          warning={null}
          onBack={() => {}}
          title="Sign in"
          subtitle="Approve the connection request in your wallet to continue. (Simulated — no real wallet is involved.)"
        >
          <p className="buymint-wizard__hint">Minting {asset.name}…</p>
        </AssetActionLayout>
      )}

      {value === "approving" && (
        <AssetActionLayout
          variant="status"
          theme="dark"
          hideBack
          iconTone="neutral"
          icon={<span className="buymint-wizard__spinner" />}
          media={null}
          warning={null}
          onBack={() => {}}
          title="Approve MANA spending"
          subtitle={
            asset.priceMana
              ? `Allow the marketplace to spend ${asset.priceMana} MANA to mint this item. (Simulated approval.)`
              : "Allow the marketplace to spend MANA to mint this item. (Simulated approval.)"
          }
        >
          {media}
        </AssetActionLayout>
      )}

      {value === "confirming" && (
        <div className="buymint-wizard__confirm">
          <MkBuyFlow
            asset={buyFlowAsset}
            chainName={asset.networkToken === "ETHEREUM" ? "Ethereum" : "Polygon"}
            tokenSymbol="MANA"
            itemCostToken={asset.priceMana ?? "—"}
            totalToken={asset.priceMana ?? "—"}
            state="default"
            onPrimary={onConfirm}
            onBack={onBack}
            onClose={onBack}
          />
          <div className="buymint-wizard__confirmbar" role="group" aria-label="Confirm mint">
            <Button variant="secondary" onClick={onBack}>
              Back
            </Button>
            <Button variant="primary" onClick={onConfirm}>
              Confirm &amp; mint
            </Button>
          </div>
        </div>
      )}

      {value === "submitting" && (
        <MkBuyStatusPage
          status="pending"
          asset={{ name: asset.name, rarity: asset.rarity, category: asset.category }}
        />
      )}

      {value === "success" && (
        <MkSuccessPage
          state="success"
          asset={{ category: asset.category, name: asset.name, rarity: asset.rarity }}
        />
      )}

      {value === "error" && (
        <>
          <MkBuyStatusPage
            status="failed"
            asset={{ name: asset.name, rarity: asset.rarity, category: asset.category }}
          />
          <div className="buymint-wizard__confirmbar">
            <Button variant="primary" onClick={onRetry}>
              Retry
            </Button>
          </div>
        </>
      )}
    </div>
  );
}
