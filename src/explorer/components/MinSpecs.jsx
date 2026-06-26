import Checkbox from "../../atoms/Checkbox.jsx";
import "./minspecs.css";

const ROWS = [
  {
    id: "CPU",
    min: "Intel Core i5-8400 / Ryzen 5 2600",
    yours: "Intel Core i3-7100",
  },
  {
    id: "RAM",
    min: "16 GB",
    yours: "8 GB",
  },
  {
    id: "GPU",
    min: "NVIDIA GTX 1060 / AMD RX 580",
    yours: "Intel UHD Graphics 630",
  },
];

export default function MinSpecs() {
  return (
    <div className="ms__backdrop">
      <div className="ms__card">
        <div className="ms__icon" aria-hidden="true">
          <svg viewBox="0 0 64 64" width="56" height="56">
            <circle cx="32" cy="32" r="30" fill="#2a1746" />
            <path d="M10 40 A24 24 0 0 1 18 19" fill="none" stroke="#e34b4b" strokeWidth="6" strokeLinecap="round" />
            <path d="M19 18 A24 24 0 0 1 38 9" fill="none" stroke="#f2c14e" strokeWidth="6" strokeLinecap="round" />
            <path d="M40 9 A24 24 0 0 1 54 40" fill="none" stroke="#5bd07a" strokeWidth="6" strokeLinecap="round" />
            <circle cx="32" cy="40" r="4" fill="#fff" />
            <line x1="32" y1="40" x2="44" y2="22" stroke="#fff" strokeWidth="3" strokeLinecap="round" />
          </svg>
        </div>

        <h2 className="ms__title">Performance Adjusted to Your Device</h2>
        <p className="ms__body">
          Decentraland's default settings have been lowered to optimize your
          experience, but performance may still vary depending on your system.
        </p>

        <div className="ms__table">
          <div className="ms__row ms__row--head">
            <div className="ms__c ms__c--id" />
            <div className="ms__c">Minimum Recommended</div>
            <div className="ms__c">Your System</div>
          </div>
          {ROWS.map((r) => (
            <div className="ms__row" key={r.id}>
              <div className="ms__c ms__c--id">{r.id}</div>
              <div className="ms__c ms__c--spec">{r.min}</div>
              <div className="ms__c ms__c--spec">{r.yours}</div>
            </div>
          ))}
        </div>

        <div className="ms__optout">
          <Checkbox defaultChecked>Don't show this message again</Checkbox>
        </div>

        <div className="ms__actions">
          <button className="ms__readmore">READ MORE</button>
          <button className="ms__continue">CONTINUE</button>
        </div>
      </div>
    </div>
  );
}
