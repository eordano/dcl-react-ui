
export type NodeKind =
  | "route"
  | "state"
  | "modal"
  | "outcome"
  | "chip"
  | "external"
  | "jump"
  | "end"
  | "sep";

export type EdgeKind =
  | "click"
  | "load"
  | "auto"
  | "reversible"
  | "step";

export interface FlowNode {
  t: "node";
  kind: NodeKind;
  label: string;
  sub?: string;
  href?: string;
  title?: string;
  busy?: boolean;
  chains?: string[];
}

export interface FlowEdge {
  t: "edge";
  kind: EdgeKind;
  label?: string;
  work?: string;
  chains?: string[];
}

export type TrackItem = FlowNode | FlowEdge;

export interface Track {
  chain?: string;
  chips?: boolean;
  note?: string;
  items: TrackItem[];
  branches?: Track[];
}

export interface FlowSection {
  id: string;
  num: string;
  title: string;
  machines?: string[];
  blurb: string;
  tracks: Track[];
}


const node = (kind: NodeKind, label: string, o: Partial<FlowNode> = {}): FlowNode => ({
  t: "node",
  kind,
  label,
  ...o,
});
const route = (label: string, o: Partial<FlowNode> = {}) => node("route", label, { href: label, ...o });
const state = (label: string, o: Partial<FlowNode> = {}) => node("state", label, o);
const outcome = (label: string, o: Partial<FlowNode> = {}) => node("outcome", label, o);
const sep = (): FlowNode => node("sep", "·");

const click = (label: string, o: Partial<FlowEdge> = {}): FlowEdge => ({ t: "edge", kind: "click", label, ...o });
const load = (work?: string, o: Partial<FlowEdge> = {}): FlowEdge => ({ t: "edge", kind: "load", work, ...o });
const auto = (label: string, o: Partial<FlowEdge> = {}): FlowEdge => ({ t: "edge", kind: "auto", label, ...o });
const step = (): FlowEdge => ({ t: "edge", kind: "step" });

const EDITOR = (chains?: string[]) =>
  state("EDITOR", {
    href: "/creator-hub/scene-editor",
    sub: "/creator-hub/scene-editor",
    chains,
  });


