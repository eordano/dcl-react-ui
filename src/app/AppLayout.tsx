import type {
  MouseEvent as ReactMouseEvent,
  PointerEvent as ReactPointerEvent,
  SyntheticEvent,
} from "react";
import { Suspense, useCallback, useEffect, useState } from "react";
import { Outlet, useLocation, useNavigate } from "react-router";
import { useQueryClient } from "@tanstack/react-query";
import type { QueryClient } from "@tanstack/react-query";

import ExploreChrome, { EXPLORE_TABS } from "../explorer/frames/ExploreChrome";
import type { TabId } from "../explorer/frames/ExploreChrome";
import Sidebar from "../explorer/frames/Sidebar";
import Minimap from "../explorer/frames/Minimap";
import Chat from "../explorer/frames/Chat";
import NotificationsPanel from "./panels/Notifications.route";
import { useNotifications } from "../data/hooks/useNotifications";
import FriendsPanel from "./panels/Friends.route";
import SmartWearablesPanel from "./panels/SmartWearables.route";
import VoiceChat from "../explorer/components/VoiceChat";
import EmoteWheel from "../explorer/components/EmoteWheel";
import SkyboxHUD from "../explorer/components/SkyboxHUD";
import ProfileWidget from "../explorer/components/ProfileWidget";
import ConnectionStatus from "../explorer/components/ConnectionStatus";
import EngineToasts from "../explorer/components/EngineToasts";
import LoginCodeModal from "../explorer/components/LoginCodeModal";
import PermissionPrompt from "../explorer/components/PermissionPrompt";
import Spinner from "../atoms/Spinner";
import { useBridgeState, sendBridge, stopEmote } from "../overlay/bridge";
import { MinimapVisibilityProvider } from "../overlay/minimapVisibility";
import "../overlay/overlay.css";

type LeftPanelId = "notif" | "voice" | "skybox" | "portables" | "friends";

const LINK_TO_ID: Record<string, string> = {
  "Explorer/Pages/Passport": "passport",
  "Explorer/Components/Notifications": "notifications",
  "Explorer/Pages/Friends": "friends",
  "Explorer/Pages/Backpack": "backpack",
  "Explorer/Pages/Reel": "gallery",
  "Explorer/Components/VoiceChat": "voicechat",
  "Explorer/Components/SmartWearables": "smartwearables",
  "Explorer/Components/SkyboxHUD": "skybox",
  "Explorer/Pages/Camera": "camera",
  "Explorer/Frames/Chat": "chat",
  "Explorer/Pages/ChatProfile": "passport",
  "Explorer/Pages/BackpackEmotes": "backpack",
  "Explorer/Pages/BadgesDetails": "passport",
  "Explorer/Components/CommunityStream": "communities",
};
for (const t of EXPLORE_TABS) {
  if (t.to) LINK_TO_ID[t.to] = t.id;
}

const HINT_TO_ID: Record<string, string> = {};
for (const t of EXPLORE_TABS) {
  if (t.hint) HINT_TO_ID[t.hint.toLowerCase()] = t.id;
}

function linkedId(target: EventTarget | null): string | null {
  const el = target instanceof Element ? target.closest("[data-sb-linkto]") : null;
  if (!el) return null;
  return LINK_TO_ID[el.getAttribute("data-sb-linkto") ?? ""] ?? null;
}

const WORLD_CANVAS_ID = "mygame-canvas";

function isTextEntry(el: Element | null): boolean {
  if (!el) return false;
  const tag = el.tagName;
  return (
    tag === "INPUT" ||
    tag === "TEXTAREA" ||
    tag === "SELECT" ||
    (el instanceof HTMLElement && el.isContentEditable)
  );
}

function focusWorldCanvas(): boolean {
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
  return (
    <div
      className="xc__panel-loading"
      role="status"
      aria-label="Loading…"
      style={{ display: "flex", alignItems: "center", justifyContent: "center", height: "100%", width: "100%" }}
    >
      <Spinner size={34} color="rgba(255,255,255,0.72)" aria-hidden />
    </div>
  );
}

type AppLayoutProps = {
  prefetchPanel?: (queryClient: QueryClient, id: string) => void;
};

