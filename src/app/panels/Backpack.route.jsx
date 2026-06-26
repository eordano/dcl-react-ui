// Backpack panel — route id "backpack" (#/backpack), matches the EXPLORE_TABS
// "backpack" tab so tab-highlight + hover-prefetch resolve.
//
// Reuses the ui3 page src/explorer/pages/Backpack.jsx (never rebuilt). The page
// is presentational with its own mock placeholders, so it renders while data is
// loading; this wrapper fetches the owner's items (LIVE wearables + emotes, with
// catalog/categories/equipped/emote-loadout seeded from fixtures) and feeds them
// down as props. Identity is read-only from the bridge; writes are stubbed.

import { useMemo } from "react";

import Backpack from "../../explorer/pages/Backpack.jsx";
import { useBridgeState, FALLBACK_STATE } from "../../overlay/bridge.js";
import {
  useOwnedItems,
  prefetchOwnedItems,
} from "../../data/hooks/useOwnedItems.js";

// Non-hook address resolution for prefetch (runs outside React). Mirrors the
// component's fallback so the warmed cache key aligns with the hook in the
// common (pre-auth / dev) case. Best-effort — never throws.
function guessAddress() {
  if (typeof window !== "undefined") {
    const id = window.dclDeployIdentity;
    if (id && !id.isGuest && id.signerAddress) return id.signerAddress;
  }
  return FALLBACK_STATE.identity.address;
}

// Optional hover/focus intent warm-up (called by the shell). Pulls the chunk and
// fills the wearables + emotes query cache so the click renders from memory.
export function prefetch(queryClient) {
  try {
    prefetchOwnedItems(queryClient, guessAddress());
  } catch {
    /* prefetch is best-effort */
  }
}

export default function BackpackPanel() {
  const { identity } = useBridgeState();
  const address = identity?.address ?? guessAddress();

  const { wearables, emotes, isLoading, isError, error } =
    useOwnedItems(address);

  // The reused page consumes `avatarPreview` today; forward the live/seed
  // backpack data as additional props so the wiring is real and forward-
  // compatible once the page reads them. Only override once data has arrived so
  // the page keeps rendering its own placeholders while loading.
  const dataProps = useMemo(() => {
    const w = wearables.data;
    const e = emotes.data;
    if (!w && !e) return {};
    return {
      address,
      // wearables domain
      owned: w?.owned ?? [],
      ownedUrns: w?.ownedUrns ?? [],
      catalog: w?.catalog ?? [],
      categories: w?.categories ?? [],
      equipped: w?.equipped ?? null,
      ownedEmpty: w?.ownedEmpty ?? true,
      // emotes domain
      emotes: e?.owned ?? [],
      emoteCatalog: e?.catalog ?? [],
      emoteLoadout: e?.loadout ?? [],
      emoteSlotOrder: e?.slotOrder ?? [],
      // status
      source: w?.source ?? e?.source ?? "fixture",
      loading: isLoading,
      error: isError ? error?.message ?? "Failed to load backpack" : null,
    };
  }, [wearables.data, emotes.data, address, isLoading, isError, error]);

  return <Backpack avatarPreview={null} {...dataProps} />;
}
