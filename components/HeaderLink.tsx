import React from "react";
import { SvgIconComponent } from "@mui/icons-material";
import classNames from "classnames";

interface HeaderLinkProps {
  Icon: SvgIconComponent;
  text: string;
  avatar: any;
  feed: any;
}

const HeaderLink = ({ Icon, text, avatar, feed }: HeaderLinkProps) => {
  return (
    <div
      className={classNames(
        "cursor-pointer flex flex-col justify-center items-center",
        {
          "text-black/60 hover:text-black dark:text-white/75 dark:hover:text-white lg:-mb-1.5 space-y-1":
            feed,
          "text-gray-500 hover:text-gray-700": !feed,
        }
      )}
    >
      {avatar ? <Icon className="!h-7 !w-7 lg:!-mb-1" /> : <Icon />}
      <h4 className="text-sm">{text}</h4>
    </div>
  );
};

export { HeaderLink };
