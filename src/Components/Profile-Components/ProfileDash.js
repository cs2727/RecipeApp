import classes from './ProfileDash.module.css';
import PageHeader from '../Reusable-Components/PageHeader';
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import firebase from '../../firebase';
import 'firebase/auth';

function ProfileDash() {
  const history = useNavigate();
  const [signedInState, setSignedInState] = useState(false);

  useEffect(() => {
    const unsubscribe = firebase.auth().onAuthStateChanged((user) => {
      if (firebase.auth().currentUser === null) {
        setSignedInState(false);
      } else {
        setSignedInState(true);
      }

      return () => {
        unsubscribe();
      };
    });
  }, []);

  function accountInfoHandler() {
    history('/profile/account-information');
  }

  function changePasswordHandler() {
    history('/profile/change-password');
  }

  function viewAddedRecipesHandler() {
    history('/profile/view-added-recipes');
  }

  return (
    <>
      {signedInState ? (
        <PageHeader
          headerContent={`Profile: ${firebase.auth().currentUser.displayName}`}
        >
          <div className={classes.dashContainer}>
            <div onClick={accountInfoHandler}>
              <h1>View Account Information</h1>
            </div>

            <div onClick={changePasswordHandler}>
              <h1>Change Password</h1>
            </div>

            <div onClick={viewAddedRecipesHandler}>
              <h1>View Added Recipes</h1>
            </div>
          </div>
        </PageHeader>
      ) : (
        <h1 className={classes.errorMessage}>
          Need to be signed In to access this page
        </h1>
      )}
    </>
  );
}

export default ProfileDash;
