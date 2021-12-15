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
import ImageUpload from './ImageUpload'

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



function Form({ handleClose }) {
  const classes = useStyles()

  
  const [recipe, setRecipe] = useState({
    name: '' ,
    ingredients: [{ id: uuidv4(), name: '', amount: '', unit: '' }],
    steps: [{ id: uuidv4(), text: '' }]
  });

  const [image, setImage] = useState(null)
  // set this to true when validation checks out!! should be defaulted to false!!!
  const [buttonEnabled, setButtonEnabled] = useState(true)

  const handleSubmit = (e) => {
    e.preventDefault();
    let formData = new FormData()
    formData.append("file", image)
    formData.append("name", recipe.name)
    formData.append("ingredients", JSON.stringify(recipe.ingredients))
    formData.append("steps", JSON.stringify(recipe.steps))
    setButtonEnabled(false)
    recipeService.create(formData)
        .then(() => {
            // close the form window and reload the page?
            handleClose()
            window.location.reload()
        })
        .catch(() => {
            // print error message as global notification window??
        })
  }

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

  const handleChangeInput3 = (event) => {
    const newRecipe = {...recipe}
    newRecipe.name = event.target.value 
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



  const imageCallback = (image) => {
    setImage(image)
  }



  return (
    <Container>
      
      <form className={classes.root} onSubmit={handleSubmit}>
          <div>
          <h1>Add name</h1>
            <TextField          
              name="name"
              label="Recipe name"
              variant="filled"
              value={recipe.name}
              onChange={handleChangeInput3}
            />
            <div>{recipe.name}</div>
          </div>
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
        <h1>Upload picture of the food</h1>
        <ImageUpload callback={imageCallback} />
        <Button
          className={classes.button}
          variant="contained"
          color="primary"
          type="submit"
          onClick={handleSubmit}
          disabled={!buttonEnabled}
        >Save recipe</Button>
      </form>
    </Container>
  );
}

export default Form;