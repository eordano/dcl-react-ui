import { lazy, Suspense } from "react";
import { createHashRouter, Navigate } from "react-router";

import AppLayout from "./AppLayout.jsx";

const panelModules = import.meta.glob("./panels/*.route.jsx");

function idFromPath(p) {
  const m = p.match(/\/([^/]+)\.route\.jsx$/);
  return m ? m[1].toLowerCase() : p;
}

export const panelLoaders = Object.fromEntries(
  Object.entries(panelModules).map(([p, loader]) => [idFromPath(p), loader]),
);

export const panelIds = Object.keys(panelLoaders);

export function prefetchPanel(queryClient, id) {
  const loader = panelLoaders[id];
  if (!loader) return;
  loader()
    .then((mod) => {
      if (mod && typeof mod.prefetch === "function") {
        try {
          mod.prefetch(queryClient);
        } catch {
        }
      }
    })
    .catch(() => {
    });
}

const childRoutes = Object.entries(panelLoaders).map(([id, loader]) => {
  const Panel = lazy(loader);
  return { path: id, element: <Panel /> };
});

childRoutes.push({ index: true, element: null });

childRoutes.push({ path: "*", element: <Navigate to="/" replace /> });

export const router = createHashRouter([
  {
    path: "/",
    element: <AppLayout prefetchPanel={prefetchPanel} />,
    children: childRoutes,
  },
]);

export { Suspense };
