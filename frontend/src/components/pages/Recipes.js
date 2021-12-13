import React, { useState, useEffect } from 'react';
import recipeService from '../../services/recipes';
import RecipeGrid from '../RecipeGrid';

const Recipes = () => {
    const [recipes, setRecipes] = useState(null);
    const params = new URLSearchParams([['name', 'Parmesan Chicken Wings']]);

    useEffect(() => {
        recipeService
            .getRecipes(params)
            .then(initialRecipes => {
                setRecipes(initialRecipes);
                console.log(initialRecipes);
            });
    }, []);

    return (
        <div>
            <h1>Recipes page</h1>
            <RecipeGrid recipes={recipes} />
        </div>
    );
};


export default Recipes;