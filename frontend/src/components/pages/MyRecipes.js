import React from 'react';

const MyRecipes = () => {
    const ingredients = [
        {
            id: 0,
            text: "olive oil",
            amount: "1",
            unit: "tbsp"
        },
        {
            id: 1,
            text: "smoked streaky bacon, finely chopped",
            amount: "4",
            unit: "rashers"
        },
        {
            id: 2,
            text: "medium onions, finely chopped",
            amount: "2",
            unit: ""
        },
        {
            id: 3,
            text: "carrots, trimmer and finely chopped",
            amount: "2",
            unit: ""
        },
        {
            id: 4,
            text: "celery sticks, finely chopped",
            amount: "2",
            unit: ""
        },
        {
            id: 5,
            text: "celery sticks, finely chopped",
            amount: "2",
            unit: ""
        },
        {
            id: 6,
            text: "celery sticks, finely chopped",
            amount: "2",
            unit: ""
        },
        {
            id: 7,
            text: "celery sticks, finely chopped",
            amount: "2",
            unit: ""
        },
        {
            id: 8,
            text: "celery sticks, finely chopped",
            amount: "2",
            unit: ""
        },
        {
            id: 9,
            text: "celery sticks, finely chopped",
            amount: "2",
            unit: ""
        },
        {
            id: 10,
            text: "celery sticks, finely chopped",
            amount: "2",
            unit: ""
        },
    ];

    return (
        <div className="bg-yellow-100">
            <div className="bg-yellow-200 flex items-center h-16">
                <Mode text="My Recipes" />
                <Mode text="Favorites" />
                <Mode text="Categories" />
            </div>

            <div className="flex py-3">
                <div className="w-1/3">
                    <div className="bg-gray-50 p-6 m-2">
                        main courses
                    </div>
                    <RecipeListing text="Spaghetti Bolognese" />
                    <RecipeListing text="Fried Chicken And Ketchup" />
                </div>
                <div className="bg-gray-50 w-full p-2 m-2 border-2 border-gray-400 shadow-md">
                    <div>
                        Spaghetti Bolognese
                    </div>
                    <div className="flex">
                        <div className="bg-yellow-200 rounded-t-xl px-4">ingredients</div>
                        <div className="bg-gray-400 rounded-t-xl px-4">instructions</div>
                    </div>
                    <IngredientList ingredients={ingredients} />
                </div>

            </div>
        </div>
    );
};

const Mode = ({text}) => {
    return(
        <div className="hover:bg-yellow-50 flex flex-col w-screen h-16 items-center">
            {text}
        </div>
    );
}

const RecipeListing = ({text}) => {
    return(
        <div className="bg-gray-50 hover:bg-yellow-200 p-6 m-2 border-2 border-gray-400 shadow-md">
            {text}
        </div>
    );
}

const IngredientList = ({ingredients}) => {
    return(
        <ul>
            {ingredients.map(ingredient => <Ingredient key={ingredient.id} text={ingredient.text} amount={ingredient.amount} unit={ingredient.unit} />)}
        </ul>
    );
}

const Ingredient = ({text, amount, unit}) => {
    return(
        <li>
            {amount} {unit} {text}
        </li>
    );
} 

export default MyRecipes;