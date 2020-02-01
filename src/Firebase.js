/**
 * This module initiates the firebase application and provides a context
 * for easy access to authentication and prime storage methods.
 *
 * There are a couple of reasons for this design
 *
 * 1. One place to initiate firebase
 * 2. One place to mock firebase - easier testing
 * 3. An dead simple pattern to follow
 */
import * as React from "react";
import firebase from "firebase/app";
import 'firebase/auth';
import 'firebase/firestore';
import {useAuthState} from 'react-firebase-hooks/auth';
import {StyledFirebaseAuth} from "react-firebaseui";
import {warningMessage} from "./Messages";

// Init firebase
const app = firebase.initializeApp(JSON.parse(process.env.REACT_APP_FIREBASE));

// Use emulator if not production (TODO only if testing really or if certain env is set)
if (process.env.NODE_ENV !== "production" ) {
  const db = app.firestore();
  db.settings({
    host: "localhost:8080",
    ssl: false
  });

  db.collection("test").doc("1").set({
    name: "Number one",
    title: "Chief"
  })
}

// Configure FirebaseUI.
const uiConfig = {
  // Popup signin flow rather than redirect flow.
  signInFlow: 'popup',
  // Redirect to /signedIn after sign in is successful. Alternatively you can provide a callbacks.signInSuccess function.
  signInSuccessUrl: '/',
  // We will display Google and Facebook as auth providers.
  signInOptions: [
    firebase.auth.GoogleAuthProvider.PROVIDER_ID,
    firebase.auth.EmailAuthProvider.PROVIDER_ID
  ]
};

// The context to to make the promises in the header
const FirebaseContext = React.createContext("");

// Default provider implementation
const FirebaseProvider = ({children}) => {
  const [user, loading, error] = useAuthState(firebase.auth());

  if (error) {
    warningMessage(error);
  }

  if (loading) {
    console.log("loading")
  }

  const authenticated = () => {
    return !!user;
  };

  const signOut = async () => {
    return firebase.auth().signOut();
  };

  return (
    <FirebaseContext.Provider value={{
      authenticated,
      user,
      db: app.firestore(),
      auth: firebase.auth,
      signOut,
    }}>
      {children}
    </FirebaseContext.Provider>
  )
};

const SignIn = () => {
  return <StyledFirebaseAuth uiConfig={uiConfig} firebaseAuth={firebase.auth()}/>
};

export {FirebaseContext, FirebaseProvider, SignIn}