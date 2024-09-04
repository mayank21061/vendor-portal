import { Box, Typography } from '@mui/material'
import React from 'react'

const VendorMsg = ({ message, time }) => {
  return (
    <Box sx={{ display: 'flex', justifyContent: 'flex-end', m: 4, color: 'white' }}>
      <Box
        sx={{
          bgcolor: '#70f870',
          borderRadius: '.7rem .7rem 0rem .7rem'
        }}
      >
        <Typography
          sx={{
            color: 'black',
            p: 2,
            pb: 0,
            maxWidth: '50vw',
            overflowWrap: 'break-word',
            wordWrap: 'break-word',
            hyphens: 'auto'
          }}
        >
          {message}
        </Typography>
        <Typography
          sx={{
            textAlign: 'right',
            color: 'black',
            fontSize: 8,
            pr: 1,
            mt: 0
          }}
        >
          {time}
        </Typography>
      </Box>
    </Box>
  )
}

export default VendorMsg
