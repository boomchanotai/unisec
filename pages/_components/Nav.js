import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

export default () => (
  <nav className="absolute w-full grid grid-cols-header-mobile md:grid-cols-2">
    <div className="px-10 lg:px-20 py-5">
      <a href="/">
        <img
          src="/Logo.png"
          className="max-w-100 max-h-20 cursor-pointer"
          alt="Unisec-Logo"
        />
      </a>
    </div>
    <div className="px-10 lg:px-20 py-5 hidden justify-end items-center">
      {/* hidden md:flex */}
      <ul className="flex justify-end items-center">
        <a href="#" className="mx-5">
          <li>Sign up</li>
        </a>
        <a
          href="#"
          className="mx-5 bg-black text-white border-black border-2 px-10 py-2 rounded-full duration-500 hover:bg-white hover:text-black">
          <li>Sign in</li>
        </a>
      </ul>
    </div>
    <div className="hidden justify-center items-center">
      {/* flex md:hidden */}
      <FontAwesomeIcon icon={["fas", "bars"]} className="w-5 m-2" />
    </div>
  </nav>
);
