import { Box, Typography } from '@mui/material'
import React from 'react'
import { useDispatch } from 'react-redux'
import { getChatFileAction } from 'src/redux/features/fileUrlSlice'

const EicMsg = ({ message, time, fileName, fileUrl }) => {
  console.log(fileUrl)
  const dispatch = useDispatch()
  return (
    <Box sx={{ display: 'flex', justifyContent: 'flex-start', m: 4, color: 'black' }}>
      <Box
        sx={{
          borderRadius: '0rem .7rem .7rem .7rem',
          bgcolor: 'whitesmoke',
          p: 1
        }}
      >
        {fileUrl && (
          <Typography
            sx={{
              color: 'black',
              backgroundColor: '#8a868630',
              p: 2,
              borderRadius: '.5rem',
              cursor: 'pointer'
            }}
            onClick={() => dispatch(getChatFileAction({ fileUrl }))}
          >
            {fileName || 'file.pdf'}
          </Typography>
        )}
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
            mt: 0,
            mr: 2
          }}
        >
          {time}
        </Typography>
      </Box>
    </Box>
  )
}

export default EicMsg
