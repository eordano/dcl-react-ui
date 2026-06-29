import { useEffect, useMemo, useState } from "react";
import { useQuery } from "@tanstack/react-query";

import { qk, STALE } from "../queryKeys.js";
import { getBridge, sendBridge, subscribeBridge } from "../../overlay/bridge.js";

const SELF_KEY = "self";

const MONTHS = [
  "JAN", "FEB", "MAR", "APR", "MAY", "JUN",
  "JUL", "AUG", "SEP", "OCT", "NOV", "DEC",
];

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

function adaptBridgeFriends(push) {
  if (!push) return null;
  return {
    friends: (push.friends ?? []).map((f) => ({
      address: f.address,
      name: f.name,
      hasClaimedName: f.hasClaimedName,
      profilePictureUrl: f.profilePictureUrl,
      online: f.status === "online",
    })),
    received: push.received ?? [],
    sent: push.sent ?? [],
    blocked: [],
  };
}

function useBridgeFriendsPush() {
  const [push, setPush] = useState(null);
  useEffect(() => {
    let unsub = () => {};
    let cancelled = false;
    let iv = null;
    let to = null;
    const attach = () => {
      if (!getBridge()) return false;
      unsub = subscribeBridge((p) => {
        if (p && p.kind === "friends") setPush(p);
      });
      return true;
    };
    if (!attach()) {
      iv = setInterval(() => {
        if (cancelled) return;
        if (attach() && iv) {
          clearInterval(iv);
          iv = null;
        }
      }, 250);
      to = setTimeout(() => iv && clearInterval(iv), 10000);
    }
    return () => {
      cancelled = true;
      if (iv) clearInterval(iv);
      if (to) clearTimeout(to);
      try {
        unsub();
      } catch {
      }
    };
  }, []);
  return push;
}

export async function fetchFriends({ signal } = {}) {
  if (signal?.aborted) {
    throw new DOMException("Friends read aborted", "AbortError");
  }
  return normalizeFriends({});
}

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

  const push = useBridgeFriendsPush();
  const data = useMemo(
    () => (push ? normalizeFriends(adaptBridgeFriends(push)) : query.data),
    [push, query.data],
  );
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
