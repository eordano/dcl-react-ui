import Spinner from "../../atoms/Spinner.jsx";
import "./streelsimageviewer.css";

const RARITY_CLASS = {
  common: "common",
  uncommon: "uncommon",
  rare: "rare",
  epic: "epic",
  legendary: "legendary",
  mythic: "mythic",
  unique: "unique",
};

const DclWordmark = () => (
  <svg className="streelsimageviewer__logotext" viewBox="0 0 123 16" fill="none" aria-hidden="true">
    <path d="M0.128906 1.05302V15.2529H5.60025C9.86121 15.2529 12.3706 12.6058 12.3706 8.09886C12.3706 3.59188 9.86121 1.05302 5.60025 1.05302H0.128906ZM3.10075 3.50332H5.24599C7.86358 3.50332 9.33966 5.13685 9.33966 8.1087C9.33966 11.179 7.90294 12.7928 5.24599 12.7928H3.10075V3.50332Z" fill="#FCFCFC" />
    <path d="M18.7787 6.37676C20.1072 6.37676 21.0322 7.30177 21.0814 8.71881H16.4071C16.5056 7.3313 17.4699 6.37676 18.7787 6.37676ZM21.1208 11.9465C20.8452 12.783 19.9891 13.2947 18.9066 13.2947C17.3912 13.2947 16.3776 12.2417 16.3776 10.6771V10.5H23.8564V9.6143C23.8564 6.31772 21.8687 4.23152 18.7492 4.23152C15.5707 4.23152 13.5435 6.43581 13.5435 9.88C13.5435 13.3242 15.5609 15.4399 18.8574 15.4399C21.4947 15.4399 23.453 14.0426 23.7679 11.9465H21.1208Z" fill="#FCFCFC" />
    <path d="M35.0668 8.41376C34.929 6.00282 33.0692 4.23152 30.1564 4.23152C26.9385 4.23152 24.872 6.39644 24.872 9.8308C24.872 13.3144 26.9385 15.4399 30.176 15.4399C33.02 15.4399 34.9094 13.8359 35.0766 11.3167H32.4C32.213 12.5074 31.416 13.1667 30.2056 13.1667C28.7196 13.1667 27.7848 11.9465 27.7848 9.8308C27.7848 7.75444 28.7196 6.49485 30.1957 6.49485C31.4455 6.49485 32.2327 7.29193 32.3902 8.41376H35.0668Z" fill="#FCFCFC" />
    <path d="M41.2191 6.37676C42.5476 6.37676 43.4726 7.30177 43.5218 8.71881H38.8475C38.9459 7.3313 39.9103 6.37676 41.2191 6.37676ZM43.5612 11.9465C43.2856 12.783 42.4295 13.2947 41.347 13.2947C39.8316 13.2947 38.818 12.2417 38.818 10.6771V10.5H46.2968V9.6143C46.2968 6.31772 44.3091 4.23152 41.1896 4.23152C38.0111 4.23152 35.9839 6.43581 35.9839 9.88C35.9839 13.3242 38.0013 15.4399 41.2978 15.4399C43.9351 15.4399 45.8934 14.0426 46.2083 11.9465H43.5612Z" fill="#FCFCFC" />
    <path d="M47.7158 15.2529H50.5893V9.07307C50.5893 7.63635 51.4159 6.6523 52.7936 6.6523C54.1516 6.6523 54.8207 7.46906 54.8207 8.90578V15.2529H57.6942V8.30551C57.6942 5.77649 56.3362 4.26104 53.9351 4.26104C52.272 4.26104 51.1699 4.98924 50.5499 6.35708H50.4909V4.41849H47.7158V15.2529Z" fill="#FCFCFC" />
    <path d="M60.2448 2.00756V4.41849H58.7786V6.59325H60.2448V12.3303C60.2448 14.446 61.2289 15.2923 63.7382 15.2923C64.3188 15.2923 64.8305 15.2333 65.1258 15.1742V13.0487C64.9486 13.0782 64.6632 13.0979 64.4074 13.0979C63.5316 13.0979 63.1183 12.6944 63.1183 11.858V6.59325H65.1258V4.41849H63.1183V2.00756H60.2448Z" fill="#FCFCFC" />
    <path d="M66.653 15.2529H69.5264V9.19116C69.5264 7.67571 70.3826 6.77038 71.839 6.77038C72.2621 6.77038 72.6557 6.83927 72.9018 6.93767V4.39881C72.6951 4.32993 72.3999 4.29056 72.0653 4.29056C70.786 4.29056 69.8512 5.01877 69.4871 6.35708H69.428V4.41849H66.653V15.2529Z" fill="#FCFCFC" />
    <path d="M77.8929 13.2848C76.8498 13.2848 76.1708 12.783 76.1708 11.9859C76.1708 11.1888 76.8104 10.7164 78.011 10.6377L80.2841 10.4803V11.2774C80.2841 12.4582 79.2214 13.2848 77.8929 13.2848ZM76.958 15.3809C78.3456 15.3809 79.6839 14.7117 80.2743 13.58H80.3333V15.2529H83.1084V7.82332C83.1084 5.6584 81.2879 4.23152 78.503 4.23152C75.7968 4.23152 73.9271 5.6584 73.8484 7.72492H76.4758C76.6136 6.93767 77.3418 6.3866 78.3849 6.3866C79.5658 6.3866 80.2841 6.95735 80.2841 8.00045V8.71881L77.578 8.8861C74.8128 9.05339 73.3072 10.1654 73.3072 12.1335C73.3072 14.0721 74.8718 15.3809 76.958 15.3809Z" fill="#FCFCFC" />
    <path d="M84.9997 15.2529H87.8732V0.374023H84.9997V15.2529Z" fill="#FCFCFC" />
    <path d="M93.9172 13.2848C92.8741 13.2848 92.1952 12.783 92.1952 11.9859C92.1952 11.1888 92.8348 10.7164 94.0353 10.6377L96.3085 10.4803V11.2774C96.3085 12.4582 95.2457 13.2848 93.9172 13.2848ZM92.9824 15.3809C94.3699 15.3809 95.7082 14.7117 96.2987 13.58H96.3577V15.2529H99.1327V7.82332C99.1327 5.6584 97.3122 4.23152 94.5274 4.23152C91.8212 4.23152 89.9515 5.6584 89.8728 7.72492H92.5002C92.638 6.93767 93.3662 6.3866 94.4093 6.3866C95.5901 6.3866 96.3085 6.95735 96.3085 8.00045V8.71881L93.6023 8.8861C90.8372 9.05339 89.3315 10.1654 89.3315 12.1335C89.3315 14.0721 90.8962 15.3809 92.9824 15.3809Z" fill="#FCFCFC" />
    <path d="M100.945 15.2529H103.819V9.07307C103.819 7.63635 104.645 6.6523 106.023 6.6523C107.381 6.6523 108.05 7.46906 108.05 8.90578V15.2529H110.924V8.30551C110.924 5.77649 109.566 4.26104 107.165 4.26104C105.502 4.26104 104.399 4.98924 103.779 6.35708H103.72V4.41849H100.945V15.2529Z" fill="#FCFCFC" />
    <path d="M116.741 15.3809C118.336 15.3809 119.585 14.5936 120.117 13.4029H120.166V15.2529H123V0.374023H120.127V6.26852H120.068C119.526 5.06797 118.316 4.29056 116.751 4.29056C114.055 4.29056 112.303 6.42596 112.303 9.82096C112.303 13.2356 114.045 15.3809 116.741 15.3809ZM117.696 6.61293C119.182 6.61293 120.146 7.88237 120.146 9.84064C120.146 11.7989 119.182 13.0585 117.696 13.0585C116.2 13.0585 115.246 11.8186 115.246 9.8308C115.246 7.86269 116.2 6.61293 117.696 6.61293Z" fill="#FCFCFC" />
  </svg>
);

