import classes from './FourthSection.module.css';
import recipeMagazineImage from '../../Images/recipeMagazine.png';
import digitalMagazineImage from '../../Images/digitalMagazine.png';

function FourthSection() {
  return (
    <section className={classes.fourthSectionContainer}>
      <div className={classes.infoContainer1}>
        <h1>Subscribe to our Magazine!</h1>
        <p>
          Subscribe to the Recipe Heaven magazine this month and get 50% OFF!
        </p>
        <button>SUBSCRIBE</button>
        <img src={recipeMagazineImage} alt="recipe magazine image" />
      </div>

      <div className={classes.infoContainer2}>
        <h1>Download our digital version!</h1>
        <p>
          Subscribe to digital eidtion of the Recipe Heaven Magazine this month.
        </p>
        <button>SUBSCRIBE</button>
        <img src={digitalMagazineImage} />
      </div>
    </section>
  );
}

export default FourthSection;
