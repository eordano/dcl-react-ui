import { useState } from "react";
import { asset } from "../../asset.js";
import AuthLayout from "../frames/AuthLayout.jsx";
import AuthFooterChrome from "../../explorer/frames/AuthFooterChrome.jsx";
import "./login.css";

export default function Login() {
  const [email, setEmail] = useState("");

  const avatars = (
    <div
      className="login__avatars"
      style={{ backgroundImage: `url(${asset("assets/login-avatars.png")})` }}
    />
  );

  const footer = <AuthFooterChrome />;

  return (
    <AuthLayout avatar={avatars} hideBrand hideFooter bottomLeft={footer}>
      <span className="login__logo" aria-hidden="true">
        <svg viewBox="0 0 48 48" width="34" height="34">
          <rect width="48" height="48" rx="12" fill="#ff2d55" />
          <path d="M24 12 14 32h20L24 12z" fill="#fff" />
          <path d="M30 22 20 36h16L30 22z" fill="#fff" />
        </svg>
      </span>
      <h1 className="login__title">Log in or Sign up</h1>
      <label className="login__caption">Recommended</label>
      <div className="login__inputwrap">
        <input
          className="login__field"
          type="email"
          aria-label="Email"
          placeholder="you@email.com"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <button className="login__next" type="button">NEXT</button>
      </div>
      <div className="login__divider">or continue with</div>
      <button className="login__provider">
        <svg className="login__providericon" viewBox="0 0 48 48" width="20" height="20" aria-hidden="true">
          <path fill="#4285F4" d="M45.12 24.5c0-1.56-.14-3.06-.4-4.5H24v8.51h11.84c-.51 2.75-2.06 5.08-4.39 6.64v5.52h7.11c4.16-3.83 6.56-9.47 6.56-16.17z" />
          <path fill="#34A853" d="M24 46c5.94 0 10.92-1.97 14.56-5.33l-7.11-5.52c-1.97 1.32-4.49 2.1-7.45 2.1-5.73 0-10.58-3.87-12.31-9.07H4.34v5.7C7.96 41.07 15.4 46 24 46z" />
          <path fill="#FBBC05" d="M11.69 28.18c-.44-1.32-.69-2.73-.69-4.18s.25-2.86.69-4.18v-5.7H4.34A21.99 21.99 0 0 0 2 24c0 3.55.85 6.91 2.34 9.88l7.35-5.7z" />
          <path fill="#EA4335" d="M24 10.75c3.23 0 6.13 1.11 8.41 3.29l6.31-6.31C34.91 4.18 29.93 2 24 2 15.4 2 7.96 6.93 4.34 14.12l7.35 5.7c1.73-5.2 6.58-9.07 12.31-9.07z" />
        </svg>
        <span>Google</span>
      </button>
      <button className="login__provider">
        <svg className="login__providericon" viewBox="0 0 48 48" width="20" height="20" aria-hidden="true">
          <path fill="#E2761B" d="m42 6-15.1 11.2 2.8-6.6L42 6z" />
          <path fill="#E4761B" d="m6 6 15 11.3-2.7-6.7L6 6zm30.7 26-4 6.1 8.6 2.4 2.5-8.3-7.1-.2zm-32.3.2 2.4 8.3 8.6-2.4-4-6.1-7 .2z" />
          <path fill="#E4761B" d="m13.9 21.4-2.4 3.6 8.5.4-.3-9.1-5.8 5.1zm20.2 0-5.9-5.2-.2 9.2 8.5-.4-2.4-3.6zM15.9 38.1l5.1-2.5-4.4-3.4-.7 5.9zm11.1-2.5 5.1 2.5-.7-5.9-4.4 3.4z" />
          <path fill="#D7C1B3" d="m32.1 38.1-5.1-2.5.4 3.3v1.4l4.7-2.2zm-16.2 0 4.7 2.2v-1.4l.4-3.3-5.1 2.5z" />
          <path fill="#233447" d="m20.7 30.1-4.2-1.2 3-1.4 1.2 2.6zm6.6 0 1.2-2.6 3 1.4-4.2 1.2z" />
        </svg>
        <span>MetaMask</span>
      </button>
      <button className="login__more">MORE OPTIONS</button>
    </AuthLayout>
  );
}
