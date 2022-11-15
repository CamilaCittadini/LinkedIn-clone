import Head from "next/head";
import Image from "next/image";
import { Header } from "../components/Header";
import { Sidebar } from "../components/Sidebar";

export default function Home() {
  return (
    <div className="bg-[#F3F2EF] dark:bg-black dark:text-white h-screen overflow-y-scroll md:space-y-6 ">
      <Head>
        <title>Feed | LinkedIn</title>
        <meta name="description" content="LinkedIn" />
        <link
          rel="icon"
          href="https://cdn-icons-png.flaticon.com/512/174/174857.png"
        />
      </Head>
      <Header />
      <main className="flex justify-center gap-x-5 sm:px-12">
        <div className="flex flex-col md:flex-row gap-5">
          <Sidebar />
        </div>
      </main>
    </div>
  );
}
