import React from "react";
import { NavLink } from 'react-router-dom';

export const Footer = () => {
    return (
        <div>
            <footer className="bg-nav p-5 text-white font-Mali">
                <div className="space-x-4 flex justify-start max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div>
                        <NavLink to="/"
                            className="hover:bg-nav-dark text-white px-3 py-1 rounded-md text-large font-medium" >
                            About us</NavLink>
                    </div>
                    <div>
                        <NavLink to="/"
                            className="hover:bg-nav-dark text-white px-3 py-1 rounded-md text-large font-medium" >
                            Terms of use</NavLink>
                    </div>
                    <div>
                        <NavLink to="/"
                            className="hover:bg-nav-dark text-white px-3 py-1 rounded-md text-large font-medium" >
                            Privacy policy</NavLink>
                    </div>
                    
                </div>
                <div className="flex justify-center">
                        <p>2021, Team 9, OUAS</p>
                    </div>
            </footer>
        </div>
    );
}

export default Footer;