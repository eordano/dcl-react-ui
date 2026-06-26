export const BLOG_CATEGORIES = [
  { id: "all", slug: "", title: "All articles" },
  { id: "c-ann", slug: "announcements", title: "Announcements" },
  { id: "c-plat", slug: "platform", title: "Platform" },
  { id: "c-comm", slug: "community", title: "Community" },
  { id: "c-eco", slug: "ecosystem", title: "Ecosystem" },
  { id: "c-tut", slug: "tutorials", title: "Tutorials" },
];

export const blogCategories = (activeSlug = "") =>
  BLOG_CATEGORIES.map((c) => ({ ...c, root: c.slug === "", active: c.slug === activeSlug }));
