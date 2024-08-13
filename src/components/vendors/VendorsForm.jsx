import { Dialog, DialogContent, DialogTitle } from '@mui/material'
import React from 'react'

const VendorsForm = ({ open, setOpen }) => {
  return (
    <Dialog open={open} onClose={() => setOpen(false)}>
      <DialogTitle>Create Vendors</DialogTitle>
      <DialogContent dividers></DialogContent>
    </Dialog>
  )
}

export default VendorsForm
