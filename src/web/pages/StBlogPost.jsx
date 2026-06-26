import SitesChrome from "../frames/SitesChrome.jsx";
import { BLOG_CATEGORIES } from "../../data/blogCategories.js";
import "./stblogpost.css";

const CATEGORIES = BLOG_CATEGORIES;

const POST = {
  id: "post-1",
  slug: "decentraland-2-0-is-here",
  title: "Decentraland 2.0 Is Here: A New Era for the Open Metaverse",
  description:
    "The biggest update in Decentraland's history brings a brand-new desktop client, stunning visuals, and a smoother way to explore everything the world has to offer.",
  publishedDate: "Jun 18, 2026",
  image: { url: "/assets/home-hero.webp", width: 1200, height: 600 },
  category: { id: "announcements", title: "Announcements", slug: "announcements", url: "/blog/announcements" },
  author: {
    id: "dcl-foundation",
    title: "Decentraland Foundation",
    slug: "decentraland-foundation",
    image: { url: "" },
    url: "/blog/author/decentraland-foundation",
  },
  body: [
    {
      type: "p",
      content:
        "Today marks a milestone we've been working toward for years. Decentraland 2.0 reimagines the open metaverse from the ground up — faster, more beautiful, and built to run everywhere. Whether you're a long-time citizen or stepping in for the first time, there has never been a better moment to jump in.",
    },
    { type: "h2", content: "A Brand-New Desktop Client" },
    {
      type: "p",
      content:
        "The new native desktop client delivers dramatically improved load times, richer lighting, and a redesigned interface that puts discovery front and center. Scenes load seamlessly as you move through the world, and the new map makes finding events, communities, and friends effortless.",
    },
    {
      type: "quote",
      content:
        "We didn't just rebuild the client — we rebuilt the experience of being in a world that belongs to its community.",
    },
    { type: "h3", content: "What's New for Explorers" },
    {
      type: "ul",
      items: [
        "Photorealistic visuals with upgraded lighting and shadows",
        "A reimagined map and discovery hub for events and places",
        "Smoother avatar movement and faster scene transitions",
        "Voice chat and richer social tools built right in",
      ],
    },
    {
      type: "p",
      content:
        "And this is only the beginning. The roadmap ahead is shaped by the DAO and the creators who make Decentraland what it is. Download the new client, invite a friend, and come see what the open metaverse can be.",
    },
  ],
};

const RELATED = [
  {
    id: "rel-1",
    title: "How to Set Up Your First World in Minutes",
    publishedDate: "Jun 12, 2026",
    image: { url: "" },
    category: { title: "Creators", slug: "creators", url: "/blog/creators" },
    url: "/blog/creators/set-up-your-first-world",
  },
  {
    id: "rel-2",
    title: "Inside the DAO: How Decentraland Governs Itself",
    publishedDate: "Jun 05, 2026",
    image: { url: "" },
    category: { title: "Community", slug: "community", url: "/blog/community" },
    url: "/blog/community/inside-the-dao",
  },
  {
    id: "rel-3",
    title: "Five Can't-Miss Events Happening This Week",
    publishedDate: "May 29, 2026",
    image: { url: "" },
    category: { title: "Events", slug: "events", url: "/blog/events" },
    url: "/blog/events/cant-miss-events",
  },
];

const CARD_GRADS = [
  "linear-gradient(160deg, #ff2d55 0%, #ffa25a 100%)",
  "linear-gradient(160deg, #c640cd 0%, #691fa9 100%)",
  "linear-gradient(160deg, #438fff 0%, #34ce76 100%)",
];

const SearchIcon = () => (
  <svg viewBox="0 0 24 24" width="16" height="16" aria-hidden="true">
    <circle cx="11" cy="11" r="7" stroke="currentColor" strokeWidth="1.8" fill="none" />
    <path d="M21 21l-4.3-4.3" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
  </svg>
);

const XGlyph = () => (
  <svg viewBox="0 0 24 24" width="18" height="18" aria-hidden="true">
    <path d="M17.5 3h2.7l-5.9 6.7L21.3 21h-5.4l-4.3-5.6L6.7 21H4l6.3-7.2L3 3h5.5l3.9 5.1L17.5 3Zm-1 16.2h1.5L7.6 4.7H6l10.5 14.5Z" fill="currentColor" />
  </svg>
);

const FacebookGlyph = () => (
  <svg viewBox="0 0 24 24" width="18" height="18" aria-hidden="true">
    <path d="M22 12a10 10 0 1 0-11.6 9.9v-7H7.9V12h2.5V9.8c0-2.5 1.5-3.9 3.8-3.9 1.1 0 2.2.2 2.2.2v2.5h-1.2c-1.2 0-1.6.8-1.6 1.6V12h2.7l-.4 2.9h-2.3v7A10 10 0 0 0 22 12Z" fill="currentColor" />
  </svg>
);

function PostBody({ body }) {
  return (
    <div className="stblogpost__body">
      {body.map((block, i) => {
        switch (block.type) {
          case "h2":
            return <h2 key={i}>{block.content}</h2>;
          case "h3":
            return <h3 key={i}>{block.content}</h3>;
          case "h4":
            return <h4 key={i}>{block.content}</h4>;
          case "quote":
            return <blockquote key={i}>{block.content}</blockquote>;
          case "ul":
            return (
              <ul key={i}>
                {block.items.map((it, j) => (
                  <li key={j}>{it}</li>
                ))}
              </ul>
            );
          case "p":
          default:
            return <p key={i}>{block.content}</p>;
        }
      })}
    </div>
  );
}

