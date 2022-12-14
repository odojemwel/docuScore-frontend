import { useContext } from 'react'
import { CreateNewFolderOutlined, CreateNewFolderRounded, DocumentScannerOutlined, DocumentScannerRounded, GetAppOutlined, GetAppRounded, HomeOutlined, HomeRounded } from '@mui/icons-material'
import { Avatar, Box, IconButton, styled, Typography } from '@mui/material'
import { PageContainerContext } from './PageContainer';



const HomeButton = () => {
  const NavContext = useContext(PageContainerContext);

  return (
    <BoxContainer
      onClick={() => {
        NavContext?.setSelectedIndex(1);
        NavContext?.setTab_value(0);
      }}
    >
      {NavContext?.selectedIndex === 1 && NavContext.tab_value === 0 ?
        <>
          <Avatar>
            <IconButton color='primary' disableRipple>
              <HomeRounded />
            </IconButton>
          </Avatar >
        </> :
        <>
          <StyledButton color='primary'>
            <HomeOutlined />
          </StyledButton>
        </>
      }
      <Typography variant='caption'
        sx={{ textColor: 'primary' }}
        color="#ffffff">
        Home
      </Typography>
    </BoxContainer>

  )
}

export default HomeButton


const StyledButton = styled(IconButton)
  `&:hover {
    background-color: #76C8FF;
  }
`;

const BoxContainer = styled(Box)({
  display: 'flex',
  flexDirection: 'column',
  justifyContent: 'center',
  alignItems: 'center',
  backgroundColor: '#18A0FB',
  width: '100px',
  height: '60px',
  padding: '5px',
  marginTop: '5px',
  marginBottom: '5px',
  cursor: 'pointer'
});



export const CreateClassButton = () => {
  const NavContext = useContext(PageContainerContext);
  return (
    <BoxContainer
      onClick={() => {
        NavContext?.setSelectedIndex(2);
        NavContext?.setTab_value(0);
      }}>
      {NavContext?.selectedIndex === 2 && NavContext.tab_value === 0 ?
        <>
          <Avatar>
            <IconButton color='primary' disableRipple>
              <CreateNewFolderRounded />
            </IconButton>
          </Avatar>
        </> :
        <>
          <StyledButton color='primary'>
            <CreateNewFolderOutlined />
          </StyledButton>
        </>
      }
      <Typography variant='caption'
        sx={{ textColor: 'primary' }}
        color="#ffffff">
        Create Class
      </Typography>
    </BoxContainer>

  )
}



export const ScanButton = () => {
  const NavContext = useContext(PageContainerContext);
  return (
    <BoxContainer
      onClick={() => {
        NavContext?.setSelectedIndex(3);
        NavContext?.setTab_value(0);
      }}>
      {NavContext?.selectedIndex === 3 && NavContext.tab_value === 0 ?
        <>
          <Avatar>
            <IconButton color='primary' disableRipple>
              <DocumentScannerRounded />
            </IconButton>
          </Avatar>
        </> :
        <>
          <StyledButton color='primary'>
            <DocumentScannerOutlined />
          </StyledButton>
        </>
      }
      <Typography variant='caption'
        sx={{ textColor: 'primary' }}
        color="#ffffff">
        Scan
      </Typography>
    </BoxContainer>
  )
}




export const ExportButton = () => {
  const NavContext = useContext(PageContainerContext);
  return (
    <BoxContainer
      onClick={() => {
        NavContext?.setSelectedIndex(4);
        NavContext?.setTab_value(0);
      }}>
      {NavContext?.selectedIndex === 4 && NavContext.tab_value === 0 ?
        <>
          <Avatar>
            <IconButton color='primary' disableRipple>
              <GetAppRounded />
            </IconButton>
          </Avatar>
        </> :
        <>
          <StyledButton color='primary'>
            <GetAppOutlined />
          </StyledButton>
        </>
      }
      <Typography variant='caption'
        sx={{ textColor: 'primary' }}
        color="#ffffff">
        Export
      </Typography>
    </BoxContainer>
  )
}
