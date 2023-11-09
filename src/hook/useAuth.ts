"use client";

import {
  signInPassword,
  signOut as signOutAPI,
  signUp as signUpAPI,
} from "@/src/data/api";
import { accessTokenState } from "@/src/recoil/auth";
import { useEffect, useState } from "react";
import { useRecoilState } from "recoil";

type UserAuthResp = {
  accessToken: string | null;
  isAuthenticated: boolean;
  signUp: (
    email: string,
    password: string,
    passwordConfirm: string,
  ) => Promise<void>;
  signIn: (email: string, password: string) => Promise<void>;
  signOut: () => Promise<void>;
};

export default function useAuth(): UserAuthResp {
  const [isInit, setIsInit] = useState(true); // prevent hydration error ref: https://github.com/polemius/recoil-persist#server-side-rendering
  const [accessToken, setAccessToken] = useRecoilState(accessTokenState);

  useEffect(() => {
    setIsInit(false);
  }, []);

  async function signUp(
    email: string,
    password: string,
    passwordConfirm: string,
  ) {
    const resp = await signUpAPI({ email, password, passwordConfirm });
    const accessToken = resp.access_token;
    setAccessToken(accessToken);
  }

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
    accessToken: isInit ? null : accessToken,
    isAuthenticated: isInit ? false : accessToken !== null,
    signUp,
    signIn,
    signOut,
  };
}
