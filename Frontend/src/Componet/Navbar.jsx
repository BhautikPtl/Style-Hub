import React, { useState } from "react";
import logo from "../assets/Logo.png";
import userPlaceholder from "../assets/UserPlaceholder.png";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faHouse,
  faBagShopping,
  faLayerGroup,
  faBoxOpen,
  faHeart,
  faStar,
  faBars,
  faXmark,
  faArrowRightFromBracket,
  faCartShopping,
} from "@fortawesome/free-solid-svg-icons";

import { NavLink } from "react-router-dom";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";

function Navbar(props) {

  const { isLogged, users } = props

  const [isOpen, setIsOpen] = useState(false);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  const Islogin = isLogged;


  const navItems = [
    { path: "/", label: "Home", icon: faHouse },
    { path: "/shop", label: "Shop", icon: faBagShopping },
    { path: "/orders", label: "Orders", icon: faBoxOpen },
    { path: "/wishlist", label: "Wishlist", icon: faHeart },
    { path: "/review", label: "Review", icon: faStar },
  ];


  const navigate = useNavigate();
  const handleLogout = () => {
    axios.post("http://localhost:5000/api/auth/logout", {}, { withCredentials: true })
      .then((response) => {
        navigate("/login");
      })
      .catch((error) => {
        console.error("Error logging out:", error);
      });
  }
  return (
    <header className="sticky top-4 z-50">
      <div className="rounded-[32px] border border-gray-200 bg-white/80 backdrop-blur-xl shadow-[0_10px_30px_rgba(0,0,0,0.08)]">

        <div className="flex items-center justify-between px-4 lg:px-6 py-3">

          {/* Left */}
          <div className="flex items-center gap-3">

            {/* Mobile Menu Button */}
            <button
              className="lg:hidden"
              onClick={() => {
                setIsOpen(!isOpen);
                setIsDropdownOpen(false);
              }}
            >
              <FontAwesomeIcon
                icon={isOpen ? faXmark : faBars}
                className="text-xl"
              />
            </button>

            {/* Logo */}
            <NavLink to="/" className="flex items-center gap-2">
              <img
                src={logo}
                alt="Logo"
                className="w-8 lg:w-10"
              />

              <h1 className="text-xl lg:text-2xl font-medium">
                StyleHub
              </h1>
            </NavLink>
          </div>

          {/* Desktop Navigation */}
          <nav className="hidden lg:block">
            <ul className="flex items-center gap-2">
              {navItems.map((item) => (
                <NavLink
                  key={item.path}
                  to={item.path}
                  className={({ isActive }) =>
                    isActive
                      ? "flex items-center gap-2 bg-black text-white px-4 py-3 rounded-xl shadow-lg"
                      : "flex items-center gap-2 px-4 py-3 rounded-xl hover:bg-gray-100 transition"
                  }
                >
                  <FontAwesomeIcon icon={item.icon} />
                  {item.label}
                </NavLink>
              ))}
            </ul>
          </nav>

          {/* Right */}
          <div className="flex items-center gap-4">

            {Islogin ? (
              <>
                {/* Cart */}
                <NavLink
                  to="/cart"
                  className={({ isActive }) =>
                    isActive
                      ? "relative flex items-center gap-2 bg-black p-2 text-white rounded-xl shadow-lg"
                      : "relative flex items-center gap-2 rounded-xl hover:bg-gray-100 transition"
                  }

                >
                  <FontAwesomeIcon
                    icon={faCartShopping}
                    className="text-2xl"
                  />

                  <span className="absolute -top-2 -right-2 flex h-5 w-5 items-center justify-center rounded-full bg-black text-white text-[10px] font-bold">
                    0
                  </span>
                </NavLink>

                {/* Divider */}
                <div className="hidden lg:block h-8 w-px bg-gray-300"></div>

                {/* Profile */}
                <button
                  onClick={() => {
                    setIsDropdownOpen(!isDropdownOpen);
                    setIsOpen(false);
                  }}
                  className="flex items-center gap-3 rounded-full px-5 py-2 cursor-pointer hover:bg-gray-100 transition"
                >
                  <img
                    src={users?.profilePicture || userPlaceholder}
                    alt="Profile"
                    className="w-8 h-8 rounded-full border object-cover"
                  />

                  <span className="hidden lg:block">
                    Hello, {users.name}
                  </span>
                </button>

                {/* Dropdown */}
                {isDropdownOpen && (
                  <div className="absolute right-4 top-[78px] w-44 rounded-2xl border border-gray-100 bg-white shadow-xl p-2">
                    <NavLink
                      to="/profile"
                      className="block px-3 py-2 rounded-lg hover:bg-gray-100"
                    >
                      Profile
                    </NavLink>

                    <button
                      onClick={() => {
                        handleLogout();
                      }}
                      className="w-full text-left px-3 py-2 rounded-lg hover:bg-gray-100"
                    >
                      <FontAwesomeIcon
                        icon={faArrowRightFromBracket}
                        className="mr-2"
                      />
                      Logout
                    </button>
                  </div>
                )}
              </>
            ) : (
              <NavLink
                to="/login"
                className="rounded-xl bg-black px-5 py-2.5 text-white hover:bg-zinc-800 transition"
              >
                Login
              </NavLink>
            )}
          </div>
        </div>

        {/* Mobile Menu */}
        {isOpen && (
          <div className="lg:hidden border-t border-gray-100 p-4">

            <div className="flex flex-col gap-2">
              {navItems.map((item) => (
                <NavLink
                  key={item.path}
                  to={item.path}
                  onClick={() => setIsOpen(false)}
                  className={({ isActive }) =>
                    isActive
                      ? "flex items-center gap-3 bg-black text-white px-4 py-3 rounded-xl"
                      : "flex items-center gap-3 px-4 py-3 rounded-xl hover:bg-gray-100"
                  }
                >
                  <FontAwesomeIcon icon={item.icon} />
                  {item.label}
                </NavLink>
              ))}
            </div>

          </div>
        )}
      </div>
    </header>
  );
}

export default Navbar;