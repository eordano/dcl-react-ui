import { afterEach, describe, expect, test } from "vitest";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";

import LobbyNew from "./LobbyNew";
import { loginWithIdentity, signOutEngineAuth } from "../../data/auth/engineLogin";

const SIGNER = "0x00000000000000000000000000000000000000aa";

function makeIdentity() {
  const expiration = new Date(Date.now() + 86_400_000).toISOString();
  return {
    signer: SIGNER,
    ephemeral: { address: "0xeph", privateKey: "0xkey" as const },
    expiration,
    authChain: [
      { type: "SIGNER" as const, payload: SIGNER, signature: "" },
      { type: "ECDSA_EPHEMERAL" as const, payload: "msg", signature: "0xsig" },
    ],
  };
}

afterEach(() => {
  signOutEngineAuth();
});

describe("LobbyNew sign-in affordance", () => {
  test("signed-out: Sign in opens the SignInFlow modal", async () => {
    render(<LobbyNew />);
    expect(screen.getByText("Have an account?")).toBeTruthy();
    await userEvent.click(screen.getByRole("button", { name: "Sign in" }));
    const modal = await screen.findByRole("dialog", {
      name: "Sign in to Decentraland",
    });
    expect(modal).toBeTruthy();
    expect(
      screen.getByRole("button", { name: /continue with wallet/i }),
    ).toBeTruthy();
  });

  test("signed-in (stashed identity): shows address + Sign out", async () => {
    expect(loginWithIdentity(makeIdentity())).toBe(true);
    render(<LobbyNew />);
    expect(screen.getByText(/Signing in as/)).toBeTruthy();
    expect(screen.getByText("0x0000…00aa")).toBeTruthy();
    await userEvent.click(screen.getByRole("button", { name: "Sign out" }));
    expect(screen.getByText("Have an account?")).toBeTruthy();
  });
});
