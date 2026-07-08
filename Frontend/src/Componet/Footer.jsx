import React from "react";
import {
    faFacebookF,
    faTwitter,
    faGithub,
    faInstagram,
} from "@fortawesome/free-brands-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { NavLink } from "react-router-dom";

function Footer() {

    const companyLinks = [
        { path: "/about", label: "About Us" },
        { path: "/contact", label: "Contact" },
        { path: "/careers", label: "Careers" },
        { path: "/blog", label: "Blog" },
        { path: "/faqs", label: "FAQs" },
    ];

    const quickLinks = [
        { path: "/", label: "Home" },
        { path: "/shop", label: "Shop" },
        { path: "/wishlist", label: "Wishlist" },
        { path: "/cart", label: "Cart" },
        { path: "/account", label: "My Account" },
    ];

    return (
        <footer className="mt-6">
            <div className="overflow-hidden rounded-[32px] border border-gray-200 bg-white shadow-[0_8px_30px_rgba(0,0,0,0.05)]">

                {/* Top */}
                <div className="px-6 py-12 md:px-10 lg:px-16">
                    <div className="grid grid-cols-1 gap-10 sm:grid-cols-2 lg:grid-cols-3">

                        {/* Brand */}
                        <div>
                            <h2 className="text-3xl font-bold">
                                Style<span className="text-gray-400">Hub</span>
                            </h2>

                            <p className="mt-4 text-gray-500 leading-relaxed">
                                Discover premium fashion collections designed to elevate
                                your everyday style and confidence.
                            </p>

                            <div className="mt-6 flex gap-3">
                                {[faFacebookF, faInstagram, faTwitter, faGithub].map(
                                    (icon, index) => (
                                        <a
                                            key={index}
                                            href="#"
                                            className="flex h-10 w-10 items-center justify-center rounded-full bg-black text-white transition-all duration-300 hover:-translate-y-1 hover:bg-gray-800"
                                        >
                                            <FontAwesomeIcon icon={icon} />
                                        </a>
                                    )
                                )}
                            </div>
                        </div>

                        {/* Company */}
                        <div>
                            <h3 className="mb-5 text-lg font-bold">Company</h3>

                            <ul className="space-y-3">
                                {companyLinks.map((link) => (
                                    <li key={link.path}>
                                        <NavLink
                                            to={link.path}
                                            className={({ isActive }) =>
                                                isActive
                                                    ? "font-medium text-black underline underline-offset-4"
                                                    : "text-gray-500 hover:text-black transition"
                                            }
                                        >
                                            {link.label}
                                        </NavLink>
                                    </li>
                                ))}
                            </ul>
                        </div>

                        {/* Quick Links */}
                        <div>
                            <h3 className="mb-5 text-lg font-bold">Quick Links</h3>

                            <ul className="space-y-3">
                                {quickLinks.map((link) => (
                                    <li key={link.path}>
                                        <NavLink
                                            to={link.path}
                                            className={({ isActive }) =>
                                                isActive
                                                    ? "font-medium text-black underline underline-offset-4"
                                                    : "text-gray-500 hover:text-black transition"
                                            }
                                        >
                                            {link.label}
                                        </NavLink>
                                    </li>
                                ))}
                            </ul>
                        </div>

                    </div>
                </div>

                {/* Divider */}
                <div className="h-px bg-gradient-to-r from-transparent via-gray-300 to-transparent"></div>

                {/* Bottom */}
                <div className="px-6 py-6 md:px-10 lg:px-16">
                    <div className="flex flex-col items-center justify-between gap-4 md:flex-row">

                        <p className="text-center text-sm text-gray-500 md:text-left">
                            © 2026 StyleHub. All Rights Reserved.
                        </p>

                        <div className="flex flex-wrap justify-center gap-6 text-sm">
                            <NavLink
                                to="/privacy-policy"
                                className={({ isActive }) =>
                                    isActive
                                        ? "text-black underline underline-offset-4"
                                        : "text-gray-500 hover:text-black transition"
                                }
                            >
                                Privacy Policy
                            </NavLink>

                            <NavLink
                                to="/terms"
                                className={({ isActive }) =>
                                    isActive
                                        ? "text-black underline underline-offset-4"
                                        : "text-gray-500 hover:text-black transition"
                                }
                            >
                                Terms & Conditions
                            </NavLink>

                            <NavLink
                                to="/support"
                                className={({ isActive }) =>
                                    isActive
                                        ? "text-black underline underline-offset-4"
                                        : "text-gray-500 hover:text-black transition"
                                }
                            >
                                Support
                            </NavLink>
                        </div>

                    </div>
                </div>

            </div>
        </footer>
    );
}

export default Footer;