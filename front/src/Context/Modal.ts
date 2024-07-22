import { atom } from "recoil";

export const Modal = atom<string | undefined>({
  key: "modalstate",
  default: undefined,
});

export const MapId = atom<number | undefined>({
  key: "mapId",
  default: undefined,
});

export const ReviewId = atom<number | undefined>({
  key: "reviewId",
  default: undefined,
});

export const ImgUrl = atom<string | undefined>({
  key: "imgUrl",
  default: undefined,
});

export const Modalproduct = atom<string | undefined>({
  key: "modalproduct",
  default: undefined,
});
