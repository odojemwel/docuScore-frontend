import Drawer from '@mui/material/Drawer';
import AppBar from '@mui/material/AppBar';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import HomeButton, { CreateClassButton, ExportButton, ScanButton } from './SideNavButtons';
import TopNavBar from './TopNavBar';
import { createContext, Dispatch, useState } from 'react';
import { CssBaseline } from '@mui/material';

const drawerWidth = 100;



export const NavigationContext = createContext<{
  setSelectedIndex: Dispatch<React.SetStateAction<number>>,
  selectedIndex: number,
  tab_value: number,
  setTab_value: Dispatch<React.SetStateAction<number>>,
} | null>(null);

export default function Navigation() {
  const [selectedIndex, setSelectedIndex] = useState(0);
  const [tab_value, setTab_value] = useState(0);
  return (
    <NavigationContext.Provider value={{
      selectedIndex,
      setSelectedIndex,
      tab_value,
      setTab_value,
    }}>
      {/* <Box sx={{ display: 'flex' }}> */}
      <CssBaseline />
      <AppBar
        position="fixed"
        sx={{ width: `calc(100% - ${drawerWidth}px)`, ml: `${drawerWidth}px` }}
      >
        <TopNavBar />
      </AppBar>
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
        {/* <Toolbar /> */}
        {/* <List>
          {['Inbox', 'Starred', 'Send email', 'Drafts'].map((text, index) => (
            <ListItem key={text} disablePadding>
              <ListItemButton>
                <ListItemIcon>
                  {index % 2 === 0 ? <InboxIcon /> : <MailIcon />}
                </ListItemIcon>
              </ListItemButton>
            </ListItem>
          ))}
        </List> */}
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
      {/* </Box> */}
    </NavigationContext.Provider>

  );
}