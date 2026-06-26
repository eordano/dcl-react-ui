// useFriends — TanStack Query hook for the Friends panel.
//
// DATA SOURCE: friendships are dcl-rpc-over-WebSocket only. catalyrst-social-rpc
// binds a single HTTP route ("/") that is a WebSocket upgrade; the friendship
// RPCs (GetFriends / GetPendingFriendshipRequests / GetSentFriendshipRequests /
// GetBlockedUsers / UpsertFriendship / GetFriendshipStatus) are dispatched only
// over that authenticated WS stream and are NOT reachable over plain HTTP GET.
// In the live client they arrive via window.dclBridge; here the bridge is absent,
// so reads degrade to the captured fixture (bevy-overlay-friend-request.json).
// This is the reads-only milestone — flips live by feeding bridge state through
// this same hook with no structural change. WRITES are stubbed behind the
// bridge's future single SignRequest chokepoint (see requestFriendAction).

import { useMemo } from "react";
import { useQuery } from "@tanstack/react-query";

import { qk, STALE } from "../queryKeys.js";
import { friendsFixture } from "../fixtures.js";
import { sendBridge } from "../../overlay/bridge.js";

// Friendships are always "mine" — there is exactly one logged-in subject, so the
// cache key is identity-independent. Using a stable sentinel keeps the hook's
// useQuery key and the route's prefetch key identical (hover-prefetch hits).
const SELF_KEY = "self";

const MONTHS = [
  "JAN", "FEB", "MAR", "APR", "MAY", "JUN",
  "JUL", "AUG", "SEP", "OCT", "NOV", "DEC",
];

// upsert_friendship action set + transition_valid() state machine
// (catalyrst-social-rpc/src/service.rs). Kept here so the stubbed write path
// rejects obviously-invalid actions early once it is wired to a signer.
export const FRIEND_ACTIONS = Object.freeze({
  REQUEST: "request",
  ACCEPT: "accept",
  CANCEL: "cancel",
  REJECT: "reject",
  DELETE: "delete",
  BLOCK: "block",
  UNBLOCK: "unblock",
});

function shortTag(address) {
  if (!address || typeof address !== "string") return "";
  const hex = address.replace(/^0x/i, "");
  return "#" + hex.slice(-4);
}

// nameColor arrives as linear {r,g,b} in 0..1 (protocol Color3). Derive an HSL
// hue so the reused page's <Avatar hue=… /> renders a stable per-user color.
function hueFromNameColor(color) {
  if (!color) return 210;
  const r = Number(color.r) || 0;
  const g = Number(color.g) || 0;
  const b = Number(color.b) || 0;
  const max = Math.max(r, g, b);
  const min = Math.min(r, g, b);
  const delta = max - min;
  if (delta === 0) return 0;
  let h;
  if (max === r) h = ((g - b) / delta) % 6;
  else if (max === g) h = (b - r) / delta + 2;
  else h = (r - g) / delta + 4;
  h = Math.round(h * 60);
  return h < 0 ? h + 360 : h;
}

function formatDate(ms) {
  if (!ms) return "";
  const d = new Date(ms);
  if (Number.isNaN(d.getTime())) return "";
  return `${MONTHS[d.getUTCMonth()]} ${d.getUTCDate()}`;
}

function normalizeFriend(f) {
  if (!f) return null;
  const online = !!f.online;
  return {
    address: f.address ?? "",
    name: f.name ?? "unknown",
    tag: shortTag(f.address),
    hue: hueFromNameColor(f.nameColor),
    online,
    where: online ? (f.where || "Decentraland") : "Offline",
    profilePictureUrl: f.profilePictureUrl || "",
    hasClaimedName: !!f.hasClaimedName,
  };
}

function normalizeRequest(r) {
  if (!r) return null;
  const f = r.friend ?? {};
  return {
    id: r.id ?? f.address ?? "",
    address: f.address ?? "",
    name: f.name ?? "unknown",
    tag: shortTag(f.address),
    hue: hueFromNameColor(f.nameColor),
    date: formatDate(r.createdAt),
    message: r.message || "",
    profilePictureUrl: f.profilePictureUrl || "",
    hasClaimedName: !!f.hasClaimedName,
  };
}

