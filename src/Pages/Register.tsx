import { Box, Button, Paper, Stack, styled, TextField, Typography } from '@mui/material'
import PageContainer from '../Components/PageContainer'

const Register = () => {
  return (
    <PageContainer>
      <Box sx={{
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        height: '100%'
      }}>
        <Paper
          elevation={6}
          sx={{
            padding: '30px',
            width: '500px',
            height: 'auto',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center'
          }}>
          <Typography variant='h4' sx={{ fontWeight: '600' }}>Register</Typography>
          <Stack sx={{ width: '100%', marginY: '30px' }} spacing={3}>
            <TextField
              size='small' color='secondary' label="Employee ID" variant="outlined"
              sx={{ width: '100%', marginRight: '5px' }}
            />
            <TextField
              size='small' color='secondary' label="Password" variant="outlined"
              type="password"
              sx={{ width: '100%' }}
            />
            <Box sx={{ display: 'flex', }}>
              <TextField
                size='small' color='secondary' label="First Name" variant="outlined"
                sx={{ width: '100%', marginRight: '5px' }}
              />
              <TextField
                size='small' color='secondary' label="Last Name" variant="outlined"
                sx={{ width: '100%', marginRight: '5px' }}
              />
            </Box>
            <Button
              variant='contained' size='medium' color='secondary'
              sx={{ width: '100%' }}>
              Create Account
            </Button>
            <Stack alignItems='center' spacing={1}>
              <Typography variant='subtitle2'>Already have an account?</Typography>
              <Button
                variant='outlined' size='medium' color='secondary'
                sx={{ width: '100%' }}>
                Login
              </Button>
            </Stack>
          </Stack>
        </Paper>
      </Box>

    </PageContainer>
  )
}

export default Register

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