function RelatedCard({ post, grad }) {
  return (
    <a className="stblogpost__card" href={post.url}>
      <span
        className="stblogpost__cardimg"
        style={post.image.url ? { backgroundImage: `url(${post.image.url})` } : { backgroundImage: grad }}
        aria-hidden="true"
      />
      <div>
        <p className="stblogpost__cardmeta">
          <span className="stblogpost__carddate">{post.publishedDate}</span>
          <span>
            <a className="stblogpost__cardcat" href={post.category.url}>
              {post.category.title}
            </a>
          </span>
        </p>
        <span className="stblogpost__cardtitle">
          <h2>{post.title}</h2>
        </span>
      </div>
    </a>
  );
}

function BlogNavigation({ activeCategory }) {
  return (
    <nav className="stblogpost__nav" aria-label="Blog categories">
      <div className="stblogpost__navcontent">
        <div className="stblogpost__navwrap">
          <div className="stblogpost__cats">
            <ul className="stblogpost__catlist">
              {CATEGORIES.map((c) => {
                const path = c.slug ? `/blog?category=${c.slug}` : "/blog";
                const isActive = c.slug === activeCategory || (!c.slug && !activeCategory);
                return (
                  <li className="stblogpost__catitem" key={c.id}>
                    <a
                      href={path}
                      className={"stblogpost__catlink" + (isActive ? " is-active" : "")}
                      aria-current={isActive ? "page" : undefined}
                    >
                      {c.title}
                    </a>
                  </li>
                );
              })}
            </ul>
          </div>
          <label className="stblogpost__search">
            <SearchIcon />
            <input className="stblogpost__searchinput" type="search" placeholder="Search articles" />
          </label>
        </div>
      </div>
    </nav>
  );
}

export default function StBlogPost({ post = POST, related = RELATED, state = "ready" }) {
  const activeCategory = post?.category?.slug;

  return (
    <SitesChrome>
      <div className="stblogpost">
        <div className="stblogpost__layout">
          <BlogNavigation activeCategory={activeCategory} />

          {state === "loading" && (
            <div className="stblogpost__contentwrap">
              <div className="stblogpost__centered">
                <div className="stblogpost__spinner" role="status" aria-label="Loading post" />
              </div>
            </div>
          )}

          {state === "error" && (
            <div className="stblogpost__contentwrap">
              <div className="stblogpost__centered">
                <p className="stblogpost__error">There was an error loading the post.</p>
              </div>
            </div>
          )}

          {state === "ready" && post && (
            <>
              <div className="stblogpost__contentwrap">
                <article className="stblogpost__content">
                  {post.image?.url ? (
                    <img
                      className="stblogpost__image"
                      src={post.image.url}
                      alt={post.title}
                      width={post.image.width}
                      height={post.image.height}
                    />
                  ) : (
                    <div
                      className="stblogpost__image stblogpost__image--ph"
                      role="img"
                      aria-label={post.title}
                    />
                  )}

                  <header className="stblogpost__header">
                    <p className="stblogpost__meta">
                      {post.publishedDate}
                      <span className="stblogpost__metasep">•</span>
                      <a className="stblogpost__catmeta" href={post.category.url}>
                        {post.category.title}
                      </a>
                    </p>
                    <div className="stblogpost__titlebox">
                      <h1 className="stblogpost__title">{post.title}</h1>
                    </div>
                    <p className="stblogpost__subtitle">{post.description}</p>
                  </header>

                  {post.author && post.author.title && (
                    <div className="stblogpost__authorrow">
                      <div>
                        <a className="stblogpost__authorlink" href={post.author.url}>
                          <span
                            className="stblogpost__avatar"
                            style={post.author.image?.url ? { backgroundImage: `url(${post.author.image.url})` } : undefined}
                            aria-hidden="true"
                          />
                          <span className="stblogpost__authorname">{post.author.title}</span>
                        </a>
                      </div>
                      <div className="stblogpost__share">
                        <span className="stblogpost__sharelabel">Share</span>
                        <a className="stblogpost__sharelink" href={`https://x.com/intent/post?text=${encodeURIComponent(post.title)}&url=${encodeURIComponent(`https://decentraland.org/blog/${post.slug}`)}`} target="_blank" rel="noopener noreferrer" aria-label="Share on X">
                          <XGlyph />
                        </a>
                        <a className="stblogpost__sharelink" href={`https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(`https://decentraland.org/blog/${post.slug}`)}`} target="_blank" rel="noopener noreferrer" aria-label="Share on Facebook">
                          <FacebookGlyph />
                        </a>
                      </div>
                    </div>
                  )}

                  <PostBody body={post.body} />
                </article>
              </div>

              {related && related.length > 0 && (
                <section className="stblogpost__related">
                  <div className="stblogpost__relatedinner">
                    <h2 className="stblogpost__relatedtitle">Related Posts</h2>
                    <div className="stblogpost__relatedwrap">
                      {related.slice(0, 3).map((rp, i) => (
                        <RelatedCard key={rp.id} post={rp} grad={CARD_GRADS[i % CARD_GRADS.length]} />
                      ))}
                    </div>
                  </div>
                </section>
              )}
            </>
          )}
        </div>
      </div>
    </SitesChrome>
  );
}
