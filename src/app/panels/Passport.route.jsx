import { useMemo } from "react";
import { useNavigate } from "react-router";

import { Avatar } from "../../atoms/primitives.jsx";
import Passport from "../../explorer/pages/Passport.jsx";
import {
  usePassport,
  prefetchPassport,
  resolveSelfAddress,
} from "../../data/hooks/useProfile.js";
import { useOwnedWearables } from "../../data/hooks/useOwnedItems.js";
import { useAvatarPreview } from "../../data/hooks/useAvatarPreview.js";
import { useBridgeState } from "../../overlay/bridge.js";

export function prefetch(queryClient) {
  try {
    prefetchPassport(queryClient, resolveSelfAddress());
  } catch {
  }
}

export default function PassportPanel() {
  const navigate = useNavigate();
  const { profile, faceUrl, badges } = usePassport();
  const { identity } = useBridgeState();
  const address = identity?.address ?? resolveSelfAddress();

  const wearables = useOwnedWearables(address);
  const equipped = useMemo(() => {
    const d = wearables.data;
    if (!d) return [];
    const byUrn = new Map((d.catalog ?? []).map((w) => [w.urn, w]));
    return (d.equipped?.wearables ?? [])
      .map((urn) => byUrn.get(urn))
      .filter(Boolean);
  }, [wearables.data]);

  const dataUrl = useAvatarPreview();

  const avatarPreview = dataUrl ? (
    <Avatar
      size={184}
      src={dataUrl}
      name={profile?.name || undefined}
      alt={profile?.name || "avatar"}
      className="ps__avatar"
    />
  ) : faceUrl ? (
    <Avatar
      size={184}
      src={faceUrl}
      name={profile?.name || undefined}
      alt={profile?.name || "avatar"}
      className="ps__avatar"
    />
  ) : null;

  return (
    <Passport
      avatarPreview={avatarPreview}
      identity={identity}
      equipped={equipped}
      badges={badges.achieved}
      base={wearables.data?.equipped ?? null}
      onClose={() => navigate("/")}
    />
  );
}
