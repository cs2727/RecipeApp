import classes from './EmailVerification.module.css';

function EmailVerification() {
  return (
    <section className={classes.sectionContainer}>
      <div className={classes.infoContainer}>
        <h1>VERIFY YOUR EMAIL</h1>
        <p>
          Account created, but before you can log in, you need to go to your
          email inbox and please verify your email (check spam)!
        </p>
      </div>
    </section>
  );
}

export default EmailVerification;
