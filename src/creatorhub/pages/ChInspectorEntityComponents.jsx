import { useState } from "react";
import CreatorHubChrome from "../frames/CreatorHubChrome.jsx";
import "./chinspectorentitycomponents.css";

const Ico = {
  plus: (
    <svg viewBox="0 0 24 24" fill="none" aria-hidden="true">
      <path d="M12 5v14M5 12h14" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" />
    </svg>
  ),
  chevronDown: (
    <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true"><path d="M7 10l5 5 5-5z" /></svg>
  ),
  arrowDown: (
    <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true"><path d="M7 10l5 5 5-5z" /></svg>
  ),
  arrowRight: (
    <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true"><path d="M10 7l5 5-5 5z" /></svg>
  ),
  ellipsis: (
    <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
      <circle cx="5" cy="12" r="2" /><circle cx="12" cy="12" r="2" /><circle cx="19" cy="12" r="2" />
    </svg>
  ),
  help: (
    <svg viewBox="0 0 24 24" fill="none" aria-hidden="true">
      <circle cx="12" cy="12" r="9" stroke="currentColor" strokeWidth="2" />
      <path d="M9.5 9.2a2.5 2.5 0 1 1 3.2 2.4c-.7.3-1.2.9-1.2 1.7v.2M12 17h.01" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
    </svg>
  ),
  rename: (
    <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
      <path d="M3 17.25V21h3.75L17.81 9.94l-3.75-3.75L3 17.25zM20.71 7.04a1 1 0 000-1.41l-2.34-2.34a1 1 0 00-1.41 0l-1.83 1.83 3.75 3.75 1.83-1.83z" />
    </svg>
  ),
  trash: (
    <svg viewBox="0 0 24 24" fill="none" aria-hidden="true">
      <path d="M4 7h16M9 7V5a1 1 0 0 1 1-1h4a1 1 0 0 1 1 1v2M6 7l1 13a1 1 0 0 0 1 1h8a1 1 0 0 0 1-1l1-13" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  ),
  copy: (
    <svg viewBox="0 0 24 24" fill="none" aria-hidden="true">
      <rect x="9" y="9" width="11" height="11" rx="1.5" stroke="currentColor" strokeWidth="1.7" />
      <path d="M5 15V5a1 1 0 0 1 1-1h10" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" />
    </svg>
  ),
  paste: (
    <svg viewBox="0 0 24 24" fill="none" aria-hidden="true">
      <rect x="5" y="4" width="14" height="17" rx="1.5" stroke="currentColor" strokeWidth="1.7" />
      <path d="M9 4V3h6v1" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" />
    </svg>
  ),
  folder: (
    <svg viewBox="0 0 24 24" fill="none" aria-hidden="true">
      <path d="M3 6.5A1.5 1.5 0 0 1 4.5 5h4l2 2.5h9A1.5 1.5 0 0 1 21 9v8.5A1.5 1.5 0 0 1 19.5 19h-15A1.5 1.5 0 0 1 3 17.5v-11Z" stroke="currentColor" strokeWidth="1.6" strokeLinejoin="round" />
    </svg>
  ),
  cube: (
    <svg viewBox="0 0 24 24" fill="none" aria-hidden="true">
      <path d="M12 2l9 5v10l-9 5-9-5V7l9-5z" stroke="currentColor" strokeWidth="1.6" strokeLinejoin="round" />
      <path d="M12 12l9-5M12 12v10M12 12L3 7" stroke="currentColor" strokeWidth="1.6" strokeLinejoin="round" />
    </svg>
  ),
  custom: (
    <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
      <path d="M12 2l2.6 5.8 6.4.6-4.8 4.2 1.4 6.2L12 15.8 6.4 18.8l1.4-6.2L3 8.4l6.4-.6L12 2z" />
    </svg>
  ),
};

