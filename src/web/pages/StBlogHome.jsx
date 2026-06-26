import { useMemo, useState } from "react";
import { blogCategories } from "../../data/blogCategories.js";
import SitesChrome from "../frames/SitesChrome.jsx";
import "./stbloghome.css";

const poster = (hue) => ({
  backgroundImage: `linear-gradient(150deg, hsl(${hue} 70% 52%) 0%, hsl(${(hue + 40) % 360} 60% 28%) 100%)`,
});

const CATEGORIES = blogCategories("");

const POSTS = [
  {
    id: "p1",
    title: "Decentraland 2.0 is Here: A New Era for the Open Metaverse",
    description:
      "The biggest update in Decentraland's history brings a brand-new desktop client, faster load times, and a redesigned in-world experience built from the ground up.",
    publishedDate: "JUN 18, 2026",
    category: { title: "Announcements", url: "/blog/announcements" },
    hue: 268,
  },
  {
    id: "p2",
    title: "Metaverse Fashion Week Returns Bigger Than Ever",
    description:
      "Top brands, independent designers, and wearable creators converge for a week of runway shows, drops, and after-parties across the city.",
    publishedDate: "JUN 14, 2026",
    category: { title: "Community", url: "/blog/community" },
    hue: 320,
  },
  {
    id: "p3",
    title: "How the DAO Voted to Fund the Next Wave of Creators",
    description: "Inside the latest treasury grant round and what it means for builders.",
    publishedDate: "JUN 10, 2026",
    category: { title: "Ecosystem", url: "/blog/ecosystem" },
    hue: 200,
  },
  {
    id: "p4",
    title: "Building Smart Items: A Beginner's Guide to the Creator Hub",
    description: "From your first scene to a published interactive experience.",
    publishedDate: "JUN 6, 2026",
    category: { title: "Tutorials", url: "/blog/tutorials" },
    hue: 130,
  },
  {
    id: "p5",
    title: "Genesis Plaza Gets a Makeover: What's New in the Welcome Hub",
    description: "A refreshed onboarding experience for every new explorer.",
    publishedDate: "JUN 2, 2026",
    category: { title: "Platform", url: "/blog/platform" },
    hue: 48,
  },
  {
    id: "p6",
    title: "Spotlight: The Communities Building the Future of the Metaverse",
    description: "Meet the DAOs, districts, and collectives shaping Decentraland.",
    publishedDate: "MAY 28, 2026",
    category: { title: "Community", url: "/blog/community" },
    hue: 305,
  },
  {
    id: "p7",
    title: "Wearable Drop: CryptoArt Studios Launches Limited Collection",
    description: "A new collaboration brings rare emotes and outfits to the marketplace.",
    publishedDate: "MAY 24, 2026",
    category: { title: "Ecosystem", url: "/blog/ecosystem" },
    hue: 18,
  },
];

const SearchIcon = () => (
  <svg viewBox="0 0 24 24" width="18" height="18" fill="none" aria-hidden="true">
    <circle cx="11" cy="11" r="7" stroke="currentColor" strokeWidth="2" />
    <path d="m20 20-3.2-3.2" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
  </svg>
);

function BlogNavigation({ categories, onSearch, query }) {
  return (
    <div className="stbloghome__nav">
      <div className="stbloghome__navcontent">
        <div className="stbloghome__navwrap">
          <nav className="stbloghome__cats" aria-label="Blog categories">
            <ul className="stbloghome__catlist">
              {categories.map((c) => (
                <li className="stbloghome__catitem" key={c.id}>
                  <a
                    className={"stbloghome__catlink" + (c.active ? " is-active" : "")}
                    href={c.slug ? `/blog?category=${c.slug}` : "/blog"}
                    aria-current={c.active ? "page" : undefined}
                  >
                    {c.title}
                  </a>
                </li>
              ))}
            </ul>
          </nav>
          <div className="stbloghome__search">
            <span className="stbloghome__searchicon" aria-hidden="true">
              <SearchIcon />
            </span>
            <input
              type="text"
              className="stbloghome__searchinput"
              placeholder="Search..."
              value={query}
              onChange={(e) => onSearch(e.target.value)}
              aria-label="Search the Decentraland Blog"
            />
          </div>
        </div>
      </div>
    </div>
  );
}

