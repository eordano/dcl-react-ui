import { useEffect } from "react";
import { useBridgeState, sendBridge } from "../../overlay/bridge";

export function useAvatarPreview() {
  const { avatarPreview } = useBridgeState();
  useEffect(() => {
    sendBridge("RequestAvatarPreview", {});
  }, []);
  return avatarPreview;
}
