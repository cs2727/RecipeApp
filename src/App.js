import { Route, Routes } from 'react-router-dom';
import Homepage from './Pages/Homepage';
import Favorites from './Pages/FavoritesPage';
import AddRecipe from './Pages/AddRecipePage';
import RecipeLibary from './Pages/RecipeLibaryPage';
import Navigation from './Components/Reusable-Components/Navigation';
import Footer from './Components/Reusable-Components/Footer';
import Recipe from './Pages/RecipePage';
import Login from './Pages/LoginPage';
import Register from './Pages/RegisterPage';
import Profile from './Pages/ProfilePage';
import AccountInfo from './Pages/AccountInfoPage';
import ChangePassword from './Pages/ChangePassPage';
import VerifyEmail from './Pages/VerifyEmailPage';
import ViewAddedRecipes from './Pages/ViewAddedRecipesPage';
import { useContext } from 'react';
import { recipeInformation } from './Context/RecipeContext';

function App() {
  const currentRecipePath = useContext(recipeInformation).recipeURL;
  let recipeToggler, profileToggler;

  if (window.location.pathname === `/RecipeApp/recipes/${currentRecipePath}`) {
    recipeToggler = true;
  } else if (
    window.location.pathname ===
    `/RecipeApp/profile/view-added-recipes/${currentRecipePath}`
  ) {
    profileToggler = true;
  }

  return (
    <div>
      <Navigation />
      <Routes>
        <Route path="/RecipeApp" element={<Homepage />}></Route>
        <Route
          path={
            recipeToggler
              ? `/RecipeApp/recipes/${currentRecipePath}`
              : profileToggler
              ? `/RecipeApp/profile/view-added-recipes/${currentRecipePath}`
              : `/RecipeApp/favorites/${currentRecipePath}`
          }
          element={<Recipe />}
        ></Route>
        <Route path="/RecipeApp/favorites" element={<Favorites />}></Route>
        <Route path="/RecipeApp/add-recipe" element={<AddRecipe />}></Route>
        <Route path="/RecipeApp/recipes" element={<RecipeLibary />}></Route>
        <Route path="/RecipeApp/add-recipe" element={<AddRecipe />}></Route>
        <Route path="/RecipeApp/login" element={<Login />}></Route>
        <Route path="/RecipeApp/register" element={<Register />}></Route>
        <Route path="/RecipeApp/profile" element={<Profile />}></Route>
        <Route
          path="/RecipeApp/profile/account-information"
          element={<AccountInfo />}
        ></Route>
        <Route
          path="/RecipeApp/profile/change-password"
          element={<ChangePassword />}
        ></Route>
        <Route
          path="/RecipeApp/profile/view-added-recipes"
          element={<ViewAddedRecipes />}
        ></Route>
        <Route path="/RecipeApp/verify-email" element={<VerifyEmail />}></Route>
      </Routes>
      <Footer />
    </div>
  );
}

export default App;
