import React, { useState, useEffect } from 'react';
import recipeService from '../../services/recipes';
import { useLocation } from "react-router-dom";

import localUser from '../../utils/localUser';

import { setShoppingList } from '../../redux/actions/shoppinglist';
import { updateFavorites } from '../../redux/actions/user';
import { useDispatch, useSelector } from 'react-redux';

import { useNavigate } from 'react-router-dom';

import icon_delete from '../img/delete_white_24dp.svg';
import icon_favorite from '../img/favorite_white_24dp.svg';
import icon_favorite_border from '../img/favorite_border_white_24dp.svg';

const Recipe = () => {
    const [recipe, setRecipe] = useState(null);
    const location = useLocation();

    useEffect(() => {
        recipeService
            .getRecipe(new URLSearchParams(location.search).get("id"))
            .then(initialRecipe => {
                setRecipe(initialRecipe);
            });
    }, [location]);

    return (
        <div>
            <RecipeInfo recipe={recipe} />
        </div>
    );
}

const RecipeInfo = ({ recipe }) => {
    if (recipe === null) { // If the given recipe is null, then show a placeholder box.
        return (
            <div className="p-8 lg:mx-24">
                NOTHING HERE
            </div>
        );
    }
    else { // if the given recipe is NOT null, then show its info.
        return (
            <div className="relative pb-24 field w-full flex justify-center">
                <div className='pb-6 w-full lg:w-5/6'>
                    <div className='relative flex items-end'>
                        <img src={recipe.url ? recipe.url : ""}
                            className="object-cover h-96 w-full bg-center shadow-md " />
                        <div className="absolute bottom-0 h-40 w-full bg-gradient-to-t from-black opacity-60 "></div>
                        <div className='absolute w-full text-center px-6 py-4 text-white drop-shadow-xl' >
                            <h1 className='text-4xl'>{recipe.name}</h1>
                            <div className="mb-2 text-2xl">by {recipe.user.username}</div>
                        </div>
                    </div>


                    {/* Show ingredients and instructions side by side (for now). */}
                    <div className="relative md:flex md:mx-6  space-y-6 md:space-x-6 md:space-y-0 pt-4">
                        <Options recipe={recipe} />
                        <IngredientList recipe={recipe} />
                        <Instructions recipe={recipe} />
                    </div>
                </div>
            </div>
        );
    }
}

const Options = ({ recipe }) => {
    const { user, isLoggedIn } = useSelector(state => state.auth);
    const dispatch = useDispatch();
    const navigate = useNavigate();

    if (!isLoggedIn)
        return null;

    const deleteRecipeHandler = (recipe) => () => {
        recipeService
            .deleteRecipe(recipe.id)
            .then(deletedRecipe => {
                navigate(`/myRecipes`);
            });
    }

    const favoriteRecipeHandler = (recipe) => () => {
        dispatch(updateFavorites(recipe.id))
    }

    return (
        <div className="flex absolute md:top-4 right-4 space-x-2">

            <button
                onClick={favoriteRecipeHandler(recipe)} // Call deleteHandler when clicked.
                className="bg-yellow-300 hover:bg-yellow-100 p-4 w-auto rounded-full">

                {console.log(user.favorites)}

                {!user.favorites.includes(recipe.id)
                    ? <img src={icon_favorite_border} /> : <img src={icon_favorite} />
                }
            </button>

            {recipe.user.id === localUser.getUserId()
                ? <button
                    onClick={deleteRecipeHandler(recipe)} // Call deleteHandler when clicked.
                    className="bg-gray-500 hover:bg-red-400 p-4 w-auto rounded-full">
                    <img src={icon_delete} />
                </button>
                : null
            }
        </div>
    );
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

export default Recipe;