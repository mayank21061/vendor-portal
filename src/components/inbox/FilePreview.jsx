import { Close } from '@mui/icons-material'
import { Dialog, DialogTitle, IconButton, Tooltip } from '@mui/material'
import dynamic from 'next/dynamic'
import React from 'react'

const PdfViewer = dynamic(() => import('../PdfViewer'), { ssr: false })

const FilePreview = ({ open, setOpen }) => {
  return (
    <div>
      <Dialog open={open} fullScreen>
        <DialogTitle>File Details</DialogTitle>
        <Tooltip title='CLOSE'>
          <IconButton
            aria-label='close'
            onClick={() => setOpen(false)}
            sx={{
              position: 'absolute',
              right: 8,
              top: 8,
              color: theme => theme.palette.grey[500]
            }}
          >
            <Close />
          </IconButton>
        </Tooltip>

        <PdfViewer />
      </Dialog>
    </div>
  )
}

export default FilePreview
