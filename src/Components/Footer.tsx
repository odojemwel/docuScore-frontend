import { Box, Divider, Typography } from '@mui/material'



export default function () {
  return (
    <footer style={{ marginTop: 'auto', paddingBottom: '10px' }}>
      <Divider variant='middle' sx={{ borderBottomWidth: '1px', borderColor: '#8E8E8E' }} />
      <Box sx={{ paddingTop: '15px', display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center' }}>
        <Typography variant='caption'>Clied Marky Ebarbia BSIT-3 | CSIT321 G2 - C0</Typography>
        <Typography variant='caption'>Copyright Ⓒ vVv. All Rights Reserved.</Typography>
      </Box>
    </footer>
  )
}
