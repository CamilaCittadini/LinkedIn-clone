import React, { useState } from "react";
import { fetchPost, PostInfo, removePost } from "../services";
import classNames from "classnames";
import { Avatar, IconButton } from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import ShareIcon from "@mui/icons-material/Share";
import { modalState, modalTypeState } from "../atoms/modalAtom";
import { getPostState, getPostToView } from "../atoms/postAtom";
import { useRecoilState } from "recoil";
import CloseIcon from "@mui/icons-material/Close";
import MoreHorizIcon from "@mui/icons-material/MoreHoriz";
import {
  CommentOutlined,
  ThumbUpAltOutlined,
  ThumbUpAltRounded,
} from "@mui/icons-material";
import { useSession } from "next-auth/react";
import {
  QueryObserverResult,
  RefetchOptions,
  RefetchQueryFilters,
  useMutation,
} from "react-query";
import { AxiosResponse } from "axios";

interface PostType {
  post: PostInfo;
  key: string | undefined;
  modalPost?: boolean | undefined;
  refetch: <TPageData>(
    options?: (RefetchOptions & RefetchQueryFilters<TPageData>) | undefined
  ) => Promise<QueryObserverResult<AxiosResponse<any, any>, unknown>>;
}

type TextAreaState = "less" | "more";

const Post = ({ post, key, modalPost, refetch }: PostType) => {
  const { data: session } = useSession();
  const [modalOpen, setModalOpen] = useRecoilState(modalState);
  const [modalType, setModalType] = useRecoilState(modalTypeState);
  const [postState, setPostState] = useRecoilState(getPostState);
  const [postToUpdate, setPostToUpdate] = useRecoilState(getPostToView);
  const [liked, setLiked] = useState<boolean>(false);

  const [fullText, setFullText] = useState<string>(
    post?.textArea?.slice(0, 149)
  );
  const [textAreaState, setTextAreaState] = useState<TextAreaState>("more");

  const handleShowText = (newState: TextAreaState) => {
    setTextAreaState(newState);
    if (newState === "less") {
      setFullText(post?.textArea);
    } else {
      setFullText(post?.textArea?.slice(0, 149));
    }
  };

  //Delete post function
  const { mutate: deletePost } = useMutation("linkedin-post", removePost, {
    onSuccess() {
      refetch();
    },
  });

  const handleDelete = (post: PostInfo) => {
    deletePost(post);
    setModalOpen(false);
  };

  const handleUpdate = () => {
    setModalOpen(true);
    setModalType("UpdatePost");
    setPostToUpdate(post);
  };

  return (
    <div
      key={post?._id}
      className={classNames(
        "bg-white dark:bg-[#1D2226] space-y-2 py-2.5 w-full border border-[#b4b5b7] dark:border-none rounded-lg"
      )}
    >
      <div className="flex flex-wrap items-center px-2.5 cursor-pointer">
        <Avatar
          src={post?.image as string | undefined}
          className="!h-10 !w-10 cursor-pointer"
        />
        <div className="mr-auto ml-2 leading-none">
          <h6 className="font-medium hover:text-[#307ECC] dark:hover:text-[#6aaae9] hover:underline">
            {post?.username}
          </h6>
          <p className="text-sm dark:text-white/75 opacity-80">{post?.email}</p>
        </div>
        {modalPost ? (
          <IconButton onClick={() => setModalOpen(false)}>
            <CloseIcon className="dark:text-white/75 h-7 w-7" />
          </IconButton>
        ) : (
          <IconButton
            disabled={session?.user?.email != post?.email}
            className={classNames({
              hidden: session?.user?.email != post?.email,
            })}
          >
            <MoreHorizIcon
              className="dark:text-white/75 h-7 w-7"
              onClick={() => handleUpdate()}
            />
          </IconButton>
        )}
      </div>
      {post?.textArea && (
        <div className="px-2.5 break-all md:break-normal">
          {post?.textArea.length < 150 ? (
            <p>{post?.textArea}</p>
          ) : (
            <div className="flex flex-col items-end">
              <p>{fullText}</p>
              <div
                onClick={() => {
                  textAreaState === "less"
                    ? handleShowText("more")
                    : handleShowText("less");
                }}
                className="font-medium hover:text-[#307ECC] dark:hover:text-[#6aaae9] hover:underline cursor-pointer "
              >
                {textAreaState === "less" ? "show less" : "...show more"}
              </div>
            </div>
          )}
        </div>
      )}

      {post?.urlText && !modalPost && (
        <img
          src={post?.urlText}
          alt=""
          className="w-full cursor-pointer"
          onClick={() => {
            setModalOpen(true);
            setModalType("PostModal");
            setPostState(post);
          }}
        />
      )}
      <div>
        <div className="flex space-x-2 items-center border-t border-gray-300 dark:border-gray-600/80 mx-2.5 pt-2 text-black/60 dark:text-white/75">
          <button
            onClick={() => setLiked(!liked)}
            className={classNames("postButton", {
              "text-blue-500 ": liked,
            })}
          >
            {liked ? (
              <ThumbUpAltRounded className="-scale-x-100" />
            ) : (
              <ThumbUpAltOutlined className="-scale-x-100" />
            )}
            <h4>Like</h4>
          </button>
          <button className="postButton">
            <CommentOutlined />
            <h4>Comment</h4>
          </button>
          {session?.user?.email === post?.email ? (
            <button className="postButton" onClick={() => handleDelete(post)}>
              <DeleteIcon />
              <h4>Delete post</h4>
            </button>
          ) : (
            <button className="postButton">
              <ShareIcon className="-scale-x-100" />
              <h4>Share</h4>
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

export default Post;
