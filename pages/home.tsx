import Image from "next/image";
import React from "react";

const home = () => {
  return (
    <div>
      <header>
        <div className="relative w-36 h-10">
          <Image
            src="https://content.linkedin.com/content/dam/me/business/en-us/amp/brand-site/v2/bg/LI-Logo.svg.original.svg"
            alt="Linkedin-Logo"
            fill
            className="homeLogo"
          />
        </div>
        <div className="flex items-center sm:divide-x divide-gray-300">
          <div className="hidden sm:flex space-x-8">{/*headerLink*/}</div>
        </div>
      </header>
    </div>
  );
};

export default home;