export default function AppLayout({ prefetchPanel }: AppLayoutProps) {
  const navigate = useNavigate();
  const location = useLocation();
  const queryClient = useQueryClient();
  const bridge = useBridgeState();
  const { notifications } = useNotifications();
  const sidebarUnread = (notifications ?? []).filter((n) => !n.read).length;
  const [profileOpen, setProfileOpen] = useState(false);
  const [chatOpen, setChatOpen] = useState(false);
  const [emoteOpen, setEmoteOpen] = useState(false);
  const [connectionOpen, setConnectionOpen] = useState(false);
  const [leftPanel, setLeftPanel] = useState<LeftPanelId | null>(null);
  const toggleLeft = useCallback(
    (id: LeftPanelId) => setLeftPanel((p) => (p === id ? null : id)),
    [],
  );
  const closeOverlays = useCallback(() => {
    setLeftPanel(null);
  }, []);

  const notifOpen = leftPanel === "notif";
  const voiceOpen = leftPanel === "voice";
  const skyboxOpen = leftPanel === "skybox";
  const portablesOpen = leftPanel === "portables";
  const friendsOpen = leftPanel === "friends";

  const active = location.pathname.replace(/^\/+/, "").split("/")[0] || "";
  const user = bridge.identity?.name || "Guest";

  useEffect(() => {
    if (active === "") stopEmote();
    else {
      closeOverlays();
      setProfileOpen(false);
      setChatOpen(false);
      setEmoteOpen(false);
    }
  }, [active, closeOverlays]);

  useEffect(() => {
    if (active !== "") return undefined;
    let tries = 0;
    let t: ReturnType<typeof setTimeout> | undefined;
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

  const onPointerUp = useCallback((e: ReactPointerEvent) => {
    const t = e.target;
    if (!(t instanceof Element)) return;
    if (!t.closest(".ui3-overlay")) return;
    if (isTextEntry(t) || t.closest("input, textarea, select")) return;
    setTimeout(() => focusWorldCanvas(), 0);
  }, []);

  useEffect(() => {
    sendBridge("RequestAvatarPreview", {});
  }, []);

  const onTab = useCallback(
    (id: string) => navigate(id === active ? "/" : `/${id}`),
    [navigate, active],
  );

  const onIntent = useCallback(
    (e: SyntheticEvent) => {
      const id = linkedId(e.target);
      if (id && prefetchPanel) prefetchPanel(queryClient, id);
    },
    [prefetchPanel, queryClient],
  );

  const onClickCapture = useCallback(
    (e: ReactMouseEvent) => {
      const id = linkedId(e.target);
      if (id) navigate(`/${id}`);
    },
    [navigate],
  );

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.metaKey || e.ctrlKey || e.altKey) return;
      if (e.key === "Escape") {
        if (active) {
          navigate("/");
          e.preventDefault();
          e.stopImmediatePropagation();
        } else if (leftPanel || profileOpen || chatOpen || emoteOpen) {
          closeOverlays();
          setProfileOpen(false);
          setChatOpen(false);
          setEmoteOpen(false);
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
          (ae instanceof HTMLElement && ae.isContentEditable))
      )
        return;
      if (e.key.toLowerCase() === "b" && !active) {
        setEmoteOpen((o) => !o);
        e.preventDefault();
        e.stopImmediatePropagation();
        return;
      }
      if (e.key === "Enter" && !active && !chatOpen) {
        setChatOpen(true);
        e.preventDefault();
        e.stopImmediatePropagation();
        return;
      }
      const id = HINT_TO_ID[e.key.toLowerCase()];
      if (id) {
        navigate(id === active ? "/" : `/${id}`);
        e.preventDefault();
        e.stopImmediatePropagation();
      }
    };
    window.addEventListener("keydown", onKey, true);
    return () => window.removeEventListener("keydown", onKey, true);
  }, [active, navigate, leftPanel, profileOpen, chatOpen, emoteOpen, closeOverlays]);

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
                notifOpen={notifOpen}
                onNotifToggle={() => toggleLeft("notif")}
                voiceOpen={voiceOpen}
                onVoiceToggle={() => toggleLeft("voice")}
                skyboxOpen={skyboxOpen}
                onSkyboxToggle={() => toggleLeft("skybox")}
                portablesOpen={portablesOpen}
                onPortablesToggle={() => toggleLeft("portables")}
                friendsOpen={friendsOpen}
                onFriendsToggle={() => toggleLeft("friends")}
                emoteOpen={emoteOpen}
                onEmoteToggle={() => setEmoteOpen((o) => !o)}
                unread={sidebarUnread}
              />
            </div>
            {!leftPanel && (
              <div className="ui3-overlay__widget ui3-overlay__minimap">
                <Minimap
                  place={bridge.scene?.title ?? undefined}
                  coords={bridge.playerPosition?.parcel ?? bridge.scene?.coords ?? undefined}
                  heading={bridge.playerPosition?.heading}
                />
              </div>
            )}
            <div className="ui3-overlay__widget ui3-overlay__profile">
              <ProfileWidget
                open={profileOpen}
                name={bridge.identity?.name}
                tag={bridge.identity?.tag ?? undefined}
                wallet={bridge.identity?.wallet ?? undefined}
                address={bridge.identity?.address ?? undefined}
                avatarSrc={bridge.avatarPreview}
                isGuest={bridge.identity?.isGuest}
              />
            </div>
            {chatOpen && (
              <div className="ui3-overlay__widget ui3-overlay__chat">
                <Chat />
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
            {portablesOpen && (
              <div className="ui3-overlay__widget ui3-overlay__portables">
                <SmartWearablesPanel floating onClose={() => setLeftPanel(null)} />
              </div>
            )}
            {friendsOpen && (
              <div className="ui3-overlay__widget ui3-overlay__friends">
                <FriendsPanel floating onClose={() => setLeftPanel(null)} />
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
            {(() => {
              const c = bridge.connection;
              const health =
                c == null
                  ? "info"
                  : c.globalRoom && c.sceneHealth === "ok"
                    ? "ok"
                    : "warn";
              return (
                <div className="ui3-overlay__widget ui3-overlay__connbadge">
                  <button
                    type="button"
                    className={"connbadge connbadge--" + health}
                    aria-label="Connection status"
                    aria-expanded={connectionOpen}
                    title="Connection status"
                    onClick={() => setConnectionOpen((o) => !o)}
                  >
                    <span className="connbadge__dot" />
                  </button>
                </div>
              );
            })()}
            {connectionOpen && (
              <div className="ui3-overlay__widget ui3-overlay__connection">
                <ConnectionStatus
                  connection={bridge.connection}
                  realm={bridge.scene?.realm ?? undefined}
                  onClose={() => setConnectionOpen(false)}
                />
              </div>
            )}
            <EngineToasts toasts={bridge.toasts} />
          </div>
          </MinimapVisibilityProvider>
          <Outlet />
        </>
      ) : (
        <ExploreChrome active={active as TabId} onTab={onTab} user={user} onClose={() => navigate("/")}>
          <Suspense fallback={<PanelFallback />}>
            <Outlet />
          </Suspense>
        </ExploreChrome>
      )}
      <LoginCodeModal />
      <PermissionPrompt />
    </div>
  );
}
