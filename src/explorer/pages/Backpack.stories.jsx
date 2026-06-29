import { useEffect, useState } from "react";

import WearablePreview from "../../wearable-preview/WearablePreview.jsx";
import ExploreChrome from "../frames/ExploreChrome.jsx";
import Backpack from "./Backpack.jsx";
import {
  loadBackpack,
  loadBackpackEmotes,
  loadRecentOutfits,
  hexToColor3,
  baseItemUrn,
  fetchEmoteGlbUrl,
} from "../../data/catalyst/backpack.js";

export default {
  title: "Explorer/Pages/Backpack",
  component: Backpack,
  parameters: { layout: "fullscreen" },
};

const SHOWCASE_ADDRESS = "0xf12c21d3edb2c0e68935a3bbe5d68ae4bf9dcd7c";

const OTHERS_LIMIT = 40;

const pickBase = (o) => ({
  bodyShape: o?.bodyShape,
  skinColor: o?.skinColor,
  hairColor: o?.hairColor,
  eyeColor: o?.eyeColor,
});

function BackpackLive() {
  const [data, setData] = useState({
    catalog: [],
    equipped: null,
    emoteCatalog: [],
    emoteLoadout: [],
    outfits: [],
    loading: true,
    error: null,
  });
  const [equippedUrns, setEquippedUrns] = useState(null);
  const [emote, setEmote] = useState({ value: "wave", nonce: 0 });
  const [base, setBase] = useState(null);

  useEffect(() => {
    const ac = new AbortController();
    let alive = true;
    (async () => {
      try {
        const [w, e, o] = await Promise.all([
          loadBackpack(SHOWCASE_ADDRESS, { signal: ac.signal }),
          loadBackpackEmotes(SHOWCASE_ADDRESS, { signal: ac.signal }).catch(
            () => null,
          ),
          loadRecentOutfits(4, { signal: ac.signal }).catch(() => []),
        ]);
        if (!alive) return;
        const ownedSet = new Set(w.ownedUrns);
        const base = w.catalog.filter((it) => !ownedSet.has(it.urn));
        const equippedOwned = new Set(
          (w.equipped?.wearables ?? [])
            .map(baseItemUrn)
            .filter((u) => ownedSet.has(u)),
        );
        const others = [...w.owned]
          .sort(
            (a, b) =>
              (equippedOwned.has(b.urn) ? 1 : 0) -
              (equippedOwned.has(a.urn) ? 1 : 0),
          )
          .slice(0, OTHERS_LIMIT);
        setEquippedUrns(w.equipped?.wearables ?? []);
        setBase(pickBase(w.equipped));
        setData({
          catalog: [...others, ...base],
          equipped: w.equipped,
          emoteCatalog: e?.catalog ?? [],
          emoteLoadout: e?.loadout ?? [],
          outfits: o ?? [],
          loading: false,
          error: null,
        });
      } catch (err) {
        if (!alive || ac.signal.aborted) return;
        setData((d) => ({
          ...d,
          loading: false,
          error: err?.message ?? "Failed to load wearables",
        }));
      }
    })();
    return () => {
      alive = false;
      ac.abort();
    };
  }, []);

  const playEmoteOnPreview = async (urn) => {
    let url = null;
    try {
      url = await fetchEmoteGlbUrl(urn);
    } catch {
    }
    const value = url || String(urn).split(":").pop();
    setEmote((e) => ({ value, nonce: e.nonce + 1 }));
  };

  const eq = data.equipped;
  const preview =
    eq && equippedUrns && base ? (
      <WearablePreview
        outfit={{
          bodyShape: base.bodyShape,
          wearables: equippedUrns,
          skin: { color: hexToColor3(base.skinColor) },
          hair: { color: hexToColor3(base.hairColor) },
          eyes: { color: hexToColor3(base.eyeColor) },
        }}
        emote={emote.value}
        emoteNonce={emote.nonce}
        zoom={1.05}
      />
    ) : (
      <WearablePreview
        profile={SHOWCASE_ADDRESS}
        emote={emote.value}
        emoteNonce={emote.nonce}
        zoom={1.05}
      />
    );

  return (
    <Backpack
      avatarPreview={
        <div style={{ width: "100%", height: "100%" }}>{preview}</div>
      }
      catalog={data.catalog}
      equipped={data.equipped}
      emoteCatalog={data.emoteCatalog}
      emoteLoadout={data.emoteLoadout}
      outfits={data.outfits}
      loading={data.loading}
      error={data.error}
      renderOutfitPreview={(o) => (
        <WearablePreview
          outfit={{
            bodyShape: o.bodyShape,
            wearables: o.wearables,
            skin: { color: hexToColor3(o.skinColor) },
            hair: { color: hexToColor3(o.hairColor) },
            eyes: { color: hexToColor3(o.eyeColor) },
          }}
          emote="idle"
          spin={false}
          controls={false}
          zoom={1.05}
          pitch={2}
          targetY={0.52}
        />
      )}
      onEquippedChange={setEquippedUrns}
      onPlayEmote={playEmoteOnPreview}
      onBaseChange={(next) => setBase(pickBase(next))}
    />
  );
}

export const Default = {
  render: () => (
    <ExploreChrome active="backpack">
      <BackpackLive />
    </ExploreChrome>
  ),
};

export const Placeholder = {
  render: () => (
    <ExploreChrome active="backpack">
      <Backpack />
    </ExploreChrome>
  ),
};
