import { Dialog, DialogContent, DialogTitle } from '@mui/material'
import React from 'react'

const ClientsForm = ({ open, setOpen }) => {
  return (
    <Dialog open={open} onClose={() => setOpen(false)}>
      <DialogTitle>Create Clients</DialogTitle>
      <DialogContent dividers></DialogContent>
    </Dialog>
  )
}

export default ClientsForm
