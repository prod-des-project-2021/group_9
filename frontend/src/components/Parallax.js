import React from 'react';

export const Parallax = ({text}) => {
    
    return (
        <div>
            <section
                className="flex items-center 
                justify-center h-screen m-auto mb-12 
                bg-fixed bg-center bg-cover custom-img w-full">

                <div className="p-5 text-5xl text-white filter drop-shadow-xl">

                    {text}
                
                </div>
            </section>
        </div>
    );
}

export default Parallax;