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
        <Stack sx={{ width: "100%" }} spacing={4}>
          <Grid container justifyContent='center' alignItems={'center'}>
            <Grid item >
              <Typography variant='h4'>About docuScore</Typography>
            </Grid>
          </Grid>
          <Paper
            elevation={5}
            sx={{
              width: '1000px',
              padding: '30px',
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
            }}>
            <Stack width='100%' spacing={6}>
              <Box>
                <Box display='flex' justifyContent='center' alignItems='center'>
                  <Typography variant='h3' style={{ fontWeight: 'bolder' }}>
                    docuScore®
                  </Typography>
                </Box>
                <Box>
                  <Typography style={{ textAlign: "center" }} >
                    Docuscore is a solution concieved by team vVv to contribute to the growing number of IT solutions in the Educationsector. Docuscore aims to help secondary school teachers by letting them scan the scores of their
                    students and save it anytime to their class record sheet. A big help from the hassle of traditional inputting of scores.
                  </Typography>
                </Box>
              </Box>
              <Box>
                <Box display='flex' justifyContent='center' alignItems='center'>
                  <img src={image} height={100} />
                </Box>

                <Box display='flex' justifyContent='center' alignItems='center'>
                  <Typography variant='h6' style={{ fontWeight: 'bolder' }}>The Team vVv</Typography>
                </Box>

                <Grid item display='flex' justifyContent='center' alignItems='center' >
                  <Typography style={{ textAlign: "center" }}>The team is composed of 4 third year IT students from the Cebu Institute of Technology - University. Clied Marky Ebarbia, April Gem Jagmoc, Jemwel Odo, and Zhiro Javier Pineda are passionate about leveraging the power of our technology in looking for solutions to our daily problems. </Typography>
                </Grid>
              </Box>





            </Stack>
          </Paper>
        </Stack>
      </Box >
    </>
  )
}

export default About