const TREE = [
  { id: 5, label: "Player", kind: "player" },
  { id: 6, label: "Camera", kind: "camera" },
  { id: 0, label: "Scene", kind: "group" },
  { id: 514, label: "Fountain", kind: "entity", depth: 1 },
  { id: 515, label: "Door", kind: "smart", depth: 1 },
  { id: 516, label: "Sign", kind: "entity", depth: 1, selected: true },
];

const ADD_OPTIONS = [
  { header: "3D Content" },
  { value: "GLTF", desc: "The GLTF assigns a 3D model file for the item's visible shape. It also handles collisions, to make an item clickable or block the player from walking through it." },
  { value: "Placeholder", desc: "Assigns a 3D model to visualize this entity in the editor. Has no effect when the scene runs. Not counted in scene metrics." },
  { value: "Material", desc: "Material determines the visual appearance of an object. It defines properties such as color, texture, and transparency", disabled: true },
  { value: "Visibility", desc: "Visibility controls whether an object is visible or not to the player. Items marked as invisible are shown on the editor, but not to players running the scene.", disabled: true },
  { value: "Mesh Renderer", desc: "Use MeshRenderer to assign a primitive 3D shape to the item. Instead of using a 3D file from GLTF, assign a simple cube, plane, sphere, or cylinder." },
  { value: "Light Source", desc: "Add a light source. Can be point (in all directions) or spot light (in a specific direction)." },
  { value: "Nft Shape", desc: "NftShape displays an image, gif, or video NFT as a framed picture", disabled: true },
  { header: "Interaction" },
  { value: "States", desc: "States specify the status of entities. Use triggers to check or change states, and set actions accordingly." },
  { value: "Triggers", desc: "Triggers activate actions based on player interactions like clicks, entering/exiting areas, or global events like \"on spawn\"." },
  { value: "Audio Source", desc: "AudioSource enables the playback of sound in your scene. The item emits sound that originates from its location, from an .mp3 file in your scene project" },
  { value: "Pointer Events", desc: "Use PointerEvents to configure the hints shown to players when they hover the cursor over the item." },
  { value: "Counter", desc: "Counter tracks numerical values that change based on player actions. Use it for conditional logic and to trigger actions when reaching certain values." },
];

function Container({ label, className = "", help, removable = true, defaultOpen = true, children }) {
  const [open, setOpen] = useState(defaultOpen);
  const [menu, setMenu] = useState(false);
  return (
    <div className={"cie__container " + (open ? "is-open " : "") + className}>
      <div className="cie__cttitle" onClick={() => setOpen((o) => !o)}>
        <span className="cie__chev">{open ? Ico.arrowDown : Ico.arrowRight}</span>
        <span className="cie__ctname">{label}</span>
        <span className="cie__ctright" onClick={(e) => e.stopPropagation()}>
          {help && (
            <span className="cie__help" title={help}>{Ico.help}</span>
          )}
          {removable && (
            <span className="cie__more">
              <button type="button" className="cie__morebtn" aria-label="More options" onClick={() => setMenu((m) => !m)}>
                {Ico.ellipsis}
              </button>
              {menu && (
                <div className="cie__menu" onClick={() => setMenu(false)}>
                  <button type="button" className="cie__menuitem">{Ico.copy} Copy values</button>
                  <button type="button" className="cie__menuitem">{Ico.paste} Paste values</button>
                  <button type="button" className="cie__menuitem is-remove">{Ico.trash} Delete Component</button>
                </div>
              )}
            </span>
          )}
        </span>
      </div>
      {open && <div className="cie__ctbody">{children}</div>}
    </div>
  );
}

function NumField({ leftLabel, value }) {
  return (
    <span className="cie__field">
      <span className="cie__input">
        <span className="cie__leftlbl">{leftLabel}</span>
        <span className="cie__inputtext">{value}</span>
      </span>
    </span>
  );
}

function DropField({ value }) {
  return (
    <span className="cie__field">
      <span className="cie__dropfield">
        <span>{value}</span>
        {Ico.chevronDown}
      </span>
    </span>
  );
}

