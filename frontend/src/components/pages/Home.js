import React, { useState, useEffect } from 'react';
import recipeService from '../../services/recipes';
import Slideshow from '../Slideshow';

import Parallax from '../Parallax';

import RecipeGrid from '../RecipeGrid';

const Home = () => {
    const [recipes, setRecipes] = useState(null);

    useEffect(() => {
        recipeService
            .getAll()
            .then(initialRecipes => {
                setRecipes(initialRecipes);
                console.log(initialRecipes);
            });
    }, []);

    return (
        <div>          
            <Slideshow />
            <Parallax text={"Welcome to ReseptiApp"} />
            <RecipeGrid recipes={recipes} />
        </div>

    );
};

export default Home;