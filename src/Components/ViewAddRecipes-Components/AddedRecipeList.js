import AddedRecipeItem from './AddedRecipeItem';
import classes from './AddedRecipeList.module.css';

function AddedRecipeList(props) {
  return (
    <table className={classes.tableContainer}>
      <tr className={classes.columnHeadersContainer}>
        <th>Recipe Name</th>
        <th>Recipe Id</th>
        <th>Submission Date</th>
        <th>View Recipe</th>
        <th>Delete Recipe</th>
      </tr>
      {props.addedRecipes.map((recipe) => {
        return (
          <AddedRecipeItem
            key={recipe.id}
            id={recipe.id}
            recipeImage={recipe.Image}
            recipeName={recipe.Name}
            recipeDish={recipe.Dish}
            recipePreparation={recipe.Preparation}
            recipeServings={recipe.Servings}
            recipeCookingTime={recipe.CookingTime}
            recipeIngredients={recipe.Ingredients}
            recipeDirections={recipe.Directions}
            recipeSubmission={recipe.submissionDate}
          />
        );
      })}
    </table>
  );
}

export default AddedRecipeList;
