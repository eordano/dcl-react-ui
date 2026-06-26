import "./scenelabchrome.css";

export default function SceneLabChrome({ left, right, width = 400 }) {
  return (
    <div className="sl ui2" role="region" aria-label="Decentraland Scene Lab">
      <div className="sl__left" style={{ width }}>
        {left}
      </div>
      <div className="sl__divider" aria-hidden="true" />
      <div className="sl__right">{right}</div>
    </div>
  );
}
