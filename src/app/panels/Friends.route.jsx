// Friends panel route module.
//
// Contract (see src/app/panels/README.md): filename -> route id "friends" ->
// hash route "#/friends". Default export is the panel component (no required
// props); optional `prefetch(queryClient)` warms the cache on hover/focus intent.
//
// DATA: social-rpc is dcl-rpc-over-WebSocket only and not browser-HTTP reachable,
// so reads degrade to the captured fixture via useFriends (reads-only milestone).
// The reused Friends page is presentational with its own mock fallback, so this
// wrapper passes the normalized live/fixture data forward (same convention as the
// Map template: the page may ignore the props for now and render placeholders
// while loading — it flips to real data the moment the page consumes the props).
// WRITES stay stubbed behind the bridge SignRequest chokepoint (useFriends).

import Friends from "../../explorer/pages/Friends.jsx";
import { useFriends, prefetchFriends } from "../../data/hooks/useFriends.js";

// Warm the friends cache on hover/focus intent (best-effort, never throws).
export function prefetch(queryClient) {
  try {
    return prefetchFriends(queryClient);
  } catch {
    /* prefetch is best-effort */
  }
}

export default function FriendsPanel() {
  const { data, isError, friends, received, sent, blocked } = useFriends();

  // Only override the page's mock fallback once the (fixture-backed) read has
  // resolved cleanly; while loading or on error the page keeps rendering its
  // built-in placeholders, so the panel is never blank.
  const liveProps =
    data && !isError ? { friends, received, sent, blocked } : {};

  return <Friends initialSection="friends" {...liveProps} />;
}
