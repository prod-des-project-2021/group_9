import React from 'react';

const Button = ({ className, text, clickHandler, style, icon }) => {
    return (

        <button className={className} style={style} onClick={clickHandler}>{text}
            {icon === null ? null : <img src={icon} className="w-full h-full p-4" />}
        </button>
    );
};


export default Button;