const Logo = () => (
  <a className="streelsimageviewer__logo" href="https://decentraland.org">
    <svg className="streelsimageviewer__logomark" viewBox="0 0 100 100" aria-label="Decentraland">
      <circle cx="50" cy="50" r="50" fill="#fff" />
      <path d="M50 18 78 70 22 70Z" fill="#ff2d55" />
      <path d="M50 44 64 70 36 70Z" fill="#ff8044" />
      <circle cx="62" cy="34" r="7" fill="#ffbc5b" />
    </svg>
    <DclWordmark />
  </a>
);

const XIcon = () => (
  <svg className="streelsimageviewer__shareicon" viewBox="0 0 24 24" width="22" height="22" aria-hidden="true">
    <path
      fill="currentColor"
      d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24h-6.66l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231 5.45-6.231Zm-1.161 17.52h1.833L7.084 4.126H5.117L17.083 19.77Z"
    />
  </svg>
);

const LinkIcon = () => (
  <svg className="streelsimageviewer__actionicon" viewBox="0 0 25 25" fill="none" aria-hidden="true">
    <path d="M9.98253 9L6.40183 9C4.45779 9 2.88184 10.576 2.88184 12.52V12.52C2.88184 14.464 4.45779 16.04 6.40183 16.04H9.98253" stroke="#FCFCFC" strokeWidth="2" strokeLinecap="round" />
    <path d="M14.2616 9L17.8423 9C19.7863 9 21.3623 10.576 21.3623 12.52V12.52C21.3623 14.464 19.7863 16.04 17.8423 16.04H14.2616" stroke="#FCFCFC" strokeWidth="2" strokeLinecap="round" />
    <line x1="9.79199" y1="12.3779" x2="15.332" y2="12.3779" stroke="#FCFCFC" strokeWidth="1.5" strokeLinecap="round" />
  </svg>
);

