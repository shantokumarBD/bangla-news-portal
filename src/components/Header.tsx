import Image from "next/image";
import React from "react";
import logo from "../assets/logo.png";
import NavLink from "./NavLink";

const Header = () => {
  const date = new Date().toLocaleDateString("bn-BD", {
    dateStyle: "full",
  });
  return (
    <header className="w-full bg-white">
      <div className="flex items-center justify-between max-w-7xl mx-auto px-6 py-5">
        
        {/* Left - Empty Space for Balance */}
        <div className="flex-1 hidden md:block"></div>

        {/* Center - Highly Unique Brand Logo */}
        <div className="flex-1 flex items-center justify-center gap-4">
          <div className="relative group">
            {/* Glowing aura behind logo */}
            <div className="absolute inset-0 bg-primary/20 blur-xl rounded-full group-hover:bg-primary/30 transition-all duration-500"></div>
            <Image 
              src={logo} 
              alt="Bangla News Logo" 
              width={110} 
              height={110} 
              className="relative drop-shadow-xl group-hover:scale-105 transition-transform duration-500" 
            />
          </div>
          
          <div className="flex flex-col justify-center">
            <h1 className="font-black text-4xl text-gradient tracking-tight leading-none drop-shadow-sm whitespace-nowrap">
              বাংলার সংবাদ
            </h1>
            <div className="flex items-center gap-2 mt-2">
              <span className="text-sm text-gray-500 font-medium whitespace-nowrap">
                {date}
              </span>
            </div>
          </div>
        </div>

        {/* Right - Action Buttons */}
        <div className="flex-1 flex items-center justify-end gap-3">
          <button className="px-6 py-2.5 rounded-full border border-gray-200 text-gray-600 font-semibold text-sm hover:border-primary hover:text-primary hover:bg-primary/5 transition-all duration-300">
            সাইন ইন
          </button>
          <button className="px-6 py-2.5 rounded-full bg-gradient-brand text-white font-semibold text-sm hover:opacity-90 transition-all duration-300">
            সাইন আপ
          </button>
        </div>
      </div>

      {/* --- Navigation Bar --- */}
      <NavLink />
    </header>
  );
};

export default Header;
