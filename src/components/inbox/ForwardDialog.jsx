import React, { useState } from "react";
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
} from '@mui/material';
import { useDispatch } from 'react-redux';
// import { forwardInvoice } from '../../redux/actions/inboxData';

const ForwardDialog = ({ open, onClose, id }) => {
  const dispatch = useDispatch();
  const [receiver, setReceiver] = useState('');
  const [note, setNote] = useState('');

  const handleReceiverChange = (event) => {
    setReceiver(event.target.value);
  };

  const handleNoteChange = (event) => {
    setNote(event.target.value);
  };

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
      <DialogTitle>Forward File</DialogTitle>
      <Divider />
      <DialogContent style={{ marginBottom: '1rem' }}>
        <FormControl variant="outlined" fullWidth>
          <InputLabel>Send To</InputLabel>
          <Select value={receiver} onChange={handleReceiverChange} label="Send To">
            {['admin', 'admin2', 'marketing', 'hr', 'it', 'finance'].map((option) => (
              <MenuItem key={option} value={option}>
                {option}
              </MenuItem>
            ))}
          </Select>
        </FormControl>
        <TextField
          label="Note"
          multiline
          rows={4}
          fullWidth
          value={note}
          onChange={handleNoteChange}
          variant="outlined"
          style={{ marginTop: '1rem' }}
        />
      </DialogContent>
      <Divider />
      <DialogActions>
        <Button onClick={onClose} color="secondary" variant="contained">
          Cancel
        </Button>
        <Button
          onClick={(e) => {
            e.stopPropagation();
            handleForwardClick();
          }}
          color="primary"
          variant="contained"
        >
          Forward
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default ForwardDialog;
