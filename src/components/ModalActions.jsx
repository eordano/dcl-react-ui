import { Children, isValidElement, Fragment } from "react";
import "./dialogactions.css";

// Flatten children, unwrapping fragments, so `equal` mode produces one column per
// button even when actions are passed as <>…</> (which React reports as a single
// child). Without this a fragment collapses into one column and the buttons stack.
function flattenChildren(children) {
  const out = [];
  Children.forEach(children, (child) => {
    if (child == null || child === false) return;
    if (isValidElement(child) && child.type === Fragment) {
      out.push(...flattenChildren(child.props.children));
    } else {
      out.push(child);
    }
  });
  return out;
}

export default function ModalActions({
  children,
  lead,
  equal = false,
  direction = "row",
  align = "stretch",
  className = "",
}) {
  const isColumn = direction === "column";
  const justify =
    align === "start" ? "flex-start" :
    align === "end" ? "flex-end" :
    align === "between" ? "space-between" :
    undefined;

  const wrapped =
    equal
      ? flattenChildren(children).map((child, i) => (
          <div className="dlg-actions__btn" key={i}>{child}</div>
        ))
      : children;

  // With a lead note the buttons must stay grouped so they wrap together (and
  // stay right-aligned) instead of the note being crushed into a thin column.
  const actions =
    lead != null && !isColumn ? (
      <div className="dlg-actions__group">{wrapped}</div>
    ) : (
      wrapped
    );

  return (
    <div
      className={
        "dlg-actions" +
        (isColumn ? " dlg-actions--column" : "") +
        (lead != null && !isColumn ? " dlg-actions--lead" : "") +
        (className ? " " + className : "")
      }
      style={justify ? { justifyContent: justify } : undefined}
    >
      {lead != null ? <div className="dlg-actions__lead">{lead}</div> : null}
      {actions}
    </div>
  );
}
