import classes from './SecondSection.module.css';


function SecondSection(){
    return (
        <section className={classes.secondSectionContainer}>
            
            <div className={classes.titleContainer}>
                <h3>WELCOME TO</h3>
                <h1>THE RECIPE HEAVEN COMPANY</h1>
            </div>

            <hr></hr>

            <div className={classes.paragraphContainer}>
                <p>Recipe Heaven is for people who love to cook and need a quick and easy way to find recipes, not only this
                    but you can favorite recipes in-order to have them saved for you ready whenever you to cook them         </p>
            </div>


        </section>
    )

}

export default SecondSection;