import React, { useState } from 'react'
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  TextField,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Divider,
  Tooltip,
  IconButton,
  Grid
} from '@mui/material'
import { useDispatch } from 'react-redux'
import { Close } from '@mui/icons-material'
// import { forwardInvoice } from '../../redux/actions/inboxData';

const ForwardDialog = ({ open, onClose, id }) => {
  const dispatch = useDispatch()
  const [receiver, setReceiver] = useState('')
  const [note, setNote] = useState('')

  const handleReceiverChange = event => {
    setReceiver(event.target.value)
  }

  const handleNoteChange = event => {
    setNote(event.target.value)
  }

  //   const handleForwardClick = () => {
  //     const formData = new FormData();
  //     formData.append('id', id);
  //     formData.append('remarks', note);
  //     formData.append('receievedBy', receiver);
  //     dispatch(forwardInvoice(formData, id));
  //     onClose();
  //   };

  return (
    <Dialog open={open} onClose={onClose} fullWidth>
      <DialogTitle>Reply to EIC</DialogTitle>
      <Tooltip title='CLOSE'>
        <IconButton
          aria-label='close'
          onClick={onClose}
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
      <Divider />
      <DialogContent style={{ marginBottom: '1rem' }}>
        {/* <FormControl variant='outlined' fullWidth>
          <InputLabel>Send To</InputLabel>
          <Select value={receiver} onChange={handleReceiverChange} label='Send To'>
            {['admin', 'admin2', 'marketing', 'hr', 'it', 'finance'].map(option => (
              <MenuItem key={option} value={option}>
                {option}
              </MenuItem>
            ))}
          </Select>
        </FormControl> */}
        <TextField
          label='Message'
          multiline
          rows={4}
          fullWidth
          value={note}
          onChange={handleNoteChange}
          variant='outlined'
          style={{ marginTop: '1rem' }}
        />
      </DialogContent>
      <Divider />
      <DialogActions>
        <Grid container justifyContent='space-between'>
          <Grid item>
            <Button onClick={onClose} color='secondary' variant='outlined'>
              Add File
            </Button>
          </Grid>
          <Grid item>
            <Button
              onClick={e => {
                e.stopPropagation()
                handleForwardClick()
              }}
              color='primary'
              variant='contained'
            >
              Send
            </Button>
          </Grid>
        </Grid>
      </DialogActions>
    </Dialog>
  )
}

export default ForwardDialog