const DownloadIcon = () => (
  <svg className="streelsimageviewer__actionicon" viewBox="0 0 22 23" fill="none" aria-hidden="true">
    <path d="M19 11.752L19 19.4641L2.54768 19.4641L2.54768 11.752" stroke="#FCFCFC" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
    <path d="M14.201 11.1484L10.7734 14.5761L7.3457 11.1484M10.7734 14.5761L10.7734 3.98728" stroke="#FCFCFC" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
);

const InfoIcon = () => (
  <svg className="streelsimageviewer__infoicon" viewBox="0 0 25 25" fill="none" aria-hidden="true">
    <circle cx="12.0175" cy="12.3182" r="9.31824" stroke="#FCFCFC" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
    <path d="M12.82 16.616C12.82 17.0555 12.4637 17.4118 12.0242 17.4118C11.5847 17.4118 11.2284 17.0555 11.2284 16.616L11.2284 10.9441C11.2284 10.5045 11.5847 10.1482 12.0242 10.1482C12.4637 10.1482 12.82 10.5045 12.82 10.9441L12.82 16.616Z" fill="#FCFCFC" stroke="#FCFCFC" strokeWidth="0.311934" strokeLinecap="round" strokeLinejoin="round" />
    <circle cx="12.0227" cy="7.84104" r="0.899809" fill="#FCFCFC" stroke="#FCFCFC" strokeWidth="0.51989" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
);

const LocationIcon = () => (
  <svg className="streelsimageviewer__pin" viewBox="0 0 24 24" width="20" height="20" aria-hidden="true">
    <path
      fill="currentColor"
      d="M12 2a7 7 0 0 0-7 7c0 5.25 7 13 7 13s7-7.75 7-13a7 7 0 0 0-7-7Zm0 9.5A2.5 2.5 0 1 1 12 6.5a2.5 2.5 0 0 1 0 5Z"
    />
  </svg>
);

const ChevronDown = () => (
  <svg viewBox="0 0 24 24" width="24" height="24" aria-hidden="true" fill="currentColor">
    <path d="M7.41 8.59 12 13.17l4.59-4.58L18 10l-6 6-6-6 1.41-1.41Z" />
  </svg>
);
const ChevronUp = () => (
  <svg viewBox="0 0 24 24" width="24" height="24" aria-hidden="true" fill="currentColor">
    <path d="M7.41 15.41 12 10.83l4.59 4.58L18 14l-6-6-6 6 1.41 1.41Z" />
  </svg>
);

