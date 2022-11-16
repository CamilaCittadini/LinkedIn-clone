import {
  AppsOutageOutlined,
  BusinessCenterSharp,
  ChatBubble,
  Home,
  Notifications,
  SearchRounded,
} from "@mui/icons-material";
import GroupIcon from "@mui/icons-material/Group";
import classNames from "classnames";
import Image from "next/image";
import React from "react";
import { HeaderLink } from "./HeaderLink";
import LightModeIcon from "@mui/icons-material/LightMode";
import DarkModeIcon from "@mui/icons-material/DarkMode";
import { useState, useEffect } from "react";
import { useTheme } from "next-themes";
import { motion } from "framer-motion";

const spring = {
  type: "spring",
  stiffness: 700,
  damping: 30,
};

const Header = () => {
  //dark mode implemented with next-themes
  const [mounted, setMounted] = useState<boolean>(false);
  const { setTheme, resolvedTheme, theme } = useTheme();

  //after mounting (which will occur on the first render), we have access to the theme
  //the logo changes based on the selected theme after mounting
  useEffect(() => setMounted(true), []);

  return (
    <header className="sticky top-0 z-40 bg-white dark:bg-[#1D2226] flex items-center justify-around py-1.5 px-3 dark:border-b dark:border-[#383d40] focus-within:shadow-lg">
      <div className="flex items-center space-x-2 w-full max-w-xs">
        {mounted && (
          <>
            {resolvedTheme === "dark" ? (
              <Image
                src="https://www.iconsdb.com/icons/preview/white/linkedin-3-xl.png"
                width={45}
                height={45}
                alt="linkedinLogo-DarkMode"
              />
            ) : (
              <Image
                src="https://content.linkedin.com/content/dam/me/business/en-us/amp/brand-site/v2/bg/LI-Bug.svg.original.svg"
                width={55}
                height={55}
                alt="linkedinLogo-LightMode"
              />
            )}
          </>
        )}
        <div className="flex items-center space-x-1 dark:md:bg-gray-700 py-2.5 px-4 rounded w-full">
          <SearchRounded />
          <input
            type="text"
            placeholder="Search"
            className="hidden md:inline-flex bg-transparent text-sm focus:outline-none placeholder-black/70 dark:placeholder-white/75 flex-grow"
          />
        </div>
      </div>

      <div className="flex items-center space-x-6">
        <HeaderLink Icon={Home} text="Home" feed active />
        <HeaderLink Icon={GroupIcon} text="My Network" feed />
        <HeaderLink Icon={BusinessCenterSharp} text="Jobs" feed hidden />
        <HeaderLink Icon={ChatBubble} text="Messaging" feed />
        <HeaderLink Icon={Notifications} text="Notifications" feed />
        <HeaderLink text="Me" feed avatar hidden />
        <div className="border-l pl-2 dark:border-[#383d40]">
          <HeaderLink Icon={AppsOutageOutlined} text="Products" feed hidden />
        </div>
        {/*Dark mode toggle */}
        {mounted && (
          <div
            className={classNames(
              "bg-gray-600 flex items-center px-0.5 rounded-full h-6 w-12 cursor-pointer flex-shrink-0 relative",
              {
                "justify-end": resolvedTheme === "dark",
                "justify-start": resolvedTheme === "light",
              }
            )}
            onClick={() =>
              setTheme(resolvedTheme === "dark" ? "light" : "dark")
            }
          >
            <DarkModeIcon className="absolute left-0 w-5" />

            {/*dark mode toggle animation with framer-motion*/}
            <motion.div
              className="w-5 h-5 bg-white rounded-full z-40"
              layout
              transition={spring}
            ></motion.div>

            <LightModeIcon className="absolute right-0.5 w-5" />
          </div>
        )}
      </div>
    </header>
  );
};

export { Header };
