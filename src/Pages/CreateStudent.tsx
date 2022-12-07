import { Button, styled, Typography, Stack, Paper, Grid } from '@mui/material'
import React from 'react'
import PageContainer from '../Components/PageContainer'
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';

const Class = () => {
  return (
    <PageContainer logged_in>
      <Box sx={{
        display: 'flex',
        justifyContent: 'center',
        height: '100%'
      }}>
        <Stack sx={{
          width: "100%"
        }}
          spacing={4}>
          <Typography variant='h5'>Create Student</Typography>
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
                  <Typography>Class</Typography>
                </Grid>
                <Grid item xs={9}>
                  <TextField sx={{ marginLeft: 1, width: '80%' }}
                    id="outlined-password-input"
                    multiline placeholder='Auto-populated field'
                    size='small' />
                </Grid>
              </Grid>

              <Grid container>
                <Grid item xs={3} display='flex' justifyContent='end' alignItems='center'>
                  <Typography>School ID</Typography>
                </Grid>
                <Grid item xs={9}>
                  <TextField sx={{ marginLeft: 1, width: '80%' }}
                    id="outlined-password-input"
                    multiline placeholder='Input School ID'
                    size='small' />
                </Grid>
              </Grid>

              <Grid container>
                <Grid item xs={3} display='flex' justifyContent='end' alignItems='center'>
                  <Typography>Class Number</Typography>
                </Grid>
                <Grid item xs={9}>
                  <TextField sx={{ marginLeft: 1, width: '80%' }}
                    id="outlined-password-input"
                    multiline placeholder='Input Class Number'
                    size='small' />
                </Grid>
              </Grid>

              <Grid container>
                <Grid item xs={3} display='flex' justifyContent='end' alignItems='center'>
                  <Typography>First Name</Typography>
                </Grid>
                <Grid item xs={9}>
                  <TextField sx={{ marginLeft: 1, width: '80%' }}
                    id="outlined-password-input"
                    multiline placeholder='Input First Name'
                    size='small' />
                </Grid>
              </Grid>

              <Grid container>
                <Grid item xs={3} display='flex' justifyContent='end' alignItems='center'>
                  <Typography>Last Name</Typography>
                </Grid>
                <Grid item xs={9}>
                  <TextField sx={{ marginLeft: 1, width: '80%' }}
                    id="outlined-password-input"
                    multiline placeholder='Input Last Name'
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
                  CREATE STUDENT
                </Button>
                <Button
                  variant="outlined"
                  color="secondary"
                  sx={{
                    marginX: '10px'
                  }}>
                  CANCEL
                </Button>
              </Box>
            </Stack>
          </Paper>
        </Stack>
      </Box >
    </PageContainer >
  )
}


export default Class