const NoCameraGlyph = () => (
  <svg className="streelsimageviewer__nocamera" viewBox="0 0 120 120" fill="none" aria-hidden="true">
    <g opacity="0.8">
      <path
        d="M92.9067 26.3845C63.7242 -2.55657 12.8896 18.4112 12.9732 59.9779C13.001 72.4475 17.9671 84.3985 26.7849 93.2158C35.6026 102.033 47.5541 106.999 60.0242 107.027C102.063 107.107 122.825 55.2571 92.9067 26.3845ZM60.0242 16.413C70.7352 16.4167 81.0654 20.3865 89.0222 27.5566L75.8243 40.7539L74.4112 36.8202C74.2896 36.4825 74.0668 36.1905 73.7733 35.984C73.4797 35.7776 73.1296 35.6666 72.7707 35.6664H47.2778C46.9189 35.6666 46.5688 35.7776 46.2752 35.984C45.9816 36.1905 45.7589 36.4825 45.6373 36.8202L42.22 46.3329H38.3807C36.8033 46.3346 35.291 46.9619 34.1756 48.0772C33.0603 49.1925 32.4329 50.7048 32.4313 52.2821V78.3389C32.4325 79.8807 33.0351 81.3612 34.111 82.4656L27.6023 88.9741C2.54196 61.722 22.6681 16.1139 60.0242 16.413ZM74.9626 48.6642C75.0842 49.0019 75.3069 49.2938 75.6005 49.5003C75.8941 49.7068 76.2442 49.8177 76.6031 49.8179H81.6678C82.321 49.819 82.9472 50.0789 83.409 50.5407C83.8709 51.0026 84.1309 51.6287 84.1319 52.2819V78.3388C84.1309 78.992 83.8709 79.6181 83.409 80.0799C82.9472 80.5418 82.321 80.8017 81.6678 80.8028H40.702L50.4476 71.0576C51.4931 72.43 52.8201 73.563 54.3395 74.3803C55.859 75.1976 57.5357 75.6804 59.2571 75.7963C60.9786 75.9122 62.7049 75.6584 64.3202 75.0521C65.9354 74.4458 67.4023 73.5009 68.6223 72.281C69.8423 71.061 70.7871 69.5942 71.3934 67.9789C71.9997 66.3637 72.2534 64.6374 72.1375 62.9161C72.0216 61.1947 71.5387 59.5181 70.7213 57.9987C69.9039 56.4793 68.7709 55.1524 67.3984 54.107L74.4023 47.1039L74.9626 48.6642ZM51.3689 63.6836C51.3704 62.4315 51.6441 61.1946 52.171 60.0587C52.6979 58.9228 53.4654 57.915 54.4204 57.1051C55.3754 56.2952 56.495 55.7025 57.7017 55.3681C58.9085 55.0338 60.1735 54.9657 61.4091 55.1686L51.5089 65.0684C51.4247 64.6114 51.3779 64.1483 51.3689 63.6836ZM64.935 56.571C65.9627 57.2957 66.8196 58.2362 67.4456 59.3268C68.0717 60.4173 68.4518 61.6316 68.5593 62.8844C68.6668 64.1373 68.4992 65.3985 68.0681 66.5798C67.637 67.7611 66.9529 68.8339 66.0637 69.723C65.1745 70.6122 64.1016 71.2962 62.9203 71.7273C61.739 72.1583 60.4777 72.3259 59.2248 72.2184C57.9719 72.1108 56.7576 71.7307 55.667 71.1046C54.5764 70.4786 53.6359 69.6217 52.9112 68.594L64.935 56.571ZM64.237 52.3408C62.0661 51.553 59.7156 51.4006 57.4611 51.9015C55.2067 52.4024 53.1419 53.5358 51.5089 55.1688C49.8759 56.8017 48.7425 58.8665 48.2417 61.1209C47.7408 63.3753 47.8933 65.7257 48.6812 67.8965L36.5818 79.9949C36.1589 79.5467 35.9213 78.9551 35.9166 78.3389V52.2821C35.9176 51.6289 36.1776 51.0028 36.6394 50.5409C37.1013 50.079 37.7275 49.8191 38.3807 49.8181H43.4452C43.8041 49.8178 44.1542 49.7069 44.4478 49.5004C44.7414 49.294 44.9642 49.002 45.0858 48.6643L48.503 39.1516H71.5453L73.0997 43.4785L64.237 52.3408ZM60.0242 103.541C48.8427 103.54 38.0938 99.22 30.0207 91.4839L37.3235 84.1815C37.6721 84.2487 38.0259 84.2844 38.3808 84.2883H81.6678C83.2452 84.2867 84.7574 83.6594 85.8728 82.544C86.9882 81.4287 87.6155 79.9165 87.6172 78.3392V52.2821C87.6155 50.7048 86.9882 49.1925 85.8728 48.0772C84.7574 46.9619 83.2452 46.3346 81.6678 46.3329H77.8284L77.1268 44.3798L91.5321 29.9751C117.817 57.1229 98.1802 103.648 60.0242 103.541Z"
        fill="white"
      />
      <path d="M59.8616 61.4042C60.2577 61.3964 60.6349 61.2336 60.9122 60.9508C61.1895 60.668 61.3449 60.2877 61.3449 59.8916C61.3449 59.4954 61.1895 59.1151 60.9122 58.8323C60.6349 58.5495 60.2577 58.3867 59.8616 58.3789C59.4656 58.3867 59.0884 58.5495 58.8111 58.8323C58.5338 59.1151 58.3784 59.4954 58.3784 59.8916C58.3784 60.2877 58.5338 60.668 58.8111 60.9508C59.0884 61.2336 59.4656 61.3964 59.8616 61.4042Z" fill="white" />
    </g>
  </svg>
);

