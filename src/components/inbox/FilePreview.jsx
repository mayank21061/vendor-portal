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
import {
  Avatar,
  Box,
  Dialog,
  DialogContent,
  DialogTitle,
  Fab,
  Grid,
  IconButton,
  Tooltip,
  Typography
} from '@mui/material'
import dynamic from 'next/dynamic'
import React, { useState } from 'react'
import ForwardDialog from './ForwardDialog'
import HistoryTable from './HistoryTable'
import RemarksHistory from './RemarksHistory'

const PdfViewer = dynamic(() => import('../PdfViewer'), { ssr: false })

const FilePreview = ({ open, setOpen, rowData }) => {
  const [showForwardForm, setShowForwardForm] = useState(false)
  console.log(rowData)

  return (
    <div>
      <Dialog open={open} fullScreen>
        <DialogTitle sx={{ p: 2, display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
          <Box sx={{ display: 'flex', alignItems: 'center' }}>
            <Avatar size='small' sx={{ mr: 3 }}></Avatar>
            <Typography fontSize={14}>{rowData?.eic}</Typography>
            <Typography fontWeight={900}>&nbsp;|&nbsp;</Typography>
            <Typography fontWeight={900}>Recevied On:&nbsp;</Typography>
            <Typography fontSize={14}>{rowData?.invoiceDate}</Typography>
            <Typography fontWeight={900}>&nbsp;|&nbsp;</Typography>
            <Typography fontWeight={900}>PO Number:&nbsp;</Typography>
            <Typography fontSize={14}>{rowData?.poNumber}</Typography>
            <Typography fontWeight={900}>&nbsp;|&nbsp;</Typography>
            <Typography fontWeight={900}>Invoice Number:&nbsp;</Typography>
            <Typography fontSize={14}>{rowData?.invoiceNumber}</Typography>
            {/* <Typography fontWeight={900}>From:&nbsp;</Typography> */}
          </Box>
          <Box sx={{ display: 'flex', alignItems: 'center' }}>
            <Typography fontWeight={900}>Recevied On:&nbsp;</Typography>
            <Typography fontSize={14}>{rowData?.invoiceDate}</Typography>
            <IconButton
              aria-label='close'
              onClick={() => setOpen(false)}
              // sx={{
              //   position: 'absolute',
              //   right: 8,
              //   top: 8,
              //   color: theme => theme.palette.grey[500]
              // }}
            >
              <Close />
            </IconButton>
          </Box>
        </DialogTitle>
        <Tooltip title='CLOSE'></Tooltip>
        <DialogContent sx={{ p: '0 !important' }} dividers>
          <Grid container height='100%'>
            <Grid item xs={8} borderRight='1px solid whitesmoke' sx={{ backgroundColor: '#dcdcdc' }}>
              <RemarksHistory />
            </Grid>
            <Grid item xs={4}>
              <PdfViewer />
            </Grid>
          </Grid>
        </DialogContent>
      </Dialog>
      {/* <ForwardDialog open={showForwardForm} onClose={() => setShowForwardForm(false)} /> */}
    </div>
  )
}

export default FilePreview
