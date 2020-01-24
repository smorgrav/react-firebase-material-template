import React, {useContext, useState} from 'react';
import {AuthContext, SignIn} from "./AuthContext";
import Container from "@material-ui/core/Container";
import Grid from "@material-ui/core/Grid";
import Button from "@material-ui/core/Button";
import logo from "./logo.svg";
import {useTheme} from "@material-ui/core";
import Paper from "@material-ui/core/Paper";

const LandingPage = ({}) => {
  const auth = useContext(AuthContext);
  const theme = useTheme();
  const [show, setShow] = useState("na");

  console.log("User: %o", auth.user);

  return (
    <>
      <Container maxWidth="sm" style={{textAlign: 'center'}}>
        <h2>Welcome {auth.user ? auth.user.displayName : "stranger!"}</h2>
        <img src={logo} alt="logo" style={{width: '300px', height: '300px'}}/>
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
              <Button>TOGGLE LEFT DRAWER</Button>
            </Grid>
            <Grid item xs>
              <Button>TOGGLE RIGHT DRAWER</Button>
            </Grid>
            <Grid item xs>
              <Button>TOGGLE THEME</Button>
            </Grid>
          </Grid>
        </Paper>
        {show === "signin" ? <SignIn/> : null}
      </Container>
    </>
  )
};

export {LandingPage}