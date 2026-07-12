import { StrictMode, Suspense } from "react";
import { createRoot } from "react-dom/client";
import { QueryClientProvider } from "@tanstack/react-query";

import { queryClient } from "../app/queryClient";

import "../atoms/primitives.css";
import "../styles.css";
import "../explorepanel.css";
import "../touch-targets.css";
import "../scene-backdrop.css";

if (import.meta.env.PROD) {
  globalThis.__UI3_ASSET_BASE__ = new URL(".", import.meta.url).href;
}

const isEditor =
  typeof window !== "undefined" &&
  /[?&](editorUi=1|preview=true)(?:&|$)/.test(window.location.search);

function mount(): void {
  void Promise.all([import("../app/BootGate"), import("../app/AppShell")]).then(
    ([{ default: BootGate }, { default: AppShell }]) => {
      let host = document.getElementById("ui3-overlay");
      if (!host) {
        host = document.createElement("div");
        host.id = "ui3-overlay";
        document.body.appendChild(host);
      }
      createRoot(host).render(
        <StrictMode>
          <QueryClientProvider client={queryClient}>
            <BootGate>
              <Suspense fallback={null}>
                <AppShell />
              </Suspense>
            </BootGate>
          </QueryClientProvider>
        </StrictMode>,
      );
    },
  );
}

if (isEditor) {
} else if (document.readyState === "loading") {
  document.addEventListener("DOMContentLoaded", mount, { once: true });
} else {
  mount();
}
