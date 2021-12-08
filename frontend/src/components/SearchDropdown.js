import React from 'react';

const SearchDropdown = ({ filteredRecipes }) => {
    return (
        <div className="absolute bg-white rounded-bl-md rounded-br-md w-full">
            <SearchList recipes={filteredRecipes} />
        </div>
    )
}

const SearchList = ({ recipes }) => {
    if (recipes === null) {
        return null;
    }
    
    let r = recipes;

    if (r.length > 5) {
        r = r.slice(0, 5);
        console.log(r);
    }

    return (
    <ul className="divide-y-2 divide-gray-200 divide-solid">
        {r.map(recipe =>
            <li className="px-4 py-2 hover:bg-gray-200">{recipe.name}</li>
        )}
    </ul>
    );
}


export default SearchDropdown;