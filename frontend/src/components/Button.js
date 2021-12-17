import React from 'react';

const Button = ({ className, text, clickHandler, style }) => {
    return (

        <button className={className} style={style} onClick={clickHandler}>{text}</button>
    );
};


export default Button;