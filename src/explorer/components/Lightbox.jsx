import { useEffect } from "react";
import "./lightbox.css";

export default function Lightbox({ src, alt = "Photo", onClose }) {
  useEffect(() => {
    if (!src) return;
    const onKey = (e) => {
      if (e.key === "Escape") onClose?.();
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [src, onClose]);

  if (!src) return null;
  return (
    <div className="lb" role="dialog" aria-modal="true" onClick={onClose}>
      <button className="lb__close" aria-label="Close" onClick={onClose}>×</button>
      <img
        className="lb__img"
        src={src}
        alt={alt}
        onClick={(e) => e.stopPropagation()}
      />
    </div>
  );
}
