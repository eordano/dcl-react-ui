export const qk = {
  profile: (addr) => ["profile", addr],
  badges: (addr) => ["badges", addr],
  photos: (addr) => ["photos", addr],

  wearables: (addr) => ["wearables", addr],
  emotes: (addr) => ["emotes", addr],

  places: (params) => ["places", params ?? {}],
  place: (id) => ["place", id],
  categories: () => ["categories"],

  events: (params) => ["events", params ?? {}],
  eventCategories: () => ["event-categories"],

  communities: (params) => ["communities", params ?? {}],
  community: (id) => ["community", id],
  communityMembers: (id) => ["community-members", id],

  friends: (addr) => ["friends", addr],
  notifications: (addr) => ["notifications", addr],
};

export const STALE = {
  categories: 60 * 60 * 1000,
  eventCategories: 60 * 60 * 1000,
  profile: 5 * 60 * 1000,
  badges: 5 * 60 * 1000,
  photos: 5 * 60 * 1000,
  wearables: 5 * 60 * 1000,
  emotes: 5 * 60 * 1000,
  places: 30 * 1000,
  place: 30 * 1000,
  events: 5 * 60 * 1000,
  communities: 60 * 1000,
  community: 60 * 1000,
  communityMembers: 60 * 1000,
  friends: 60 * 1000,
  notifications: 30 * 1000,
};
