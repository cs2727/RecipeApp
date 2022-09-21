import  firebase from '../../firebase';
import PageHeader from '../Reusable-Components/PageHeader';
import 'firebase/auth';
import { useState } from 'react';
import classes from './AccountData.module.css';



function AccountData(){
    const [user, setUser] = useState(firebase.auth().currentUser);
    let fullName, firstName, lastName, email;

    firebase.auth().onAuthStateChanged(user => {
        if (user !== null){
            setUser(user);
        }
    })

    if (user !== null){
        fullName = user.displayName.split(' ');
        firstName = fullName[0];
        lastName = fullName[1];
        email = user.email;
    }

return (
    <PageHeader headerContent='Account Information'>
        <div className={classes.infoContainer}>
            <h3>First Name: {firstName}</h3>
            <h3>Last Name: {lastName}</h3>
            <h3>Email: {email}</h3>
        </div>
    </PageHeader>
)


}

export default AccountData;

