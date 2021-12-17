import React, { useState, useEffect } from 'react';
import CustomizedDialogs from '../Popup';
import recipeService from '../../services/recipes';
import userService from '../../services/users';

import Form from '../Form'


import RecipeGrid from '../RecipeGrid';

import localUser from '../../utils/localUser';



const MyRecipes = () => {
    const [recipes, setRecipes] = useState(null);
    const [selectedRecipe, setSelectedRecipe] = useState(null);
    const [filter, setFilter] = useState("myRecipes");


    //const params = new URLSearchParams([['user', localUser.getUserId()]])
    useEffect(() => {
        userService
            .getUser(localUser.getUserId)
            .then(user => {
                console.log(user);
                setRecipes(user.recipes);
            });
    }, []);


    // This functions is called when on the filter buttons is pressed.
    // WIP (doesn't do anything, since all of the recipes are currently fetched form the database).
    const selectFilterHandler = (filter) => () => {
        setFilter(filter);
    }

    return (
        <div className="font-Mali">
            <div className="bg-yellow-200 flex items-center h-16">
                <FilterButton text="My Recipes" selectFilterHandler={selectFilterHandler("myRecipes")} />
                <FilterButton text="Favorites" selectFilterHandler={selectFilterHandler("favorites")} />
            </div>

            <CustomizedDialogs>
                <Form />
            </CustomizedDialogs>

            <RecipeGrid recipes={recipes} />
        </div>
    );
};

// A button used to select the filter.
const FilterButton = ({ text, selectFilterHandler }) => {
    return (
        <button
            onClick={selectFilterHandler}
            className="hover:bg-yellow-50 w-full h-16">
            {text}
        </button>
    );
}



export default MyRecipes;