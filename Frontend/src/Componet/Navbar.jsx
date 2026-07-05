import { React, useState } from 'react'
import logo from '../assets/Logo.png'
import userPlaceholder from '../assets/UserPlaceholder.png'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faHouse, faBagShopping, faLayerGroup, faBoxOpen, faHeart, faStar, faBars, faAngleDown, faAngleUp, faArrowRightFromBracket, faXmark } from '@fortawesome/free-solid-svg-icons'
import { NavLink } from 'react-router-dom'




function Navbar() {

    const Islogin = true; // Replace with your actual login state
    const [isOpen, setIsOpen] = useState(false);
    const [isDropdownOpen, setIsDropdownOpen] = useState(false);
    const IsUser = false; // Replace with your actual user state

    return (
        <div className="mt-2 mb-2 rounded-[32px] border border-white/20 bg-white/10 backdrop-blur-4xl shadow-[0_1px_7px_rgba(15,23,42,0.40)] backdrop-saturate-150">

            <div className="flex justify-evenly lg:flex items-center gap-4 px-4 py-2">

                <div className="lg:hidden flex items-center gap-2">

                    {isOpen ? (
                        <FontAwesomeIcon
                            icon={faXmark
                            }
                            onClick={() => setIsOpen(!isOpen)}
                            className="h-6 w-6 cursor-pointer text-xl text-black "
                        />
                    ) : (
                        <FontAwesomeIcon
                            icon={faBars}
                            onClick={() => {
                                setIsOpen(!isOpen)
                                setIsDropdownOpen(false)
                            }}
                            className="h-6 w-6 cursor-pointer text-xl text-black "
                        />
                    )}


                    {isOpen && (
                        <div className="absolute left-4 right-4 top-20 rounded-2xl bg-white/30 flex flex-col  gap-2 p-5 shadow-[0_1px_10px_rgba(15,23,42,0.20)] backdrop-blur-lg lg:hidden">
                            <NavLink to="/" className={({ isActive }) => isActive ? "flex items-center gap-2 text-md font-normal text-black transition bg-black text-white shadow-[0_1px_10px_rgba(15,23,42,0.40)]  px-4 py-3 rounded-4xl " : "flex items-center gap-2 text-md font-normal text-black transition hover:text-zinc-600 p-2"}>
                                {/* <FontAwesomeIcon icon={faHouse} /> */}
                                Home
                            </NavLink>

                            <NavLink to="/shop" className={({ isActive }) => isActive ? "flex items-center gap-2 text-md font-normal text-black transition bg-black text-white shadow-[0_1px_10px_rgba(15,23,42,0.40)] px-4 py-3 rounded-4xl" : "flex items-center gap-2 text-md font-normal text-black transition hover:text-zinc-600 p-2 rounded"}>
                                {/* <FontAwesomeIcon icon={faBagShopping} /> */}
                                Shop
                            </NavLink>

                            <NavLink to="/categories" className={({ isActive }) => isActive ? "flex items-center gap-2 text-md font-normal text-black transition bg-black text-white shadow-[0_1px_10px_rgba(15,23,42,0.40)]  px-4 py-3 rounded-4xl" : "flex items-center gap-2 text-md font-normal text-black transition hover:text-zinc-600 p-2 rounded"}>
                                {/* <FontAwesomeIcon icon={faLayerGroup} /> */}
                                Categories
                            </NavLink>

                            <NavLink to="/orders" className={({ isActive }) => isActive ? "flex items-center gap-2 text-md font-normal text-black transition bg-black text-white shadow-[0_1px_10px_rgba(15,23,42,0.40)]  px-4 py-3 rounded-4xl" : "flex items-center gap-2 text-md font-normal text-black transition hover:text-zinc-600 p-2 rounded"}>
                                {/* <FontAwesomeIcon icon={faBoxOpen} /> */}
                                Orders
                            </NavLink>

                            <NavLink to="/wishlist" className={({ isActive }) => isActive ? "flex items-center gap-2 text-md font-normal text-black transition bg-black text-white shadow-[0_1px_10px_rgba(15,23,42,0.40)]  px-4 py-3 rounded-4xl" : "flex items-center gap-2 text-md font-normal text-black transition hover:text-zinc-600 p-2 rounded"}>
                                {/* <FontAwesomeIcon icon={faHeart} /> */}
                                Wishlist
                            </NavLink>

                            <NavLink to="/review" className={({ isActive }) => isActive ? "flex items-center gap-2 text-md font-normal text-black transition bg-black text-white shadow-[0_1px_10px_rgba(15,23,42,0.40)]  px-4 py-3 rounded-4xl" : "flex items-center gap-2 text-md font-normal text-black transition hover:text-zinc-600 p-2 rounded"}>
                                {/* <FontAwesomeIcon icon={faStar} /> */}
                                Review
                            </NavLink>
                        </div>
                    )}
                </div>

                <div className="flex items-center gap-2">
                    <img src={logo} alt="Logo" className="w-7 lg:w-10 " />
                    <h1 className="text-xl  lg:text-2xl font-normal">StyleHub</h1>
                </div>

                <nav className=" hidden lg:block ml-auto ">
                    <ul className="flex space-x-4 gap-4">
                        <NavLink to="/" className={({ isActive }) => isActive ? "flex items-center gap-2 text-md font-normal text-black transition bg-black text-white shadow-[0_1px_10px_rgba(15,23,42,0.50)]  px-4 py-3 rounded-4xl" : "flex items-center gap-2 text-md font-normal text-black transition hover:text-zinc-600 p-2"}>
                            <FontAwesomeIcon icon={faHouse} />
                            Home
                        </NavLink>

                        <NavLink to="/shop" className={({ isActive }) => isActive ? "flex items-center gap-2 text-md font-normal text-black transition bg-black text-white shadow-[0_1px_10px_rgba(15,23,42,0.50)] px-4 py-3 rounded-4xl" : "flex items-center gap-2 text-md font-normal text-black transition hover:text-zinc-600 p-2 rounded"}>
                            <FontAwesomeIcon icon={faBagShopping} />
                            Shop
                        </NavLink>

                        <NavLink to="/categories" className={({ isActive }) => isActive ? "flex items-center gap-2 text-md font-normal text-black transition bg-black text-white shadow-[0_1px_10px_rgba(15,23,42,0.50)] px-4 py-3 rounded-4xl" : "flex items-center gap-2 text-md font-normal text-black transition hover:text-zinc-600 p-2 rounded"}>
                            <FontAwesomeIcon icon={faLayerGroup} />
                            Categories
                        </NavLink>

                        <NavLink to="/orders" className={({ isActive }) => isActive ? "flex items-center gap-2 text-md font-normal text-black transition bg-black text-white shadow-[0_1px_10px_rgba(15,23,42,0.50)] px-4 py-3 rounded-4xl" : "flex items-center gap-2 text-md font-normal text-black transition hover:text-zinc-600 p-2 rounded"}>
                            <FontAwesomeIcon icon={faBoxOpen} />
                            Orders
                        </NavLink>

                        <NavLink to="/wishlist" className={({ isActive }) => isActive ? "flex items-center gap-2 text-md font-normal text-black transition bg-black text-white shadow-[0_1px_10px_rgba(15,23,42,0.50)] px-4 py-3 rounded-4xl" : "flex items-center gap-2 text-md font-normal text-black transition hover:text-zinc-600 p-2 rounded"}>
                            <FontAwesomeIcon icon={faHeart} />
                            Wishlist
                        </NavLink>

                        <NavLink to="/review" className={({ isActive }) => isActive ? "flex items-center gap-2 text-md font-normal text-black transition bg-black text-white shadow-[0_1px_10px_rgba(15,23,42,0.50)] px-4 py-3 rounded-4xl" : "flex items-center gap-2 text-md font-normal text-black transition hover:text-zinc-600 p-2 rounded"}>
                            <FontAwesomeIcon icon={faStar} />
                            Review
                        </NavLink>
                    </ul>
                </nav>

                <p className="hidden lg:block ml-4 text-black font-light">|</p>

                <div className="ml-auto lg:ml-0 flex items-center">
                    {Islogin ? (
                        <>
                            <button onClick={() => {
                                setIsDropdownOpen(!isDropdownOpen)
                                setIsOpen(false)
                            }}
                                className="flex items-center gap-3 rounded-4xl border px-3 py-2 transition cursor-pointer bg-black  shadow-[0_1px_10px_rgba(15,23,42,0.50)]"
                            >
                                <img src={IsUser ? logo : userPlaceholder} alt="Profile" className=" w-7 rounded-full border" />
                                <span className="hidden lg:block text-white font-normal">Hello, Bhautik</span>
                                {isDropdownOpen ? (
                                    <FontAwesomeIcon icon={faAngleUp} className="text-white" />
                                ) : (
                                    <FontAwesomeIcon icon={faAngleDown} className="text-white" />
                                )}
                            </button>

                            {isDropdownOpen && (
                                <div className="absolute right-4 top-20 rounded-2xl bg-white/30 p-4 shadow-lg backdrop-blur-lg ">
                                    <a href="/logout" className="block py-2 hover:underline">
                                        <FontAwesomeIcon icon={faArrowRightFromBracket} className="mr-2" />
                                        Logout
                                    </a>
                                </div>
                            )}


                        </>
                    ) : (
                        <a href="/login" className="rounded-xl bg-black px-4 py-2 text-white transition hover:bg-zinc-800 focus:outline-none focus:ring-4 focus:ring-zinc-300">
                            Login
                        </a>
                    )}
                </div>

            </div>

        </div>
    )
}

export default Navbar