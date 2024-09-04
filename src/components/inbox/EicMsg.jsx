import { Box, Typography } from '@mui/material'
import React from 'react'

const EicMsg = ({ message }) => {
  return (
    <Box sx={{ display: 'flex', justifyContent: 'flex-start', m: 4, color: 'black' }}>
      <Typography
        sx={{
          bgcolor: 'whitesmoke',
          color: 'black',
          padding: 2,
          borderRadius: '0rem .7rem .7rem .7rem',
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

export default EicMsg
