import firebase from './firebase';

export const firestoreDb = firebase.firestore();
firestoreDb.settings({
  timestampsInSnapshots : true
})