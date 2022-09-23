import classes from './AddedRecipeItem.module.css';
import { recipeInformation } from '../../Context/RecipeContext';
import { recipeLibaryInformation } from '../../Context/RecipeLibaryContext';
import { favoriteRecipeInformation } from '../../Context/FavoriteContext';
import { useNavigate } from 'react-router-dom';
import { useContext, useRef } from 'react';
import firebase from '../../firebase';
import 'firebase/auth';

function AddedRecipeItem(props) {
  const overlayElement = useRef();
  const deleteTabElement = useRef();
  const configureRecipe = useContext(recipeInformation);
  const recipeLibaryInfo = useContext(recipeLibaryInformation);
  const favoriteRecipeInfo = useContext(favoriteRecipeInformation);
  const redirect = useNavigate();

  const recipeData = {
    id: props.id,
    Name: props.recipeName,
    Dish: props.recipeDish,
    Preparation: props.recipePreparation,
    Servings: props.recipeServings,
    CookingTime: props.recipeCookingTime,
    Image: props.recipeImage,
    Ingredients: props.recipeIngredients,
    Directions: props.recipeDirections,
  };

  function viewButtonHandler() {
    const recipeNameArr = props.recipeName.split('');
    for (let i = 0; i < recipeNameArr.length; i++) {
      if (recipeNameArr[i] === ' ') {
        recipeNameArr.splice(i, 1, '-');
      }
    }

    recipeData.name = recipeNameArr.join('');
    configureRecipe.renderRecipe([recipeData]);
    redirect(`/RecipeApp/profile/view-added-recipes/${recipeData.name}`);
  }

  function cancelButtonHandler() {
    overlayElement.current.classList.toggle(classes.renderedOverlay);
    deleteTabElement.current.classList.toggle(classes.renderedDeleteTab);
  }

  function deleteButtonHandler() {
    recipeLibaryInfo.delete(recipeData.id);

    const favRecipeArr = favoriteRecipeInfo.favRecipes;
    let favRecipeId;

    for (const favRecipe of favRecipeArr) {
      if (favRecipe.id === recipeData.id) {
        favRecipeId = favRecipe.deleteId;
      }
    }

    favoriteRecipeInfo.delete(firebase.auth().currentUser.uid, favRecipeId);
  }

  document.onkeydown = function (evt) {
    const pathname = window.location.pathname;
    if (
      evt.key === 'Escape' &&
      pathname === '/RecipeApp/profile/view-added-recipes'
    ) {
      overlayElement.current.classList.remove(classes.renderedOverlay);
      deleteTabElement.current.classList.remove(classes.renderedDeleteTab);
    }
  };

  return (
    <tr className={classes.tableRow}>
      <td>{props.recipeName}</td>
      <td>{props.id}</td>
      <td>{props.recipeSubmission}</td>
      <td>
        <button onClick={viewButtonHandler}>View</button>
      </td>
      <td>
        <button onClick={cancelButtonHandler}>Delete</button>
      </td>

      <div
        className={classes.overlay}
        ref={overlayElement}
        onClick={cancelButtonHandler}
      ></div>

      <div className={classes.deleteTab} ref={deleteTabElement}>
        <div className={classes.messageContainer}>
          <h1>Are you sure you want to delete this Item?</h1>
        </div>
        <div className={classes.deleteBtnContainer}>
          <button onClick={cancelButtonHandler}>Cancel</button>
          <button className={classes.deleteBtn} onClick={deleteButtonHandler}>
            Confirm
          </button>
        </div>
      </div>
    </tr>
  );
}

export default AddedRecipeItem;
