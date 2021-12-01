import React, { useState, useEffect } from 'react';
import recipeService from './../../services/recipes';

const MyRecipes = () => {
    const [recipes, setRecipes] = useState([{id:0, name:"PLACEHOLDER", ingredients:[{amount:1, unit:"tbsp", name:"test"},{amount:3, unit:"qt", name:"more test"}]}]);
    const [selectedRecipe, setSelectedRecipe] = useState(null);
    const [filter, setFilter] = useState("myRecipes");

    // Use recipes.js service to fetch recipes from the database.
    // Currently every recipe is returned from the database, only recipes of the current user should be returned in the future...
    useEffect(() => {
        recipeService
        .getAll()
        .then(initialRecipes => {
            setRecipes(initialRecipes);
        });
    }, []);

    // Use recipes.js service to delete the given recipe from the database.
    const deleteRecipeHandler = (recipe) => () => {
        recipeService
        .deleteRecipe(recipe.id)
        .then(initialRecipes => { // If deleteion was successful, then update the local list of recipes.
            const copy = recipes.filter(r => r.id !== recipe.id); // Filter out the recipe which was deleted.
            setRecipes(copy);

            setSelectedRecipe(null); // Set selection to null, so the current recipe (which was deleted) isn't selected anymore.
        });
    }

    // This function is called when one of the buttons (RecipeButton) on the left side of the screen is pressed.
    const selectRecipeHandler = (recipe) => () => {
        setSelectedRecipe(recipe); // The given recipe is now selected.
    }

    // This functions is called when on the filter buttons is pressed.
    // WIP (doesn't do anything, since all of the recipes are currently fetched form the database).
    const selectFilterHandler = (filter) => () => {
        setFilter(filter);
    }

    return (
        <div className="bg-yellow-100 font-Mali">
            <div className="bg-yellow-200 flex items-center h-16">
                <FilterButton text="My Recipes" selectFilterHandler={selectFilterHandler("myRecipes")} />
                <FilterButton text="Favorites" selectFilterHandler={selectFilterHandler("favorites")} />
                <FilterButton text="Categories" selectFilterHandler={selectFilterHandler("categories")} />
            </div>

            <div className="md:flex py-3 mx-4 md:space-x-4">
                <RecipeList recipes={recipes} selectRecipeHandler={selectRecipeHandler} />
                <div className="w-full md:w-3/4">
                    <RecipeInfo recipe={selectedRecipe} deleteRecipeHandler={deleteRecipeHandler} />
                </div>
            </div>
        </div>
    );
};

// A button used to select the filter.
const FilterButton = ({text, selectFilterHandler}) => {
    return(
        <button
        onClick={selectFilterHandler}
        className="hover:bg-yellow-50 w-full h-16">
            {text}
        </button>
    );
}

// Shows a list of all the given recipes
const RecipeList = ({recipes, selectRecipeHandler}) => {
    return(
        recipes === null
        ? null
        : <div className="w-full md:w-1/4 space-y-2">
            {recipes.map(recipe => <RecipeButton key={recipe.id} text={recipe.name} selectRecipeHandler={selectRecipeHandler(recipe)} />)}
        </div>
    ); 

    /* return(
        <div className="w-full md:w-1/3">
            <div className="grid items-start grid-cols-2 gap-2">
                {recipes.map(recipe => <RecipeButton key={recipe.id} text={recipe.name} selectRecipeHandler={selectRecipeHandler(recipe)} />)}
            </div>
        </div>
    ); */
}

// A single button representing the givne recipe.
const RecipeButton = ({text, selectRecipeHandler}) => {
    return(
        <button
        onClick={selectRecipeHandler} // Call selectRecipeHandler when clicked.
        className="bg-gray-50 hover:bg-yellow-200 p-6 shadow-md w-full text-left">
            {text}
        </button>
    );
}

// A big box on the right side of the screen.
// The name, Ingredints and instuctions of the given recipe are shown.
const RecipeInfo = ({recipe, deleteRecipeHandler}) => {
    if(recipe === null) { // If the given recipe is null, then show a placeholder box.
        return(
            <div className="bg-gray-50 w-full p-8 shadow-md">
                NOTHING
            </div>
        );
    }
    else { // if the given recipe is NOT null, then show its info.
        return(
            <div className="relative bg-gray-50 w-full p-12 pb-24 shadow-md field">
                
                {/* The DELETE button. */}
                <div className="flex absolute md:top-4 right-4 space-x-2">
                    <button
                    onClick={deleteRecipeHandler(recipe)} // Call deleteHandler when clicked.
                    className="bg-gray-500 hover:bg-red-400 p-4 shadow-md w-auto">
                        DELETE
                    </button>
                </div>

                <h1>{recipe.name}</h1>

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
const IngredientList = ({recipe}) => {
    return(
        <div className="md:w-1/2 shadow-t-md">
            <ModeButton text="Ingredients" />
            <table className="table-auto w-full">
                <tbody className="divide-y">
                    {recipe.ingredients.map(ingredient => <Ingredient key={ingredient.id} ingredient={ingredient} />)}
                </tbody>
            </table>
        </div>
    );
}

// A single ingredient. Consists of amount, unit and the name of the ingredient.
const Ingredient = ({ingredient}) => {
    return(
        <tr className="w-full">
            <td className="w-1/5 p-2 text-right">{ingredient.amount} {ingredient.unit}</td>
            <td className="w-4/5 p-2">{ingredient.name}</td>
        </tr>
    );
} 

// Instructions of the given recipe are listed.
// WIP (recipes don't have instructions yet).
const Instructions = ({recipe}) => {
    return(
        <div className="table-auto md:w-1/2 shadow-t-md">
            <ModeButton text="Instructions" />
            <ul className="list-disc m-4 space-y-2">
                <li>asdasdasdasd</li>
                <li>asdasdasdasd</li>
                <li>asdasdasdasd</li>
                <li>asdasdasdasd</li>
            </ul>
        </div>
    );
}

// This button is used to display ingredients/instructions on the RecipeInfo box.
// WIP (currently both are visible side by side, only one should be visible at a time).
const ModeButton = ({text}) => {
    
    return(
        <button
        className="bg-yellow-200 rounded-t-xl px-4 text-black">
            {text}
        </button>
    );
}

export default MyRecipes;