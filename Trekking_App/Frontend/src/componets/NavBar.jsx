

import React, { useState } from "react";
import { HashLink as Link } from "react-router-hash-link";

const NavBar = () => {
  const [isMobileMenuOpen, setMobileMenuOpen] = useState(false);

  const toggleMobileMenu = () => {
    setMobileMenuOpen(!isMobileMenuOpen);
  };

  const closeMobileMenu = () => {
    setMobileMenuOpen(false);
  };

  return (
    <nav
      id="main-nav"
      data-active="true"
      data-open-mobile={isMobileMenuOpen}
      className="group z-20 fixed w-full h-16 bg-slate-800 text-white bg-opacity-80 font-semibold uppercase"
    >
      <div className="flex h-full items-center justify-between p-8">
        <Link
          to="/#cover"
          smooth
          onClick={closeMobileMenu}
          className="text-4xl flex-1 font-archivo cursor-pointer"
        >
          LOI
        </Link>
        <ul
          className={`fixed bg-slate-800 text-white bg-opacity-80 md:bg-transparent md:h-fit md:w-fit md:flex-[3] md:[position:inherit] md:top-0 md:flex-row md:justify-end md:items-center md:gap-20 lg:gap-28 h-screen w-max top-16 left-0 pl-8 pr-12 pt-4 flex justify-start items-start flex-col gap-4 transition-transform ease-in-out duration-500 ${
            isMobileMenuOpen ? "translate-x-0" : "-translate-x-full"
          } md:translate-x-0`}
        >
          <li>
            <Link
              className="hover:text-brand transition-colors"
              to="/#cover"
              smooth
              onClick={closeMobileMenu}
            >
              Home
            </Link>
          </li>
          <li>
            <Link
              className="hover:text-brand transition-colors"
              to="/#activities"
              smooth
              onClick={closeMobileMenu}
            >
              Activities
            </Link>
          </li>
          <li>
            <Link
              className="hover:text-brand transition-colors"
              to="/#founders"
              smooth
              onClick={closeMobileMenu}
            >
              Founders
            </Link>
          </li>
          <li>
            <Link
              className="hover:text-brand transition-colors"
              to="/#footer"
              smooth
              onClick={closeMobileMenu}
            >
              Contact
            </Link>
          </li>
          <li>
            <Link
              className="hover:text-brand transition-colors"
              to="/signup"
              onClick={closeMobileMenu}
            >
              Login
            </Link>
          </li>
        </ul>
        <div className="visible md:hidden flex justify-center items-center">
          <button
            className={`material-symbols-outlined text-4xl ${
              isMobileMenuOpen ? "hidden" : ""
            }`}
            onClick={toggleMobileMenu}
          >
            menu
          </button>
          <button
            className={`material-symbols-outlined text-4xl ${
              isMobileMenuOpen ? "" : "hidden"
            }`}
            onClick={toggleMobileMenu}
          >
            close
          </button>
        </div>
      </div>
    </nav>
  );
};

export default NavBar;
