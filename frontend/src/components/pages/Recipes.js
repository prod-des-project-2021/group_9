import React, { useState, useEffect } from 'react';
import recipeService from '../../services/recipes';
import RecipeGrid from '../RecipeGrid';
import {useLocation} from "react-router-dom";
import Header from '../Header';

const Recipes = () => {
    const [recipes, setRecipes] = useState(null);
    const location = useLocation();
    const params = new URLSearchParams(location.search);

    useEffect(() => {
        recipeService
            .getRecipes(params)
            .then(initialRecipes => {
                setRecipes(initialRecipes);
            });
    }, [location]);

    return (
        <div>
            <Header header={HeaderName(params)} />
            <RecipeGrid recipes={recipes} />
        </div>
    );
};

function HeaderName(params) {
    if (params.get("name")) {
        return `Search results for "${params.get("name")}"` ;
    } 

    return "All community recipes";
};


export default Recipes;