import { Close, Send } from '@mui/icons-material'
import {
  Timeline,
  TimelineConnector,
  TimelineContent,
  TimelineDot,
  TimelineItem,
  TimelineOppositeContent,
  TimelineSeparator
} from '@mui/lab'
import { Dialog, DialogContent, DialogTitle, Fab, Grid, IconButton, Tooltip } from '@mui/material'
import dynamic from 'next/dynamic'
import React, { useState } from 'react'
import ForwardDialog from './ForwardDialog'

const PdfViewer = dynamic(() => import('../PdfViewer'), { ssr: false })

const FilePreview = ({ open, setOpen }) => {
  const [showForwardForm, setShowForwardForm] = useState(false)

  return (
    <div>
      <Dialog open={open} fullScreen>
        <DialogTitle sx={{ p: 4 }}>File Details</DialogTitle>
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
        <DialogContent sx={{ p: '0 !important' }} dividers>
          <Grid container height='100%'>
            <Grid item xs={9}>
              <PdfViewer />
            </Grid>
            <Grid item xs={3} borderLeft='1px solid whitesmoke'>
              <Timeline position='alternate'>
                <TimelineItem>
                  <TimelineOppositeContent color='text.secondary'>09:30 am</TimelineOppositeContent>
                  <TimelineSeparator>
                    <TimelineDot />
                    <TimelineConnector />
                  </TimelineSeparator>
                  <TimelineContent>Eat</TimelineContent>
                </TimelineItem>
                <TimelineItem>
                  <TimelineOppositeContent color='text.secondary'>10:00 am</TimelineOppositeContent>
                  <TimelineSeparator>
                    <TimelineDot />
                    <TimelineConnector />
                  </TimelineSeparator>
                  <TimelineContent>Code</TimelineContent>
                </TimelineItem>
                <TimelineItem>
                  <TimelineOppositeContent color='text.secondary'>12:00 am</TimelineOppositeContent>
                  <TimelineSeparator>
                    <TimelineDot />
                    <TimelineConnector />
                  </TimelineSeparator>
                  <TimelineContent>Sleep</TimelineContent>
                </TimelineItem>
                <TimelineItem>
                  <TimelineOppositeContent color='text.secondary'>9:00 am</TimelineOppositeContent>
                  <TimelineSeparator>
                    <TimelineDot />
                    <TimelineConnector />
                  </TimelineSeparator>
                  <TimelineContent>Repeat</TimelineContent>
                </TimelineItem>
              </Timeline>
            </Grid>
          </Grid>
          <Fab
            variant='extended'
            sx={{
              position: 'absolute',
              right: 10,
              bottom: 20,
              bgcolor: '#7367f0',
              color: '#fff',
              ':hover': { color: 'black' }
            }}
            size='small'
            onClick={() => setShowForwardForm(true)}
          >
            Reply
            <Send sx={{ ml: 1 }} />
          </Fab>
        </DialogContent>
      </Dialog>
      <ForwardDialog open={showForwardForm} onClose={() => setShowForwardForm(false)} />
    </div>
  )
}

export default FilePreview
