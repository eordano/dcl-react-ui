import type { QueryClient } from "@tanstack/react-query";
import { useMemo } from "react";
import { useNavigate } from "react-router";

import { Avatar } from "../../atoms/primitives";
import Passport, { type PassportLink } from "../../explorer/pages/Passport";
import {
  usePassport,
  prefetchPassport,
  resolveSelfAddress,
} from "../../data/hooks/useProfile";
import { baseItemUrn } from "../../data/catalyst/backpack";
import { useOwnedWearables } from "../../data/hooks/useOwnedItems";
import { useAvatarPreview } from "../../data/hooks/useAvatarPreview";
import { useBridgeState } from "../../overlay/bridge";

const FULL_HEX_ADDR = /^0x[0-9a-fA-F]{40}$/;
const shortAddr = (v: string) => `${v.slice(0, 5)}…${v.slice(-4)}`;

export function prefetch(queryClient: QueryClient) {
  try {
    prefetchPassport(queryClient, resolveSelfAddress());
  } catch {
  }
}

export default function PassportPanel() {
  const navigate = useNavigate();
  const { identity, avatarLoadout } = useBridgeState();
  const address = resolveSelfAddress() || identity.address || null;
  const { profile, faceUrl, badges, photos, isLive } = usePassport(address);

  const wearables = useOwnedWearables(address);
  const equipped = useMemo(() => {
    const d = wearables.data;
    const byUrn = new Map((d?.catalog ?? []).map((w) => [baseItemUrn(w.urn), w]));
    const urns = d?.equipped?.wearables?.length
      ? d.equipped.wearables
      : (avatarLoadout?.wearables ?? []);
    return urns
      .map((urn) => byUrn.get(baseItemUrn(urn)))
      .filter((w): w is NonNullable<typeof w> => w != null);
  }, [wearables.data, avatarLoadout]);

  const dataUrl = useAvatarPreview();

  const rawName = (isLive && profile.name) || identity.name || "";
  const name = FULL_HEX_ADDR.test(rawName) ? shortAddr(rawName) : rawName;
  const tag = profile.hasClaimedName
    ? undefined
    : profile.tag || identity.tag || undefined;
  const wallet =
    identity.wallet || (address ? shortAddr(address) : undefined);
  const links = profile.links as PassportLink[];

  const avatarPreview = dataUrl ? (
    <Avatar
      size={184}
      src={dataUrl}
      name={name || undefined}
      alt={name || "avatar"}
      className="ps__avatar"
    />
  ) : faceUrl ? (
    <Avatar
      size={184}
      src={faceUrl}
      name={name || undefined}
      alt={name || "avatar"}
      className="ps__avatar"
    />
  ) : null;

  return (
    <Passport
      avatarPreview={avatarPreview}
      identity={{
        name,
        tag,
        address: address ?? undefined,
        wallet,
      }}
      nameColor={profile.nameColor}
      hasClaimedName={profile.hasClaimedName}
      about={profile.bio}
      links={links}
      photos={photos.map((p) => ({
        id: p.id,
        url: p.url,
        thumbnailUrl: p.thumbnailUrl || undefined,
        dateTime: p.dateTime || undefined,
      }))}
      equipped={equipped}
      badges={badges.achieved.map((b) => ({
        ...b,
        tier: b.tier ?? undefined,
        image: b.image ?? undefined,
      }))}
      base={wearables.data?.equipped ?? null}
      onClose={() => navigate("/")}
    />
  );
}
