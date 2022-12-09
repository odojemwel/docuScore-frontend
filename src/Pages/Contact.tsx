import { Typography } from '@mui/material'
import { useContext, useEffect } from 'react'
import { PageContainerContext } from '../Components/PageContainer'

const Contact = () => {
  const NavContext = useContext(PageContainerContext)
  useEffect(() => {
    NavContext?.setTab_value(2)
  }, [])
  return (
    <>
      <Typography>Contact Us</Typography>
    </>
  )
}

export default Contact