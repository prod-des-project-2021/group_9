import React from 'react';

import Slideshow from '../Slideshow';

import Parallax from '../Parallax';

import RecipeGrid from '../RecipeGrid';


const Home = () => {
    return (
        <div>
            <br />
            
            <Slideshow />
            <Parallax text={"Welcome to ReseptiApp"} />

            <section className="p-40">
                <p>Tänne reseptisisältöä</p>
                <RecipeGrid />
            </section>
        </div>

    );
};

export default Home;