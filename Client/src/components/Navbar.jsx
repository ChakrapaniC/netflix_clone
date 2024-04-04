import React, { useState, useCallback } from "react";
import logo from "../assets/images/logo.png";
import NavbarItems from "./NavbarItems";
import { FiChevronDown } from "react-icons/fi";
import { BsSearch, BsBell } from "react-icons/bs";
import MobileMenu from "./MobileMenu";
import profileimg from "../assets/images/default-blue.png"

const Navbar = () => {
  const NavItems = [
    "Home",
    "Series",
    "Films",
    "New & Popular",
    "My List",
    "Browse by Language",
  ];
  const [showMobileMenu, setshowMobileMenu] = useState(false);

  const toggleMobileMenu = useCallback(() => {
    setshowMobileMenu((current) => !current);
  }, []);
  return (
    <>
      <nav className="fixed w-full z-50">
        <div className="flex flex-row items-center px-4 py-6 md:px-14 bg-zinc-900 bg-opacity-90 transition duration-500">
          <img src={logo} alt="logo" className="h-4 lg:h-8"></img>
          <div className="flex-row gap-6 hidden lg:flex ml-8">
            {NavItems.map((item, index) => (
              <NavbarItems key={index} label={item} />
            ))}
          </div>
          <div
            onClick={toggleMobileMenu}
            className="lg:hidden flex flex-row gap-2 ml-8 cursor-pointer relative items-center"
          >
            <p className="text-white text-sm">Browse</p>
            <FiChevronDown className="text-white transition" />
            <MobileMenu visible={showMobileMenu} />
          </div>

          <div className="flex flex-row ml-auto gap-7 cursor-pointer">
            <div className="text-gray-200 hover:text-gray-300 cursor-pointer transition">
              <BsSearch />
            </div>
            <div className="text-gray-200 hover:text-gray-300 cursor-pointer transition">
              <BsBell />
            </div>
            <div className="flex flex-row items-center gap-2 cursor-pointer relative">
              <div className="w-6 h-6 lg:w-10 lg:h-10 rounded-md cursor-pointer overflow-hidden">
                <img src={profileimg} alt="profile image"></img>
              </div>
            </div>
          </div>
        </div>
      </nav>
    </>
  );
};

export default Navbar;
