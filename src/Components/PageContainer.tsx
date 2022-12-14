import Drawer from '@mui/material/Drawer';
import AppBar from '@mui/material/AppBar';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import HomeButton, { CreateClassButton, ExportButton, ScanButton } from './SideNavButtons';
import TopNavBar from './TopNavBar';
import { createContext, Dispatch, useContext, useState } from 'react';
import { Box, CssBaseline, Toolbar } from '@mui/material';
import Footer from './Footer';
import { Link } from 'react-router-dom';
import { LoginContext } from '../Helpers/Context/LoginContext';

let drawerWidth = 101;

export interface PageContainerProps {
  children: React.ReactNode,
  logged_in?: boolean | false,
}

export const PageContainerContext = createContext<{
  setSelectedIndex: Dispatch<React.SetStateAction<number>>,
  selectedIndex: number,
  tab_value: number,
  setTab_value: Dispatch<React.SetStateAction<number>>,
  logged_in: boolean,
} | null>(null);

export default function PageContainer(props: PageContainerProps) {
  const LoginProvider = useContext(LoginContext);
  const [selectedIndex, setSelectedIndex] = useState(1);
  const [tab_value, setTab_value] = useState(0);
  const [logged_in, setLogged_in] = useState(props.logged_in!)
  return (
    <PageContainerContext.Provider value={{
      selectedIndex,
      setSelectedIndex,
      tab_value,
      setTab_value,
      logged_in,
    }}>
      <Box sx={{ display: 'flex' }}>
        <Box>
          <CssBaseline />
          <AppBar
            position="fixed"
            sx={{
              width: `calc(100% - ${LoginProvider?.loggedIn.teacherId ? drawerWidth : 0}px)`,
              ml: `${LoginProvider?.loggedIn.teacherId ? drawerWidth : 0}px`
            }}
          >
            <TopNavBar />
          </AppBar>
          {
            LoginProvider?.loggedIn.teacherId ?
              <Drawer
                sx={{
                  width: drawerWidth,
                  flexShrink: 0,
                  '& .MuiDrawer-paper': {
                    width: drawerWidth,
                    boxSizing: 'border-box',
                    backgroundColor: '#18A0FB'
                  },
                }}
                variant="permanent"
                anchor="left"
              >
                <List>
                  <Link style={{ textDecoration: 'none' }} to={"/"}>
                    <ListItem disableGutters disablePadding>
                      <HomeButton />
                    </ListItem>
                  </Link>
                  <Link style={{ textDecoration: 'none' }} to={"/create_class"}>
                    <ListItem disablePadding disableGutters>
                      <CreateClassButton />
                    </ListItem>
                  </Link>
                  <ListItem disablePadding disableGutters>
                    <ScanButton />
                  </ListItem>
                  <ListItem disablePadding disableGutters>
                    <ExportButton />
                  </ListItem>
                </List>
              </Drawer>
              : <></>
          }
        </Box>

        <Box component="main"
          sx={{ flexGrow: 1, bgcolor: 'background.default', minHeight: '100vh', display: 'flex', flexDirection: 'column' }}>
          <Toolbar />
          <Box sx={{ px: '100px', flexGrow: 1, py: '30px', display: 'flex', justifyContent: 'center' }} >
            {props.children}
          </Box>
          <Footer />
        </Box>
      </Box>
    </PageContainerContext.Provider>

  );
}