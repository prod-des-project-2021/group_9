import React, { useState, useEffect } from 'react';
import recipeService from './../../services/recipes';

const MyRecipes = () => {
    const [recipes, setRecipes] = useState(null);
    const [selectedRecipe, setSelectedRecipe] = useState(null);
    const [mode, setMode] = useState("ingredients");
    const [filter, setFilter] = useState("myRecipes");
    const [columnList, setColumnList] = useState({columns: []});

    const addRecipeToColumn = (i, recipe) => {
        const copy = columnList;
        copy.columns[i].push(recipe);

        setColumnList(copy);
    }

    const selectRecipeHandler = (recipe) => () => {
        setSelectedRecipe(recipe);
        setMode("ingredients");
    }

    const deleteRecipeHandler = (recipe) => () => {
        recipeService
        .deleteRecipe(recipe.id)
        .then(initialRecipes => {
            const copy = recipes.filter(r => r.id !== recipe.id);
            setRecipes(copy);

            setSelectedRecipe(null);
        });
    }

    const selectModeHandler = (mode) => () => {
        setMode(mode);
    }

    const selectFilterHandler = (filter) => () => {
        setFilter(filter);
    }

    useEffect(() => {
        recipeService
        .getAll()
        .then(initialRecipes => {
            //console.log(initialRecipes);
            setRecipes(initialRecipes);
        });
    }, []);

    return (
        <div className="bg-yellow-100 font-Mali">
            <div className="bg-yellow-200 flex items-center h-16">
                <Mode text="My Recipes" clickHandler={selectFilterHandler("myRecipes")} />
                <Mode text="Favorites" clickHandler={selectFilterHandler("favorites")} />
                <Mode text="Categories" clickHandler={selectFilterHandler("categories")} />
            </div>

            <div className="lg:flex py-3 mx-4 space-x-4">
                <RecipeList recipes={recipes} clickHandler={selectRecipeHandler} />
                <div className="w-3/4">
                    <RecipeInfo recipe={selectedRecipe} mode={mode} clickHandler={selectModeHandler} deleteHandler={deleteRecipeHandler} />
                </div>
            </div>
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

const RecipeList = ({recipes, clickHandler, deleteHandler}) => {
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
        className="bg-gray-50 hover:bg-yellow-200 p-6 shadow-md w-full text-left">
            {text}
        </button>
    );
}

const RecipeInfo = ({recipe, mode, clickHandler, deleteHandler}) => {
    if(recipe !== null) {
        return(
            <div className="relative bg-gray-50 w-full p-12 pb-24 shadow-md">
                <button
                onClick={deleteHandler(recipe)}
                className="absolute top-4 right-4 bg-gray-500 hover:bg-red-400 p-4 shadow-md w-auto">
                    DELETE
                </button>

                <div>
                    <h1>{recipe.name}</h1>
                </div>

                <div className="flex mx-6 mb-4 space-x-1">
                    <ModeButton text="Ingredients" clickHandler={clickHandler("ingredients")} isSelected={mode === "ingredients"} />
                    <ModeButton text="Instructions" clickHandler={clickHandler("instructions")} isSelected={mode === "instructions"} />
                </div>

                <div className="lg:flex">
                    <IngredientList recipe={recipe} />
                    <Instructions recipe={recipe} />
                </div>
            </div>
        );
    }
    else {
        return(
            <div className="bg-gray-50 w-full p-8 shadow-md">
                NOTHING
            </div>
        );
    }
}

const IngredientList = ({recipe}) => {
    return(
        <table className="table-auto w-1/2 mx-6 shadow-t-md">
            <tbody className="divide-y">
                {recipe.ingredients.map(ingredient => <Ingredient key={ingredient.id} ingredient={ingredient} />)}
            </tbody>
        </table>
    );
}

const Ingredient = ({ingredient}) => {
    return(
        <tr>
            <td className="w-24 p-2 text-right">{ingredient.amount} {ingredient.unit}</td>
            <td className="p-2">{ingredient.name}</td>
        </tr>
    );
} 

const Instructions = ({recipe}) => {
    return(
        <table className="table-auto w-1/2 mx-6 shadow-t-md">
            <tbody className="divide-y">
                {recipe.ingredients.map(ingredient => <Ingredient key={ingredient.id} ingredient={ingredient} />)}
            </tbody>
        </table>
    );
}

const ModeButton = ({text, clickHandler, isSelected}) => {
    
    if(isSelected) {
        return(
            <button
            onClick={clickHandler}
            className="bg-yellow-200 rounded-t-xl px-4 text-black">
                {text}
            </button>
        );
    }
    else {
        return(
            <button
            onClick={clickHandler}
            className="bg-gray-400 rounded-t-xl px-4 text-white">
                {text}
            </button>
        );
    }
}

export default MyRecipes;