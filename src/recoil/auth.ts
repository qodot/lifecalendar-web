import { atom } from "recoil";
import { recoilPersist } from "recoil-persist";

const { persistAtom } = recoilPersist();

export const accessTokenState = atom<string | null>({
  key: "auth.accessTokenState",
  default: null,
  effects_UNSTABLE: [persistAtom],
});
