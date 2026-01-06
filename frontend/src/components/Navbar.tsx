import { useState } from "react";
import type { NavbarLinkType } from "../types";
import { Link } from "react-scroll";
import { GiHamburgerMenu } from "react-icons/gi";
import Button from "./customUI/Button";

const Navbar = () => {
  const [show, setShow] = useState<boolean>(false);
  const navbarLinks: NavbarLinkType[] = [
    {
      id: 1,
      title: "HOME",
      link: "heroSection",
    },
    {
      id: 2,
      title: "ABOUT US",
      link: "about",
    },
    {
      id: 3,
      title: "SERVICES",
      link: "qualities",
    },
    {
      id: 4,
      title: "TEAM",
      link: "team",
    },
    {
      id: 5,
      title: "RESERVATION",
      link: "reservation",
    },
  ];

  return (
    <nav className="w-screen py-4 fixed top-0 left-0 right-0 z-50">
      {/* Decorative background for blur*/}
      <div className="absolute inset-0 bg-white/10 backdrop-blur-md shadow-sm"></div>

      <div className="max-w-6xl mx-auto md:flex md:items-center md:justify-between px-6 relative z-10">
        <div className="flex flex-row justify-between items-center">
          <span className="text-2xl cursor-pointer font-sans font-bold">
            LOGO
          </span>
          <span
            onClick={() => setShow(!show)}
            className="text-3xl cursor-pointer block md:hidden"
          >
            <GiHamburgerMenu />
          </span>
        </div>
        <ul
          className={`z-20 md:z-auto md:flex md:items-center md:static absolute left-0 w-full md:w-auto py-8 md:py-0 pl-7 md:pl-0 md:opacity-100 opacity-0 top-[-400px] transition-all ease-in duration-300 md:bg-transparent md:shadow-none md:backdrop-blur-none ${
            show
              ? "top-[48px] opacity-100 bg-white/10 shadow-sm backdrop-blur-md"
              : "top-[-400px] opacity-0"
          }`}
        >
          {navbarLinks.map((element) => (
            <li
              className="md:text-xl mx-4 my-3 md:my-0 hover:text-gray-500 duration-200 font-medium cursor-pointer"
              key={element.id}
            >
              <Link
                to={element.link}
                key={element.id}
                spy={true}
                smooth={true}
                duration={500}
              >
                {element.title}
              </Link>
            </li>
          ))}
          <Button className="mt-3 mx-4 text-base md:text-xl ">Our Menu</Button>
        </ul>
      </div>
    </nav>
  );
};

export default Navbar;
