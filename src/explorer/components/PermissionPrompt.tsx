import { useEffect, useState } from "react";
import { subscribeBridge, sendBridge } from "../../overlay/bridge";
import SmartWearables from "./SmartWearables";
import "./permissionprompt.css";


type PermReq = {
  id: number;
  ty: string;
  scene: string;
  title: string;
  request: string;
  additional?: string | null;
};

type PermissionPush = {
  kind: "permissionRequest";
  id?: number;
  ty?: string;
  scene?: string;
  title?: string;
  request?: string;
  additional?: string | null;
};

function isPermissionPush(v: unknown): v is PermissionPush {
  return (
    typeof v === "object" &&
    v !== null &&
    (v as { kind?: unknown }).kind === "permissionRequest" &&
    typeof (v as { id?: unknown }).id === "number"
  );
}

const SENSITIVE = new Set(["Web3", "OpenUrl", "SpawnPortable"]);

export default function PermissionPrompt() {
  const [queue, setQueue] = useState<PermReq[]>([]);

  useEffect(() => {
    return subscribeBridge((push) => {
      if (!isPermissionPush(push)) return;
      const req: PermReq = {
        id: push.id as number,
        ty: push.ty ?? "",
        scene: push.scene ?? "",
        title: push.title ?? push.ty ?? "this capability",
        request: push.request ?? "",
        additional: push.additional ?? null,
      };
      setQueue((q) => (q.some((x) => x.id === req.id) ? q : [...q, req]));
    });
  }, []);

  const cur = queue[0];
  if (!cur) return null;

  const dequeue = () => setQueue((q) => q.filter((x) => x.id !== cur.id));
  const resolve = (allow: boolean) => {
    sendBridge("ResolvePermission", { id: cur.id, allow });
    dequeue();
  };

  const capability = cur.additional ? `${cur.title} — ${cur.additional}` : cur.title;

  return (
    <div className="pp__scrim" role="presentation">
      <SmartWearables
        name={cur.scene || "This scene"}
        capability={capability}
        recurring={SENSITIVE.has(cur.ty)}
        onDecision={(d) => resolve(d === "yes" || d === "once" || d === "always")}
      />
    </div>
  );
}
