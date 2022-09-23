import classes from './ChangePasswordForm.module.css';
import PageHeader from '../Reusable-Components/PageHeader';
import firebase from '../../firebase';
import 'firebase/auth';
import { useRef } from 'react';

function ChangePasswordForm() {
  const newPasswordElement = useRef();
  const confirmPasswordElement = useRef();
  const checkboxElement = useRef();
  const overlay = useRef();
  const resetTab = useRef();
  const resetEmail = useRef();
  const errorMessageElement = useRef();
  const errorMessageOverlayElement = useRef();
  //-TogglePassword Function- ------------------

  function togglePassword() {
    if (
      newPasswordElement.current.type === 'password' ||
      confirmPasswordElement.current.type === 'password'
    ) {
      newPasswordElement.current.type = 'text';
      confirmPasswordElement.current.type = 'text';
    } else {
      newPasswordElement.current.type = 'password';
      confirmPasswordElement.current.type = 'password';
    }
  }

  function forgotPasswordHandler() {
    overlay.current.classList.add(classes.renderedOverlay);
    resetTab.current.classList.add(classes.renderedResetTab);
  }

  // This will send a password reset link to our email to allow us to change our password on there --------------------->
  function sendPasswordResetEmailHandler(event) {
    event.preventDefault();
    firebase
      .auth()
      .sendPasswordResetEmail(resetEmail.current.value)
      .then(() => {
        errorMessageOverlayElement.current.innerHTML =
          'Password Reset Email Successfully Sent';
        errorMessageOverlayElement.current.classList.add(
          classes.errorMessageVisible
        );
      })
      .catch(() => {
        errorMessageOverlayElement.current.innerHTML =
          'Password Reset Email not Sent (Email not registered)';
        errorMessageOverlayElement.current.classList.add(
          classes.errorMessageVisible
        );
        resetEmail.current.value = '';
      });
  }

  // Function handler to reset password
  function resettingPassword(event) {
    event.preventDefault();

    if (
      confirmPasswordElement.current.value === newPasswordElement.current.value
    ) {
      firebase
        .auth()
        .currentUser.updatePassword(newPasswordElement.current.value)
        .then(() => {
          errorMessageElement.current.innerHTML =
            'Password successfully changed';
          errorMessageElement.current.classList.add(
            classes.errorMessageVisible
          );
          confirmPasswordElement.current.value = '';
          newPasswordElement.current.value = '';
        })
        .catch((error) => {
          alert(error);
        });
    } else {
      errorMessageElement.current.innerHTML = 'Passwords do not match';
      errorMessageElement.current.classList.toggle(classes.errorMessageVisible);
    }
  }

  // Overlay toggle Handler when we click overlay to remove overlay related elements
  function overlayToggleHandler() {
    overlay.current.classList.remove(classes.renderedOverlay);
    resetTab.current.classList.remove(classes.renderedResetTab);
    errorMessageOverlayElement.current.classList.remove(
      classes.errorMessageVisible
    );
    resetEmail.current.value = '';
  }

  // Escape Key registered Event Listener for when we click escape key to remove overlay related elements
  document.onkeydown = function (evt) {
    const pathname = window.location.pathname;
    if (
      evt.key === 'Escape' &&
      pathname === '/RecipeApp/profile/change-password'
    ) {
      overlay.current.classList.remove(classes.renderedOverlay);
      resetTab.current.classList.remove(classes.renderedResetTab);
      errorMessageOverlayElement.current.classList.remove(
        classes.errorMessageVisible
      );
      resetEmail.current.value = '';
    }
  };

  //JSX Code
  return (
    <PageHeader headerContent="Changing Password">
      {/* Forgot Password Form */}
      <form className={classes.formContainer} onSubmit={resettingPassword}>
        <h4 className={classes.forgotPassword} onClick={forgotPasswordHandler}>
          Forgot Password?
        </h4>

        <div className={classes.control}>
          <label htmlFor="new-password">New Password</label>
          <input
            type="password"
            id="new-password"
            ref={newPasswordElement}
            placeholder="Password should be at least 6 characters"
            minLength="6"
            required
          ></input>
        </div>

        <div className={classes.control}>
          <label htmlFor="confirm-password">Confirm Password</label>
          <input
            type="password"
            id="confirm-password"
            ref={confirmPasswordElement}
            placeholder="Password should be at least 6 characters"
            minLength="6"
            required
          ></input>
        </div>

        <h4 className={classes.forgotPassword} onClick={forgotPasswordHandler}>
          Forgot Password?
        </h4>

        <div className={classes.actions}>
          <input type="submit" value="Save" />
        </div>

        <div className={classes.checkboxContainer}>
          <input
            type="checkbox"
            onChange={togglePassword}
            ref={checkboxElement}
          />
          Show Password
        </div>

        <p ref={errorMessageElement} className={classes.errorMessage}></p>
      </form>

      <div
        className={classes.unrenderedOverlay}
        ref={overlay}
        onClick={overlayToggleHandler}
      ></div>

      {/* Forgot Password Overlay form */}
      <form
        className={classes.unrenderedResetTab}
        ref={resetTab}
        onSubmit={sendPasswordResetEmailHandler}
      >
        <h1>Resetting Password</h1>
        <hr></hr>
        <label htmlFor="emailInput">Email</label>
        <input type="email" id="emailInput" ref={resetEmail} required></input>
        <div className={classes.actions}>
          <input type="submit" value="Send" />
        </div>

        <p
          ref={errorMessageOverlayElement}
          className={classes.errorMessageOverlay}
        ></p>
      </form>
    </PageHeader>
  );
}

export default ChangePasswordForm;
