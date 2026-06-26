import { useState } from "react";
import SitesChrome from "../frames/SitesChrome.jsx";
import ManaMark from "../../atoms/ManaMark.jsx";
import "./stjumpinplaces.css";

const PLACE = {
  id: "p1",
  type: "place",
  title: "Genesis Plaza",
  user_name: "Decentraland Foundation",
  user: "0x9a6ebe7e2a7722f8200d0ffb63a1f6406a0d7dce",
  user_avatar: null,
  coordinates: [0, 0],
  image: null,
  description:
    "Welcome to the heart of Decentraland. Genesis Plaza is the central hub where new explorers arrive, connect with the community, and set off into the wider world. Visit the help desks, hop on a teleport, browse the latest builds, and meet creators from across the metaverse. There's always something happening here — come hang out from anywhere.",
  user_count: 142,
  favorites: 3820,
  position: "0,0",
  realm: undefined,
};

const WORLD_PLACE = {
  id: "w1",
  type: "place",
  title: "pink-oasis.dcl.eth",
  user_name: "Pink Oasis",
  user: undefined,
  user_avatar: null,
  coordinates: [0, 0],
  image: null,
  description:
    "A calm pastel retreat floating in its own corner of Decentraland. Wander the gardens, listen to the ambient set, and take a seat by the water.",
  user_count: 18,
  favorites: 240,
  position: "0,0",
  realm: "pink-oasis.dcl.eth",
};

const GENERIC_PLACE = {
  id: "generic-place",
  type: "place",
  title: "",
  user_name: "Unknown",
  user: undefined,
  user_avatar: null,
  coordinates: [50, 50],
  image: null,
  description: undefined,
  user_count: 0,
  favorites: 0,
  scene_name: "Decentraland",
  position: "50,50",
  realm: undefined,
};

const COPY = {
  by: "By",
  jumpIn: "Jump In",
  defaultDescription:
    "You're about to jump into Decentraland! Explore a virtual world built by its community and make new friends from anywhere.",
};

function formatLocation(coordinates) {
  return `${coordinates[0]}, ${coordinates[1]}`;
}

function JumpInIcon() {
  return (
    <svg
      className="stjumpinplaces__jumpicon"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden="true"
    >
      <rect x="0.75" y="0.75" width="22.5" height="22.5" rx="5.25" stroke="#FCFCFC" strokeOpacity="0.3" strokeWidth="1.5" />
      <path
        d="M18.7111 11.065L14.034 6.39027C13.2002 5.55695 11.7971 6.14637 11.7971 7.32523V8.86994C11.7564 8.86994 11.7361 8.86994 11.6954 8.86994H7.25895C6.50654 8.86994 5.89648 9.45936 5.89648 10.2114V13.7683C5.89648 14.5203 6.50654 15.1301 7.25895 15.1301H11.6751C11.7158 15.1301 11.7361 15.1301 11.7768 15.1301V16.6748C11.7768 17.8536 13.2002 18.4431 14.0137 17.6097L18.6908 12.935C19.2195 12.4065 19.2195 11.5732 18.7111 11.065Z"
        fill="#FCFCFC"
      />
    </svg>
  );
}

function GlobeIcon() {
  return (
    <svg className="stjumpinplaces__metaicon" viewBox="0 0 24 24" width="16" height="16" aria-hidden="true">
      <path
        fill="currentColor"
        d="M12 2a10 10 0 1 0 0 20 10 10 0 0 0 0-20Zm6.9 6h-2.95a15.7 15.7 0 0 0-1.38-3.56A8 8 0 0 1 18.9 8ZM12 4c.83 1.2 1.48 2.53 1.91 4h-3.82c.43-1.47 1.08-2.8 1.91-4ZM4.26 14a7.8 7.8 0 0 1 0-4h3.38a16.6 16.6 0 0 0 0 4H4.26Zm.84 2h2.95c.34 1.27.8 2.46 1.38 3.56A8 8 0 0 1 5.1 16Zm2.95-8H5.1a8 8 0 0 1 4.33-3.56A15.7 15.7 0 0 0 8.05 8ZM12 20c-.83-1.2-1.48-2.53-1.91-4h3.82c-.43 1.47-1.08 2.8-1.91 4Zm2.34-6H9.66a14.4 14.4 0 0 1 0-4h4.68a14.4 14.4 0 0 1 0 4Zm.27 5.56c.58-1.1 1.04-2.29 1.38-3.56h2.95a8 8 0 0 1-4.33 3.56ZM16.36 14a16.6 16.6 0 0 0 0-4h3.38a7.8 7.8 0 0 1 0 4h-3.38Z"
      />
    </svg>
  );
}

function PinIcon() {
  return (
    <svg className="stjumpinplaces__metaicon" viewBox="0 0 24 24" width="16" height="16" aria-hidden="true">
      <path
        fill="currentColor"
        d="M12 2a7 7 0 0 0-7 7c0 5.25 7 13 7 13s7-7.75 7-13a7 7 0 0 0-7-7Zm0 9.5A2.5 2.5 0 1 1 12 6.5a2.5 2.5 0 0 1 0 5Z"
      />
    </svg>
  );
}

function PresencePersonGlyph({ count }) {
  return (
    <span className="stjumpinplaces__attendees">
      <svg viewBox="0 0 24 24" width="16" height="16" aria-hidden="true">
        <circle cx="12" cy="12" r="7" fill="#00A146" />
      </svg>
      <svg viewBox="0 0 24 24" width="16" height="16" aria-hidden="true">
        <path
          fill="#161518"
          d="M12 12a4 4 0 1 0 0-8 4 4 0 0 0 0 8Zm0 2c-3.6 0-7 1.8-7 4v2h14v-2c0-2.2-3.4-4-7-4Z"
        />
      </svg>
      {count}
    </span>
  );
}

