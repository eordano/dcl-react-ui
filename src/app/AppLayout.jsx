import { Suspense, useCallback, useEffect, useState } from "react";
import { Outlet, useLocation, useNavigate } from "react-router";
import { useQueryClient } from "@tanstack/react-query";

import ExploreChrome, { EXPLORE_TABS } from "../explorer/frames/ExploreChrome.jsx";
import Sidebar from "../explorer/frames/Sidebar.jsx";
import Minimap from "../explorer/frames/Minimap.jsx";
import Chat from "../explorer/frames/Chat.jsx";
import EmoteWheel from "../explorer/components/EmoteWheel.jsx";
import NotificationsPanel from "./panels/Notifications.route.jsx";
import VoiceChat from "../explorer/components/VoiceChat.jsx";
import SkyboxHUD from "../explorer/components/SkyboxHUD.jsx";
import ProfileWidget from "../explorer/components/ProfileWidget.jsx";
import LoginCodeModal from "../explorer/components/LoginCodeModal.jsx";
import { useBridgeState, sendBridge, stopEmote } from "../overlay/bridge.js";
import { MinimapVisibilityProvider } from "../overlay/minimapVisibility.jsx";
import "../overlay/overlay.css";

const LINK_TO_ID = {
  "Explorer/Pages/Passport": "passport",
  "Explorer/Components/Notifications": "notifications",
  "Explorer/Pages/Friends": "friends",
  "Explorer/Pages/Backpack": "backpack",
  "Explorer/Pages/Reel": "gallery",
  "Explorer/Components/VoiceChat": "voicechat",
  "Explorer/Components/SmartWearables": "smartwearables",
  "Explorer/Components/SkyboxHUD": "skybox",
  "Explorer/Pages/Camera": "camera",
  "Explorer/Components/EmoteWheel": "emote",
  "Explorer/Frames/Chat": "chat",
  "Explorer/Pages/ChatProfile": "passport",
  "Explorer/Pages/BackpackEmotes": "backpack",
  "Explorer/Pages/BadgesDetails": "passport",
  "Explorer/Components/CommunityStream": "communities",
};
for (const t of EXPLORE_TABS) {
  if (t.to) LINK_TO_ID[t.to] = t.id;
}

const HINT_TO_ID = {};
for (const t of EXPLORE_TABS) {
  if (t.hint) HINT_TO_ID[t.hint.toLowerCase()] = t.id;
}

function linkedId(target) {
  const el = target?.closest?.("[data-sb-linkto]");
  if (!el) return null;
  return LINK_TO_ID[el.getAttribute("data-sb-linkto")] ?? null;
}

const WORLD_CANVAS_ID = "mygame-canvas";

function isTextEntry(el) {
  if (!el) return false;
  const tag = el.tagName;
  return (
    tag === "INPUT" ||
    tag === "TEXTAREA" ||
    tag === "SELECT" ||
    el.isContentEditable === true
  );
}

function focusWorldCanvas() {
  if (typeof document === "undefined") return false;
  const c = document.getElementById(WORLD_CANVAS_ID);
  if (!c) return false;
  if (document.activeElement === c) return true;
  if (isTextEntry(document.activeElement)) return false;
  try {
    c.focus({ preventScroll: true });
  } catch {
  }
  return document.activeElement === c;
}

function PanelFallback() {
  return <div className="xc__panel-loading" aria-busy="true" />;
}

