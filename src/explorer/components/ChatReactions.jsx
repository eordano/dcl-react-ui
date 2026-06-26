import EmojiSprite from "../atoms/EmojiSprite.jsx";
import Toggle from "../../atoms/Toggle.jsx";
import "./chatreactions.css";

const QUICK = ["♥", "👏", "👍", "👎", "🤣", "🔥", "😢"];

export default function ChatReactions({
  title = "Chat Reactions",
  reactions = QUICK,
  enabled = true,
  showMore = true,
}) {
  return (
    <div className="rx__stage">
      <div className="rx" role="dialog" aria-label={title}>
        <span className="rx__title">{title}</span>

        <div className="rx__row">
          {reactions.map((ch) => (
            <button key={ch} className="rx__btn" aria-label="React">
              <EmojiSprite ch={ch} size={18} />
            </button>
          ))}
        </div>

        <Toggle key={String(enabled)} defaultChecked={enabled} />

        {showMore && (
          <button className="rx__more" aria-label="More reactions" data-sb-linkto="Explorer/Components/EmojiPanel">
            <svg viewBox="0 0 24 24" width="16" height="16" fill="currentColor">
              <circle cx="5" cy="12" r="1.6" />
              <circle cx="12" cy="12" r="1.6" />
              <circle cx="19" cy="12" r="1.6" />
            </svg>
          </button>
        )}
      </div>
    </div>
  );
}
