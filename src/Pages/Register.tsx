import { Alert, Box, Button, Paper, Snackbar, Stack, styled, TextField, Typography } from '@mui/material'
import { FormEvent, useState } from 'react';
import { Link } from 'react-router-dom';
import { teacher } from '../Helpers/Context/LoginContext';
import TeacherService from '../Helpers/Services/TeacherService';

const Register = () => {
  const [employeeID, setEmployeeID] = useState("");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(false);

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    if (employeeID === "" || firstName === "" || lastName === "" || password === "") {
      setError(true);
    } else {
      TeacherService.register(employeeID, firstName, lastName, password)
        .then((response) => {
          const teacher = response.data;
          if (teacher.teacherId) {
            setEmployeeID("");
            setFirstName("");
            setLastName("");
            setPassword("");
          } else {
            console.log("registration failed");
          }
        })
    }
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
          Please Input Valid Account Information
        </Alert>
      </Snackbar>
      <Box sx={{
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        height: '100%'
      }}>
        <Paper
          elevation={6}
          sx={{
            padding: '30px',
            width: '500px',
            height: 'auto',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center'
          }}>
          <Typography variant='h4' sx={{ fontWeight: '600' }}>Register</Typography>
          <form style={{ width: '100%' }} onSubmit={handleSubmit}>
            <Stack sx={{ width: '100%', marginY: '30px' }} spacing={3}>
              <TextField
                size='small' color='secondary' label="Employee ID" variant="outlined"
                sx={{ width: '100%', marginRight: '5px' }}
                value={employeeID}
                onChange={(e) => (setEmployeeID(e.target.value))}
              />
              <Box sx={{ display: 'flex', }}>
                <TextField
                  size='small' color='secondary' label="First Name" variant="outlined"
                  sx={{ width: '100%', marginRight: '5px' }}
                  value={firstName}
                  onChange={(e) => (setFirstName(e.target.value))}
                />
                <TextField
                  size='small' color='secondary' label="Last Name" variant="outlined"
                  sx={{ width: '100%', marginRight: '5px' }}
                  value={lastName}
                  onChange={(e) => (setLastName(e.target.value))}
                />
              </Box>
              <TextField
                size='small' color='secondary' label="Password" variant="outlined"
                type="password"
                sx={{ width: '100%' }}
                value={password}
                onChange={(e) => (setPassword(e.target.value))}
              />
              <Button
                variant='contained' size='medium' color='secondary'
                sx={{ width: '100%' }}
                type="submit"
              >
                Create Account
              </Button>
              <Stack alignItems='center' spacing={1}>
                <Typography variant='subtitle2'>Already have an account?</Typography>
                <Button
                  component={Link}
                  to="/"
                  variant='outlined' size='medium' color='secondary'
                  sx={{ width: '100%' }}>
                  Login
                </Button>
              </Stack>
            </Stack>
          </form>
        </Paper>
      </Box>
    </>
  )
}

export default Register
