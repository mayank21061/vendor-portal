import { Dialog } from '@mui/material'
import React from 'react'

const HistoryPreview = ({ open, setOpen }) => {
  return (
    <div>
      <Dialog open={open}>File History</Dialog>
    </div>
  )
}

export default HistoryPreview
