import React from "react";
import { NavLink } from 'react-router-dom';

export const Footer = () => {
    return (
        <div>
            <footer className="bg-nav p-5 text-white font-Mali divide-y-2 divide-yellow-200 divide-solid">
                <div className="space-x-4 md:flex mb-3 md:justify-center lg:justify-start max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div>
                        <NavLink to="/"
                            className="hover:bg-nav-dark text-white sm:px-3 sm:py-1 rounded-md text-sm sm:text-lg" >
                            About us</NavLink>
                    </div>
                    <div>
                        <NavLink to="/"
                            className="hover:bg-nav-dark text-white sm:px-3 sm:py-1 rounded-md text-sm sm:text-lg" >
                            Terms of use</NavLink>
                    </div>
                    <div>
                        <NavLink to="/"
                            className="hover:bg-nav-dark text-white sm:px-3 sm:py-1 rounded-md text-sm sm:text-lg" >
                            Privacy policy</NavLink>
                    </div>
                    
                </div>
                <div className="flex pt-3 justify-center">
                    <p>2021, Team 9, OUAS</p>
                </div>
            </footer>
        </div>
    );
}

export default Footer;