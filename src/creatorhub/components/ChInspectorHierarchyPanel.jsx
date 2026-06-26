import { useState } from "react";
import CreatorHubChrome from "../frames/CreatorHubChrome.jsx";
import { Section } from "../../atoms/icons.jsx";
import "./chinspectorhierarchypanel.css";

const PlayerGlyph = () => (
  <svg width="16" height="16" viewBox="0 0 16 16" fill="none" aria-hidden="true">
    <path d="M8.0008 3.00202C8.69166 3.00202 9.25172 2.44197 9.25172 1.7511C9.25172 1.06024 8.69166 0.500183 8.0008 0.500183C7.30993 0.500183 6.74988 1.06024 6.74988 1.7511C6.74988 2.44197 7.30993 3.00202 8.0008 3.00202Z" fill="currentColor" />
    <path d="M6.22806 9.23805L5.27806 14.6193C5.26099 14.7164 5.2632 14.8158 5.28459 14.912C5.30598 15.0082 5.34611 15.0993 5.40271 15.18C5.4593 15.2606 5.53124 15.3294 5.61441 15.3822C5.69759 15.4351 5.79036 15.4711 5.88744 15.4881C5.98414 15.5053 6.0833 15.5031 6.17916 15.4817C6.27503 15.4603 6.3657 15.4201 6.44592 15.3634C6.52614 15.3068 6.59432 15.2347 6.6465 15.1515C6.69869 15.0683 6.73385 14.9756 6.74994 14.8787L7.40619 11.1318V11.1381C7.40619 11.1381 7.56869 10.1224 7.95306 10.1224H8.04994C8.44056 10.1224 8.59681 11.1381 8.59681 11.1381V11.1349L9.25307 14.8818C9.28787 15.077 9.39879 15.2503 9.56142 15.3637C9.72405 15.4771 9.92507 15.5213 10.1203 15.4865C10.3154 15.4517 10.4888 15.3408 10.6022 15.1781C10.7156 15.0155 10.7598 14.8145 10.7249 14.6193L9.77494 9.23805L9.62181 8.30993C9.53119 7.7443 9.49056 6.82242 9.63744 6.4443C9.76244 6.1193 10.079 6.00055 10.3624 6.00055H13.2499C13.4489 6.00055 13.6396 5.92153 13.7803 5.78088C13.9209 5.64023 13.9999 5.44946 13.9999 5.25055C13.9999 5.05164 13.9209 4.86087 13.7803 4.72022C13.6396 4.57957 13.4489 4.50055 13.2499 4.50055H2.74994C2.55103 4.50055 2.36026 4.57957 2.21961 4.72022C2.07896 4.86087 1.99994 5.05164 1.99994 5.25055C1.99994 5.44946 2.07896 5.64023 2.21961 5.78088C2.36026 5.92153 2.55103 6.00055 2.74994 6.00055H5.64056C5.929 6.00055 6.24056 6.1193 6.36556 6.4443C6.51244 6.82242 6.47181 7.7443 6.38119 8.30993L6.22806 9.23805Z" fill="currentColor" />
  </svg>
);
const CameraGlyph = () => (
  <svg width="16" height="16" viewBox="0 0 16 16" fill="none" aria-hidden="true">
    <path d="M11.3333 7V4H2V12H11.3333V9L14 11.6667V4.33333L11.3333 7Z" fill="currentColor" />
  </svg>
);
const CameraTargetGlyph = () => (
  <svg width="16" height="16" viewBox="0 0 16 16" fill="none" aria-hidden="true">
    <g>
      <path d="M8 4.25501V3.31299" stroke="currentColor" strokeWidth="1.00189" strokeLinecap="round" strokeLinejoin="round" />
      <path d="M8 12.6924V11.7504" stroke="currentColor" strokeWidth="1.00189" strokeLinecap="round" strokeLinejoin="round" />
      <path d="M8 4.62585C7.33249 4.62585 6.67997 4.82379 6.12495 5.19464C5.56994 5.56549 5.13735 6.0926 4.88191 6.7093C4.62646 7.326 4.55963 8.0046 4.68985 8.65928C4.82008 9.31397 5.14151 9.91534 5.61352 10.3873C6.08552 10.8593 6.68689 11.1808 7.34157 11.311C7.99626 11.4412 8.67486 11.3744 9.29156 11.1189C9.90826 10.8635 10.4354 10.4309 10.8062 9.8759C11.1771 9.32089 11.375 8.66837 11.375 8.00085C11.375 7.10575 11.0194 6.2473 10.3865 5.61437C9.75355 4.98143 8.89511 4.62585 8 4.62585Z" stroke="currentColor" strokeWidth="1.00189" strokeMiterlimit="10" />
      <path d="M11.75 8.00061H12.692" stroke="currentColor" strokeWidth="1.00189" strokeLinecap="round" strokeLinejoin="round" />
      <path d="M3.3125 8.00061H4.25452" stroke="currentColor" strokeWidth="1.00189" strokeLinecap="round" strokeLinejoin="round" />
    </g>
  </svg>
);
const SpawnAreaGlyph = () => (
  <svg width="16" height="16" viewBox="0 0 16 16" fill="none" aria-hidden="true">
    <path d="M8 5.00012C8.55228 5.00012 9 5.44784 9 6.00012V10.1896C10.7251 10.4116 12 11.1932 12 12.1251L11.9951 12.2277C11.8882 13.2845 10.1402 14.1251 8 14.1251L7.59082 14.1144C5.64101 14.0153 4.10494 13.2163 4.00488 12.2277L4 12.1251C4 11.1932 5.27487 10.4116 7 10.1896V6.00012C7 5.44784 7.44772 5.00012 8 5.00012ZM7 10.6935C6.37213 10.7804 5.82192 10.9452 5.39551 11.1583C4.72488 11.4937 4.5 11.8643 4.5 12.1251C4.50014 12.386 4.72502 12.7567 5.39551 13.0919C6.03629 13.4122 6.95637 13.6251 8 13.6251C9.04362 13.6251 9.9637 13.4122 10.6045 13.0919C11.275 12.7567 11.4999 12.386 11.5 12.1251C11.5 11.8643 11.2751 11.4937 10.6045 11.1583C10.1781 10.9452 9.62781 10.7814 9 10.6945V11.0001C9 11.5524 8.55228 12.0001 8 12.0001C7.44772 12.0001 7 11.5524 7 11.0001V10.6935ZM8.04199 1.87512C8.61756 1.87512 9.08472 2.3416 9.08496 2.91711C9.08496 3.49284 8.61771 3.96008 8.04199 3.96008C7.46647 3.95984 7 3.49269 7 2.91711C7.00024 2.34175 7.46662 1.87536 8.04199 1.87512Z" fill="currentColor" />
  </svg>
);
const EntityGlyph = () => (
  <svg stroke="currentColor" fill="none" strokeWidth="1" viewBox="0 0 24 24" strokeLinecap="round" strokeLinejoin="round" height="16" width="16" aria-hidden="true">
    <path d="M21 16V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16z" />
  </svg>
);
const SmartGlyph = () => (
  <svg width="16" height="16" viewBox="0 0 49 49" fill="none" aria-hidden="true">
    <path d="M26.3726 19.8853H40.9149L19.4126 42.9218L23.5764 30.4306L24.0151 29.1144H22.6277H8.08527L29.5877 6.07778L25.4239 18.569L24.9852 19.8853H26.3726Z" stroke="currentColor" strokeWidth="2" />
  </svg>
);
const TileGlyph = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" aria-hidden="true">
    <path d="M9.6525 19.725L4.425 14.4975C4.28333 14.3558 4.17708 14.2 4.10625 14.03C4.03542 13.86 4 13.6829 4 13.4988C4 13.3146 4.03542 13.1375 4.10625 12.9675C4.17708 12.7975 4.28333 12.6417 4.425 12.5L9.3125 7.63375L7.06 5.38125L8.3775 4L16.8775 12.5C17.0192 12.6417 17.1219 12.7975 17.1856 12.9675C17.2494 13.1375 17.2813 13.3146 17.2813 13.4988C17.2813 13.6829 17.2494 13.86 17.1856 14.03C17.1219 14.2 17.0192 14.3558 16.8775 14.4975L11.65 19.725C11.5083 19.8667 11.3525 19.9729 11.1825 20.0438C11.0125 20.1146 10.8354 20.15 10.6513 20.15C10.4671 20.15 10.29 20.1146 10.12 20.0438C9.95 19.9729 9.79417 19.8667 9.6525 19.725ZM10.6513 8.9725L6.10375 13.52H15.1988L10.6513 8.9725ZM19.13 20.15C18.62 20.15 18.1879 19.9694 17.8338 19.6081C17.4796 19.2469 17.3025 18.8042 17.3025 18.28C17.3025 17.8975 17.3981 17.5363 17.5894 17.1963C17.7806 16.8563 17.9967 16.5233 18.2375 16.1975L19.13 15.05L20.065 16.1975C20.2917 16.5233 20.5042 16.8563 20.7025 17.1963C20.9008 17.5363 21 17.8975 21 18.28C21 18.8042 20.8158 19.2469 20.4475 19.6081C20.0792 19.9694 19.64 20.15 19.13 20.15Z" fill="currentColor" />
  </svg>
);
const CustomGlyph = () => (
  <svg width="16" height="16" viewBox="1 1 13 14" fill="none" aria-hidden="true">
    <path d="M13 10.3521V5.90763C12.9998 5.71279 12.9484 5.52142 12.8509 5.35272C12.7533 5.18403 12.6132 5.04395 12.4444 4.94652L8.55556 2.7243C8.38665 2.62678 8.19504 2.57544 8 2.57544C7.80496 2.57544 7.61335 2.62678 7.44444 2.7243L3.55556 4.94652C3.38681 5.04395 3.24666 5.18403 3.14915 5.35272C3.05163 5.52142 3.0002 5.71279 3 5.90763V10.3521C3.0002 10.5469 3.05163 10.7383 3.14915 10.907C3.24666 11.0757 3.38681 11.2158 3.55556 11.3132L7.44444 13.5354C7.61335 13.6329 7.80496 13.6843 8 13.6843C8.19504 13.6843 8.38665 13.6329 8.55556 13.5354L12.4444 11.3132C12.6132 11.2158 12.7533 11.0757 12.8509 10.907C12.9484 10.7383 12.9998 10.5469 13 10.3521Z" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" />
    <path d="M11 7.9298V6.32947C10.9999 6.25932 10.9793 6.19041 10.9403 6.12967C10.9013 6.06892 10.8453 6.01848 10.7778 5.9834L9.22222 5.18324C9.15466 5.14812 9.07802 5.12964 9 5.12964C8.92198 5.12964 8.84534 5.14812 8.77778 5.18324L7.22222 5.9834C7.15473 6.01848 7.09866 6.06892 7.05966 6.12967C7.02065 6.19041 7.00008 6.25932 7 6.32947V7.9298C7.00008 7.99996 7.02065 8.06887 7.05966 8.12961C7.09866 8.19035 7.15473 8.24079 7.22222 8.27587L8.77778 9.07604C8.84534 9.11115 8.92198 9.12964 9 9.12964C9.07802 9.12964 9.15466 9.11115 9.22222 9.07604L10.7778 8.27587C10.8453 8.24079 10.9013 8.19035 10.9403 8.12961C10.9793 8.06887 10.9999 7.99996 11 7.9298Z" fill="currentColor" />
  </svg>
);

