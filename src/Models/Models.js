import React from 'react';
import firebase from '../Config/firebase';
import { firestoreDb }  from '../Config/firestore';

export const login = (userData) => {
    firestoreDb.collection('users').doc(userData.userEmail)
    .get().then(function(doc) {
        if (doc.exists) {
            console.log("Document data:", doc.data());
        } else {
            console.log("No such document!");
        }
    }).catch(function(error) {
        console.log("Error getting document:", error);
    });
}
