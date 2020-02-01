import React, {useContext, useState} from 'react';
import Container from "@material-ui/core/Container";
import Grid from "@material-ui/core/Grid";
import Button from "@material-ui/core/Button";
import Paper from "@material-ui/core/Paper";
import {DrawerContext} from "./Drawer";
import {ThemeContext} from "./Theme";
import {AuthContext, SignIn} from "./Auth";
import {useSnackbar} from "notistack";
import {UrlParamTags} from "./UrlParamTags";
import {useCollection} from 'react-firebase-hooks/firestore';
import Box from "@material-ui/core/Box";

const LandingPage = () => {
  const auth = useContext(AuthContext);
  const drawer = useContext(DrawerContext);
  const theme = useContext(ThemeContext);
  const {enqueueSnackbar, closeSnackbar} = useSnackbar();
  const [show, setShow] = useState("na");
  const [value, loading, error] = useCollection(auth.firestore.collection('test'));

  const addDoc = () => {
    auth.firestore.collection("test").doc("2").set({
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
        <h2>Welcome {auth.user ? auth.user.displayName : "stranger!"}</h2>
        <UrlParamTags/>
        <Paper>
          <Grid container spacing={3}>
            <Grid item xs>
              <Button onClick={() => {
                setShow("signin")
              }}
              >SIGN IN</Button>
            </Grid>
            <Grid item xs>
              <Button onClick={() => auth.signOut()}>SIGN OUT</Button>
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
              <Button onClick={() => {
                enqueueSnackbar("A message")
              }}>Add snackbar</Button>
            </Grid>
            <Grid item xs>
              <Button onClick={() => {
                closeSnackbar()
              }}>Close snackbasr</Button>
            </Grid>
            <Grid item xs>
              <Button onClick={() => {
                enqueueSnackbar("A warning", {variant: 'warning'})
              }}>Add warning</Button>
            </Grid>
          </Grid>
          <Grid container spacing={3}>
            <Grid item xs>
              <Button onClick={addDoc}>Add Document</Button>
            </Grid>
            <Grid item xs>
              <Button onClick={() => {
                closeSnackbar()
              }}>Something else</Button>
            </Grid>
            <Grid item xs>
              <Button onClick={() => {
                enqueueSnackbar("A warning", {variant: 'warning'})
              }}>Last thin</Button>
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