import classes from './ThirdSection.module.css';
import recipeFormImage from '../../Images/recipeForm.svg';
import favoriteRecipeImage from '../../Images/favoriteRecipe.svg';
import recipeLibaryImage from '../../Images/recipeLibary.svg';
import { useNavigate } from 'react-router-dom';

function ThirdSection() {
  const history = useNavigate();

  function reDirect(event) {
    if (event.target.textContent === 'VIEW RECIPE FORM') {
      history('/add-recipe');
    } else if (event.target.textContent === 'VIEW FAVORITE RECIPES') {
      history('/favorites');
    } else {
      history('/recipes');
    }
  }

  return (
    <section className={classes.thirdSectionContainer}>
      <div className={classes.divContainer}>
        <img src={recipeFormImage} alt="recipe form image" />
        <div className={classes.infoContainer}>
          <h1>ADD RECIPES</h1>
          <button onClick={reDirect}>VIEW RECIPE FORM</button>
        </div>
      </div>

      <div className={classes.divContainer}>
        <img src={favoriteRecipeImage} alt="favorite recipe image" />
        <div className={classes.infoContainer}>
          <h1>FAVORITE RECIPES</h1>
          <button onClick={reDirect}>VIEW FAVORITE RECIPES</button>
        </div>
      </div>

      <div className={classes.divContainer}>
        <img src={recipeLibaryImage} alt="recipe libary image" />
        <div className={classes.infoContainer}>
          <h1>RECIPE LIBARY</h1>
          <button onClick={reDirect}>VIEW RECIPE LIBARY</button>
        </div>
      </div>
    </section>
  );
}

export default ThirdSection;
