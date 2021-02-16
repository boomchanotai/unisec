import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useState } from 'react'

export default function Navbar(props){

  return(
    <nav className={`${props.position == "fixed" ? "fixed" : "absolute"} w-full grid grid-cols-header-mobile md:grid-cols-2 z-40 duration-300`} style={{ backgroundColor : props.coloredBG ? "rgba(31, 38, 56, 0.8)" : "transparent" }}>
      <div className="px-10 lg:px-20 py-5">
        <a href="/">
          <img
            src="/Logo.png"
            className="max-w-100 max-h-20 cursor-pointer"
            alt="Unisec-Logo"
          />
        </a>
      </div>
      {props.mic ? (
        <div className="px-10 lg:px-20 py-5 hidden lg:flex justify-end items-center">
          <ul className="flex justify-end items-center text-white">
            <li className="mx-5 cursor-pointer" onClick={props.about}>About</li>
            <li className="mx-5 cursor-pointer" onClick={props.timeline}>Timeline</li>
            <li className="mx-5 cursor-pointer" onClick={props.faq}>FAQ</li>
            <a
              href="/contest/mic/apply"
              className="mx-5 bg-white text-black border-white border-2 px-10 py-2 rounded-full duration-500 hover:bg-transparent hover:text-white">
              <li>Apply Now</li>
            </a>
          </ul>
        </div>
      ) : null}
      <div className="hidden justify-center items-center">
        {/* flex md:hidden */}
        <FontAwesomeIcon icon={["fas", "bars"]} className="w-5 m-2" />
      </div>
    </nav>
  );
};
