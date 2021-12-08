import React, { useState, useEffect } from 'react';
import SearchDropdown from './SearchDropdown'
import recipeService from '../services/recipes';

function Search() {
  const [searchField, setSearchField] = useState("");
  const [recipes, setRecipes] = useState(null);
  const [showDropdown, setShowDropdown] = useState(null);

  useEffect(() => {
    recipeService
      .getAll()
      .then(initialRecipes => {
        setRecipes(initialRecipes);
        console.log(initialRecipes);
      });
  }, []);

  const filteredRecipes = (searchField.length <= 0 || recipes === null) ? null : recipes.filter(
      recipe => {
        return (
          recipe
            .name
            .toLowerCase()
            .includes(searchField.toLowerCase())
        );
      }
    ).sort((a, b) => (a.name > b.name) ? 1 : -1);

  const handleChange = e => {
    setSearchField(e.target.value);
  }

  const onFocusHandler = () => {
    setShowDropdown(true);
  }

  const onBlurHandler = () => {
    setShowDropdown(false);
  }

  return (
    <section>
      <div class="container flex mx-auto">
        <div class="flex border-2 rounded">
          <button class="flex items-center justify-center px-4 border-r">
            <svg class="w-6 h-6 text-gray-600" fill="currentColor" xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24">
              <path
                d="M16.32 14.9l5.39 5.4a1 1 0 0 1-1.42 1.4l-5.38-5.38a8 8 0 1 1 1.41-1.41zM10 16a6 6 0 1 0 0-12 6 6 0 0 0 0 12z">
              </path>
            </svg>
          </button>
          <div className="w-80 relative">
            <input type="text" class="px-4 py-2 w-full" placeholder="Search..." onChange={handleChange} onBlur={onBlurHandler} onFocus={onFocusHandler} />
            {showDropdown ? <SearchDropdown filteredRecipes={filteredRecipes} /> : null}
          </div>
        </div>
      </div>
    </section>
  );
}

export default Search;