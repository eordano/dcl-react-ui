import { useEffect, useRef, useState } from "react";
import Toggle from "../atoms/Toggle.jsx";
import { Avatar, WalletChip } from "../atoms/primitives.jsx";
import "./contextmenu.css";

function shortAddress(a) {
  if (typeof a !== "string" || a.length <= 13) return a;
  return a.slice(0, 6) + "…" + a.slice(-4);
}

export default function ContextMenu({ items = [], onClose, autoFocus = false }) {
  const rootRef = useRef(null);

  const enabledItems = () =>
    rootRef.current
      ? Array.from(rootRef.current.querySelectorAll('[role="menuitem"]:not(:disabled)'))
      : [];

  useEffect(() => {
    if (!autoFocus) return;
    const els = enabledItems();
    els.forEach((el, i) => { el.tabIndex = i === 0 ? 0 : -1; });
    if (els[0]) els[0].focus();
  }, [autoFocus]);

  function onKeyDown(e) {
    if (e.key === "Escape") {
      e.preventDefault();
      onClose?.();
      return;
    }
    const els = enabledItems();
    if (els.length === 0) return;
    const cur = els.indexOf(document.activeElement);
    let next;
    if (e.key === "ArrowDown") next = cur < 0 ? 0 : (cur + 1) % els.length;
    else if (e.key === "ArrowUp") next = cur < 0 ? els.length - 1 : (cur - 1 + els.length) % els.length;
    else if (e.key === "Home") next = 0;
    else if (e.key === "End") next = els.length - 1;
    else return;
    e.preventDefault();
    els.forEach((el, i) => { el.tabIndex = i === next ? 0 : -1; });
    els[next].focus();
  }

  return (
    <div className="ctx" role="menu" ref={rootRef} onKeyDown={onKeyDown}>
      {items.map((it, i) => {
        if (it.kind === "separator") return <div className="ctx__sep" key={i} />;
        if (it.kind === "title") {
          return <div className="ctx__title" key={i}>{it.label}</div>;
        }
        if (it.kind === "caption") {
          return (
            <div className="ctx__caption" key={i}>
              {it.avatar != null && <Avatar hue={it.hue ?? 280} size={20} />}
              <span className="ctx__captionlabel">{it.label}</span>
            </div>
          );
        }
        if (it.kind === "header") {
          return (
            <div className="ctx__header" key={i}>
              <Avatar hue={it.hue ?? 280} size={42} />
              <div className="ctx__hinfo">
                <div className="ctx__hname u-truncate">{it.name}<span className="ctx__htag">{it.tag}</span></div>
                <WalletChip address={shortAddress(it.address)} />
              </div>
            </div>
          );
        }
        if (it.kind === "toggle") return <ToggleItem item={it} key={i} />;
        return (
          <button
            className={"ctx__item" + (it.danger ? " ctx__item--danger" : "") + (it.disabled ? " ctx__item--disabled" : "")}
            role="menuitem" key={i}
            data-sb-linkto={it.to || undefined}
            onClick={it.onClick}
            disabled={it.disabled}
            aria-disabled={it.disabled || undefined}
          >
            {it.icon && <span className="ctx__icon">{it.icon}</span>}
            <span className="ctx__label">{it.label}</span>
            {it.kind === "submenu" && <span className="ctx__chev">›</span>}
          </button>
        );
      })}
    </div>
  );
}

function ToggleItem({ item }) {
  const [on, setOn] = useState(!!item.checked);
  function change(next) { setOn(next); item.onChange && item.onChange(next); }
  return (
    <label
      className="ctx__item ctx__item--toggle"
      role="menuitemcheckbox" aria-checked={on}
    >
      {item.icon && <span className="ctx__icon">{item.icon}</span>}
      <span className="ctx__label">{item.label}</span>
      <Toggle checked={on} onChange={change} />
    </label>
  );
}
