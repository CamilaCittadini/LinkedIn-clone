import Image from "next/image";
import React from "react";
import { HeaderLink } from "../components/HeaderLink";
import ExploreIcon from "@mui/icons-material/Explore";
import GroupIcon from "@mui/icons-material/Group";
import FeaturedVideoIcon from "@mui/icons-material/FeaturedVideo";
import BusinessCenterIcon from "@mui/icons-material/BusinessCenter";
import ArrowForwardIosRoundedIcon from "@mui/icons-material/ArrowForwardIosRounded";
import Head from "next/head";
import { getProviders, signIn } from "next-auth/react";
import type { Provider } from "next-auth/providers";
import type { GetServerSideProps } from "next";

const home = ({ providers }: { providers: Provider }) => {
  return (
    <div className="space-y-10 relative">
      <div>
        <Head>
          <title>Home | LinkedIn</title>
          <meta name="description" content="LinkedIn" />
          <link
            rel="icon"
            href="https://cdn-icons-png.flaticon.com/512/174/174857.png"
          />
        </Head>
      </div>
      <header className="flex justify-around items-center py-4">
        <div className="relative w-36 h-10">
          <Image
            src="https://content.linkedin.com/content/dam/me/business/en-us/amp/brand-site/v2/bg/LI-Logo.svg.original.svg"
            alt="Linkedin-Logo"
            fill
            className="homeLogo"
            sizes="(max-width: 768px) 100vw,
            (max-width: 1200px) 50vw,
            33vw"
          />
        </div>
        <div className="flex items-center sm:divide-x divide-gray-300">
          <div className="hidden sm:flex space-x-8 pr-4">
            <HeaderLink Icon={ExploreIcon} text="Discover" />
            <HeaderLink Icon={GroupIcon} text="People" />
            <HeaderLink Icon={FeaturedVideoIcon} text="Learning" />
            <HeaderLink Icon={BusinessCenterIcon} text="Jobs" />
          </div>
          <div>
            {Object.values(providers).map((provider) => (
              <div key={provider.name}>
                <div className="pl-4 w-28">
                  <button
                    className="text-blue-700 font-semibold rounded-full border border-blue-700 px-5 py-1.5 transition-all hover:border-2"
                    onClick={() => signIn(provider.id, { callbackUrl: "/" })}
                  >
                    Sign in
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </header>
      <main className="flex flex-col xl:flex-row items-center max-w-screen-lg mx-auto">
        <div className="space-y-6 xl:space-y-10">
          <h1 className="text-3xl md:text-5xl text-amber-800 !leading-snug pl-4 xl:pl-0">
            Welcome to your professional community
          </h1>
          <div className="flex flex-row justify-between w-full">
            <div className="space-y-4 grow">
              <div className="intent ">
                <h2 className="text-xl">Search for a job</h2>
                <ArrowForwardIosRoundedIcon className="text-gray-700" />
              </div>
              <div className="intent">
                <h2 className="text-xl">Find a person you know</h2>
                <ArrowForwardIosRoundedIcon className="text-gray-700" />
              </div>
              <div className="intent">
                <h2 className="text-xl">Learn a new skill</h2>
                <ArrowForwardIosRoundedIcon className="text-gray-700" />
              </div>
            </div>

            <div className="xl:absolute w-80 h-80 xl:w-[650px] xl:h-[650px] xl:top-48 xl:right-5 top-14 right-5">
              <Image
                src="https://media.istockphoto.com/id/1219473617/es/vector/joven-personaje-masculino-escribiendo-c%C3%B3digo-en-una-computadora-de-escritorio-trabajando.jpg?s=612x612&w=0&k=20&c=LCYpGgRg-Y-U5DMSr6vIGEqlcINnxwsZ5XjM2yjYBos="
                alt="background-image"
                width={500}
                height={500}
                priority
                className="backgroundImage"
              />
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default home;

export const getServerSideProps: GetServerSideProps = async (context) => {
  const providers = await getProviders();
  return {
    props: {
      providers,
    },
  };
};
