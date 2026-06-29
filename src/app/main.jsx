import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { QueryClientProvider } from "@tanstack/react-query";
import { RouterProvider } from "react-router";

import { queryClient } from "./queryClient.js";
import { router } from "./router.jsx";
import BootGate from "./BootGate.jsx";

import "../atoms/primitives.css";
import "../styles.css";
import "../explorepanel.css";
import "../touch-targets.css";
import "../scene-backdrop.css";

function mount() {
  let host = document.getElementById("root");
  if (!host) {
    host = document.createElement("div");
    host.id = "root";
    document.body.appendChild(host);
  }
  createRoot(host).render(
    <StrictMode>
      <QueryClientProvider client={queryClient}>
        <BootGate>
          <RouterProvider router={router} />
        </BootGate>
      </QueryClientProvider>
    </StrictMode>,
  );
}

if (document.readyState === "loading") {
  document.addEventListener("DOMContentLoaded", mount, { once: true });
} else {
  mount();
}
