import { AccountCircleTwoTone } from '@mui/icons-material'
import { IconButton, Tab, Tabs, Toolbar, Typography } from '@mui/material'
import { useContext } from 'react'
import { NavigationContext } from './Navigation';
import { PageContainerContext } from './PageContainer';

const TopNavBar = () => {


  const NavContext = useContext(PageContainerContext);
  return (
    <Toolbar>
      <Typography variant='h5' sx={{ marginX: '10px', fontWeight: 700 }}>
        docuScore
      </Typography>
      <Tabs textColor='secondary'
        sx={{ flexGrow: 1 }}
        indicatorColor="secondary"
        value={NavContext?.tab_value}
        onChange={(e, value) => NavContext?.setTab_value(value)}
      >
        <Tab value={1} sx={{ color: 'primary.contrastText', marginX: '10px' }}
          label="About Us" disableTouchRipple disableRipple />
        <Tab value={2} sx={{ color: '#000000', marginX: '10px' }}
          label="Contact Us" disableTouchRipple disableRipple />
      </Tabs>
      <Typography sx={{ marginX: '10px' }}>
        Bilbo Baggins
      </Typography>
      <IconButton sx={{ marginX: "10px" }}
        color="secondary"
        size='medium'>
        <AccountCircleTwoTone />
      </IconButton>
    </Toolbar>
  )
}

export default TopNavBar