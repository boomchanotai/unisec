import Head from "next/head";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Nav from "../../_components/NavMIC";
import Footer from "../../_components/Footer";
import { useEffect, useState } from "react";

import firebase from "firebase/app";
import "firebase/database";
import "firebase/storage";
import startFirebase from "../../../src/services/startFirebase";

startFirebase();

import { googleSigin } from "../../../src/services/siginProvider";

export default function Home() {
  const [teamname, setTeamname] = useState("");
  const [user, setUser] = useState(null);
  const [teamMemberCounter, setTeamMemberCounter] = useState(1);
  const [step, setStep] = useState(0);
  const [member, setMember] = useState([]);
  const [abstractFile, setAbstractFile] = useState(null);
  const [presentationVideo, setPresentationVideo] = useState(null);
  const [filename, setFilename] = useState([""]);
  const [abstractURL, setAbstractURL] = useState(null);
  const [videoURL, setVideoURL] = useState(null);
  const [loading, setLoading] = useState(false);
  const [teamMemberBox, setTeamMemberBox] = useState(false);
  const [abstract, setAbstract] = useState({
    title : null,
    poc : null,
    co_authors : null,
    organization : null,
    prize : null,
    mission_obj : null,
    operation : null,
    key_performance : null,
    space_segment : null,
    add_considerations : null,
    ref : null
  })

  const suffix = ["st", "nd", "rd", "th"];
  const userBlueprint = {
    name: null,
    birth: null,
    education: null,
    university: null,
    faculty: null,
    tel: null,
    email: null
  };
  const fetchData = (isGoToStep) => {
    firebase.auth().onAuthStateChanged(function (user) {
      if (user) {
        setUser({
          uid: user.uid,
          name: user.displayName,
          email: user.email
        });

        firebase.database().ref("users/" + user.uid).once("value").then(snap => {
          if (!snap.val()) {
            firebase.database().ref("users/" + user.uid).set({
              name: user.displayName,
              email: user.email
            })
          }
        })

        firebase
          .database()
          .ref("mic_register/" + user.uid)
          .once("value")
          .then((snap) => {
            if (snap.val()) {
              let register_info = snap.val();
              // console.log("register_info", register_info);
              if (isGoToStep) setStep(0);
              if (register_info.teamname) {
                if (isGoToStep) setStep(6);
                setMember(register_info.member);
                setTeamMemberCounter(register_info.member.length);
                setAbstract(register_info.abstract);
                setFilename(register_info.files);
              } else if (register_info.abstractConfirm) {
                if (isGoToStep) setStep(5);
                setMember(register_info.member);
                setTeamMemberCounter(register_info.member.length);
                setAbstract(register_info.abstract);
                setFilename(register_info.files);
              } else if (register_info.abstract && register_info.files?.videopresentation_path) {
                if (isGoToStep) setStep(4);
                setMember(register_info.member);
                setTeamMemberCounter(register_info.member.length);
                setAbstract(register_info.abstract);
                setFilename(register_info.files);
              } else if (register_info.checkTeam)  {
                if (isGoToStep) setStep(3);
                setMember(register_info.member);
                setTeamMemberCounter(register_info.member.length);
              } else if (register_info.team && register_info.member) {
                if (isGoToStep) setStep(2);
                setMember(register_info.member);
                setTeamMemberCounter(register_info.member.length);
              } else if (
                register_info.team &&
                typeof register_info.member === "undefined"
              ) {
                if (isGoToStep) setStep(1);
                member.push(userBlueprint);
                setMember(member);
              }
            }
          });
      } else {
        setUser([]);
      }
    });
  };
  useEffect(() => {
    fetchData(true);
  }, []);

  useEffect(() => {
    fetchData(false);
  }, [step]);

  useEffect(() => {
    if (step == 3) {
      if (
        //filename.abstract_path && 
        filename.videopresentation_path
      ) {
        // firebase
        //   .storage()
        //   .ref(
        //     "mic_register/" +
        //       user.uid +
        //       "/Abstract_" +
        //       teamname +
        //       "." +
        //       filename.abstract_path.split(".")[
        //         filename.abstract_path.split(".").length - 1
        //       ]
        //   )
        //   .getDownloadURL()
        //   .then((url) => {
        //     setAbstractURL(url);
        //   });
        firebase
          .storage()
          .ref(
            "mic_register/" +
              user.uid +
              "/VideoPresentation_" +
              teamname +
              "." +
              filename.videopresentation_path.split(".")[
                filename.videopresentation_path.split(".").length - 1
              ]
          )
          .getDownloadURL()
          .then((url) => {
            setVideoURL(url);
          });
      }
    }
  }, [step]);

  const handleSubmmitedNamedFormed = (e) => {
    e.preventDefault();
    const uuid = user.uid;
    firebase
      .database()
      .ref("mic_register/" + uuid + "/teamname")
      .set(teamname);
    setStep(6);
  };

  const handleTeamMember = (e) => {
    e.preventDefault();
    const uuid = user.uid;
    firebase
      .database()
      .ref("mic_register/" + uuid + "/team")
      .set(true)
    setStep(1);
  }

  useEffect(() => {
    if (parseInt(teamMemberCounter) > member.length) {
      setMember([...member, userBlueprint]);
    } else {
      setMember(member.slice(0, member.length - 1));
    }
  }, [teamMemberCounter]);

  const handleTeamPeople = async (number) => {
    (parseInt(teamMemberCounter) +number) >= 1
      ? setTeamMemberCounter(parseInt(teamMemberCounter) +number)
      : setTeamMemberCounter(1);
    await setMember(member);
  };

  const handleMemberList = (e) => {
    e.preventDefault();
    console.log(member);
    firebase
      .database()
      .ref("mic_register/" + user.uid + "/member")
      .set(member);
    setStep(2);
  };

  const handleAbstractSubmission = (e) => {
    e.preventDefault();

    firebase
      .database()
      .ref("mic_register/" + user.uid + "/abstract")
      .set(abstract)
    setStep(4)
    
    if (presentationVideo != null) {
      setLoading(true);
      Promise.all([
        // firebase
        //   .storage()
        //   .ref(
        //     "mic_register/" +
        //       user.uid +
        //       "/Abstract_" +
        //       teamname +
        //       "." +
        //       abstractFile.name.split(".")[
        //         abstractFile.name.split(".").length - 1
        //       ]
        //   )
        //   .put(abstractFile),
        firebase
          .storage()
          .ref(
            "mic_register/" +
              user.uid +
              "/VideoPresentation_" +
              teamname +
              "." +
              presentationVideo.name.split(".")[
                presentationVideo.name.split(".").length - 1
              ]
          )
          .put(presentationVideo),
      ]).then(() => {
        setLoading(false);
        // firebase
        //   .database()
        //   .ref("mic_register/" + user.uid + "/files/abstract_path")
        //   .set(abstractFile.name);
        firebase
          .database()
          .ref("mic_register/" + user.uid + "/files/videopresentation_path")
          .set(presentationVideo.name);
        setStep(4);
        filename.videopresentation_path = presentationVideo.name
        setFilename(filename);
      });
    } else {
      setStep(4);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    firebase
      .database()
      .ref("mic_register/" + user.uid + "/submit")
      .set(true);
    setStep(4);
  };

  const handleCheckSumTeam = (e) => {
    e.preventDefault();
    firebase
      .database()
      .ref("mic_register/" + user.uid + "/checkTeam")
      .set(true);
    setStep(3);
  }

  const logout = () => {
    firebase.auth().signOut().then(function() {
          console.log("Logged Out!")
        }).catch(function(error) {
          console.log(error)
        });
  }

  if (loading) {
    return (
      <div className="h-screen flex flex-col justify-center items-center">
        <div className="lds-ring w-16 h-16">
          <div></div>
          <div></div>
          <div></div>
          <div></div>
        </div>
      </div>
    );
  } else if (user === null) {
    return (
      <div className="h-screen flex flex-col justify-center items-center">
        <div className="lds-ring w-16 h-16">
          <div></div>
          <div></div>
          <div></div>
          <div></div>
        </div>
      </div>
    );
  } else if (user.length == 0) {
    return (
      <div className="min-h-screen relative" style={{ backgroundColor : "#060d1a", background : "url('/space-world.png')", backgroundRepeat : 'no-repeat', backgroundPosition : 'center', backgroundSize : 'cover' }}>
        <Head>
          <title>Mission Idea Contest Application | UNISEC Thailand</title>
          <link rel="icon" href="/favicon.ico" />
        </Head>
        <Nav user={user} logout={logout} />
        <div className="container mx-auto p-10 lg:py-20 lg:px-40">
          <div className="bg-white shadow md:w-96 p-10 mx-auto">
            <h1 className="font-bold text-xl text-center">Registration Form</h1>
            <button onClick={googleSigin} className="mt-8 w-full bg-red-700 hover:bg-red-800 text-white font-bold py-2 px-4 focus:outline-none focus:shadow-outline">Login with Google</button>
            <div className="text-sm mt-4">For more Information, <a href="/contest/mic" className="text-blue-600 underline">Visit</a> The 7<sup>th</sup> Mission Idea Contest's Website.</div>
          </div>
        </div>
        {/* <div className="container mx-auto pb-64 md:pb-40 lg:pb-0">
          <div className=" mt-5 block lg:grid grid-cols-2">
            <div className="px-10 md:px-0 p-10 lg:p-16">
              <h1 className="text-2xl md:text-4xl font-bold text-center">
                Applicant Login
              </h1>
              <h2 className="text-center my-10 text-lg md:text-2xl">Login with</h2>
              <div className="flex flex-row items-center justify-center">
                <div className="mx-5" onClick={googleSigin}>
                  <svg
                    className="w-16 cursor-pointer"
                    viewBox="0 0 533.5 544.3"
                    xmlns="http://www.w3.org/2000/svg">
                    <path
                      d="M533.5 278.4c0-18.5-1.5-37.1-4.7-55.3H272.1v104.8h147c-6.1 33.8-25.7 63.7-54.4 82.7v68h87.7c51.5-47.4 81.1-117.4 81.1-200.2z"
                      fill="#4285f4"
                    />
                    <path
                      d="M272.1 544.3c73.4 0 135.3-24.1 180.4-65.7l-87.7-68c-24.4 16.6-55.9 26-92.6 26-71 0-131.2-47.9-152.8-112.3H28.9v70.1c46.2 91.9 140.3 149.9 243.2 149.9z"
                      fill="#34a853"
                    />
                    <path
                      d="M119.3 324.3c-11.4-33.8-11.4-70.4 0-104.2V150H28.9c-38.6 76.9-38.6 167.5 0 244.4l90.4-70.1z"
                      fill="#fbbc04"
                    />
                    <path
                      d="M272.1 107.7c38.8-.6 76.3 14 104.4 40.8l77.7-77.7C405 24.6 339.7-.8 272.1 0 169.2 0 75.1 58 28.9 150l90.4 70.1c21.5-64.5 81.8-112.4 152.8-112.4z"
                      fill="#ea4335"
                    />
                  </svg>
                </div>
              </div>
            </div>
            <div className="px-10 md:px-0 p-10 lg:p-16 text-center">
              <h1 className="text-2xl md:text-4xl font-bold">Join our Discord !</h1>
              <div className="my-10"><img src="/discord_unisec.png" className="shadow-lg mx-auto" alt=""/></div>
              <div>Or <a href="https://discord.gg/uTRP5B3S" className="text-blue-500">https://discord.gg/uTRP5B3S</a></div>
            </div>
          </div>
          <div className="text-center">Learn more about The 7th Mission Idea Contest, <a href="/contest/mic" className="text-blue-500">Click here</a></div>
        </div> */}
        <Footer nonbgcolored={true} />
      </div>
    );
  } else if (user.name !== null) {
    if (step == 0) {
      return (
        <div className="min-h-screen relative" style={{ backgroundColor : "#060d1a" }}>
          <Head>
            <title>Mission Idea Contest Application | UNISEC Thailand</title>
            <link rel="icon" href="/favicon.ico" />
          </Head>
          <Nav user={user} logout={logout} />
          <div className="container mx-auto mt-5 pb-40 px-10 md:p-20 md:pt-10">
            <div className="my-10 py-40 text-center text-white">
              <h1 className="font-bold text-2xl">Do you have team ?</h1>
              <div className="mt-8">
                <button 
                  className="mx-4 py-2 px-4 bg-red-600 hover:bg-red-700 focus:ring-red-500 focus:ring-offset-red-200 text-white transition ease-in duration-200 text-center text-base font-semibold shadow-md focus:outline-none focus:ring-2 focus:ring-offset-2  rounded-lg"
                  onClick={() => setStep("discord")}
                >
                  No
                </button>
                <button 
                  className="mx-4 py-2 px-4 bg-white hover:bg-gray-300 focus:ring-white focus:ring-offset-gray-300 text-black transition ease-in duration-200 text-center text-base font-semibold shadow-md focus:outline-none focus:ring-2 focus:ring-offset-2  rounded-lg"
                  onClick={(e) => setTeamMemberBox(true)}
                >
                  Yes, We're team.
                </button>
              </div>
            </div>
          </div>
          {teamMemberBox ? (
            <div className="fixed top-2/4 left-2/4 z-30" style={{ transform : 'translate(-50%, -50%)' }}>   
              <div className="w-96 py-8 px-16 bg-white">
                <div className="font-bold text-lg text-center">How many people in your team ?</div>
                <form onSubmit={handleTeamMember}>
                  <input
                    value={teamMemberCounter}
                    onChange={handleTeamPeople}
                    type="number"
                    className="mt-4 rounded-lg border-transparent flex-1 appearance-none border border-gray-300 w-full py-2 px-4 bg-white text-gray-700 placeholder-gray-400 shadow-sm text-base focus:outline-none focus:ring-2 focus:ring-blue-600 focus:border-transparent"
                    placeholder="Team Members"
                    required
                  />
                  <div className="text-center">
                    <button 
                      className="mx-4 py-2 px-4 bg-red-600 hover:bg-red-700 focus:ring-red-500 focus:ring-offset-red-200 text-white transition ease-in duration-200 text-center text-base font-semibold shadow-md focus:outline-none focus:ring-2 focus:ring-offset-2  rounded-lg"
                      onClick={(e) => setTeamMemberBox(false)}
                      type="button"
                    >
                      Cancel
                    </button>
                    <button 
                      className="mt-4 py-2 px-4 px-6  bg-indigo-600 hover:bg-indigo-700 focus:ring-indigo-500 focus:ring-offset-indigo-200 text-white transition ease-in duration-200 text-center text-base font-semibold shadow-md focus:outline-none focus:ring-2 focus:ring-offset-2  rounded-lg"
                      type="submit"
                    >
                      Next
                    </button>
                  </div>
                  
                </form>
              </div>
            </div>
          ) : null}
          
          {/* <div className="container mx-auto mt-5 pb-40 px-10 md:p-20 md:pt-10">
            <div>
              <img src="/progressbar1.svg" className="w-100 mx-auto" alt="" />
            </div>
            <div className="my-10">
              <h2 className="font-bold text-2xl">Step 1 : Team Name</h2>
              <div className="py-40 flex flex-col items-center">
                <form
                  className="flex w-full items-center justify-center"
                  onSubmit={handleSubmmitedNamedFormed}>
                  <div className=" relative mr-2">
                    <input
                      onChange={(e) => setTeamname(e.target.value)}
                      value={teamname}
                      type="text"
                      className="rounded-lg border-transparent flex-1 appearance-none border border-gray-300 w-full py-2 px-4 bg-white text-gray-700 placeholder-gray-400 shadow-sm text-base focus:outline-none focus:ring-2 focus:ring-blue-600 focus:border-transparent"
                      placeholder="Your team name"
                      required
                    />
                  </div>
                  <button
                    className="flex-shrink-0 px-4 py-2 text-base font-semibold text-white bg-blue-unisec rounded-lg shadow-md hover:bg-blue-800 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 focus:ring-offset-blue-200"
                    type="submit">
                    <FontAwesomeIcon icon={["fas", "check"]} className="w-5" />
                  </button>
                </form>
              </div>
            </div>
          </div> */}
          <Footer nonbgcolored={true} />
        </div>
      );
    } else if (step == 1) {
      const memberForm = [];
      for (let i = 0; i < teamMemberCounter; i++) {
        memberForm.push(
          <div key={i} className="relative bg-white px-4 py-8 lg:p-8 rounded-lg shadow">
            {i == 0 ? (
              <h1 className="font-bold text-xl text-center">Contactable Person</h1>
            ) : (
              <h3 className="font-bold text-xl text-center">
                {i + 1}<sup>{(suffix[i] == null ? "th" : suffix[i])}</sup> Member
                Information
              </h3>
            )}
            <div className="m-4">
              <div className="my-4">
                Name :{" "}
                <input
                  onChange={(e) => {
                    member[i].name = e.target.value;
                    setMember(member);
                  }}
                  defaultValue={member[i]?.name}
                  type="text"
                  placeholder="Name"
                  className="border-2 border-gray-200 pl-4 py-1 rounded-lg"
                  required
                />
              </div>
              <div className="my-4">
                Birth :{" "}
                <input
                  onChange={(e) => {
                    member[i].birth = e.target.value;
                    setMember(member);
                  }}
                  defaultValue={member[i]?.birth}
                  type="date"
                  className="border-2 border-gray-200 pl-4 py-1 rounded-lg"
                  required
                />
              </div>
              <div className="my-4">
                Education :{" "}
                <select
                  className="border-2 border-gray-200 w-full pl-4 py-1 rounded-lg"
                  required
                  defaultValue={member[i]?.education}
                  onChange={(e) => {
                    member[i].education = e.target.value;
                    setMember(member);
                  }}>
                  <option selected defaultValue="">
                    {" "}
                    -- select an education --{" "}
                  </option>
                  <option
                    selected={member[i]?.education === "Grade_7-12"}
                    value="Grade_7-12">
                    Grade 7-12
                  </option>
                  <option
                    selected={
                      member[i]?.education === "B.A. (Bachelor of Arts)"
                    }
                    value="B.A. (Bachelor of Arts)">
                    B.A. (Bachelor of Arts)
                  </option>
                  <option
                    selected={member[i]?.education === "M.A. (Master of Arts)"}
                    value="M.A. (Master of Arts)">
                    M.A. (Master of Arts)
                  </option>
                  <option
                    selected={
                      member[i]?.education === "Ph.D. (Doctor of Philosophy)"
                    }
                    value="Ph.D. (Doctor of Philosophy)">
                    Ph.D. (Doctor of Philosophy)
                  </option>
                </select>
              </div>
              <div className="my-4">
                School / University :{" "}
                <input
                  placeholder="School / University"
                  onChange={(e) => {
                    member[i].university = e.target.value;
                    setMember(member);
                  }}
                  defaultValue={member[i]?.university}
                  type="text"
                  className="border-2 border-gray-200 pl-4 py-1 rounded-lg w-full"
                  required
                />
              </div>
              <div className="my-4">
                Faculty / Cirriculum :{" "}
                <input
                  placeholder="Faculty / Cirriculum"
                  onChange={(e) => {
                    member[i].faculty = e.target.value;
                    setMember(member);
                  }}
                  defaultValue={member[i]?.faculty}
                  type="text"
                  className="border-2 border-gray-200 pl-4 py-1 rounded-lg w-full"
                  required
                />
              </div>
              <div className="my-4">
                Tel. :{" "}
                <input
                  placeholder="Tel."
                  onChange={(e) => {
                    member[i].tel = e.target.value;
                    setMember(member);
                  }}
                  defaultValue={member[i]?.tel}
                  type="text"
                  className="border-2 border-gray-200 pl-4 py-1 rounded-lg"
                  required
                  maxLength="10"
                />
              </div>
              <div className="my-4">
                Email :{" "}
                <input
                  placeholder="Email"
                  onChange={(e) => {
                    member[i].email = e.target.value;
                    setMember(member);
                  }}
                  defaultValue={member[i]?.email}
                  type="email"
                  className="border-2 border-gray-200 pl-4 py-1 rounded-lg"
                  required
                />
              </div>
            </div>
            {(i == teamMemberCounter -1 && i != 0) ? (
              <div 
                className="absolute top-4 right-4 cursor-pointer"
                onClick={() => handleTeamPeople(-1)}
              >
                <FontAwesomeIcon
                  icon={["fas", "minus-circle"]}
                  className="fa-lg text-red-700"
                />
              </div>
            ) : null}
          </div>
        );
      }

      return (
        <div className="min-h-screen relative" style={{ backgroundColor : "#060d1a" }}>
          <Head>
            <title>Mission Idea Contest Application | UNISEC Thailand</title>
            <link rel="icon" href="/favicon.ico" />
          </Head>
          <Nav user={user} logout={logout} />
          <div className="container mx-auto mt-5 pb-40 px-10 md:p-20 md:pt-10 md:pb-40">
            <form onSubmit={handleMemberList}>
              <div className="md:grid md:grid-cols-2 lg:grid-cols-3 gap-4">
                  {memberForm}
                  <div className="flex flex-col justify-center items-center md:items-start p-16">
                    <div 
                      className="cursor-pointer text-white hover:text-gray-300 duration-300"
                      onClick={() => handleTeamPeople(1)}
                    >
                      <FontAwesomeIcon
                        icon={["fas", "plus-circle"]}
                        className="fa-4x"
                      />
                    </div>
                  </div>
              </div>
              <div className="text-center mt-10">
                <button
                  type="submit"
                  className="px-8 py-2 bg-blue-unisec text-white rounded-full hover:bg-blue-900 mx-2">
                  Next{" >"}
                </button>
              </div>
            </form>
          </div>
          <Footer nonbgcolored />
        </div>
      );
    } else if (step == 2) {
      return (
        <div className="min-h-screen relative" style={{ background : "url('/space-world.png')", backgroundRepeat : 'no-repeat', backgroundPosition : 'center', backgroundSize : 'cover' }}>
          <Head>
            <title>Mission Idea Contest Application | UNISEC Thailand</title>
            <link rel="icon" href="/favicon.ico" />
          </Head>
          <Nav user={user} logout={logout} />
          {/* Not doing conditional rendering on fetch func yet 
              You have to change if condition 
          */}
          <div className="container mx-auto mt-5 pb-40 px-10 md:p-20 md:pt-10 md:pb-40">
            <div className="md:grid md:grid-cols-2 lg:grid-cols-3 gap-4">
              {member.map((element, key) => (
                <div className="relative bg-white px-4 py-8 lg:p-8 rounded-lg shadow" key={key}>
                  {key == 0 ? (
                    <h1 className="font-bold text-xl text-center">Contactable Person</h1>
                  ) : (
                    <h3 className="font-bold text-xl text-center">
                      {key + 1}<sup>{(suffix[key] == null ? "th" : suffix[key])}</sup> Member
                      Information
                    </h3>
                  )}
                  <div className="m-4">
                    <div><img src="/profile_pic.svg" className="w-2/5 mx-auto" alt=""/></div>
                    <div class="my-4"><span class="font-semibold">Name : </span>{element.name}</div>
                    <div class="my-4"><span class="font-semibold">Birth : {" "} </span>
                    {
                      new Date(element.birth).toLocaleDateString('en-EN', {
                        year: 'numeric',
                        month: 'long',
                        day: 'numeric',
                      })
                    }
                    </div>
                    <div class="my-4"><span class="font-semibold">Education : </span>{element.education?.replace("_", " ")}</div>
                    <div class="my-4"><span class="font-semibold">School / University : </span>{element.university}</div>
                    <div class="my-4"><span class="font-semibold">Faculty / Cirriculum : </span>{element.faculty}</div>
                    <div class="my-4"><span class="font-semibold">Tel. : </span>{element.tel}</div>
                    <div class="my-4"><span class="font-semibold">Email : </span>{element.email}</div>
                  </div>
                </div>
              ))}
            </div>
            <div className="text-center mt-10">
              <button
                onClick={() => setStep(1)}
                className="px-8 py-2 bg-blue-unisec text-white rounded-full hover:bg-blue-900 mx-2">
                {"< "}Previous
              </button>
              <button
                onClick={handleCheckSumTeam}
                className="px-8 py-2 bg-blue-unisec text-white rounded-full hover:bg-blue-900 mx-2">
                Next{" >"}
              </button>
            </div>
          </div>
          {/* <div className="container mx-auto mt-5 pb-40 px-10 md:p-20 md:pt-10">
            <div className="my-10">
              <h2 className="font-bold text-2xl">
                Step 3 : Summary Information
              </h2>
              <div className="py-10 lg:pl-10 text-left">
                <div>
                  <div>
                    <h2 className="font-semibold inline">Team Name : </h2>
                    <div className="inline">{teamname}</div>
                  </div>
                  <div>
                    <h2 className="font-semibold inline">Members : </h2>
                    <div>
                      {member.map((element) => (
                        <div key={element.name} className="m-2">
                          <div>
                            <span className="font-semibold">
                              {element.name}
                            </span>
                          </div>
                          <div className="mx-4">
                            <div>
                              <span className="font-semibold">Birth</span> :{" "}
                              {element.birth}
                            </div>
                            <div>
                              <span className="font-semibold">
                                Education Level
                              </span>{" "}
                              : {element.education}
                            </div>
                            <div>
                              <span className="font-semibold">
                                School / University
                              </span>{" "}
                              : {element.university}
                            </div>
                            <div>
                              <span className="font-semibold">
                                Faculty / Cirriculum
                              </span>{" "}
                              : {element.faculty}
                            </div>
                            <div>
                              <span className="font-semibold">Tel.</span> :{" "}
                              {element.tel}
                            </div>
                            <div>
                              <span className="font-semibold">Email</span> :{" "}
                              {element.email}
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
                <div className="text-center mt-16">
                  <button
                    type="button"
                    onClick={() => setStep(1)}
                    className="px-8 py-2 bg-blue-unisec text-white rounded-full hover:bg-blue-900 mx-2">
                    <FontAwesomeIcon
                      icon={["fas", "chevron-left"]}
                      className="w-5"
                    />{" "}
                    Previous
                  </button>
                  <button
                    onClick={handleSubmit}
                    type="submit"
                    className="px-8 py-2 bg-blue-unisec text-white rounded-full hover:bg-blue-900 mx-2">
                    Submit
                  </button>
                </div>
              </div>
            </div>
          </div> */}
          <Footer nonbgcolored />
        </div>
      );
    } else if (step == 3) {
      return (
        <div className="min-h-screen relative" style={{ backgroundColor : "#060d1a", backgroundRepeat : 'no-repeat', backgroundPosition : 'bottom' }}>
          <Head>
            <title>Mission Idea Contest Application | UNISEC Thailand</title>
            <link rel="icon" href="/favicon.ico" />
          </Head>
          <Nav user={user} logout={logout} />
          <div className="container mx-auto mt-5 pb-40 px-10 md:p-20 md:pt-10 md:pb-40 text-white">
            <h1 className="font-bold text-2xl">Abstract Submission</h1>
            <form onSubmit={handleAbstractSubmission}>
              <div className="text-white md:m-8">
                <div className="m-4">
                  <label htmlFor="">Title : </label>
                  <input 
                    type="text"
                    required
                    onChange={(e) => {
                      abstract.title = e.target.value;
                      setAbstract(abstract);
                    }}
                    defaultValue={abstract.title}
                    className="shadow rounded-lg border-transparent flex-1 appearance-none border border-gray-300 py-1 px-4 bg-white text-gray-700 placeholder-gray-400 shadow-sm text-base focus:outline-none focus:ring-2 focus:ring-blue-800 focus:border-transparent" 
                    placeholder="Title"
                  />
                </div>
                <div className="m-4">
                  <label htmlFor="">Primary Point of Contact (POC) &amp; email : </label>
                  <input 
                    type="text"
                    required
                    onChange={(e) => {
                      abstract.poc = e.target.value;
                      setAbstract(abstract);
                    }}
                    defaultValue={abstract.poc}
                    className="shadow rounded-lg border-transparent flex-1 appearance-none border border-gray-300 py-1 px-4 bg-white text-gray-700 placeholder-gray-400 shadow-sm text-base focus:outline-none focus:ring-2 focus:ring-blue-800 focus:border-transparent"
                    placeholder="POC &amp; email"
                  />
                </div>
                <div className="m-4">
                  <label htmlFor="">Co-authors : </label>
                  <input 
                    type="text"
                    required
                    onChange={(e) => {
                      abstract.co_authors = e.target.value;
                      setAbstract(abstract);
                    }}
                    defaultValue={abstract.co_authors}
                    className="shadow rounded-lg border-transparent flex-1 appearance-none border border-gray-300 py-1 px-4 bg-white text-gray-700 placeholder-gray-400 shadow-sm text-base focus:outline-none focus:ring-2 focus:ring-blue-800 focus:border-transparent"
                    placeholder="Co-authors"
                  />
                </div>
                <div className="m-4">
                  <label htmlFor="">Organization : </label>
                  <input 
                    type="text"
                    required
                    onChange={(e) => {
                      abstract.organization = e.target.value;
                      setAbstract(abstract);
                    }}
                    defaultValue={abstract.organization}
                    className="shadow rounded-lg border-transparent flex-1 appearance-none border border-gray-300 py-1 px-4 bg-white text-gray-700 placeholder-gray-400 shadow-sm text-base focus:outline-none focus:ring-2 focus:ring-blue-800 focus:border-transparent"
                    placeholder="Organization"
                  />
                </div>
                <div className="my-4 mx-8">
                  <div>
                    <input 
                      type="radio"
                      value="stu_prize"
                      id="stu_prize"
                      name="sel_prize"
                      onChange={(e) => {
                        abstract.prize = e.target.value;
                        setAbstract(abstract);
                      }}
                      defaultChecked={abstract.prize == "stu_prize" ? true : false}
                      required
                    />{" "}
                    <label htmlFor="stu_prize">We apply for Student Prize.</label>
                  </div>
                  <div>
                    <input 
                      type="radio"
                      value="confidential"
                      id="confidential"
                      name="sel_prize"
                      onChange={(e) => {
                        abstract.prize = e.target.value;
                        setAbstract(abstract);
                      }}
                      defaultChecked={abstract.prize == "confidential" ? true : false}
                      required
                    />{" "}
                    <label htmlFor="confidential">Please keep our idea confidential if we are not selected as finalist/semi-finalist.</label>
                  </div>
                </div>
                <div className="m-4">
                  <label htmlFor="">Mission Objectives (where and why?) </label>
                  <div className="m-4">
                    <textarea
                      onChange={(e) => {
                        abstract.mission_obj = e.target.value;
                        setAbstract(abstract);
                      }}
                      defaultValue={abstract.mission_obj}
                      required
                      className="shadow rounded-lg border-transparent flex-1 appearance-none border border-gray-300 w-full py-2 px-4 bg-white text-gray-700 placeholder-gray-400 shadow-sm text-base focus:outline-none focus:ring-2 focus:ring-blue-800 focus:border-transparent" 
                      rows="5"
                      placeholder="Describe the target planet and/or asteroid to be observed and why you want to go there (scientific objectives). Please include scientific reason why the proposed mission has large impact for gaining new knowledge or solving social problems"
                    ></textarea>
                  </div>
                </div>
                <div className="m-4">
                  <label htmlFor="">Concept of Operations including orbital design</label>
                  <div className="m-4">
                    <textarea
                      className="shadow rounded-lg border-transparent flex-1 appearance-none border border-gray-300 w-full py-2 px-4 bg-white text-gray-700 placeholder-gray-400 shadow-sm text-base focus:outline-none focus:ring-2 focus:ring-blue-800 focus:border-transparent" 
                      rows="5"
                      onChange={(e) => {
                        abstract.operation = e.target.value;
                        setAbstract(abstract);
                      }}
                      defaultValue={abstract.operation}
                      required
                      placeholder="Describe the mission scenario (from launch to realization of the final objectives, etc.) and describe the orbital design to realize the mission. Use diagrams, figures and/or tables if required. Formation flight of multiple explorers are also allowed if the mass restriction (relationship between total mass and V-infinity) is not violated."
                    ></textarea>
                  </div>
                </div>
                <div className="m-4">
                  <label htmlFor="">Key Performance Parameters</label>
                  <div className="m-4">
                    <textarea
                      className="shadow rounded-lg border-transparent flex-1 appearance-none border border-gray-300 w-full py-2 px-4 bg-white text-gray-700 placeholder-gray-400 shadow-sm text-base focus:outline-none focus:ring-2 focus:ring-blue-800 focus:border-transparent" 
                      rows="5"
                      onChange={(e) => {
                        abstract.key_performance = e.target.value;
                        setAbstract(abstract);
                      }}
                      defaultValue={abstract.key_performance}
                      required
                      placeholder="List and explain the required key technologies with several important performance parameters (accuracy, bit rate of data transmission, etc.) which are essential to realize your mission. If the technologies are not realized yet, you should indicate how to realize it and its possibility of R&amp;D success. For example, required technologies include high precision orbit change, deep-space communication, observation sensors, power in deep space, and/or autonomy."
                    ></textarea>
                  </div>
                </div>
                <div className="m-4">
                  <label htmlFor="">Space Segment Description</label>
                  <div className="m-4">
                    <textarea
                      className="shadow rounded-lg border-transparent flex-1 appearance-none border border-gray-300 w-full py-2 px-4 bg-white text-gray-700 placeholder-gray-400 shadow-sm text-base focus:outline-none focus:ring-2 focus:ring-blue-800 focus:border-transparent" 
                      rows="5"
                      onChange={(e) => {
                        abstract.space_segment = e.target.value;
                        setAbstract(abstract);
                      }}
                      defaultValue={abstract.space_segment}
                      required
                      placeholder="Describe the conceptual design for your satellite system or systems. List key specifications (e.g. mass, volume, peak and average power, link budget, attitude control accuracy, delta-V for mid-course maneuver, etc.). Diagrams or simple CAD drawings are encouraged."
                    ></textarea>
                  </div>
                </div>
                <div className="m-4">
                  <label htmlFor="">Additional considerations</label>
                  <div className="m-4">
                    <textarea
                      className="shadow rounded-lg border-transparent flex-1 appearance-none border border-gray-300 w-full py-2 px-4 bg-white text-gray-700 placeholder-gray-400 shadow-sm text-base focus:outline-none focus:ring-2 focus:ring-blue-800 focus:border-transparent" 
                      rows="5"
                      onChange={(e) => {
                        abstract.add_considerations = e.target.value;
                        setAbstract(abstract);
                      }}
                      defaultValue={abstract.add_considerations}
                      required
                      placeholder="If you have some originality of analyzing and/or designing this mission, please describe it It may be considered as “a bonus point.”"
                    ></textarea>
                  </div>
                </div>
                <div className="m-4">
                  <label htmlFor="">References</label>
                  <div className="m-4">
                    <textarea
                      className="shadow rounded-lg border-transparent flex-1 appearance-none border border-gray-300 w-full py-2 px-4 bg-white text-gray-700 placeholder-gray-400 shadow-sm text-base focus:outline-none focus:ring-2 focus:ring-blue-800 focus:border-transparent" 
                      rows="5"
                      onChange={(e) => {
                        abstract.ref = e.target.value;
                        setAbstract(abstract);
                      }}
                      defaultValue={abstract.ref}
                      required
                      placeholder="List any technical references for your idea"
                    ></textarea>
                  </div>
                </div>
              </div>
              <div className="text-center mt-16 text-white">
                <h3 className="font-semibold inline">
                  Video Presentation :{" "}
                </h3>
                <input
                  onChange={(e) =>
                    setPresentationVideo(e.target.files[0])
                  }
                  required={filename?.videopresentation_path == ""}
                  type="file"
                  accept="video/*"
                  placeholder="Fill URL for your video presentation"
                  className="w-full md:w-max shadow rounded-lg border-transparent flex-1 appearance-none border border-gray-300 py-1 px-4 bg-white text-gray-700 placeholder-gray-400 shadow-sm text-sm focus:outline-none focus:ring-2 focus:ring-blue-800 focus:border-transparent"
                />
              </div>
              <div className="text-center mt-16">
                <button
                  type="button"
                  onClick={() => setStep(2)}
                  className="px-8 py-2 bg-blue-unisec cursor-pointer text-white rounded-full hover:bg-blue-900 mx-2">
                  {"< "}Previous
                </button>
                <button
                  className="px-8 py-2 bg-blue-unisec cursor-pointer text-white rounded-full hover:bg-blue-900 mx-2">
                  Next{" >"}
                </button>
              </div>
            </form>
          </div>
          {/* <div className="container mx-auto mt-5 pb-40 px-10 md:p-20 md:pt-10">
            <div>
              <img src="/progressbar3.svg" className="w-100 mx-auto" alt="" />
            </div>
            <div className="my-10">
              <h2 className="font-bold text-2xl">
                Step 3 : Abstract Submission
              </h2>
              <div className="py-20 text-center">
                <form onSubmit={handleAbstractSubmission}>
                  <div className="my-4">
                    <h3 className="font-semibold inline">Abstract : </h3>
                    <div className="text-sm inline">
                      <input
                        onChange={(e) => setAbstractFile(e.target.files[0])}
                        required={filename?.abstract_path == ""}
                        type="file"
                        accept=".pdf"
                        className="bg-white py-2 px-6 border-2 border-gray-300 rounded-full w-full md:w-max"
                      />
                    </div>
                  </div>
                  <div className="my-4">
                    <h3 className="font-semibold inline">
                      Video Presentation :{" "}
                    </h3>
                    <div className="text-sm inline">
                      <input
                        onChange={(e) =>
                          setPresentationVideo(e.target.files[0])
                        }
                        required={filename?.videopresentation_path == ""}
                        type="file"
                        accept="video/*"
                        placeholder="Fill URL for your video presentation"
                        className="bg-white py-2 px-6 border-2 border-gray-300 rounded-full w-full md:w-max"
                      />
                    </div>
                  </div>
                  <div className="text-center mt-16">
                    <button
                      type="button"
                      onClick={() => setStep(1)}
                      className="px-8 py-2 bg-blue-unisec text-white rounded-full hover:bg-blue-900 mx-2">
                      <FontAwesomeIcon
                        icon={["fas", "chevron-left"]}
                        className="w-5"
                      />{" "}
                      Previous
                    </button>
                    <button
                      type="submit"
                      className="px-8 py-2 bg-blue-unisec text-white rounded-full hover:bg-blue-900 mx-2">
                      Next{" "}
                      <FontAwesomeIcon
                        icon={["fas", "chevron-right"]}
                        className="w-5"
                      />
                    </button>
                  </div>
                </form>
              </div>
            </div>
          </div> */}
          <Footer nonbgcolored />
        </div>
      );
    } else if (step == 4) {
      return (
        <div className="min-h-screen relative" style={{ backgroundColor : "#060d1a" }}>
          <Head>
            <title>Mission Idea Contest Application | UNISEC Thailand</title>
            <link rel="icon" href="/favicon.ico" />
          </Head>
          <Nav user={user} logout={logout} />
          <div className="container mx-auto mt-5 pb-40">
            <div className="m-4 bg-white p-8 md:p-16 rounded-lg shadow">
              <h1 className="font-bold text-2xl">Abstract Summary</h1>
              <div className="md:m-8">
                <div className="m-4"><span className="font-bold">Title : </span>{abstract.title}</div>
                <div className="m-4"><span className="font-bold">Primary Point of Contact (POC) &amp; email : </span>{abstract.poc}</div>
                <div className="m-4"><span className="font-bold">Co-authors : </span>{abstract.co_authors}</div>
                <div className="m-4"><span className="font-bold">Organization : </span>{abstract.organization}</div>
                <div className="m-4"><span className="font-bold">Prize : </span>{abstract.prize == "stu_prize" ? "Apply for Student Prize." : "Keep idea confidential if we are not selected as finalist/semi-finalist."}</div>
                <div className="m-4">
                  <div className="font-bold">Mission Objectives (where and why?)</div>
                  <div className="m-4">{abstract.mission_obj}</div>
                </div>
                <div className="m-4">
                  <div className="font-bold">Concept of Operations including orbital design</div>
                  <div className="m-4">{abstract.operation}</div>
                </div>
                <div className="m-4">
                  <div className="font-bold">Key Performance Parameters</div>
                  <div className="m-4">{abstract.key_performance}</div>
                </div>
                <div className="m-4">
                  <div className="font-bold">Space Segment Description</div>
                  <div className="m-4">{abstract.space_segment}</div>
                </div>
                <div className="m-4">
                  <div className="font-bold">Additional considerations</div>
                  <div className="m-4">{abstract.add_considerations}</div>
                </div>
                <div className="m-4">
                  <div className="font-bold">References</div>
                  <div className="m-4">{abstract.ref}</div>
                </div>
                <div>
                  <span className="font-semibold">
                    Video Presentation
                  </span>{" "}
                  :{" "}
                  <a href={videoURL} target="_blank" className="text-blue-400">
                    {filename.videopresentation_path}
                  </a>
                </div>
              </div>
            </div>
            <div className="text-center mt-16">
              <button
                onClick={() => setStep(3)}
                className="px-8 py-2 bg-blue-unisec cursor-pointer text-white rounded-full hover:bg-blue-900 mx-2">
                {"< "}
                Previous
              </button>
              <button
                onClick={() => {
                  setStep(5);
                  firebase
                    .database()
                    .ref("mic_register/" + user.uid + "/abstractConfirm")
                    .set(true);
                }}
                className="px-8 py-2 bg-blue-unisec cursor-pointer text-white rounded-full hover:bg-blue-900 mx-2">
                Next{" >"}
              </button>
            </div>
          </div>
          <Footer nonbgcolored />
        </div>
      );
    } else if (step == 5) {
      return(
        <div className="min-h-screen relative" style={{ background : "url('/space-world.png')", backgroundRepeat : 'no-repeat', backgroundPosition : 'center', backgroundSize : 'cover' }}>
          <Head>
            <title>Mission Idea Contest Application | UNISEC Thailand</title>
            <link rel="icon" href="/favicon.ico" />
          </Head>
          <Nav user={user} logout={logout} />
          <div className="container mx-auto mt-5 p-10 md:p-40 text-white">
            <h1 className="font-bold text-2xl">Find out your Team Name</h1>
            <form onSubmit={handleSubmmitedNamedFormed}>
              <div className="m-8">
                <input
                  onChange={(e) => setTeamname(e.target.value)}
                  type="text" 
                  className="w-full md:w-max mr-4 rounded-lg border-transparent flex-1 appearance-none border border-blue-300 py-2 px-4 bg-white text-black placeholder-gray-400 shadow-sm text-base focus:outline-none focus:ring-2 focus:ring-blue-600 focus:border-transparent"
                  placeholder="Team Name"
                />
                <button className="mt-4 md:mt-0 w-full md:w-max flex-shrink-0 px-4 py-2 text-base font-semibold text-white bg-blue-600 rounded-lg shadow-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 focus:ring-offset-blue-200">That's it</button>
              </div>
            </form>
          </div>
          {/* <div className="container mx-auto mt-5 pb-40 px-10 md:p-20 md:pt-10">
            <div>
              <img src="/progressbar5.svg" className="w-100 mx-auto" alt="" />
            </div>
            <div className="my-20 text-center">
              <h1 className="font-bold text-2xl">
                Thanks for submitted your project !
              </h1>
              <h2 className="font-bold text-xl mt-4">Join our <img src="/discord_logo.svg" className="w-10 inline" alt=""/> Discord !</h2>
              <div className="flex flex-col items-center justify-center mt-4"><img src="/discord_unisec.png" className="shadow-lg" alt=""/></div>
            </div>
          </div> */}
          <Footer nonbgcolored />
        </div>
      );
    } else if (step == 6) {
      return(
        <div className="min-h-screen relative" style={{ background : "url('/space-world.png')", backgroundRepeat : 'no-repeat', backgroundPosition : 'center', backgroundSize : 'cover' }}>
          <Head>
            <title>Mission Idea Contest Application | UNISEC Thailand</title>
            <link rel="icon" href="/favicon.ico" />
          </Head>
          <Nav user={user} logout={logout} />
          <div className="container mx-auto mt-5 p-10 md:p-40 text-white">
            <div className="text-center">
              <h1 className="font-bold text-2xl">
                Thanks for submitted your project !
              </h1>
              <h2 className="font-bold text-xl mt-4">Join our Discord !</h2>
              <div className="flex flex-col items-center justify-center mt-4"><img src="/discord_unisec.png" className="shadow-lg" alt=""/></div>
            </div>
          </div>
          <Footer nonbgcolored />
        </div>
      );
    } else if (step == "discord") {
      return(
        <div className="min-h-screen relative" style={{ background : "url('/space-world.png')", backgroundRepeat : 'no-repeat', backgroundPosition : 'center', backgroundSize : 'cover' }}>
          <Head>
            <title>Mission Idea Contest Application | UNISEC Thailand</title>
            <link rel="icon" href="/favicon.ico" />
          </Head>
          <Nav user={user} logout={logout} />
          <div className="container mx-auto mt-5 p-10 md:p-40 text-white">
            <div className="text-center">
              <h1 className="font-bold text-2xl">
                Find your Teammate
              </h1>
              <h2 className="font-bold text-xl mt-4">Join our Discord !</h2>
              <div className="flex flex-col items-center justify-center mt-4"><img src="/discord_unisec.png" className="shadow-lg" alt=""/></div>
            </div>
          </div>
          <Footer nonbgcolored />
        </div>
      );
    }
  }
}
