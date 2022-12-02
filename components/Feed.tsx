import React from "react";
import { Input } from "./Input";
import { fetchPost, PostInfo } from "../services";
import { useQuery } from "react-query";
import Post from "./Post";

const Feed = () => {
  //FETCH Request
  const { data, refetch } = useQuery("linkedin-post", fetchPost);

  return (
    <div className="space-y-6 pb-24 max-w-lg">
      <Input />
      {/*Posts*/}
      {data?.data.map((post: PostInfo) => (
        <Post key={post._id} post={post} />
      ))}
    </div>
  );
};

export { Feed };
