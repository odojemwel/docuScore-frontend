import { Alert, Box, Button, Grid, Paper, Snackbar, Stack, Switch, TextField, Typography } from '@mui/material'
import { FormEvent, useContext, useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { LoginContext, teacher } from '../Helpers/Context/LoginContext'
import TeacherService from '../Helpers/Services/TeacherService'



const Profile = () => {
  const LoginProvider = useContext(LoginContext)
  const [edit, setEdit] = useState(false);
  const navigate = useNavigate();
  const [user, setUser] = useState({} as teacher);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState(false);

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    if (user.employeeId === "" || user.firstName === "" || user.lastName === "" || user.password === "") {
      setError(true);
    } else {
      TeacherService.updateTeacher(user)
        .then((response) => {
          const teacher = response.data;
          if (teacher.teacherId === parseInt(localStorage.getItem("teacherId")!)) {
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
            setSuccess(true);
            setEdit(false);
          } else {
            setError(true);
          }
        }).catch((error) => {
          setError(true);
        })
    }
  }

  useEffect(() => {
    TeacherService.getTeacherById()
      .then((response) => {
        setUser(response.data)
      })
  }, [])

  return (
    <>
      <Snackbar
        anchorOrigin={{ vertical: 'top', horizontal: 'center' }}
        open={success}
        onClose={() => setSuccess(false)}
        autoHideDuration={2000}
      >
        <Alert severity='success' onClose={() => setSuccess(false)} variant="standard">
          Profile Update Successful
        </Alert>
      </Snackbar>
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
        height: '100%'
      }}>
        <Stack sx={{
          width: "100%"
        }}
          spacing={4}>
          <Typography variant='h5'>Profile</Typography>
          <Paper
            elevation={6}
            sx={{
              width: '700px',
              padding: '30px',
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center'
            }}>
            <Grid container justifyContent='end' alignItems={'center'}>
              <Grid item >
                <Switch color='secondary'
                  checked={edit}
                  onChange={() => (setEdit(!edit))} />
              </Grid>
              <Grid item >
                <Typography>Edit Profile</Typography>
              </Grid>
            </Grid>
            <form style={{ width: '100%' }} onSubmit={handleSubmit}>
              <Stack width='100%' spacing={3} marginY='30px'>
                <Grid container>
                  <Grid item xs={3} display='flex' justifyContent='end' alignItems='center'>
                    <Typography>Employee ID</Typography>
                  </Grid>
                  <Grid item xs={9}>
                    <TextField sx={{ marginLeft: 1, width: '80%' }}
                      multiline placeholder='Employee ID'
                      size='small'
                      value={user.employeeId}
                      inputProps={{
                        readOnly: !edit,
                      }}
                      onChange={(e) => { setUser({ ...user, employeeId: e.target.value }) }}
                    />
                  </Grid>
                </Grid>
                <Grid container>
                  <Grid item xs={3} display='flex' justifyContent='end' alignItems='center'>
                    <Typography>Password</Typography>
                  </Grid>
                  <Grid item xs={9}>
                    <TextField sx={{ marginLeft: 1, width: '80%' }}
                      multiline placeholder='Password'
                      size='small'
                      value={user.password}
                      inputProps={{
                        readOnly: !edit,
                      }}
                      onChange={(e) => { setUser({ ...user, password: e.target.value }) }}
                    />
                  </Grid>
                </Grid>
                <Grid container>
                  <Grid item xs={3} display='flex' justifyContent='end' alignItems='center'>
                    <Typography>First Name</Typography>
                  </Grid>
                  <Grid item xs={9}>
                    <TextField sx={{ marginLeft: 1, width: '80%' }}
                      multiline placeholder='First Name'
                      size='small'
                      value={user.firstName}
                      inputProps={{
                        readOnly: !edit,
                      }}
                      onChange={(e) => { setUser({ ...user, firstName: e.target.value }) }}
                    />
                  </Grid>
                </Grid>
                <Grid container>
                  <Grid item xs={3} display='flex' justifyContent='end' alignItems='center'>
                    <Typography>Last Name</Typography>
                  </Grid>
                  <Grid item xs={9}>
                    <TextField sx={{ marginLeft: 1, width: '80%' }}
                      multiline placeholder='Last Name'
                      size='small'
                      value={user.lastName}
                      inputProps={{
                        readOnly: !edit,
                      }}
                      onChange={(e) => { setUser({ ...user, lastName: e.target.value }) }}
                    />
                  </Grid>
                </Grid>
                <Box display='flex' justifyContent='center'>
                  <Button
                    variant="contained"
                    color="secondary"
                    disabled={!edit}
                    sx={{
                      marginX: '10px'
                    }}
                    type="submit">
                    Save
                  </Button>
                  <Button
                    variant="outlined"
                    color="secondary"
                    onClick={() => navigate(-1)}
                    sx={{
                      marginX: '10px'
                    }}>
                    Cancel
                  </Button>
                </Box>
              </Stack>
            </form>
          </Paper>
        </Stack>
      </Box >
    </>
  )
}

export default Profile