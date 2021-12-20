import React, { useState, useEffect } from 'react';
import CustomizedDialogs from '../Popup';
import userService from '../../services/users';

import Form from '../Form'

import RecipeGrid from '../RecipeGrid';

import localUser from '../../utils/localUser';

const MyRecipes = () => {
    const [recipes, setRecipes] = useState(null);
    const [favorites, setFavorites] = useState(null);
    const [filter, setFilter] = useState(0); // 0 = myRecipes, 1 = favorites

    useEffect(() => {
        userService
            .getUser(localUser.getUserId())
            .then(user => {
                if (user != null) {
                    setRecipes(user.recipes);
                    setFavorites(user.favorites);
                }
            });
    }, []);

    const selectFilterHandler = (filter) => () => {
        setFilter(filter);
    }

    return (
        <div className="font-Mali">
            <div className="bg-yellow-200 flex items-center h-16">
                <FilterButton text="My Recipes" selectFilterHandler={selectFilterHandler(0)} disabled={filter === 0} />
                <FilterButton text="Favorites" selectFilterHandler={selectFilterHandler(1)} disabled={filter === 1} />
            </div>

            {filter === 0
                ? <div className="w-full flex justify-center pt-4">
                    <CustomizedDialogs>
                        <Form />
                    </CustomizedDialogs>
                </div>
                : null
            }

            <RecipeGrid recipes={filter === 0 ? recipes : favorites} />
        </div>
    );
};

const FilterButton = ({ text, selectFilterHandler, disabled }) => {
    return (
        disabled
            ? <button
                disabled={true}
                className="bg-yellow-100 w-full h-16 text-center">
                {text}
            </button>
            : <button
                onClick={selectFilterHandler}
                className="hover:bg-yellow-100 w-full h-16">
                {text}
            </button>
    );
}

export default MyRecipes;