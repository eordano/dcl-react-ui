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

const CATEGORY_GRADIENT = {
  friends: "linear-gradient(135deg,#ff8f5e,#c44dff)",
  gift: "linear-gradient(135deg,#5ee0ff,#3a6dff)",
  community: "linear-gradient(135deg,#6a2da8,#2d8cff)",
  badge: "linear-gradient(135deg,#ffb347,#ff7a00)",
  marketplace: "linear-gradient(135deg,#7a16a8,#c44dff)",
  system: "linear-gradient(135deg,#3a6dff,#6a2da8)",
};

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

export default function NotificationsPanel({ floating = false }) {
  const { notifications } = useNotifications();

  const now = Date.now();
  const items = notifications
    ? notifications.map((n) => toCard(n, now))
    : undefined;

  return <Notifications bare floating={floating} {...(items ? { items } : {})} />;
}