const EyeIcon = () => (
  <svg viewBox="0 0 512 512" width="16" height="16" fill="none" stroke="currentColor" strokeWidth="32" aria-hidden="true">
    <path d="M255.66 112c-77.94 0-157.89 45.11-220.83 135.33a16 16 0 0 0-.27 17.77C82.92 340.8 161.8 400 255.66 400c92.84 0 173.34-59.38 221.4-135.25a16.14 16.14 0 0 0 0-17.47C428.89 172.28 347.8 112 255.66 112z" strokeLinecap="round" strokeLinejoin="round" />
    <circle cx="256" cy="256" r="80" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
);
const EyeOffIcon = () => (
  <svg viewBox="0 0 24 24" width="16" height="16" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
    <path d="M9.88 9.88a3 3 0 1 0 4.24 4.24" />
    <path d="M10.73 5.08A10.43 10.43 0 0 1 12 5c7 0 11 7 11 7a13.16 13.16 0 0 1-1.67 2.68" />
    <path d="M6.61 6.61A13.526 13.526 0 0 0 1 12s4 7 11 7a9.74 9.74 0 0 0 5.39-1.61" />
    <line x1="2" y1="2" x2="22" y2="22" />
  </svg>
);
const LockOpenIcon = () => (
  <svg viewBox="0 0 24 24" width="16" height="16" fill="currentColor" aria-hidden="true"><path d="M12 17a2 2 0 0 0 2-2 2 2 0 0 0-2-2 2 2 0 0 0-2 2 2 2 0 0 0 2 2m6-9a2 2 0 0 1 2 2v10a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2V10a2 2 0 0 1 2-2h9V6a3 3 0 0 0-3-3 3 3 0 0 0-3 3H7a5 5 0 0 1 5-5 5 5 0 0 1 5 5v2z" /></svg>
);
const WarningIcon = () => (
  <svg viewBox="0 0 24 24" width="14" height="14" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><path d="M10.29 3.86 1.82 18a2 2 0 0 0 1.71 3h16.94a2 2 0 0 0 1.71-3L13.71 3.86a2 2 0 0 0-3.42 0z" /><line x1="12" y1="9" x2="12" y2="13" /><line x1="12" y1="17" x2="12.01" y2="17" /></svg>
);
const InfoIcon = () => (
  <svg viewBox="0 0 24 24" width="14" height="14" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true"><circle cx="12" cy="12" r="10" /><line x1="12" y1="16" x2="12" y2="12" /><line x1="12" y1="8" x2="12.01" y2="8" strokeLinecap="round" /></svg>
);
const RenameIcon = () => (
  <svg viewBox="0 0 24 24" width="16" height="16" fill="currentColor" aria-hidden="true"><path d="M3 17.25V21h3.75L17.81 9.94l-3.75-3.75L3 17.25zM20.71 7.04a1 1 0 0 0 0-1.41l-2.34-2.34a1 1 0 0 0-1.41 0l-1.83 1.83 3.75 3.75 1.83-1.83z" /></svg>
);
const AddChildIcon = () => (
  <svg viewBox="0 0 24 24" width="16" height="16" fill="currentColor" aria-hidden="true"><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8l-6-6zm1 13h-2v2a1 1 0 0 1-2 0v-2H9a1 1 0 0 1 0-2h2v-2a1 1 0 0 1 2 0v2h2a1 1 0 0 1 0 2z" /></svg>
);
const DuplicateIcon = () => (
  <svg viewBox="0 0 24 24" width="16" height="16" fill="currentColor" aria-hidden="true"><path d="M16 1H4a2 2 0 0 0-2 2v14h2V3h12V1zm3 4H8a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h11a2 2 0 0 0 2-2V7a2 2 0 0 0-2-2z" /></svg>
);
const DeleteIcon = () => (
  <svg viewBox="0 0 24 24" width="16" height="16" fill="currentColor" aria-hidden="true"><path d="M6 19a2 2 0 0 0 2 2h8a2 2 0 0 0 2-2V7H6v12zM19 4h-3.5l-1-1h-5l-1 1H5v2h14V4z" /></svg>
);

