import React, { useState, useEffect } from 'react';


export const RecipeGrid = ({ recipes }) => {
    const [columnList, setColumnList] = useState({ columns: [] });

    const [columnNumber, setColumnNumber] = useState(1);

    const screenSize = useWindowSize();

    return (
        <div className="flex space-x-4 px-6"> 
            {populateColumns(recipes, calculateColumnNumber(screenSize.width)).columns === null 
            ? null 
            : populateColumns(recipes, calculateColumnNumber(screenSize.width)).columns.map(column => 
            <Column key={column.id} recipes={column.recipes} />
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
            return 4;
    }
    return 4;
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

    } else {
        for (let i = 0; i < columnNumber; i++) {
            copy.columns[i].recipes.push({ name: "testi" });
        }
    }

    return copy;
}

function useWindowSize() {
    // Initialize state with undefined width/height so server and client renders match
    // Learn more here: https://joshwcomeau.com/react/the-perils-of-rehydration/
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
        <div className="w-full space-y-5">
            {recipes === null ? null : recipes.map(recipe => <RecipeListing key={recipe.id} text={recipe.name} />)}
        </div>
    )
}

export default RecipeGrid;