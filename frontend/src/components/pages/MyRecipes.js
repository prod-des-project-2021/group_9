import React, { useState, useEffect } from 'react';
import CustomizedDialogs from '../Popup';
import recipeService from './../../services/recipes';
import Form from '../Form'


const MyRecipes = () => {
    const [recipes, setRecipes] = useState(null);
    const [selectedRecipe, setSelectedRecipe] = useState(null);
    const [mode, setMode] = useState(0);

    const selectRecipeHandler = (recipe) => () => {
        setSelectedRecipe(recipe);
    }

    const selectModeHandler = (mode) => () => {
        setMode(mode);
    }

    useEffect(() =>
    {
        recipeService
        .getAll()
        .then(initialRecipes =>
        {
            //console.log(initialRecipes);
            setRecipes(initialRecipes);
        });
    }, []);

    return (
        <div className="bg-yellow-100 font-Mali">
            <div className="bg-yellow-200 flex items-center h-16">
                <Mode text="My Recipes" clickHandler={selectModeHandler(0)} />
                <Mode text="Favorites" clickHandler={selectModeHandler(1)} />
                <Mode text="Categories" clickHandler={selectModeHandler(2)} />
            </div>

            <div className="lg:flex py-3 mx-4 space-x-4">
                <RecipeList recipes={recipes} clickHandler={selectRecipeHandler} />
                <RecipeInfo recipe={selectedRecipe} />
            </div>
            <CustomizedDialogs>
                <Form/>
            </CustomizedDialogs>
        </div>
    );
};

const Mode = ({text, clickHandler}) => {
    return(
        <button
        onClick={clickHandler}
        className="hover:bg-yellow-50 w-full h-16">
            {text}
        </button>
    );
}

const RecipeList = ({recipes, clickHandler}) => {
    return(
        recipes === null
        ? null
        : <div className="w-full lg:w-1/4 space-y-2">
            {recipes.map(recipe => <RecipeListing key={recipe.id} text={recipe.name} clickHandler={clickHandler(recipe)} />)}
        </div>
    );
}

const RecipeListing = ({text, clickHandler}) => {
    return(
        <button
        onClick={clickHandler}
        className="bg-gray-50 hover:bg-yellow-200 p-6 border-gray-400 shadow-md w-full">
            {text}
        </button>
    );
}

const RecipeInfo = ({recipe}) => {
    return(
        recipe === null
        ? null
        : <div className="bg-gray-50 w-full lg:w-3/4 p-8 border-gray-400 shadow-md">
            <div>
                <h1>{recipe.name}</h1>
            </div>
            <div className="flex mx-6 mb-4 space-x-1">
                <button className="bg-yellow-200 rounded-t-xl px-4">Ingredients</button>
                <button className="bg-gray-400 rounded-t-xl px-4 text-white">Instructions</button>
            </div>
            <IngredientList recipe={recipe} />
        </div>
    );
}

const IngredientList = ({recipe}) => {
    return(
        <table className="table-auto w-full mx-6 mb-12 shadow-t-md">
            <tbody className="divide-y">
                {recipe.ingredients.map(ingredient => <Ingredient key={ingredient.id} ingredient={ingredient} />)}
            </tbody>
        </table>
    );
}

const Ingredient = ({ingredient}) => {
    return(
        <tr>
            <td className="w-24 py-2">{ingredient.amount} {ingredient.unit}</td>
            <td className="py-2">{ingredient.name}</td>
        </tr>
    );
} 

export default MyRecipes;