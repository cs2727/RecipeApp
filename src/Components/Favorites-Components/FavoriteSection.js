import RecipeCard from '../RecipeLibary-Component/RecipeCard';
import PageHeader from '../Reusable-Components/PageHeader';
import { useContext } from 'react';
import { favoriteRecipeInformation } from '../../Context/FavoriteContext';
import NoFavorites from './NoFavorites';
import firebase from '../../firebase';
import 'firebase/auth';

function FavoriteSection() {
  const favoriteRecipesInfo = useContext(favoriteRecipeInformation);

  if (firebase.auth().currentUser === null) {
    return (
      <PageHeader headerContent="Your Favorite Recipes">
        <NoFavorites />
      </PageHeader>
    );
  } else {
    return (
      <PageHeader headerContent="Your Favorite Recipes">
        <RecipeCard
          recipes={
            favoriteRecipesInfo.favSearchedRecipes.length === 0
              ? favoriteRecipesInfo.favRecipes
              : favoriteRecipesInfo.favSearchedRecipes
          }
        />
      </PageHeader>
    );
  }
}

export default FavoriteSection;
