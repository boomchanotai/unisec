import Head from "next/head";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Nav from "./_components/Nav";

export default function Home() {
  return (
    <div>
      <Head>
        <title>UNISEC Thailand</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Nav />
      <div className="h-screen flex flex-col justify-center items-center lg:grid grid-cols-2 px-10 lg:px-20 pt-20">
        <div
          className="flex flex-col justify-center items-center text-lg lg:text-2xl"
          data-aos="fade-right">
          <div className="text-center mt-5">
            <h1 className="font-bold text-3xl mb-5">UNISEC Thailand</h1>
            University Space Engineering Consortium Thailand
          </div>
        </div>
        <div
          className="flex flex-col justify-center items-center mt-10 md:mt-0 px-10 md:px-0"
          data-aos="fade-left">
          <img src="/sideimg.svg" alt="" />
        </div>
      </div>
      <div className="bg-blue-unisec text-white">
        <div className="container mx-auto py-20">
          <h1 className="text-4xl font-bold text-center mx-10 md:mx-0">
            What is UNISEC?
          </h1>
          <div className="my-10 mx-10 md:mx-20 text-center">
            UNISEC-Global is an international nonprofit body, consisting of
            local-chapters across the world. Since its establishment in November
            2013 in Japan, UNISEC-Global has provided a forum every year to
            promote practical space development activities, mainly at university
            level, such as designing, developing, manufacturing, launching and
            operating micro/nano/pico satellites and rockets, including their
            payloads. University students, young researchers, their tutors and
            other stakeholders around the world participate in the annual
            UNISEC-Global Meeting.
          </div>
          <div className="mt-10 mx-10 lg:mx-0">
            <img
              src="/uniglo-image2h.jpg"
              className="mx-auto shadow rounded-lg"
              data-aos="fade"
              alt=""
            />
          </div>
        </div>
      </div>
      <div>
        <div className="container mx-auto py-20">
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
          <div className="flex">
            <div className="mx-auto text-black justify-center">
              <a href="/contest/mic">
                <div className="bg-white w-auto p-3 mt-4 rounded-lg cursor-pointer">
                  <span>More Details</span>
                </div>
              </a>
            </div>
          </div>
        </div>
      </div>
      <div>
        <div className="container mx-auto py-20">
          <h1 className="text-4xl font-bold text-center mx-10 md:mx-0">
            Our Sponsor
          </h1>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-16 lg:gap-20 p-16 md:p-20 pb-10">
            <div
              className="h-28 bg-gray-100 rounded-lg shadow-lg"
              data-aos="fade-up"></div>
            <div
              className="h-28 bg-gray-100 rounded-lg shadow-lg"
              data-aos="fade-up"></div>
            <div
              className="h-28 bg-gray-100 rounded-lg shadow-lg"
              data-aos="fade-up"></div>
            <div
              className="h-28 bg-gray-100 rounded-lg shadow-lg"
              data-aos="fade-up"></div>
            <div
              className="h-28 bg-gray-100 rounded-lg shadow-lg"
              data-aos="fade-up"></div>
            <div
              className="h-28 bg-gray-100 rounded-lg shadow-lg"
              data-aos="fade-up"></div>
          </div>
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
