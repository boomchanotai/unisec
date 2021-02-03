import Head from "next/head";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Nav from "../../_components/Nav";

export default function Home() {
  return (
    <div>
      <Head>
        <title>Mission Idea Contest | UNISEC Thailand</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Nav></Nav>
      <div>
        <div className="container mx-auto pt-40 pb-20">
          <h1 className="text-4xl font-bold text-center mx-10 md:mx-0">
            Mission Idea Contest
          </h1>
          <div className="my-10 mx-10 md:mx-20">
            <b>The Mission Idea Contest (MIC)</b> was established in 2010 to
            provide aerospace engineers, college students, consultants, and
            anybody interested in space with opportunities to present their
            creative ideas and gain attention internationally. The primary goal
            of MICs is to open a door to a new facet of space exploration and
            exploitation.
          </div>
          <div className="my-0 md:my-10 mx-10 md:mx-20">
            Development of micro/nano-satellites started as an educational and
            research program primarily at university laboratories. As the
            micro/nano-satellite technology matures, it has spread rapidly
            across the academics and industry for practical application.
          </div>
          <div className="block md:grid grid-cols-3 gap-10 p-10">
            <img
              className="my-10 md:my-0"
              src="/MIC6_ICECubes_1st_MUSA.jpg"
              data-aos="fade-right"
              alt=""
            />
            <img
              className="my-10 md:my-0"
              src="/MIC6_ICECubes_student_MARGE.jpg"
              data-aos="fade"
              alt=""
            />
            <img
              className="my-10 md:my-0"
              src="/MIC6_iSEEP_1st_SMoSiS.jpg"
              data-aos="fade-left"
              alt=""
            />
          </div>
        </div>
      </div>
      <div className="bg-blue-unisec text-white">
        <div className="container mx-auto py-20">
          <h1 className="text-4xl font-bold text-center mx-10 md:mx-0">
            The 7th Mission Idea Contest
          </h1>
          <div className="my-10 mx-10 md:mx-40">
            <h2 className="text-xl font-medium">Schedule</h2>
            <div className="max-w-3xl mx-auto">
              <div className="grid grid-cols-2 pt-10">
                <div data-aos="fade-right">Feb 2, 2021</div>
                <div data-aos="fade-left">Open Registration</div>
              </div>
              <div className="grid grid-cols-2 pt-10">
                <div data-aos="fade-right">Mar 14, 2021</div>
                <div data-aos="fade-left">Close Registration and Abstract Submission</div>
              </div>
              <div className="grid grid-cols-2 pt-10">
                <div data-aos="fade-right">Mar 28, 2021</div>
                <div data-aos="fade-left">Semi-Finalist Announcement 14 Teams</div>
              </div>
              <div className="grid grid-cols-2 pt-10">
                <div data-aos="fade-right">Apr 25, 2021</div>
                <div data-aos="fade-left">
                  Semi-Final Submission
                </div>
              </div>
              <div className="grid grid-cols-2 pt-10">
                <div data-aos="fade-right">May 9, 2021</div>
                <div data-aos="fade-left">Finalist Announcement 5 Teams</div>
              </div>
              <div className="grid grid-cols-2 pt-10">
                <div data-aos="fade-right">Jun 9, 2021</div>
                <div data-aos="fade-left">Final Submission</div>
              </div>
              <div className="grid grid-cols-2 pt-10">
                <div data-aos="fade-right">Jun 28, 2021</div>
                <div data-aos="fade-left">Final Presentation @NARIT, Chiang Mai</div>
              </div>
            </div>
          </div>
          <div className="my-10 mx-10 md:mx-40">
            <h2 className="text-xl font-medium">Requirements</h2>
            <div className="max-w-3xl mx-auto text-black">
              <a href="http://www.spacemic.net/pdf/mic7/MIC7_constraints.pdf" target="_blank" className="bg-white my-5 flex flex-row items-center px-6 py-1 rounded-full hover:bg-gray-200 cursor-pointer">
                <FontAwesomeIcon
                  icon={["fas", "file-pdf"]}
                  className="w-5 m-2"
                />{" "}
                <span className="pl-5">Constraints</span>
              </a>
              <a href="http://www.spacemic.net/pdf/mic7/MIC7_abstract_template.pdf" target="_blank" className="bg-white my-5 flex flex-row items-center px-6 py-1 rounded-full hover:bg-gray-200 cursor-pointer">
                <FontAwesomeIcon
                  icon={["fas", "file-pdf"]}
                  className="w-5 m-2"
                />{" "}
                <span className="pl-5">Abstract template</span>
              </a>
              <a href="http://www.spacemic.net/pdf/mic7/MIC7_abstract_template.doc" download className="bg-white my-5 flex flex-row items-center px-6 py-1 rounded-full hover:bg-gray-200 cursor-pointer">
                <FontAwesomeIcon
                  icon={["fas", "file-word"]}
                  className="w-5 m-2"
                />{" "}
                <span className="pl-5">Abstract template</span>
              </a>
            </div>
          </div>
        </div>
      </div>
      <div>
        <div className="container mx-auto py-20">
          <h1 className="text-4xl font-bold text-center mx-10 md:mx-0">
            MIC is now open for apply!
          </h1>
          <div className="flex">
            <div className="mx-auto text-black justify-center">
              <a href="/contest/mic/apply">
                <div className="bg-blue-unisec  w-auto p-3 mt-4 rounded-lg cursor-pointer">
                  <div className="text-white">Apply Now!</div>
                </div>
              </a>
            </div>
          </div>
        </div>
      </div>
      <div className="bg-blue-unisec text-white">
        <div className="container mx-auto py-20 block lg:grid grid-cols-2">
          <div className="hidden lg:flex flex-col justify-center items-center">
            <div className="text-right">
              <h1 className="font-bold text-3xl w-full">Join Our Discord !</h1>
              <h2 className="font-medium text-lg">Find your teammate and join The 7<sup>th</sup> Mission Idea Contest together.</h2>
            </div>
          </div>
          <div className="block lg:hidden text-center px-10 mb-10">
            <h1 className="font-bold text-3xl w-full mb-4">Join Our Discord !</h1>
            <h2 className="font-medium text-lg">Find your teammate and join The 7<sup>th</sup> Mission Idea Contest together.</h2>
          </div>
          <div className="flex flex-col justify-center items-center">
            <img src="/discord_unisec.png" alt=""/>
          </div>
        </div>
      </div>
      <div>
        <div className="container mx-auto py-20 text-center">
          <h1 className="font-bold text-4xl">Special Events</h1>
          <div className="mt-10">Coming Soon !</div>
        </div>
      </div>
      <div className="bg-blue-unisec text-white">
        <div className="container mx-auto px-20 py-10">
          CopyRight © UNISEC Thailand, All Rights Reserved.
        </div>
      </div>
    </div>
  );
}
