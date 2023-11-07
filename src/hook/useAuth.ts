"use client";

import { useRecoilState } from "recoil";
import { signInPassword, signOut as signOutAPI } from "@/src/data/api";
import { accessTokenState } from "@/src/recoil/auth";

type UserAuthResp = {
  accessToken: string | null;
  isAuthenticated: boolean;
  signIn: (email: string, password: string) => Promise<void>;
  signOut: () => Promise<void>;
};

export default function useAuth(): UserAuthResp {
  const [accessToken, setAccessToken] = useRecoilState(accessTokenState);

  async function signIn(email: string, password: string) {
    const resp = await signInPassword({ email, password });
    const accessToken = resp.access_token;
    setAccessToken(accessToken);
  }

  async function signOut() {
    if (accessToken === null) {
      return;
    }
    await signOutAPI(accessToken);
    setAccessToken(null);
  }

  return {
    accessToken,
    isAuthenticated: accessToken !== null,
    signIn,
    signOut,
  };
}
