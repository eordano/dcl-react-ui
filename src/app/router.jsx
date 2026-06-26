import { lazy, Suspense } from "react";
import { createHashRouter, Navigate } from "react-router";

import AppLayout from "./AppLayout.jsx";

// -----------------------------------------------------------------------------
// PANEL REGISTRY (zero shared-file edits for the Panels phase)
//
// Every file matching src/app/panels/*.route.jsx is auto-discovered here via
// Vite's import.meta.glob. Panel agents ONLY add a new file under panels/ — they
// never touch this router. The route id (and url path) is derived from the
// filename: "Map.route.jsx" -> id "map" -> hash route "#/map".
//
// Hash routing (createHashRouter) is deliberate: the bevy host owns
// window.location.pathname + ?panel=/?action= and rewrites it via
// history.replaceState, so a path/query router would collide. The hash never does.
// -----------------------------------------------------------------------------

const panelModules = import.meta.glob("./panels/*.route.jsx");

function idFromPath(p) {
  const m = p.match(/\/([^/]+)\.route\.jsx$/);
  return m ? m[1].toLowerCase() : p;
}

// id -> dynamic-import loader. Used both by React.lazy (render) and by
// prefetchPanel (hover/intent warming) so they share the same module instance.
export const panelLoaders = Object.fromEntries(
  Object.entries(panelModules).map(([p, loader]) => [idFromPath(p), loader]),
);

export const panelIds = Object.keys(panelLoaders);

/**
 * Warm a panel on hover/focus intent: kick off its JS chunk download AND, once
 * loaded, run its optional `prefetch(queryClient)` export to fill the query
 * cache — so the click renders instantly from memory. Safe to call repeatedly.
 */
export function prefetchPanel(queryClient, id) {
  const loader = panelLoaders[id];
  if (!loader) return;
  loader()
    .then((mod) => {
      if (mod && typeof mod.prefetch === "function") {
        try {
          mod.prefetch(queryClient);
        } catch {
          /* prefetch is best-effort */
        }
      }
    })
    .catch(() => {
      /* chunk warm is best-effort */
    });
}

const childRoutes = Object.entries(panelLoaders).map(([id, loader]) => {
  const Panel = lazy(loader);
  return { path: id, element: <Panel /> };
});

// Landing route: render NOTHING (a transparent HUD) so the bevy 3D world is the
// default view; panels open on demand via the nav (or hotkeys). This is what
// makes the SPA an overlay over the client rather than a full-screen app.
childRoutes.push({ index: true, element: null });

// Catch-all -> landing.
childRoutes.push({ path: "*", element: <Navigate to="/" replace /> });

export const router = createHashRouter([
  {
    path: "/",
    element: <AppLayout prefetchPanel={prefetchPanel} />,
    children: childRoutes,
  },
]);

// Re-export so a panel can pull the shared Suspense wrapper if it wants nested
// lazy boundaries; the layout already wraps the Outlet in Suspense.
export { Suspense };
