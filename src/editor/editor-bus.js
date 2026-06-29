export const EDITOR_BUS_CHANNEL = "dcl-editor-bus";

const NULL_BUS = {
  ok: false,
  init() {},
  setTool() {},
  setSelection() {},
  setComponent() {},
  addComponent() {},
  addEntity() {},
  rpc() {
    return Promise.reject(new Error("editor bus unavailable"));
  },
  exportComposite() {
    return Promise.reject(new Error("editor bus unavailable"));
  },
  onMessage() {
    return () => {};
  },
  close() {},
};

const EDITOR_TOOLS = new Set(["select", "translate", "rotate", "scale"]);

export function createEditorBus() {
  if (typeof BroadcastChannel === "undefined") return NULL_BUS;

  let channel;
  try {
    channel = new BroadcastChannel(EDITOR_BUS_CHANNEL);
  } catch {
    return NULL_BUS;
  }

  const listeners = new Set();
  const pending = new Map();
  const token = Math.random().toString(36).slice(2, 10);
  let rpcSeq = 0;

  channel.onmessage = (ev) => {
    const env = ev && ev.data;
    if (!env || typeof env !== "object" || env.to !== "page" || !env.msg) return;
    const msg = env.msg;
    if (msg.type === "rpc-reply" && pending.has(msg.id)) {
      const { resolve, reject, timer } = pending.get(msg.id);
      pending.delete(msg.id);
      if (timer) clearTimeout(timer);
      if (msg.ok) resolve(msg.result);
      else reject(new Error(msg.error || "rpc failed"));
      return;
    }
    for (const cb of listeners) {
      try {
        cb(msg);
      } catch {
      }
    }
  };

  const post = (msg) => {
    try {
      channel.postMessage({ to: "scene", msg });
    } catch {
    }
  };

  return {
    ok: true,
    init() {
      post({ type: "init" });
    },
    setTool(tool) {
      if (EDITOR_TOOLS.has(tool)) post({ type: "set-tool", tool });
    },
    setSelection(selected, active) {
      post({
        type: "set-selection",
        selected: Array.isArray(selected) ? selected : [],
        active: active == null ? null : active,
      });
    },
    setComponent(entity, name, json) {
      if (entity == null || !name || typeof json !== "string") return;
      post({ type: "set-component", entity: String(entity), name, json });
    },
    addComponent(entity, name) {
      if (entity == null || !name) return;
      post({ type: "add-component", entity: String(entity), name });
    },
    addEntity(name, parent = 0, components = null) {
      post({
        type: "add-entity",
        name: String(name || "Entity"),
        parent: Number(parent) || 0,
        components: components && typeof components === "object" ? components : null,
      });
    },
    rpc(method, args = [], timeoutMs = 8000) {
      return new Promise((resolve, reject) => {
        const id = `${token}-${++rpcSeq}`;
        const timer = setTimeout(() => {
          if (pending.has(id)) {
            pending.delete(id);
            reject(new Error("rpc timeout: " + method));
          }
        }, timeoutMs);
        pending.set(id, { resolve, reject, timer });
        post({ type: "rpc", id, method, args });
      });
    },
    exportComposite(timeoutMs = 12000) {
      return this.rpc("exportComposite", [], timeoutMs);
    },
    onMessage(cb) {
      if (typeof cb !== "function") return () => {};
      listeners.add(cb);
      return () => listeners.delete(cb);
    },
    close() {
      listeners.clear();
      for (const { reject, timer } of pending.values()) {
        if (timer) clearTimeout(timer);
        try {
          reject(new Error("editor bus closed"));
        } catch {
        }
      }
      pending.clear();
      channel.onmessage = null;
      try {
        channel.close();
      } catch {
      }
    },
  };
}
