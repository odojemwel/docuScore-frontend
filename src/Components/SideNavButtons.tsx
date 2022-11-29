import React, { createContext, Dispatch, SetStateAction, useContext, useState } from 'react'
import { CreateNewFolderOutlined, CreateNewFolderRounded, DocumentScannerOutlined, DocumentScannerRounded, GetAppOutlined, GetAppRounded, HomeOutlined, HomeRounded } from '@mui/icons-material'
import { Avatar, Box, IconButton, styled, Typography } from '@mui/material'
import { NavigationContext } from './Navigation';
import { PageContainerContext } from './PageContainer';


interface HomeBtnContexts {
  active: boolean,
  setActive: Dispatch<SetStateAction<boolean>>
}

export const HomeBtnContext = createContext<HomeBtnContexts | null>(null);

const HomeButton = () => {
  const [active, setActive] = useState(false);
  const NavContext = useContext(PageContainerContext);

  return (
    <HomeBtnContext.Provider value={{ active, setActive }}>
      <BoxContainer
        onClick={() => {
          NavContext?.setSelectedIndex(1);
          NavContext?.setTab_value(0);
        }}
      >
        {NavContext?.selectedIndex === 1 && NavContext.tab_value === 0 ?
          <HomeActive /> : <HomeNotActive />}
        <Typography variant='caption'
          sx={{ textColor: 'primary' }}
          color="#ffffff">
          Home
        </Typography>
      </BoxContainer>
    </HomeBtnContext.Provider>

  )
}

export default HomeButton

export const HomeActive = () => {

  return (
    <Avatar>
      <IconButton color='primary' disableRipple>
        <HomeRounded />
      </IconButton>
    </Avatar >

  )
}

export const HomeNotActive = () => {
  return (
    <StyledButton color='primary'>
      <HomeOutlined />
    </StyledButton>
  )
}

const StyledButton = styled(IconButton)`
  &:hover {
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



interface CreateClassBtnContexts {
  active: boolean,
  setActive: Dispatch<SetStateAction<boolean>>
}

export const CreateClassBtnContext = createContext<CreateClassBtnContexts | null>(null);

export const CreateClassButton = () => {
  const [active, setActive] = useState(false)
  const NavContext = useContext(PageContainerContext);
  return (
    <CreateClassBtnContext.Provider value={{ active, setActive }}>
      <BoxContainer
        onClick={() => {
          NavContext?.setSelectedIndex(2);
          NavContext?.setTab_value(0);
        }}>
        {NavContext?.selectedIndex === 2 && NavContext.tab_value === 0 ?
          <CreateClassActive /> : <CreateClassNotActive />}
        <Typography variant='caption'
          sx={{ textColor: 'primary' }}
          color="#ffffff">
          Create Class
        </Typography>
      </BoxContainer>
    </CreateClassBtnContext.Provider>

  )
}

export const CreateClassActive = () => {
  // const CCContext = useContext(CreateClassBtnContext)
  return (
    <Avatar>
      <IconButton color='primary' disableRipple>
        <CreateNewFolderRounded />
      </IconButton>
    </Avatar>
  )
}

export const CreateClassNotActive = () => {
  return (
    <StyledButton color='primary'>
      <CreateNewFolderOutlined />
    </StyledButton>
  )
}





interface ScanBtnContexts {
  active: boolean,
  setActive: Dispatch<SetStateAction<boolean>>
}

export const ScanBtnContext = createContext<ScanBtnContexts | null>(null);

export const ScanButton = () => {
  const [active, setActive] = useState(false)
  const NavContext = useContext(PageContainerContext);
  return (
    <ScanBtnContext.Provider value={{ active, setActive }}>
      <BoxContainer
        onClick={() => {
          NavContext?.setSelectedIndex(3);
          NavContext?.setTab_value(0);
        }}>
        {NavContext?.selectedIndex === 3 && NavContext.tab_value === 0 ?
          <ScanButtonActive /> : <ScanButtonNotActive />}
        <Typography variant='caption'
          sx={{ textColor: 'primary' }}
          color="#ffffff">
          Scan
        </Typography>
      </BoxContainer>
    </ScanBtnContext.Provider>
  )
}

export const ScanButtonActive = () => {
  return (
    <Avatar>
      <IconButton color='primary' disableRipple>
        <DocumentScannerRounded />
      </IconButton>
    </Avatar>
  )
}

export const ScanButtonNotActive = () => {
  return (
    <StyledButton color='primary'>
      <DocumentScannerOutlined />
    </StyledButton>
  )
}


interface ExportBtnContexts {
  active: boolean,
  setActive: Dispatch<SetStateAction<boolean>>
}

export const ExportBtnContext = createContext<ExportBtnContexts | null>(null);

export const ExportButton = () => {
  const [active, setActive] = useState(false)
  const NavContext = useContext(PageContainerContext);
  return (
    <ExportBtnContext.Provider value={{ active, setActive }}>
      <BoxContainer
        onClick={() => {
          NavContext?.setSelectedIndex(4);
          NavContext?.setTab_value(0);
        }}>
        {NavContext?.selectedIndex === 4 && NavContext.tab_value === 0 ?
          <ExportButtonActive /> : <ExportButtonNotActive />}
        <Typography variant='caption'
          sx={{ textColor: 'primary' }}
          color="#ffffff">
          Export
        </Typography>
      </BoxContainer>
    </ExportBtnContext.Provider>
  )
}

export const ExportButtonActive = () => {
  return (
    <Avatar>
      <IconButton color='primary' disableRipple>
        <GetAppRounded />
      </IconButton>
    </Avatar>
  )
}

export const ExportButtonNotActive = () => {
  return (
    <StyledButton color='primary'>
      <GetAppOutlined />
    </StyledButton>
  )
}