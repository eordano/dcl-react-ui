// Passport panel — route id "passport" (#/passport).
//
// Reuses the ui3 explorer Passport page (never rebuilt). The page is
// presentational with its own mock fallbacks, so wiring = fetch in this wrapper
// and override the one prop it exposes, `avatarPreview`. We feed the LIVE avatar
// face snapshot from /lambdas/profile/{addr} into the reused Avatar primitive;
// while loading, un-deployed, or on error there is no snapshot, so `avatarPreview`
// stays null and the page renders its built-in placeholder. Badges + camera-reel
// photos are edge-404/empty on this catalyst today, so usePassport degrades them
// to fixtures (the data is assembled and exposed for when the page consumes it /
// when a signed header flips them live through the same getJSON path).

import { Avatar } from "../../atoms/primitives.jsx";
import Passport from "../../explorer/pages/Passport.jsx";
import {
  usePassport,
  prefetchPassport,
  resolveSelfAddress,
} from "../../data/hooks/useProfile.js";
import { useBridgeState } from "../../overlay/bridge.js";

// Warm the cache on hover/focus intent (best-effort; the shell calls this).
export function prefetch(queryClient) {
  try {
    prefetchPassport(queryClient, resolveSelfAddress());
  } catch {
    /* prefetch is best-effort */
  }
}

export default function PassportPanel() {
  const { profile, faceUrl } = usePassport();
  // Identity comes from the SAME engine bridge the nav uses, so the name/tag/
  // address are consistent across the overlay (no more nav=BEVY_USER vs
  // passport=Evaristo split). Falls back to the page's placeholder when absent.
  const { identity } = useBridgeState();

  // Only override the prop once a real face snapshot has arrived, so the panel
  // still renders (with the page's placeholder avatar) while loading / when the
  // profile is not deployed on this realm.
  const avatarPreview = faceUrl ? (
    <Avatar
      size={184}
      src={faceUrl}
      name={profile?.name || undefined}
      alt={profile?.name || "avatar"}
      className="ps__avatar"
    />
  ) : null;

  return <Passport avatarPreview={avatarPreview} identity={identity} />;
}
