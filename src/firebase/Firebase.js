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
import React, {useState} from "react";
import firebase from "firebase/app";
import 'firebase/auth';
import 'firebase/firestore';
import {useAuthState} from 'react-firebase-hooks/auth';
import {errorMessage, successMessage, warningMessage} from "../shared/Messages";
import {devConfig} from "./config";

// Init firebase (TO add prod config - add config file and check on NODE_ENV which one to use here
const app = firebase.initializeApp(devConfig);

// Use emulator if not production (TODO only if testing really or if certain env is set)
if (process.env.NODE_ENV !== "production") {
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

// The context to to make the promises in the header
const FirebaseContext = React.createContext("");

// Default provider implementation
const FirebaseProvider = ({children}) => {
  const [user, loading, error] = useAuthState(firebase.auth());
  const [inviteProcessed, setInviteProcessed] = useState(false);

  if (!inviteProcessed && firebase.auth().isSignInWithEmailLink(window.location.href)) {
    signInIfEmailLink();
    setInviteProcessed(true);
  }

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

const actionCodeSettings = {
  url: 'http://localhost:3000/invite',
  // This must be true.
  handleCodeInApp: true,
};

const sendInvite = (email) => {
  firebase.auth().sendSignInLinkToEmail(email, actionCodeSettings)
    .then(() => {
      successMessage("Invite successfully sent");
      window.localStorage.setItem('emailForSignIn', email);
    })
    .catch(errorMessage);
};

const signInIfEmailLink = () => {
  console.log("Checking if url is a signin link");
  // Confirm the link is a sign-in with email link.
  if (firebase.auth().isSignInWithEmailLink(window.location.href)) {
    console.log("It is!");
    // Additional state parameters can also be passed via URL.
    // This can be used to continue the user's intended action before triggering
    // the sign-in operation.
    // Get the email if available. This should be available if the user completes
    // the flow on the same device where they started it.
    let email = window.localStorage.getItem('emailForSignIn');
    if (!email) {
      // User opened the link on a different device. To prevent session fixation
      // attacks, ask the user to provide the associated email again. For example:
      email = window.prompt('Please provide your email for confirmation');
    }
    // The client SDK will parse the code from the link for you.
    firebase.auth().signInWithEmailLink(email, window.location.href)
      .then(function (result) {
        // Clear email from storage.
        window.localStorage.removeItem('emailForSignIn');
        // You can access the new user via result.user
        // Additional user info profile not available via:
        // result.additionalUserInfo.profile == null
        // You can check if the user is new or existing:
        // result.additionalUserInfo.isNewUser
        successMessage("Authenticated with link");
      })
      .catch(errorMessage);
  }
};

const linkWithGoogle = () => {
  firebase.auth().currentUser.linkWithPopup(new firebase.auth.GoogleAuthProvider()).then(result => {
    successMessage("Account linked to" + result.user.uid);
  }).catch(errorMessage);
};

const linkWithEmail = () => {
  firebase.auth().currentUser.linkWithPopup(new firebase.auth.EmailAuthProvider()).then(result => {
    successMessage("Account linked to" + result.user.uid);
  }).catch(errorMessage);
};

const signInEmail = (email, password) => {
  firebase.auth().signInWithEmailAndPassword(email, password).catch(errorMessage);
};

const signInGoogle = () => {
  const provider = new firebase.auth.GoogleAuthProvider();
  firebase.auth().signInWithPopup(provider).catch(errorMessage);
};

const resetPassword = email => {
  this.auth.sendPasswordResetEmail(email).then(() => {
    successMessage("Reset email sent")
  }, errorMessage);
};

const signUpEmail = (email, name, password) => {
  if (name.length < 4) {
    warningMessage("Name must be more than 4 characters long");
  } else {
    this.auth.createUserWithEmailAndPassword(email, password)
      .then(user => {successMessage("Hello " + user.displayName)})
      .catch(errorMessage)
  }
};

const signInCustom = token => {
  this.auth.signInWithCustomToken(token).catch(errorMessage);
};

export {FirebaseContext, FirebaseProvider, sendInvite}