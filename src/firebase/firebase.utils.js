import firebase from 'firebase/app';
import 'firebase/firestore';
import 'firebase/auth';

const config = {
  apiKey: "AIzaSyB1wMnfk9OYeL6Erjz5MEB5mboF9o95gDw",
  authDomain: "shoppingapp-fed7f.firebaseapp.com",
  databaseURL: "https://shoppingapp-fed7f.firebaseio.com",
  projectId: "shoppingapp-fed7f",
  storageBucket: "shoppingapp-fed7f.appspot.com",
  messagingSenderId: "692627942981",
  appId: "1:692627942981:web:e829b7ac83e89ebd"
};

firebase.initializeApp(config);

export const createUserProfileDocument = async (userAuth, additionalData) => {
  if (!userAuth) return;

  const userRef = firestore.doc(`users/${userAuth.uid}`);

  const snapShot = await userRef.get();

  if (!snapShot.exists) {
    const { displayName, email } = userAuth;
    const createdAt = new Date();
    try {
      await userRef.set({
        displayName,
        email,
        createdAt,
        ...additionalData
      });
    } catch (error) {
      console.log('error creating user', error.message);
    }
  }

  return userRef;
};

export const auth = firebase.auth();
export const firestore = firebase.firestore();

const provider = new firebase.auth.GoogleAuthProvider();
provider.setCustomParameters({ prompt: 'select_account' });
export const signInWithGoogle = () => auth.signInWithPopup(provider);

export default firebase;
