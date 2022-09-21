import { createContext, useState, useEffect } from 'react';

export const recipeLibaryInformation = createContext();

function RecipeLibaryContext(props) {
  const [recipeLibary, setRecipeLibary] = useState([]);
  const [queriedLibary, setQueriedLibary] = useState([]);

  function getRecipes(queriedRecipes) {
    if (queriedRecipes === undefined || queriedRecipes.length === 0) {
      fetch(
        'https://recipe-b89e7-default-rtdb.firebaseio.com/recipeLibary.json'
      )
        .then((httpResponse) => {
          return httpResponse.json();
        })
        .then((httpBody) => {
          const data = [];
          for (const key in httpBody) {
            data.push({
              id: key,
              ...httpBody[key],
            });
          }
          data.reverse();
          setRecipeLibary(data);
        });
    } else {
      setQueriedLibary(queriedRecipes);
    }
  }

  function deleteRecipe(deleteRecipeId) {
    fetch(
      `https://recipe-b89e7-default-rtdb.firebaseio.com/recipeLibary/${deleteRecipeId}.json`,
      {
        method: 'DELETE',
        headers: {
          'Content-type': 'application/json',
        },
      }
    ).then(() => {
      getRecipes();
    });
  }

  const recipeConfiguration = {
    recipes: recipeLibary,
    fetchRecipes: getRecipes,
    searchedRecipes: queriedLibary,
    setQuery: setQueriedLibary,
    delete: deleteRecipe,
  };

  return (
    <recipeLibaryInformation.Provider value={recipeConfiguration}>
      {props.children}
    </recipeLibaryInformation.Provider>
  );
}

export default RecipeLibaryContext;
