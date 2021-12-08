import React, { useState } from "react";
import { NavLink } from 'react-router-dom';
import { Transition } from "@headlessui/react";
import logo from './img/reseptiapp.png';

export const Nav = ({ handleLogout, isLoggedIn, mountLogin }) => {
    const [isOpen, setIsOpen] = useState(false);
    return (
        <div>
            <nav className="bg-nav font-Mali">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="flex items-center justify-between h-16">
                        <div className="flex items-center">
                            <div className="flex-shrink-0">
                                {/* Logo tähän */}
                                <img src={logo} alt="Logo" className="h-8" />
                            </div>
                            <div className="hidden md:block">
                                <div className="ml-10 flex items-baseline space-x-4">
                                    <NavLink
                                        to="/"
                                        className="hover:bg-nav-dark text-white px-3 py-1 rounded-md text-sm font-medium"
                                    >
                                        Home
                                    </NavLink>

                                    <NavLink
                                        to="/recipes"
                                        className="text-white hover:bg-nav-dark hover:text-white px-3 py-1 rounded-md text-sm font-medium"
                                    >
                                        Recipes
                                    </NavLink>

                                    <NavLink
                                        to="/login"
                                        className="text-right items-end text-white hover:bg-nav-dark hover:text-white px-3 py-1 rounded-md text-sm font-medium"
                                    >
                                        Log in
                                    </NavLink>
                                    <NavLink
                                        to="/myrecipes"
                                        className="text-right items-end text-white hover:bg-nav-dark hover:text-white px-3 py-1 rounded-md text-sm font-medium"
                                    >
                                        My Recipes
                                    </NavLink>
                                </div>
                            </div>
                        </div>
                        {isLoggedIn ?
                            (
                                <div>
                                    <button onClick={handleLogout}>
                                        LOGOUT
                                    </button>
                                </div>
                            ) :
                            (
                                <div>
                                    <button onClick={mountLogin}>
                                        LOGIN
                                    </button>
                                </div>
                            )}

                        {/* Compact navigation */}
                        <div className="-mr-2 flex md:hidden">
                            <button
                                onClick={() => setIsOpen(!isOpen)}
                                type="button"
                                className="bg-nav-dark inline-flex items-center justify-center p-2 rounded-md text-0 hover:text-gray-70 hover:bg-nav2 focus:outline-none"
                                aria-controls="mobile-menu"
                                aria-expanded="false"
                            >
                                <span className="sr-only">Open main menu</span>
                                {!isOpen ? (
                                    <svg
                                        className="block h-6 w-6"
                                        xmlns="http://www.w3.org/2000/svg"
                                        fill="none"
                                        viewBox="0 0 24 24"
                                        stroke="currentColor"
                                        aria-hidden="true"
                                    >
                                        <path
                                            strokeLinecap="round"
                                            strokeLinejoin="round"
                                            strokeWidth="2"
                                            d="M4 6h16M4 12h16M4 18h16"
                                        />
                                    </svg>
                                ) : (
                                    <svg
                                        className="block h-6 w-6"
                                        xmlns="http://www.w3.org/2000/svg"
                                        fill="none"
                                        viewBox="0 0 24 24"
                                        stroke="currentColor"
                                        aria-hidden="true"
                                    >
                                        <path
                                            strokeLinecap="round"
                                            strokeLinejoin="round"
                                            strokeWidth="2"
                                            d="M6 18L18 6M6 6l12 12"
                                        />
                                    </svg>
                                )}
                            </button>
                        </div>
                    </div>
                </div>


                <Transition
                    show={isOpen}
                    enter="transition ease-out duration-300 transform"
                    enterFrom="opacity-0 scale-95"
                    enterTo="opacity-100 scale-100"
                    leave="transition ease-in duration-75 transform"
                    leaveFrom="opacity-100 scale-100"
                    leaveTo="opacity-0 scale-95"
                >
                    {(ref) => (
                        <div className="md:hidden" id="mobile-menu">
                            <div ref={ref} className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
                                <NavLink
                                    to="/"
                                    className="hover:bg-nav-dark text-white block px-3 py-2 rounded-md text-base font-medium"
                                >
                                    Home
                                </NavLink>

                                <NavLink
                                    to="/recipes"
                                    className="text-white hover:bg-nav-dark hover:text-white block px-3 py-2 rounded-md text-base font-medium"
                                >
                                    Recipes
                                </NavLink>

                                <NavLink
                                    to="/login"
                                    className="text-white hover:bg-nav-dark hover:text-white block px-3 py-2 rounded-md text-base font-medium"
                                >
                                    Log in
                                </NavLink>
                            </div>
                        </div>
                    )}
                </Transition>
            </nav>
        </div>
    );
}

export default Nav;
