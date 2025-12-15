import React, { useState } from "react";
import type { NavbarLinkType } from "../types";
import { Link } from "react-router-dom";
import { GiHamburgerMenu } from "react-icons/gi";

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
  console.log(show);

  return (
    <nav className="py-7 md:flex md:items-center md:justify-between md:max-w-6xl md:mx-auto ">
      <div className="flex justify-between items-center px-6">
        <span className="text-2xl cursor-pointer font-sans font-bold">
          LOGO
        </span>
        <span onClick={() => setShow(!show)} className="text-3xl cursor-pointer block md:hidden"><GiHamburgerMenu/></span>
      </div>
      <ul className={`z-[-1] md:z-auto md:flex md:items-center md:static absolute left-0 w-full md:w-auto py-8 md:py-0 pl-7 md:pl-0  md:opacity-100 opacity-0 top-[-400px] transition-all ease-in duration-300  ${show ? "top-[80px] opacity-100" : "top-[-400px] opacity-0"}`}>
        {navbarLinks.map((element) => (
          <li className="text-xl mx-4 my-2 md:my-0 hover:text-gray-500 duration-200 ">
            <Link to={element.title} key={element.id}>
              {element.title}
            </Link>
          </li>
        ))}
      <button className="font-bold border p-2 rounded-2xl hover:bg-gray-100 duration-200">
        Our Menu
      </button>
      </ul>
    </nav>
  );
};

export default Navbar;
