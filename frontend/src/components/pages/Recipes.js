import React, { useState, useEffect } from 'react';
import recipeService from '../../services/recipes';
import RecipeGrid from '../RecipeGrid';
import {useLocation} from "react-router-dom";

const Recipes = () => {
    const [recipes, setRecipes] = useState(null);
    //const [params, setParams] = useState(null);
    //let recipes = null;
    const location = useLocation();
    //setParams();

    useEffect(() => {
        recipeService
            .getRecipes(new URLSearchParams(location.search))
            .then(initialRecipes => {
                setRecipes(initialRecipes);
                //recipes = initialRecipes;
                console.log(initialRecipes);
            });
    }, [location]);

    return (
        <div>
            <h1>Recipes page</h1>
            <RecipeGrid recipes={recipes} />
        </div>
    );
};


export default Recipes;