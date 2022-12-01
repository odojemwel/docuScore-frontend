import React from 'react';
import logo from './logo.svg';
import './App.css';
import { createTheme } from '@mui/material';
import { ThemeProvider } from '@emotion/react';
import Dashboard from './Pages/Dashboard';
import SamplePage from './Pages/SamplePage';
import TopNavBar from './Components/TopNavBar';
import Login from './Pages/Login';
import Register from './Pages/Register';
import Class from './Pages/Class';
import ClassDetails from './Pages/ClassDetails';

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
    },
    MuiTextField: {
      styleOverrides: {
        root: {
          '& label.Mui-focused': {
            color: '#000000',
          },
          '& .MuiInput-underline:after': {
            borderBottomColor: '#76C8FF',
          },
          '& .MuiOutlinedInput-root': {
            '& fieldset': {
              borderColor: '#76C8FF',
              borderWidth: '2px'
            },
            '&:hover fieldset': {
              borderColor: '#76C8FF',
              borderWidth: '2px'
            },
            '&.Mui-focused fieldset': {
              borderColor: '#76C8FF',
            },
          },

          '& .MuiFilledInput-root': {
            '& fieldset': {
              borderColor: '#76C8FF',
              borderWidth: '2px'
            },
            '&:hover fieldset': {
              borderColor: '#76C8FF',
              borderWidth: '2px'
            },
            '&.Mui-focused fieldset': {
              borderColor: '#76C8FF',
            },
          },

        }
      }
    }
  }
});



function App() {
  return (
    <ThemeProvider theme={theme}>
      <Dashboard />
      {/* <Login /> */}
      {/* <Register /> */}
      {/* <Class /> */}
      {/* <ClassDetails /> */}
    </ThemeProvider>
  );
}

export default App;
