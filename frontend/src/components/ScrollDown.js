import React from 'react';

export const ScrollDown = ({text}) => {

    return (
        <div className="text-xl text-white filter drop-shadow-xl text-center">
            {text}
            <svg xmlns="http://www.w3.org/2000/svg" height="36px" viewBox="0 0 24 24" width="36px" fill="#FFFFFF"
                className="animate-bounce mx-auto">
                <path d="M0 0h24v24H0V0z" fill="none" /><path d="M7.41 8.59L12 13.17l4.59-4.58L18 10l-6 6-6-6 1.41-1.41z" />
            </svg>
        </div>
    );
}

export default ScrollDown;