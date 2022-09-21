import classes from './RecipeInfo.module.css';
import { useContext } from 'react';
import PageHeader from '../Reusable-Components/PageHeader';
import { recipeInformation } from '../../Context/RecipeContext';

function RecipeInfo() {
  const recipe = useContext(recipeInformation).recipe;

  return (
    <PageHeader headerContent={recipe.Name}>
      <div className={classes.recipeContainer}>
        <img src={recipe.Image} alt="Recipe Image" />
        <h2>
          Recipe: <span>{recipe.Name}</span>
        </h2>
        <hr></hr>
        <h2>
          Dish: <span>{recipe.Dish}</span>
        </h2>
        <hr></hr>
        <h2>
          Preparation: <span>{recipe.Preparation}</span>
        </h2>
        <hr></hr>
        <h2>
          Servings: <span>{recipe.Servings}</span>
        </h2>
        <hr></hr>
        <h2>
          Cooking Time: <span>{recipe.CookingTime}</span>
        </h2>
        <hr></hr>
        <h2>Ingredients:</h2>
        <p>{recipe.Ingredients}</p>
        <hr></hr>
        <h2>Directions:</h2>
        <p>{recipe.Directions}</p>
        <hr></hr>
        <h4>Posted by {recipe.displayName}</h4>
      </div>
    </PageHeader>
  );
}

export default RecipeInfo;
