import classes from './RecipeItem.module.css';
import { recipeInformation } from '../../Context/RecipeContext';
import { useNavigate } from 'react-router-dom';
import star from '../../Images/star.png';
import { useRef, useContext } from 'react';
import { favoriteRecipeInformation } from '../../Context/FavoriteContext';
import firebase from '../../firebase';
import 'firebase/auth';
import { useLocation } from 'react-router-dom';

function RecipeItem(props) {
  const configureRecipe = useContext(recipeInformation);
  const redirect = useNavigate();
  const favoriteRecipeInfo = useContext(favoriteRecipeInformation);
  const location = useLocation();
  let toggleTextContent = false;

  if (location.pathname === '/favorites') {
    toggleTextContent = true;
  }

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
    displayName: props.recipedisplayName,
  };

  function viewButtonHandler() {
    let urlpath;

    if (window.location.pathname === '/recipes') {
      urlpath = '/recipes';
    } else {
      urlpath = '/favorites';
    }
    const recipeNameArr = props.recipeName.split('');
    for (let i = 0; i < recipeNameArr.length; i++) {
      if (recipeNameArr[i] === ' ') {
        recipeNameArr.splice(i, 1, '-');
      }
    }

    recipeData.name = recipeNameArr.join('');
    configureRecipe.renderRecipe([recipeData]);
    redirect(`${urlpath}/${recipeData.name}`);
  }

  function favoriteRecipeHandler() {
    if (firebase.auth().currentUser === null) {
      redirect('/favorites');
      return;
    } else if (window.location.pathname === '/recipes') {
      favoriteRecipeInfo.store(firebase.auth().currentUser.uid, recipeData);
    } else {
      favoriteRecipeInfo.delete(
        firebase.auth().currentUser.uid,
        props.deleteId
      );
    }
  }

  return (
    <li className={classes.itemContainer}>
      <div className={classes.imageContainer}>
        <div className={classes.favorite} onClick={favoriteRecipeHandler}>
          <img src={star}></img>
          <span>{toggleTextContent ? 'Un-favorite' : 'Favorite'}</span>
        </div>
        <img
          src={props.recipeImage}
          className={classes.recipeImage}
          alt="image of recipe"
        />
      </div>

      <div className={classes.recipeInfoContainer}>
        <h4>Name: {props.recipeName}</h4>
        <hr className={classes.underline}></hr>

        <h4>Dish-Type: {props.recipeDish}</h4>
        <hr className={classes.underline}></hr>

        <h4>Cooking-Time: {props.recipeCookingTime}</h4>
        <hr className={classes.underline}></hr>

        <h4>Servings: {props.recipeServings}</h4>
        <hr className={classes.underline}></hr>
      </div>

      <div className={classes.buttonContainer}>
        <button onClick={viewButtonHandler}>View</button>
      </div>
    </li>
  );
}

export default RecipeItem;
