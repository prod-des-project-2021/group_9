import React, { useState, useEffect } from 'react';

const MyRecipes = () => {
    const recipes = [
        {   
            id: 0,
            name: "Spaghetti Bolognese",
            ingredients: [
                {
                    id: 0,
                    text: "olive oil",
                    amount: "1",
                    unit: "tbsp"
                },
                {
                    id: 1,
                    text: "smoked streaky bacon, finely chopped",
                    amount: "4",
                    unit: "rashers"
                },
                {
                    id: 2,
                    text: "medium onions, finely chopped",
                    amount: "2",
                    unit: ""
                },
                {
                    id: 3,
                    text: "carrots, trimmer and finely chopped",
                    amount: "2",
                    unit: ""
                },
                {
                    id: 4,
                    text: "celery sticks, finely chopped",
                    amount: "2",
                    unit: ""
                },
                {
                    id: 5,
                    text: "celery sticks, finely chopped",
                    amount: "2",
                    unit: ""
                },
                {
                    id: 6,
                    text: "celery sticks, finely chopped",
                    amount: "2",
                    unit: ""
                },
                {
                    id: 7,
                    text: "celery sticks, finely chopped",
                    amount: "2",
                    unit: ""
                },
                {
                    id: 8,
                    text: "celery sticks, finely chopped",
                    amount: "2",
                    unit: ""
                },
                {
                    id: 9,
                    text: "celery sticks, finely chopped",
                    amount: "2",
                    unit: ""
                },
                {
                    id: 10,
                    text: "celery sticks, finely chopped",
                    amount: "2",
                    unit: ""
                },
            ]
        },
        {   
            id: 1,
            name: "Fried Chicken And Ketchup",
            ingredients: [
                {
                    id: 0,
                    text: "chicken",
                    amount: "1",
                    unit: ""
                },
                {
                    id: 1,
                    text: "ketchup",
                    amount: "some",
                    unit: ""
                },
            ]
        },
        {   
            id: 2,
            name: "Fried Chicken And Ketchup (again)",
            ingredients: [
                {
                    id: 0,
                    text: "chicken",
                    amount: "1",
                    unit: ""
                },
                {
                    id: 1,
                    text: "ketchup",
                    amount: "some",
                    unit: ""
                },
            ]
        },
        {   
            id: 3,
            name: "Potatoes, Ketchup And Onions",
            ingredients: [
                {
                    id: 0,
                    text: "potatoes",
                    amount: "3",
                    unit: ""
                },
                {
                    id: 1,
                    text: "ketchup",
                    amount: "some",
                    unit: ""
                },
                {
                    id: 2,
                    text: "medium onions, finely chopped",
                    amount: "2",
                    unit: ""
                },
            ]
        }
    ]

    const [selectedRecipe, setSelectedRecipe] = useState(null);

    const selectRecipeHandler = (recipe) => () => {
        setSelectedRecipe(recipe);
    }

    return (
        <div className="bg-yellow-100 font-Mali">
            <div className="bg-yellow-200 flex items-center h-16">
                <Mode text="My Recipes" />
                <Mode text="Favorites" />
                <Mode text="Categories" />
            </div>

            <div className="lg:flex py-3 mx-4 space-x-4">
                <RecipeList recipes={recipes} clickHandler={selectRecipeHandler}/>
                <RecipeInfo recipe={selectedRecipe} />
            </div>
        </div>
    );
};

const Mode = ({text}) => {
    return(
        <button className="hover:bg-yellow-50 w-full h-16">
            {text}
        </button>
    );
}

const RecipeList = ({recipes, clickHandler}) => {
    return(
        <div className="w-full lg:w-1/4 space-y-2">
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
        <ul className="mx-6 mb-12 shadow-t-md">
            {recipe.ingredients.map(ingredient => <Ingredient key={ingredient.id} text={ingredient.text} amount={ingredient.amount} unit={ingredient.unit} />)}
        </ul>
    );
}

const Ingredient = ({text, amount, unit}) => {
    return(
        <li>
            {amount} {unit} {text}
        </li>
    );
} 

export default MyRecipes;