import React from 'react';
import ImageUpload from '../ImageUpload'


import Slideshow from '../Slideshow';

import Parallax from '../Parallax';


const Home = () => {
    return (
        <div>

            <br />
            
            <Slideshow />
            <Parallax text={"Welcome to ReseptiApp"} />

            <section className="p-40">
                <p>Tänne reseptisisältöä</p>
            </section>

            <h1>Hello World</h1>
            <p>This is the beginning of our ReseptiApp, let's goooooo 8)</p>
            <ImageUpload/>

        </div>

    );
};

export default Home;