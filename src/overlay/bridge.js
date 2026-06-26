import { useEffect, useState } from "react";

export function getBridge() {
  if (typeof window === "undefined") return null;
  return window.dclBridge ?? null;
}

export function sendBridge(action, payload) {
  const bridge = getBridge();
  if (!bridge) return;
  try {
    bridge.send(action, payload);
  } catch {
  }
}

export function subscribeBridge(cb) {
  const bridge = getBridge();
  if (!bridge) return () => {};
  try {
    return bridge.onState(cb);
  } catch {
    return () => {};
  }
}

export function getDeployIdentity() {
  if (typeof window === "undefined") return null;
  const id = window.dclDeployIdentity;
  if (!id || id.isGuest || !id.signerAddress) return null;
  return id;
}

const BASE_EMOTE_URNS = {
  wave: "urn:decentraland:off-chain:base-emotes:wave",
  clap: "urn:decentraland:off-chain:base-emotes:clap",
  dance: "urn:decentraland:off-chain:base-emotes:dance",
  kiss: "urn:decentraland:off-chain:base-emotes:kiss",
  headexplode: "urn:decentraland:off-chain:base-emotes:headexplode",
  robot: "urn:decentraland:off-chain:base-emotes:robot",
  hammer: "urn:decentraland:off-chain:base-emotes:hammer",
  tik: "urn:decentraland:off-chain:base-emotes:tik",
  snowfall: "urn:decentraland:off-chain:base-emotes:snowfall",
  disco: "urn:decentraland:off-chain:base-emotes:disco",
};

export function emoteUrnForName(name) {
  const raw = name.trim();
  if (raw.startsWith("urn:")) return raw;
  return BASE_EMOTE_URNS[raw.toLowerCase()] ?? null;
}

export const FALLBACK_STATE = {
  identity: {
    name: "Evaristo",
    tag: "#b6c7",
    address: "0x3fe27e8c6d2bd3a2e0d6f3a9b0c1d2e3f4a5b6c7",
    wallet: "0x3fe…b6c7",
    isGuest: false,
  },
  scene: {
    title: "Genesis Plaza",
    coords: "0,12",
    realm: "main",
  },
  chat: [
    { senderName: "Morat", senderAddress: "0x9911…1r56", message: "welcome to Genesis Plaza", channel: "nearby" },
    { senderName: "pixelwitch", senderAddress: "0x0c2d…0c2d", message: "anyone heading to the casino?", channel: "nearby" },
  ],
  friends: {
    onlineCount: 9,
    friends: [],
  },
  mic: {
    enabled: false,
    available: true,
  },
};

function applyState(prev, push) {
  if (!push || typeof push !== "object") return prev;
  switch (push.kind) {
    case "identity":
      return {
        ...prev,
        identity: {
          ...prev.identity,
          name: push.name ?? prev.identity.name,
          tag: push.tag ?? prev.identity.tag,
          address: push.address ?? prev.identity.address,
          wallet: push.address
            ? `${push.address.slice(0, 5)}…${push.address.slice(-4)}`
            : prev.identity.wallet,
          isGuest: push.isGuest ?? prev.identity.isGuest,
        },
      };
    case "scene":
      return {
        ...prev,
        scene: {
          title: push.title ?? prev.scene.title,
          coords: push.coords ?? prev.scene.coords,
          realm: push.realm ?? prev.scene.realm,
        },
      };
    case "chat": {
      const line = {
        senderName: push.senderName,
        senderAddress: push.senderAddress,
        message: push.message,
        channel: push.channel,
        timestamp: push.timestamp,
      };
      return { ...prev, chat: [...prev.chat.slice(-49), line] };
    }
    case "friends":
      return {
        ...prev,
        friends: {
          onlineCount: push.onlineCount ?? prev.friends.onlineCount,
          friends: push.friends ?? prev.friends.friends,
        },
      };
    case "mic":
      return {
        ...prev,
        mic: {
          enabled: push.enabled ?? prev.mic.enabled,
          available: push.available ?? prev.mic.available,
        },
      };
    default:
      return prev;
  }
}

export function useBridgeState() {
  const [state, setState] = useState(FALLBACK_STATE);
  const [live, setLive] = useState(false);

  useEffect(() => {
    let unsub = () => {};
    let cancelled = false;
    let iv = null;
    let to = null;
    // window.dclBridge is installed by the engine's setupDclBridge IIFE, whose
    // load order vs this SPA bundle is not guaranteed. Retry until it appears
    // (the engine replays the last per-kind state to new subscribers, so a late
    // subscription still rebuilds the current identity/scene/friends/mic).
    const attach = () => {
      const bridge = getBridge();
      if (!bridge) return false;
      setLive(true);
      unsub = subscribeBridge((push) => {
        setState((prev) => applyState(prev, push));
      });
      return true;
    };
    if (!attach()) {
      iv = setInterval(() => {
        if (cancelled) return;
        if (attach() && iv) clearInterval(iv);
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

  return { ...state, live };
}