function TransformInspector() {
  return (
    <Container label="Transform" className="is-transform" help="Transform defines the position, rotation, and scale of an entity in 3D space.">
      <div className="cie__block">
        <div className="cie__blockcontent">
          <span className="cie__lbl">Position</span>
          <NumField leftLabel="X" value="8" />
          <NumField leftLabel="Y" value="0" />
          <NumField leftLabel="Z" value="8" />
        </div>
      </div>
      <div className="cie__block">
        <div className="cie__blockcontent">
          <span className="cie__lbl">Rotation</span>
          <NumField leftLabel="X" value="0" />
          <NumField leftLabel="Y" value="90" />
          <NumField leftLabel="Z" value="0" />
        </div>
      </div>
      <div className="cie__block">
        <div className="cie__blockcontent">
          <span className="cie__scalerow">
            <span className="cie__lbl">Scale</span>
            <span className="cie__link" title="Proportional scaling">
              <svg viewBox="0 0 24 24" width="15" height="15" fill="none" aria-hidden="true">
                <path d="M7 7l-3 0 0 3M17 17l3 0 0-3M7 17l-3 0 0-3M17 7l3 0 0 3" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
                <rect x="9" y="9" width="6" height="6" rx="1" stroke="currentColor" strokeWidth="1.8" />
              </svg>
            </span>
          </span>
          <NumField leftLabel="X" value="1" />
          <NumField leftLabel="Y" value="1" />
          <NumField leftLabel="Z" value="1" />
        </div>
      </div>
    </Container>
  );
}

function GltfInspector() {
  return (
    <Container label="GLTF" help="The GLTF assigns a 3D model file for the item's visible shape.">
      <div className="cie__block">
        <div className="cie__column" style={{ flex: 1 }}>
          <span className="cie__lbl">Path</span>
          <span className="cie__file">
            <span className="cie__filepath">assets/scene/models/Sign.glb</span>
            <span className="cie__filebtn">{Ico.folder}</span>
          </span>
        </div>
      </div>
      <div className="cie__column">
        <span className="cie__lbl is-header">Collisions</span>
        <div className="cie__block">
          <div className="cie__blockcontent">
            <span className="cie__column" style={{ flex: 1, gap: 4 }}>
              <span className="cie__lbl">Visible layer</span>
              <DropField value="Physics and Pointer" />
            </span>
          </div>
        </div>
        <div className="cie__block">
          <div className="cie__blockcontent">
            <span className="cie__column" style={{ flex: 1, gap: 4 }}>
              <span className="cie__lbl">Invisible layer</span>
              <DropField value="None" />
            </span>
          </div>
        </div>
      </div>
    </Container>
  );
}

function VisibilityInspector() {
  return (
    <Container label="Visibility" help="Visibility controls whether an object is visible or not to the player.">
      <div className="cie__block">
        <div className="cie__blockcontent">
          <span className="cie__column" style={{ flex: 1, gap: 4 }}>
            <span className="cie__lbl">Visibility</span>
            <DropField value="Visible" />
          </span>
        </div>
      </div>
    </Container>
  );
}

function MeshColliderInspector() {
  return (
    <Container label="Mesh Collider" defaultOpen={false} help="MeshCollider defines the collision properties of an item.">
      <div className="cie__block">
        <div className="cie__blockcontent">
          <span className="cie__column" style={{ flex: 1, gap: 4 }}>
            <span className="cie__lbl">Shape</span>
            <DropField value="Box" />
          </span>
        </div>
      </div>
    </Container>
  );
}

