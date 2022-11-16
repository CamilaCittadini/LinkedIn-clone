import Head from "next/head";
import Image from "next/image";
import { Header } from "../components/Header";
import { Sidebar } from "../components/Sidebar";
import type { GetServerSideProps } from "next";
import { getSession, useSession } from "next-auth/react";
import { useRouter } from "next/router";

export default function Home() {
  const router = useRouter();

  {
    /*checks if user is authenticated on the client side (status) and if not authenticated, pushes the user to home page */
  }
  const { status } = useSession({
    required: true,
    onUnauthenticated() {
      router.push("/home");
    },
  });

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

//retrieving user's session
export const getServerSideProps: GetServerSideProps = async (context) => {
  const session = await getSession(context);
  //if there is no session (if user is not authenticated on the server side), the user will be redirected to the home page (otherwise we will retrieve the session)
  if (!session) {
    return {
      redirect: {
        permanent: false,
        destination: "/home",
      },
    };
  }
  return {
    props: { session },
  };
};
