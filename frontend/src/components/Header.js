import React from "react";

const Header = ({ header }) => {
    return(
        <div className="pt-8">
            <h1 className="text-center text-gray-700">{header}</h1>
        </div>
    )
}

export default Header;