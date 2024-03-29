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
              <Typography variant='h4'>Contact docuScore</Typography>
            </Grid>
          </Grid>
          <Paper
            elevation={5}
            sx={{
              width: '750px',
              padding: '30px',
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center'
            }}>
            <Stack marginY={5} rowGap={5} width='100%'>
              <Grid container justifyContent='center' alignItems={'center'}>
                <Grid item >
                  <Typography>
                    Have some questions? Talk to us. We’d love to hear from you
                  </Typography>
                </Grid>
              </Grid>
              <Grid container spacing={5} alignItems='center'>
                <Grid item xs={3} display='flex' justifyContent='end' alignItems='center'>
                  <img src={location} height={50} />
                </Grid>
                <Grid item xs={9} display={'flex'} justifyContent='start' >
                  <Typography>
                    N. Bacalso Ave., Cebu City Cebu, Philippines 6000
                  </Typography>
                </Grid>
              </Grid>
              <Grid container spacing={5} alignItems='center'>
                <Grid item xs={3} display='flex' justifyContent='end' alignItems='center'>
                  <img src={phone} height={50} />
                </Grid>
                <Grid item xs={9} display={'flex'} justifyContent='start' >
                  <Typography>
                    +63 (32) 1234567
                  </Typography>
                </Grid>
              </Grid>
              <Grid container spacing={5} alignItems='center'>
                <Grid item xs={3} display='flex' justifyContent='end' alignItems='center'>
                  <img src={email} height={50} />
                </Grid>
                <Grid item xs={9} display={'flex'} justifyContent='start' >
                  <Typography>
                    customercare@docuScore.co
                  </Typography>
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