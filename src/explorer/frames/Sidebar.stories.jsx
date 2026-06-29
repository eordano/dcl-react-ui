import { useState } from "react";
import Sidebar from "./Sidebar.jsx";
import Chat from "./Chat.jsx";
import EmoteWheel from "../components/EmoteWheel.jsx";
import Notifications from "../components/Notifications.jsx";
import VoiceChat from "../components/VoiceChat.jsx";
import SkyboxHUD from "../components/SkyboxHUD.jsx";
import ProfileWidget from "../components/ProfileWidget.jsx";
import "../../overlay/overlay.css";

export default {
  title: "Explorer/Frames/Sidebar",
  component: Sidebar,
  parameters: { layout: "fullscreen" },
};

export const Default = {
  render: () => <Sidebar />,
};

const STAGE = {
  position: "fixed",
  inset: 0,
  background:
    "radial-gradient(120% 90% at 70% 10%, #3a2a52 0%, #1d1530 55%, #120c1f 100%)",
  overflow: "hidden",
};

function SidebarReview() {
  const [profileOpen, setProfileOpen] = useState(false);
  const [chatOpen, setChatOpen] = useState(false);
  const [emoteOpen, setEmoteOpen] = useState(false);
  const [notifOpen, setNotifOpen] = useState(false);
  const [voiceOpen, setVoiceOpen] = useState(false);
  const [skyboxOpen, setSkyboxOpen] = useState(false);

  return (
    <div style={STAGE}>
      <div className="ui3-overlay" data-live="true">
        <div className="ui3-overlay__widget ui3-overlay__sidebar">
          <Sidebar
            onProfileToggle={() => setProfileOpen((o) => !o)}
            chatOpen={chatOpen}
            onChatToggle={() => setChatOpen((o) => !o)}
            emoteOpen={emoteOpen}
            onEmoteToggle={() => setEmoteOpen((o) => !o)}
            notifOpen={notifOpen}
            onNotifToggle={() => setNotifOpen((o) => !o)}
            voiceOpen={voiceOpen}
            onVoiceToggle={() => setVoiceOpen((o) => !o)}
            skyboxOpen={skyboxOpen}
            onSkyboxToggle={() => setSkyboxOpen((o) => !o)}
          />
        </div>

        <div className="ui3-overlay__widget ui3-overlay__profile">
          <ProfileWidget
            open={profileOpen}
            name="CosmicLux"
            tag="#92e6"
            wallet="0x629…92e6"
            address="0x629000000000000000000000000000000000092e6"
            isGuest={false}
          />
        </div>

        {chatOpen && (
          <div className="ui3-overlay__widget ui3-overlay__chat">
            <Chat />
          </div>
        )}
        {emoteOpen && (
          <div className="ui3-overlay__widget ui3-overlay__emote">
            <EmoteWheel
              onSelect={() => setEmoteOpen(false)}
              onClose={() => setEmoteOpen(false)}
            />
          </div>
        )}
        {notifOpen && (
          <div className="ui3-overlay__widget ui3-overlay__notifications">
            <Notifications bare />
          </div>
        )}
        {voiceOpen && (
          <div className="ui3-overlay__widget ui3-overlay__voice">
            <VoiceChat bare />
          </div>
        )}
        {skyboxOpen && (
          <div className="ui3-overlay__widget ui3-overlay__skybox">
            <SkyboxHUD />
          </div>
        )}
      </div>
    </div>
  );
}

export const Review = {
  render: () => <SidebarReview />,
};
