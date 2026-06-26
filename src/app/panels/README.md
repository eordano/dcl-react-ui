# Panel module contract

The SPA shell auto-discovers every panel via `import.meta.glob("./panels/*.route.jsx")`
in `src/app/router.jsx`. **Add a file here — never edit a shared shell file.**

## Where
`src/app/panels/<Name>.route.jsx`

The route id (and the hash url) is the filename lowercased, minus `.route.jsx`:

| File                       | id              | url            | active tab |
| -------------------------- | --------------- | -------------- | ---------- |
| `Map.route.jsx`            | `map`           | `#/map`        | Map        |
| `Events.route.jsx`         | `events`        | `#/events`     | Events     |
| `Communities.route.jsx`    | `communities`   | `#/communities`| Communities|
| `Backpack.route.jsx`       | `backpack`      | `#/backpack`   | Backpack   |
| `Passport.route.jsx`       | `passport`      | `#/passport`   | (avatar)   |
| `Friends.route.jsx`        | `friends`       | `#/friends`    | —          |
| `Notifications.route.jsx`  | `notifications` | `#/notifications` | —       |

> The id MUST equal the `id` of the corresponding tab in
> `src/explorer/frames/ExploreChrome.jsx` `EXPLORE_TABS` (or the `passport`
> alias) so the tab highlights + hover-prefetch resolve.

## Exports

1. **`export default`** — the panel React component. Rendered inside
   `ExploreChrome`'s body via `<Outlet/>`, already wrapped in `<Suspense>`.
   Receives **no required props**: it calls its own data hook and passes results
   into the reused ui3 page. An unwired/loading panel must still render (the ui3
   pages have mock-data fallbacks).

2. **`export function prefetch(queryClient)`** *(optional but recommended)* —
   warms the TanStack Query cache for instant render. Called on hover/focus
   intent over the tab. Use the same `qk.*` keys + `STALE.*` + query fn your
   hook uses. Must be best-effort (never throw to the caller).

## Rules

- **Data**: build HTTP wrappers at `src/data/catalyst/<domain>.js` over
  `getJSON` from `src/data/catalyst/client.js`. Wrap reads in
  `src/data/hooks/use<Resource>.js` (`useQuery`). Keys come from `qk` in
  `src/data/queryKeys.js`; staleTime from `STALE`.
- **AbortSignal**: forward `{ signal }` from the query fn ctx into `getJSON`
  (`queryFn: ({ signal }) => fetchX(addr, { signal })`) so panel switches cancel
  in-flight reads.
- **Identity (read-only)**: `import { useBridgeState } from "../../overlay/bridge.js"`
  → `useBridgeState().identity.address` / `.isGuest`. Never assume an inbound
  open/close event; the overlay is self-driven.
- **Engine actions (outbound only)**: teleport via `window.engine?.teleport(x, y)`,
  realm switch via `window.engine?.changerealm(url)`. No other engine coupling.
- **Auth-gated / edge-404 surfaces** (notifications, badges, photos, friends,
  live communities list): import a fixture from `src/data/fixtures.js` now; flip
  to live later by attaching a signed header through the same `getJSON` path — no
  structural change. WRITES are stubbed (this milestone is reads-only).
- **Reuse ui3 pages** from `src/explorer/{pages,components,frames}` — do not
  rebuild UI.

See `_TEMPLATE.route.jsx.txt` for a copy-paste skeleton.