function PlaceArt() {
  return (
    <div className="stjumpinplaces__art" aria-hidden="true">
      <ManaMark size={120} className="stjumpinplaces__artmark" />
    </div>
  );
}

const INVALID_COPY = {
  title: "Oops!",
  message:
    "Looks like that link was invalid. If you still want to explore, jump into Decentraland's virtual world or browse community events.",
  messageMobile:
    "Looks like that link was invalid. If you still want to explore, browse the community's events then jump in-world from your computer.",
  jumpInButton: "Jump into Decentraland",
  goHomeButton: "Go to Homepage",
};

function HomeIcon() {
  return (
    <svg className="stjumpinplacesinvalid__homeicon" viewBox="0 0 24 24" width="20" height="20" aria-hidden="true">
      <path fill="currentColor" d="M10 20v-6h4v6h5v-8h3L12 3 2 12h3v8z" />
    </svg>
  );
}

function InvalidView({ mobile }) {
  return (
    <div className={"stjumpinplacesinvalid" + (mobile ? " is-mobile" : "")}>
      <div className="stjumpinplacesinvalid__bg" aria-hidden="true" />

      <div className="stjumpinplacesinvalid__content">
        <div className="stjumpinplacesinvalid__box">
          <h1 className="stjumpinplacesinvalid__title">{INVALID_COPY.title}</h1>
          <p className="stjumpinplacesinvalid__message">
            {mobile ? INVALID_COPY.messageMobile : INVALID_COPY.message}
          </p>

          {!mobile && (
            <button type="button" className="stjumpinplacesinvalid__jumpin">
              {INVALID_COPY.jumpInButton}
              <JumpInIcon />
            </button>
          )}
        </div>
      </div>

      {mobile && (
        <div className="stjumpinplacesinvalid__mobileactions">
          <button type="button" className="stjumpinplacesinvalid__gohome">
            <HomeIcon />
            {INVALID_COPY.goHomeButton}
          </button>
        </div>
      )}
    </div>
  );
}

function Card({ data, isLoading = false }) {
  if (isLoading || !data) {
    return (
      <div className="u-jumpin-card stjumpinplaces__card">
        <div className="stjumpinplaces__image">
          <div className="stjumpinplaces__loading">
            <span className="stjumpinplaces__spinner" />
          </div>
        </div>
        <div className="stjumpinplaces__content">
          <div className="stjumpinplaces__body">
            <span className="stjumpinplaces__skel stjumpinplaces__skel--title" />
            <span className="stjumpinplaces__skel stjumpinplaces__skel--line" />
            <span className="stjumpinplaces__skel stjumpinplaces__skel--line" />
            <span className="stjumpinplaces__skel stjumpinplaces__skel--line stjumpinplaces__skel--gap" />
            <span className="stjumpinplaces__skel stjumpinplaces__skel--block" />
          </div>
        </div>
      </div>
    );
  }

  const displayUserName = data.user_name;
  const hasPresence = !!data.user_count && data.user_count > 0;

  return (
    <div className="u-jumpin-card stjumpinplaces__card">
      <div className="stjumpinplaces__image">
        <PlaceArt />
        {hasPresence ? (
          <div className="stjumpinplaces__badge">
            <PresencePersonGlyph count={data.user_count} />
          </div>
        ) : null}
      </div>
      <div className="stjumpinplaces__content">
        <div className="stjumpinplaces__body">
          <h2 className="stjumpinplaces__title">{data.title}</h2>
          <div className="stjumpinplaces__creator">
            <span className="stjumpinplaces__avatar" aria-hidden="true" />
            <span className="stjumpinplaces__by">{COPY.by} </span>
            {data.user ? (
              <button type="button" className="stjumpinplaces__userlink">
                {displayUserName}
              </button>
            ) : (
              displayUserName
            )}
          </div>
          <div className="stjumpinplaces__meta">
            <span
              className="stjumpinplaces__location"
              aria-label={data.realm ? `World: ${data.realm}` : undefined}
            >
              {data.realm ? <GlobeIcon /> : <PinIcon />}
              {data.realm ?? formatLocation(data.coordinates)}
            </span>
          </div>
          <div className="stjumpinplaces__desc">
            <p>{data.description || COPY.defaultDescription}</p>
          </div>
        </div>
        <button type="button" className="stjumpinplaces__jumpin">
          {COPY.jumpIn}
          <JumpInIcon />
        </button>
      </div>
    </div>
  );
}

export default function StJumpInPlaces({ variant = "place", invalidVariant = "desktop" }) {
  const [data] = useState(() => {
    if (variant === "loading") return undefined;
    if (variant === "world") return WORLD_PLACE;
    if (variant === "generic") return GENERIC_PLACE;
    return PLACE;
  });

  if (variant === "invalid") {
    return (
      <SitesChrome active="legal" overlayNav>
        <InvalidView mobile={invalidVariant === "mobile"} />
      </SitesChrome>
    );
  }

  const isLoading = variant === "loading";

  return (
    <SitesChrome active="legal" overlayNav>
      <div className="stjumpinplaces">
        <div className="stjumpinplaces__bg" aria-hidden="true" />
        <div className="stjumpinplaces__inner">
          <Card data={data} isLoading={isLoading} />
        </div>
      </div>
    </SitesChrome>
  );
}