function PostCard({ post }) {
  return (
    <article className="stbloghome__card">
      <a className="stbloghome__cardimglink" href={`/blog/${post.id}`}>
        <span className="stbloghome__cardimg" style={poster(post.hue)} role="img" aria-label={post.title} />
      </a>
      <div className="stbloghome__cardinfo">
        <div className="stbloghome__meta">
          <span className="stbloghome__date">{post.publishedDate}</span>
          <span>
            <a className="stbloghome__catlnk" href={post.category.url}>
              {post.category.title}
            </a>
          </span>
        </div>
        <a className="stbloghome__titlelink" href={`/blog/${post.id}`}>
          <h2 className="stbloghome__cardtitle">{post.title}</h2>
        </a>
      </div>
    </article>
  );
}

function MainPostCard({ post }) {
  return (
    <div className="stbloghome__main">
      <a className="stbloghome__mainimglink" href={`/blog/${post.id}`}>
        <span className="stbloghome__mainimg" style={poster(post.hue)} role="img" aria-label={post.title} />
      </a>
      <div className="stbloghome__maininfo">
        <div className="stbloghome__meta">
          <span className="stbloghome__date">{post.publishedDate}</span>
          <span>
            <a className="stbloghome__catlnk" href={post.category.url}>
              {post.category.title}
            </a>
          </span>
        </div>
        <a className="stbloghome__titlelink" href={`/blog/${post.id}`}>
          <h2 className="stbloghome__maintitle">{post.title}</h2>
        </a>
        <p className="stbloghome__maindesc">{post.description}</p>
      </div>
    </div>
  );
}

function MainPostSkeleton() {
  return (
    <div className="stbloghome__main">
      <span className="stbloghome__skel stbloghome__skel--mainimg" />
      <div className="stbloghome__maininfo">
        <div className="stbloghome__skelhead">
          <span className="stbloghome__skel stbloghome__skel--meta" />
          <span className="stbloghome__skel stbloghome__skel--meta" />
        </div>
        <span className="stbloghome__skel stbloghome__skel--titleline" />
        <span className="stbloghome__skel stbloghome__skel--titleline stbloghome__skel--short" />
        <div className="stbloghome__skelbody">
          <span className="stbloghome__skel stbloghome__skel--text" />
          <span className="stbloghome__skel stbloghome__skel--text" />
          <span className="stbloghome__skel stbloghome__skel--text" />
          <span className="stbloghome__skel stbloghome__skel--text stbloghome__skel--short" />
        </div>
      </div>
    </div>
  );
}

function PostCardSkeleton() {
  return (
    <article className="stbloghome__card">
      <span className="stbloghome__skel stbloghome__skel--cardimg" />
      <div className="stbloghome__cardinfo">
        <div className="stbloghome__skelhead">
          <span className="stbloghome__skel stbloghome__skel--meta" />
          <span className="stbloghome__skel stbloghome__skel--meta" />
        </div>
        <span className="stbloghome__skel stbloghome__skel--text" />
        <span className="stbloghome__skel stbloghome__skel--text stbloghome__skel--short" />
      </div>
    </article>
  );
}

function PostList({ posts, loading, hasMainPost }) {
  if (loading && posts.length === 0) {
    const count = hasMainPost ? 7 : 6;
    return (
      <div className={"stbloghome__list" + (hasMainPost ? " has-main" : "")}>
        {hasMainPost && <MainPostSkeleton />}
        {Array.from({ length: count }, (_, i) =>
          hasMainPost && i === 0 ? null : <PostCardSkeleton key={`sk-${i}`} />
        )}
      </div>
    );
  }

  if (!posts || posts.length === 0) {
    return <div className="stbloghome__empty">Nothing to show</div>;
  }

  const firstRealPost = posts[0];

  return (
    <div className={"stbloghome__list" + (hasMainPost ? " has-main" : "")}>
      {hasMainPost && firstRealPost && <MainPostCard post={firstRealPost} />}
      {posts.map((post) => {
        if (hasMainPost && post === firstRealPost) return null;
        return <PostCard key={post.id} post={post} />;
      })}
    </div>
  );
}

export default function StBlogHome({
  posts = POSTS,
  categories = CATEGORIES,
  loading = false,
  error = false,
  hasMainPost = true,
}) {
  const [query, setQuery] = useState("");
  const isLoadingInitial = useMemo(() => loading && posts.length === 0, [loading, posts]);

  return (
    <SitesChrome>
      <div className="stbloghome">
        <BlogNavigation categories={categories} onSearch={setQuery} query={query} />
        <div className="stbloghome__content">
          {error ? (
            <div className="stbloghome__error">
              <span className="stbloghome__errortext">Failed to load posts. Please try again later.</span>
            </div>
          ) : (
            <PostList posts={posts} loading={isLoadingInitial} hasMainPost={hasMainPost} />
          )}
        </div>
      </div>
    </SitesChrome>
  );
}