export const SECTIONS: FlowSection[] = [
  {
    id: "entry",
    num: "01",
    title: "Entry & Home",
    blurb:
      "The hub shell at /create: rail navigation, the Start-building fast path, and sign-in.",
    tracks: [
      {
        chain: "home",
        items: [route("/create", { sub: "HOME" })],
        branches: [
          {
            chain: "home",
            chips: true,
            note: "the rail — Land ↗ and Names ↗ open external tabs; Curate is committee-only",
            items: [
              node("chip", "Home", { href: "/create" }),
              node("chip", "Scenes", { href: "/create/scenes" }),
              node("chip", "Templates", { href: "/create/templates" }),
              node("chip", "Collections", { href: "/create/wearables" }),
              node("chip", "Worlds", { href: "/creator-hub/manage" }),
              node("external", "Land"),
              node("external", "Names"),
              node("chip", "Metrics", { href: "/creator-hub/metrics" }),
              node("chip", "Learn", { href: "/create/learn" }),
              node("chip", "Curate", { href: "/create/curate", sub: "committee" }),
              node("chip", "⚙ Settings", { href: "/creator-hub/settings" }),
              node("chip", "Sign in", { title: "opens the sign-in modal — see below" }),
            ],
          },
          {
            chain: "start-building",
            items: [
              load("LOAD engine · “Loading scene editor…”", { label: "Start building" }),
              EDITOR(["start-building"]),
            ],
          },
          {
            chain: "see-all",
            items: [click("See All"), route("/create/scenes"), sep(), route("/create/learn")],
          },
          {
            chain: "sign-in",
            items: [
              click("Sign in"),
              node("modal", "SIGNIN_MODAL"),
              click("OTP / social"),
              outcome("signed-in"),
            ],
          },
        ],
      },
    ],
  },

  {
    id: "create",
    num: "02",
    title: "Create a Scene",
    machines: ["create-project", "delete-project"],
    blurb:
      "Template pick → confirm → scaffold on disk → open in the editor. Reopening a saved scene hydrates its composite. Deleting writes a signed tombstone.",
    tracks: [
      {
        chain: "template-flow",
        items: [
          route("/create/templates"),
          click("card"),
          node("modal", "CONFIRM_MODAL"),
          click("Create"),
          route("/creator-hub/create-project", { label: "/creator-hub/create-project?template=X" }),
        ],
        branches: [
          {
            chain: "template-flow",
            items: [click("Cancel / Esc"), outcome("back")],
          },
        ],
      },
      {
        chain: "template-flow",
        items: [
          route("/creator-hub/create-project", { sub: "machine: create-project" }),
          step(),
          state("NAMING", { sub: "name prefilled" }),
          click("Create"),
        ],
        branches: [
          {
            chain: "template-flow",
            items: [auto("template preselected"), load("folder picker"), state("SCAFFOLDING")],
          },
          {
            chain: "template-flow",
            items: [
              auto("no template"),
              click("pick"),
              state("TEMPLATING"),
              load(),
              state("SCAFFOLDING"),
            ],
          },
        ],
      },
      {
        chain: "template-flow",
        items: [
          state("SCAFFOLDING"),
          load("write files"),
          state("CREATED"),
          click("Open in editor"),
          EDITOR(["template-flow", "start-building"]),
        ],
        branches: [
          {
            chain: "scaffold-error",
            items: [
              auto("error"),
              state("ERROR"),
              click("Retry / Choose folder"),
              state("SCAFFOLDING"),
            ],
          },
        ],
      },
      {
        chain: "reopen",
        items: [
          route("/create/scenes"),
          load("hydrate composite", { label: "scene card" }),
          state("EDITOR", {
            href: "/creator-hub/scene-editor",
            sub: "reopen + continue",
          }),
        ],
        branches: [
          {
            chain: "reopen",
            chips: true,
            note: "empty state",
            items: [
              node("chip", "Import"),
              node("chip", "Templates", { href: "/create/templates" }),
              node("chip", "Sign in"),
            ],
          },
        ],
      },
      {
        chain: "delete",
        items: [
          route("/creator-hub/delete-project", { sub: "machine: delete-project" }),
          step(),
          state("CONFIRM"),
          load("signed tombstone", { label: "Delete" }),
          outcome("done", { sub: "?local=deleted | kept" }),
        ],
      },
    ],
  },

  {
    id: "editor",
    num: "03",
    title: "Editor Loop",
    machines: ["scene-editor-place-items"],
    blurb:
      "Boot, then the place-and-save loop; preview is an explicit Play. No auto-play — and Stop is not a reload.",
    tracks: [
      {
        chain: "start-building",
        items: [
          route("/creator-hub/scene-editor", { sub: "machine: scene-editor-place-items" }),
          load("BOOT"),
          state("EDITING"),
        ],
      },
      {
        chain: "save-loop",
        items: [
          state("EDITING"),
          click("Open Assets"),
          state("BROWSING"),
          click("place"),
          state("PLACING"),
          click("Create entity"),
          state("TRANSFORMING"),
          click("axes"),
          state("MODIFYING"),
          load("FSA write", { label: "Save" }),
          state("SAVED"),
          click("continue"),
          state("EDITING"),
        ],
      },
      {
        chain: "preview",
        note: "no auto-play; Stop ≠ reload",
        items: [
          state("EDITING"),
          load("“Loading preview…”", { label: "▶ Play" }),
          state("PREVIEW"),
          { t: "edge", kind: "reversible", label: "Pause / Play" },
          click("■ Stop"),
          state("EDITING"),
        ],
      },
      {
        chain: "exits",
        items: [
          state("EDITING"),
          click("Exit"),
          route("/create"),
          sep(),
          click("Publish"),
          node("jump", "deploy flow", { href: "#deploy" }),
        ],
      },
    ],
  },

  {
    id: "wearables",
    num: "04",
    title: "Wearables & Collections",
    machines: [
      "wearable-create-collection",
      "wearable-item-editor",
      "wearable-publish-collection",
    ],
    blurb:
      "Collections home, the new-collection wizard, per-item editing, and the publish flow (its Pay step is a disclosed stub).",
    tracks: [
      {
        chain: "collections",
        items: [route("/create/wearables", { sub: "COLLECTIONS home" })],
        branches: [
          {
            chain: "new-collection",
            items: [
              click("New collection"),
              route("/create/wearables/collections/new", {
                sub: "machine: wearable-create-collection",
              }),
              step(),
              state("NAMING", { sub: "⏎ submits · “third-party?” → ?type=linked" }),
              step(),
              state("ITEMS", { sub: "dropzone: .zip · .glb · .gltf · .png — remove" }),
              step(),
              state("REVIEW"),
              step(),
              state("SUBMITTING", { busy: true }),
              step(),
              state("DONE"),
              step(),
              outcome("detail"),
            ],
          },
          {
            chain: "collection-detail",
            items: [
              click("collection"),
              route("/create/wearables/collections/:id", {
                href: "/create/wearables",
                sub: "tabs: items ⇄ activity (?tab)",
                title: "parameterized — link opens the collections list",
              }),
            ],
            branches: [
              {
                chain: "item-editor",
                items: [
                  click("item row"),
                  route("/create/wearables/item-editor", { sub: "ITEM-EDITOR" }),
                  step(),
                  state("SELECT"),
                  step(),
                  state("MODEL"),
                  step(),
                  state("CATEGORY"),
                  step(),
                  state("RARITY"),
                  step(),
                  state("PRICE"),
                  load(undefined, { label: "Save" }),
                  outcome("done"),
                ],
              },
              {
                chain: "publish-collection",
                items: [
                  click("Publish"),
                  route("/create/wearables/publish", {
                    sub: "machine: wearable-publish-collection",
                  }),
                  step(),
                  state("SUMMARY"),
                  step(),
                  state("COST"),
                  step(),
                  state("TERMS"),
                  load("disclosed stub", { label: "Pay" }),
                  state("SUBMITTED"),
                ],
              },
            ],
          },
          {
            chain: "single-item",
            items: [
              click("item"),
              route("/create/wearables/items/:id", {
                href: "/create/wearables",
                title: "parameterized — link opens the collections list",
              }),
              click("Edit"),
              route("/create/wearables/item-editor?step=model", {
                href: "/create/wearables/item-editor?step=model",
              }),
            ],
          },
        ],
      },
    ],
  },

  {
    id: "worlds",
    num: "05",
    title: "Worlds",
    machines: ["manage-worlds", "worlds-storage", "world-settings", "world-permissions"],
    blurb:
      "Manage worlds, watch storage quota, edit settings (Unpublish is real), and grant permissions (commit is a disclosed simulation).",
    tracks: [
      {
        chain: "worlds-manage",
        items: [route("/creator-hub/manage")],
        branches: [
          {
            chain: "worlds-manage",
            items: [
              click("card"),
              outcome("settings / layout", { href: "/creator-hub/world-settings" }),
            ],
          },
          {
            chain: "storage",
            items: [
              click("Your Storage"),
              route("/creator-hub/worlds-storage", { sub: "storage panel" }),
            ],
          },
        ],
      },
      {
        chain: "storage",
        items: [
          route("/creator-hub/worlds-storage"),
          click("SELECT world"),
          state("QUOTA PANEL", { sub: "DAO-proposal link" }),
          sep(),
          node("external", "BUY MANA / LAND / NAME"),
        ],
      },
      {
        chain: "world-settings",
        items: [
          route("/creator-hub/world-settings", { sub: "machine: world-settings · tabs" }),
          load("invoke", { label: "Save" }),
          outcome("saved"),
        ],
        branches: [
          { chain: "world-settings", items: [click("Discard"), node("end", "")] },
          {
            chain: "world-settings",
            items: [load("real", { label: "Unpublish" }), node("end", "")],
          },
        ],
      },
      {
        chain: "world-permissions",
        items: [
          route("/creator-hub/world-permissions", { sub: "machine: world-permissions · tabs" }),
          click("invite / add collaborator / password ≥8+2num"),
          state("COMMIT", { busy: true, sub: "disclosed simulated" }),
        ],
      },
    ],
  },

  {
    id: "deploy",
    num: "06",
    title: "Deploy & Claim",
    machines: ["deploy-scene", "claim-name"],
    blurb:
      "Publish a scene to a World name via a signed deploy; claim a new name and come back with it preselected.",
    tracks: [
      {
        chain: "deploy",
        items: [
          route("/creator-hub/deploy-world", { sub: "machine: deploy-scene" }),
          step(),
          state("PICK NAME", { sub: "live · ?name= preselect" }),
          load("signed deploy", { label: "Deploy" }),
          state("SUCCESS"),
        ],
        branches: [
          {
            chain: "claim",
            items: [
              click("Claim name"),
              route("/creator-hub/claim-name", { sub: "marketplace claim" }),
              click("Use in Publish to World"),
              outcome("back with ?name"),
            ],
          },
        ],
      },
    ],
  },

  {
    id: "metrics",
    num: "07",
    title: "Metrics",
    machines: ["metrics"],
    blurb:
      "Signed-out hits a gate; creators get real cards — each card degrades to “Not available” on failure, EmptyState if there is nothing yet.",
    tracks: [
      {
        chain: "metrics",
        items: [route("/creator-hub/metrics")],
        branches: [
          { chain: "metrics", items: [auto("signed-out"), state("GATE")] },
          {
            chain: "metrics",
            note: "per-card “Not available” on failure · EmptyState if none",
            items: [
              auto("creator"),
              outcome("cards", { sub: "real: collections · on-sale · sales · visits" }),
            ],
          },
          {
            chain: "operator",
            items: [
              click("Operator tab"),
              outcome("live presence", { sub: "or “Presence unavailable”" }),
            ],
          },
        ],
      },
    ],
  },

  {
    id: "curate",
    num: "08",
    title: "Curation",
    machines: ["curate-committee"],
    blurb: "Committee-only review queue: pick a row, decide, back to the queue.",
    tracks: [
      {
        chain: "curate",
        items: [
          route("/create/curate", { sub: "committee only" }),
          step(),
          state("QUEUE", { sub: "filters ?status ?type ?assignee=me · search · sort" }),
          click("row"),
          state("REVIEW"),
          click("approve / reject + comment"),
          state("DECIDED"),
          step(),
          outcome("queue"),
        ],
      },
    ],
  },
];


