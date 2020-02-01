import React, {useContext, useState} from 'react';
import Container from "@material-ui/core/Container";
import Grid from "@material-ui/core/Grid";
import Button from "@material-ui/core/Button";
import Paper from "@material-ui/core/Paper";
import {DrawerContext} from "./Drawer";
import {ThemeContext} from "./Theme";
import {FirebaseContext, SignIn} from "./Firebase";
import {UrlParamTags} from "./UrlParamTags";
import {useCollection} from 'react-firebase-hooks/firestore';
import Box from "@material-ui/core/Box";
import {infoMessage, successMessage, warningMessage} from "./Messages";

const LandingPage = () => {
  const firebase = useContext(FirebaseContext);
  const drawer = useContext(DrawerContext);
  const theme = useContext(ThemeContext);
  const [show, setShow] = useState("na");
  const [value, loading, error] = useCollection(firebase.db.collection('test'));

  const addDoc = () => {
    firebase.db.collection("test").doc("2").set({
      name: "Number Two",
      title: "Captain"
    })
      .then(function() {
        console.log("Document successfully written!");
      })
      .catch(function(error) {
        console.error("Error writing document: ", error);
      });
  };

  return (
    <>
      <Container maxWidth="sm" style={{textAlign: 'center'}}>
        <h2>Welcome {firebase.user ? firebase.user.displayName : "stranger!"}</h2>
        <UrlParamTags/>
        <Paper>
          <Grid container spacing={3}>
            <Grid item xs>
              <Button onClick={() => {setShow("signin")}}>SIGN IN</Button>
            </Grid>
            <Grid item xs>
              <Button onClick={() => firebase.signOut()}>SIGN OUT</Button>
            </Grid>
            <Grid item xs>
              <Button>INVITE LINK</Button>
            </Grid>
          </Grid>
          <Grid container spacing={3}>
            <Grid item xs>
              <Button onClick={drawer.toggleDrawer('left')}>TOGGLE LEFT DRAWER</Button>
            </Grid>
            <Grid item xs>
              <Button onClick={drawer.toggleDrawer('right')}>TOGGLE RIGHT DRAWER</Button>
            </Grid>
            <Grid item xs>
              <Button onClick={() => theme.toggle()}>TOGGLE THEME</Button>
            </Grid>
          </Grid>
          <Grid container spacing={3}>
            <Grid item xs>
              <Button onClick={() => {successMessage("Your rock")}}>SUCCESS MESSAGE</Button>
            </Grid>
            <Grid item xs>
              <Button onClick={() => {warningMessage("A warning")}}>Warning Message</Button>
            </Grid>
            <Grid item xs>
              <Button onClick={() => {infoMessage("This is info")}}>Info Message</Button>
            </Grid>
          </Grid>
          <Grid container spacing={3}>
            <Grid item xs>
              <Button onClick={addDoc}>Add Document</Button>
            </Grid>
            <Grid item xs>
              <Button >Something else</Button>
            </Grid>
            <Grid item xs>
              <Button>Last thin</Button>
            </Grid>
          </Grid>
        </Paper>
      </Container>

      <Box mt={5}>
        <Container maxWidth="sm" style={{textAlign: 'center'}}>
          {error && <strong>Error: {JSON.stringify(error)}</strong>}
          {loading && <span>Collection: Loading...</span>}
          {value && (
            <span>
            Collection:{' '}
              {value.docs.map(doc => (
                <React.Fragment key={doc.id}>
                  {JSON.stringify(doc.data())},{' '}
                </React.Fragment>
              ))}
          </span>
          )}
          {show === "signin" ? <SignIn/> : null}
        </Container>
      </Box>
    </>
  )
};

export {LandingPage}