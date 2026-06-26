import { Suspense, useCallback, useEffect } from "react";
import { Outlet, useLocation, useNavigate } from "react-router";
import { useQueryClient } from "@tanstack/react-query";

import ExploreChrome, { EXPLORE_TABS } from "../explorer/frames/ExploreChrome.jsx";
import Sidebar from "../explorer/frames/Sidebar.jsx";
import { useBridgeState } from "../overlay/bridge.js";

// Map the data-sb-linkto strings present on ExploreChrome's tabs AND the Sidebar
// rail buttons to route ids, so we can drive nav + prefetch from delegated DOM
// events without modifying the reused components. Sidebar adds a few extra
// destinations beyond the explore tabs; ones with no matching route are no-ops.
const LINK_TO_ID = {
  "Explorer/Pages/Passport": "passport",
  "Explorer/Components/Notifications": "notifications",
  "Explorer/Pages/Friends": "friends",
  "Explorer/Pages/Backpack": "backpack",
};
for (const t of EXPLORE_TABS) {
  if (t.to) LINK_TO_ID[t.to] = t.id;
}

// hint-key -> route id (the [X][Z][M]… shortcuts shown on the explore tabs).
const HINT_TO_ID = {};
for (const t of EXPLORE_TABS) {
  if (t.hint) HINT_TO_ID[t.hint.toLowerCase()] = t.id;
}

function linkedId(target) {
  const el = target?.closest?.("[data-sb-linkto]");
  if (!el) return null;
  return LINK_TO_ID[el.getAttribute("data-sb-linkto")] ?? null;
}

function PanelFallback() {
  return <div className="xc__panel-loading" aria-busy="true" />;
}

/**
 * Single layout route. Two HUD states:
 *  - in-world (no panel, route "/"): render ONLY the Sidebar rail over the live
 *    3D world. No top-nav chrome — the world view stays clean.
 *  - in-menu (a panel route): render the ExploreChrome (top nav + tabs) with the
 *    active panel in its Outlet.
 * Panels open from: the Sidebar rail (primary), the explore tabs (once a menu is
 * open), or keyboard hint-keys (X/Z/M/I/K/P/O). Esc closes back to the world.
 */
export default function AppLayout({ prefetchPanel }) {
  const navigate = useNavigate();
  const location = useLocation();
  const queryClient = useQueryClient();
  const bridge = useBridgeState();

  const active = location.pathname.replace(/^\/+/, "").split("/")[0] || "";
  const user = bridge.identity?.name || "Guest";

  // Click a tab to open its panel; click the ACTIVE tab again to close back to
  // the world (the empty "/" HUD route). Makes the overlay toggle, not trap.
  const onTab = useCallback(
    (id) => navigate(id === active ? "/" : `/${id}`),
    [navigate, active],
  );

  // Hover/focus intent -> warm the target panel from cache.
  const onIntent = useCallback(
    (e) => {
      const id = linkedId(e.target);
      if (id && prefetchPanel) prefetchPanel(queryClient, id);
    },
    [prefetchPanel, queryClient],
  );

  // Delegated click: covers buttons that carry data-sb-linkto but no onClick of
  // their own (the Sidebar rail + the top-right avatar -> passport). Tab buttons
  // also call onTab; navigating to the same route twice is a harmless no-op.
  const onClickCapture = useCallback(
    (e) => {
      const id = linkedId(e.target);
      if (id) navigate(`/${id}`);
    },
    [navigate],
  );

  // Keyboard menu shortcuts. Capture on window so we intercept before the bevy
  // canvas (avatar input) sees the key; only the recognized menu keys are
  // swallowed, so WASD/chat keys still reach the engine. Skipped while typing.
  useEffect(() => {
    const onKey = (e) => {
      if (e.metaKey || e.ctrlKey || e.altKey) return;
      if (e.key === "Escape") {
        if (active) {
          navigate("/");
          e.preventDefault();
          e.stopImmediatePropagation();
        }
        return;
      }
      const ae = document.activeElement;
      if (
        ae &&
        (ae.tagName === "INPUT" ||
          ae.tagName === "TEXTAREA" ||
          ae.isContentEditable)
      )
        return;
      const id = HINT_TO_ID[e.key.toLowerCase()];
      if (id) {
        navigate(id === active ? "/" : `/${id}`);
        e.preventDefault();
        e.stopImmediatePropagation();
      }
    };
    window.addEventListener("keydown", onKey, true);
    return () => window.removeEventListener("keydown", onKey, true);
  }, [active, navigate]);

  return (
    <div
      className="ui3-app-root"
      onMouseOverCapture={onIntent}
      onFocusCapture={onIntent}
      onClickCapture={onClickCapture}
    >
      {active === "" ? (
        <>
          <Sidebar />
          <Outlet />
        </>
      ) : (
        <ExploreChrome active={active} onTab={onTab} user={user}>
          <Suspense fallback={<PanelFallback />}>
            <Outlet />
          </Suspense>
        </ExploreChrome>
      )}
    </div>
  );
}
