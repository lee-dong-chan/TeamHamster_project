import { atom } from "recoil";

export const Modalstate = atom<boolean>({
  key: "systemmodalstate",
  default: false,
});

export const Modalcontent = atom<string>({
  key: "systemmodalcontent",
  default: "",
});
