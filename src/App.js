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

  if (window.location.pathname === `/recipes/${currentRecipePath}`) {
    recipeToggler = true;
  } else if (
    window.location.pathname ===
    `/profile/view-added-recipes/${currentRecipePath}`
  ) {
    profileToggler = true;
  }

  return (
    <div>
      <Navigation />
      <Routes>
        <Route path="/" element={<Homepage />}></Route>
        <Route
          path={
            recipeToggler
              ? `/recipes/${currentRecipePath}`
              : profileToggler
              ? `/profile/view-added-recipes/${currentRecipePath}`
              : `/favorites/${currentRecipePath}`
          }
          element={<Recipe />}
        ></Route>
        <Route path="/favorites" element={<Favorites />}></Route>
        <Route path="/add-recipe" element={<AddRecipe />}></Route>
        <Route path="/recipes" element={<RecipeLibary />}></Route>
        <Route path="/add-recipe" element={<AddRecipe />}></Route>
        <Route path="/login" element={<Login />}></Route>
        <Route path="/register" element={<Register />}></Route>
        <Route path="/profile" element={<Profile />}></Route>
        <Route
          path="/profile/account-information"
          element={<AccountInfo />}
        ></Route>
        <Route
          path="/profile/change-password"
          element={<ChangePassword />}
        ></Route>
        <Route
          path="/profile/view-added-recipes"
          element={<ViewAddedRecipes />}
        ></Route>
        <Route path="/verify-email" element={<VerifyEmail />}></Route>
      </Routes>
      <Footer />
    </div>
  );
}

export default App;
