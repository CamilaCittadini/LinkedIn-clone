import CloseIcon from "@mui/icons-material/Close";
import { useSession } from "next-auth/react";
import { Avatar } from "@mui/material";
//import {Form} from "./Form";
//import { getPostState } from "../atoms/postAtom";
//import Post from "./Post";
import MuiModal from "@mui/material/Modal";
import PublicIcon from "@mui/icons-material/Public";
import ArrowDropDownIcon from "@mui/icons-material/ArrowDropDown";
import Form from "./Form";
import Post from "./Post";
import { getPostState, getPostToView } from "../atoms/postAtom";
import { useRecoilValue } from "recoil";

interface ModalType {
  modalOpen: boolean;
  modalType: string;
  handleClose: () => void;
}

const Modal = ({ modalOpen, modalType, handleClose }: ModalType) => {
  const { data: session } = useSession();

  const post = useRecoilValue(getPostState);
  const postToView = useRecoilValue(getPostToView);

  return (
    <MuiModal open={modalOpen} onClose={handleClose}>
      <>
        {modalType != "PostModal" && (
          <div
            className="rounded-xl flex flex-col justify-center bg-white dark:bg-[#1D2226] dark:text-[#e8e8e9] w-full max-w-lg max-h-[calc
          (100vh - 160px)] absolute top-8 left-1/2 -translate-x-1/2 right-0 mx-6"
          >
            <div className="flex items-center justify-between border-b border-[#ebebeb] text-[#707070] dark:text-[#e8e8e9] dark:border-[#626668] px-4 py-2.5">
              <h4 className="text-2xl">
                {modalType === "CreatePost" ? "Create a post" : "Update post"}
              </h4>
              <button onClick={handleClose}>
                <CloseIcon className="h-8 w-8 rounded-full dark:text-[#ebebeb] hover:bg-[#ebebeb] dark:hover:bg-[#464a4d]" />
              </button>
            </div>

            <div className="p-4 space-y-2">
              <div className="flex items-center space-x-2">
                <Avatar
                  src={session?.user?.image || undefined}
                  className="!h-11 !w-11"
                />
                <div className="flex flex-col justify-center">
                  <h6 className="text-lg font-semibold">
                    {session?.user?.name}
                  </h6>
                  <div className="modalButton flex font-semibold items-center space-x-2 rounded-full border px-2 py-1 border-[#ebebeb] dark:border-[#626668]">
                    <PublicIcon />
                    <p>Anyone</p>
                    <ArrowDropDownIcon />
                  </div>
                </div>
              </div>
              <Form post={postToView} />
            </div>
          </div>
        )}

        {modalType === "PostModal" && (
          <div className="absolute top-20 right-0 left-1/4 -translate-x-1/4 ">
            <div className="rounded-xl flex-row bg-[#1D2226] w-full h-full md:flex ">
              <div className="bg-[#1D2226] flex w-full min-w-[200px] md:min-w-[50vh] md:w-full ">
                <img
                  src={post?.urlText}
                  alt=""
                  className="object-contain min-w-[200px] h-full px-2 md:min-w-[50vh] md:w-full"
                />
              </div>
              <div className="min-w-[200px] h-[500px] w-full flex bg-white dark:bg-[#1D2226] rounded-r-lg overflow-y-scroll">
                <Post post={post} modalPost key={post?._id} />
              </div>
            </div>
          </div>
        )}
      </>
    </MuiModal>
  );
};

export { Modal };
