import Head from 'next/head'
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"

export default function Home() {
  return (
    <div>
      <Head>
        <title>UNISEC Thailand</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <nav className="absolute w-full grid grid-cols-header-mobile md:grid-cols-2">
        <div class="px-10 lg:px-20 py-5"><img src="/Logo.png" class="max-w-100 max-h-20" alt=""/></div>
        <div class="px-10 lg:px-20 py-5 hidden justify-end items-center">{/* hidden md:flex */}
          <ul className="flex justify-end items-center">
            <a href="#" className="mx-5"><li>Sign up</li></a>
            <a href="#" className="mx-5 bg-black text-white border-black border-2 px-10 py-2 rounded-full duration-500 hover:bg-white hover:text-black"><li>Sign in</li></a>
          </ul>
        </div>
        <div className="hidden justify-center items-center">{/* flex md:hidden */}
          <FontAwesomeIcon icon={['fas', 'bars']} className="w-5 m-2" />
        </div>
      </nav>
      <div className="h-screen flex flex-col justify-center items-center lg:grid grid-cols-2 px-10 lg:px-20">
        <div className="flex flex-col justify-center items-center text-lg lg:text-2xl" data-aos="fade-right">
          <h1 className="font-bold text-2xl lg:text-4xl text-center">UNISEC Thailand</h1>
          <div class="text-center mt-5">An association that pushes space engineering in Thailand.</div>
        </div>
        <div className="flex flex-col justify-center items-center mt-10 md:mt-0 px-10 md:px-0" data-aos="fade-left">
          <img src="/sideimg.svg" alt=""/>
        </div>
      </div>
      <div className="bg-blue-unisec text-white">
        <div className="container mx-auto py-20">
          <h1 className="text-4xl font-bold text-center mx-10 md:mx-0">What is UNISEC?</h1>
          <div className="my-10 mx-10 md:mx-20 text-center">
              UNISEC-Global is an international nonprofit body, consisting of local-chapters across the world. Since its establishment in November 2013 
            in Japan, UNISEC-Global has provided a forum every year to promote practical space development activities, mainly at university level, 
            such as designing, developing, manufacturing, launching and operating micro/nano/pico satellites and rockets, including their payloads. 
            University students, young researchers, their tutors and other stakeholders around the world participate in the annual 
            UNISEC-Global Meeting.
          </div>
          <div className="mt-10 mx-10 lg:mx-0">
            <img src="/uniglo-image2h.jpg" className="mx-auto shadow rounded-lg" data-aos="fade" alt=""/>
          </div>
        </div>
      </div>
      <div>
        <div className="container mx-auto py-20">
          <h1 className="text-4xl font-bold text-center mx-10 md:mx-0">Mission Idea Contest</h1>
          <div className="my-10 mx-10 md:mx-20">
              <b>The Mission Idea Contest (MIC)</b> was established in 2010 to provide aerospace engineers, college students, consultants, and 
            anybody interested in space with opportunities to present their creative ideas and gain attention internationally. The primary 
            goal of MICs is to open a door to a new facet of space exploration and exploitation.
          </div>
          <div className="my-0 md:my-10 mx-10 md:mx-20">
              Development of micro/nano-satellites started as an educational and research program primarily at university laboratories. As the 
            micro/nano-satellite technology matures, it has spread rapidly across the academics and industry for practical application.
          </div>
          <div className="block md:grid grid-cols-3 gap-10 p-10">
            <img class="my-10 md:my-0" src="/MIC6_ICECubes_1st_MUSA.jpg" data-aos="fade-right" alt=""/>
            <img class="my-10 md:my-0" src="/MIC6_ICECubes_student_MARGE.jpg" data-aos="fade" alt=""/>
            <img class="my-10 md:my-0" src="/MIC6_iSEEP_1st_SMoSiS.jpg" data-aos="fade-left" alt=""/>
          </div>
        </div>
      </div>
      <div className="bg-blue-unisec text-white">
        <div className="container mx-auto py-20">
          <h1 className="text-4xl font-bold text-center mx-10 md:mx-0">The 7th Mission Idea Contest</h1>
          <div className="my-10 mx-10 md:mx-40">
            <h2 className="text-xl font-medium">Schedule</h2>
            <div className="max-w-3xl mx-auto">
              <div className="grid grid-cols-2 pt-10">
                <div data-aos="fade-right">Oct 23, 2020</div>
                <div data-aos="fade-left">Restart announcement</div>
              </div>
              <div className="grid grid-cols-2 pt-10">
                <div data-aos="fade-right">July 2021</div>
                <div data-aos="fade-left">Deadline of Abstract submission</div>
              </div>
              <div className="grid grid-cols-2 pt-10">
                <div data-aos="fade-right">August 2021</div>
                <div data-aos="fade-left">Notification of Finalists</div>
              </div>
              <div className="grid grid-cols-2 pt-10">
                <div data-aos="fade-right">September 2021</div>
                <div data-aos="fade-left">Deadline of Final Paper submission</div>
              </div>
              <div className="grid grid-cols-2 pt-10">
                <div data-aos="fade-right">November 2021</div>
                <div data-aos="fade-left">Final presentation</div>
              </div>
            </div>  
          </div>
          <div className="my-10 mx-10 md:mx-40">
            <h2 className="text-xl font-medium">Requirements</h2>
            <div className="max-w-3xl mx-auto text-black">
              <div className="bg-white my-5 flex flex-row items-center px-6 py-1 rounded-full hover:bg-gray-200 cursor-pointer"><FontAwesomeIcon icon={['fas', 'file-pdf']} className="w-5 m-2" /> <span className="pl-5">Constraints</span></div>
              <div className="bg-white my-5 flex flex-row items-center px-6 py-1 rounded-full hover:bg-gray-200 cursor-pointer"><FontAwesomeIcon icon={['fas', 'file-pdf']} className="w-5 m-2" /> <span className="pl-5">Abstract template</span></div>
              <div className="bg-white my-5 flex flex-row items-center px-6 py-1 rounded-full hover:bg-gray-200 cursor-pointer"><FontAwesomeIcon icon={['fas', 'file-word']} className="w-5 m-2" /> <span className="pl-5">Abstract template</span></div>
            </div>
          </div>
        </div>
      </div>
      <div>
        <div className="container mx-auto py-20">
          <h1 className="text-4xl font-bold text-center mx-10 md:mx-0">Our Sponsor</h1>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-16 lg:gap-20 p-16 md:p-20 pb-10">
            <div className="h-28 bg-gray-100 rounded-lg shadow-lg" data-aos="fade-up"></div>
            <div className="h-28 bg-gray-100 rounded-lg shadow-lg" data-aos="fade-up"></div>
            <div className="h-28 bg-gray-100 rounded-lg shadow-lg" data-aos="fade-up"></div>
            <div className="h-28 bg-gray-100 rounded-lg shadow-lg" data-aos="fade-up"></div>
            <div className="h-28 bg-gray-100 rounded-lg shadow-lg" data-aos="fade-up"></div>
            <div className="h-28 bg-gray-100 rounded-lg shadow-lg" data-aos="fade-up"></div>
          </div>
        </div>
      </div>
      <div className="bg-blue-unisec text-white">
        <div className="container mx-auto px-20 py-10">CopyRight © UNISEC Thailand, All Rights Reserved.</div>
      </div>
    </div>
  )
}
