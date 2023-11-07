import { atom } from "recoil";

export const accessTokenState = atom<string | null>({
  key: "auth.accessTokenState",
  default: null,
});
