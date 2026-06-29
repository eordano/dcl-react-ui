import { useMemo, useState } from "react";

function actionsIdFor(entityId) {
  const n = parseInt(String(entityId ?? ""), 10);
  return Number.isFinite(n) && n > 0 ? n : 1;
}

function num(v, fallback) {
  const n = typeof v === "number" ? v : parseFloat(v);
  return Number.isFinite(n) ? n : fallback;
}

const TRIGGERS = [
  { id: "on_click", label: "Item is clicked" },
  { id: "on_input_action", label: "Primary button is pressed (E)" },
];

const ACTIONS = [
  {
    id: "start_tween",
    label: "Move the item",
    hint: "Smoothly tween the item to a new position",
    fields: [
      { key: "x", label: "X", kind: "num", def: 0 },
      { key: "y", label: "Y", kind: "num", def: 1 },
      { key: "z", label: "Z", kind: "num", def: 0 },
      { key: "duration", label: "Duration (s)", kind: "num", def: 1 },
      { key: "relative", label: "Relative to current", kind: "bool", def: true },
    ],
    compose: (f) => ({
      type: "move_item",
      end: { x: num(f.x, 0), y: num(f.y, 0), z: num(f.z, 0) },
      interpolationType: "linear",
      duration: num(f.duration, 1),
      relative: !!f.relative,
    }),
  },
  {
    id: "set_visibility",
    label: "Show / hide the item",
    hint: "Toggle whether the item is visible",
    fields: [{ key: "visible", label: "Visible", kind: "bool", def: true }],
    compose: (f) => ({ visible: !!f.visible }),
  },
  {
    id: "play_sound",
    label: "Play a sound",
    hint: "Play an audio clip from the scene",
    fields: [
      { key: "src", label: "Sound file", kind: "text", def: "", placeholder: "sounds/click.mp3", required: true },
      { key: "volume", label: "Volume", kind: "num", def: 1 },
      { key: "loop", label: "Loop", kind: "bool", def: false },
    ],
    compose: (f) => ({ src: String(f.src ?? "").trim(), volume: num(f.volume, 1), loop: !!f.loop }),
  },
  {
    id: "play_animation",
    label: "Play an animation",
    hint: "Play a clip from the item's GLTF model",
    fields: [
      { key: "animation", label: "Clip name", kind: "text", def: "", placeholder: "Action", required: true },
      { key: "loop", label: "Loop", kind: "bool", def: false },
    ],
    compose: (f) => ({ animation: String(f.animation ?? "").trim(), loop: !!f.loop }),
  },
];

function defaultsFor(action) {
  const out = {};
  for (const fld of action.fields) out[fld.key] = fld.def;
  return out;
}

function PropRow({ label, children }) {
  return (
    <div className="eui-prop">
      <span className="plabel">{label}</span>
      <span className="pvalue">{children}</span>
    </div>
  );
}

function Field({ field, value, onChange }) {
  if (field.kind === "bool") {
    return (
      <PropRow label={field.label}>
        <span
          className={"eui-toggle" + (value ? " on" : "")}
          role="button"
          tabIndex={0}
          title="Toggle"
          onClick={() => onChange(!value)}
          onKeyDown={(e) => {
            if (e.key === "Enter" || e.key === " ") onChange(!value);
          }}
        />
      </PropRow>
    );
  }
  if (field.kind === "num") {
    return (
      <PropRow label={field.label}>
        <span className="eui-axis">
          <span className="ax">N</span>
          <input
            className="eui-num"
            value={value ?? ""}
            spellCheck={false}
            onChange={(e) => onChange(e.target.value)}
          />
        </span>
      </PropRow>
    );
  }
  return (
    <PropRow label={field.label}>
      <input
        className="eui-input"
        value={value ?? ""}
        placeholder={field.placeholder || ""}
        spellCheck={false}
        onChange={(e) => onChange(e.target.value)}
      />
    </PropRow>
  );
}

