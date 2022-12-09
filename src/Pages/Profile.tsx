import { Box, Button, Grid, Paper, Stack, Switch, TextField, Typography } from '@mui/material'
import { useState } from 'react'
import { useNavigate } from 'react-router-dom'



const Profile = () => {
  const [edit, setEdit] = useState(false)
  const navigate = useNavigate();
  return (
    <>
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
                  onChange={() => (setEdit(!edit))} />
              </Grid>
              <Grid item >
                <Typography>Edit Profile</Typography>
              </Grid>
            </Grid>
            <Stack width='100%' spacing={3} marginY='30px'>
              <Grid container>
                <Grid item xs={3} display='flex' justifyContent='end' alignItems='center'>
                  <Typography>Employee ID</Typography>
                </Grid>
                <Grid item xs={9}>
                  <TextField sx={{ marginLeft: 1, width: '80%' }}
                    multiline placeholder='Employee ID'
                    size='small'
                    inputProps={{
                      readOnly: !edit,
                    }}
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
                    inputProps={{
                      readOnly: !edit,
                    }} />
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
                    inputProps={{
                      readOnly: !edit,
                    }} />
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
                    inputProps={{
                      readOnly: !edit,
                    }} />
                </Grid>
              </Grid>
              <Box display='flex' justifyContent='center'>
                <Button
                  variant="contained"
                  color="secondary"
                  disabled={!edit}
                  sx={{
                    marginX: '10px'
                  }}>
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
          </Paper>
        </Stack>
      </Box >
    </>
  )
}

export default Profile