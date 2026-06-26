import { createRoot } from "react-dom/client";
import Overlay from "./Overlay.jsx";

function mount() {
  let host = document.getElementById("ui3-overlay");
  if (!host) {
    host = document.createElement("div");
    host.id = "ui3-overlay";
    document.body.appendChild(host);
  }
  createRoot(host).render(<Overlay />);
}

if (document.readyState === "loading") {
  document.addEventListener("DOMContentLoaded", mount, { once: true });
} else {
  mount();
}
