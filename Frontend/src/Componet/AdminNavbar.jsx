import React, { useState } from "react";
import logo from "../assets/Logo.png";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
    faHouse,
    faPlus,
    faList,
    faBars,
    faXmark,
} from "@fortawesome/free-solid-svg-icons";

import { NavLink } from "react-router-dom";

function AdminNavbar() {
    const [isOpen, setIsOpen] = useState(false);

    const navItems = [
        { path: "/admindashboard", label: "Dashboard", icon: faHouse },
        { path: "/addproduct", label: "Add Product", icon: faPlus },
        { path: "/showproduct", label: "Products", icon: faList },
    ];

    return (
        <header className="sticky top-0 z-50 bg-gray-100/80 backdrop-blur-md">
            <div className="max-w-7xl mx-auto px-4 py-4">
                <div className="bg-white rounded-3xl shadow-lg border border-gray-200">
                    <div className="flex items-center justify-between px-5 lg:px-8 py-4">
                        {/* Left */}
                        <div className="flex items-center gap-4">
                            <button
                                className="lg:hidden"
                                onClick={() => setIsOpen(!isOpen)}
                            >
                                <FontAwesomeIcon
                                    icon={isOpen ? faXmark : faBars}
                                    className="text-xl"
                                />
                            </button>

                            <NavLink to="/" className="flex items-center gap-3">
                                <img
                                    src={logo}
                                    alt="Logo"
                                    className="w-10 h-10 object-contain"
                                />

                                <div>
                                    <h1 className="text-xl lg:text-2xl font-bold">
                                        StyleHub
                                    </h1>
                                    <p className="text-xs text-gray-500 hidden sm:block">
                                        Admin Panel
                                    </p>
                                </div>
                            </NavLink>
                        </div>

                        {/* Desktop Navigation */}
                        <nav className="hidden lg:flex items-center gap-3">
                            {navItems.map((item) => (
                                <NavLink
                                    key={item.path}
                                    to={item.path}
                                    className={({ isActive }) =>
                                        isActive
                                            ? "flex items-center gap-2 bg-black text-white px-5 py-3 rounded-xl font-medium"
                                            : "flex items-center gap-2 px-5 py-3 rounded-xl font-medium text-gray-700 hover:bg-gray-100 transition"
                                    }
                                >
                                    <FontAwesomeIcon icon={item.icon} />
                                    <span className="whitespace-nowrap">
                                        {item.label}
                                    </span>
                                </NavLink>
                            ))}
                        </nav>
                    </div>

                    {/* Mobile Navigation */}
                    <div
                        className={`lg:hidden overflow-hidden transition-all duration-300 ${isOpen ? "max-h-96 border-t border-gray-200" : "max-h-0"
                            }`}
                    >
                        <div className="p-4 space-y-2">
                            {navItems.map((item) => (
                                <NavLink
                                    key={item.path}
                                    to={item.path}
                                    onClick={() => setIsOpen(false)}
                                    className={({ isActive }) =>
                                        isActive
                                            ? "flex items-center gap-3 bg-black text-white px-4 py-3 rounded-xl"
                                            : "flex items-center gap-3 px-4 py-3 rounded-xl hover:bg-gray-100 transition"
                                    }
                                >
                                    <FontAwesomeIcon icon={item.icon} />
                                    {item.label}
                                </NavLink>
                            ))}
                        </div>
                    </div>
                </div>
            </div>
        </header>
    );
}

export default AdminNavbar;