const ShirtGlyph = () => (
  <svg className="streelsimageviewer__shirt" viewBox="0 0 42 36" fill="none" aria-hidden="true">
    <path d="M27.9278 2.67004C27.2831 2.39957 26.5486 2.71387 26.1606 3.29041C25.7086 3.962 25.1264 4.54358 24.4433 4.9992C23.406 5.69111 22.1835 6.06104 20.9322 6.0616C19.681 6.06104 18.4584 5.69111 17.4211 4.9992C16.7379 4.5435 16.1556 3.96179 15.7036 3.29004C15.3157 2.71361 14.5815 2.39928 13.9368 2.66946L2.07698 9.03015C1.43961 9.29726 1.142 10.0248 1.41232 10.655L4.37374 16.3606C4.64392 16.9905 5.37919 17.2846 6.01626 17.0177L9.27091 15.6541L7.95841 33.475C7.95841 34.1594 8.51946 34.7142 9.21156 34.7142H32.8094C33.5015 34.7142 34.0626 34.1594 34.0626 33.475L32.7501 15.7234L35.8438 17.0211C36.4809 17.2883 37.2165 16.9942 37.4868 16.3642L40.5877 10.6587C40.8579 10.0287 40.5605 9.30126 39.9234 9.03399L27.9278 2.67004Z" stroke="#CFCDD4" strokeWidth="2" />
    <path d="M25.8514 12.6261H19.0664C18.9819 12.6261 18.9066 12.6791 18.8781 12.7586L15.7762 21.404C15.7294 21.5343 15.826 21.6715 15.9644 21.6715H18.6697C18.7998 21.6715 18.8952 21.7936 18.8638 21.9198L17.2234 28.5096C17.1723 28.7148 17.4333 28.8486 17.57 28.6872L25.9012 18.8546C26.0113 18.7246 25.9189 18.5253 25.7486 18.5253H23.4544C23.3045 18.5253 23.2079 18.3665 23.2768 18.2333L26.029 12.9181C26.0979 12.785 26.0013 12.6261 25.8514 12.6261Z" fill="#CFCDD4" />
  </svg>
);

function LoadingText({ size = "full", type = "span" }) {
  return <span className={`streelsimageviewer__skel streelsimageviewer__skel--${size} streelsimageviewer__skel--${type}`} aria-hidden="true" />;
}

function WearableMetadata({ wearable }) {
  const buyable = wearable.collectionId && wearable.blockchainId;
  const inner = (
    <>
      <div className="streelsimageviewer__wbwrap">
        <div className={`streelsimageviewer__wbimg streelsimageviewer__wbimg--${RARITY_CLASS[wearable.rarity] || "common"}`}>
          {wearable.image ? <img src={wearable.image} alt={wearable.name} /> : null}
        </div>
        <span className="streelsimageviewer__wbname">{wearable.name}</span>
      </div>
      {buyable && <button type="button" className="streelsimageviewer__wbbuy">BUY</button>}
    </>
  );
  if (!buyable) return <div className="streelsimageviewer__wbrow streelsimageviewer__wbrow--static">{inner}</div>;
  return (
    <a className="streelsimageviewer__wbrow" href="#" onClick={(e) => e.preventDefault()}>
      {inner}
    </a>
  );
}

