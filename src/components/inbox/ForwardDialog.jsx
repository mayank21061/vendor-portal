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
  Grid,
  styled,
  Chip
} from '@mui/material'
import { useDispatch } from 'react-redux'
import { Close } from '@mui/icons-material'
// import { forwardInvoice } from '../../redux/actions/inboxData';

const ForwardDialog = ({ open, onClose, id }) => {
  const dispatch = useDispatch()
  const [receiver, setReceiver] = useState('')
  const [note, setNote] = useState('')
  const [files, setFiles] = useState([])

  const VisuallyHiddenInput = styled('input')({
    clip: 'rect(0 0 0 0)',
    clipPath: 'inset(50%)',
    height: 1,
    overflow: 'hidden',
    position: 'absolute',
    bottom: 0,
    left: 0,
    whiteSpace: 'nowrap',
    width: 1
  })

  const handleReceiverChange = event => {
    setReceiver(event.target.value)
  }

  const handleNoteChange = event => {
    setNote(event.target.value)
  }

  const handleFileChange = files => {
    setFiles(Array.from(files))
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
      <DialogTitle sx={{ p: 4 }}>Reply to EIC</DialogTitle>
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
      <DialogContent>
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
        />
      </DialogContent>
      <Divider />
      <DialogActions sx={{ p: 3 }}>
        <Grid container justifyContent='space-between'>
          <Grid item>
            {files.length == 0 ? (
              <Button color='secondary' variant='outlined' component='label' role={undefined} tabIndex={-1}>
                Add File
                <VisuallyHiddenInput
                  type='file'
                  accept='application/pdf'
                  onChange={e => handleFileChange(e.target.files)}
                />
              </Button>
            ) : (
              files?.map(item => (
                <Chip label={item.name} onDelete={() => setFiles([])} onClick={() => console.log(item)} />
              ))
            )}
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
