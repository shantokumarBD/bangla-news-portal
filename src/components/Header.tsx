import Image from "next/image";
import React from "react";
import logo from "../assets/logo.png";
import NavLink from "./NavLink";
import UserInfo from "./UserInfo";

const Header = () => {
  const date = new Date().toLocaleDateString("bn-BD", {
    dateStyle: "full",
  });
  return (
    <header className="w-full bg-white">
      <div className="flex items-center justify-between max-w-7xl mx-auto px-6 py-5">
        {/* Left - Hamburger Menu & Balance Space */}
        <div className="flex-1 flex items-center justify-start">
          <button className="p-2 -ml-2 rounded-lg hover:bg-gray-100 transition-colors md:hidden">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={1.5}
              stroke="currentColor"
              className="w-6 h-6 text-gray-700"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5"
              />
            </svg>
          </button>
        </div>

        {/* Center - Highly Unique Brand Logo */}
        <div className="flex-[2] md:flex-1 flex items-center justify-center gap-2 md:gap-4">
          <div className="relative group flex-shrink-0">
            <Image
              src={logo}
              alt="Bangla News Logo"
              width={110}
              height={110}
              priority
              className="relative drop-shadow-xl group-hover:scale-105 transition-transform duration-500 w-8 h-8 md:w-[110px] md:h-[110px] object-contain"
            />
          </div>

          <div className="flex flex-col justify-center">
            <h1 className="font-black text-xl md:text-4xl text-gradient tracking-tight leading-none drop-shadow-sm whitespace-nowrap">
              বাংলার সংবাদ
            </h1>
            <div className="flex items-center gap-2 mt-1 md:mt-2 justify-center sm:justify-start">
              <span className="text-[10px] md:text-sm text-gray-500 font-medium whitespace-nowrap">
                {date}
              </span>
            </div>
          </div>
        </div>

        {/* Right - Action Buttons */}
        <div className="flex-1 ">
        <UserInfo></UserInfo>
        </div>
      </div>

      {/* --- Navigation Bar --- */}
      <NavLink />
    </header>
  );
};

export default Header;
