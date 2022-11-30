import Drawer from '@mui/material/Drawer';
import AppBar from '@mui/material/AppBar';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import HomeButton, { CreateClassButton, ExportButton, ScanButton } from './SideNavButtons';
import TopNavBar from './TopNavBar';
import { createContext, Dispatch, useState } from 'react';
import { Box, CssBaseline, Grid, Toolbar, Typography } from '@mui/material';
import Footer from './Footer';

let drawerWidth = 100;

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
  const [selectedIndex, setSelectedIndex] = useState(0);
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
              width: `calc(100% - ${props.logged_in ? drawerWidth : 0}px)`,
              ml: `${props.logged_in ? drawerWidth : 0}px`
            }}
          >
            <TopNavBar />
          </AppBar>
          {
            props.logged_in ?
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
                  <ListItem disableGutters disablePadding>
                    <HomeButton />
                  </ListItem>
                  <ListItem disablePadding disableGutters>
                    <CreateClassButton />
                  </ListItem>
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
          <Box sx={{ px: '100px', flexGrow: 1, padding: '30px', display: 'flex', justifyContent: 'center', alignItems: 'center' }} >
            {props.children}
          </Box>
          <Footer />
        </Box>
      </Box>
    </PageContainerContext.Provider>

  );
}