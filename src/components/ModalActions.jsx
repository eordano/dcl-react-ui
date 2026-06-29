import { Children, isValidElement, Fragment } from "react";
import "./dialogactions.css";

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
