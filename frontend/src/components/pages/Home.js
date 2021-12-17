import React, { useState, useEffect } from 'react';
import recipeService from '../../services/recipes';
import Slideshow from '../Slideshow';
import Parallax from '../Parallax';
import RecipeGrid from '../RecipeGrid';
import Header from '../Header';

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
        <div className='bg-gray-800'>          
            <Slideshow />
            <Parallax text={"Welcome to ReseptiApp"} />
            <Header header="Top picks"/>
            <RecipeGrid recipes={recipes} header="Best picks"/>
        </div>
    );
};

export default Home;