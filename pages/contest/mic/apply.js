import Head from "next/head";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Nav from "../../_components/Nav";
import { useEffect, useState } from "react";

import firebase from "firebase/app";
import "firebase/database";
import startFirebase from "../../../src/services/startFirebase";

startFirebase();

import { googleSigin } from "../../../src/services/siginProvider";

export default function Home({ isLoggedIn }) {
  const [teamname, setTeamname] = useState("");
  const [user, setUser] = useState(null);
  const [teamMemberCounter, setTeamMemberCounter] = useState(1);
  const [step, setStep] = useState(0);
  const [member, setMember] = useState([]);

  const suffix = ["st", "nd", "rd", "th"];
  const userBlueprint = {
    name: "",
    birth: "",
    gender: "",
    education: "",
    university: "",
    faculty: "",
    tel: "",
    email: "",
    facebook: "",
    address: "",
    emergency: {
      name: "",
      tel: "",
    },
  };

  useEffect(() => {
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
              if (register_info.teamname) {
                setStep(1);
                member.push(userBlueprint);
                setMember(member);
              }
            }
          });
      } else {
        setUser([]);
      }
    });
  }, []);

  const handleSubmmitedNamedFormed = (e) => {
    e.preventDefault();
    const uuid = user.uid;
    firebase
      .database()
      .ref("mic_register/" + uuid)
      .set({
        teamname,
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
    console.log(member);
    firebase
      .database()
      .ref("mic_register/" + user.uid)
      .set({
        teamname: "Boom",
        member: member,
      });
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
          <div className="container mx-auto mt-5 pt-40 pb-20">
            <h1 className="text-4xl font-bold text-center mx-10 md:mx-0">
              Applicant Login
            </h1>
          </div>
          <div className="container mx-auto py-20">
            <h2 className="text-center m-10 font-bold text-2xl">Login as</h2>
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
              <div className="mx-5">
                <img
                  className="w-16 cursor-pointer"
                  src="/iconfinder_1_Facebook_colored_svg_copy_5296499.svg"
                  alt=""
                />
              </div>
            </div>
          </div>
        </div>
        <div className="absolute bottom-0 w-full bg-blue-unisec text-white">
          <div className="container mx-auto px-20 py-10">
            CopyRight © UNISEC Thailand, All Rights Reserved.
          </div>
        </div>
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
              <img src="/progressbar.svg" className="w-100 mx-auto" alt="" />
            </div>
            <div className="my-10">
              <h2 className="font-bold text-2xl">Step 1 : Named your team</h2>
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
          <div className="absolute bottom-0 w-full bg-blue-unisec text-white">
            <div className="container mx-auto px-20 py-10">
              CopyRight © UNISEC Thailand, All Rights Reserved.
            </div>
          </div>
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
                    member[i].name = e.target.value;
                    setMember(member);
                  }}
                  type="text"
                  placeholder="Name"
                  className="border-2 border-gray-200 pl-4 rounded-lg"
                />
              </div>
              <div className="my-2">
                Birth :{" "}
                <input
                  onChange={(e) => {
                    member[i].birth = e.target.value;
                    setMember(member);
                  }}
                  type="date"
                  className="border-2 border-gray-200 pl-4 rounded-lg"
                />
              </div>
              <div className="my-2">
                Gender :{" "}
                <select
                  className="border-2 border-gray-200 pl-4 rounded-lg"
                  onChange={(e) => {
                    member[i].gender = e.target.value;
                    setMember(member);
                  }}>
                  <option value="Male">Male</option>
                  <option value="Female">Female</option>
                  <option value="LGBTQ+">LGBTQ+</option>
                </select>
              </div>
              <div className="my-2">
                Education :{" "}
                <select
                  className="border-2 border-gray-200 pl-4 rounded-lg w-36"
                  onChange={(e) => {
                    member[i].education = e.target.value;
                    setMember(member);
                  }}>
                  <option value="Grade 10">Grade 10</option>
                  <option value="Grade 11">Grade 11</option>
                  <option value="Grade 12">Grade 12</option>
                </select>
              </div>
              <div className="my-2">
                School / University :{" "}
                <input
                  onChange={(e) => {
                    member[i].university = e.target.value;
                    setMember(member);
                  }}
                  type="text"
                  className="border-2 border-gray-200 pl-4 rounded-lg"
                />
              </div>
              <div className="my-2">
                Faculty / Cirriculum :{" "}
                <input
                  onChange={(e) => {
                    member[i].faculty = e.target.value;
                    setMember(member);
                  }}
                  type="text"
                  className="border-2 border-gray-200 pl-4 rounded-lg"
                />
              </div>
              <div className="my-2">Address : </div>
              <div>
                <textarea
                  onChange={(e) => {
                    member[i].address = e.target.value;
                    setMember(member);
                  }}
                  rows="3"
                  className="border-2 border-gray-200 p-4 rounded-lg w-full"></textarea>
              </div>
              <div className="my-2">
                Tel. :{" "}
                <input
                  onChange={(e) => {
                    member[i].tel = e.target.value;
                    setMember(member);
                  }}
                  type="text"
                  className="border-2 border-gray-200 pl-4 rounded-lg"
                />
              </div>
              <div className="my-2">
                Email :{" "}
                <input
                  onChange={(e) => {
                    member[i].email = e.target.value;
                    setMember(member);
                  }}
                  type="text"
                  className="border-2 border-gray-200 pl-4 rounded-lg"
                />
              </div>
              <div className="my-2">
                Facebook :{" "}
                <input
                  onChange={(e) => {
                    member[i].facebook = e.target.value;
                    setMember(member);
                  }}
                  type="text"
                  className="border-2 border-gray-200 pl-4 rounded-lg"
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
                      type="text"
                      className="border-2 border-gray-200 pl-4 rounded-lg"
                    />
                  </div>
                  <div className="my-2">
                    Tel. :{" "}
                    <input
                      onChange={(e) => {
                        member[i].emergency.tel = e.target.value;
                        setMember(member);
                      }}
                      type="text"
                      className="border-2 border-gray-200 pl-4 rounded-lg"
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
              <img src="/progressbar.svg" className="w-100 mx-auto" alt="" />
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
                {memberForm}
              </div>
              <div className="text-center">
                <button
                  className="px-8 py-2 bg-blue-unisec text-white rounded-full hover:bg-blue-900"
                  onClick={handleMemberList}>
                  Next{" "}
                  <FontAwesomeIcon
                    icon={["fas", "chevron-right"]}
                    className="w-5"
                  />
                </button>
              </div>
            </div>
          </div>
          <div className="w-full bg-blue-unisec text-white">
            <div className="container mx-auto px-20 py-10">
              CopyRight © UNISEC Thailand, All Rights Reserved.
            </div>
          </div>
        </div>
      );
    }
  }
}
