import React from 'react';

export const Parallax = ({text}) => {
    return (
        <div>
            <section
                className="container flex items-center 
                justify-center h-screen m-auto mb-12 
                bg-fixed bg-center bg-cover custom-img"
            >
                <div className="p-5 text-2xl text-white 
                bg-purple-300 bg-opacity-50 rounded-xl">
                    {text}
                </div>
            </section>
        </div>
    );
}

export default Parallax;