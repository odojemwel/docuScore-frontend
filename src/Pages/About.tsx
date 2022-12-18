import { Typography, Stack, Paper, Grid, Box } from '@mui/material'
import { useContext, useEffect } from 'react'
import { PageContainerContext } from '../Components/PageContainer'
import image from '../images/image.png'


const About = () => {
  const NavContext = useContext(PageContainerContext)
  useEffect(() => {
    NavContext?.setTab_value(1)
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
              <Typography variant='h5'>About docuScore</Typography>
            </Grid>
          </Grid>
          <Paper
            elevation={6}
            sx={{
              width: '1000px',
              padding: '30px',
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              height: '669px'
            }}>
            <Grid item xs={3} display='flex' justifyContent='end' alignItems='center'>
              <Typography style={{ fontWeight: 'bolder', fontSize: '50px' }}> docuScore® </Typography>
            </Grid>

            <Stack width='100%' alignItems='center' spacing={3} marginY='15px'>
              <Grid item xs={15} display='flex'  >
                <Typography style={{ textAlign: "justify" }} >Docuscore is a solution concieved by team vVv to contribute to the growing number of IT solutions in the Educationsector. Docuscore aims to help secondary school teachers by letting them scan the scores of their
                  students and save it anytime to their class record sheet. A big help from the hassle of traditional inputting of scores.</Typography>
              </Grid>

              <Grid item display='flex' justifyContent='center' alignItems='center'>
                <img src={image} height={240} width={413} />
              </Grid>

              <Grid item xs={3} display='flex' justifyContent='center' alignItems='center' marginY='18px'>
                <Typography style={{ fontWeight: 'bolder', fontSize: '20px' }}>The Team vVv</Typography>
              </Grid>

              <Grid item display='flex' marginY='20px' justifyContent='center' alignItems='center' >
                <Typography style={{ textAlign: "justify", paddingBottom: '0px' }}>The team is composed of 4 third year IT students from the Cebu Institute of Technology - University. Clied Marky
                  Ebarbia, April Gem Jagmoc, Jemwel Odo, and Zhiro Javier Pineda are passionate about leveraging the power of our </Typography>
              </Grid>

              <Grid item display='flex' marginY='20px' justifyContent='center' alignItems='center' >
                <Typography style={{ textAlign: "justify", paddingTop: '-30px', marginTop: '-22px' }}> technology in looking for solutions to our daily problems. </Typography>
              </Grid>




            </Stack>
          </Paper>
        </Stack>
      </Box >
    </>
  )
}

export default About