import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

import icon_favorite from './img/favorite_white_24dp.svg';
import icon_favorite_border from './img/favorite_border_white_24dp.svg';

import { useDispatch, useSelector } from 'react-redux';

export const RecipeGrid = ({ recipes }) => {
    const [columnList, setColumnList] = useState({ columns: [] });

    const [columnNumber, setColumnNumber] = useState(1);

    const screenSize = useWindowSize();

    const navigate = useNavigate();

    const auth = useSelector(state => state.auth);

    const onClickRecipe = (id) => () => {
        navigate(`/recipe?id=${id}`);
    }

    return (
        <div className="flex space-x-4 px-6 pb-16 pt-4 lg:mx-24">
            {populateColumns(recipes, calculateColumnNumber(screenSize.width)).columns === null
                ? null
                : populateColumns(recipes, calculateColumnNumber(screenSize.width)).columns.map(column =>
                    <Column key={column.id} recipes={column.recipes} onItemClickHandler={onClickRecipe} auth={auth} />
                )}
        </div>
    );
}

function calculateColumnNumber(width) {
    switch (true) {
        case (width <= 640):
            return 2;

        case (width <= 768):
            return 3;

        case (width <= 1024):
            return 3;

        case (width <= 1280):
            return 4;

        case (width <= 1536):
            return 5;
    }
    return 5;
}

function populateColumns(recipes, columnNumber) {
    let copy = { columns: [] };

    for (let i = 0; i < columnNumber; i++) {
        copy.columns.push({ id: i, recipes: [], currentHeight: 0 });
    }

    if (recipes !== null) {
        for (let i = 0; i < recipes.length; i++) {
            copy.columns[i % columnNumber].recipes.push(recipes[i]);
        }

    }

    return copy;
}

function useWindowSize() {
    const [windowSize, setWindowSize] = useState({
        width: undefined,
        height: undefined,
    });
    useEffect(() => {
        // Handler to call on window resize
        function handleResize() {
            // Set window width/height to state
            setWindowSize({
                width: window.innerWidth,
                height: window.innerHeight,
            });
        }
        // Add event listener
        window.addEventListener("resize", handleResize);
        // Call handler right away so state gets updated with initial window size
        handleResize();
        // Remove event listener on cleanup
        return () => window.removeEventListener("resize", handleResize);
    }, []); // Empty array ensures that effect is only run on mount
    return windowSize;
}

const RecipeListing = ({ recipe, clickHandler, auth }) => {
    return (
        <div className='relative shadow-lg rounded-xl bg-gray-50'>
            <img src={recipe.url ? recipe.url : ""}
                className="border-gray-400 w-full rounded-t-xl" />

            <div className="border-gray-400  w-full p-4 rounded-b-xl">
                {recipe.name}
            </div>

            {auth.isLoggedIn
                ? <div className="absolute top-2 right-2 w-8 h-8 p-1">
                    {!auth.user.favorites.includes(recipe.id)
                        ? <img src={icon_favorite_border} /> : <img src={icon_favorite} />
                    }
                </div>
                : null
            }

            <button
                onClick={clickHandler}
                className='absolute top-0 left-0 hover:bg-white rounded-xl hover:opacity-20 w-full h-full '>
            </button>
        </div >
    );
}

const Column = ({ recipes, onItemClickHandler, auth }) => {
    return (
        <div className="w-full space-y-5">
            {recipes === null ? null : recipes.map(recipe => <RecipeListing key={recipe.id}
                recipe={recipe} clickHandler={onItemClickHandler(recipe.id)} auth={auth} />)}
        </div>
    )
}

export default RecipeGrid;