import type { QueryClient } from "@tanstack/react-query";
import { useNavigate } from "react-router";

import Friends from "../../explorer/pages/Friends";
import { useFriends, prefetchFriends } from "../../data/hooks/useFriends";

export function prefetch(queryClient: QueryClient) {
  try {
    return prefetchFriends(queryClient);
  } catch {
    return undefined;
  }
}

type FriendsPanelProps = {
  floating?: boolean;
  onClose?: () => void;
};

export default function FriendsPanel({ floating = false, onClose }: FriendsPanelProps = {}) {
  const navigate = useNavigate();
  const { friends, received, sent, blocked } = useFriends();

  return (
    <Friends
      initialSection="friends"
      floating={floating}
      onClose={onClose || (() => navigate("/"))}
      friends={[...friends]}
      received={[...received]}
      sent={[...sent]}
      blocked={[...blocked]}
    />
  );
}
