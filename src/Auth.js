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
import {useAuthState} from 'react-firebase-hooks/auth';
import {StyledFirebaseAuth} from "react-firebaseui";
import {useSnackbar} from "notistack";

// Init firebase
firebase.initializeApp(JSON.parse(process.env.REACT_APP_FIREBASE_CONFIG));

console.log("Firebase auth: %o", firebase.auth);

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
const AuthContext = React.createContext("");

// Default provider implementation
const FirebaseProvider = ({children}) => {
  const [user, loading, error] = useAuthState(firebase.auth());
  const {enqueueSnackbar} = useSnackbar();

  if (error) {
    enqueueSnackbar(error);
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
    <AuthContext.Provider value={{
      authenticated,
      user,
      auth: firebase.auth,
      signOut,
    }}>
      {children}
    </AuthContext.Provider>
  )
};

const SignIn = () => {
  return <StyledFirebaseAuth uiConfig={uiConfig} firebaseAuth={firebase.auth()}/>
};

export {AuthContext, FirebaseProvider, SignIn}