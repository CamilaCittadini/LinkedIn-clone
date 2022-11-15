import React from "react";
import Image from "next/image";
import { Avatar } from "@mui/material";
import { signOut, useSession } from "next-auth/react";
import { AddRounded, Bookmark, Tag } from "@mui/icons-material";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import KeyboardArrowUpIcon from "@mui/icons-material/KeyboardArrowUp";
import { useState } from "react";

const Sidebar = () => {
  const [showRecent, setShowRecent] = useState<boolean>(true);
  const [showHashtag, setShowHashtag] = useState<boolean>(true);
  return (
    <div className="space-y-2 min-w-max max-w-lg">
      <div className="bg-white dark:bg-[#1D2226] rounded-lg overflow-hidden relative flex flex-col items-center text-center border border-[#ebebeb] dark:border-none">
        <div className="relative w-full h-14">
          <Image
            src="https://images.fastcompany.net/image/upload/w_596,c_limit,q_auto:best,f_auto/wp-cms/uploads/2021/03/LinkedIn-Default-Background-2020-.jpg"
            layout="fill"
            priority
            alt="sidebar-image"
          />
        </div>

        <Avatar
          onClick={() => signOut()}
          src=""
          className="!h-14 !w-14 !border-2 !absolute !top-4 !cursor-pointer"
        />
        <div className="mt-5 py-4 space-x-0.5">
          <h4 className="hover:underline decoration-[#c79ef7] underline-offset-1 cursor-pointer">
            User Name
          </h4>
          <p className="text-black/60 dark:text-white/75">
            User_email@gmail.com
          </p>
        </div>
        <div className="hidden md:inline text-left sidebarButtonContainer dark:text-white/75 text-sm">
          <div className="font-medium space-y-0.5">
            <div className="flex justify-between space-x-2 sidebarButton">
              <h4>Who viewed your profile</h4>
              <span className="text-blue-500">321</span>
            </div>
            <div className="flex justify-between space-x-2 sidebarButton pb-1">
              <h4>Views of your post</h4>
              <span className="text-blue-500">1,892</span>
            </div>
          </div>
          <div className="sidebarButtonContainer sidebarButton">
            <h4 className="text-xs">Access exclusive tools & insights</h4>
            <h4 className="underline underline-offset-1 dark:text-white font-medium">
              <span className="w-3 h-3 bg-gradient-to-tr from-yellow-700 to-yellow-200 inline-block rounded-sm mr-1" />
              Try Premium for free
            </h4>
          </div>
          <div className="sidebarButton sidebarButtonContainer flex items-center -mb-3 space-x-1.5">
            <Bookmark className="!-ml-1" />
            <h4 className="dark:text-white font-medium">Bookmark</h4>
          </div>
        </div>
      </div>
      {/*Bottom*/}
      <div className="hidden md:flex bg-white dark:bg-[#1D2226] text-black/70 dark:text-white/75 rounded-lg overflow-hidden flex-col space-y-2 pt-2.5 sticky top-20 border border-[#ebebeb] dark:border-none">
        <div className="flex items-center justify-between">
          <p className="text-sm text-black dark:text-white px-2.5">Recent</p>
          {showRecent ? (
            <KeyboardArrowDownIcon
              className="sidebarIcon"
              onClick={() => setShowRecent(!showRecent)}
            />
          ) : (
            <KeyboardArrowUpIcon
              className="sidebarIcon"
              onClick={() => setShowRecent(!showRecent)}
            />
          )}
        </div>
        {showRecent && (
          <div className="text-xs font-bold">
            <div className="flex space-x-2 items-center sidebarButton !px-1 hover:text-black dark:hover:text-white">
              <Tag />
              <p>CamilaCittadini</p>
            </div>

            <div className="flex space-x-2 items-center sidebarButton !px-1 hover:text-black dark:hover:text-white">
              <Tag />
              <p>AllRightsReserved</p>
            </div>
            <div className="flex space-x-2 items-center sidebarButton !px-1 hover:text-black dark:hover:text-white">
              <Tag />
              <p>LinkedinClone</p>
            </div>
          </div>
        )}
        <p className="sidebarLinks">Groups</p>

        <div className="flex items-center justify-between">
          <p className="sidebarLinks">Events</p>
          <AddRounded className="sidebarIcon" />
        </div>
        <div>
          <div className="flex items-center justify-between">
            <p className="sidebarLinks">Followed Hashtags</p>
            {showHashtag ? (
              <KeyboardArrowUpIcon
                className="sidebarIcon"
                onClick={() => setShowHashtag(!showHashtag)}
              />
            ) : (
              <KeyboardArrowDownIcon
                className="sidebarIcon"
                onClick={() => setShowHashtag(!showHashtag)}
              />
            )}
          </div>
          {showHashtag && (
            <div className="text-xs font-bold">
              <div className="flex space-x-2 items-center sidebarButton !px-1 hover:text-black dark:hover:text-white">
                <Tag />
                <p>OpenToWork</p>
              </div>

              <div className="flex space-x-2 items-center sidebarButton !px-1 hover:text-black dark:hover:text-white">
                <Tag />
                <p>FrontendDeveloper</p>
              </div>
              <div className="flex space-x-2 items-center sidebarButton !px-1 hover:text-black dark:hover:text-white">
                <Tag />
                <p>I♥Typescript</p>
              </div>
            </div>
          )}
        </div>
        <div className="flex justify-center">
          <h4 className="sidebarButton text-center w-full dark:text-white font-medium">
            Discover More
          </h4>
        </div>
      </div>
    </div>
  );
};

export { Sidebar };
