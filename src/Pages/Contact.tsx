import { Typography, Stack, Paper, Grid, Box } from '@mui/material'
import { useContext, useEffect } from 'react'
import { PageContainerContext } from '../Components/PageContainer'
import location from '../images/location.png'
import phone from '../images/phone.png'
import email from '../images/email.png'

const Contact = () => {
  const NavContext = useContext(PageContainerContext)
  useEffect(() => {
    NavContext?.setTab_value(2)
  }, [])
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
          <Grid container justifyContent='center' alignItems={'center'}>
            <Grid item >
              <Typography variant='h5'>Contact docuScore</Typography>
            </Grid>
          </Grid>
          <Paper
            elevation={6}
            sx={{
              width: '750px',
              padding: '30px',
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center'
            }}>
            <Grid container justifyContent='center' alignItems={'center'}>
              <Grid item >
                <Typography>Have some questions? Talk to us. We’d love to hear from you</Typography>
              </Grid>
            </Grid>
            <Stack width='100%' spacing={3} marginY='30px'>
              <Grid container>
                <Grid item xs={3} display='flex' justifyContent='end' alignItems='center'>
                  <img src={location} height={100} width={100} />
                </Grid>
                <Grid item xs={8} marginY='40px' >
                  <Typography>N. Bacalso Ave., Cebu City Cebu, Philippines 6000</Typography>
                </Grid>
              </Grid>
              <Grid container>
                <Grid item xs={3} display='flex' justifyContent='end' alignItems='center'>
                  <img src={phone} height={98} width={105} />
                </Grid>
                <Grid item xs={8} marginY='20px' >
                  <Typography>+63 (32) 1234567'</Typography>
                </Grid>
              </Grid>

              <Grid container>
                <Grid item xs={3} display='flex' justifyContent='end' alignItems='center'>
                  <img src={email} height={95} width={95} />
                </Grid>
                <Grid item xs={8} marginY='20px' >
                  <Typography>customercare@docuScore.com</Typography>
                </Grid>
              </Grid>
            </Stack>
          </Paper>
        </Stack>
      </Box >
    </>
  )
}

export default Contact