function KindIcon({ kind }) {
  let glyph = <EntityGlyph />;
  let cls = "entity-icon";
  if (kind === "custom") { glyph = <CustomGlyph />; cls = "custom-icon"; }
  else if (kind === "group") { glyph = null; cls = "group-icon"; }
  else if (kind === "smart") { glyph = <SmartGlyph />; cls = "smart-icon"; }
  else if (kind === "tile") { glyph = <TileGlyph />; cls = "tile-icon"; }
  if (kind === "group") glyph = <EntityGlyph />;
  return <span className={"tree-icon " + cls}>{glyph}</span>;
}

function EntityRow({
  node,
  level,
  selected,
  hidden,
  open,
  onToggle,
  onSelect,
  onContext,
  renaming,
}) {
  const hasChildren = node.children && node.children.length > 0;
  return (
    <div
      className={"item" + (selected ? " selected" : "") + (hidden ? " hidden-entity" : "")}
      style={{ paddingLeft: level * 10 }}
      onClick={() => onSelect?.(node.id)}
      onContextMenu={(e) => { e.preventDefault(); onContext?.(node.id); }}
    >
      <div className="item-area">
        {hasChildren ? (
          <span
            className="disclosure"
            onClick={(e) => { e.stopPropagation(); onToggle?.(node.id); }}
          >
            <Section open={open} />
          </span>
        ) : (
          <span className="disclosure-spacer" />
        )}
        <div className="selectable-area">
          <KindIcon kind={node.kind} />
          {renaming ? (
            <input className="tree-edit" defaultValue={node.label} autoFocus />
          ) : (
            <div className="label">{node.label}</div>
          )}
          <div className="action-area">
            <span className="action-button" title="Lock"><LockOpenIcon /></span>
            <span className={"action-button" + (hidden ? " is-on" : "")} title={hidden ? "Show" : "Hide"}>
              {hidden ? <EyeOffIcon /> : <EyeIcon />}
            </span>
          </div>
          {node.outOfBounds && (
            <span className="WarningIcon" title="This entity is out of bounds and might not display correctly in-world.">
              <WarningIcon />
            </span>
          )}
        </div>
      </div>
    </div>
  );
}

