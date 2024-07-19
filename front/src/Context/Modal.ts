import { atom } from "recoil";

export const Modal = atom<string | undefined>({
  key: "modalstate",
  default: undefined,
});
