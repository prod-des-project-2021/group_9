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
      background: '#D3D3D3',
      color: '',
      margin: theme.spacing(0.5),
    },
  },
  button: {
    color: 'black',
    background: '#A9A9A9',
    margin: theme.spacing(1),
  },
  row: {
    width: '100%'
  }
}))



function Form({ handleClose }) {
  const classes = useStyles()

  const [recipe, setRecipe] = useState({
    name: '',
    ingredients: [{ id: uuidv4(), name: '', amount: '', unit: '' }],
    steps: [{ id: uuidv4(), text: '' }]

  });

  const [error, setError] = useState({
    name: true,
    ingredients: [{ index: 0, valid: true }],
    steps: [{ index: 0, valid: true }]

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

    /* formData.append('recipe', recipe) */

    console.log(recipe);

    setButtonEnabled(false)

    if (validate()) {
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
  };


  function validate() {
    let isValid = true
    let er = { name: true, ingredients: [], steps: [] }
    if (recipe.name === "") {
      isValid = false
      er.name = false
    }
    for (let i = 0; i < recipe.steps.length; i++) {
      er.steps.push(true)
      if (recipe.steps[i].text === "") {
        er.steps[i] = false
        isValid = false
      }
    }
    for (let i = 0; i < recipe.ingredients.length; i++) {
      er.ingredients.push(true)
      if (recipe.ingredients[i].name === "") {
        er.ingredients[i] = false
        isValid = false
      }
    }
    setError(er)
    return isValid
  }

  const handleChangeInput = (id, event) => {
    const newRecipe = { ...recipe }
    newRecipe.ingredients = recipe.ingredients.map(i => {
      if (id === i.id) {
        i[event.target.name] = event.target.value
      }
      return i;
    })
    setRecipe(newRecipe);
  }

  const handleChangeInput2 = (id, event) => {
    const newRecipe = { ...recipe }
    newRecipe.steps = recipe.steps.map(i => {
      if (id === i.id) {
        i.text = event.target.value
      }
      return i;
    })
    setRecipe(newRecipe)
  }

  const handleChangeInput3 = (event) => {
    const newRecipe = { ...recipe }
    newRecipe.name = event.target.value
    setRecipe(newRecipe)
  }

  const handleAddFields = () => {
    const newRecipe = { ...recipe }
    newRecipe.ingredients.push({ id: uuidv4(), name: '', amount: '', unit: '' })
    setRecipe(newRecipe)

    const newError = { ...error }
    newError.ingredients.push(true)
    setError(newError)
  }

  const handleAddFields2 = () => {
    const newRecipe = { ...recipe }
    newRecipe.steps.push({ id: uuidv4(), text: '' })
    setRecipe(newRecipe)

    const newError = { ...error }
    newError.steps.push(true)
    setError(newError)
  }

  const handleRemoveFields = id => {
    const newRecipe = { ...recipe }

    const newError = { ...error }
    newError.ingredients.splice(newRecipe.ingredients.findIndex(ingredient => ingredient.id === id), 1);
    setError(newError)

    newRecipe.ingredients.splice(newRecipe.ingredients.findIndex(ingredient => ingredient.id === id), 1);
    setRecipe(newRecipe);
  }

  const handleRemoveFields2 = id => {
    const newRecipe = { ...recipe }

    const newError = { ...error }
    newError.steps.splice(newRecipe.steps.findIndex(step => step.id === id), 1);
    setError(newError)

    newRecipe.steps.splice(newRecipe.steps.findIndex(step => step.id === id), 1);
    setRecipe(newRecipe);
  }

  const imageCallback = (image) => {
    setImage(image)
  }

  const styles = {
    root: {
      background: "black"
    },
    input: {
      color: "white"
    }
  };

  return (
    <Container
    style={{
      borderRadius: 20,
      color: '#000000',
      backgroundColor: "#F5D142",
  }}>
      <form className={classes.root} onSubmit={handleSubmit}>
        <div>
          <h1>Add name</h1>
          <TextField
            className={classes.root}
            InputProps={{
              className: classes.input
            }}
            name="name"
            label="Recipe name"
            variant="filled"
            value={recipe.name}
            onChange={handleChangeInput3}
          />
        </div>
        {error.name ? null : <div className='text-red-500'>*Recipe name is required</div>}
        <h1>Add ingredients</h1>
        {recipe.ingredients.map((ingredient, i) => (
          <div key={ingredient.id}>
            <div className={classes.row}>
              <TextField
                backgroundColor="#E7CE19"
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
            {error.ingredients[i] ? null : <div className='text-red-500'>*Ingredient name is required</div>}
          </div>
        ))}
        <h1>Instructions</h1>
        {recipe.steps.map((step, i) => (
          <div key={step.id}>
            <TextField
              fullWidth="90%"
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
            {error.steps[i] ? null : <div className='text-red-500'>*Step is required to be filled </div>}
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