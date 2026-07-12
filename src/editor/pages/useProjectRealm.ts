import { useEffect, useRef, useState } from "react";
import { setProjectPlayState } from "../project-cache";

export function useProjectRealm(
  viewportSrc: string | null | undefined,
  prepareRealm: (() => Promise<unknown>) | null | undefined,
): boolean {
  const isProjectRealm = typeof viewportSrc === "string" && /_project/.test(viewportSrc);
  const [cacheReady, setCacheReady] = useState(() => !isProjectRealm);
  const prepareRealmRef = useRef(prepareRealm);
  prepareRealmRef.current = prepareRealm;

  useEffect(() => {
    if (!isProjectRealm) return undefined;
    let cancelled = false;
    const sleepMs = (ms: number) => new Promise<void>((r) => setTimeout(r, ms));

    const ensureWorker = async () => {
      try {
        const swc = typeof navigator !== "undefined" ? navigator.serviceWorker : null;
        if (!swc || typeof swc.register !== "function") return;
        const reg = await swc.register("/_play/service_worker.js", { scope: "/_play/" });
        for (let i = 0; i < 60 && !reg.active; i += 1) await sleepMs(100);
        for (let i = 0; i < 15 && !swc.controller; i += 1) await sleepMs(100);
      } catch {
      }
    };

    const populate = async () => {
      const fn = prepareRealmRef.current;
      if (typeof fn !== "function") return;
      try {
        await fn();
      } catch {
      }
    };

    const run = async () => {
      const C = typeof caches !== "undefined" ? caches : null;
      const isLocalReopen =
        typeof window !== "undefined" && /[?&]source=local(?:[&=]|$)/.test(window.location.search);
      if (C) {
        const cache = await C.open("ch-project-v1").catch(() => null);
        if (cache) {
          if (!isLocalReopen) {
            const keys = await cache.keys();
            await Promise.all(keys.map((k) => cache.delete(k)));
            await populate();
          } else {
            let populated = false;
            for (let i = 0; i < 40; i += 1) {
              if (cancelled) return;
              const keys = await cache.keys();
              if (keys.length > 0) {
                populated = true;
                break;
              }
              await sleepMs(200);
            }
            if (!populated) await populate();
          }
        }
      }
      await setProjectPlayState(false);
      await ensureWorker();
      if (!cancelled) setCacheReady(true);
    };
    run();
    return () => {
      cancelled = true;
    };
  }, [isProjectRealm]);

  return cacheReady;
}
