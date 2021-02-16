import Head from "next/head";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Nav from "../../_components/Nav";
import Footer from "../../_components/Footer";
import { useEffect, useState } from "react";

import firebase from "firebase/app";
import "firebase/database";
import "firebase/storage";
import startFirebase from "../../../src/services/startFirebase";

startFirebase();

import { googleSigin } from "../../../src/services/siginProvider";

const Backend = () => {

    const [user, setUser] = useState(null)
    const [teams, setTeams] = useState(null)
    const [regUser, setRegUser] = useState(null)

    useEffect(() => {
        firebase.auth().onAuthStateChanged(user => {
            if (user) {
                firebase.database().ref("users/" + user.uid).once("value").then(snap => {
                    if (!snap.val()) {
                        firebase.database().ref("users/" + user.uid).set({
                            name: user.displayName,
                            email: user.email
                        });
                        logout();
                    } else {
                        if (snap.val().role === "admin") {
                            setUser({
                                uid: user.uid,
                                name: user.displayName,
                                email: user.email
                            });
                        } else {
                            logout();
                        }
                    }
                })
            } else {
                setUser([]);
            }
        })
        firebase.database().ref('mic_register').on("value", snap => {
            if (snap.val()) {
                setTeams(snap.val());
            }
        })
        firebase.database().ref('users').on("value", snap => {
            if (snap.val()) {
                setRegUser(snap.val());
            }
        })
    }, [])

    const logout = () => {
        firebase.auth().signOut().then(function() {
                console.log("Logged Out!")
            }).catch(function(error) {
                console.log(error)
            });
    }

    // console.log((typeof Object.values(teams)[1].member !== "undefined") ? "true" : "false")
    
    if (user === null) {
        return(
            <div className="h-screen flex flex-col justify-center items-center">
                <div className="lds-ring w-16 h-16">
                <div></div>
                <div></div>
                <div></div>
                <div></div>
                </div>
            </div>
        )
    } else if (user.length == 0) {
        return(
            <div className="min-h-screen relative">
                <Head>
                <title>Mission Idea Contest Application | UNISEC Thailand</title>
                <link rel="icon" href="/favicon.ico" />
                </Head>
                <Nav />
                <div className="container mx-auto pt-40">
                    <div className=" mt-5 block">
                        <div className="px-10 md:px-0 p-16">
                            <h1 className="text-4xl font-bold text-center">
                                Backend Login
                            </h1>
                            <h2 className="text-center my-10 text-2xl">Login with</h2>
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
                </div>
                <Footer />
            </div>
        )
    } else if (user.name !== null) {
        return(
        <div className="min-h-screen relative">
            <Head>
                <title>Backend : Mission Idea Contest | UNISEC Thailand</title>
                <link rel="icon" href="/favicon.ico" />
            </Head>
            <Nav />
            <div className="container mx-auto pt-40 grid grid-cols-split-20-80">
                <div>
                    <div>
                        <div className="p-10 text-left mb-4 bg-blue-900 text-white">
                            <h2 className="font-semibold text-xl">Total Teams</h2>
                            <div><span className="font-medium text-2xl">{teams ? Object.values(teams).length : "0"}</span> Teams</div>
                        </div>
                        <div className="p-10 text-left mb-4 bg-green-900 text-white">
                            <h2 className="font-semibold text-xl">Total Users</h2>
                            <div><span className="font-medium text-2xl">{regUser ? Object.values(regUser).length : "0"}</span> Users</div>
                        </div>
                        <div 
                            className="py-4 text-left mb-4 bg-gray-800 border-2 border-gray-800 text-white hover:bg-transparent hover:text-black cursor-pointer duration-300"
                            onClick={logout}
                        >
                            <h2 className="font-semibold text-xl text-center">Logout</h2>
                        </div>
                    </div>
                </div>
                <div className="px-20">
                    <h2 className="font-semibold text-2xl">Teams</h2>
                    <div>
                        <table className="w-full mt-4">
                            <thead>
                                <tr className="bg-gray-900 text-white">
                                    <td className="px-4 py-2 text-center">#</td>
                                    <td className="px-4 py-2">Team Name</td>
                                    <td className="px-4 py-2 text-center">Filled Member</td>
                                    <td className="px-4 py-2 text-center">Submit Abstract</td>
                                    <td className="px-4 py-2 text-center">Status</td>
                                    <td className="px-4 py-2 text-center">Actions</td>
                                </tr>
                            </thead>
                            <tbody>
                                {(teams) ? Object.values(teams).map((element, key) => (
                                    <tr key={key}>
                                        <td className="px-4 py-2 text-center">{key +1}</td>
                                        <td className="px-4 py-2">{element.teamname}</td>
                                        <td className="px-4 py-2 text-center">{(typeof element.member !== "undefined") ? "✓" : "✕"}</td>
                                        <td className="px-4 py-2 text-center">{(typeof element.files !== "undefined") ? "✓" : "✕"}</td>
                                        <td className="px-4 py-2 text-center">{element.submit ? "Submitted" : "Not Submitted"}</td>
                                        <td className="px-4 py-2 text-center"><button className="bg-blue-900 text-white py-2 px-6 cursor-pointer border-2 border-blue-900 text-sm rounded-full hover:bg-transparent hover:text-blue-900">Detail</button></td>
                                    </tr>
                                )) : ""}
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
            <Footer />
        </div>
    )
    }
}

export default Backend;