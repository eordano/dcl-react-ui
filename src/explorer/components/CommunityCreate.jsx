import { useState } from "react";
import Communities from "../pages/Communities.jsx";
import "./communitycreate.css";

const MEMBERSHIP_OPTIONS = [
  { value: "public", label: "Public", note: "Anyone can become a member, view Community details, and join your Voice Streams" },
  { value: "private", label: "Private", note: "Members must be approved by an owner or moderator before they can join" },
];

export default function CommunityCreate() {
  const [gated, setGated] = useState(false);
  const [name, setName] = useState("");
  const [membership, setMembership] = useState("public");
  const [discoverable, setDiscoverable] = useState(true);

  return (
    <>
      <div className="ccr__behind" aria-hidden="true" inert>
        <Communities />
      </div>

      {gated ? (
        <div className="ep__backdrop ccr__backdrop">
          <div className="ccr__gate">
            <div className="ccr__gateart" aria-hidden="true">
              <svg viewBox="0 0 48 48" width="48" height="48">
                <path d="M14 20v-4a10 10 0 0 1 20 0v4M10 20h28v18H10z" fill="none" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </div>
            <h1 className="ccr__gatetitle">Get a NAME to Unlock Community Creation</h1>
            <p className="ccr__gatebody">
              NAMEs are unique Decentraland usernames that come with a{" "}
              <a className="ccr__link" href="https://decentraland.org/blog/about-decentraland/decentraland-worlds-your-own-virtual-space" target="_blank" rel="noopener noreferrer">World</a>, and unlock community creation.
            </p>
            <div className="ccr__gatebtns">
              <button className="ccr__primary" onClick={() => setGated(false)}>Get a NAME</button>
              <button className="ccr__ghost" onClick={() => setGated(false)}>Maybe later</button>
            </div>
          </div>
        </div>
      ) : (
        <div className="ep__backdrop ccr__backdrop">
          <div className="ccr" role="dialog" aria-modal="true" aria-label="Create a Community">
            <h1 className="ccr__title">Create a Community</h1>

            <div className="ccr__scroll">
              <div className="ccr__group">
                <div className="ccr__seclabel">PROFILE PICTURE</div>
                <div className="ccr__hint">PNG or JPG | 512x512 px | 500KB max</div>
                <div className="ccr__pfp">
                  <span className="ccr__pfpimg" aria-hidden="true">
                    <svg viewBox="0 0 24 24" width="34" height="34">
                      <rect x="3" y="4" width="18" height="16" rx="2" fill="none" stroke="currentColor" strokeWidth="1.6" />
                      <circle cx="8.5" cy="9.5" r="1.8" fill="currentColor" />
                      <path d="M5 18l4.5-5 3.5 4 2.5-2.5L21 17" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
                    </svg>
                  </span>
                  <button className="ccr__pfpedit" aria-label="Edit profile picture">
                    <svg viewBox="0 0 24 24" width="14" height="14" aria-hidden="true">
                      <path d="M14.06 6.19l3.75 3.75M3 17.25V21h3.75L17.81 9.94a1.5 1.5 0 0 0 0-2.12l-1.63-1.63a1.5 1.5 0 0 0-2.12 0L3 17.25z" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
                    </svg>
                  </button>
                </div>
              </div>

              <div className="ccr__group">
                <label className="ccr__seclabel" htmlFor="ccr-name">COMMUNITY NAME <span className="ccr__req">*</span></label>
                <input
                  id="ccr-name" className="ccr__input" maxLength={30} placeholder="Write here"
                  value={name} onChange={(e) => setName(e.target.value)}
                />
              </div>

              <div className="ccr__group">
                <label className="ccr__seclabel" htmlFor="ccr-membership">MEMBERSHIP</label>
                <div className="ccr__selectwrap">
                  <select
                    id="ccr-membership" className="ccr__select u-truncate"
                    value={membership} onChange={(e) => setMembership(e.target.value)}
                  >
                    {MEMBERSHIP_OPTIONS.map((o) => (
                      <option key={o.value} value={o.value}>{o.label}  {o.note}</option>
                    ))}
                  </select>
                  <svg className="ccr__chevron" viewBox="0 0 24 24" width="20" height="20" aria-hidden="true">
                    <path d="M6 9l6 6 6-6" fill="none" stroke="currentColor" strokeWidth="2.6" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                </div>
              </div>

              <div className="ccr__group">
                <div className="ccr__seclabel">DISCOVERABILITY</div>
                <button
                  type="button" role="switch" aria-checked={discoverable}
                  className={"ccr__discbar" + (discoverable ? " is-on" : "")}
                  aria-label={discoverable ? "Visible in the directory" : "Hidden from the directory"}
                  onClick={() => setDiscoverable((d) => !d)}
                >
                  <span className="ccr__discknob" />
                </button>
              </div>
            </div>

            <div className="ccr__actions">
              <button className="ccr__ghost ccr__cancel" data-sb-linkto="Explorer/Pages/Communities">CANCEL</button>
              <button className="ccr__primary ccr__create" aria-disabled={!name.trim()}>CREATE</button>
            </div>

            <p className="ccr__policy">Please ensure Community content follows Decentraland's <a className="ccr__link" href="https://decentraland.org/content" target="_blank" rel="noopener noreferrer">Content Policy</a>.</p>
          </div>
        </div>
      )}
    </>
  );
}
