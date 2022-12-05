import axios from "axios";
import type { Inputs } from "./components/Form";

export interface PostInfo extends Inputs {
  email: string | null | undefined;
  username: string | null | undefined;
  image: string | null | undefined;
  _id?: string;
}

export const uploadPost = async (post: PostInfo) => {
  return await axios({
    url: "/api/posts",
    method: "POST",
    data: post,
  });
};

export const fetchPost = async () => {
  return await axios({
    url: "/api/posts",
    method: "GET",
  });
};

export const removePost = async (post: PostInfo) => {
  return await axios({
    url: `/api/posts/${post?._id}`,
    method: "DELETE",
  });
};
