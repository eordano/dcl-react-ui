// Notifications panel route (id: `notifications`, url: #/notifications).
//
// Reuses the ui3 explorer component src/explorer/components/Notifications.jsx
// (NOT rebuilt) and feeds it real props: the live GET /notifications feed via
// useNotifications, mapped into the component's card shape. Auth-gated today, so
// anonymous reads fall back to the bundled fixture inside the hook. While the
// query is in flight we pass no `items`, so the component renders its own mock
// placeholder (matches the scaffold's "unwired/loading still renders" rule).

import Notifications from "../../explorer/components/Notifications.jsx";
import { useNotifications } from "../../data/hooks/useNotifications.js";
import {
  categoryForType,
  notificationTitle,
  notificationBody,
  notificationImage,
  relativeTime,
  fetchLiveNotifications,
} from "../../data/catalyst/notifications.js";
import { qk, STALE } from "../../data/queryKeys.js";
import { getDeployIdentity } from "../../overlay/bridge.js";

// Category -> CSS background, matching the component's prefab palette so live
// items are visually consistent with the mock the component ships.
const CATEGORY_GRADIENT = {
  friends: "linear-gradient(135deg,#ff8f5e,#c44dff)",
  gift: "linear-gradient(135deg,#5ee0ff,#3a6dff)",
  community: "linear-gradient(135deg,#6a2da8,#2d8cff)",
  badge: "linear-gradient(135deg,#ffb347,#ff7a00)",
  marketplace: "linear-gradient(135deg,#7a16a8,#c44dff)",
  system: "linear-gradient(135deg,#3a6dff,#6a2da8)",
};

// Data-driven affordances keyed on the canonical NotificationType. The component
// resolves each action's click locally (mark-read is SIMULATED — writes are
// stubbed this milestone); `to` values are read-only in-overlay nav targets
// handled by the existing data-sb-linkto delegation.
function actionsForType(type) {
  const t = String(type ?? "").toLowerCase();
  if (t.startsWith("social_service_friendship_request"))
    return [{ label: "Accept", primary: true }, { label: "Decline" }];
  if (t === "badge_granted")
    return [{ label: "View Badge", primary: true, to: "Explorer/Pages/BadgesDetails" }];
  if (t === "tip_received" || t === "transfer_received")
    return [{ label: "Open Gift", primary: true }];
  if (t === "community_voice_chat_started")
    return [{ label: "Join Stream", primary: true, to: "Explorer/Components/CommunityStream" }];
  if (t.startsWith("credits_"))
    return [{ label: "Claim", primary: true }];
  if (t === "reward_assignment")
    return [{ label: "View in Backpack", to: "Explorer/Pages/Backpack" }];
  if (
    t === "item_sold" ||
    t === "item_published" ||
    t === "bid_accepted" ||
    t === "bid_received" ||
    t === "royalties_earned"
  )
    return [{ label: "View", primary: true }];
  return undefined;
}

function toCard(n, now) {
  const cat = categoryForType(n.type);
  const grad = CATEGORY_GRADIENT[cat] ?? CATEGORY_GRADIENT.system;
  const img = notificationImage(n);
  const bg = img ? `url("${img}") center/cover` : grad;

  const card = {
    id: n.id,
    type: cat,
    title: notificationTitle(n),
    body: notificationBody(n),
    time: relativeTime(n.timestamp, now),
  };

  // Pick the component's visual slot: round avatar for people, rounded thumb for
  // anything carrying real artwork (or community), else the category glyph chip.
  if (cat === "friends" || cat === "gift") {
    card.avatar = bg;
  } else if (cat === "community" || img) {
    card.thumb = bg;
  } else {
    card.iconBg = grad;
  }

  const actions = actionsForType(n.type);
  if (actions) card.actions = actions;
  return card;
}

// Warm the cache on hover/focus intent. Best-effort, never throws. Uses the same
// qk key + queryFn + STALE as the hook so the on-click useQuery hits the cache.
export function prefetch(queryClient) {
  const address = getDeployIdentity()?.signerAddress;
  const headers =
    typeof window !== "undefined" ? window.__DCL_AUTH_HEADERS__ || undefined : undefined;
  return queryClient
    .prefetchQuery({
      queryKey: qk.notifications(address),
      queryFn: ({ signal }) => fetchLiveNotifications({ signal, headers, address }),
      staleTime: STALE.notifications,
      retry: false,
    })
    .catch(() => {});
}

export default function NotificationsPanel() {
  const { notifications } = useNotifications();

  // notifications: undefined while loading -> pass no `items` so the component
  // shows its mock placeholder; [] (authed-empty) -> empty state; rows -> live.
  const now = Date.now();
  const items = notifications
    ? notifications.map((n) => toCard(n, now))
    : undefined;

  return <Notifications {...(items ? { items } : {})} />;
}
