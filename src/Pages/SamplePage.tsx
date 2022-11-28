import { Box, Toolbar, Typography } from '@mui/material'
import React from 'react'
import Navigation from '../Components/Navigation'

const SamplePage = () => {
  return (
    <Box sx={{ display: 'flex' }}>
      <Navigation />
      <Box
        component="main"
        sx={{ flexGrow: 1, bgcolor: 'background.default', p: 3 }}>
        <Toolbar />
        <Box sx={{ px: '100px' }}>

          {/* This is where you input your page-specific components and layout */}
          <Typography> This is a Sample Page</Typography>

        </Box>
      </Box>
    </Box >
  )
}

export default SamplePage