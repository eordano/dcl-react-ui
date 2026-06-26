import "./chcollections.css";
import CreatorHubChrome from "../frames/CreatorHubChrome.jsx";
import EmptyState from "../../components/EmptyState.jsx";

const COLLECTIONS_ICON = (
  <svg viewBox="0 0 48 48" width="48" height="48" aria-hidden="true">
    <rect x="9" y="14" width="30" height="22" rx="3" fill="none" stroke="currentColor" strokeWidth="2.2" />
    <path d="M13 14V11a3 3 0 0 1 3-3h16a3 3 0 0 1 3 3v3" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" />
    <path d="M19 23h10M19 28h6" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" />
  </svg>
);

export default function ChCollections() {
  return (
    <CreatorHubChrome active="collections">
      <div className="chcollections">
        <EmptyState
          icon={COLLECTIONS_ICON}
          iconWash
          title="Collections are coming to Creator Hub"
          subtitle="Create and manage your wearable & emote collections without leaving the app. For now, you can keep working on them in the Builder."
          actions={[
            { label: "Open Builder", href: "https://builder.decentraland.org/collections", variant: "solid" },
            { label: "Learn more", href: "https://docs.decentraland.org/creator/", variant: "ghost" },
          ]}
        />
      </div>
    </CreatorHubChrome>
  );
}
