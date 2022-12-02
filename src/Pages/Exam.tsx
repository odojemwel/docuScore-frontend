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
          <Typography variant='h5'>Exam Details</Typography>
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
                  <Typography>Exam Number</Typography>
                </Grid>
                <Grid item xs={9}>
                  <TextField sx={{ marginLeft: 1, width: '80%' }}
                  InputProps={{
                    readOnly: true,
                  }}
                    id="outlined-password-input"
                    multiline placeholder='Class Name'
                    size='small' />
                </Grid>
              </Grid>
              <Grid container>
                <Grid item xs={3} display='flex' justifyContent='end' alignItems='center'>
                  <Typography>Exam title</Typography>
                </Grid>
                <Grid item xs={9}>
                  <TextField sx={{ marginLeft: 1, width: '80%' }}
                  InputProps={{
                    readOnly: true,
                  }}
                    id="outlined-password-input"
                    multiline placeholder='Year Level'
                    size='small' />
                </Grid>
              </Grid>
              <Grid container>
                <Grid item xs={3} display='flex' justifyContent='end' alignItems='center'>
                  <Typography>Number of items</Typography>
                </Grid>
                <Grid item xs={9}>
                  <TextField sx={{ marginLeft: 1, width: '80%' }}
                  InputProps={{
                    readOnly: true,
                  }}
                    id="outlined-password-input"
                    multiline placeholder='Section'
                    size='small' />
                </Grid>
              </Grid>
              
            </Stack>
          </Paper>
        </Stack>
      </Box >
    </PageContainer >
  )
}


export default Class
