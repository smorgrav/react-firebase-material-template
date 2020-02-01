import React from 'react';
import {FirebaseProvider} from "./Firebase";
import {ThemeProvider} from "./Theme";
import {ErrorBoundary} from "./Errors";
import {LandingPage} from "./LandingPage";
import CssBaseline from "@material-ui/core/CssBaseline";
import {Drawer, DrawerProvider} from "./Drawer";
import {BrowserRouter} from "react-router-dom";

function App() {
  console.log("Env: %o", process.env);
  return (
    <BrowserRouter>
      <ErrorBoundary>
        <ThemeProvider>
          <CssBaseline>
            <FirebaseProvider>
              <DrawerProvider>
                <LandingPage/>
                <Drawer anchor='left'>
                  <h2>Left drawer</h2>
                </Drawer>
                <Drawer anchor='right'>
                  <h2>Right drawer</h2>
                </Drawer>
              </DrawerProvider>
            </FirebaseProvider>
          </CssBaseline>
        </ThemeProvider>
      </ErrorBoundary>
    </BrowserRouter>
  );
}

export default App;
