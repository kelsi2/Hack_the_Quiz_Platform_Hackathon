import {createMuiTheme} from '@material-ui/core/styles';
// import {ThemeProvider} from '@material-ui/styles';

const theme = createMuiTheme({
  palette: {
    primary: {
      light: '#e8f4fd',
      main: '#e3f2fd',
      dark: '#9ea9b1',
      contrastText: '#fff',
    },
    secondary: {
      light: '#ff7961',
      main: '#f44336',
      dark: '#ba000d',
      contrastText: '#000',
    },
  },
});

export default theme;