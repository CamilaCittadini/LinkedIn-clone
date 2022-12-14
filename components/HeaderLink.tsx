import React from "react";
import { SvgIconComponent } from "@mui/icons-material";
import classNames from "classnames";
import { useSession } from "next-auth/react";
import { Avatar } from "@mui/material";
interface HeaderLinkProps {
  Icon?: SvgIconComponent;
  text: string;
  avatar?: boolean;
  feed?: boolean;
  active?: boolean;
  hidden?: boolean;
}

const HeaderLink = ({ Icon, text, feed, active, hidden }: HeaderLinkProps) => {
  const { data: session } = useSession();

  return (
    <div
      className={classNames(
        "cursor-pointer flex flex-col justify-center items-center",
        {
          "text-black/60 hover:text-black dark:text-white/75 dark:hover:text-white lg:-mb-1.5 space-y-1":
            feed,
          "text-gray-500 hover:text-gray-700": !feed,
          "hidden md:inline-flex": hidden,
          "!text-black dark:!text-white": active,
        }
      )}
    >
      {!Icon ? (
        <Avatar
          className="!h-7 !w-7 lg:!-mb-1"
          src={session?.user?.image as string | undefined}
          imgProps={{ referrerPolicy: "no-referrer" }}
        />
      ) : (
        <Icon />
      )}

      <h4
        className={classNames("text-sm", {
          "hidden lg:flex justify-center w-full mx-auto": feed,
        })}
      >
        {text}
      </h4>
      {active && (
        <span className="hidden lg:inline-flex h-0.5 w-[calc(100%+20px)] bg-black dark:bg-white rounded-t-full" />
      )}
    </div>
  );
};

export { HeaderLink };