function UserMetadata({ user, isFirst, defaultOpen = false }) {
  const wearables = user.wearablesParsed || [];
  return (
    <div className={"streelsimageviewer__user" + (isFirst ? " is-first" : "")}>
      <div className="streelsimageviewer__userrow">
        <div className="streelsimageviewer__userwrap">
          {user.faceUrl ? (
            <img className="streelsimageviewer__useravatar" src={user.faceUrl} alt="" loading="lazy" />
          ) : (
            <span className="streelsimageviewer__useravatar streelsimageviewer__useravatar--fallback" aria-hidden="true" />
          )}
          <a className="streelsimageviewer__username" href="#" onClick={(e) => e.preventDefault()}>
            {user.userName}
          </a>
          {user.isGuest && <span className="streelsimageviewer__guest">guest</span>}
        </div>
        <span className="streelsimageviewer__chevron" role="button" aria-label="toggle-wearables" tabIndex={0}>
          {defaultOpen ? <ChevronUp /> : <ChevronDown />}
        </span>
      </div>
      <div className={"streelsimageviewer__wbpanel" + (defaultOpen ? " is-open" : "")}>
        <div className="streelsimageviewer__wbtitle">collectible wearables</div>
        {wearables.length === 0 ? (
          <div className="streelsimageviewer__nowb">
            <ShirtGlyph />
            <p className="streelsimageviewer__nowbtext">This person doesn't have any equipped collectibles yet.</p>
          </div>
        ) : (
          wearables.map((w) => <WearableMetadata key={w.id} wearable={w} />)
        )}
      </div>
    </div>
  );
}

export default function StReelsImageViewer({
  image = SAMPLE_IMAGE,
  loading = false,
  metadataVisible = true,
  notFound = false,
}) {
  if (notFound) {
    return (
      <div className="streelsimageviewer streelsimageviewer--notfound">
        <NoCameraGlyph />
        <h1 className="streelsimageviewer__nftitle">Photo not found</h1>
        <h3 className="streelsimageviewer__nfsub">
          Whoops! The photo you are trying to access does not exist or is no longer available.
        </h3>
      </div>
    );
  }

  const meta = image.metadata;
  const photoTakenByFace = meta.visiblePeople.find(
    (p) => p.userAddress && meta.userAddress && p.userAddress.toLowerCase() === meta.userAddress.toLowerCase()
  )?.faceUrl;

  return (
    <div className={"streelsimageviewer" + (metadataVisible ? " is-rail-open" : "")}>
      <div className="streelsimageviewer__viewer">
        <div className="streelsimageviewer__gradient" aria-hidden="true" />

        <div className="streelsimageviewer__actions">
          <button type="button" className="streelsimageviewer__sharebtn" aria-label="Share to Twitter">
            <XIcon />
          </button>
          <span className="streelsimageviewer__copywrap">
            <span role="button" tabIndex={0} aria-label="Copy link">
              <LinkIcon />
            </span>
          </span>
          <span role="button" tabIndex={0} aria-label="Download photo">
            <DownloadIcon />
          </span>
          <span className="streelsimageviewer__spacer" aria-hidden="true" />
          <span
            className={"streelsimageviewer__infobtn" + (metadataVisible ? " is-active" : "")}
            role="button"
            tabIndex={0}
            aria-label="Toggle info"
          >
            <InfoIcon />
          </span>
        </div>

        <div className="streelsimageviewer__imgwrap">
          {loading ? (
            <div className="streelsimageviewer__loader">
              <Spinner size={56} color="#fff" />
            </div>
          ) : (
            <img src={image.url} alt={meta.scene.name} />
          )}
        </div>
      </div>

      <aside className={"streelsimageviewer__rail" + (metadataVisible ? "" : " is-hidden")}>
        <div className="streelsimageviewer__loghead">
          <Logo />
        </div>

        <div className="streelsimageviewer__content">
          <h1 className="streelsimageviewer__sectiontitle">information</h1>
          {loading ? (
            <>
              <LoadingText size="medium" type="span" />
              <LoadingText size="large" type="span" />
            </>
          ) : (
            <>
              <div className="streelsimageviewer__date">{meta.dateTime}</div>
              <div className="streelsimageviewer__userline">
                <span>Photo taken by</span>
                {photoTakenByFace && <img className="streelsimageviewer__inlineavatar" src={photoTakenByFace} alt="" loading="lazy" />}
                <a className="streelsimageviewer__userlink" href="#" onClick={(e) => e.preventDefault()}>
                  {meta.userName}
                </a>
              </div>
            </>
          )}

          <h1 className="streelsimageviewer__sectiontitle">place</h1>
          {loading ? (
            <LoadingText size="full" type="span" />
          ) : (
            <div className="streelsimageviewer__placeline">
              <div className="streelsimageviewer__placeleft">
                <LocationIcon />
                <a className="streelsimageviewer__placelink" href="#" onClick={(e) => e.preventDefault()}>
                  {meta.scene.name} {meta.scene.location.x},{meta.scene.location.y}
                </a>
              </div>
              <a className="streelsimageviewer__jumpin" href="#" onClick={(e) => e.preventDefault()}>
                jump in
              </a>
            </div>
          )}

          <div className="streelsimageviewer__divider" />
        </div>

        <h1 className="streelsimageviewer__sectiontitle streelsimageviewer__peopletitle">people</h1>
        <div className="streelsimageviewer__people">
          {loading
            ? Array.from({ length: 3 }).map((_, i) => (
                <div key={i} className="streelsimageviewer__content">
                  <LoadingText size="full" type="p" />
                </div>
              ))
            : meta.visiblePeople.map((user, i) => (
                <UserMetadata
                  key={user.userAddress || i}
                  user={user}
                  isFirst={i === 0}
                  defaultOpen={i === 0 && (user.wearablesParsed?.length ?? 0) > 0}
                />
              ))}
        </div>
      </aside>
    </div>
  );
}

