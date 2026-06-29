import { useEffect } from "react";

export function useDialogKeys(paperRef, onClose) {
  useEffect(() => {
    const prev = document.activeElement;
    paperRef.current && paperRef.current.focus();
    function onKey(e) {
      if (e.key === "Escape") { onClose && onClose(); return; }
      if (e.key !== "Tab" || !paperRef.current) return;
      const f = paperRef.current.querySelectorAll(
        'a[href], button:not([disabled]), input:not([disabled]), select, textarea, [tabindex]:not([tabindex="-1"])'
      );
      if (!f.length) { e.preventDefault(); paperRef.current.focus(); return; }
      const first = f[0], last = f[f.length - 1];
      if (e.shiftKey && document.activeElement === first) { e.preventDefault(); last.focus(); }
      else if (!e.shiftKey && document.activeElement === last) { e.preventDefault(); first.focus(); }
    }
    document.addEventListener("keydown", onKey);
    return () => {
      document.removeEventListener("keydown", onKey);
      prev && prev.focus && prev.focus();
    };
  }, [paperRef, onClose]);
}
