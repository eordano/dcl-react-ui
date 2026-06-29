import { useEffect } from "react";
import { useBridgeState, sendBridge } from "../../overlay/bridge.js";

export function useAvatarPreview() {
  const { avatarPreview } = useBridgeState();
  useEffect(() => {
    sendBridge("RequestAvatarPreview", {});
  }, []);
  return avatarPreview;
}
