import { Button, Typography, Stack, Paper, Grid, Switch } from '@mui/material'
import { useState } from 'react'
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import { useNavigate } from 'react-router-dom';

const Student = () => {
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
          <Typography variant='h5'>Edit Student</Typography>
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
                <Typography>Edit Student</Typography>
              </Grid>
            </Grid>
            <Stack width='100%' spacing={3} marginY='30px'>

              <Grid container>
                <Grid item xs={3} display='flex' justifyContent='end' alignItems='center'>
                  <Typography>School ID</Typography>
                </Grid>
                <Grid item xs={9}>
                  <TextField sx={{ marginLeft: 1, width: '80%' }}
                    multiline placeholder='120140012'
                    size='small'
                    inputProps={{
                      readOnly: true
                    }} />
                </Grid>
              </Grid>

              <Grid container>
                <Grid item xs={3} display='flex' justifyContent='end' alignItems='center'>
                  <Typography>Class Number</Typography>
                </Grid>
                <Grid item xs={9}>
                  <TextField sx={{ marginLeft: 1, width: '80%' }}
                    multiline placeholder='01'
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
                    multiline placeholder='Bilbo'
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
                    multiline placeholder='Baggins'
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
                  SAVE CHANGES
                </Button>
                <Button
                  variant="outlined"
                  color="secondary"
                  sx={{
                    marginX: '10px'
                  }}
                  onClick={() => navigate(-1)}>
                  CANCEL
                </Button>
              </Box>
            </Stack>
          </Paper>
        </Stack>
      </Box >
    </>
  )
}


export default Student
