import React from 'react';
import logo from './logo.svg';
import './App.css';
import { createTheme } from '@mui/material';
import { ThemeProvider } from '@emotion/react';
import Dashboard from './Pages/Dashboard';
import SamplePage from './Pages/SamplePage';

const theme = createTheme({
  typography: {
    fontFamily: ['Poppins', "sans-serif"].join(','),
    fontWeightLight: 400,
    fontWeightRegular: 500,
    fontWeightMedium: 600,
    fontWeightBold: 700,
  },
  palette: {
    primary: {
      main: '#ffffff',
      contrastText: '#000000'
    },
    secondary: {
      main: '#18A0FB',
      contrastText: '#ffffff'
    },
    text: {
      primary: "#000000"
    }
  },
  components: {
    MuiAvatar: {
      styleOverrides: {
        root: {
          backgroundColor: '#76C8FF',
          width: '40px',
          height: '40px'
        }
      }
    }
  }
});



function App() {
  return (
    <ThemeProvider theme={theme}>
      <Dashboard />
      {/* <SamplePage /> */}
    </ThemeProvider>
  );
}

export default App;
