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

const LandingPage = () => {
  const auth = useContext(AuthContext);
  const drawer = useContext(DrawerContext);
  const theme = useContext(ThemeContext);
  const {enqueueSnackbar, closeSnackbar} = useSnackbar();

  const [show, setShow] = useState("na");

  return (
    <>
      <Container maxWidth="sm" style={{textAlign: 'center'}}>
        <h2>Welcome {auth.user ? auth.user.displayName : "stranger!"}</h2>
        <UrlParamTags />
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
              <Button onClick={() => {enqueueSnackbar("A message")}}>Add snackbar</Button>
            </Grid>
            <Grid item xs>
              <Button onClick={() => {closeSnackbar()}}>Close snackbasr</Button>
            </Grid>
            <Grid item xs>
              <Button onClick={() => {enqueueSnackbar("A warning", {variant: 'warning'})}}>Add warning</Button>
            </Grid>
          </Grid>
        </Paper>
        {show === "signin" ? <SignIn/> : null}
      </Container>
    </>
  )
};

export {LandingPage}