import type { RefObject } from "react";
import type { EditorBus } from "./editor-bus";
import type { DeCatalogItem } from "./types";

const BUILDER_ITEMS_PREFIX = "/builder-items/";

let _projectContentBase: string | null | undefined;
export async function projectContentBase(): Promise<string | null> {
  if (_projectContentBase !== undefined) return _projectContentBase;
  _projectContentBase = null;
  try {
    const res = await fetch("/_project/about", { cache: "no-store" });
    if (res.ok) {
      const about = await res.json();
      const pub = about && about.content && about.content.publicUrl;
      if (typeof pub === "string" && pub) _projectContentBase = pub.replace(/\/$/, "");
    }
  } catch {
  }
  return _projectContentBase;
}

export async function setProjectPlayState(playing: boolean, debug = false): Promise<void> {
  if (typeof caches === "undefined") return;
  try {
    const base = await projectContentBase();
    if (!base) return;
    const cache = await caches.open("ch-project-v1");
    await cache.put(
      `${base}/contents/one-play-state`,
      new Response(JSON.stringify({ playing, ...(debug ? { debug } : {}) }), {
        headers: {
          "content-type": "application/json",
          "access-control-allow-origin": "*",
        },
      }),
    );
  } catch {
  }
}

interface InitAssetResult {
  baseDir?: string;
  hashes?: Record<string, string>;
}

export async function placeAssetOnBus(
  busRef: RefObject<EditorBus | null>,
  asset: DeCatalogItem,
): Promise<void> {
  const glb = asset?.glbUrl;
  let absUrl: string | null = null;
  if (typeof glb === "string" && glb) {
    absUrl = glb;
    try {
      if (typeof window !== "undefined") absUrl = new URL(glb, window.location.origin).href;
    } catch {
    }
  }

  const contents =
    asset?.contents && typeof asset.contents === "object" ? asset.contents : null;
  let persisted: InitAssetResult | null = null;
  if (asset?.id && contents && busRef.current && typeof busRef.current.rpc === "function") {
    try {
      persisted = (await busRef.current.rpc("initAsset", [asset.id, contents], 15000)) as InitAssetResult;
    } catch {
      persisted = null;
    }
  }

  if (persisted && contents && typeof caches !== "undefined") {
    try {
      const base = await projectContentBase();
      const cache = await caches.open("ch-project-v1").catch(() => null);
      if (base && cache) {
        const baseDir = String(persisted.baseDir || "").replace(/\/+$/, "");
        const hashes: Record<string, string> =
          persisted.hashes && typeof persisted.hashes === "object" ? persisted.hashes : {};
        await Promise.all(
          Object.entries(contents).map(async ([path, cid]) => {
            if (typeof cid !== "string" || !cid) return;
            try {
              const r = await fetch(BUILDER_ITEMS_PREFIX + cid, { credentials: "omit" });
              if (!r.ok) return;
              const buf = await r.arrayBuffer();
              const put = (h: string) =>
                cache.put(
                  base + "/contents/" + h,
                  new Response(buf.slice(0), {
                    headers: {
                      "content-type": "application/octet-stream",
                      "access-control-allow-origin": "*",
                    },
                  }),
                );
              await put(cid);
              const mh = hashes[(baseDir + "/" + path).toLowerCase()];
              if (mh && mh !== cid) await put(mh);
            } catch {
            }
          }),
        );
      }
    } catch {
    }
  }

  let src = absUrl;
  if (
    persisted &&
    typeof persisted.baseDir === "string" &&
    persisted.baseDir &&
    asset?.glbFile
  ) {
    src = persisted.baseDir.replace(/\/+$/, "") + "/" + asset.glbFile;
  }

  const components = src ? { GltfContainer: { src } } : null;
  busRef.current?.addEntity(asset?.name || "Item", 0, components);
}