function Subtree({ node, level, ctx }) {
  const open = ctx.openSet.has(node.id);
  return (
    <div className="Tree is-parent">
      <EntityRow
        node={node}
        level={level}
        selected={ctx.selectedId === node.id}
        hidden={!!node.hidden}
        open={open}
        onToggle={ctx.onToggle}
        onSelect={ctx.onSelect}
        onContext={ctx.onContext}
        renaming={ctx.renamingId === node.id}
      />
      {open && node.children && node.children.length > 0 && (
        <div>
          {node.children.map((child) => (
            <Subtree key={child.id} node={child} level={level + 1} ctx={ctx} />
          ))}
        </div>
      )}
    </div>
  );
}

const SCENE_TREE = {
  id: "root",
  label: "Scene",
  kind: "scene",
  children: [
    { id: "512", label: "Ground", kind: "tile" },
    {
      id: "513",
      label: "Buildings",
      kind: "group",
      children: [
        { id: "514", label: "Tower", kind: "entity" },
        { id: "515", label: "Shop", kind: "entity", outOfBounds: true },
        { id: "516", label: "Fountain", kind: "entity", hidden: true },
      ],
    },
    {
      id: "517",
      label: "Door",
      kind: "smart",
      children: [{ id: "518", label: "Hinge", kind: "entity" }],
    },
    { id: "519", label: "Treasure Chest", kind: "custom" },
    { id: "520", label: "NPC Wizard", kind: "smart" },
  ],
};

