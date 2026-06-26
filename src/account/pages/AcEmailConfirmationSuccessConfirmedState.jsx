import "./acemailconfirmationsuccessconfirmedstate.css";

function DclLogo() {
  return (
    <svg
      className="aecs__logo"
      width="48"
      height="48"
      viewBox="0 0 64 64"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      aria-label="Decentraland"
      role="img"
    >
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M32 64C49.6731 64 64 49.6731 64 32C64 14.3269 49.6731 0 32 0C14.3269 0 0 14.3269 0 32C0 49.6731 14.3269 64 32 64Z"
        fill="url(#aecs_p0)"
      />
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M12.7998 57.5996C18.1438 61.6156 24.7998 63.9996 31.9998 63.9996C39.1998 63.9996 45.8558 61.6156 51.1998 57.5996H12.7998Z"
        fill="#FF2D55"
      />
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M6.39941 51.2002C8.22341 53.6162 10.3834 55.7762 12.7994 57.6002H51.1994C53.6154 55.7762 55.7754 53.6162 57.5994 51.2002H6.39941Z"
        fill="#FFA25A"
      />
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M42.9278 44.7998H2.67188C3.66387 47.0878 4.92787 49.2318 6.39987 51.1998H42.9439V44.7998H42.9278Z"
        fill="#FFC95B"
      />
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M22.6719 20.7998V44.7998H42.6719L22.6719 20.7998Z"
        fill="url(#aecs_p1)"
      />
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M2.67188 44.7998H22.6719V20.7998L2.67188 44.7998Z"
        fill="white"
      />
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M42.9277 33.5996V51.1996H57.5997L42.9277 33.5996Z"
        fill="url(#aecs_p2)"
      />
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M28.2715 51.1996H42.9275V33.5996L28.2715 51.1996Z"
        fill="white"
      />
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M42.9277 28.7998C47.346 28.7998 50.9277 25.2181 50.9277 20.7998C50.9277 16.3815 47.346 12.7998 42.9277 12.7998C38.5095 12.7998 34.9277 16.3815 34.9277 20.7998C34.9277 25.2181 38.5095 28.7998 42.9277 28.7998Z"
        fill="#FFC95B"
      />
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M22.6719 16C24.881 16 26.6719 14.2091 26.6719 12C26.6719 9.79086 24.881 8 22.6719 8C20.4627 8 18.6719 9.79086 18.6719 12C18.6719 14.2091 20.4627 16 22.6719 16Z"
        fill="#FFC95B"
      />
      <defs>
        <linearGradient id="aecs_p0" x1="32" y1="-13.2548" x2="-13.2548" y2="32" gradientUnits="userSpaceOnUse">
          <stop stopColor="#FF2D55" />
          <stop offset="1" stopColor="#FFBC5B" />
        </linearGradient>
        <linearGradient id="aecs_p1" x1="22.6652" y1="20.7998" x2="22.6652" y2="44.7998" gradientUnits="userSpaceOnUse">
          <stop stopColor="#A524B3" />
          <stop offset="1" stopColor="#FF2D55" />
        </linearGradient>
        <linearGradient id="aecs_p2" x1="42.9228" y1="33.5996" x2="42.9228" y2="51.1996" gradientUnits="userSpaceOnUse">
          <stop stopColor="#A524B3" />
          <stop offset="1" stopColor="#FF2D55" />
        </linearGradient>
      </defs>
    </svg>
  );
}

function SuccessAnimation() {
  const sparkColors = ["#ff2d55", "#ffc95b", "#a524b3", "#ffa25a", "#57df41", "#982de2"];
  const sparks = Array.from({ length: 12 }, (_, i) => {
    const a = (360 / 12) * i;
    return (
      <span
        key={i}
        className="aecs__spark"
        style={{
          "--a": `${a}deg`,
          background: sparkColors[i % sparkColors.length],
          animationDelay: `${(i % 6) * 0.12}s`,
        }}
      />
    );
  });
  return (
    <div className="aecs__anim" aria-hidden="true">
      <div className="aecs__anim-stage">
        {sparks}
        <div className="aecs__coin">
          <svg viewBox="0 0 24 24" fill="none">
            <path
              d="M20 6L9 17l-5-5"
              stroke="currentColor"
              strokeWidth="2.6"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </div>
      </div>
    </div>
  );
}

function SuccessDescription({ source }) {
  if (source === "credits") {
    return (
      <p className="aecs__desc">
        You're ready to go.
        <br />
        Jump back over to the Decentraland app and start earning <b>Marketplace Credits!</b>
      </p>
    );
  }
  return (
    <p className="aecs__desc">
      You're ready to go.
      <br />
      Jump back over to the Decentraland app and start using your account!
    </p>
  );
}

export default function AcEmailConfirmationSuccessConfirmedState({
  source = "account",
  onRedirect = () => {},
}) {
  const isCredits = source === "credits";

  return (
    <div className="aecs">
      <DclLogo />

      <div className="aecs__card">
        {isCredits && <SuccessAnimation />}

        <h2 className="aecs__title">Email Confirmed!</h2>

        <SuccessDescription source={source} />

        <div className="aecs__btnrow">
          <button type="button" className="aecs__btn" onClick={onRedirect}>
            {isCredits ? "Go to Marketplace" : "Go back to Account"}
          </button>
        </div>
      </div>
    </div>
  );
}
