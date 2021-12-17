import React, { useState, useEffect } from 'react';
import recipeService from '../../services/recipes';
import { useLocation } from "react-router-dom";

import Form from '../Form'
import ShoppingList from '../ShoppingList';

import { setShoppingList } from '../../redux/actions/shoppinglist'
import { useDispatch, useSelector } from 'react-redux'

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


    const deleteRecipeHandler = (recipe) => () => {
        recipeService
            .deleteRecipe(recipe.id)
            .then(initialRecipes => {

            });
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
                <div className="relative p-12 pb-24 field lg:mx-24">
                    <h1>{recipe.name}</h1>
                    <div className="flex absolute md:top-4 right-4 space-x-2">
                        <button
                            onClick={deleteRecipeHandler(recipe)} // Call deleteHandler when clicked.
                            className="bg-gray-500 hover:bg-red-400 p-4 shadow-md w-auto">
                            DELETE
                        </button>
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

        const dispatch = useDispatch()

        const { isLoggedIn } = useSelector(state => state.auth)

        const clickHandler = (ingredient) => () => {
            if (isLoggedIn)
                dispatch(setShoppingList(ingredient))

            else {


            }
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
                <td>
                    <button onClick={clickHandler(ingredient)}> + </button>
                </td>

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

}

export default Recipe;