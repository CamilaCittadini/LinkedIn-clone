import { atom, RecoilValue } from "recoil";
import { PostInfo } from "../services";

export const getPostState = atom({
  key: "getPostState",
  default: {} as PostInfo,
});

export const getPostToView = atom({
  key: "getPostToView",
  default: undefined,
});
