import { Box, Typography } from '@mui/material'
import React from 'react'

const EicMsg = ({ message, time }) => {
  return (
    <Box sx={{ display: 'flex', justifyContent: 'flex-start', m: 4, color: 'black' }}>
      <Box
        sx={{
          borderRadius: '0rem .7rem .7rem .7rem',
          bgcolor: 'whitesmoke'
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
        <Typography sx={{ textAlign: 'right', color: 'black', fontSize: 8, pr: 1, mt: 0 }}>{time}</Typography>
      </Box>
    </Box>
  )
}

export default EicMsg