export default function ChInspectorHierarchyPanel({
  showContextMenu = false,
  renaming = false,
}) {
  const [selectedId, setSelectedId] = useState("517");
  const [openSet, setOpenSet] = useState(() => new Set(["root", "513", "517"]));
  const [playerOpen, setPlayerOpen] = useState(true);
  const [spawnOpen, setSpawnOpen] = useState(true);
  const [renamingId] = useState(renaming ? "514" : null);
  const [ctxFor] = useState(showContextMenu ? "517" : null);

  const toggle = (id) =>
    setOpenSet((prev) => {
      const next = new Set(prev);
      next.has(id) ? next.delete(id) : next.add(id);
      return next;
    });

  const ctx = {
    selectedId,
    openSet,
    renamingId,
    onToggle: toggle,
    onSelect: setSelectedId,
    onContext: () => {},
  };

  return (
    <CreatorHubChrome active="scenes">
      <div className="chinspectorhierarchypanel">
        <div className="chinspectorhierarchypanel__panel">
          <div className="chinspectorhierarchypanel__header">
            <button type="button" className="chinspectorhierarchypanel__tab is-active">
              Hierarchy
            </button>
            <button type="button" className="chinspectorhierarchypanel__tab">
              Components
            </button>
          </div>

          <div className="chinspectorhierarchypanel__tree">
            <div className="Tree">
              <div
                className={"item" + (selectedId === "player" ? " selected" : "")}
                style={{ paddingLeft: 0 }}
                onClick={() => setSelectedId("player")}
              >
                <div className="item-area">
                  <span className="disclosure" onClick={(e) => { e.stopPropagation(); setPlayerOpen((v) => !v); }}>
                    <Section open={playerOpen} />
                  </span>
                  <div className="selectable-area">
                    <span className="tree-icon player-icon"><PlayerGlyph /></span>
                    <div className="label">Player</div>
                    <div className="action-area">
                      <span className="info-dot" title="The player's avatar. Nested items are fixed to the player's position.">
                        <InfoIcon />
                      </span>
                    </div>
                  </div>
                </div>
              </div>

              {playerOpen && (
                <div className="Tree">
                  <div
                    className={"item" + (selectedId === "spawn-1" ? " selected" : "")}
                    style={{ paddingLeft: 10 }}
                    onClick={() => setSelectedId("spawn-1")}
                  >
                    <div className="item-area">
                      <span className="disclosure" onClick={(e) => { e.stopPropagation(); setSpawnOpen((v) => !v); }}>
                        <Section open={spawnOpen} />
                      </span>
                      <div className="selectable-area">
                        <span className="tree-icon spawn-area-icon"><SpawnAreaGlyph /></span>
                        <div className="label">
                          Spawn Point<span className="main-badge">(Main)</span>
                        </div>
                        <div className="action-area">
                          <span className="action-button" title="Hide"><EyeIcon /></span>
                        </div>
                      </div>
                    </div>
                  </div>

                  {spawnOpen && (
                    <div className="Tree">
                      <div className="item" style={{ paddingLeft: 20 }}>
                        <div className="item-area">
                          <span className="disclosure-spacer" />
                          <div className="selectable-area">
                            <span className="tree-icon camera-target-icon"><CameraTargetGlyph /></span>
                            <div className="label">Camera Target</div>
                          </div>
                        </div>
                      </div>
                    </div>
                  )}

                  <div
                    className={"item" + (selectedId === "spawn-2" ? " selected" : "")}
                    style={{ paddingLeft: 10 }}
                    onClick={() => setSelectedId("spawn-2")}
                  >
                    <div className="item-area">
                      <span className="disclosure-spacer" />
                      <div className="selectable-area">
                        <span className="tree-icon spawn-area-icon"><SpawnAreaGlyph /></span>
                        <div className="label">Spawn Point 2</div>
                        <div className="action-area">
                          <span className="action-button" title="Hide"><EyeIcon /></span>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              )}
            </div>

            <div className="Tree">
              <div
                className={"item" + (selectedId === "camera" ? " selected" : "")}
                style={{ paddingLeft: 0 }}
                onClick={() => setSelectedId("camera")}
              >
                <div className="item-area">
                  <span className="disclosure-spacer" />
                  <div className="selectable-area">
                    <span className="tree-icon camera-icon"><CameraGlyph /></span>
                    <div className="label">Camera</div>
                    <div className="action-area">
                      <span className="info-dot" title="The player's camera. Nested items remain fixed to the camera's position.">
                        <InfoIcon />
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <Subtree node={SCENE_TREE} level={0} ctx={ctx} />

            {ctxFor && (
              <div className="chinspectorhierarchypanel__ctx" style={{ top: 220, left: 130 }} role="menu">
                <button type="button" className="chinspectorhierarchypanel__ctxitem">
                  <RenameIcon /> Rename
                </button>
                <button type="button" className="chinspectorhierarchypanel__ctxitem">
                  <AddChildIcon /> Add child
                </button>
                <button type="button" className="chinspectorhierarchypanel__ctxitem">
                  <DuplicateIcon /> Duplicate
                </button>
                <button type="button" className="chinspectorhierarchypanel__ctxitem">
                  <DeleteIcon /> Delete
                </button>
              </div>
            )}
          </div>
        </div>

        <div className="chinspectorhierarchypanel__handle" />
        <div className="chinspectorhierarchypanel__stage">
          <div className="chinspectorhierarchypanel__stagehint">
            <div className="grid" />
            <span>Renderer viewport</span>
          </div>
        </div>
      </div>
    </CreatorHubChrome>
  );
}
