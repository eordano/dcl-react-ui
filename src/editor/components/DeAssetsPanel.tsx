import { useMemo, useState } from "react";
import type { DeCatalogItem, DeLocalItem } from "../types";
import { DeLeftTabs } from "./DeHierarchyPanel";
import { ModelGlyph } from "./DeIcons";

export interface DeAssetsPanelProps {
  tab?: "catalog" | "local";
  width?: number;
  catalog?: DeCatalogItem[];
  local?: DeLocalItem[];
  live?: boolean;
  onPlace?: (asset: DeCatalogItem) => void;
}

export function DeAssetsPanel({
  tab = "catalog",
  width = 300,
  catalog,
  local = [],
  live = false,
  onPlace = undefined,
}: DeAssetsPanelProps) {
  const [active, setActive] = useState(tab);
  return (
    <div className="eui-panel eui-left" style={{ width }}>
      {!live && <DeLeftTabs view="assets" />}
      <div className="eui-seg">
        {(["catalog", "local"] as const).map((t) => (
          <button
            key={t}
            className={"eui-seg-btn" + (active === t ? " active" : "")}
            onClick={() => setActive(t)}
          >
            {t === "catalog" ? "Catalog" : "Local"}
          </button>
        ))}
      </div>
      {active === "catalog" ? <DeCatalogTab items={catalog} live={live} onPlace={onPlace} /> : <DeLocalTab items={local} live={live} />}
    </div>
  );
}

function catOf(a: DeCatalogItem): string {
  return (a.category || a.pack || "").trim();
}

const CATALOG_RENDER_CAP = 240;

export interface DeCatalogTabProps {
  items?: DeCatalogItem[];
  live?: boolean;
  onPlace?: (asset: DeCatalogItem) => void;
}

export function DeCatalogTab({ items = [], live = false, onPlace = undefined }: DeCatalogTabProps) {
  const placeable = typeof onPlace === "function";
  const [query, setQuery] = useState("");
  const [cat, setCat] = useState("");

  const categories = useMemo(() => {
    const set = new Set<string>();
    for (const a of items) {
      const c = catOf(a);
      if (c) set.add(c);
    }
    return Array.from(set).sort((x, y) => x.localeCompare(y));
  }, [items]);

  const q = query.trim().toLowerCase();
  const filtered = useMemo(() => {
    return items.filter((a) => {
      if (cat && catOf(a) !== cat) return false;
      if (!q) return true;
      const hay = `${a.name || ""} ${catOf(a)} ${a.pack || ""}`.toLowerCase();
      return hay.includes(q);
    });
  }, [items, cat, q]);

  const shown = filtered.slice(0, CATALOG_RENDER_CAP);
  const truncated = filtered.length - shown.length;

  return (
    <>
      <div className="eui-search" style={{ display: "flex", gap: 6 }}>
        <input
          className="eui-input"
          style={{ flex: 1 }}
          placeholder="Search models…"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          spellCheck={false}
        />
        <select
          className="eui-input"
          style={{ width: 120, flex: "none" }}
          value={cat}
          aria-label="Filter by category"
          onChange={(e) => setCat(e.target.value)}
        >
          <option value="">All</option>
          {categories.map((c) => (
            <option key={c} value={c}>
              {c}
            </option>
          ))}
        </select>
      </div>
      <div className="eui-asset-count">
        {q || cat ? `${filtered.length} of ${items.length} models` : `${items.length} models`}
      </div>
      <div className="eui-panel-body" role="region" aria-label="Asset catalog" tabIndex={0}>
        <div className="eui-asset-grid">
          {filtered.length === 0 && (
            <div className="eui-empty" style={{ gridColumn: "1 / -1" }}>
              {items.length === 0
                ? "No models available"
                : `No models match${query.trim() ? ` “${query.trim()}”` : ""}`}
            </div>
          )}
          {shown.map((a) => (
            <div
              key={a.id}
              className={"eui-asset" + (live && !placeable ? " is-readonly" : "")}
              title={placeable ? `Place ${a.name} in the scene` : `${a.name} — ${catOf(a) || a.pack}`}
              onClick={placeable ? () => onPlace?.(a) : undefined}
            >
              <div
                className="thumb"
                style={
                  a.thumbnailUrl
                    ? undefined
                    : { background: `linear-gradient(150deg, hsl(${a.hue ?? 210} 60% 46%), hsl(${(a.hue ?? 210) + 30} 56% 28%))` }
                }
              >
                {a.thumbnailUrl ? (
                  <img
                    src={a.thumbnailUrl}
                    alt=""
                    loading="lazy"
                    style={{ width: "100%", height: "100%", objectFit: "contain" }}
                  />
                ) : (
                  <ModelGlyph />
                )}
              </div>
              <span className="name">{a.name}</span>
              <span className="pack">{catOf(a) || a.pack}</span>
            </div>
          ))}
          {truncated > 0 && (
            <div className="eui-asset-count" style={{ gridColumn: "1 / -1" }}>
              +{truncated} more — refine your search to see them
            </div>
          )}
        </div>
      </div>
    </>
  );
}

export interface DeLocalTabProps {
  items?: DeLocalItem[];
  live?: boolean;
}

export function DeLocalTab({ items = [], live = false }: DeLocalTabProps) {
  return (
    <>
      <div className="eui-search" style={{ display: "flex", gap: 6 }}>
        <input className="eui-input" style={{ flex: 1 }} placeholder="Filter local models…" defaultValue="" />
        <button className="eui-btn" title="Refresh" style={{ flex: "none" }}>↻</button>
      </div>
      <div className="eui-asset-count">{items.length} models in this project</div>
      <div className="eui-panel-body" role="region" aria-label="Project models" tabIndex={0}>
        <div className="eui-asset-grid">
          <label className={"eui-asset eui-asset-upload" + (live ? " is-readonly" : "")} title="Add a .glb / .gltf from your computer">
            <div className="glyph">+</div>
            <span className="name">Add model</span>
            <span className="pack">from your computer</span>
          </label>
          {items.length === 0 && (
            <div className="eui-empty" style={{ gridColumn: "1 / -1" }}>
              No models in this project yet — add a .glb / .gltf to place it in the scene.
            </div>
          )}
          {items.map((p) => {
            const name = (p.path.split("/").pop() ?? p.path).replace(/\.(glb|gltf)$/i, "");
            return (
              <div key={p.path} className={"eui-asset" + (live ? " is-readonly" : "")} title={`Place ${p.path}`}>
                <div className="glyph"><ModelGlyph /></div>
                <span className="name">{name}</span>
                <span className="pack">{p.folder || "model"}</span>
              </div>
            );
          })}
        </div>
      </div>
    </>
  );
}
