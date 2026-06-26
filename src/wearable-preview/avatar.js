// Framework-agnostic three.js avatar scene. createAvatarScene(container, opts)
// builds a renderer inside `container`, loads + composes the avatar, optionally
// plays an emote, and returns a controller { resize, dispose }. three is imported
// here (statically), so this module is the code-split chunk WearablePreview.jsx
// lazy-imports — keeping three out of the host's main bundle.
//
// Lighting / materials / camera intentionally mirror decentraland/wearable-preview's
// avatar look (even top+bottom hemispheric light, matte/no-specular materials,
// front-facing camera ~(0,1,3.5)), but in three instead of babylon.

import * as THREE from "three";
import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader.js";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls.js";

import idleUrl from "./emotes/idle.glb?url";
import waveUrl from "./emotes/wave.glb?url";
import danceUrl from "./emotes/dance.glb?url";
import clapUrl from "./emotes/clap.glb?url";
import dabUrl from "./emotes/dab.glb?url";

const EMOTES = { idle: idleUrl, wave: waveUrl, dance: danceUrl, clap: clapUrl, dab: dabUrl };

const DEFAULT_BASE = "https://catalyst.dcl.one";
const DEFAULT_BODY = "urn:decentraland:off-chain:base-avatars:BaseMale";

const itemUrn = (urn) => {
  const p = urn.split(":");
  return p.length === 7 && /^collections-v[12]$/.test(p[3]) ? p.slice(0, 6).join(":") : urn;
};
const colorOf = (c) =>
  c && c.color && typeof c.color.r === "number" ? new THREE.Color(c.color.r, c.color.g, c.color.b) : null;

async function getJSON(url, opts) {
  const r = await fetch(url, opts);
  if (!r.ok) throw new Error(`${url} -> ${r.status}`);
  return r.json();
}

function representationMainFile(entity, bodyShape) {
  const reps = entity?.metadata?.data?.representations || [];
  const bs = bodyShape.toLowerCase();
  const rep = reps.find((r) => (r.bodyShapes || []).some((b) => String(b).toLowerCase() === bs)) || reps[0];
  return rep?.mainFile || null;
}
function fileMapFor(entity) {
  const map = new Map();
  for (const c of entity.content || []) {
    const f = String(c.file).toLowerCase();
    map.set(f, c.hash);
    map.set(f.split("/").pop(), c.hash);
  }
  return map;
}

