const ingredientList = require('./ingredients')

const units = ['tbsp.', 'cups', 'pinch', 'oz.', 'qt.', 'pieces']
const prefixes = [
    'roasted', 'grilled', 'mashed', 'sour', 'fruity', 'nutty',
    'rich', 'sweet', 'yeasty', 'briny', 'bittersweet', 'creamy',
    'fizzy', 'fluffy', 'crusty', 'buttery', 'silky', 'tender',
    'baked', 'fried', 'caramelized', 'glazed', 'marinated', 'smoked', 'whipped'
]
const names = ['Kristian', 'Juho', 'Niina', 'Jenna', 'Iikka']

/* ingredients: [
    {
        name: olives,
        amount: 2,
        unit: pieces
    }
] */

const createRecipe = () => {
    // pick 3 to 5 ingredients
    const ingredientAmount = Math.floor(Math.random() * 4) + 3
    let ingredients = []
    for (let i = 0; i < ingredientAmount; i++) {
        const randomItem = ingredientList[Math.floor(Math.random() * ingredientList.length)]
        ingredients = ingredients.concat({ name: randomItem })
    }

    // set 'amount' value and unit for each ingredient
    ingredients.forEach((ingredient) => {
        const amount = Math.ceil(Math.random() * 10)
        const unit = units[Math.floor(Math.random() * units.length)]
        ingredient.amount = amount
        ingredient.unit = unit
    })

    // pick one of selected ingredients and use it for the name
    // and maybe add another random prefix for the name
    const prefix = prefixes[Math.floor(Math.random() * prefixes.length)]
    const food = ingredients[Math.floor(Math.random() * ingredients.length)].name
    const foodName = `${capitalize(prefix)} ${capitalize(food)}`

    const user = names[Math.floor(Math.random() * names.length)]

    return { name: foodName, user, ingredients }
}

// helper function for capitalizing a word...
const capitalize = (str) => {
    const lower = str.toLowerCase()
    return str.charAt(0).toUpperCase() + lower.slice(1)
}

module.exports = createRecipe