# dcl-react-ui

[![CI](https://github.com/eordano/dcl-react-ui/actions/workflows/ci.yml/badge.svg)](https://github.com/eordano/dcl-react-ui/actions/workflows/ci.yml)

A full product-UI implementation of the Decentraland client surfaces in React + TypeScript: marketplace flows, the explorer HUD and the in-world overlay bundle, the creator hub, and governance. It is an application UI — pages, workflows, and state wiring — not a component kit; everything renders with `react-dom` alone, no UI framework.

## Quickstart

```bash
npm ci --ignore-scripts
npm run storybook   # catalog on http://localhost:5006
npm test            # jsdom suite
npm run dev         # explorer SPA against live public endpoints
```

## Install as a library

The package is **not published to npm**. Install it from a packed tarball (or a git checkout built the same way):

```bash
git clone https://github.com/eordano/dcl-react-ui
cd dcl-react-ui
npm ci --ignore-scripts
npm run build:lib
npm pack            # -> dcl-react-ui-0.9.9.tgz

cd ../your-app
npm install ../dcl-react-ui/dcl-react-ui-0.9.9.tgz
```

```tsx
import { ManaPill } from "dcl-react-ui";
```

`build:lib` compiles `src/` module-for-module to ESM in `dist/` (with `.d.ts`), keeping CSS imports in place. The package sets `sideEffects: ["*.css"]`, so bundlers tree-shake unused modules and keep only the styles of what you import. The root export is a curated barrel; everything else is reachable as `dcl-react-ui/dist/<path>`.

## Endpoints

All network access goes through two seams in `src/data`: `siteBase()` (the marketing/dapp site) and, for the Decentraland services, `catalystBase()` plus a per-service base map in `src/data/catalyst/client.ts`. The published defaults point at the public Decentraland infrastructure so the SPA and Storybook show real data out of the box:

| Service | Env override | Published default |
|---|---|---|
| catalyst (content + lambdas) | `VITE_CATALYST_URL` | `https://peer.decentraland.org` |
| places | `VITE_PLACES_URL` | `https://places.decentraland.org` |
| events | `VITE_EVENTS_URL` | `https://events.decentraland.org` |
| communities | `VITE_COMMUNITIES_URL` | `https://social-api.decentraland.org` |
| communities thumbnails | `VITE_COMMUNITIES_CDN_URL` | `https://cdn.decentraland.org` |
| notifications | `VITE_NOTIFICATIONS_URL` | `https://notifications.decentraland.org` |
| badges | `VITE_BADGES_URL` | `https://badges.decentraland.org` |
| camera reel | `VITE_CAMERA_REEL_URL` | `https://camera-reel-service.decentraland.org` |
| map renders | `VITE_MAP_URL` | `https://api.decentraland.org` |
| satellite tiles | `VITE_SATELLITE_URL` | none public — the map skips the layer |
| site | `VITE_SITE_URL` | `https://decentraland.org` |

Every base is also injectable at runtime (`window.__SITE_BASE__`, `window.__CATALYST_BASE__`, `window.__SERVICE_BASES__ = { places: "…", … }`), and per-call via the `base` request option. A self-hosted node that fronts all services on one host just points every var at it. Services that need a signed identity (notifications, favorites/likes, uploads) degrade to their empty states when no engine bridge or wallet is present.

## The catalog

Storybook is the map of the repo: 191 story files cover the atoms, components, and product pages, with network calls mocked by MSW (`.storybook/public/mockServiceWorker.js`), theme + viewport toolbars, and an a11y panel. `npm run storybook` serves it on :5006; `npm run build-storybook` writes a static build to `storybook-static/`.

## Builds

| Command | Output |
|---|---|
| `npm run dev` | vite dev server for the explorer SPA (`src/app`) |
| `npm run build:app` | SPA → `dist-app/` |
| `npm run build:overlay` | in-world HUD bundle (`src/overlay/overlay-main.tsx`) → `dist-overlay/overlay.js` |
| `npm run build:lib` | tree-shakeable ESM library → `dist/` (see “Install as a library”) |
| `npm run typecheck` | `tsc --noEmit` |

`npm run overlay:publish` syncs `dist-overlay/` into a sibling `../bevy-explorer` checkout; without one it prints a notice and exits 0.

## Testing

Interaction tests live in the stories as Storybook `play` functions (files named `*.interactions.stories.tsx`). They use `storybook/test` (`userEvent` / `within` / `expect` / `fn` / `fireEvent`), are debuggable in the Storybook Interactions panel, and run headlessly by two runners over the same `play` functions:

| Command | Runner | DOM | Scope |
|---|---|---|---|
| `npm test` | vitest + jsdom, portable stories (`composeStories`) | jsdom | 35 files / 254 tests |
| `npm run test:browser` | `@storybook/addon-vitest` + `@vitest/browser` + playwright | real Chromium | every story: 191 files / 681 tests |
| `npm run test:all` | both | | |

- jsdom — `vitest.config.ts` (jsdom + `@vitejs/plugin-react`): unit tests and bridge-mocking `*.interactions.test.tsx` files. No browser needed.
- real-DOM — `vitest.browser.config.ts`: the `storybookTest` plugin turns EVERY story into a browser test (opt out per story with `tags: ["no-test"]`), running its `play` function and the a11y (axe) gate in headless Chromium. The browser resolves in order: `$CHROMIUM_BIN`, a `/nix/store/*chromium*` install, playwright's managed Chromium.
- Shared setup: `.storybook/vitest.setup.ts` applies the Storybook preview decorators (`setProjectAnnotations`) + `@testing-library/jest-dom` matchers.

### Add a test

1. Add a story (a `play` function makes it an interaction test; without one it is still a render + a11y test). The browser runner picks up every story automatically — no registration. Opt out with `tags: ["no-test"]`.
2. If it needs a mocked module dependency, give it a dedicated `*.interactions.test.tsx` that `vi.mock`s the module and asserts on the mock (jsdom only; the browser runner asserts the observable UI effect via the `play`).
