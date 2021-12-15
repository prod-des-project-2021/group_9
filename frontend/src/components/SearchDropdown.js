import React from 'react';

const SearchDropdown = ({ filteredRecipes, onItemClickHandler }) => {
    return (
        <div className="absolute bg-white rounded-bl-md rounded-br-md w-full z-50">
            <SearchList recipes={filteredRecipes} onItemClickHandler={onItemClickHandler} />
        </div>
    )
}

const SearchList = ({ recipes, onItemClickHandler }) => {
    if (recipes === null) {
        return null;
    }
    
    let r = recipes;

    if (r.length > 5) {
        r = r.slice(0, 5);
    }

    const handleOnMouseDown = e => {
        e.preventDefault();
    }

    return (
    <ul className="divide-y-2 divide-gray-200 divide-solid">
        {r.map(recipe =>
            <li key={recipe.id}><button className="px-4 py-2 hover:bg-gray-200 w-full h-full text-left" 
            onMouseDown={handleOnMouseDown}
            onClick={onItemClickHandler(recipe.id)} >
                {recipe.name}
                </button>
            </li>
        )}
    </ul>
    );
}


export default SearchDropdown;