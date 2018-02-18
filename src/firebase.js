/**
 * Created by jaewonlee on 2018. 2. 9..
 */

import * as firebase from 'firebase'

var config = {
    apiKey: "AIzaSyCWpsNEPGjMUX0c1vaVfLtEXBhNe6SuF6Y",
    authDomain: "prostudent-e0ac1.firebaseapp.com",
    databaseURL: "https://prostudent-e0ac1.firebaseio.com",
    projectId: "prostudent-e0ac1",
    storageBucket: "prostudent-e0ac1.appspot.com",
    messagingSenderId: "450933773094"
};

export const init=()=>{
        firebase.initializeApp(config);
}

export const logout =()=>{
    firebase.auth().signOut().then(function(){
    }).catch(()=>alert("Failed"))
}
