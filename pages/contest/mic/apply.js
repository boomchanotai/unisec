import Head from "next/head";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Nav from "../../_components/Nav";
import { useEffect, useState } from "react";

import firebase from "firebase/app";
import "firebase/database";
import "firebase/storage";
import startFirebase from "../../../src/services/startFirebase";

startFirebase();

import { googleSigin } from "../../../src/services/siginProvider";

const Footer = (props) => (
  <div className="w-full bottom-0 bg-blue-unisec text-white">
    <div className="container mx-auto px-20 py-10">
      CopyRight © UNISEC Thailand, All Rights Reserved.
    </div>
  </div>
);

export default function Home({ isLoggedIn }) {
  const [teamname, setTeamname] = useState("");
  const [user, setUser] = useState(null);
  const [teamMemberCounter, setTeamMemberCounter] = useState(1);
  const [step, setStep] = useState(0);
  const [member, setMember] = useState([]);
  const [abstractFile, setAbstractFile] = useState(null);
  const [presentationVideo, setPresentationVideo] = useState(null);
  const [filename, setFilename] = useState([""]);
  const suffix = ["st", "nd", "rd", "th"];
  const userBlueprint = {
    name: null,
    birth: null,
    gender: null,
    education: null,
    university: null,
    faculty: null,
    tel: null,
    email: null,
    facebook: null,
    address: null,
    emergency: {
      name: null,
      tel: null,
    },
  };
  const fetchData = (isGoToStep) => {
    firebase.auth().onAuthStateChanged(function (user) {
      if (user) {
        setUser({
          uid: user.uid,
          name: user.displayName,
        });

        firebase
          .database()
          .ref("mic_register/" + user.uid)
          .once("value")
          .then((snap) => {
            if (snap.val()) {
              let register_info = snap.val();
              console.log("register_info", register_info);
              if (register_info.submit) {
                setTeamname(register_info.teamname);
                setMember(register_info.member);
                setTeamMemberCounter(register_info.member.length);
                setFilename(register_info.files);
                if (isGoToStep) setStep(4);
              } else if (
                register_info.teamname &&
                register_info.member &&
                register_info.files?.abstract_path
              ) {
                setTeamname(register_info.teamname);
                setMember(register_info.member);
                setTeamMemberCounter(register_info.member.length);
                setFilename(register_info.files);
                if (isGoToStep) setStep(3);
              } else if (register_info.teamname && register_info.member) {
                setTeamname(register_info.teamname);
                if (isGoToStep) setStep(2);
                setMember(register_info.member);
                setTeamMemberCounter(register_info.member.length);
              } else if (
                register_info.teamname &&
                typeof register_info.member === "undefined"
              ) {
                setTeamname(register_info.teamname);
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

  const handleSubmmitedNamedFormed = (e) => {
    e.preventDefault();
    const uuid = user.uid;
    firebase
      .database()
      .ref("mic_register/" + uuid)
      .set({
        teamname,
        member,
      });
    setStep(1);
  };

  useEffect(() => {
    if (parseInt(teamMemberCounter) > member.length) {
      setMember([...member, userBlueprint]);
    } else {
      setMember(member.slice(0, member.length - 1));
    }
  }, [teamMemberCounter]);

  const handleTeamPeople = async (e) => {
    parseInt(e.target.value) >= 1
      ? setTeamMemberCounter(e.target.value)
      : setTeamMemberCounter(1);
    await setMember(member);
  };

  const handleMemberList = (e) => {
    e.preventDefault();
    firebase
      .database()
      .ref("mic_register/" + user.uid + "/member")
      .set(member);
    setStep(2);
  };

  const handleAbstractSubmission = (e) => {
    e.preventDefault();
    console.log(abstractFile);
    if (abstractFile != null && presentationVideo != null) {
      firebase
        .storage()
        .ref("mic_register/" + user.uid + "/Abstract_" + teamname)
        .put(abstractFile);
      firebase
        .storage()
        .ref("mic_register/" + user.uid + "/VideoPresentation_" + teamname)
        .put(presentationVideo);

      firebase
        .database()
        .ref("mic_register/" + user.uid + "/files/abstract_path")
        .set(abstractFile.name);
      firebase
        .database()
        .ref("mic_register/" + user.uid + "/files/videopresentation_path")
        .set(presentationVideo.name);
      setStep(3);
      console.log("Abstract Submission !");
    } else {
      setStep(3);
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

  if (user === null) {
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
      <div className="h-screen">
        <Head>
          <title>Mission Idea Contest Application | UNISEC Thailand</title>
          <link rel="icon" href="/favicon.ico" />
        </Head>
        <Nav />
        <div>
          <div className="container mx-auto mt-5 pt-40 pb-10">
            <h1 className="text-4xl font-bold text-center mx-10 md:mx-0">
              Applicant Login
            </h1>
          </div>
          <div className="container mx-auto pb-20">
            <h2 className="text-center m-10  text-2xl">Login with</h2>
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
        </div>
        <Footer />
      </div>
    );
  } else if (user.name !== null) {
    if (step == 0) {
      return (
        <div className="h-screen">
          <Head>
            <title>Mission Idea Contest Application | UNISEC Thailand</title>
            <link rel="icon" href="/favicon.ico" />
          </Head>
          <Nav />
          <div className="container mx-auto mt-5 pt-40 pb-20">
            <div>
              <img src="/progressbar1.svg" className="w-100 mx-auto" alt="" />
            </div>
            <div className="my-10">
              <h2 className="font-bold text-2xl">Step 1 : Team Name</h2>
              <div className="py-40 flex flex-col items-center">
                <form
                  className="flex w-full max-w-sm space-x-3"
                  onSubmit={handleSubmmitedNamedFormed}>
                  <div className=" relative ">
                    <input
                      onChange={(e) => setTeamname(e.target.value)}
                      value={teamname}
                      type="text"
                      className=" rounded-lg border-transparent flex-1 appearance-none border border-gray-300 w-full py-2 px-4 bg-white text-gray-700 placeholder-gray-400 shadow-sm text-base focus:outline-none focus:ring-2 focus:ring-purple-600 focus:border-transparent"
                      placeholder="Your team name"
                      required
                    />
                  </div>
                  <button
                    className="flex-shrink-0 px-4 py-2 text-base font-semibold text-white bg-purple-600 rounded-lg shadow-md hover:bg-purple-700 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:ring-offset-2 focus:ring-offset-purple-200"
                    type="submit">
                    <FontAwesomeIcon icon={["fas", "check"]} className="w-5" />
                  </button>
                </form>
              </div>
            </div>
          </div>
          <Footer />
        </div>
      );
    } else if (step == 1) {
      const memberForm = [];
      for (let i = 0; i < teamMemberCounter; i++) {
        memberForm.push(
          <div key={i} className="m-4">
            <h3 className="font-semibold text-lg">
              {i + 1 + (suffix[i] == null ? "th" : suffix[i])} Member
              Information
            </h3>
            <div className="m-4">
              <div className="my-2">
                Name :{" "}
                <input
                  onChange={(e) => {
                    let _member = member;
                    _member[i].name = e.target.value;
                    setMember(member);
                  }}
                  defaultValue={member[i]?.name}
                  type="text"
                  placeholder="Name"
                  className="border-2 border-gray-200 pl-4 rounded-lg"
                  required
                />
              </div>
              <div className="my-2">
                Birth :{" "}
                <input
                  onChange={(e) => {
                    member[i].birth = e.target.value;
                    setMember(member);
                  }}
                  defaultValue={member[i]?.birth}
                  type="date"
                  className="border-2 border-gray-200 pl-4 rounded-lg"
                  required
                />
              </div>
              <div className="my-2">
                Gender : {console.log("member[i]?.gender", member[i]?.gender)}
                <select
                  className="border-2 border-gray-200 pl-4 rounded-lg"
                  required
                  defaultValue={member[i]?.gender}
                  onChange={(e) => {
                    member[i].gender = e.target.value;
                    setMember(member);
                  }}>
                  <option selected defaultValue="">
                    {" "}
                    -- select an gender --{" "}
                  </option>
                  <option selected={member[i]?.gender === "Male"} value="Male">
                    Male
                  </option>
                  <option
                    selected={member[i]?.gender === "Female"}
                    value="Female">
                    Female
                  </option>
                  <option
                    selected={member[i]?.gender === "LGBTQ+"}
                    value="LGBTQ+">
                    LGBTQ+
                  </option>
                </select>
              </div>
              <div className="my-2">
                Education :{" "}
                <select
                  className="border-2 border-gray-200 pl-4 rounded-lg"
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
                    selected={member[i]?.education === "Grade_10"}
                    value="Grade_10">
                    Grade 10
                  </option>
                  <option
                    selected={member[i]?.education === "Grade_11"}
                    value="Grade_11">
                    Grade 11
                  </option>
                  <option
                    selected={member[i]?.education === "Grade_12"}
                    value="Grade_12">
                    Grade 12
                  </option>
                </select>
              </div>
              <div className="my-2">
                School / University :{" "}
                <input
                  onChange={(e) => {
                    member[i].university = e.target.value;
                    setMember(member);
                  }}
                  defaultValue={member[i]?.university}
                  type="text"
                  className="border-2 border-gray-200 pl-4 rounded-lg"
                  required
                />
              </div>
              <div className="my-2">
                Faculty / Cirriculum :{" "}
                <input
                  onChange={(e) => {
                    member[i].faculty = e.target.value;
                    setMember(member);
                  }}
                  defaultValue={member[i]?.faculty}
                  type="text"
                  className="border-2 border-gray-200 pl-4 rounded-lg"
                  required
                />
              </div>
              <div className="my-2">Address : </div>
              <div>
                <textarea
                  onChange={(e) => {
                    member[i].address = e.target.value;
                    setMember(member);
                  }}
                  defaultValue={member[i]?.address}
                  rows="3"
                  className="border-2 border-gray-200 p-4 rounded-lg w-full"
                  required></textarea>
              </div>
              <div className="my-2">
                Tel. :{" "}
                <input
                  onChange={(e) => {
                    member[i].tel = e.target.value;
                    setMember(member);
                  }}
                  defaultValue={member[i]?.tel}
                  type="text"
                  className="border-2 border-gray-200 pl-4 rounded-lg"
                  required
                />
              </div>
              <div className="my-2">
                Email :{" "}
                <input
                  onChange={(e) => {
                    member[i].email = e.target.value;
                    setMember(member);
                  }}
                  defaultValue={member[i]?.email}
                  type="text"
                  className="border-2 border-gray-200 pl-4 rounded-lg"
                  required
                />
              </div>
              <div className="my-2">
                Facebook :{" "}
                <input
                  onChange={(e) => {
                    member[i].facebook = e.target.value;
                    setMember(member);
                  }}
                  defaultValue={member[i]?.facebook}
                  type="text"
                  className="border-2 border-gray-200 pl-4 rounded-lg"
                  required
                />
              </div>
              <div className="my-2">
                <h4 className="font-bold">Emergency Contact</h4>
                <div className="m-2">
                  <div className="my-2">
                    Name :{" "}
                    <input
                      onChange={(e) => {
                        member[i].emergency.name = e.target.value;
                        setMember(member);
                      }}
                      defaultValue={member[i]?.emergency.name}
                      type="text"
                      className="border-2 border-gray-200 pl-4 rounded-lg"
                      required
                    />
                  </div>
                  <div className="my-2">
                    Tel. :{" "}
                    <input
                      onChange={(e) => {
                        member[i].emergency.tel = e.target.value;
                        setMember(member);
                      }}
                      defaultValue={member[i]?.emergency.tel}
                      type="text"
                      className="border-2 border-gray-200 pl-4 rounded-lg"
                      required
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>
        );
      }

      return (
        <div className="h-screen">
          <Head>
            <title>Mission Idea Contest Application | UNISEC Thailand</title>
            <link rel="icon" href="/favicon.ico" />
          </Head>
          <Nav />
          <div className="container mx-auto mt-5 pt-40 pb-20">
            <div>
              <img src="/progressbar2.svg" className="w-100 mx-auto" alt="" />
            </div>
            <div className="my-10">
              <h2 className="font-bold text-2xl">Step 2 : Members</h2>
              <div className="p-10">
                <div>
                  Team people{" "}
                  <input
                    type="number"
                    placeholder="1"
                    value={teamMemberCounter}
                    onChange={handleTeamPeople}
                    className="border-2 border-gray-200 rounded-lg w-16 pl-4"
                  />{" "}
                  member{teamMemberCounter <= 1 ? "" : "s"}
                </div>
                <form onSubmit={handleMemberList}>
                  {memberForm}
                  <div className="text-center">
                    <button
                      type="button"
                      onClick={() => setStep(0)}
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
          </div>
          <Footer />
        </div>
      );
    } else if (step == 2) {
      return (
        <div className="min-h-screen">
          <Head>
            <title>Mission Idea Contest Application | UNISEC Thailand</title>
            <link rel="icon" href="/favicon.ico" />
          </Head>
          <Nav />
          <div className="container mx-auto mt-5 pt-40 pb-20">
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
                        className="bg-white py-2 px-6 border-2 border-gray-300 rounded-full"
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
                        className="bg-white py-2 px-6 border-2 border-gray-300 rounded-full w-96"
                      />
                    </div>
                    <div className="text-gray-400 text-sm mt-2">
                      * Upload your video on youtube or google drive and put
                      your URL here.
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
          </div>
          <Footer />
        </div>
      );
    } else if (step == 3) {
      return (
        <div className="min-h-screen">
          <Head>
            <title>Mission Idea Contest Application | UNISEC Thailand</title>
            <link rel="icon" href="/favicon.ico" />
          </Head>
          <Nav />
          <div className="container mx-auto mt-5 pt-40 pb-20">
            <div>
              <img src="/progressbar4.svg" className="w-100 mx-auto" alt="" />
            </div>
            <div className="my-10">
              <h2 className="font-bold text-2xl">
                Step 4 : Summary Information
              </h2>
              <div className="py-10 pl-10 text-left">
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
                              <span className="font-semibold">Gender</span> :{" "}
                              {element.gender}
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
                              <span className="font-semibold">Address</span> :{" "}
                              {element.address}
                            </div>
                            <div>
                              <span className="font-semibold">Tel.</span> :{" "}
                              {element.tel}
                            </div>
                            <div>
                              <span className="font-semibold">Email</span> :{" "}
                              {element.email}
                            </div>
                            <div>
                              <span className="font-semibold">Facebook</span> :{" "}
                              {element.facebook}
                            </div>
                            <div>
                              <span className="font-semibold">Address</span> :{" "}
                              {element.address}
                            </div>
                            <h2 className="font-semibold">Emergency :</h2>
                            <div className="mx-4">
                              <div>
                                <span className="font-semibold">Name</span> :{" "}
                                {element.emergency.name}
                              </div>
                              <div>
                                <span className="font-semibold">Tel.</span> :{" "}
                                {element.emergency.tel}
                              </div>
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                  <div>
                    <h2 className="font-semibold">Files :</h2>
                    <div className="mx-4">
                      <div>
                        <span className="font-semibold">Abstract Document</span>{" "}
                        : {filename.abstract_path}
                      </div>
                      <div>
                        <span className="font-semibold">
                          Video Presentation
                        </span>{" "}
                        : {filename.videopresentation_path}
                      </div>
                    </div>
                  </div>
                </div>
                <div className="text-center mt-16">
                  <button
                    type="button"
                    onClick={() => setStep(2)}
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
          </div>
          <Footer />
        </div>
      );
    } else if (step == 4) {
      return (
        <div className="h-screen">
          <Head>
            <title>Mission Idea Contest Application | UNISEC Thailand</title>
            <link rel="icon" href="/favicon.ico" />
          </Head>
          <Nav />
          <div className="container mx-auto mt-5 pt-40 pb-20">
            <div>
              <img src="/progressbar5.svg" className="w-100 mx-auto" alt="" />
            </div>
            <div className="my-20 text-center">
              <h1 className="font-bold text-2xl">
                Thanks for submitted your project !
              </h1>
              <h2 className="font-bold text-xl mt-4">Good Luck !</h2>
            </div>
          </div>
          <div className="absolute bottom-0 w-full bg-blue-unisec text-white">
            <div className="container mx-auto px-20 py-10">
              CopyRight © UNISEC Thailand, All Rights Reserved.
            </div>
          </div>
        </div>
      );
    }
  }
}