const SAMPLE_IMAGE = {
  id: "0f3c1b2a-7e4d-4c9a-b1f2-9a8e7d6c5b4a",
  url: "https://decentraland.org/images/decentraland-social-share.png",
  thumbnailUrl: "https://decentraland.org/images/decentraland-social-share.png",
  metadata: {
    userName: "MetaTraveler",
    userAddress: "0x9a8e7d6c5b4a3f2e1d0c9b8a7f6e5d4c3b2a1f0e",
    dateTime: "April 13, 2026",
    realm: "main",
    scene: { name: "Genesis Plaza", location: { x: "0", y: "0" } },
    visiblePeople: [
      {
        userName: "MetaTraveler",
        userAddress: "0x9a8e7d6c5b4a3f2e1d0c9b8a7f6e5d4c3b2a1f0e",
        isGuest: false,
        wearables: ["urn:1", "urn:2"],
        faceUrl: "https://decentraland.org/images/decentraland-social-share.png",
        wearablesParsed: [
          {
            id: "w1",
            urn: "urn:decentraland:matic:collections-v2:0xabc:0",
            name: "Cyber Visor Helmet",
            image: "",
            rarity: "legendary",
            collectionId: "0xabc",
            blockchainId: "0",
          },
          {
            id: "w2",
            urn: "urn:decentraland:matic:collections-v2:0xdef:3",
            name: "Neon Runner Jacket",
            image: "",
            rarity: "epic",
            collectionId: "0xdef",
            blockchainId: "3",
          },
          {
            id: "w3",
            urn: "urn:decentraland:off-chain:base-avatars:sneakers",
            name: "Classic Sneakers",
            image: "",
            rarity: "common",
          },
        ],
      },
      {
        userName: "PixelNomad",
        userAddress: "0x1f0e2d3c4b5a6978899aabbccddeeff001122334",
        isGuest: false,
        wearables: [],
        faceUrl: "",
        wearablesParsed: [],
      },
      {
        userName: "Guest-4821",
        userAddress: "",
        isGuest: true,
        wearables: [],
        faceUrl: "",
        wearablesParsed: [],
      },
    ],
  },
};
