import classes from './Footer.module.css';
import facebookLogo from '../../Images/facebook.png';
import instagramLogo from '../../Images/instagram.png';
import youtubeLogo from '../../Images/youtube.png';
import twitterLogo from '../../Images/twitter.png';


function Footer(){
    return (
        <footer className={classes.footerContainer}>

        <div className={classes.linkWrapper}>
            <div className={classes.linkContainer}>
                <h4>Links</h4>
                <hr></hr>
                <a>Dummy Link</a>
                <a>Dummy Link</a>
                <a>Dummy Link</a>
            </div>

            <div className={classes.linkContainer}>
                <h4>Contact Information</h4>
                <hr></hr>
                <a>Dummy Link</a>
                <a>Dummy Link</a>
                <a>Dummy Link</a>
            </div>
        </div>

        <div className={classes.logoContainer}>
                <img src={facebookLogo}></img>
                <img src={instagramLogo}></img>
                <img src={youtubeLogo}></img>
                <img src={twitterLogo}></img>
        </div>
        </footer>
    )
}

export default Footer;