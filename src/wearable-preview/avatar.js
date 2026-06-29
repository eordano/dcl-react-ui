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
  if (opts.background) renderer.setClearColor(new THREE.Color(opts.background), 1);
  else renderer.setClearColor(0x000000, 0);
  Object.assign(renderer.domElement.style, { width: "100%", height: "100%", display: "block" });
  container.appendChild(renderer.domElement);

  const scene = new THREE.Scene();
  const camera = new THREE.PerspectiveCamera(opts.fov ?? 34, 1, 0.05, 100);
  camera.position.set(0, 1, 3.5);

  scene.add(new THREE.HemisphereLight(0xffffff, 0xdadae2, 2.0));
  const fill = new THREE.HemisphereLight(0xeef2ff, 0xffffff, 0.7);
  fill.position.set(0, -1, 0);
  scene.add(fill);
  const front = new THREE.DirectionalLight(0xffffff, 0.55);
  front.position.set(0.4, 1.4, 3);
  scene.add(front);

  const interactive = opts.controls !== false;
  const controls = new OrbitControls(camera, renderer.domElement);
  controls.enablePan = !!opts.pan;
  controls.enableDamping = true;
  controls.dampingFactor = 0.08;
  controls.enabled = interactive;
  controls.enableZoom = interactive;
  controls.enableRotate = interactive;
  controls.autoRotate = opts.spin !== false;
  controls.autoRotateSpeed = opts.spinSpeed ?? 0.9;
  controls.minDistance = 0.6;
  controls.maxDistance = 8;

  const avatarGroup = new THREE.Group();
  scene.add(avatarGroup);

  const parts = [];
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
    const dist = (h * 2.15) / Math.max(0.2, opts.zoom ?? 1);
    controls.target.set(0, ty, 0);
    controls.minDistance = dist * 0.35;
    controls.maxDistance = dist * 3.5;
    camera.near = h / 100;
    camera.far = h * 40;
    camera.updateProjectionMatrix();
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
    let bodyShape = opts.body || DEFAULT_BODY;
    let wearables = Array.isArray(opts.urns)
      ? opts.urns.slice()
      : String(opts.urns || "").split(",").map((s) => s.trim()).filter(Boolean);
    let colors = { skin: null, hair: null, eyes: null };

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

  async function setEmote(input) {
    const url = emoteUrlFor(input);
    if (!url || disposed || !parts.length) return;
    for (const m of mixers) m.stopAllAction();
    mixers.length = 0;
    await playEmote(url);
  }

  async function playEmote(url) {
    try {
      const gltf = await new GLTFLoader().loadAsync(url);
      const clips = gltf.animations || [];
      if (!clips.length || disposed) return;
      const avatarClip =
        clips.find((c) => c.tracks.some((t) => t.name.startsWith("Avatar_"))) ||
        clips.slice().sort((a, b) => b.duration - a.duration)[0];
      for (const part of parts) {
        const mixer = new THREE.AnimationMixer(part);
        mixer.clipAction(avatarClip).play();
        mixers.push(mixer);
      }
      clock.getDelta();
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

      const bodyLc = String(bodyShape).toLowerCase();
      const catOf = (e) => e?.metadata?.data?.category || null;
      const equippedCats = new Set();
      const hidden = new Set();
      let skinEquipped = false;
      for (const urn of wearables) {
        const e = byPointer.get(urn.toLowerCase());
        const cat = catOf(e);
        if (!cat) continue;
        equippedCats.add(cat);
        if (cat === "skin") skinEquipped = true;
        const d = e.metadata?.data || {};
        for (const h of [...(d.hides || []), ...(d.replaces || [])])
          if (h !== cat) hidden.add(h);
      }
      if (skinEquipped)
        for (const c of [
          "eyes", "mouth", "eyebrows", "hair", "facial_hair",
          "upper_body", "lower_body", "feet", "hands_wear", "hands", "head",
        ])
          hidden.add(c);

      const HIDERS = [
        ["ubody_basemesh", () => equippedCats.has("upper_body") || hidden.has("upper_body")],
        ["lbody_basemesh", () => equippedCats.has("lower_body") || hidden.has("lower_body")],
        ["feet_basemesh", () => equippedCats.has("feet") || hidden.has("feet")],
        ["hands_basemesh", () => equippedCats.has("hands_wear") || hidden.has("hands") || hidden.has("hands_wear")],
        ["head_basemesh", () => hidden.has("head")],
        ["mask_eyes", () => hidden.has("eyes")],
        ["mask_eyebrows", () => hidden.has("eyebrows")],
        ["mask_mouth", () => hidden.has("mouth")],
      ];
      const hideBaseMeshes = (root) => {
        root.traverse((o) => {
          if (!o.isMesh) return;
          const names = [o.name, o.parent?.name]
            .filter(Boolean)
            .map((s) => s.toLowerCase());
          for (const [suffix, pred] of HIDERS) {
            if (names.some((n) => n.endsWith(suffix)) && (skinEquipped || pred())) {
              o.visible = false;
              break;
            }
          }
        });
      };

      let loaded = 0;
      await Promise.allSettled(
        pointers.map(async (urn) => {
          const e = byPointer.get(urn.toLowerCase());
          if (!e) return;
          const isBody = urn.toLowerCase() === bodyLc;
          if (!isBody && hidden.has(catOf(e))) return;
          try {
            const obj = await Promise.race([
              loadEntityGlb(e, bodyShape),
              new Promise((_, rej) => setTimeout(() => rej(new Error("timeout")), 20000)),
            ]);
            if (obj && !disposed) {
              if (isBody) hideBaseMeshes(obj);
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

  return { resize, dispose, setEmote };
}
