import { Dialog } from '@mui/material'
import React from 'react'
import styles from './inbox.module.css'

const HistoryPreview = ({ open, setOpen }) => {
  return (
    <div>
      <Dialog open={open}>File History</Dialog>
    </div>
  )
}

export default HistoryPreview
