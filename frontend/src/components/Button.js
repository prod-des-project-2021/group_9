import React from 'react';

const Button = ({ text, clickHandler, style }) => {
    return (
        <button style={style} onClick={clickHandler}>{text}</button>
    );
};


export default Button;