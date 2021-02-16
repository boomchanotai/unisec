import Head from "next/head";
import React, { useState, useEffect, useRef } from 'react';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Nav from "../../_components/Nav";
import ReadMoreReact from 'read-more-react';

export default function Home() {

  const [showMsg1, setShowMsg1] = useState(false);
  const [showMsg2, setShowMsg2] = useState(false);
  const [showMsg3, setShowMsg3] = useState(false);
  const [showMsg4, setShowMsg4] = useState(false);
  const [showMsg5, setShowMsg5] = useState(false);
  const [showMsg6, setShowMsg6] = useState(false);
  const [showMsg7, setShowMsg7] = useState(false);
  const [showMsg8, setShowMsg8] = useState(false);
  const [showMsg9, setShowMsg9] = useState(false);
  const [showMsg10, setShowMsg10] = useState(false);
  const [showMicroNanoSat, setShowMicroNanoSat] = useState(false)
  const [deepSpace, setDeepSpace] = useState(false)
  const [scrollTop, setScrollTop] = useState(0);

  const [coloredBG, setColoredBG] = useState(false);

  const mainSection = useRef(null)
  const timelineSection = useRef(null)
  const faqSection = useRef(null)

  const openAnswer = (question) => {
    if (question == 1) {
      showMsg1 ? setShowMsg1(false) : setShowMsg1(true); 
    } else if (question == 2) {
      showMsg2 ? setShowMsg2(false) : setShowMsg2(true);
    } else if (question == 3) {
      showMsg3 ? setShowMsg3(false) : setShowMsg3(true);
    } else if (question == 4) {
      showMsg4 ? setShowMsg4(false) : setShowMsg4(true);
    } else if (question == 5) {
      showMsg5 ? setShowMsg5(false) : setShowMsg5(true);
    } else if (question == 6) {
      showMsg6 ? setShowMsg6(false) : setShowMsg6(true);
    } else if (question == 7) {
      showMsg7 ? setShowMsg7(false) : setShowMsg7(true);
    } else if (question == 8) {
      showMsg8 ? setShowMsg8(false) : setShowMsg8(true);
    } else if (question == 9) {
      showMsg9 ? setShowMsg9(false) : setShowMsg9(true);
    } else if (question == 10) {
      showMsg10 ? setShowMsg10(false) : setShowMsg10(true);
    } 
  }

  useEffect(() => {
    
    const onScroll = e => {
      if (e.target.documentElement.scrollTop > 0) {
        setColoredBG(true);
      } else {
        setColoredBG(false);
      }
    };
    window.addEventListener("scroll", onScroll);

    return () => window.removeEventListener("scroll", onScroll);
  }, [scrollTop])

  return (
    <div className="relative">
      <Head>
        <title>Mission Idea Contest | UNISEC Thailand</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Nav 
        position="fixed" 
        mic={true} 
        coloredBG={coloredBG} 
        about={() => mainSection.current.scrollIntoView()} 
        timeline={() => timelineSection.current.scrollIntoView()} 
        faq={() => faqSection.current.scrollIntoView()} 
      />
      <div style={{ backgroundColor : "#060d1a" }}>
        <div className="overflow-hidden relative" style={{ height : '100vh' }}>
          <video className="absolute w-full h-full top-2/4 left-2/4 object-cover" style={{ transform : 'translate(-50%, -50%)' }} autoPlay loop muted>
            <source src="/unisec_video.webm" type="video/webm" />
            Your browser does not support the video tag.
          </video>
          <div className="absolute bottom-16 left-2/4 cursor-pointer z-20 text-white" style={{ transform : 'translateX(-50%)' }} onClick={() => mainSection.current.scrollIntoView() }>
            <FontAwesomeIcon icon={["fas", "angle-down"]} className="w-5 bounce" />
          </div>
          <div className="text-white absolute h-full container flex flex-col justify-center left-2/4 px-10 lg:px-40" style={{ transform : 'translateX(-50%)' }}>
            <div>
              <h1 className="text-5xl font-bebas" style={{ letterSpacing: '0.08em' }}>THE 7th MISSION IDEA CONTEST</h1>
              <div className="text-lg">For Deep Space Science &amp; Exploration</div>
              <a href="/contest/mic/apply"><button className="outline-none bg-none focus:outline-none rounded bg-transparent border-2 border-white px-10 py-3 mt-8 hover:bg-white hover:text-black duration-500">Apply Now</button></a>
            </div>
          </div>
        </div>
        <div ref={mainSection}>
          <div className="container bg-white ml-auto mr-0 p-10 lg:py-40" style={{ backgroundColor: "#1f2638" }}>
            <div className="grid lg:grid-cols-split-40-60 h-full">
              <div className="lg:flex flex-col justify-center items-center">
                <h1 className="font-bebas font-bold text-6xl lg:text-9xl" style={{ WebkitTextStroke: '0.1px #006781' }} data-aos="fade-right">
                  <span className="hidden lg:block">ABOUT <br/> 7' MIC</span>
                  <span className="block lg:hidden pb-4">ABOUT 7' MIC</span>
                </h1>
              </div>
              <div className="text-white lg:pr-40 flex flex-col justify-center">
                <div data-aos="fade-left">
                  <div style={{ textIndent : '2em' }}>The Mission Idea Contest (MIC) was established in 2010 to provide aerospace engineers, college students, consultants, and anybody interested in space with opportunities to present their creative ideas and gain attention internationally. The primary goal of MICs is to open a door to a new facet of space exploration and exploitation.</div>
                  <div className="mt-4" style={{ textIndent : '2em' }}>Development of micro/nano-satellites started as an educational and research program primarily at university laboratories. As the micro/nano-satellite technology matures, it has spread rapidly across the academics and industry for practical application.</div>
                  <a href="http://www.spacemic.net/"><button className="outline-none bg-none focus:outline-none rounded bg-transparent border-2 border-white px-10 py-3 mt-8 hover:bg-white hover:text-black duration-500">Learn more</button></a>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div>
          <div className="container mx-auto p-10 lg:py-20 lg:px-40">
            <h1 className="font-bebas font-bold text-6xl lg:text-9xl text-right" style={{ WebkitTextStroke: '0.1px #006781' }} data-aos="fade">TOPICS</h1>
            <div className="grid md:grid-cols-2 gap-1">
              <div className="overflow-hidden">
                <div style={{ paddingTop : "100%" }} className="relative cursor-pointer thumbnail" onClick={() => setShowMicroNanoSat(true)}>
                  <div className="absolute top-0 left-0 w-full h-full" style={{ background: "url('/space-earth.png')", backgroundRepeat : 'no-repeat', backgroundPosition : 'center', backgroundSize : 'cover', filter : 'blur(3px)' }}></div>
                  <div className="absolute top-2/4 left-2/4 text-white text-center" style={{ transform : 'translate(-50%, -50%)'}}>
                    <h1 className="text-lg lg:text-2xl">Micro/Nano Satellites</h1>
                  </div>
                </div>
              </div>
              <div className="overflow-hidden">
                <div style={{ paddingTop : "100%" }} className="relative cursor-pointer thumbnail" onClick={() => setDeepSpace(true)}>
                  <div className="absolute top-0 left-0 w-full h-full" style={{ background: "url('/Space-debris.jpg')", backgroundRepeat : 'no-repeat', backgroundPosition : 'center', backgroundSize : 'cover', filter : 'blur(3px)' }}></div>
                  <div className="absolute top-2/4 left-2/4 text-white text-center" style={{ transform : 'translate(-50%, -50%)'}}>
                    <h1 className="text-lg lg:text-2xl">Deep Space Science and Exploration</h1>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div ref={timelineSection} style={{ background : "url('/space-world.png')", backgroundRepeat : 'no-repeat', backgroundPosition : 'center', backgroundSize : 'cover' }}>
          <div className="container mx-auto p-10 lg:py-20 lg:px-40">
            <h1 className="font-bebas font-bold text-6xl lg:text-9xl" style={{ WebkitTextStroke: '0.1px #006781' }}>TIMELINE</h1>
            <div className="max-w-3xl mx-auto text-white">
              <div className="grid grid-cols-2 pt-10">
                <div data-aos="fade-right">Feb 2, 2021</div>
                <div data-aos="fade-left" className=" text-lg">
                  Open Registration
                </div>
              </div>
              <div className="grid grid-cols-2 pt-10">
                <div data-aos="fade-right">Mar 14, 2021</div>
                <div data-aos="fade-left" className="text-red-500 text-lg">
                  Close Registration and Abstract Submission
                </div>
              </div>
              <div className="grid grid-cols-2 pt-10">
                <div data-aos="fade-right">Mar 28, 2021</div>
                <div data-aos="fade-left" className=" text-lg">
                  Semi-Finalist Announcement 14 Teams
                </div>
              </div>
              <div className="grid grid-cols-2 pt-10">
                <div data-aos="fade-right">Apr 25, 2021</div>
                <div data-aos="fade-left" className="text-red-500 text-lg">
                  Semi-Final Submission
                </div>
              </div>
              <div className="grid grid-cols-2 pt-10">
                <div data-aos="fade-right">May 9, 2021</div>
                <div data-aos="fade-left" className=" text-lg">
                  Finalist Announcement 5 Teams
                </div>
              </div>
              <div className="grid grid-cols-2 pt-10">
                <div data-aos="fade-right">Jun 9, 2021</div>
                <div data-aos="fade-left" className="text-red-500 text-lg">
                  Final Submission
                </div>
              </div>
              <div className="grid grid-cols-2 pt-10">
                <div data-aos="fade-right">Jun 28, 2021</div>
                <div data-aos="fade-left" className=" text-lg">
                  Final Presentation @NARIT, Chiang Mai
                </div>
              </div>
            </div>
          </div>
        </div>
        <div>
          <div className="container mx-auto p-10 lg:py-20 lg:px-40">
            <h1 className="font-bebas font-bold text-6xl lg:text-9xl text-center" style={{ WebkitTextStroke: '0.1px #006781' }} data-aos="fade">RULE</h1>
            <div className="mt-16">
              <div className="bg-white py-4 px-8 rounded-lg shadow my-4"><ReadMoreReact text={"1. Spacecraft envelope size is less than 1.0 m x1.0 m x1.0 m size with less than 100 kg in weight. (Multiple satellites are acceptable within the envelope area.)"} /></div>
              <div className="bg-white py-4 px-8 rounded-lg shadow my-4"><ReadMoreReact text={"2. The launcher delivers the spacecraft into cis-lunar orbit or deep space trajectory orbit with the relative velocity to the Earth (excess velocity) greater than 0 km/s, and the relation between C3 (square of the excess velocity) and the deliverable spacecraft mass"} /></div>
              <div className="bg-white py-4 px-8 rounded-lg shadow my-4"><ReadMoreReact text={"3. You can use a transponder onboard of PROCYON, the first deep space microspacecraft developed by the Univ. of Tokyo and JAXA. Its communication system is primarily comprised of XTRP (transponder) and XSSPA (power amplifier). The total required power and output RF power of the communication system is roughly 50 W and 15W respectively. The detail specification is shown in Table 4. of the reference 1). (If you cannot find the paper, please contact the MIC office.)"} /></div>
              <div className="bg-white py-4 px-8 rounded-lg shadow my-4"><ReadMoreReact text={"4. You can assume you can use earth ground stations for deep space missions like DSN (Deep Space Network), about which the detailed specifications are obtained from the reference."} /></div>
              <div className="bg-white py-4 px-8 rounded-lg shadow my-4">5. You can take continuous 8 hours for spacecraft operation every day.</div>
              <div className="bg-white py-4 px-8 rounded-lg shadow my-4">6. The lifetime is a free parameter. But you should consider the effect of radiation for the proposed lifetime.</div>
              <div className="bg-white py-4 px-8 rounded-lg shadow my-4">7. The proposed launch date should be before 2030.</div>
            </div>
          </div>
        </div>
        <div ref={faqSection}>
          <div className="container mx-auto p-10 lg:py-20 lg:px-40">
            <h1 className="font-bebas font-bold text-6xl lg:text-9xl text-center" style={{ WebkitTextStroke: '0.1px #006781' }} data-aos="fade">FAQ</h1>
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4 mt-16">
              <div>
                <div className="bg-white py-4 px-8 rounded-lg shadow">
                  <div className="cursor-pointer" onClick={() => openAnswer(1)}>
                    {showMsg1 ? (
                      <FontAwesomeIcon icon={["fas", "angle-down"]} className="w-3 inline" />
                    ) : (
                      <FontAwesomeIcon icon={["fas", "angle-right"]} className="w-3 inline" />
                    )}
                    &emsp;Is there an age limit for this competition?
                  </div>
                  {showMsg1 ? (
                    <div className="pt-4" style={{ textIndent : '2em' }}>No, this competition is for everyone who is interested in space and wants to try it out.</div>
                  ) : null}
                </div>
              </div>
              <div>
                <div className="bg-white py-4 px-8 rounded-lg shadow">
                  <div className="cursor-pointer" onClick={() => openAnswer(2)}>
                    {showMsg2 ? (
                      <FontAwesomeIcon icon={["fas", "angle-down"]} className="w-3 inline" />
                    ) : (
                      <FontAwesomeIcon icon={["fas", "angle-right"]} className="w-3 inline" />
                    )}
                    &emsp;What is the minimum or maximum number of team members?
                  </div>
                  {showMsg2 ? (
                    <div className="pt-4" style={{ textIndent : '2em' }}>We don’t really have a limit on that but we recommend it to be about 3-5 people for each team.</div>
                  ) : null}
                </div>
              </div>
              <div>
                <div className="bg-white py-4 px-8 rounded-lg shadow">
                  <div className="cursor-pointer" onClick={() => openAnswer(3)}>
                    {showMsg3 ? (
                      <FontAwesomeIcon icon={["fas", "angle-down"]} className="w-3 inline" />
                    ) : (
                      <FontAwesomeIcon icon={["fas", "angle-right"]} className="w-3 inline" />
                    )}
                    &emsp;Can we form a team with members from different schools or institutions?
                  </div>
                  {showMsg3 ? (
                    <div className="pt-4" style={{ textIndent : '2em' }}>Yes, of course.</div>
                  ) : null}
                </div>
              </div>
              <div>
                <div className="bg-white py-4 px-8 rounded-lg shadow">
                  <div className="cursor-pointer" onClick={() => openAnswer(4)}>
                    {showMsg4 ? (
                      <FontAwesomeIcon icon={["fas", "angle-down"]} className="w-3 inline" />
                    ) : (
                      <FontAwesomeIcon icon={["fas", "angle-right"]} className="w-3 inline" />
                    )}
                    &emsp;Can we participate if we do not have any engineering or science background?
                  </div>
                  {showMsg4 ? (
                    <div className="pt-4" style={{ textIndent : '2em' }}>Yes, and we encourage everyone who is passionate about space to participate. This is a very good opportunity to get your hands on the job.</div>
                  ) : null}
                </div>
              </div>
              <div>
                <div className="bg-white py-4 px-8 rounded-lg shadow">
                  <div className="cursor-pointer" onClick={() => openAnswer(5)}>
                    {showMsg5 ? (
                      <FontAwesomeIcon icon={["fas", "angle-down"]} className="w-3 inline" />
                    ) : (
                      <FontAwesomeIcon icon={["fas", "angle-right"]} className="w-3 inline" />
                    )}
                    &emsp;How much is the registration fee for this competition?
                  </div>
                  {showMsg5 ? (
                    <div className="pt-4" style={{ textIndent : '2em' }}>It’s FREE!</div>
                  ) : null}
                </div>
              </div>
              <div>
                <div className="bg-white py-4 px-8 rounded-lg shadow">
                  <div className="cursor-pointer" onClick={() => openAnswer(6)}>
                    {showMsg5 ? (
                      <FontAwesomeIcon icon={["fas", "angle-down"]} className="w-3 inline" />
                    ) : (
                      <FontAwesomeIcon icon={["fas", "angle-right"]} className="w-3 inline" />
                    )}
                    &emsp;When do I have to submit the abstract?
                  </div>
                  {showMsg6 ? (
                    <div className="pt-4" style={{ textIndent : '2em' }}>According to the key dates mentioned above, the first abstract must be submitted before 14 March 2021, 23:59 (GMT +7)</div>
                  ) : null}
                </div>
              </div>
              <div>
                <div className="bg-white py-4 px-8 rounded-lg shadow">
                  <div className="cursor-pointer" onClick={() => openAnswer(7)}>
                    {showMsg7 ? (
                      <FontAwesomeIcon icon={["fas", "angle-down"]} className="w-3 inline" />
                    ) : (
                      <FontAwesomeIcon icon={["fas", "angle-right"]} className="w-3 inline" />
                    )}
                    &emsp;What is the marking criteria for the abstract?
                  </div>
                  {showMsg7 ? (
                    <div className="pt-4" style={{ textIndent : '2em' }}>Not Confirmed yet.</div>
                  ) : null}
                </div>
              </div>
              <div>
                <div className="bg-white py-4 px-8 rounded-lg shadow">
                  <div className="cursor-pointer" onClick={() => openAnswer(8)}>
                    {showMsg9 ? (
                      <FontAwesomeIcon icon={["fas", "angle-down"]} className="w-3 inline" />
                    ) : (
                      <FontAwesomeIcon icon={["fas", "angle-right"]} className="w-3 inline" />
                    )}
                    &emsp;How long should the abstract be?
                  </div>
                  {showMsg8 ? (
                    <div className="pt-4" style={{ textIndent : '2em' }}>The abstract must not exceed 5 pages. (The organizing team will upload the guidelines and template of the abstract later)</div>
                  ) : null}
                </div>
              </div>
              <div>
                <div className="bg-white py-4 px-8 rounded-lg shadow">
                  <div className="cursor-pointer" onClick={() => openAnswer(9)}>
                    {showMsg9 ? (
                      <FontAwesomeIcon icon={["fas", "angle-down"]} className="w-3 inline" />
                    ) : (
                      <FontAwesomeIcon icon={["fas", "angle-right"]} className="w-3 inline" />
                    )}
                    &emsp;What is the maximum size of the satellite?
                  </div>
                  {showMsg9 ? (
                    <div className="pt-4" style={{ textIndent : '2em' }}>The dimension must not exceed 1m x 1m x 1m and it should not weigh more than 100 kilograms.</div>
                  ) : null}
                </div>
              </div>
              <div>
                <div className="bg-white py-4 px-8 rounded-lg shadow">
                  <div className="cursor-pointer" onClick={() => openAnswer(10)}>
                    {showMsg10 ? (
                      <FontAwesomeIcon icon={["fas", "angle-down"]} className="w-3 inline" />
                    ) : (
                      <FontAwesomeIcon icon={["fas", "angle-right"]} className="w-3 inline" />
                    )}
                    &emsp;What is next for the winning team?
                  </div>
                  {showMsg10 ? (
                    <div className="pt-4" style={{ textIndent : '2em' }}>After the national round, each country will send their winning team to present their mission in the global round.</div>
                  ) : null}
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="text-white">
          <div className="container mx-auto px-20 py-10">
            CopyRight © UNISEC Thailand, All Rights Reserved.
          </div>
        </div>
      </div>

      {showMicroNanoSat ? (
        <div className="fixed top-2/4 left-2/4 z-50" style={{ transform : 'translate(-50%,-50%)' }}>
          <div className="absolute top-0 right-0 py-6 px-8 cursor-pointer" onClick={() => setShowMicroNanoSat(false)}><FontAwesomeIcon icon={["fas", "times"]} className="w-4" /></div>
          <div className="py-8 px-16 h-screen w-screen md:w-80vw md:h-80vh lg:h-60vh lg:w-60vw" style={{ backgroundColor : 'rgba(255,255,255,0.95)' }}>
            <h1 className="font-medium text-2xl px-4 pb-2">Micro/Nano Satellites</h1><hr className="border-black" />
            <div className="p-4 overflow-auto h-4/5">
              <p style={{ textIndent : '2em' }}>Micro and Nano satellites are satellites that weigh under 100 kilograms and under 10 kilograms respectively. These are considerably lightweight and compact size satellites which are not as costly and not time consuming to develop as the gigantic satellites in the past. The Micro and Nano satellites are becoming trends of space technology development such as for educational purposes, for scientific experiment, and for technology demonstration. Universities, laboratory, and private sectors have adopted Micro and Nano satellites to facilitate their works since it is not very expensive and not too complicated to develop.</p>
            </div>
          </div>
        </div>
      ) : null}
      {deepSpace ? (
        <div className="fixed top-2/4 left-2/4 z-50" style={{ transform : 'translate(-50%,-50%)' }}>
          <div className="absolute top-0 right-0 py-6 px-8 cursor-pointer" onClick={() => setDeepSpace(false)}><FontAwesomeIcon icon={["fas", "times"]} className="w-4" /></div>
          <div className="py-8 px-16 h-screen w-screen md:w-80vw md:h-80vh lg:h-60vh lg:w-60vw" style={{ backgroundColor : 'rgba(255,255,255,0.95)' }}>
            <h1 className="font-medium text-2xl px-4 pb-2">Deep Space Science and Exploration</h1><hr className="border-black" />
            <div className="p-4 overflow-auto h-4/5">
              <p style={{ textIndent : '2em' }}>Deep space exploration is the branch of astronomy, astronautics and space technology that is involved with exploring the distant regions of outer space. Usually, the word “deep space” is defined by The International Telecommunication Union that it starts at a distance of 2 million kilometers from Earth’s Surface. Physical exploration of space can be conducted either by human spaceflights (deep-space astronautics) and by robotics spacecraft. In parallel with exploring the deep space regions, humans have also been conducting various forms of science experiments and technology demonstrations to understand how the behavior of each component has changed due to long-term exposure to space.</p>
            </div>
          </div>
        </div>
      ) : null}
    </div>
  );
}
