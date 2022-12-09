import { Button, Typography, Stack, Paper, Grid, Switch } from '@mui/material'
import { useState } from 'react'
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import { useNavigate } from 'react-router-dom';

const Exam = () => {
  const [edit, setEdit] = useState(false);
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
          <Typography variant='h5'>Edit Exam</Typography>
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
                <Typography>Edit Exam</Typography>
              </Grid>
            </Grid>
            <Stack width='100%' spacing={3} marginY='30px'>
              <Grid container>
                <Grid item xs={3} display='flex' justifyContent='end' alignItems='center'>
                  <Typography>Exam Number</Typography>
                </Grid>
                <Grid item xs={9}>
                  <TextField sx={{ marginLeft: 1, width: '80%' }}
                    id="outlined-password-input"
                    multiline placeholder='Input Exam Number'
                    size='small'
                    inputProps={{
                      readOnly: !edit,
                    }} />
                </Grid>
              </Grid>
              <Grid container>
                <Grid item xs={3} display='flex' justifyContent='end' alignItems='center'>
                  <Typography>Exam Title</Typography>
                </Grid>
                <Grid item xs={9}>
                  <TextField sx={{ marginLeft: 1, width: '80%' }}
                    id="outlined-password-input"
                    multiline placeholder='Input Exam Title'
                    size='small'
                    inputProps={{
                      readOnly: !edit,
                    }} />
                </Grid>
              </Grid>
              <Grid container>
                <Grid item xs={3} display='flex' justifyContent='end' alignItems='center'>
                  <Typography>Total Items</Typography>
                </Grid>
                <Grid item xs={9}>
                  <TextField sx={{ marginLeft: 1, width: '80%' }}
                    id="outlined-password-input"
                    multiline placeholder='Input Total Items'
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
                  onClick={() => navigate(-1)}
                  sx={{
                    marginX: '10px',
                  }}>
                  CANCEL
                </Button>
              </Box>
            </Stack>
          </Paper>
        </Stack>
      </Box >
    </ >
  )
}


export default Exam
