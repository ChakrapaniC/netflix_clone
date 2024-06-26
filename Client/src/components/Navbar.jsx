import  { useEffect,useState, useCallback } from "react";
import logo from "../assets/images/logo.png";
import NavbarItems from "./NavbarItems";
import { FiChevronDown } from "react-icons/fi";
import { BsSearch, BsBell } from "react-icons/bs";
import MobileMenu from "./MobileMenu";
import profileimg from "../assets/images/default-blue.png"
import AccountMenu from "./AccountMenu";


const TOP_OFFSET = 60;


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
  const [showAccountMenu, setshowAccountMenu] = useState(false);
  const [showBackground , setshowBackground] = useState(false);
  
  const toggleMobileMenu = useCallback(() => {
    setshowMobileMenu((current) => !current);
  }, []);
  const togglAccountMenu = useCallback(() => {
    setshowAccountMenu((current) => !current);
  }, []);
  
  useEffect(() => {
    
    const handleScroll = () => {
      if (window.scrollY >= TOP_OFFSET) {
        setshowBackground(true)
      } else {
        setshowBackground(false)
      }
    }

    window.addEventListener('scroll', handleScroll);

    return () => {
      window.removeEventListener('scroll', handleScroll);
    }
  }, []);

  return (
    <>
      <nav className="fixed w-full z-50">
        <div className={`flex flex-row items-center px-4 py-6 md:px-14 transition duration-500  ${showBackground ? 'bg-zinc-900 bg-opacity-90' : ''}`}>
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
            <FiChevronDown className={`text-white transition ${showMobileMenu ? 'rotate-180' : 'rotate-0'}`}/>
            <MobileMenu visible={showMobileMenu} />
          </div>

          <div className="flex flex-row ml-auto gap-7 cursor-pointer items-center">
            <div className="text-gray-200 hover:text-gray-400 cursor-pointer transition">
              <BsSearch />
            </div>
            <div className="text-gray-200 hover:text-gray-400 cursor-pointer transition">
              <BsBell />
            </div>

            <div onClick={togglAccountMenu} className="flex flex-row items-center gap-2 cursor-pointer relative">
              <div className="w-6 h-6 lg:w-10 lg:h-10 rounded-md cursor-pointer overflow-hidden">
                <img src={profileimg} alt="profile image"></img>
              </div>
              <FiChevronDown className={`text-white transition ${showAccountMenu ? 'rotate-180' : 'rotate-0'}`} />
              <AccountMenu visible={showAccountMenu}/>
            </div>
          </div>
        </div>
      </nav>
    </>
  );
};

export default Navbar;
