import "./dcleditorchrome.css";

export default function DclEditorChrome({ children }) {
  return (
    <div className="eui-root eui-viewport ui2" role="region" aria-label="DCL Editor">
      <div className="eui-vp-horizon" aria-hidden="true" />
      <div className="eui-vp-grid" aria-hidden="true" />
      <div className="eui-vp-object" aria-hidden="true">
        <div className="eui-vp-cube" />
        <div className="eui-vp-gizmo">
          <i className="ax-z" />
          <i className="ax-x" />
          <i className="ax-y" />
        </div>
      </div>
      {children}
    </div>
  );
}
