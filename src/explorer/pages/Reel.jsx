import { useCallback, useEffect, useState } from "react";
import ExploreChrome from "../frames/ExploreChrome.jsx";
import Lightbox from "../components/Lightbox.jsx";
import "./reel.css";
import { useBridgeState } from "../../overlay/bridge";
import { catalystBase, signedFetch } from "../../data/catalyst/client";

const STORAGE_MAX = 500;

export default function Reel() {
  const { identity } = useBridgeState();
  const address = identity?.address || null;
  const [tab, setTab] = useState("gallery");
  const [photos, setPhotos] = useState([]);
  const [loading, setLoading] = useState(false);
  const [lightbox, setLightbox] = useState(null);

  const load = useCallback(async () => {
    if (!address) return;
    setLoading(true);
    try {
      const { status, body } = await signedFetch(
        `${catalystBase()}/camera-reel/api/users/${address}/images`,
        { method: "GET" }
      );
      if (status >= 200 && status < 300) {
        const data = JSON.parse(body);
        setPhotos(Array.isArray(data?.images) ? data.images : []);
      }
    } catch {
    } finally {
      setLoading(false);
    }
  }, [address]);

  useEffect(() => {
    load();
  }, [load]);

  const total = photos.length;
  const pct = Math.round((Math.min(total, STORAGE_MAX) / STORAGE_MAX) * 100);

  return (
    <ExploreChrome active={tab} onTab={setTab}>
      <div className="rl">
        <div className="rl__head">
          <h1 className="rl__title">Gallery</h1>
          <div className="rl__storage">
            <div className="rl__storagetxt">
              Storage <b>{total}</b>/{STORAGE_MAX} photos taken
            </div>
            <div className="rl__storagebar">
              <span className="rl__storagefill" style={{ width: pct + "%" }} />
            </div>
          </div>
        </div>

        <div className="rl__body">
          {total > 0 ? (
            <div className="rl__grid">
              {photos.map((p) => (
                <button
                  key={p.id}
                  type="button"
                  className="rl__cell"
                  title={p.metadata?.dateTime || "Reel photo"}
                  onClick={() => setLightbox(p.url)}
                >
                  <img
                    className="rl__cellimg"
                    src={p.thumbnailUrl || p.url}
                    alt="Reel photo"
                    loading="lazy"
                  />
                </button>
              ))}
            </div>
          ) : (
            <div className="rl__empty">
              <div className="rl__emptyicon">
                <svg viewBox="0 0 24 24" width="40" height="40" aria-hidden="true">
                  <defs>
                    <linearGradient id="rl-emptygrad" x1="0" y1="0" x2="1" y2="1">
                      <stop offset="0" stopColor="#ff2d8e" />
                      <stop offset="1" stopColor="#a524b3" />
                    </linearGradient>
                  </defs>
                  <rect x="2.5" y="4.5" width="19" height="15" rx="4" fill="none" stroke="url(#rl-emptygrad)" strokeWidth="2" />
                  <circle cx="8.2" cy="9.6" r="1.9" fill="url(#rl-emptygrad)" />
                  <path d="M3.5 18.5l5.2-5.4 3.5 3.6 3.6-3.7 4.7 4.9" fill="none" stroke="url(#rl-emptygrad)" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              </div>
              <div className="rl__emptytitle">
                {loading ? "Loading your reel…" : "There are no photos yet"}
              </div>
              <div className="rl__emptynote">
                Use the <b>camera</b> to save incredible memories with your friends!
              </div>
            </div>
          )}
        </div>
      </div>
      <Lightbox src={lightbox} onClose={() => setLightbox(null)} />
    </ExploreChrome>
  );
}
