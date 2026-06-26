import EmojiSprite from "../atoms/EmojiSprite.jsx";
import { Avatar } from "../../atoms/primitives.jsx";
import "./emoji.css";

const REACTIONS = ["❤️", "👏", "👍", "👎", "🤣", "🔥", "😢"];

export default function EmojiPanel() {
  return (
    <div className="emj__backdrop">
      <div className="emj__stack">
        <div className="emj" role="dialog" aria-label="Chat Reactions">
          <div className="emj__head">
            <span className="emj__title">Chat Reactions</span>
            <button
              className="emj__toggle"
              role="switch"
              aria-checked="false"
              aria-label="Show reactions to others"
            >
              <span className="emj__knob" />
            </button>
          </div>

          <div className="emj__row">
            {REACTIONS.map((e, i) => (
              <button className="emj__btn" key={i} aria-label={"React with " + e}>
                <EmojiSprite ch={e} size={24} />
              </button>
            ))}
            <button className="emj__more" aria-label="More reactions">+</button>
          </div>
        </div>

        <div className="emj__inputrow">
          <div className="emj__input">
            <Avatar hue={210} size={26} className="emj__inputavatar" />
            <input
              className="emj__field"
              placeholder="Write a message"
              aria-label="Message"
            />
          </div>
        </div>
      </div>
    </div>
  );
}
