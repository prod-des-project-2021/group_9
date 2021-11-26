import React from 'react';
import ImageUpload from '../ImageUpload'


import Slideshow from '../Slideshow';

import Parallax from '../Parallax';

import RecipeGrid from '../RecipeGrid';


const Home = () => {
    return (
        <div>          
            <Slideshow />
            <Parallax text={"Welcome to ReseptiApp"} />
            <RecipeGrid/>
            <ImageUpload/>
        </div>
    );
};

export default Home;