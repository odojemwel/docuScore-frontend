import { Button, Typography, Stack, Paper, Grid } from '@mui/material'
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import { useNavigate } from 'react-router-dom';

const EditClass = () => {
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
          <Typography variant='h5'>Edit Class</Typography>
          <Paper
            elevation={6}
            sx={{
              width: '700px',
              padding: '30px',
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center'
            }}>
            <Stack width='100%' spacing={3} marginY='30px'>
              <Grid container>
                <Grid item xs={3} display='flex' justifyContent='end' alignItems='center'>
                  <Typography>Class Name</Typography>
                </Grid>
                <Grid item xs={9}>
                  <TextField sx={{ marginLeft: 1, width: '80%' }}
                    id="outlined-password-input"
                    multiline placeholder='Input Class Name'
                    size='small' />
                </Grid>
              </Grid>
              <Grid container>
                <Grid item xs={3} display='flex' justifyContent='end' alignItems='center'>
                  <Typography>Year Level</Typography>
                </Grid>
                <Grid item xs={9}>
                  <TextField sx={{ marginLeft: 1, width: '80%' }}
                    id="outlined-password-input"
                    multiline placeholder='Input Year Level'
                    size='small' />
                </Grid>
              </Grid>
              <Grid container>
                <Grid item xs={3} display='flex' justifyContent='end' alignItems='center'>
                  <Typography>Section</Typography>
                </Grid>
                <Grid item xs={9}>
                  <TextField sx={{ marginLeft: 1, width: '80%' }}
                    id="outlined-password-input"
                    multiline placeholder='Input Section'
                    size='small' />
                </Grid>
              </Grid>
              <Box display='flex' justifyContent='center'>
                <Button
                  variant="contained"
                  color="secondary"
                  sx={{
                    marginX: '10px'
                  }}>
                  Update Class
                </Button>
                <Button
                  variant="outlined"
                  color="secondary"
                  sx={{
                    marginX: '10px'
                  }}
                  onClick={() => navigate(-1)}>
                  Cancel
                </Button>
              </Box>
            </Stack>
          </Paper>
        </Stack>
      </Box >
    </ >
  )
}


export default EditClass