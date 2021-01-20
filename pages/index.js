import Head from 'next/head'
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"

export default function Home() {
  return (
    <div>
      <Head>
        <title>UNISEC Thailand</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <nav className="absolute w-full grid grid-cols-2">
        <div class="px-20 py-5"><img src="/Logo.png" class="w-100 h-20" alt=""/></div>
        <div class="px-20 py-5 flex justify-end items-center">
          <ul className="flex justify-end items-center">
            <a href="#" className="mx-5"><li>Sign up</li></a>
            <a href="#" className="mx-5 bg-black text-white px-10 py-2 rounded-full"><li>Sign in</li></a>
          </ul>
        </div>
      </nav>
      <div className="h-screen grid grid-cols-2 px-20">
        <div className="flex flex-col justify-center items-center text-2xl">
          <h1 className="font-bold text-4xl">UNISEC Thailand</h1>
          <div class="text-center mt-5">An association that pushes space engineering <br/> in Thailand.</div>
        </div>
        <div className="flex flex-col justify-center items-center">
          <img src="/sideimg.svg" alt=""/>
        </div>
      </div>
      <div className="bg-blue-unisec text-white">
        <div className="container mx-auto py-20">
          <h1 className="text-4xl font-bold text-center">What is UNISEC?</h1>
          <div className="my-10 mx-20 text-center">
              UNISEC-Global is an international nonprofit body, consisting of local-chapters across the world. Since its establishment in November 2013 
            in Japan, UNISEC-Global has provided a forum every year to promote practical space development activities, mainly at university level, 
            such as designing, developing, manufacturing, launching and operating micro/nano/pico satellites and rockets, including their payloads. 
            University students, young researchers, their tutors and other stakeholders around the world participate in the annual 
            UNISEC-Global Meeting.
          </div>
          <div className="mt-10">
            <img src="/uniglo-image2h.jpg" className="mx-auto shadow" alt=""/>
          </div>
        </div>
      </div>
      <div>
        <div className="container mx-auto py-20">
          <h1 className="text-4xl font-bold text-center">Mission Idea Contest</h1>
          <div className="my-10 mx-20">
              <b>The Mission Idea Contest (MIC)</b> was established in 2010 to provide aerospace engineers, college students, consultants, and 
            anybody interested in space with opportunities to present their creative ideas and gain attention internationally. The primary 
            goal of MICs is to open a door to a new facet of space exploration and exploitation.
          </div>
          <div className="my-10 mx-20">
              Development of micro/nano-satellites started as an educational and research program primarily at university laboratories. As the 
            micro/nano-satellite technology matures, it has spread rapidly across the academics and industry for practical application.
          </div>
          <div className="grid grid-cols-3 gap-10 p-10">
            <img src="/MIC6_ICECubes_1st_MUSA.jpg" alt=""/>
            <img src="/MIC6_ICECubes_student_MARGE.jpg" alt=""/>
            <img src="/MIC6_iSEEP_1st_SMoSiS.jpg" alt=""/>
          </div>
        </div>
      </div>
      <div className="bg-blue-unisec text-white">
        <div className="container mx-auto py-20">
          <h1 className="text-4xl font-bold text-center">The 7th Mission Idea Contest</h1>
          <div className="my-10 mx-40">
            <h2 className="text-xl font-medium">Schedule</h2>
            <div className="max-w-3xl mx-auto">
              <div className="grid grid-cols-2 pt-10">
                <div>Oct 23, 2020</div>
                <div>Restart announcement</div>
              </div>
              <div className="grid grid-cols-2 pt-10">
                <div>July 2021</div>
                <div>Deadline of Abstract submission</div>
              </div>
              <div className="grid grid-cols-2 pt-10">
                <div>August 2021</div>
                <div>Notification of Finalists</div>
              </div>
              <div className="grid grid-cols-2 pt-10">
                <div>September 2021</div>
                <div>Deadline of Final Paper submission</div>
              </div>
              <div className="grid grid-cols-2 pt-10">
                <div>November 2021</div>
                <div>Final presentation</div>
              </div>
            </div>  
          </div>
          <div className="my-10 mx-40">
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
          <h1 className="text-4xl font-bold text-center">Our Sponsor</h1>
          <div className="grid grid-cols-3 gap-20 p-20 pb-10">
            <div className="h-28 bg-gray-100 rounded-lg shadow-lg"></div>
            <div className="h-28 bg-gray-100 rounded-lg shadow-lg"></div>
            <div className="h-28 bg-gray-100 rounded-lg shadow-lg"></div>
            <div className="h-28 bg-gray-100 rounded-lg shadow-lg"></div>
            <div className="h-28 bg-gray-100 rounded-lg shadow-lg"></div>
            <div className="h-28 bg-gray-100 rounded-lg shadow-lg"></div>
          </div>
        </div>
      </div>
      <div className="bg-blue-unisec text-white">
        <div className="container mx-auto px-20 py-10">CopyRight © UNISEC Thailand, All Rights Reserved.</div>
      </div>
    </div>
  )
}
