import { useNavigate } from "react-router";

import Friends from "../../explorer/pages/Friends.jsx";
import { useFriends, prefetchFriends } from "../../data/hooks/useFriends.js";

export function prefetch(queryClient) {
  try {
    return prefetchFriends(queryClient);
  } catch {
  }
}

export default function FriendsPanel() {
  const navigate = useNavigate();
  const { data, isError, friends, received, sent, blocked } = useFriends();

  const liveProps =
    data && !isError ? { friends, received, sent, blocked } : {};

  return (
    <Friends
      initialSection="friends"
      onClose={() => navigate("/")}
      {...liveProps}
    />
  );
}
