export default function PlaceCard({
  title,
  image,
  players,
  rating,
  coords,
  live,
  featured,
  creator,
  hue = 0,
  to,
}) {
  return (
    <article className="pl__card" data-sb-linkto={to || undefined}>
      <div
        className="pl__thumb"
        style={{
          "--hue": hue,
          ...(image ? { "--thumb-img": `url("${image}")` } : null),
        }}
        aria-hidden="true"
      />

      <div className="pl__badges">
        {live != null && (
          <span className="pl__badge pl__badge--live">
            <svg viewBox="0 0 24 24" width="11" height="11" fill="none"
              stroke="currentColor" strokeWidth="2" strokeLinecap="round" aria-hidden="true">
              <path d="M5.6 8.6a8 8 0 0 0 0 6.8M8.5 10.5a4 4 0 0 0 0 3M18.4 8.6a8 8 0 0 1 0 6.8M15.5 10.5a4 4 0 0 1 0 3" />
              <circle cx="12" cy="12" r="1.4" fill="currentColor" stroke="none" />
            </svg>
            LIVE
          </span>
        )}
        <span className="pl__badge pl__badge--players">
          <span className="pl__onlinedot" />
          <svg viewBox="0 0 24 24" width="11" height="11" fill="currentColor" aria-hidden="true">
            <path d="M12 4a4 4 0 1 0 0 8 4 4 0 0 0 0-8Zm0 10c-4.4 0-8 2.2-8 5v1h16v-1c0-2.8-3.6-5-8-5Z" />
          </svg>
          {players}
        </span>
      </div>

      {featured && (
        <span className="pl__featured">
          <svg viewBox="0 0 24 24" width="11" height="11" fill="none"
            stroke="currentColor" strokeWidth="2" strokeLinecap="round"
            strokeLinejoin="round" aria-hidden="true">
            <circle cx="12" cy="9" r="5" />
            <path d="M9 13.4 7.5 21l4.5-2.6L16.5 21 15 13.4" />
          </svg>
          Featured
        </span>
      )}

      {title && (
        <div className="pl__info">
          <div className="pl__infotext">
            <span className="pl__cardtitle u-truncate">{title}</span>
            <span className="pl__cardsub u-truncate">{creator}</span>
          </div>
          <div className="pl__infometa">
            <span className="pl__rating">
              <svg viewBox="0 0 24 24" width="13" height="13" fill="none"
                stroke="currentColor" strokeWidth="2" strokeLinejoin="round" aria-hidden="true">
                <path d="M7 22V11M7 13H4v9h3M11 11V6a2 2 0 0 0-4 0v5M11 11l3-5a1.6 1.6 0 0 1 2.8 1.4L16 11h2.6a2 2 0 0 1 2 2.4l-1.2 6a2 2 0 0 1-2 1.6H7" />
              </svg>
              {rating}%
            </span>
            {coords && (
              <span className="pl__coords u-truncate">
                <svg viewBox="0 0 24 24" width="11" height="11" fill="none"
                  stroke="currentColor" strokeWidth="2" aria-hidden="true">
                  <path d="M12 21s7-6.2 7-11a7 7 0 1 0-14 0c0 4.8 7 11 7 11Z" />
                  <circle cx="12" cy="10" r="2.4" />
                </svg>
                {coords}
              </span>
            )}
          </div>
        </div>
      )}
    </article>
  );
}