export function createAvatarScene(container, opts = {}) {
  const base = (opts.base || DEFAULT_BASE).replace(/\/$/, "");
  const setStatus = opts.onStatus || (() => {});
  let disposed = false;

  const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
  renderer.setPixelRatio(Math.min(window.devicePixelRatio || 1, 2));
  renderer.outputColorSpace = THREE.SRGBColorSpace;
  // transparent canvas by default; opaque if a background color is given
  if (opts.background) renderer.setClearColor(new THREE.Color(opts.background), 1);
  else renderer.setClearColor(0x000000, 0);
  Object.assign(renderer.domElement.style, { width: "100%", height: "100%", display: "block" });
  container.appendChild(renderer.domElement);

  const scene = new THREE.Scene();
  const camera = new THREE.PerspectiveCamera(opts.fov ?? 34, 1, 0.05, 100);
  camera.position.set(0, 1, 3.5);

  // Even soft lighting (≈ upstream's top+bottom HemisphericLights) + a gentle front
  // light for a touch of form. No harsh key — avatars read flat/matte.
  scene.add(new THREE.HemisphereLight(0xffffff, 0xdadae2, 2.0));
  const fill = new THREE.HemisphereLight(0xeef2ff, 0xffffff, 0.7);
  fill.position.set(0, -1, 0);
  scene.add(fill);
  const front = new THREE.DirectionalLight(0xffffff, 0.55);
  front.position.set(0.4, 1.4, 3);
  scene.add(front);

  const interactive = opts.controls !== false; // drag to rotate / scroll to zoom
  const controls = new OrbitControls(camera, renderer.domElement);
  controls.enablePan = !!opts.pan;
  controls.enableDamping = true;
  controls.dampingFactor = 0.08;
  controls.enabled = interactive;
  controls.enableZoom = interactive;
  controls.enableRotate = interactive;
  controls.autoRotate = opts.spin !== false; // autoRotate still works with controls disabled
  controls.autoRotateSpeed = opts.spinSpeed ?? 0.9;
  controls.minDistance = 0.6;
  controls.maxDistance = 8;

  const avatarGroup = new THREE.Group();
  scene.add(avatarGroup);

  const parts = []; // loaded part scenes (body + wearables) — emote mixers attach per part
  const mixers = [];
  const clock = new THREE.Clock();

  function resize() {
    const w = container.clientWidth || 1;
    const h = container.clientHeight || 1;
    renderer.setSize(w, h, false);
    camera.aspect = w / h;
    camera.updateProjectionMatrix();
  }
  resize();

  renderer.setAnimationLoop(() => {
    if (disposed) return;
    const dt = clock.getDelta();
    for (const m of mixers) m.update(dt);
    controls.update();
    renderer.render(scene, camera);
  });

  function frame() {
    const box = new THREE.Box3().setFromObject(avatarGroup);
    if (box.isEmpty()) return;
    const size = box.getSize(new THREE.Vector3());
    const center = box.getCenter(new THREE.Vector3());
    avatarGroup.position.x -= center.x;
    avatarGroup.position.z -= center.z;
    avatarGroup.position.y -= box.min.y;
    const h = size.y || 1.8;
    const ty = h * (opts.targetY ?? 0.5);
    const dist = (h * 2.15) / Math.max(0.2, opts.zoom ?? 1); // zoom>1 = closer; margin keeps emotes in frame
    controls.target.set(0, ty, 0);
    controls.minDistance = dist * 0.35;
    controls.maxDistance = dist * 3.5;
    camera.near = h / 100;
    camera.far = h * 40;
    camera.updateProjectionMatrix();
    // view: yaw (azimuth, 0 = front) + pitch (elevation, deg) at the framing distance.
    // Re-fit on every call so parallel-loaded parts (which arrive in any order) always
    // end up correctly framed; auto-rotate / user drag take over once loading settles.
    const yaw = THREE.MathUtils.degToRad(opts.yaw ?? 0);
    const pitch = THREE.MathUtils.degToRad(opts.pitch ?? 20);
    const horiz = dist * Math.cos(pitch);
    camera.position.set(horiz * Math.sin(yaw), ty + dist * Math.sin(pitch), horiz * Math.cos(yaw));
    controls.update();
  }

  function applyColors(colors) {
    avatarGroup.traverse((o) => {
      if (!o.isMesh) return;
      const mats = Array.isArray(o.material) ? o.material : [o.material];
      for (const m of mats) {
        if (!m) continue;
        const name = (m.name || "").toLowerCase();
        if (colors.skin && /skin/.test(name)) m.color.copy(colors.skin);
        else if (colors.hair && /hair/.test(name)) m.color.copy(colors.hair);
      }
    });
  }

  // upstream removes specular (StandardMaterial specularColor=black) → matte avatar
  function mattify() {
    avatarGroup.traverse((o) => {
      if (!o.isMesh) return;
      const mats = Array.isArray(o.material) ? o.material : [o.material];
      for (const m of mats) {
        if (!m) continue;
        if ("metalness" in m) m.metalness = 0;
        if ("roughness" in m) m.roughness = 1;
        m.needsUpdate = true;
      }
    });
  }

  async function resolveAvatar() {
    // baseline: explicit urns + body
    let bodyShape = opts.body || DEFAULT_BODY;
    let wearables = Array.isArray(opts.urns)
      ? opts.urns.slice()
      : String(opts.urns || "").split(",").map((s) => s.trim()).filter(Boolean);
    let colors = { skin: null, hair: null, eyes: null };

    // an outfit: either an inline outfit object {bodyShape,wearables,eyes,hair,skin}
    // or a saved-outfit reference {address, slot} fetched from /lambdas/outfits
    let outfit = opts.outfit && typeof opts.outfit === "object" ? opts.outfit : null;
    if (outfit && outfit.address) {
      try {
        const env = await getJSON(`${base}/lambdas/outfits/${String(outfit.address).toLowerCase()}`);
        const list = env?.metadata?.outfits || env?.outfits || [];
        const slot = outfit.slot ?? 0;
        outfit = (list.find((o) => o.slot === slot) || list[0])?.outfit || null;
      } catch {
        outfit = null;
      }
    }

    if (outfit && (Array.isArray(outfit.wearables) || outfit.bodyShape)) {
      if (outfit.bodyShape) bodyShape = outfit.bodyShape;
      if (Array.isArray(outfit.wearables)) wearables = outfit.wearables;
      colors = { skin: colorOf(outfit.skin), hair: colorOf(outfit.hair), eyes: colorOf(outfit.eyes) };
    } else if (opts.profile) {
      const env = await getJSON(`${base}/lambdas/profile/${String(opts.profile).toLowerCase()}`);
      const av = (env.avatars || [])[0]?.avatar || {};
      if (av.bodyShape) bodyShape = av.bodyShape;
      if (Array.isArray(av.wearables) && av.wearables.length) wearables = av.wearables;
      colors = { skin: colorOf(av.skin), hair: colorOf(av.hair), eyes: colorOf(av.eyes) };
    }

    const seen = new Set();
    wearables = wearables.map(itemUrn).filter((u) => (seen.has(u) ? false : (seen.add(u), true)));
    return { bodyShape, wearables, colors };
  }

  async function loadEntityGlb(entity, bodyShape) {
    const main = representationMainFile(entity, bodyShape);
    if (!main) return null;
    const fileMap = fileMapFor(entity);
    const mainHash = fileMap.get(main.toLowerCase()) || fileMap.get(main.split("/").pop().toLowerCase());
    if (!mainHash) return null;
    const manager = new THREE.LoadingManager();
    manager.setURLModifier((url) => {
      if (/^(blob:|data:)/.test(url)) return url;
      const baseName = url.split("?")[0].split("/").pop().toLowerCase();
      const hash = fileMap.get(baseName);
      return hash ? `${base}/content/contents/${hash}` : url;
    });
    const gltf = await new GLTFLoader(manager).loadAsync(`${base}/content/contents/${mainHash}`);
    return gltf.scene;
  }

  function emoteUrlFor(e) {
    if (!e) return null;
    if (/^https?:\/\//.test(e) || e.startsWith("/") || e.startsWith("blob:")) return e;
    return EMOTES[e] || null;
  }

  async function playEmote(url) {
    try {
      const gltf = await new GLTFLoader().loadAsync(url);
      const clips = gltf.animations || [];
      if (!clips.length || disposed) return;
      // pick the avatar clip (tracks targeting Avatar_* bones); else the longest
      const avatarClip =
        clips.find((c) => c.tracks.some((t) => t.name.startsWith("Avatar_"))) ||
        clips.slice().sort((a, b) => b.duration - a.duration)[0];
      // play it on every loaded part (each shares the Avatar_* skeleton) so they move in sync
      for (const part of parts) {
        const mixer = new THREE.AnimationMixer(part);
        mixer.clipAction(avatarClip).play();
        mixers.push(mixer);
      }
      clock.getDelta(); // reset delta so the first frame isn't a huge jump
    } catch (err) {
      console.warn("[wearable-preview] emote failed", err);
    }
  }

  async function load() {
    try {
      if (opts.model) {
        setStatus("loading");
        const s = (await new GLTFLoader().loadAsync(opts.model)).scene;
        avatarGroup.add(s);
        parts.push(s);
        mattify();
        frame();
        const me = emoteUrlFor(opts.emote);
        if (me) await playEmote(me);
        setStatus("ready");
        return;
      }
      setStatus("loading");
      const { bodyShape, wearables, colors } = await resolveAvatar();
      if (disposed) return;
      const pointers = [bodyShape, ...wearables];
      const entities = await getJSON(`${base}/content/entities/active`, {
        method: "POST",
        headers: { "content-type": "application/json" },
        body: JSON.stringify({ pointers }),
      });
      if (disposed) return;
      const byPointer = new Map();
      for (const e of entities) for (const p of e.pointers || []) byPointer.set(String(p).toLowerCase(), e);

      // load every part concurrently; one slow/broken asset can't block the rest
      let loaded = 0;
      await Promise.allSettled(
        pointers.map(async (urn) => {
          const e = byPointer.get(urn.toLowerCase());
          if (!e) return;
          try {
            const obj = await Promise.race([
              loadEntityGlb(e, bodyShape),
              new Promise((_, rej) => setTimeout(() => rej(new Error("timeout")), 20000)),
            ]);
            if (obj && !disposed) {
              avatarGroup.add(obj);
              parts.push(obj);
              mattify();
              applyColors(colors);
              frame();
              loaded++;
            }
          } catch (err) {
            console.warn("[wearable-preview] failed", urn, err);
          }
        }),
      );
      if (disposed) return;
      mattify();
      applyColors(colors);
      frame();

      const m = emoteUrlFor(opts.emote);
      if (m && parts.length) await playEmote(m);

      setStatus(loaded ? "ready" : "empty");
    } catch (err) {
      console.error("[wearable-preview]", err);
      if (!disposed) setStatus("error");
    }
  }

  load();

  function dispose() {
    disposed = true;
    renderer.setAnimationLoop(null);
    for (const m of mixers) m.stopAllAction();
    controls.dispose();
    scene.traverse((o) => {
      if (o.geometry) o.geometry.dispose?.();
      const mats = o.material ? (Array.isArray(o.material) ? o.material : [o.material]) : [];
      for (const m of mats) {
        for (const k in m) {
          const v = m[k];
          if (v && v.isTexture) v.dispose();
        }
        m.dispose?.();
      }
    });
    renderer.dispose();
    if (renderer.domElement.parentNode === container) container.removeChild(renderer.domElement);
  }

  return { resize, dispose };
}
