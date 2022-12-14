import { Alert, Box, Button, Grid, Link, Paper, Snackbar, Stack, TextField, Typography } from '@mui/material'
import { FormEvent, useContext, useState } from 'react';
import { Link as LinkRouter } from 'react-router-dom';
import { LoginContext } from '../Helpers/Context/LoginContext';
import TeacherService from '../Helpers/Services/TeacherService';

const Login = () => {
  const LoginProvider = useContext(LoginContext);
  const [user, setUser] = useState("");
  const [pswd, setPswd] = useState("");
  const [error, setError] = useState(false);

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    TeacherService.login(user, pswd)
      .then((response) => {
        if (response.data === "") {
          setError(true);
        } else {
          console.log(response.data)
          const teacher = response.data;
          localStorage.setItem("teacherId", `${teacher.teacherId}`);
          localStorage.setItem("employeeId", `${teacher.employeeId}`);
          localStorage.setItem("firstName", `${teacher.firstName}`);
          localStorage.setItem("lastName", `${teacher.lastName}`);
          LoginProvider!.setLoggedIn(
            {
              teacherId: parseInt(localStorage.getItem("teacherId")!),
              employeeId: localStorage.getItem("employeeId")!,
              firstName: localStorage.getItem("firstName")!,
              lastName: localStorage.getItem("lastName")!,
            }
          )
        }
      })
    setUser("");
    setPswd("");
  }

  return (
    <>
      <Snackbar
        anchorOrigin={{ vertical: 'top', horizontal: 'center' }}
        open={error}
        onClose={() => setError(false)}
        autoHideDuration={2000}
      >
        <Alert severity='error' onClose={() => setError(false)} variant="standard">
          Wrong Login Credentials
        </Alert>
      </Snackbar>
      <Box sx={{ display: 'flex', justifyContent: 'center', margin: '20px', paddingX: '70px' }}>
        <Grid container columnSpacing={20}>
          <Grid item xs={6} sx={{ display: 'flex', flexDirection: 'column' }}>
            <Box sx={{
              flexGrow: .5,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              flexDirection: 'column',
              marginY: '30px'
            }}>
              <Typography variant='h4' sx={{ fontWeight: '700' }}> Welcome!</Typography>
              <Typography variant='h4' sx={{ fontWeight: '700' }}> You're one step away</Typography>
              <Typography variant='h4' sx={{ fontWeight: '700' }}> from your account.</Typography>
            </Box>
            <Box sx={{
              display: 'flex',
              alignItems: 'center',
              flexDirection: 'column',
              marginY: '30px'
            }}>
              <Typography> New here?</Typography>
              <Typography> Register and experience docuScore.</Typography>
              <Link href='/register' color='secondary'>Create your account.</Link>
            </Box>
          </Grid>
          <Grid item xs={6}>
            <Box sx={{
              display: 'flex',
              justifyContent: 'center',
              marginY: '30px'
            }} >
              <Paper
                elevation={6}
                sx={{
                  padding: '30px',
                  width: '500px',
                  height: '450px',
                  display: 'flex',
                  flexDirection: 'column',
                  alignItems: 'center'
                }}>
                <Typography variant='h4' sx={{ fontWeight: '600' }}>Login</Typography>

                <form style={{ width: '100%' }} onSubmit={handleSubmit}>
                  <Stack sx={{ width: '100%', marginY: '30px' }} spacing={4}>
                    <TextField
                      size='small' label="Employee ID" variant="outlined"
                      sx={{ width: '100%' }}
                      id="employeeId"
                      value={user}
                      onChange={(e) => setUser(e.target.value)}
                    />
                    <TextField
                      size='small' label="Password" variant="outlined"
                      type="password"
                      sx={{ width: '100%' }}
                      id="password"
                      value={pswd}
                      onChange={(e) => setPswd(e.target.value)}
                    />
                    <Button
                      variant='contained' size='medium' color='secondary'
                      sx={{ width: '100%' }}
                      type="submit">
                      Login
                    </Button>
                    <Stack alignItems='center' spacing={1}>
                      <Typography variant='subtitle2'>New to docuScore?</Typography>
                      <Button
                        component={LinkRouter}
                        to="/register"
                        variant='outlined' size='medium' color='secondary'
                        sx={{ width: '100%' }}>
                        Register
                      </Button>
                    </Stack>
                  </Stack>
                </form>
              </Paper>
            </Box>
          </Grid>
        </Grid>
      </Box>
    </>
  )
}

export default Login
