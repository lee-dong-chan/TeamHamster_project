import { atom } from "recoil";

export const Modalstate = atom<boolean>({
  key: "modalstate",
  default: false,
});

export const Modalcontent = atom<string>({
  key: "modalcontent",
  default: "",
});