export default function AppLayout({ prefetchPanel }) {
  const navigate = useNavigate();
  const location = useLocation();
  const queryClient = useQueryClient();
  const bridge = useBridgeState();
  const [profileOpen, setProfileOpen] = useState(false);
  const [chatOpen, setChatOpen] = useState(false);
  const [emoteOpen, setEmoteOpen] = useState(false);
  const [notifOpen, setNotifOpen] = useState(false);
  const [voiceOpen, setVoiceOpen] = useState(false);
  const [skyboxOpen, setSkyboxOpen] = useState(false);
  const closeOverlays = useCallback(() => {
    setEmoteOpen(false);
    setNotifOpen(false);
    setVoiceOpen(false);
    setSkyboxOpen(false);
  }, []);

  const active = location.pathname.replace(/^\/+/, "").split("/")[0] || "";
  const user = bridge.identity?.name || "Guest";

  useEffect(() => {
    if (active === "") stopEmote();
    else {
      closeOverlays();
      setProfileOpen(false);
      setChatOpen(false);
    }
  }, [active, closeOverlays]);

  useEffect(() => {
    if (active !== "") return undefined;
    let tries = 0;
    let t;
    const tick = () => {
      if (typeof document !== "undefined" && document.querySelector(".xc")) return;
      if (focusWorldCanvas() || tries++ > 30) return;
      t = setTimeout(tick, 100);
    };
    tick();
    return () => {
      if (t) clearTimeout(t);
    };
  }, [active]);

  const onPointerUp = useCallback((e) => {
    const t = e.target;
    if (!t || !t.closest) return;
    if (!t.closest(".ui3-overlay")) return;
    if (isTextEntry(t) || t.closest("input, textarea, select")) return;
    setTimeout(() => focusWorldCanvas(), 0);
  }, []);

  useEffect(() => {
    sendBridge("RequestAvatarPreview", {});
  }, []);

  const onTab = useCallback(
    (id) => navigate(id === active ? "/" : `/${id}`),
    [navigate, active],
  );

  const onIntent = useCallback(
    (e) => {
      const id = linkedId(e.target);
      if (id && prefetchPanel) prefetchPanel(queryClient, id);
    },
    [prefetchPanel, queryClient],
  );

  const onClickCapture = useCallback(
    (e) => {
      const id = linkedId(e.target);
      if (id) navigate(`/${id}`);
    },
    [navigate],
  );

  useEffect(() => {
    const onKey = (e) => {
      if (e.metaKey || e.ctrlKey || e.altKey) return;
      if (e.key === "Escape") {
        if (active) {
          navigate("/");
          e.preventDefault();
          e.stopImmediatePropagation();
        } else if (emoteOpen || notifOpen || voiceOpen || skyboxOpen || profileOpen || chatOpen) {
          closeOverlays();
          setProfileOpen(false);
          setChatOpen(false);
          focusWorldCanvas();
          e.preventDefault();
          e.stopImmediatePropagation();
        }
        return;
      }
      const ae = document.activeElement;
      if (
        ae &&
        (ae.tagName === "INPUT" ||
          ae.tagName === "TEXTAREA" ||
          ae.isContentEditable)
      )
        return;
      const id = HINT_TO_ID[e.key.toLowerCase()];
      if (id) {
        navigate(id === active ? "/" : `/${id}`);
        e.preventDefault();
        e.stopImmediatePropagation();
      }
    };
    window.addEventListener("keydown", onKey, true);
    return () => window.removeEventListener("keydown", onKey, true);
  }, [active, navigate, emoteOpen, notifOpen, voiceOpen, skyboxOpen, profileOpen, chatOpen, closeOverlays]);

  return (
    <div
      className="ui3-app-root"
      onMouseOverCapture={onIntent}
      onFocusCapture={onIntent}
      onClickCapture={onClickCapture}
      onPointerUp={onPointerUp}
    >
      {active === "" ? (
        <>
          <MinimapVisibilityProvider>
          <div
            className="ui3-overlay"
            data-live={bridge.live ? "true" : "false"}
          >
            <div className="ui3-overlay__widget ui3-overlay__sidebar">
              <Sidebar
                avatarPreview={bridge.avatarPreview}
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
            <div className="ui3-overlay__widget ui3-overlay__minimap">
              <Minimap
                place={bridge.scene?.title}
                coords={bridge.scene?.coords}
              />
            </div>
            <div className="ui3-overlay__widget ui3-overlay__profile">
              <ProfileWidget
                open={profileOpen}
                name={bridge.identity?.name}
                tag={bridge.identity?.tag}
                wallet={bridge.identity?.wallet}
                address={bridge.identity?.address}
                avatarSrc={bridge.avatarPreview}
                isGuest={bridge.identity?.isGuest}
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
                <NotificationsPanel floating />
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
          </MinimapVisibilityProvider>
          <Outlet />
        </>
      ) : (
        <ExploreChrome active={active} onTab={onTab} user={user} onClose={() => navigate("/")}>
          <Suspense fallback={<PanelFallback />}>
            <Outlet />
          </Suspense>
        </ExploreChrome>
      )}
      <LoginCodeModal />
    </div>
  );
}
