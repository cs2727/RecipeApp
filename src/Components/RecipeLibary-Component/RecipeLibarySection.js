import RecipeCard from './RecipeCard';
import { recipeLibaryInformation } from '../../Context/RecipeLibaryContext';
import { useContext } from 'react';
import PageHeader from '../Reusable-Components/PageHeader';

function RecipeLibarySection() {
  const recipeLibaryInfo = useContext(recipeLibaryInformation);
  let recipeLibary;

  if (recipeLibaryInfo.searchedRecipes.length !== 0){
    recipeLibary =  recipeLibaryInfo.searchedRecipes;
  }
  else {
    recipeLibary =  recipeLibaryInfo.recipes;
  }

  if (recipeLibary.length === 0) {
    return (
        <PageHeader headerContent='Recipe Libary'>
          <h1>No Recipes Added</h1>
        </PageHeader>
    );
  } else {
    return (
        <PageHeader headerContent='Recipe Libary'>
          <RecipeCard recipes={recipeLibary} />
        </PageHeader>
    );
  }
}

export default RecipeLibarySection;