import { useMemo } from "react";

import Backpack from "../../explorer/pages/Backpack.jsx";
import { useBridgeState, FALLBACK_STATE } from "../../overlay/bridge.js";
import {
  useOwnedItems,
  prefetchOwnedItems,
} from "../../data/hooks/useOwnedItems.js";
import EngineAvatarPreview from "../../explorer/components/EngineAvatarPreview.jsx";

function guessAddress() {
  if (typeof window !== "undefined") {
    const id = window.dclDeployIdentity;
    if (id && !id.isGuest && id.signerAddress) return id.signerAddress;
  }
  return FALLBACK_STATE.identity.address;
}

export function prefetch(queryClient) {
  try {
    prefetchOwnedItems(queryClient, guessAddress());
  } catch {
  }
}

export default function BackpackPanel() {
  const { identity, avatarLoadout } = useBridgeState();
  const address = identity?.address ?? guessAddress();

  const { wearables, emotes, isLoading, isError, error } =
    useOwnedItems(address);

  const dataProps = useMemo(() => {
    const w = wearables.data;
    const e = emotes.data;
    const catEquipped = w?.equipped ?? null;
    const equipped = avatarLoadout?.wearables?.length
      ? {
          ...(catEquipped ?? {}),
          wearables: avatarLoadout.wearables,
          bodyShape: avatarLoadout.bodyShape ?? catEquipped?.bodyShape,
          emotes:
            avatarLoadout.emotes?.length > 0
              ? avatarLoadout.emotes
              : catEquipped?.emotes,
        }
      : catEquipped;
    return {
      address,
      owned: w?.owned ?? [],
      ownedUrns: w?.ownedUrns ?? [],
      catalog: w?.catalog ?? [],
      categories: w?.categories ?? [],
      equipped,
      ownedEmpty: w?.ownedEmpty ?? true,
      emotes: e?.owned ?? [],
      emoteCatalog: e?.catalog ?? [],
      emoteLoadout: e?.loadout ?? [],
      emoteSlotOrder: e?.slotOrder ?? [],
      source: w?.source ?? e?.source ?? "live",
      loading: isLoading,
      error: isError ? error?.message ?? "Failed to load backpack" : null,
    };
  }, [wearables.data, emotes.data, address, avatarLoadout, isLoading, isError, error]);

  return (
    <Backpack
      avatarPreview={<EngineAvatarPreview className="bp__avatar-preview" />}
      avatarName={identity?.name ?? ""}
      {...dataProps}
    />
  );
}
