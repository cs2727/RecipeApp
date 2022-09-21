import classes from './RegisterForm.module.css';
import { useRef } from 'react';
import firebase from '../../firebase';
import PageHeader from '../Reusable-Components/PageHeader';
import 'firebase/auth';
import { useNavigate } from 'react-router-dom';

function RegisterForm() {
  const firstNameElement = useRef();
  const lastNameElement = useRef();
  const emailElement = useRef();
  const passwordElement = useRef();
  const confirmPasswordElement = useRef();
  const checkboxElement = useRef();
  const errorMessageEmailElement = useRef();
  const errorMessagePasswordElement = useRef();
  const reDirect = useNavigate();

  // This function will create the user's account ---------------------------------->
  function registerHandler(event) {
    event.preventDefault();

    if (
      passwordElement.current.value === confirmPasswordElement.current.value
    ) {
      errorMessagePasswordElement.current.classList.remove(
        classes.errorMessageVisible
      );
      firebase
        .auth()
        .createUserWithEmailAndPassword(
          emailElement.current.value,
          passwordElement.current.value
        )
        .then(() => {
          firebase.auth().currentUser.updateProfile({
            displayName: `${firstNameElement.current.value} ${lastNameElement.current.value}`,
          });
          firebase.auth().currentUser.sendEmailVerification();
          firebase.auth().signOut();
          reDirect('/verify-email');
        })
        .catch((error) => {
          if (error.code === 'auth/email-already-in-use') {
            errorMessageEmailElement.current.innerHTML =
              'Email already in use!';
            errorMessageEmailElement.current.classList.add(
              classes.errorMessageVisible
            );
          } else {
            errorMessageEmailElement.current.classList.remove(
              classes.errorMessageVisible
            );
          }
        });
    } else {
      errorMessagePasswordElement.current.innerHTML = 'Passwords do not match!';
      errorMessagePasswordElement.current.classList.add(
        classes.errorMessageVisible
      );
    }
  }

  // This will toggle password to show text/bullet points whenever we click the 'show password' checkbox --------->
  function togglePassword() {
    if (passwordElement.current.type === 'password') {
      passwordElement.current.type = 'text';
      confirmPasswordElement.current.type = 'text';
    } else {
      passwordElement.current.type = 'password';
      confirmPasswordElement.current.type = 'password';
    }
  }

  //JSX Code
  return (
    <PageHeader headerContent="Registration">
      <form className={classes.formContainer} onSubmit={registerHandler}>
        {/* First Name */}
        <div className={classes.control}>
          <label htmlFor="first-name" className={classes.one}>
            First Name
          </label>
          <input type="text" required id="first-name" ref={firstNameElement} />
        </div>

        {/* last  Name */}
        <div className={classes.control}>
          <label htmlFor="last-name" className={classes.one}>
            Last Name
          </label>
          <input type="text" required id="last-name" ref={lastNameElement} />
        </div>

        {/* Email */}
        <div className={classes.control}>
          <label htmlFor="email" className={classes.one}>
            Email
          </label>
          <input
            type="email"
            required
            id="email"
            pattern="a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]+"
            ref={emailElement}
          />
        </div>

        {/* Password */}
        <div></div>
        <div className={classes.control}>
          <label htmlFor="password" className={classes.two}>
            Password
          </label>
          <input
            type="password"
            required
            id="password"
            minLength="6"
            ref={passwordElement}
            placeholder={'Password must be at-least 6 characters long'}
          />
        </div>

        {/* Re-Enter Password */}
        <div></div>
        <div className={classes.control}>
          <label htmlFor="confirm-password" className={classes.three}>
            Confirm Password
          </label>
          <input
            type="password"
            required
            id="confirm-password"
            minLength="6"
            ref={confirmPasswordElement}
            placeholder={'Password must be at-least 6 characters long'}
          />
        </div>

        {/* Checkbox Input */}
        <div className={classes.checkboxContainer}>
          <input
            type="checkbox"
            onClick={togglePassword}
            ref={checkboxElement}
          />
          Show Password
        </div>

        {/*Register Button*/}
        <div className={classes.actions}>
          <input type="submit" value="Register" />
        </div>

        <p
          ref={errorMessageEmailElement}
          className={classes.errorMessageEmail}
        ></p>
        <p
          ref={errorMessagePasswordElement}
          className={classes.errorMessagePassword}
        ></p>
      </form>
    </PageHeader>
  );
}

export default RegisterForm;
