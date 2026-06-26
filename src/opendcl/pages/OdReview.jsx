import OpenDclTerminal, { Line, Blank, Tok } from "../frames/OpenDclTerminal.jsx";

function Finding({ sev = "ok", glyph, children }) {
  return (
    <div className={"od-find od-find--" + sev}>
      <span className="od-find__sev">{glyph}</span>
      <span className="od-find__text">{children}</span>
    </div>
  );
}

export default function OdReview() {
  return (
    <OpenDclTerminal status={<>claude-sonnet-4</>}>
      <Line>
        Reviewed <Tok tone="accent">src/index.ts</Tok>,{" "}
        <Tok tone="accent">scene.json</Tok>, and 2 system files. Findings below,
        organized by severity.
      </Line>
      <Blank />

      <span className="od-h od-h--accent">SDK7 correctness</span>
      <Finding sev="ok" glyph="✓">Components created via the SDK7 ECS API — no deprecated SDK6 patterns.</Finding>
      <Finding sev="warn" glyph="⚠">
        <Tok tone="yellow">Transform.getMutable</Tok> called every frame in the spin
        system; cache the entity reference outside the loop.
      </Finding>

      <span className="od-h od-h--accent">Performance</span>
      <Finding sev="issue" glyph="✗">
        <Tok tone="accent">addSystem</Tok> queries all entities each tick — scope it
        with a component filter to avoid scanning the full ECS.
      </Finding>

      <span className="od-h od-h--accent">Scene limits</span>
      <Finding sev="ok" glyph="✓">18 entities / 4,200 triangles — well within the 1-parcel budget.</Finding>

      <span className="od-h od-h--accent">Code organization</span>
      <Finding sev="warn" glyph="⚠">
        Unused import <Tok tone="yellow">Quaternion</Tok> in src/index.ts.
      </Finding>

      <span className="od-h od-h--accent">Interactivity</span>
      <Finding sev="issue" glyph="✗">
        Door pointer-event handler is registered but never removed — clean it up on
        scene teardown to avoid leaks.
      </Finding>

      <span className="od-h od-h--accent">Common mistakes</span>
      <Finding sev="ok" glyph="✓">main() is exported correctly and import paths resolve.</Finding>

      <span className="od-h od-h--accent">TypeScript</span>
      <Finding sev="warn" glyph="⚠">
        Spin delta typed as <Tok tone="yellow">any</Tok>; prefer the SDK
        <Tok tone="dim"> Vector3 </Tok> type.
      </Finding>

      <Blank />
      <Line tone="dim">2 critical · 3 warnings · 3 ok — want me to fix the criticals?</Line>
    </OpenDclTerminal>
  );
}
