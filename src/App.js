import React from 'react';
import {FirebaseProvider} from "./firebase/Firebase";
import {ThemeProvider} from "./shared/Theme";
import {ErrorBoundary} from "./shared/Errors";
import {LandingPage} from "./pages/LandingPage";
import CssBaseline from "@material-ui/core/CssBaseline";
import {Drawer, DrawerProvider} from "./shared/Drawer";
import {BrowserRouter} from "react-router-dom";
import "./i18n";

function App() {
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
