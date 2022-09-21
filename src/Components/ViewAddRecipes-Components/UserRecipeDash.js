import firebase from '../../firebase';
import 'firebase/auth';
import { recipeLibaryInformation } from '../../Context/RecipeLibaryContext';
import { useContext, useState } from 'react';
import AddedRecipeList from './AddedRecipeList';
import PageHeader from '../Reusable-Components/PageHeader';

function UserRecipeDash() {
  const recipeLibary = useContext(recipeLibaryInformation).recipes;
  const [userId, setUserId] = useState([firebase.auth().currentUser]);
  let yourAddedRecipes;

  firebase.auth().onAuthStateChanged((user) => {
    if (user !== null) {
      setUserId(user.uid);
    }
  });

  if (userId) {
    yourAddedRecipes = recipeLibary.filter(
      (recipe) => recipe.userId === userId
    );
  }

  return (
    <PageHeader headerContent="Your Added Recipes">
      <AddedRecipeList addedRecipes={yourAddedRecipes} />
    </PageHeader>
  );
}

export default UserRecipeDash;
