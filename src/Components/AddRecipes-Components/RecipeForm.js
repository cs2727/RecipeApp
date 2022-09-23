import classes from './RecipeForm.module.css';
import { useRef, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import PageHeader from '../Reusable-Components/PageHeader';
import { recipeLibaryInformation } from '../../Context/RecipeLibaryContext';
import firebase from '../../firebase';
import 'firebase/auth';
import 'firebase/storage';

function Recipeform() {
  const submitButton = useRef();
  const reDirect = useNavigate();
  const recipeName = useRef();
  const recipeDish = useRef();
  const recipePreparation = useRef();
  const recipeServings = useRef();
  const recipeCookingTime = useRef();
  const recipeShelfLife = useRef();
  const recipeIngredients = useRef();
  const recipeImage = useRef();
  const recipeDirections = useRef();
  const recipeLibaryInfo = useContext(recipeLibaryInformation);

  // Add Recipe Function Handler ----------------------------->
  async function addRecipeHandler(event) {
    event.preventDefault();

    const time = new Date().getTime();
    let date = new Date(time).toString();
    date = date.split(' ');
    date.splice(5);
    date = date.join(' ');

    if (firebase.auth().currentUser === null) {
      alert('Must be signed in to add recipes!');
      return;
    }

    submitButton.current.disabled = true;
    submitButton.current.style.filter = 'brightness(60%)';

    const recipeData = {
      userId: firebase.auth().currentUser.uid,
      Name: recipeName.current.value,
      Dish: recipeDish.current.value,
      Preparation: recipePreparation.current.value,
      Servings: recipeServings.current.value,
      CookingTime: recipeCookingTime.current.value,
      ShelfLife: recipeShelfLife.current.value,
      Image: recipeImage.current.files[0],
      Ingredients: recipeIngredients.current.value,
      Directions: recipeDirections.current.value,
      submissionDate: date,
      displayName: firebase.auth().currentUser.displayName,
    };

    const imageStorageRef = firebase
      .storage()
      .ref(`recipeImages/${recipeData.Image.name}`);

    await imageStorageRef.put(recipeData.Image);

    let imageURL = await firebase
      .storage()
      .ref('recipeImages/')
      .child(recipeData.Image.name)
      .getDownloadURL();

    recipeData.Image = imageURL;

    fetch(
      'https://recipe-b89e7-default-rtdb.firebaseio.com/recipeLibary.json',
      {
        method: 'POST',
        body: JSON.stringify(recipeData),
        header: {
          'Content-Type': 'application/json',
        },
      }
    )
      .then(() => {
        recipeLibaryInfo.fetchRecipes();
        reDirect('/RecipeApp/recipes');
      })
      .catch((error) => {
        console.log(error);
      });
  }

  // JSX Code
  return (
    <PageHeader headerContent="Add Your Recipes?">
      <form className={classes.formContainer} onSubmit={addRecipeHandler}>
        <div className={classes.control}>
          {' '}
          {/* Recipe Name*/}
          <label htmlFor="recipe-name">Recipe Name</label>
          <input type="text" required id="recipe-name" ref={recipeName} />
        </div>

        <div className={classes.control}>
          {' '}
          {/*Dish Type */}
          <label htmlFor="dish-type">Dish Type</label>
          <select
            id="dish-type"
            name="recipelist"
            form="dishform"
            ref={recipeDish}
          >
            <option value="main-dish">Main Dish</option>
            <option value="appetizer">Appetizer</option>
            <option value="soup">Soup</option>
            <option value="salad">Salad</option>
            <option value="dessert">Dessert</option>
            <option value="drink">Drink</option>
          </select>
        </div>

        <div className={classes.control}>
          {' '}
          {/* Preparation Time */}
          <label htmlFor="preparation-time">Preparation Time</label>
          <input
            type="text"
            id="preparation-tim"
            placeholder="ex: 20 mins"
            ref={recipePreparation}
            required
          />
        </div>

        <div className={classes.control}>
          {' '}
          {/* No. Of Servings*/}
          <label htmlFor="servings">No. Of Servings?</label>
          <input
            type="text"
            id="servings"
            placeholder="ex: 4"
            ref={recipeServings}
            required
          />
        </div>

        <div className={classes.control}>
          {' '}
          {/*Cooking Time */}
          <label forhtml="cooking-time">Cooking Time</label>
          <input
            type="text"
            id="cooking-time"
            placeholder="ex: 45 mins"
            ref={recipeCookingTime}
            required
          />
        </div>

        <div className={classes.control}>
          {' '}
          {/*Shelf Life */}
          <label forhtml="shelf-life">Shelf Life (Daily)</label>
          <input
            type="text"
            id="shelf-life"
            placeholder="ex: 3"
            ref={recipeShelfLife}
            required
          />
        </div>

        <div className={classes.fileControl}>
          {' '}
          {/*Image Upload */}
          <label forhtml="image">Image</label>
          <input type="file" id="image" ref={recipeImage} required />
        </div>

        <div className={classes.control}>
          {' '}
          {/*Ingredients*/}
          <label forhtml="ingredients">Ingredients</label>
          <textarea id="ingredients" required ref={recipeIngredients} />
        </div>

        <div className={classes.control}>
          {' '}
          {/*Directions*/}
          <label forhtml="directions">Directions</label>
          <textarea id="directions" required ref={recipeDirections} />
        </div>

        <div className={classes.formNoticeContainer}>
          <p className={classes.formNotice}>
            Please wait a moment once you click submit as your recipe is being
            processed and added to the libary
          </p>
        </div>

        <div className={classes.actions}>
          {' '}
          {/*Submit Button*/}
          <input type="submit" value="Submit" ref={submitButton} />
        </div>
      </form>
    </PageHeader>
  );
}

export default Recipeform;
