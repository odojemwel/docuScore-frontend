import { Typography } from '@mui/material'
import React, { useContext, useEffect } from 'react'
import PageContainer, { PageContainerContext } from '../Components/PageContainer'

const About = () => {
  const NavContext = useContext(PageContainerContext)
  useEffect(() => {
    NavContext?.setTab_value(1)
  }, [])
  return (
    <>
      <Typography> About Us</Typography>
    </>
  )
}

export default About