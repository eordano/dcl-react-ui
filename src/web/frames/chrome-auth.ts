import { createContext, useContext } from "react";

export type ChromeAuth = {
  signedIn: boolean;
  account: string;
  mana: string;
  name: string;
  avatarUrl?: string;
  onSignIn?: () => void;
  fetchNotifications?: () => Promise<unknown>;
};

const LOGGED_OUT: ChromeAuth = {
  signedIn: false,
  account: "",
  mana: "",
  name: "",
  avatarUrl: undefined,
  onSignIn: undefined,
  fetchNotifications: undefined,
};

export const ChromeAuthContext = createContext<ChromeAuth>(LOGGED_OUT);

export function useChromeAuth(): ChromeAuth {
  return useContext(ChromeAuthContext);
}