function normalizeBlocked(b) {
  if (!b) return null;
  return {
    address: b.address ?? "",
    name: b.name ?? "unknown",
    tag: shortTag(b.address),
    hue: hueFromNameColor(b.nameColor),
    date: formatDate(b.blockedAt),
    profilePictureUrl: b.profilePictureUrl || "",
    hasClaimedName: !!b.hasClaimedName,
  };
}

// Map the captured RPC shapes onto the flat props the reused Friends page reads.
export function normalizeFriends(raw) {
  const friends = (raw?.friends ?? []).map(normalizeFriend).filter(Boolean);
  const received = (raw?.received ?? []).map(normalizeRequest).filter(Boolean);
  const sent = (raw?.sent ?? []).map(normalizeRequest).filter(Boolean);
  const blocked = (raw?.blocked ?? []).map(normalizeBlocked).filter(Boolean);
  return {
    self: raw?.self ?? null,
    friends,
    received,
    sent,
    blocked,
    onlineCount: friends.filter((f) => f.online).length,
  };
}

// queryFn: signal-aware so a panel switch cancels the in-flight read, even though
// the source is a bundled fixture (kept async-shaped for the live-WS swap later).
export async function fetchFriends({ signal } = {}) {
  if (signal?.aborted) {
    throw new DOMException("Friends read aborted", "AbortError");
  }
  // social-service is dcl-rpc (WebSocket) only — not browser-HTTP reachable — so
  // the overlay cannot read the friend graph yet. Return an honest EMPTY set
  // instead of fabricated friends; this flips to live data when a WS bridge
  // lands. (friendsFixture is retained for that wiring + tests.)
  void friendsFixture;
  return normalizeFriends({});
}

// Shared by the route's exported prefetch(queryClient): warms the exact cache
// entry the hook reads, so the click renders instantly from memory.
export function prefetchFriends(queryClient) {
  return queryClient.prefetchQuery({
    queryKey: qk.friends(SELF_KEY),
    queryFn: ({ signal }) => fetchFriends({ signal }),
    staleTime: STALE.friends,
  });
}

const EMPTY = Object.freeze([]);

export function useFriends() {
  const query = useQuery({
    queryKey: qk.friends(SELF_KEY),
    queryFn: ({ signal }) => fetchFriends({ signal }),
    staleTime: STALE.friends,
  });

  const data = query.data;
  const friends = data?.friends ?? EMPTY;
  const received = data?.received ?? EMPTY;
  const sent = data?.sent ?? EMPTY;
  const blocked = data?.blocked ?? EMPTY;

  const isEmpty = useMemo(
    () =>
      !!data &&
      friends.length === 0 &&
      received.length === 0 &&
      sent.length === 0 &&
      blocked.length === 0,
    [data, friends, received, sent, blocked],
  );

  return {
    ...query,
    data,
    friends,
    received,
    sent,
    blocked,
    onlineCount: data?.onlineCount ?? 0,
    reqCount: received.length + sent.length,
    isEmpty,
  };
}

// WRITE PATH (stubbed). The wallet key never crosses into JS, so every signed
// mutation routes through the bridge's future single SignRequest chokepoint.
// No-op (best-effort) when the bridge is absent — reads-only milestone.
export function requestFriendAction(action, address, extra = {}) {
  const valid = Object.values(FRIEND_ACTIONS).includes(action);
  if (!valid) {
    if (typeof console !== "undefined") {
      console.warn(`[friends] ignored unknown action: ${action}`);
    }
    return false;
  }
  sendBridge("SignRequest", {
    kind: "upsert_friendship",
    action,
    address,
    ...extra,
  });
  if (typeof console !== "undefined") {
    console.info(
      `[friends] ${action} -> ${address || "?"} (stubbed: pending signed write path)`,
    );
  }
  return true;
}
