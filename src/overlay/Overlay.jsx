import Sidebar from "../explorer/frames/Sidebar.jsx";
import Minimap from "../explorer/frames/Minimap.jsx";
import Chat from "../explorer/frames/Chat.jsx";
import Notifications from "../explorer/components/Notifications.jsx";
import ProfileWidget from "../explorer/components/ProfileWidget.jsx";
import ConnectionStatus from "../explorer/components/ConnectionStatus.jsx";
import { useBridgeState } from "./bridge.js";
import "./overlay.css";

export default function Overlay() {
  const state = useBridgeState();
  const { scene, identity } = state;

  return (
    <div className="ui3-overlay" data-live={state.live ? "true" : "false"}>
      <div className="ui3-overlay__widget ui3-overlay__minimap">
        <Minimap place={scene.title} coords={scene.coords} />
      </div>

      <div className="ui3-overlay__widget ui3-overlay__sidebar">
        <Sidebar />
      </div>

      <div className="ui3-overlay__widget ui3-overlay__profile">
        <ProfileWidget
          name={identity.name}
          tag={identity.tag}
          wallet={identity.wallet}
        />
      </div>

      <div className="ui3-overlay__widget ui3-overlay__chat">
        <Chat />
      </div>

      <div className="ui3-overlay__widget ui3-overlay__notifications">
        <Notifications />
      </div>

      <div className="ui3-overlay__widget ui3-overlay__connection">
        <ConnectionStatus />
      </div>
    </div>
  );
}
