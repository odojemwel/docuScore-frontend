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
import Exam from './Pages/Exam';
import DashboardProvider from './Helpers/Context/DashboardContext';
import Register from './Pages/Register';
import Login from './Pages/Login';
import { LoginContext } from './Helpers/Context/LoginContext';
import { useContext } from 'react';
import ClassProvider from './Helpers/Context/ClassContext';
import ScanScore from './Pages/Scan';


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
          '& .MuiInputBase-input::placeholder': {
            color: '#b9b5b5 ',
            opacity: '100%'
          }

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
  const LoginProvider = useContext(LoginContext);
  return (
    <ThemeProvider theme={theme}>
      <DashboardProvider>
        <ClassProvider>
          <PageContainer logged_in>
            {
              LoginProvider?.loggedIn.teacherId ?
                <Routes>
                  <Route path='/'
                    element={<Dashboard />}
                  />
                  <Route path='/class/:classId'
                    element={<Class />
                    }
                  />
                  <Route path='/edit_class/:classId'
                    element={<EditClass />}
                  />

                  <Route path='/create_class'
                    element={<CreateClass />
                    }
                  />
                  <Route path='/scan_score'
                    element={<ScanScore />}
                  />
                  <Route path='/create_student/:classId'
                    element={<CreateStudent />}
                  />
                  <Route path='/student/:studentId'
                    element={<Student />}
                  />
                  <Route path='/create_exam/:classId'
                    element={<CreateExam />}
                  />
                  <Route path='/exam/:examId'
                    element={<Exam />}
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
                  <Route path="*" element={<>404 Page Not Found</>} />
                </Routes>
                :
                <Routes>
                  <Route path="/"
                    element={<Login />}
                  />
                  <Route path='/about_us'
                    element={<About />}
                  />
                  <Route path='/contact_us'
                    element={<Contact />}
                  />
                  <Route path='/register'
                    element={<Register />}
                  />
                  <Route path="*" element={<>404 Page Not Found</>} />
                </Routes>
            }
          </PageContainer>
        </ClassProvider>
      </DashboardProvider>
    </ThemeProvider>
  );
}

export default App;
