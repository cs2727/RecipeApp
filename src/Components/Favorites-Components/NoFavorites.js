import { Link } from 'react-router-dom';
import classes from './NoFavorites.module.css';

function NoFavorites() {
  return (
    <div className={classes.Container}>
      <h1>Currently you can not favorite Recipes</h1>
      <p>please Login to start favoriting recipes!</p>
      <div className={classes.linkContainer}>
        <Link to={'/RecipeApp/login'}>Login</Link>
      </div>
    </div>
  );
}

export default NoFavorites;
