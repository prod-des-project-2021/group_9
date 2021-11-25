import React, { useState, useEffect } from 'react';
import recipeService from '../services/recipes';

export const RecipeGrid = ({ text }) => {
    const [columnList, setColumnList] = useState({ columns: [] });

    const [columnNumber, setColumnNumber] = useState(4);
    useEffect(() => {
        recipeService
            .getAll()
            .then(initialRecipes => {
                let copy = { columns: [] };

                for (let i = 0; i < columnNumber; i++) {
                    copy.columns.push({id: i, recipes: [], currentHeight: 0});
                }

                for (let i = 0; i < initialRecipes.length; i++) {

                    copy.columns[i % columnNumber].recipes.push(initialRecipes[i]);
                }
                
                console.log(copy.columns[0]);
                setColumnList(copy);
            });
    }, []);

    return (
        <div className="flex space-x-4 px-6">
            {columnList.columns === null ? null : columnList.columns.map(column => <Column key={column.id} recipes={column.recipes} />)}     
        </div>
    );
}

const RecipeListing = ({ text, clickHandler }) => {
    return (
        <button
            onClick={clickHandler}
            className="bg-gray-50 hover:bg-yellow-200 p-6 border-gray-400 shadow-md w-full rounded-xl">
            {text}
        </button>
    );
}

const Column = ({ recipes }) => {
    return (
        <div className="w-1/3 space-y-5">
            {recipes === null ? null : recipes.map(recipe => <RecipeListing key={recipe.id} text={recipe.name} />)}
        </div>
    )
}

export default RecipeGrid;