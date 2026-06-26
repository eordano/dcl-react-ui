import { useState } from "react";
import SitesChrome from "../frames/SitesChrome.jsx";
import ManaMark from "../../atoms/ManaMark.jsx";
import { asset } from "../../asset.js";
import "./stdownloadsuccess.css";

const L = {
  downloading: "Downloading Decentraland...",
  title: "You're almost done!",
  subtitleAction: "exploring",
  step: "Step",
  footerPrefix: "Trouble with the download? Let's try that again:",
  footerLinkLabel: "Download again",
};

const Subtitle = ({ action }) => (
  <>
    Open the file you just downloaded to finish installing Decentraland and start{" "}
    <span>{action}</span>
  </>
);

const STEPS = {
  windows: [
    {
      title: "Open",
      text: (
        <>
          Open the <span>Decentraland</span> file from your Downloads Folder to launch the Setup Wizard.
        </>
      ),
      img: "assets/dls-windows_downloads_folder.webp",
    },
    {
      title: "Install",
      text: (
        <>
          Follow the instructions in the Setup Wizard. When you click <span>Finish</span> the installation process will begin.
        </>
      ),
      img: "assets/dls-windows_setup.webp",
    },
    {
      title: "Get Ready to Explore!",
      text: <>Once installation is complete, the Decentraland app should be visible in your taskbar and will launch automatically.</>,
      img: "assets/dls-windows_launching_decentraland.webp",
    },
  ],
  macos: [
    {
      title: "Open",
      text: (
        <>
          Click on the <span>Decentraland</span> file from your browser's 'Recent Downloads' or your 'Downloads' folder to open it.
        </>
      ),
      img: "assets/dls-macos_recent_download.webp",
    },
    {
      title: "Install",
      text: (
        <>
          This window should then appear—double click the <span>Decentraland</span> button to start installation.
        </>
      ),
      img: "assets/dls-macos_launcher.webp",
    },
    {
      title: "Get Ready to Explore!",
      text: <>Once installation is complete, the Decentraland app should be visible in your Dock and will launch automatically.</>,
      img: "assets/dls-macos_launching_decentraland.webp",
    },
  ],
};

const OS_ICON = {
  macos:
    "data:image/svg+xml;utf8," +
    encodeURIComponent(
      '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><path fill="%23000" d="M16.4 12.6c0-2.3 1.9-3.4 2-3.5-1.1-1.6-2.8-1.8-3.4-1.8-1.4-.1-2.8.8-3.5.8-.7 0-1.8-.8-3-.8-1.5 0-2.9.9-3.7 2.3-1.6 2.8-.4 6.8 1.1 9 .7 1.1 1.6 2.3 2.8 2.3 1.1 0 1.5-.7 2.9-.7 1.3 0 1.7.7 2.9.7 1.2 0 1.9-1.1 2.7-2.2.8-1.3 1.2-2.5 1.2-2.6-.1 0-2.3-.9-2.3-3.5Zm-2.3-6.4c.6-.8 1-1.8.9-2.9-.9 0-2 .6-2.6 1.4-.6.7-1.1 1.7-.9 2.8 1 0 2-.5 2.6-1.3Z"/></svg>',
    ),
  windows:
    "data:image/svg+xml;utf8," +
    encodeURIComponent(
      '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><path fill="%23000" d="M3 5.6 10.3 4.6V11.4H3V5.6Zm0 12.8 7.3 1V12.6H3v5.8Zm8.4 1.2L21 21V12.6h-9.6v8Zm0-15.6V11.4H21V3l-9.6 1Z"/></svg>',
    ),
};

const StepMedia = ({ img }) => (
  <img className="stdownloadsuccess__media" src={asset(img)} alt="" aria-hidden="true" loading="lazy" />
);

export default function StDownloadSuccess({ os = "macos", loading = false, progress = null }) {
  const [open, setOpen] = useState(loading);
  const steps = STEPS[os] || STEPS.macos;
  const osIcon = os === "windows" ? OS_ICON.windows : OS_ICON.macos;

  return (
    <SitesChrome hideNav>
      <main className="stdownloadsuccess">
        <header className="stdownloadsuccess__header">
          <img className="stdownloadsuccess__osicon" src={osIcon} alt="" loading="lazy" />
          <h1 className="stdownloadsuccess__title">{L.title}</h1>
          <p className="stdownloadsuccess__subtitle">
            <Subtitle action={L.subtitleAction} />
          </p>
        </header>

        <div className="stdownloadsuccess__cards">
          {steps.map((step, index) => (
            <article className="stdownloadsuccess__card" key={index}>
              <div className="stdownloadsuccess__cardcontent">
                <span className="stdownloadsuccess__overline">
                  {L.step} {index + 1}
                </span>
                <h2 className="stdownloadsuccess__cardtitle">{step.title}</h2>
                <p className="stdownloadsuccess__cardtext">{step.text}</p>
              </div>
              <StepMedia img={step.img} />
              {index === 0 && L.subtitleAction === "exploring" ? (
                <span className="stdownloadsuccess__highlight" aria-hidden="true" />
              ) : null}
            </article>
          ))}
        </div>

        <div className="stdownloadsuccess__footer">
          <p className="stdownloadsuccess__footertext">
            {L.footerPrefix}{" "}
            <a className="stdownloadsuccess__retry" href="https://decentraland.org/download">
              {L.footerLinkLabel}
            </a>
          </p>
        </div>
      </main>

      {open && (
        <div className="stdownloadsuccess__backdrop" role="status" aria-live="polite">
          <div className="stdownloadsuccess__backdropcard">
            <span className="stdownloadsuccess__backlogo">
              <ManaMark size={56} className="stdownloadsuccess__logoglyph" />
            </span>
            <div className="stdownloadsuccess__detail">
              <span className="stdownloadsuccess__downloadingtext">{L.downloading}</span>
              <div className="stdownloadsuccess__progresswrap">
                {progress !== null ? (
                  <div className="stdownloadsuccess__progress">
                    <span className="stdownloadsuccess__progressbar" style={{ width: progress + "%" }} />
                  </div>
                ) : (
                  <div className="stdownloadsuccess__progress stdownloadsuccess__progress--indeterminate">
                    <span className="stdownloadsuccess__progressbar" />
                  </div>
                )}
              </div>
            </div>
            <button type="button" className="stdownloadsuccess__dismiss" onClick={() => setOpen(false)} aria-label="Dismiss">
              ×
            </button>
          </div>
        </div>
      )}
    </SitesChrome>
  );
}