export default function DeInteractionsPanel({
  entityId = "0",
  entityName = null,
  onWrite = null,
  existingActions = null,
  existingTriggers = null,
}) {
  const [triggerType, setTriggerType] = useState(TRIGGERS[0].id);
  const [actionId, setActionId] = useState(ACTIONS[0].id);
  const [fields, setFields] = useState(() => defaultsFor(ACTIONS[0]));
  const [name, setName] = useState("");
  const [added, setAdded] = useState([]);
  const [status, setStatus] = useState("");

  const action = useMemo(() => ACTIONS.find((a) => a.id === actionId) ?? ACTIONS[0], [actionId]);

  const pickAction = (id) => {
    const next = ACTIONS.find((a) => a.id === id) ?? ACTIONS[0];
    setActionId(next.id);
    setFields(defaultsFor(next));
    setStatus("");
  };

  const setField = (key, v) => setFields((prev) => ({ ...prev, [key]: v }));

  const compose = () => {
    const actionName = name.trim() || action.label;
    const baseActions = existingActions && typeof existingActions === "object" ? existingActions : null;
    const id = baseActions && Number.isFinite(baseActions.id) ? baseActions.id : actionsIdFor(entityId);
    const actionEntry = {
      name: actionName,
      type: action.id,
      jsonPayload: JSON.stringify(action.compose(fields)),
    };
    const actionsValue = [...(Array.isArray(baseActions?.value) ? baseActions.value : []), actionEntry];
    const actionsJson = JSON.stringify({ id, value: actionsValue });

    const baseTriggers = existingTriggers && typeof existingTriggers === "object" ? existingTriggers : null;
    const triggerEntry = { type: triggerType, actions: [{ id, name: actionName }] };
    const triggersValue = [...(Array.isArray(baseTriggers?.value) ? baseTriggers.value : []), triggerEntry];
    const triggersJson = JSON.stringify({ value: triggersValue });

    return { actionName, actionsJson, triggersJson };
  };

  const valid = action.fields.every((f) => {
    if (!f.required) return true;
    return String(fields[f.key] ?? "").trim() !== "";
  });

  const confirm = () => {
    if (!valid) {
      setStatus("Fill the required field first");
      return;
    }
    const { actionName, actionsJson, triggersJson } = compose();
    try {
      onWrite?.("asset-packs::Actions", actionsJson);
      onWrite?.("asset-packs::Triggers", triggersJson);
      const triggerLabel = TRIGGERS.find((t) => t.id === triggerType)?.label ?? triggerType;
      setAdded((prev) => [...prev, { trigger: triggerLabel, action: actionName, actionsJson, triggersJson }]);
      setStatus(onWrite ? "✓ Interaction added" : "✓ Composed (preview — not wired)");
      setName("");
    } catch (e) {
      setStatus("Failed to author: " + String(e));
    }
  };

  const preview = useMemo(() => {
    const { actionsJson, triggersJson } = compose();
    return { actionsJson, triggersJson };
  }, [triggerType, actionId, fields, name, existingActions, existingTriggers, entityId]);

  return (
    <div className="eui-comp" style={{ borderColor: "var(--primary-border)" }}>
      <div className="eui-comp-head" style={{ cursor: "default" }}>
        <span className="name">
          <span className="ns">Smart Item / </span>
          Add interaction
        </span>
        <span className="spacer" />
        <span className="eui-id-badge" title="Authoring on this entity">#{entityId}</span>
      </div>
      <div className="eui-comp-body">
        <div className="eui-comp-note" style={{ marginTop: 0 }}>
          Make {entityName ? `“${entityName}”` : "this item"} interactive — pick what
          happens and when. No code.
        </div>

        <div className="eui-group-label">when</div>
        <PropRow label="Trigger">
          <select
            className="eui-select"
            value={triggerType}
            onChange={(e) => setTriggerType(e.target.value)}
          >
            {TRIGGERS.map((t) => (
              <option key={t.id} value={t.id}>
                {t.label}
              </option>
            ))}
          </select>
        </PropRow>

        <div className="eui-group-label">do</div>
        <PropRow label="Action">
          <select className="eui-select" value={actionId} onChange={(e) => pickAction(e.target.value)}>
            {ACTIONS.map((a) => (
              <option key={a.id} value={a.id}>
                {a.label}
              </option>
            ))}
          </select>
        </PropRow>
        <div className="eui-comp-note" style={{ marginTop: 2 }}>{action.hint}</div>

        {action.fields.map((f) => (
          <Field key={f.key} field={f} value={fields[f.key]} onChange={(v) => setField(f.key, v)} />
        ))}

        <PropRow label="Name">
          <input
            className="eui-input"
            value={name}
            placeholder={action.label}
            spellCheck={false}
            onChange={(e) => setName(e.target.value)}
          />
        </PropRow>

        <div style={{ display: "flex", gap: 6, alignItems: "center", marginTop: 8 }}>
          <button className="eui-btn primary" style={{ height: 24 }} disabled={!valid} onClick={confirm}>
            Add interaction
          </button>
          {status !== "" && (
            <span
              className={"eui-comp-status " + (status.startsWith("✓") ? "ok" : "err")}
              style={{ margin: 0 }}
            >
              {status}
            </span>
          )}
        </div>

        {added.length > 0 && (
          <div style={{ marginTop: 10 }}>
            <div className="eui-group-label">on this item</div>
            {added.map((a, i) => (
              <div key={i} className="eui-prop">
                <span className="plabel" style={{ color: "var(--text-2)" }}>
                  {a.trigger}
                </span>
                <span className="pvalue" style={{ justifyContent: "flex-start" }}>
                  → {a.action}
                </span>
              </div>
            ))}
          </div>
        )}

        <details style={{ marginTop: 10 }}>
          <summary className="eui-link" style={{ cursor: "pointer" }}>
            component json
          </summary>
          <textarea
            className="eui-raw"
            readOnly
            spellCheck={false}
            value={
              "asset-packs::Actions\n" +
              pretty(preview.actionsJson) +
              "\n\nasset-packs::Triggers\n" +
              pretty(preview.triggersJson)
            }
          />
        </details>
      </div>
    </div>
  );
}

function pretty(json) {
  try {
    return JSON.stringify(JSON.parse(json), null, 2);
  } catch {
    return json;
  }
}
