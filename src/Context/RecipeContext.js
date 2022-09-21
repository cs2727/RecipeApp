import { createContext, useState } from 'react';

export const recipeInformation = createContext();

function RecipeContext(props) {
  const [currentRecipe, setRecipe] = useState([]);
  let url;

  if (currentRecipe.length > 0) {
    url = currentRecipe[0].name;
  }

  const configuringRecipe = {
    recipe: currentRecipe[0],
    renderRecipe: setRecipe,
    recipeURL: url,
  };

  return (
    <recipeInformation.Provider value={configuringRecipe}>
      {props.children}
    </recipeInformation.Provider>
  );
}

export default RecipeContext;
