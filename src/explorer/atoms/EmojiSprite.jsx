import MAP from "../../atoms/emojiMap.json";
import FLAGS from "../../atoms/flagMap.json";
import "./emojisprite.css";

const COLS = 64, CELL = 32, SHEET = 2048;
const FLAG_CELL = 64, FLAG_SHEET = 256;

export default function EmojiSprite({ ch, size = 24 }) {
  const flag = FLAGS[ch];
  if (flag) {
    const k = size / FLAG_CELL;
    return (
      <span
        className="emojispr emojispr--flag"
        style={{
          width: size, height: size,
          backgroundSize: `${FLAG_SHEET * k}px ${FLAG_SHEET * k}px`,
          backgroundPosition: `${-flag[0] * k}px ${-flag[1] * k}px`,
        }}
        role="img" aria-label={ch}
      />
    );
  }
  const idx = MAP[ch.codePointAt(0)];
  if (idx === undefined) {
    return <span className="emojispr emojispr--text" style={{ fontSize: size, width: size, height: size }}>{ch}</span>;
  }
  const col = idx % COLS, row = Math.floor(idx / COLS);
  return (
    <span
      className="emojispr"
      style={{
        width: size, height: size,
        backgroundSize: `${SHEET * size / CELL}px ${SHEET * size / CELL}px`,
        backgroundPosition: `${-col * size}px ${-row * size}px`,
      }}
      role="img" aria-label={ch}
    />
  );
}
