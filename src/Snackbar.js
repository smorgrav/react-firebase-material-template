import React from "react";
import {SnackbarProvider as SnackProvider, useSnackbar} from "notistack";
import IconButton from '@material-ui/core/IconButton';
import CheckIcon from '@material-ui/icons/Check';
import {makeStyles} from "@material-ui/core";

const anchor = {
  vertical: 'bottom',
  horizontal: 'right',
};

const styles = {
  success: { backgroundColor: 'purple' },
  error: { backgroundColor: 'blue' },
  warning: { backgroundColor: 'green' },
  info: { backgroundColor: 'yellow' },
};

const classes = makeStyles(styles);

// add action to all snackbars
const notistackRef = React.createRef();
const onClickDismiss = key => () => {
  notistackRef.current.closeSnackbar(key);
};

const DismissAction = (key) => {
  return (
    <IconButton onClick={onClickDismiss(key)} >
      <CheckIcon color="secondary"/>
    </IconButton>
  )
};

const SnackbarProvider = ({children}) => {
  return (
    <SnackProvider maxSnack={3} anchorOrigin={anchor} ref={notistackRef} action={DismissAction} classes={{
      variantSuccess: classes.success,
      variantError: classes.error,
      variantWarning: classes.warning,
      variantInfo: classes.info,
    }}>
      {children}
    </SnackProvider>
  )
};

export { SnackbarProvider, useSnackbar }