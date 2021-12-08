import React, { useState, useEffect } from 'react';
import Card from "./Card";

function SearchList( {filteredRecipes} ) {

    //const [filteredRecipe, setFilteredRecipe] = useState(null); 

/*     const recipes = null;

    useEffect(() => {
        recipeService
            .getAll()
            .then(initialRecipes => {
                recipes = initialRecipes;
                console.log(initialRecipes);
            });
    }, []); */
     
    const filtered = filteredRecipes.map(recipe => 
        <ul className="">
            <li className="px-4 py-2">{recipe.name}</li>
        </ul>
    );

    return (
        <div className="absolute bg-white rounded-bl-md rounded-br-md w-full divide-y-2 divide-grey-600 divide-solid">
            {filtered.length < 3 ? filtered : null}
        </div>
    )

}

export default SearchList;