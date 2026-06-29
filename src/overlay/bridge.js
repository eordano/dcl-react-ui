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

export function stopEmote() {
  sendBridge("StopEmote", {});
}

export const FALLBACK_STATE = {
  identity: {
    name: "Guest",
    tag: null,
    address: null,
    wallet: null,
    isGuest: true,
  },
  scene: {
    title: null,
    coords: null,
    realm: null,
  },
  chat: [],
  friends: {
    onlineCount: 0,
    friends: [],
  },
  mic: {
    enabled: false,
    available: true,
  },
  loginCode: null,
  avatarPreview: null,
  avatarLoadout: null,
};

function applyState(prev, push) {
  if (!push || typeof push !== "object") return prev;
  switch (push.kind) {
    case "identity": {
      const isGuest = push.isGuest ?? prev.identity.isGuest;
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
          isGuest,
        },
        loginCode: isGuest ? prev.loginCode : null,
      };
    }
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
    case "loginCode":
      return {
        ...prev,
        loginCode: {
          code: push.code != null && push.code !== -1 ? push.code : null,
          url: push.url ?? null,
          error: push.error ?? null,
        },
      };
    case "avatarPreview":
      return { ...prev, avatarPreview: push.dataUrl ?? prev.avatarPreview };
    case "avatar":
      return {
        ...prev,
        avatarLoadout: {
          bodyShape: push.bodyShape ?? prev.avatarLoadout?.bodyShape ?? null,
          wearables: push.wearables ?? prev.avatarLoadout?.wearables ?? [],
          emotes: push.emotes ?? prev.avatarLoadout?.emotes ?? [],
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
