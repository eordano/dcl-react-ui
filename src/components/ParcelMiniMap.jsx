import "./parcelminimap.css";

export default function ParcelMiniMap({ seed = 0, plaza = false, className = "" }) {
  const left = 16 + ((seed * 27) % 52);
  const top = 18 + ((seed * 41) % 50);
  const size = 14 + ((seed * 17) % 24);
  const roadX = 22 + ((seed * 31) % 50);
  const roadY = 26 + ((seed * 19) % 44);
  const owned = [0, 1, 2].map((k) => ({
    left: (6 + (((seed * (13 + k * 7)) + k * 29) % 80)) + "%",
    top: (8 + (((seed * (11 + k * 5)) + k * 37) % 76)) + "%",
    size: (7 + (((seed + k) * 5) % 13)) + "%",
  }));
  return (
    <span className={"pmm " + className} aria-hidden="true">
      <span className="pmm__grid" />
      <span className="pmm__road pmm__road--v" style={{ left: roadX + "%" }} />
      <span className="pmm__road pmm__road--h" style={{ top: roadY + "%" }} />
      {owned.map((o, k) => (
        <span key={k} className="pmm__owned" style={{ left: o.left, top: o.top, width: o.size, height: o.size }} />
      ))}
      {plaza ? (
        <span className="pmm__plaza" style={{ left: ((left + 30) % 70) + "%", top: ((top + 28) % 60) + "%" }} />
      ) : null}
      <span className="pmm__hl" style={{ left: left + "%", top: top + "%", width: size + "%", height: size + "%" }} />
    </span>
  );
}
