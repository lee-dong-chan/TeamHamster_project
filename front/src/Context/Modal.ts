import { atom } from "recoil";

export const Modal = atom<string | undefined>({
  key: "modalstate",
  default: undefined,
});

export const Modalproduct = atom<string | undefined>({
  key: "modalproduct",
  default: undefined,
});
