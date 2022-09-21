import RecipeItem from './RecipeItem'
import classes from './RecipeCard.module.css';

function RecipeCard(props){
    return (
            <ul className={classes.list}>
            {props.recipes.map(recipe => {
         return <RecipeItem 
                key={recipe.id}
                id ={recipe.id}
                deleteId = {recipe.deleteId}
                recipeName={recipe.Name}
                recipeDish={recipe.Dish}
                recipePreparation={recipe.Preparation}
                recipeServings={recipe.Servings}
                recipeCookingTime={recipe.CookingTime}
                recipeImage={recipe.Image}
                recipeIngredients={recipe.Ingredients}
                recipeDirections={recipe.Directions}
                recipedisplayName = {recipe.displayName}
                />
            })}
            </ul>
    )
}

export default RecipeCard;