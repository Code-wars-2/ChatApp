import firebase from 'firebase';

var config = {
    apiKey: "AIzaSyCXTZnv63v0FiVCbG5O7vLebBmZ2LGrgI0",
    authDomain: "chatapp-e965c.firebaseapp.com",
    databaseURL: "https://chatapp-e965c.firebaseio.com",
    projectId: "chatapp-e965c",
    storageBucket: "chatapp-e965c.appspot.com",
    messagingSenderId: "555567709733"
};
firebase.initializeApp(config);
export default firebase;