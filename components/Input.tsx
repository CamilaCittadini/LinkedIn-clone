import { Avatar } from "@mui/material";
import { motion } from "framer-motion";
import { useSession } from "next-auth/react";
import React from "react";
import CropOriginalIcon from "@mui/icons-material/CropOriginal";
import YouTubeIcon from "@mui/icons-material/YouTube";
import InsertInvitationIcon from "@mui/icons-material/InsertInvitation";
import ArticleIcon from "@mui/icons-material/Article";
import { useRecoilState } from "recoil";
import { modalState, modalTypeState } from "../atoms/modalAtom";

const Input = () => {
  const { data: session } = useSession();
  const [modalOpen, setModalOpen] = useRecoilState(modalState);
  const [modalType, setModalType] = useRecoilState(modalTypeState);

  return (
    <div className="bg-white dark:bg-[#1D2226] rounded-lg p-3 space-y-3 border border-[#b4b5b7] dark:border-none">
      <div className="flex items-center space-x-2">
        <Avatar
          src={session?.user?.image as string | undefined}
          className="!h-10 !w-10 cursor-pointer"
          imgProps={{ referrerPolicy: "no-referrer" }}
        />
        <motion.button
          whileHover={{ scale: 1.01 }}
          whileTap={{ scale: 0.99 }}
          className="rounded-full border border-gray-400 py-2.5 px-3 opacity-80 hover:opacity-100 font-medium w-full text-left hover:bg-[#ebebeb] dark:hover:bg-[#464a4d]"
          onClick={() => {
            setModalOpen(true);
            setModalType("CreatePost");
          }}
        >
          Start a post
        </motion.button>
      </div>
      <div className="flex items-center gap-4 justify-center md:gap-x-10">
        <button className="inputButton">
          <CropOriginalIcon className="text-[#378FE9]" />
          <h4 className="opacity-80 ">Photo</h4>
        </button>
        <button className="inputButton">
          <YouTubeIcon className="text-[#5F9B41]" />
          <h4 className="opacity-80">Video</h4>
        </button>
        <button className="inputButton">
          <InsertInvitationIcon className="text-[#C37D16]" />
          <h4 className="opacity-80 ">Event</h4>
        </button>
        <button className="inputButton">
          <ArticleIcon className="text-[#E16745]" />
          <h4 className="opacity-80">Write article</h4>
        </button>
      </div>
    </div>
  );
};

export { Input };
