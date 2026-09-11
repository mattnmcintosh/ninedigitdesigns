import { createTheme } from '@mui/material/styles';

const theme = createTheme({
  palette: {
    mode: 'light',
    primary: {
      main: '#2c3e50', // Sophisticated slate/navy
    },
    secondary: {
      main: '#e67e22', // Warm accent for art highlights
    },
    background: {
      default: '#fcfcfc',
      paper: '#ffffff',
    },
  },
  typography: {
    fontFamily: '"Inter", "Roboto", "Helvetica", "Arial", sans-serif',
    h3: {
      fontWeight: 700,
      letterSpacing: '-0.02em',
    },
    h4: {
      fontWeight: 600,
    },
  },
  shape: {
    borderRadius: 8,
  },
});

export default theme;