function TextShapeInspector() {
  return (
    <Container label="Text Shape" defaultOpen={false} help="Use TextShape to display text in the 3D space">
      <div className="cie__block">
        <div className="cie__column" style={{ flex: 1 }}>
          <span className="cie__lbl">Value</span>
          <span className="cie__input">
            <span className="cie__inputtext">Welcome to Town Square</span>
          </span>
        </div>
      </div>
      <div className="cie__block">
        <div className="cie__blockcontent">
          <span className="cie__column" style={{ flex: 1, gap: 4 }}>
            <span className="cie__lbl">Font</span>
            <DropField value="Sans Serif" />
          </span>
          <span className="cie__column" style={{ width: 76, gap: 4 }}>
            <span className="cie__lbl">Size</span>
            <span className="cie__input"><span className="cie__inputtext">10</span></span>
          </span>
        </div>
      </div>
    </Container>
  );
}

function HierarchyRow({ node }) {
  const cube = "cie__cube" + (node.kind === "smart" ? " is-smart" : "");
  const leaf = node.kind !== "group";
  return (
    <div className={"cie__row" + (node.selected ? " is-selected" : "")} style={{ paddingLeft: 10 + (node.depth || 0) * 14 }}>
      <span style={{ width: 13, display: "inline-flex" }}>{leaf ? null : Ico.arrowDown}</span>
      <span className={cube}>{Ico.cube}</span>
      <span>{node.label}</span>
    </div>
  );
}

export default function ChInspectorEntityComponents({ active = "scenes" }) {
  const [addOpen, setAddOpen] = useState(false);
  const [headMenu, setHeadMenu] = useState(false);

  return (
    <CreatorHubChrome active={active}>
      <div className="cie">
        <div className="cie__context" aria-hidden="true">
          <div className="cie__hier">
            <div className="cie__hierhead">Entities</div>
            {TREE.map((n) => (
              <HierarchyRow key={n.id} node={n} />
            ))}
          </div>
          <div className="cie__viewport">
            <div className="cie__crate" />
          </div>
        </div>

        <aside className="cie__panel" aria-label="Entity components">
          <div className="cie__head">
            <div className="cie__titlewrap">
              <div className="cie__title">Sign</div>
              <div className="cie__rightcontent">
                <div className="cie__add">
                  <div className="cie__addtrigger" onClick={() => { setAddOpen((o) => !o); setHeadMenu(false); }}>
                    {Ico.plus}
                    {Ico.chevronDown}
                  </div>
                  {addOpen && (
                    <div className="cie__menu" onClick={() => setAddOpen(false)}>
                      {ADD_OPTIONS.map((o, i) =>
                        o.header ? (
                          <div key={i} className="cie__opthead">{o.header}</div>
                        ) : (
                          <div key={i} className={"cie__opt" + (o.disabled ? " is-disabled" : "")}>
                            <span className="cie__optname">{o.value}</span>
                            <span className="cie__optdesc">{o.desc}</span>
                          </div>
                        ),
                      )}
                    </div>
                  )}
                </div>
                <div className="cie__more">
                  <button type="button" className="cie__morebtn" aria-label="More options" onClick={() => { setHeadMenu((m) => !m); setAddOpen(false); }}>
                    {Ico.ellipsis}
                  </button>
                  {headMenu && (
                    <div className="cie__menu" onClick={() => setHeadMenu(false)}>
                      <button type="button" className="cie__menuitem">{Ico.rename} Rename Entity</button>
                      <button type="button" className="cie__menuitem is-remove">{Ico.trash} Delete Entity</button>
                    </div>
                  )}
                </div>
              </div>
            </div>
            <div className="cie__info">
              <div className="cie__instanceof">
                <span>Instance of:</span>
                <span className="cie__chip">{Ico.custom} Wooden Sign</span>
              </div>
              <div className="cie__tags">
                <span className="cie__tag">town-square</span>
                <span className="cie__tag">interactive</span>
              </div>
            </div>
          </div>

          <TransformInspector />
          <GltfInspector />
          <VisibilityInspector />
          <MeshColliderInspector />
          <TextShapeInspector />
        </aside>
      </div>
    </CreatorHubChrome>
  );
}
