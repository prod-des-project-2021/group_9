import React, { useState } from 'react';
import Container from '@material-ui/core/Container';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import IconButton from '@material-ui/core/IconButton';
import RemoveIcon from '@material-ui/icons/Remove';
import AddIcon from '@material-ui/icons/Add';
import Icon from '@material-ui/core/Icon';
import { v4 as uuidv4 } from 'uuid';
import { makeStyles } from '@material-ui/core/styles';
import recipeService from '../services/recipes';

const useStyles = makeStyles((theme) => ({
  root: {
    '& .MuiTextField-root': {
      margin: theme.spacing(1),
    },
  },
  button: {
    margin: theme.spacing(1),
  }
}))

function Form() {
  const classes = useStyles()

  const [recipe, setRecipe] = useState({
    name: [{ id: uuidv4(), text: '' }],
    ingredients: [{ id: uuidv4(), name: '', amount: '', unit: '' }],
    steps: [{ id: uuidv4(), text: '' }]
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(recipe);
    recipeService.create(recipe)
  };

  const handleChangeInput = (id, event) => {
    const newRecipe = {...recipe}
    newRecipe.ingredients = recipe.ingredients.map(i => {
      if (id === i.id) {
        i[event.target.name] = event.target.value
      }
      return i;
    })
    setRecipe(newRecipe);
  }

  const handleChangeInput2 = (id, event) => {
    const newRecipe = {...recipe}
    newRecipe.steps = recipe.steps.map(i => {
      if (id === i.id) {
        i.text = event.target.value
      }
      return i;
    })
    setRecipe(newRecipe)
  }

  const handleChangeInput3 = (id, event) => {
    const newRecipe = {...recipe}
    newRecipe.name = recipe.name.map(i => {
      if (id === i.id) {
        i.text = event.target.value
      }
      return i;
    })
    setRecipe(newRecipe)
  }


  const handleAddFields = () => {
    const newRecipe = {...recipe}
    newRecipe.ingredients.push({ id: uuidv4(), name: '', amount: '', unit: '' })
    setRecipe(newRecipe)
  }

  const handleAddFields2 = () => {
    const newRecipe = {...recipe}
    newRecipe.steps.push({ id: uuidv4(), text: '' })
    setRecipe(newRecipe)
  }



  const handleRemoveFields = id => {
    const newRecipe = {...recipe}
    newRecipe.ingredients.splice(newRecipe.ingredients.findIndex(ingredient => ingredient.id === id), 1);
    setRecipe(newRecipe);
  }

  const handleRemoveFields2 = id => {
    const newRecipe = {...recipe}
    newRecipe.steps.splice(newRecipe.steps.findIndex(step => step.id === id), 1);
    setRecipe(newRecipe);
  }



  return (
    <Container>
      
      <form className={classes.root} onSubmit={handleSubmit}>
        {recipe.name.map(name => (
          <div key={name.id}>
            <TextField          
              name="name"
              label="Recipe name"
              variant="filled"
              value={name.text}
              onChange={event => handleChangeInput3(name.id, event)}
            />
          </div>
        ))}
        <h1>Add ingredients</h1>
        {recipe.ingredients.map(ingredient => (
          <div key={ingredient.id}>
            <TextField
              name="name"
              label="Ingredient Name"
              variant="filled"
              value={ingredient.name}
              onChange={event => handleChangeInput(ingredient.id, event)}
            />
            <TextField
              name="amount"
              label="Amount"
              variant="filled"
              value={ingredient.amount}
              onChange={event => handleChangeInput(ingredient.id, event)}
            />
            <TextField
              name="unit"
              label="Unit"
              variant="filled"
              value={ingredient.unit}
              onChange={event => handleChangeInput(ingredient.id, event)}
            />
            <IconButton disabled={recipe.ingredients.length === 1} onClick={() => handleRemoveFields(ingredient.id)}>
              <RemoveIcon />
            </IconButton>
            <IconButton
              onClick={handleAddFields}
            >
              <AddIcon />
            </IconButton>
          </div>
        ))}

        <h1>Instructions</h1>
        {recipe.steps.map(step => (
          <div key={step.id}>
            <TextField
              fullWidth = "90%"
              name="step"
              label="Step"
              variant="filled"
              value={step.text}
              onChange={event => handleChangeInput2(step.id, event)}
            />
            <IconButton disabled={recipe.steps.length === 1} onClick={() => handleRemoveFields2(step.id)}>
              <RemoveIcon />
            </IconButton>
            <IconButton
              onClick={handleAddFields2}
            >
              <AddIcon />
            </IconButton>

          </div>
        ))}
        <Button
          className={classes.button}
          variant="contained"
          color="primary"
          type="submit"
          endIcon={<Icon>send</Icon>}
          onClick={handleSubmit}
        >Save recipe</Button>
      </form>
    </Container>
  );
}

export default Form;