import {createMuiTheme} from "@material-ui/core/styles";

const theme = createMuiTheme({
  palette: {
    primary: {
      light: '#becdd4',
      main: '#2874a0',
      dark: '#3d526b',
    },
    secondary: {
      light: '#eeeeee',
      main: '#eaeff1',
      dark: '#888888'
    },
    background: {
      default: '#f0f0f0',
      paper: '#f0f0f0',
    }
  },
  typography: {
    h5: {
      fontWeight: 500,
      fontSize: 26,
      letterSpacing: 0.5,
    },
  },
  shape: {
    borderRadius: 8,
  },
  props: {
    MuiTab: {
      disableRipple: true,
    },
  },
  mixins: {
    toolbar: {
      minHeight: 48,
    },
  }
});

const themeWithOverrides = {
  ...theme,
  overrides: {
    MuiTooltip: {
      tooltip: {
        borderRadius: 4,
      },
    },
    MuiDivider: {
      root: {
        backgroundColor: '#404854',
      },
    },
  },
};

export default themeWithOverrides;

