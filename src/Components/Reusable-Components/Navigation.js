import { Link, useNavigate } from 'react-router-dom';
import RecipeLogo from '../.././Images/RecipeHeaven.svg';
import ExitIcon from '../.././Images/exitIcon.png';
import classes from './Navigation.module.css';
import { useRef, useContext, useState, useEffect } from 'react';
import { favoriteRecipeInformation } from '../../Context/FavoriteContext';
import { recipeLibaryInformation } from '../../Context/RecipeLibaryContext';
import searchArrow from '../../Images/arrow-right-black.svg';
import firebase from '../../firebase';
import 'firebase/auth';

function Navigation() {
  const mainLinks = useRef();
  const navLinks = useRef();
  const searchBar = useRef();
  const searchInput = useRef();
  const history = useNavigate();
  const [stateOfUser, setStateOfUser] = useState([null]);
  const favoriteRecipeInfo = useContext(favoriteRecipeInformation);
  const recipeLibaryInfo = useContext(recipeLibaryInformation);
  let inputTextContent = true;

  // the search bar will show 'Type here to find recipes' if inputTextContent is true and if not
  // it will replace 'recipes' with 'favorite recipes'
  if (window.location.pathname === '/RecipeApp/favorites') {
    inputTextContent = false;
  }

  // This will open/close burger Menu navigation if burger icon is clicked -----------------------------------
  function toggleBurgerHandler() {
    mainLinks.current.classList.toggle(classes.burgerMenu);
    navLinks.current.classList.toggle(classes.burgerNavList);
  }

  // This will sign the user out ----------------------------------------------------------------------------->
  function signingOutHandler() {
    firebase.auth().signOut();
    history('/RecipeApp');
  }

  // This useEffect will create a onAuthStateChanged event listener that will be triggered whenever a user
  // signs In (user Object)/ signs Out (null), if auth state changes, the navigation menu links will change to the
  // appropriate ones ----------------------->

  useEffect(() => {
    recipeLibaryInfo.fetchRecipes();
    firebase.auth().onAuthStateChanged((user) => {
      if (user !== null) {
        favoriteRecipeInfo.render(firebase.auth().currentUser.uid);
        setStateOfUser([true, 'Profile', 'Sign Out', '/RecipeApp/profile']);
      } else {
        setStateOfUser([
          false,
          'Log In',
          'Register',
          '/RecipeApp/login',
          '/RecipeApp/register',
        ]);
      }

      if (
        window.location.pathname === '/RecipeApp/login' &&
        user.emailVerified === true
      ) {
        history('/RecipeApp');
      }
    });
  }, []);

  // toggler to show or remove search bar--------------------------------------------------------------
  function toggleSearchBar() {
    searchBar.current.classList.toggle(classes.renderSearchBar);
    mainLinks.current.classList.remove(classes.burgerMenu);
    navLinks.current.classList.remove(classes.burgerNavList);
  }

  // Search Functionality to query through the recipe libary for recipes------------------------->
  function searchRecipes(event) {
    const searchValue = event.target.value.trim();
    let recipeLibary;
    const matchingRecipes = [];

    if (window.location.pathname !== '/RecipeApp/favorites') {
      recipeLibary = recipeLibaryInfo.recipes;
    } else {
      recipeLibary = favoriteRecipeInfo.favRecipes;
    }

    recipeLibary.map((recipe) => {
      const searchedRecipes = recipe.Name.includes(searchValue);
      if (searchedRecipes) {
        matchingRecipes.push(recipe);
      }
    });

    if (window.location.path !== '/RecipeApp/favorites') {
      recipeLibaryInfo.fetchRecipes(matchingRecipes);
    } else {
      favoriteRecipeInfo.getFavRecipes(
        firebase.auth().currentUser.uid,
        matchingRecipes
      );
    }
  }

  // Search Enter Functionality --------------------------------------

  function searchEnter() {
    const location = window.location.pathname;
    if (
      location === '/RecipeApp/recipes' ||
      location === '/RecipeApp/favorites'
    ) {
      return;
    } else if (location !== '/RecipeApp/recipes') {
      history('/RecipeApp/recipes');
    }
  }

  document.onkeydown = function (evt) {
    if (evt.key === 'Enter') {
      searchEnter();
    }
  };

  document.onkeydown = function (evt) {
    if (evt.key === 'Escape') {
      searchInput.current.value = '';
      searchBar.current.classList.remove(classes.renderSearchBar);
      recipeLibaryInfo.setQuery([]);
    }
  };

  function closingSearchBar() {
    searchInput.current.value = '';
    searchBar.current.classList.remove(classes.renderSearchBar);
    recipeLibaryInfo.setQuery([]);
  }

  // JSX Code
  return (
    <nav className={classes.nav}>
      {' '}
      {/* Navigation bar */}
      {/* Recipe Logo */}
      <Link to="/RecipeApp">
        <img
          className={classes.recipeLogo}
          src={RecipeLogo}
          alt="Recipe Heaven Logo"
        />
      </Link>
      {/* Burger Emoji */}
      <div className={classes.burgerContainer} onClick={toggleBurgerHandler}>
        <div></div>
        <div></div>
        <div></div>
      </div>
      {/* Navigation Links */}
      <ul className={classes.navList} ref={navLinks}>
        <li key="1">
          <Link to={stateOfUser[0] === null ? 'Loading' : stateOfUser[3]}>
            {stateOfUser[1]}
          </Link>
        </li>
        <hr></hr>
        <li className={classes.searchLink} onClick={toggleSearchBar} key="2">
          <Link to="#">Search</Link>
        </li>
        <hr></hr>
        <li key="3">
          {stateOfUser[0] ? (
            <a onClick={signingOutHandler}>Sign Out</a> // sign out
          ) : (
            <Link to={stateOfUser[0] === null ? 'Loading' : stateOfUser[4]}>
              {stateOfUser[2]}
            </Link> // register
          )}
        </li>
      </ul>
      {/*Main Links*/}
      <ul className={classes.mainList} ref={mainLinks}>
        <li key="1">
          <Link to="/RecipeApp/recipes">Recipes Libary</Link>
        </li>
        <li key="2">
          <Link to="/RecipeApp/add-recipe">Add Recipes</Link>
        </li>
        <li key="3">
          <Link to="/RecipeApp/favorites">Favorite Recipes</Link>
        </li>
      </ul>
      {/*Search bar*/}
      <div className={classes.searchBar} ref={searchBar}>
        <input
          type="text"
          placeholder={
            inputTextContent
              ? 'TYPE HERE TO FIND RECIPES'
              : 'TYPE HERE TO FIND YOUR FAVORITE RECIPES'
          }
          onChange={searchRecipes}
          ref={searchInput}
        />
        <img src={searchArrow} onClick={searchEnter} />
        <img src={ExitIcon} className="exitIcon" onClick={closingSearchBar} />
      </div>
    </nav>
  );
}

export default Navigation;
