import React, { useState, useEffect } from 'react';
import { Row, Col, Card } from 'tailwind-react-ui'
import recipeService from '../services/recipes';

export const RecipeGrid = ({ text }) => {
    const [recipes, setRecipes] = useState(null);
    const [columnList, setColumnList] = useState({columns:[ [],[],[] ]});

    useEffect(() =>
    {
        recipeService
        .getAll()
        .then(initialRecipes =>
        {
            let copy = {columns:[ [],[],[] ]};

            for (let i = 0; i < initialRecipes.length; i++) {

                copy.columns[i % 3].push(initialRecipes[i]);
            }
            console.log(copy);
            setColumnList(copy);
        });
    }, []);

    const RecipeListing = ({text, clickHandler}) => {
        return(
                <button
                onClick={clickHandler}
                className="bg-gray-50 hover:bg-yellow-200 p-6 border-gray-400 shadow-md w-full rounded-xl">
                    {text}
                </button>
        );
    }

    return (
        <div className="flex space-x-4">
                <div className="w-1/3 space-y-5">
                        {columnList.columns[0] === null ? null : columnList.columns[0].map(recipe => <RecipeListing key={recipe.id} text={recipe.name} />)}
                </div>
                <div className="w-1/3 space-y-5">
                        {columnList.columns[1] === null ? null : columnList.columns[1].map(recipe => <RecipeListing key={recipe.id} text={recipe.name} />)}
                </div>
                <div className="w-1/3 space-y-5">
                        {columnList.columns[2] === null ? null : columnList.columns[2].map(recipe => <RecipeListing key={recipe.id} text={recipe.name} />)}
                </div>
        </div>
    );
}

export default RecipeGrid;