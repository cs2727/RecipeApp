import classes from './LoginForm.module.css';
import { useRef } from 'react';
import PageHeader from '../Reusable-Components/PageHeader';
import firebase from '../../firebase';
import 'firebase/auth';
import { useNavigate } from 'react-router-dom';

function LoginForm() {
  const emailElement = useRef();
  const passwordElement = useRef();
  const checkboxElement = useRef();
  const overlay = useRef();
  const resetTab = useRef();
  const resetEmail = useRef();
  const errorMessageElement = useRef();
  const errorMessageOverlayElement = useRef();
  const reDirect = useNavigate();

  // This will toggle password to show text/bullet points whenever we click the 'show password' checkbox --------------------->
  function togglePassword() {
    if (passwordElement.current.type === 'password') {
      passwordElement.current.type = 'text';
    } else {
      passwordElement.current.type = 'password';
    }
  }

  // This will log us in if our email is verified, if not it will sign us out --------------------->
  function loggingInHandler(event) {
    event.preventDefault();
    firebase
      .auth()
      .signInWithEmailAndPassword(
        emailElement.current.value,
        passwordElement.current.value
      )
      .then((userObj) => {
        if (userObj.user.emailVerified === false) {
          errorMessageElement.current.classList.remove(
            classes.errorMessageVisible
          );
          firebase.auth().currentUser.sendEmailVerification();
          firebase.auth().signOut();
          reDirect('/verify-email');
        }
      })
      .catch((error) => {
        console.log(error);
        errorMessageElement.current.innerHTML = 'Incorrect Password/Email';
        errorMessageElement.current.classList.add(classes.errorMessageVisible);
      });
  }

  // This will render password/email incorrect text to signify an incorrect email address/password --------------------->
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
      });
  }

  // Overlay toggle Handler that will open/close overlay for password reset email form --------------------->
  function overlayToggleHandler() {
    overlay.current.classList.remove(classes.renderedOverlay);
    resetTab.current.classList.remove(classes.renderedResetTab);
    errorMessageOverlayElement.current.classList.remove(
      classes.errorMessageVisible
    );
    resetEmail.current.value = '';
  }

  // Escape Key registered Event Listener

  document.onkeydown = function (evt) {
    const pathname = window.location.pathname;
    if (evt.key === 'Escape' && pathname === '/login') {
      overlay.current.classList.remove(classes.renderedOverlay);
      resetTab.current.classList.remove(
        classes.renderedResetTab,
        classes.removeContent
      );
      resetEmail.current.value = '';
    }
  };

  // JSX Code
  return (
    <PageHeader headerContent="Login">
      {/* This is the form for logging In */}
      <form className={classes.formContainer} onSubmit={loggingInHandler}>
        <div className={classes.control}>
          <label htmlFor="email">Email</label>
          <input type="email" required id="email" ref={emailElement} />
        </div>

        <div className={classes.control}>
          <label htmlFor="password">Password</label>
          <input
            type="password"
            required
            id="password"
            ref={passwordElement}
            minLength="6"
          />
        </div>

        <div className={classes.checkboxContainer}>
          <input
            type="checkbox"
            onChange={togglePassword}
            ref={checkboxElement}
          />
          Show Password
        </div>

        <div className={classes.actions}>
          <input type="submit" value="Log In" />
        </div>

        <h4 className={classes.forgotPassword} onClick={forgotPasswordHandler}>
          Forgot Password?
        </h4>

        <p ref={errorMessageElement} className={classes.errorMessage}></p>
      </form>

      {/* This is the overlay element for the resetting password via email form*/}
      <div
        className={classes.unrenderedOverlay}
        ref={overlay}
        onClick={overlayToggleHandler}
      ></div>

      {/* This is the form for resetting password via email */}
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

export default LoginForm;
