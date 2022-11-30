import { SearchOutlined } from '@mui/icons-material'
import { Box, Button, Divider, FormControl, Grid, IconButton, InputAdornment, TextField, Toolbar, Typography } from '@mui/material'
import ClassCard, { CreateClassCard, InactiveClass } from '../Components/ClassCard'
import Footer from '../Components/Footer'
import Navigation from '../Components/Navigation'
import PageContainer from '../Components/PageContainer'

const Dashboard = () => {
  return (
    <PageContainer logged_in>
      <Box sx={{ px: '100px' }}>
        <Box sx={{
          display: 'flex',
          justifyContent: 'flex-end',
          height: '50px',
          paddingY: '5px',
          marginBottom: '20px',
          alignItems: 'center'
        }}>
          <Typography variant='h5' gutterBottom sx={{ flexGrow: 1, fontWeight: '500' }}>
            Classes
          </Typography>
          <FormControl variant='standard'>
            <TextField id="outlined-search"
              label="Search a Class"
              type="search"
              InputProps={{
                endAdornment: (
                  <InputAdornment position="end">
                    <IconButton>
                      <SearchOutlined />
                    </IconButton>
                  </InputAdornment>
                ),
              }}
              variant='outlined'
              color='secondary'
              size='small'
              sx={{ marginRight: '10px' }} />
          </FormControl>
          <Button variant='contained' size='small' color='secondary'
            sx={{ marginLeft: '10px' }}>
            <Typography variant='button'>Create Class</Typography>
          </Button>
        </Box>
        <Grid container columnSpacing='50px' rowSpacing='30px'>
          <Grid item xs={4}>
            <ClassCard />
          </Grid>
          <Grid item xs={4}>
            <ClassCard />
          </Grid>
          <Grid item xs={4}>
            <ClassCard />
          </Grid>
          <Grid item xs={4}>
            <ClassCard />
          </Grid>
          <Grid item xs={4}>
            <CreateClassCard />
          </Grid>
        </Grid>

        <Divider sx={{ my: '30px', borderBottomWidth: '1px', borderColor: '#000000' }} variant='middle' />

        <Box sx={{
          display: 'flex',
          justifyContent: 'flex-end',
          height: '50px',
          paddingY: '5px',
          marginY: '20px',
          alignItems: 'center'
        }}>
          <Typography gutterBottom sx={{ flexGrow: 1, fontWeight: '500' }}>
            Inactive Classes
          </Typography>
        </Box>
        <Grid container columnSpacing='30px' rowSpacing='30px'>
          <Grid item xs={3}>
            <InactiveClass />
          </Grid>
          <Grid item xs={3}>
            <InactiveClass />
          </Grid>
          <Grid item xs={3}>
            <InactiveClass />
          </Grid>
          <Grid item xs={3}>
            <InactiveClass />
          </Grid>
          <Grid item xs={3}>
            <InactiveClass />
          </Grid>
        </Grid>
      </Box>
    </PageContainer>
  )
}

export default Dashboard