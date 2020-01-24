import React from 'react';
import logo from './logo.svg';
import {FirebaseProvider} from "./AuthContext";
import {ErrorBoundary} from "./ErrorBoundary";
import {MuiThemeProvider} from "@material-ui/core/styles";
import theme from './theme';
import {LandingPage} from "./LandingPage";
import CssBaseline from "@material-ui/core/CssBaseline";

function App() {
  return (
    <ErrorBoundary>
      <MuiThemeProvider theme={theme}>
        <CssBaseline>
          <FirebaseProvider>
            <LandingPage/>
          </FirebaseProvider>
        </CssBaseline>
      </MuiThemeProvider>
    </ErrorBoundary>
  );
}

export default App;
