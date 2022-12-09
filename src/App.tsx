import './App.css';
import { createTheme } from '@mui/material';
import { ThemeProvider } from '@emotion/react';
import Dashboard from './Pages/Dashboard';
import CreateStudent from './Pages/CreateStudent';
import Profile from './Pages/Profile';
import { Route, Routes } from 'react-router-dom';
import Class from './Pages/Class';
import CreateClass from './Pages/CreateClass';
import EditClass from './Pages/EditClass';
import About from './Pages/About';
import Contact from './Pages/Contact';
import PageContainer from './Components/PageContainer';
import CreateExam from './Pages/CreateExam';
import Student from './Pages/Student';
import EditExam from './Pages/Exam';


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
    },
    MuiMenuItem: {
      styleOverrides: {
        root: {
          fontSize: '0.8em'
        }
      }
    }
  }
});



function App() {
  return (
    <ThemeProvider theme={theme}>
      <PageContainer logged_in>
        <Routes>
          <Route path='/'
            element={<Dashboard />}
          />
          <Route path='/class'
            element={<Class />}
          />
          <Route path='/create_class'
            element={<CreateClass />}
          />
          <Route path='/edit_class'
            element={<EditClass />}
          />
          <Route path='/create_student'
            element={<CreateStudent />}
          />
          <Route path='/student'
            element={<Student />}
          />
          <Route path='/create_exam'
            element={<CreateExam />}
          />
          <Route path='/exam'
            element={<EditExam />}
          />
          <Route path='/profile'
            element={<Profile />}
          />
          <Route path='/about_us'
            element={<About />}
          />
          <Route path='/contact_us'
            element={<Contact />}
          />
        </Routes>
      </PageContainer>
    </ThemeProvider>
  );
}

export default App;
