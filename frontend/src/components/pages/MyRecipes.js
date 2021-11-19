import React from 'react';

const MyRecipes = () => {
    return (
        <div>
            <div class="bg-yellow-200 flex items-center justify-between h-16">
                <div class="hover:bg-yellow-50 flex flex-col w-screen h-16 items-center">My Recipes</div>
                <div class="hover:bg-yellow-50 flex flex-col w-screen h-16 items-center">Favorites</div>
                <div class="hover:bg-yellow-50 flex flex-col w-screen h-16 items-center">Categories</div>
            </div>
        </div>
    );
};


export default MyRecipes;