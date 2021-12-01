import React, { useState, useEffect } from 'react';
import recipeService from '../services/recipes';

export const RecipeGrid = ({ text }) => {
    const [columnList, setColumnList] = useState({ columns: [] });

    const [columnNumber, setColumnNumber] = useState(1);

    const [screenDimensions, setScreenDimensions] = useState(getWindowDimensions());
    
    //const [allRecipes, setAllRecipes] = useState(null); 
    let allRecipes = null;

    useEffect(() => {
        recipeService
            .getAll()
            .then(initialRecipes => {
                //setAllRecipes(initialRecipes);
                allRecipes = initialRecipes;
                handleResize();
            });
    }, []);

    useEffect(() => {
        window.addEventListener('resize', handleResize);
        return () => window.removeEventListener('resize', handleResize);
    }, []);

    const populateColumns = (recipes) => {
        console.log(recipes);

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
                copy.columns[i].recipes.push({name: "testi"});
            }
        }
        

        setColumnList(copy);
    }

    function handleResize() {
        const width = getWindowDimensions().width;
        setScreenDimensions(getWindowDimensions());
        
        switch (true) {
            case (width <= 640):
                console.log("sm");
                setColumnNumber(2);
                break;
    
            case (width <= 768):
                console.log("md");
                setColumnNumber(3);
                break;
    
            case (width <= 1024):
                console.log("lg");
                setColumnNumber(3);
                break;
    
            case (width <= 1280):
                console.log("xl");
                setColumnNumber(4);
                break;
    
            case (width <= 1536):
                console.log("2xl");
                setColumnNumber(4);
                break;
        }
        console.log(columnNumber)
        populateColumns(allRecipes);
    }
    
    return (
        <div className="flex space-x-4 px-6">
            {columnList.columns === null ? null : columnList.columns.map(column => <Column key={column.id} recipes={column.recipes} />)}
        </div>
    );
}

function getWindowDimensions() {
    const { innerWidth: width, innerHeight: height } = window;
    return {
        width,
        height
    };
}

/* export default function useWindowDimensions() {

    const [windowDimensions, setWindowDimensions] = useState(getWindowDimensions());

    useEffect(() => {
        function handleResize() {
            setWindowDimensions(getWindowDimensions());
        }

        window.addEventListener('resize', handleResize);
        return () => window.removeEventListener('resize', handleResize);
    }, []);

    return windowDimensions;
} */

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