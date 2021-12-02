import React from 'react';

import Slideshow from '../Slideshow';

import Parallax from '../Parallax';

import RecipeGrid from '../RecipeGrid';

const Home = () => {
    return (
        <div>          
            <Slideshow />
            <Parallax text={"Welcome to ReseptiApp"} />
            <RecipeGrid/>
        </div>

    );
};

export default Home;