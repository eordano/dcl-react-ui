import CreatorHubChrome from "../frames/CreatorHubChrome.jsx";
import BdCollectionDetail from "../../builder/pages/BdCollectionDetail.jsx";
import "../../builder/pages/bdcollectiondetail.css";
import "./collectiondetailview.css";

export default function CollectionDetailView({
  signedIn = false,
  account = "",
  name = "",
  onSignIn =(undefined),
  loading = false,
  collection =(undefined),
  wearables =(undefined),
  emotes =(undefined),
  initialItemType = "wearable",
}) {
  return (
    <CreatorHubChrome
      active="collections"
      signedIn={signedIn}
      account={account}
      name={name}
      onSignIn={onSignIn}
    >
      <div className="creator-wearable-collection-detail-route">
        <nav
          className="cwcd-breadcrumb"
          aria-label="Breadcrumb"
          style={{ padding: "12px 24px 0" }}
        >
          <a
            href="/create/wearables"
            style={{ color: "var(--cwcd-muted)", textDecoration: "none" }}
          >
            ← Wearables &amp; Emotes
          </a>
        </nav>
        <BdCollectionDetail
          bare
          loading={loading}
          collection={collection}
          wearables={wearables}
          emotes={emotes}
          initialItemType={initialItemType}
        />
      </div>
    </CreatorHubChrome>
  );
}
