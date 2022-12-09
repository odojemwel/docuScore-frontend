import { Box, Button, Grid, Link, Paper, Stack, TextField, Typography } from '@mui/material'
import PageContainer from '../Components/PageContainer'

const Login = () => {
  return (
    <PageContainer>
      <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', margin: '20px', paddingX: '70px' }}>
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
              <Link href='#' color='secondary'>Create your account.</Link>
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
                <Stack sx={{ width: '100%', marginY: '30px' }} spacing={4}>
                  <TextField
                    size='small' label="Employee ID" variant="outlined"
                    sx={{ width: '100%' }}
                  />
                  <TextField
                    size='small' label="Password" variant="outlined"
                    type="password"
                    sx={{ width: '100%' }}
                  />
                  <Button
                    variant='contained' size='medium' color='secondary'
                    sx={{ width: '100%' }}>
                    Login
                  </Button>
                  <Stack alignItems='center' spacing={1}>
                    <Typography variant='subtitle2'>New to docuScore?</Typography>
                    <Button
                      variant='outlined' size='medium' color='secondary'
                      sx={{ width: '100%' }}>
                      Register
                    </Button>
                  </Stack>
                </Stack>
              </Paper>
            </Box>
          </Grid>
        </Grid>
      </Box>

    </PageContainer>
  )
}

export default Login
