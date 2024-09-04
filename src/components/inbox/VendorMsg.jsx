import { Box, Typography } from '@mui/material'
import React from 'react'

const VendorMsg = ({ message }) => {
  return (
    <Box sx={{ display: 'flex', justifyContent: 'flex-end', m: 4, color: 'white' }}>
      <Typography
        sx={{
          bgcolor: '#32c132',
          color: 'black',
          padding: 2,
          borderRadius: '.7rem .7rem 0rem .7rem',
          maxWidth: '50vw',
          overflowWrap: 'break-word',
          wordWrap: 'break-word',
          hyphens: 'auto'
        }}
      >
        {message}
      </Typography>
    </Box>
  )
}

export default VendorMsg
