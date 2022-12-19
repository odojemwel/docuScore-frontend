import { AccountCircleTwoTone } from '@mui/icons-material'
import { IconButton, Menu, MenuItem, Tab, Tabs, Toolbar, Typography } from '@mui/material'
import { useContext, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom';
import { LoginContext, teacher } from '../Helpers/Context/LoginContext';
import { PageContainerContext } from './PageContainer';

const TopNavBar = () => {
  const LoginProvider = useContext(LoginContext);
  const NavContext = useContext(PageContainerContext);
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);
  const navigate = useNavigate();

  const handleClick = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  const logout = () => {
    localStorage.clear();
    LoginProvider?.setLoggedIn({} as teacher);
    navigate("/");
  }

  return (
    <Toolbar>
      <Typography variant='h5'
        sx={{
          marginX: '10px', fontWeight: 700,
          cursor: 'pointer'
        }}
        onClick={() => {
          navigate("/");
          NavContext?.setSelectedIndex(1);
          NavContext?.setTab_value(0);
        }}>
        docuScore
      </Typography>
      <Tabs textColor='secondary'
        sx={{ flexGrow: 1 }}
        indicatorColor="secondary"
        value={NavContext?.tab_value}
        onChange={(e, value) => NavContext?.setTab_value(value)}
      >
        <Tab value={1} sx={{ color: 'primary.contrastText', marginX: '10px' }}
          label="About Us" disableTouchRipple disableRipple component={Link} to={"/about_us"} />
        <Tab value={2} sx={{ color: '#000000', marginX: '10px' }}
          label="Contact Us" disableTouchRipple disableRipple component={Link} to={"/contact_us"} />
      </Tabs>
      {
        LoginProvider?.loggedIn.teacherId ?
          <>
            <Typography sx={{ marginX: '10px' }} >
              {LoginProvider.loggedIn.firstName} {LoginProvider.loggedIn.lastName}
            </Typography>
            <IconButton sx={{ marginX: "10px" }}
              color="secondary"
              size='medium'
              onClick={handleClick}
            >
              <AccountCircleTwoTone />
            </IconButton>
          </> :
          <>
          </>
      }
      <Menu
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
      >
        <MenuItem
          onClick={() => {
            handleClose();
            navigate("/profile");
          }}
        >
          Profile</MenuItem>
        <MenuItem onClick={() => {
          handleClose();
          logout();
        }}>Logout</MenuItem>
      </Menu>

    </Toolbar>
  )
}

export default TopNavBar