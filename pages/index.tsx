import Head from "next/head";
import { Header } from "../components/Header";
import { Sidebar } from "../components/Sidebar";
import type { GetServerSideProps } from "next";
import { getSession } from "next-auth/react";
import { Feed } from "../components/Feed";
import { Modal } from "../components/Modal";
import { modalState, modalTypeState } from "../atoms/modalAtom";
import { useRecoilState } from "recoil";
import { getPostToView } from "../atoms/postAtom";

export default function Home() {
  const [modalOpen, setModalOpen] = useRecoilState(modalState);
  const [modalType, setModalType] = useRecoilState(modalTypeState);
  const [postToUpdate, setPostToUpdate] = useRecoilState(getPostToView);

  const handleClose = () => {
    setModalOpen(false);
    setPostToUpdate(undefined);
  };

  return (
    <div className="bg-light-color dark:bg-black dark:text-white h-screen overflow-y-scroll md:space-y-6 ">
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
          <Feed />
        </div>
        {modalOpen && (
          <Modal
            handleClose={handleClose}
            modalType={modalType}
            modalOpen={modalOpen}
          />
        )}
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
