import React, { useState, useEffect } from 'react';
import recipeService from '../../services/recipes';
import { useLocation } from "react-router-dom";
import Parallax from '../Parallax'

const Recipe = () => {
    const [recipe, setRecipe] = useState(null);
    const location = useLocation();

    useEffect(() => {
        recipeService
            .getRecipe(new URLSearchParams(location.search).get("id"))
            .then(initialRecipes => {
                setRecipe(initialRecipes);
                //recipes = initialRecipes;
                console.log(initialRecipes);
            });
    }, [location]);

    return (
        <div>
            <RecipeInfo recipe={recipe} />
        </div>
    );
};

const RecipeInfo = ({ recipe }) => {
    if (recipe === null) { // If the given recipe is null, then show a placeholder box.
        return (
            <div className="p-8 lg:mx-24">
                NOTHING
            </div>
        );
    }
    else { // if the given recipe is NOT null, then show its info.
        return (
            <div className="relative pb-24 field lg:mx-24">
                <div className='pb-6 '>
                    <div className='relative bg-gradient-to-r  flex items-end justify-center'>
                        <img src={recipe.url ? recipe.url : ""}
                            className="object-cover h-96 w-5/6 border-gray-400 bg-center shadow-md " />

                        <div className='absolute text-center px-6 py-4 text-5xl text-white drop-shadow-xl text-center' >
                            <h1>{recipe.name}</h1>
                        </div>
                    </div>
                </div>

                {/* Show ingredients and instructions side by side (for now). */}
                <div className="md:flex md:mx-6 space-y-6 md:space-x-6 md:space-y-0">

                    <IngredientList recipe={recipe} />
                    <Instructions recipe={recipe} />
                </div>
            </div>
        );
    }
}

// Ingredients of the given recipe are listed.
const IngredientList = ({ recipe }) => {

    const clickHandler = (ingredient) => () => {
        //send ingredient to shopping list
        console.log(ingredient)

    }
    return (
        <div className="md:w-1/2 shadow-t-md">
            <ModeButton text="Ingredients" />
            <table className="table-auto w-full">
                <tbody className="divide-y">

                    {/* Map function is used to display a list of ingredients. */}
                    {recipe.ingredients.map(ingredient => <Ingredient key={ingredient.id} ingredient={ingredient} clickHandler={clickHandler} />)}

                </tbody>
            </table>
        </div>
    );
}

// A single ingredient. Consists of amount, unit and the name of the ingredient.
const Ingredient = ({ ingredient, clickHandler }) => {


    return (

        <tr>
            <td className="w-24 p-2 text-right">{ingredient.amount} {ingredient.unit}</td>
            <td className="p-2">{ingredient.name}</td>
            <td button type="submit" onClick={clickHandler(ingredient)}> + </td>

        </tr>
    );
}

// Instructions of the given recipe are listed.
// WIP (recipes don't have instructions yet).
const Instructions = ({ recipe }) => {
    if (!recipe.steps)
        return null;

    return (
        <div className="table-auto md:w-1/2 shadow-t-md">
            <ModeButton text="Instructions" />
            <ul className="list-disc m-4 space-y-2">
                {recipe.steps.map(step => <li key={step.id}>{step.text}</li>)}
            </ul>
        </div>
    );
}

const ModeButton = ({ text }) => {

    return (
        <button
            className="bg-yellow-200 rounded-t-xl px-4 text-black">
            {text}
        </button>
    );
}



export default Recipe;