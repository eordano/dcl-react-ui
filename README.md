# dcl-react-ui

A React re-implementation of the [Decentraland](https://decentraland.org) product UIs,
aiming for near-pixel-perfect parity with the live clients and dapps.

Everything is plain **React 19 (`react-dom` only)** and hand-written CSS — no TypeScript,
no UI framework, no router library. Components mirror the real layouts, sprites, and fonts
so a screenshot of this repo lines up with a screenshot of production.

## What's in here

The UI is rebuilt surface by surface under `src/`:

| Surface | Folder | Covers |
|---|---|---|
| Explorer | `src/explorer` | In-world client: HUD, chat, minimap, backpack, map, places, events, communities, passport, camera/reel, overlays (emote wheel, emoji, skybox, teleport, rewards…) |
| Web / auth | `src/web` | Pre-world flows — login, OTP, verify, web3 confirm, gifting, credits, donations |
| Marketplace | `src/marketplace` | Item/collection browsing, listings, bids, sell/transfer flows |
| Account | `src/account` | Wallet, settings, profile surfaces |
| Builder | `src/builder` | Scene builder UI |
| Creator Hub | `src/creatorhub` | Creator-facing dashboards and editors |
| Governance | `src/governance` | DAO proposals, voting, submissions |
| Forum | `src/forum` | Community forum surface |
| Misc | `src/scenelab`, `src/opendcl`, `src/editor`, `src/overlay` | Smaller experiments and the in-game overlay bundle |

Shared building blocks live in `src/atoms`, `src/molecules`, and `src/components`
(buttons, modals, cards, context menus, avatar stage, etc.).

`public/` holds the real sprites and fonts the components reference at `/assets` and `/fonts`.

## Running it

```bash
npm install

npm run dev          # Vite dev server — the explorer SPA at /
npm run storybook    # Storybook component catalog on :6006
```

### The explorer SPA

`src/App.jsx` is a tiny hash router over ~80 explorer screens, grouped into areas
(Pre-world, HUD, Explore, Social, Economy/Media, Overlays, Shared/Demo). Open `/`
for the index, then:

- click a screen, or use <kbd>←</kbd> / <kbd>→</kbd> to step through them
- press <kbd>i</kbd> to jump back to the index

A few query params help when capturing screenshots: `?still` (freeze animations),
`?scroll=bottom|right|both` (auto-scroll), `?probe=<selector>` (dump element metrics).

### Storybook

Every surface — including the dapps that aren't wired into the explorer SPA — is
exercised through Storybook (~390 stories across `src/**/*.stories.jsx`). This is the
fastest way to see marketplace, account, builder, creator-hub, governance, and forum
screens in isolation.

## Builds

```bash
npm run build           # Vite SPA  -> dist/
npm run build:static    # SPA + a no-JS static snapshot of every route -> static/
npm run build:overlay   # IIFE bundle of the in-game overlay -> dist-overlay/overlay.js
npm run build-storybook # component catalog -> storybook-static/
```

`scripts/` contains the screenshot/parity tooling used to compare against production
(route snapshotting, button measuring, mobile probing). `scripts/export-static.sh`
drives a headless Chrome to snapshot each SPA route into self-contained HTML.

## Deployment

`.github/workflows/pages.yml` builds and publishes the whole site to GitHub Pages on
every push to `main`, in three views:

- `/` — the Vite SPA (hash-routed)
- `/static/` — the self-contained, no-JS static export
- `/storybook/` — the Storybook component catalog

## Stack

React 19 · Vite 8 · Storybook 10 · plain JSX + CSS.