export const STATS = (() => {
  const routes = new Set<string>();
  const states = new Set<string>();
  let clicks = 0;
  let loads = 0;

  const walk = (t: Track) => {
    for (const it of t.items) {
      if (it.t === "node") {
        if (it.kind === "route") routes.add(it.label);
        if (it.kind === "state" || it.kind === "modal") states.add(it.label);
        if (it.busy) loads += 1;
      } else {
        if (it.kind === "load") {
          loads += 1;
          if (it.label) clicks += 1;
        } else if (it.kind === "click" || it.kind === "reversible" || it.kind === "step") {
          clicks += 1;
        }
      }
    }
    t.branches?.forEach(walk);
  };
  SECTIONS.forEach((s) => s.tracks.forEach(walk));

  return { routes: routes.size, states: states.size, clicks, loads };
})();


export const ASCII_SOURCE = `# Creator Hub — click/state sitemap

Every edge is one user CLICK, or a LOAD⏳ when the transition invokes work >100ms
(engine boot, folder picker, signed deploy, scaffolding). States in CAPS are
machine states; \`/paths\` are routes. Verified against the 2026-07-04 story audit.

\`\`\`
/create (HOME)
├── rail: Home · Scenes · Templates · Collections ┃ Worlds · Land↗ · Names↗ · Metrics ┃ Learn
│         (+ Curate — committee only · ⚙ Settings · Sign in)
│
├─[Start building]──⏳ LOAD engine ("Loading scene editor…")──▶ EDITOR
├─[See All]────────▶ /create/scenes · /create/learn
├─[Sign in]────────▶ SIGNIN_MODAL ──[OTP/social]──▶ signed-in
│
├── /create/templates
│    └─[card]──▶ CONFIRM_MODAL ──[Create]──▶ /creator-hub/create-project?template=X
│                     └─[Cancel/Esc]──▶ back
├── /creator-hub/create-project        (machine: create-project)
│    NAMING ──[Create]─┬─ template preselected ──⏳ folder picker ──▶ SCAFFOLDING
│    (name prefilled)  └─ no template ──[pick]──▶ TEMPLATING ──⏳──▶ SCAFFOLDING
│    SCAFFOLDING ──⏳ write files ──▶ CREATED ──[Open in editor]──▶ EDITOR
│                        └─ error ──▶ ERROR ──[Retry]/[Choose folder]──▶ SCAFFOLDING
│
├── EDITOR  /creator-hub/scene-editor   (machine: scene-editor-place-items)
│    ⏳ BOOT ▶ EDITING ─[Open Assets]▶ BROWSING ─[place]▶ PLACING ─[Create entity]▶
│    TRANSFORMING ─[axes]▶ MODIFYING ─[Save]⏳ FSA write ▶ SAVED ─[continue]▶ EDITING
│    EDITING ─[▶ Play]⏳ "Loading preview…" ▶ PREVIEW ─[⏸ Pause]⇄[▶]─[■ Stop]▶ EDITING
│    ─[Exit]▶ /create · ─[Publish]▶ deploy flow      (no auto-play; Stop ≠ reload)
│
├── /create/scenes ── [scene card]──⏳ hydrate composite ──▶ EDITOR (reopen+continue)
│    └─ empty: [Import]/[Templates]/[Sign in]
│
├── /create/wearables (COLLECTIIONS)
│    ├─[New collection]▶ /collections/new   (machine: wearable-create-collection)
│    │   NAMING(⏎ submits; "third-party?"→?type=linked) ─▶ ITEMS(upload dropzone,
│    │   .zip/.glb/.gltf/.png, remove) ─▶ REVIEW ─▶ SUBMITTING⏳ ─▶ DONE ─▶ detail
│    ├─[collection]▶ /collections/:id  tabs items⇄activity (?tab)
│    │   ├─[item row]▶ ITEM-EDITOR: SELECT▶MODEL▶CATEGORY▶RARITY▶PRICE▶SAVE⏳▶ done
│    │   └─[Publish]▶ PUBLISH: SUMMARY▶COST▶TERMS▶PAY⏳(disclosed stub)▶ SUBMITTED
│    └─[item]▶ /items/:id ─[Edit]▶ item-editor?step=model
│
├── WORLDS
│    ├─ /creator-hub/manage ─[card]▶ settings/layout · ─[Your Storage]▶ storage panel
│    ├─ storage: SELECT world ▶ QUOTA panel (DAO-proposal link) · BUY MANA/LAND/NAME↗
│    ├─ world-settings: tabs ─[Save]⏳ invoke ▶ saved · [Discard] · [Unpublish]⏳ real
│    └─ world-permissions: tabs ─[invite]/[add collaborator]/[password ≥8+2num]─▶
│                          COMMIT⏳ (disclosed simulated)
│
├── /creator-hub/deploy-world  (machine: deploy-scene)
│    PICK NAME(live; ?name= preselect) ─[Deploy]⏳ signed deploy ─▶ SUCCESS
│    └─[Claim name]▶ marketplace claim ─▶ [Use in Publish to World]──back w/ ?name
│
├── /creator-hub/metrics   signed-out▶GATE · creator▶cards (real: collections/
│    on-sale/sales/visits · per-card "Not available" on failure · EmptyState if none)
│    └─ Operator tab: live presence or "Presence unavailable"
│
├── delete-project: CONFIRM ─[Delete]⏳ signed tombstone ▶ done (?local=deleted|kept)
└── /create/curate (committee): QUEUE(filters ?status ?type ?assignee=me, search,
     sort) ─[row]▶ REVIEW ─[approve/reject +comment]▶ DECIDED ─▶ queue
\`\`\`

Legend: \`[x]\` = click edge · \`⏳\` = >100ms invoked load (spinner/status shown) ·
\`⇄\` = reversible pair · \`↗\` = external tab. Orphans/gaps (metrics-funnel,
integration-create-entry, single items) are intentionally absent — not implemented.
`;
