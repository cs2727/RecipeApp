import { createContext, useState } from 'react';

export const favoriteRecipeInformation = createContext();

function FavoriteContext(props) {
  const [FavoriteRecipes, setFavoriteRecipes] = useState([]);
  const [queriedLibary, setQueriedLibary] = useState([]);

  function storingRecipe(userId, recipe) {
    fetch(`https://recipe-b89e7-default-rtdb.firebaseio.com/${userId}.json`, {
      method: 'POST',
      body: JSON.stringify(recipe),
      header: {
        'Content-Type': 'application/json',
      },
    }).then((httpResponse) => {
      if (httpResponse.status <= 200 && httpResponse.status <= 299) {
        renderRecipes(userId);
      }
    });
  }

  function renderRecipes(userId) {
    fetch(`https://recipe-b89e7-default-rtdb.firebaseio.com/${userId}.json`)
      .then((httpResponse) => {
        return httpResponse.json();
      })
      .then((httpBody) => {
        const favRecipeArr = [];
        const favRecipeIds = [];

        for (const favRecipe in httpBody) {
          httpBody[favRecipe].deleteId = favRecipe;
          favRecipeArr.push(httpBody[favRecipe]);
        }

        favRecipeArr.reverse();

        for (const favRecipe of favRecipeArr) {
          favRecipeIds.push(favRecipe.id);
        }

        const set = new Set(favRecipeIds);
        const ids = [...set];
        let arr = [];

        for (let i = 0; i < ids.length; i++) {
          for (const favRecipe of favRecipeArr) {
            if (favRecipe.id === ids[i]) {
              arr.push(favRecipe);
              break;
            }
          }
        }

        setFavoriteRecipes(arr);
      })
      .catch(() => {});
  }

  function favSearch(queriedRecipes) {
    if (queriedRecipes.length === 0) {
      setFavoriteRecipes = FavoriteRecipes;
    } else {
      setQueriedLibary(queriedRecipes);
    }
  }

  function deleteRecipe(userId, recipedeleteId) {
    fetch(
      `https://recipe-b89e7-default-rtdb.firebaseio.com/${userId}/${recipedeleteId}.json`,
      {
        method: 'DELETE',
        headers: {
          'Content-type': 'application/json',
        },
      }
    ).then(() => {
      renderRecipes(userId);
    });
  }

  const configureFavoriteRecipes = {
    favRecipes: FavoriteRecipes,
    store: storingRecipe,
    render: renderRecipes,
    setRecipe: setFavoriteRecipes,
    favSearchedRecipes: queriedLibary,
    getFavRecipes: favSearch,
    delete: deleteRecipe,
  };

  return (
    <favoriteRecipeInformation.Provider value={configureFavoriteRecipes}>
      {props.children}
    </favoriteRecipeInformation.Provider>
  );
}

export default FavoriteContext;
