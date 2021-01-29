import Head from "next/head";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Nav from "../../_components/Nav";

export default function Home() {
  return (
    <div className="h-screen">
      <Head>
        <title>Mission Idea Contest Application | UNISEC Thailand</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Nav></Nav>
      <div>
        <div className="container mx-auto py-20 mt-5">
          <h1 className="text-4xl font-bold text-center mx-10 md:mx-0">
            Applicant Login
          </h1>
        </div>
      </div>

      <div>
        <div className="container mx-auto py-20">
          Login with
          <div>google</div>
          <div>facebook</div>
        </div>
      </div>
      <div className="bottom-0 absolute w-full bg-blue-unisec text-white">
        <div className="container mx-auto px-20 py-10">
          CopyRight © UNISEC Thailand, All Rights Reserved.
        </div>
      </div>
    </div>
  );
}
