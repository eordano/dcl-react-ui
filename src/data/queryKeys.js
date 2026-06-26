// Query key factory — the single source of truth for TanStack Query cache keys.
// Panel hooks and prefetch handlers MUST build keys through this object so that
// hover-prefetch and the on-click useQuery resolve to the same cache entry.

export const qk = {
  // passport / profile
  profile: (addr) => ["profile", addr],
  badges: (addr) => ["badges", addr],
  photos: (addr) => ["photos", addr],

  // backpack
  wearables: (addr) => ["wearables", addr],
  emotes: (addr) => ["emotes", addr],

  // map / places
  places: (params) => ["places", params ?? {}],
  place: (id) => ["place", id],
  categories: () => ["categories"],

  // events
  events: (params) => ["events", params ?? {}],
  eventCategories: () => ["event-categories"],

  // communities
  communities: (params) => ["communities", params ?? {}],
  community: (id) => ["community", id],
  communityMembers: (id) => ["community-members", id],

  // social
  friends: (addr) => ["friends", addr],
  notifications: (addr) => ["notifications", addr],
};

// Per-resource staleTime hints (ms). Hooks read these so cache freshness is
// tuned per resource rather than relying on the global default.
export const STALE = {
  categories: 60 * 60 * 1000, // ~1h
  eventCategories: 60 * 60 * 1000,
  profile: 5 * 60 * 1000, // ~5m
  badges: 5 * 60 * 1000,
  photos: 5 * 60 * 1000,
  wearables: 5 * 60 * 1000,
  emotes: 5 * 60 * 1000,
  places: 30 * 1000, // ~30s
  place: 30 * 1000,
  events: 5 * 60 * 1000,
  communities: 60 * 1000,
  community: 60 * 1000, // ~60s
  communityMembers: 60 * 1000,
  friends: 60 * 1000,
  notifications: 30 * 1000,
};
