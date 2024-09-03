import { Box, Typography } from '@mui/material'
import React from 'react'

const VendorMsg = ({ message }) => {
  return (
    <Box sx={{ display: 'flex', justifyContent: 'flex-end', m: 4, color: 'white' }}>
      <Typography
        sx={{ bgcolor: 'green', color: 'white', padding: 2, borderRadius: '.7rem .7rem 0rem .7rem', maxWidth: '50vw' }}
      >
        {message}
      </Typography>
    </Box>
  )
}

export default VendorMsg
