import React, {useContext, useState} from 'react';
import {makeStyles} from '@material-ui/core/styles';
import {blue} from '@material-ui/core/colors';
import TextField from "@material-ui/core/TextField/TextField";
import Box from "@material-ui/core/Box/Box";
import Dialog from "@material-ui/core/Dialog/Dialog";
import DialogTitle from "@material-ui/core/DialogTitle/DialogTitle";
import DialogActions from "@material-ui/core/DialogActions/DialogActions";
import DialogContent from "@material-ui/core/DialogContent/DialogContent";
import Hidden from "@material-ui/core/Hidden/Hidden";
import Button from "@material-ui/core/Button/Button";
import {useTranslation} from "react-i18next";
import {FirebaseContext} from "./Firebase";

const useStyles = makeStyles(theme => ({
  avatar: {
    backgroundColor: blue[100],
    color: blue[600],
  },
  logo: {
    margin: 'auto',
  },
  container: {
    display: 'flex',
    flexWrap: 'wrap',
    flexDirection: 'column'
  },
  button: {
    margin: theme.spacing(1),
  }
}));

const EmailLoginContent = ({mode, action, close}) => {
  const classes = useStyles();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const { t } = useTranslation();
  const firebase = useContext(FirebaseContext);

  console.log("Mode %o", mode);

  const actionFunction = () => {
    switch (mode) {
      case 'email':
        firebase.signInEmail(email, password);
        close();
        break;
      case 'reset':
        firebase.resetPassword(email);
        close();
        break;
      case 'signup':
        firebase.signUpEmail(email, name, password);
        close();
        break;
      default:
        throw Error("Unknown mode: " + mode);
    }
  };

  const buttoText = () => {
    switch (mode) {
      case 'email':
        return t("PAGE-AUTH-EMAIL-BUTTON");
      case 'reset':
        return t("PAGE-AUTH-RESET-BUTTON");
      case 'signup':
        return t("PAGE-AUTH-SIGNUP-BUTTON");
      default:
        throw Error("Unknown mode: " + mode);
    }
  };

  return (
    <form className={classes.container} noValidate autoComplete="off">
      <TextField
        label={t("PAGE-AUTH-EMAIL-LABEL")}
        value={email}
        onChange={(event) => {
          setEmail(event.target.value);
        }}
        margin="normal"
      />
      {mode !== 'reset'
        ? <TextField
          label={t("PAGE-AUTH-PASSWORD-LABEL")}
          value={password}
          onChange={(event) => {
            setPassword(event.target.value);
          }}
          margin="normal"/>
        : <></>}
      {mode === 'signup'
        ? <TextField
          label={t("PAGE-AUTH-NAME-LABEL")}
          value={name}
          onChange={(event) => {
            setName(event.target.value);
          }}
          margin="normal"/>
        : <></>}
      < Box mt={2}/>
      <Button variant="contained" color="primary" className={classes.button} onClick={action}>{buttoText()}</Button>
    </form>)
};

const InitialContent = ({setMode, close}) => {
  const classes = useStyles();
  const firebase = useContext(FirebaseContext);

  return (
    <form className={classes.container} noValidate autoComplete="off">
      <Button variant="contained" color="primary" className={classes.button}
              onClick={() => setMode('email')}>{t("PAGE-AUTH-EMAIL-BUTTON")}</Button>
      <Button variant="contained" color="primary" className={classes.button}
              onClick={() => { close(); firebase.signInGoogle()}}>{t("PAGE-AUTH-GOOGLE-BUTTON")}</Button>
    </form>);
};

function SignInDialog(props) {
  const classes = useStyles();
  const {setOpen, open} = props;
  const { t } = useTranslation();

  const [name, setName] = useState("");
  const [mode, setMode] = useState("initial");

  function handleClose() {
    setOpen(false);
    setMode("initial");
  }

  return (
    <Dialog onClose={handleClose} open={open}>
      <DialogTitle id="signin-dialog">
        <Hidden xsDown>
          <Box mx="auto" className={classes.container}>
            <img className={classes.logo} src={model.getValue(DATA_TYPE.app, SUB_TYPE.resources, 'logo')}/>
          </Box>
        </Hidden>
      </DialogTitle>

      <DialogContent dividers>
        {mode === 'initial'
          ? <InitialContent setMode={setMode} close={() => setOpen(false)}/>
          : <EmailLoginContent mode={mode} setMode={setMode} close={() => setOpen(false)}/>}
      </DialogContent>

      <DialogActions>
        {mode !== 'initial'
          ? <>
            <Button color='primary' className={classes.button}
                    onClick={() => setMode('signup')}>{t("PAGE-AUTH-SIGNUP-BUTTON")}</Button>
            <Button color='primary' className={classes.button}
                    onClick={() => setMode('reset')}>{t("PAGE-AUTH-RESET-BUTTON")}</Button>
            <Button color='primary' className={classes.button}
                    onClick={() => mode === 'email' ? setMode("initial") : setMode("email")}>{t("PAGE-AUTH-CANCEL-BUTTON")}</Button>
          </>
          : <Button color='primary' className={classes.button}
                    onClick={handleClose}>{t("PAGE-AUTH-CANCEL-BUTTON")}</Button>}
      </DialogActions>
    </Dialog>
  );
}

export {SignInDialog}