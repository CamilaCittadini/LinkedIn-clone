import { atom, RecoilState, RecoilValue } from "recoil";
import { PostInfo } from "../services";

export const getPostState = atom<PostInfo>({
  key: "getPostState",
  default: {} as PostInfo,
});

export const getPostToView = atom<PostInfo | undefined>({
  key: "getPostToView",
  default: undefined,
});
