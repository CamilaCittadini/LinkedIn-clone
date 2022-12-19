import axios from "axios";
import type { Inputs } from "./components/Form";

export interface PostInfo extends Inputs {
  email?: string | null;
  username?: string | null;
  image?: string | null;
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

export const updatePost = async (post: PostInfo) => {
  const postInputUpdate = {
    urlText: post?.urlText,
    textArea: post?.textArea,
  };

  return await axios({
    url: `/api/posts/${post?._id}`,
    method: "PATCH",
    data: postInputUpdate,
  });
};
