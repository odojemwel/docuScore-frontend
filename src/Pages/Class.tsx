import { Button, styled, Typography,Stack } from '@mui/material'
import React from 'react'
import PageContainer from '../Components/PageContainer'
import Box from '@mui/material/Box';
import Navigation from '../Components/Navigation'
import TextField from '@mui/material/TextField';

const SamplePage = () => {
  return (
    <PageContainer logged_in>
      <Typography variant="h4" sx={{marginLeft:4}}>Create Exam </Typography>
      <Box
      
    sx={{
        marginTop: 20,
        width: '60%',
        height: '%',
        backgsroundColor: 'background.default',
        border: 1,
        borderColor: 'white',
        mx: 'auto',
        flexGrow: 1, 
        boxShadow:4,
        padding: '20px',
      }}
    >
        <Box sx={{display: 'flex', alignItems: 'center',justifyContent: 'center',  marginTop: 5,}}>
            <Typography variant="h6" component="div" sx={{marginRight: 2}}> Class Name</Typography>
            <StyledTextField sx={{marginLeft: 1, width: '40%'}} label=" Class Name" id="outlined-password-input" />
        </Box>

  

    <Box sx={{display: 'flex', alignItems: 'center',justifyContent: 'center', marginTop: 5}}>
            <Typography variant="h6" component="div" sx={{marginRight: 1}}> Year Level </Typography>
            <StyledTextField sx={{marginLeft: 2, width: '40%',}} label=" Input Exam number" id="outlined-read-only-input" />
        </Box>
    
   
<Box sx={{display: 'flex', alignItems: 'center',justifyContent: 'center', marginTop: 5}}>
            <Typography variant="h6" component="div" sx={{marginRight: 2}}> Section </Typography>
            <StyledTextField sx={{marginLeft: 3, width: '40%'}} label=" Input Exam number" id="outlined-password-input" />
        </Box>
        <Button variant="contained" sx={{marginLeft: 65, marginTop: 2}}>Cancel</Button>
        <Box>
        <Button variant="contained" sx={{marginLeft: 45, marginTop: 2}} color="secondary">Create Class</Button>    
        </Box>
        </Box>


    </PageContainer>
    
    
  )
}


export default SamplePage

const StyledTextField = styled(TextField)({
    '& label.Mui-focused': {
      color: '#000000',
    },
    '& .MuiInput-underline:after': {
      borderBottomColor: '#76C8FF',
    },
    '& .MuiOutlinedInput-root': {
      '& fieldset': {
        borderColor: '#76C8FF',
        borderWidth: '2px'
      },
      '&:hover fieldset': {
        borderColor: '#76C8FF',
        borderWidth: '2px'
      },
      '&.Mui-focused fieldset': {
        borderColor: '#76C8FF',
      },
    },
  });