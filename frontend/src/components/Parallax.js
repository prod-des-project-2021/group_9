import React from 'react';
import ScrollDown from './ScrollDown.js';

export const Parallax = ({text}) => {
    
    return (
        <div>
            <section
                className="flex items-center 
                justify-center h-screen m-auto mb-12 
                bg-fixed bg-center bg-cover custom-img 
                w-full grid grid-cols-1">

                <div className="p-5 text-5xl text-white filter drop-shadow-xl row-span-6 text-center">
                    {text}
                </div>

                <div className="row-span-1">
                    <ScrollDown text={"Scroll down for recipes"} />
                </div>
            </section>
        </div>
    );
}

export default Parallax;