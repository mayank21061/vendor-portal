import { AttachFile, Send } from '@mui/icons-material'
import { Box, Button, IconButton, TextField, Tooltip } from '@mui/material'
import React, { useState } from 'react'
import styles from './inbox.module.css'

const RemarksInput = () => {
  const [note, setNote] = useState('')
  const [files, setFiles] = useState([])

  const handleNoteChange = event => {
    setNote(event.target.value)
  }

  return (
    <div className={styles.inputActions}>
      {/* <TextField
              fullWidth
              name="message"
              size="medium"
              minRows={2}
              variant="filled"
              placeholder="Message"
              value={formik.values.message}
              onChange={(e) => formik.setFieldValue("message", e.target.value)}
              sx={{ backgroundColor: "transparent" }}
            /> */}
      <input name='message' multiline type='text' value={note} onChange={e => setNote(e.target.value)} />
      {/* {formik.values.attachmentFiles ? (
            <div>
              <Chip
                sx={{ ml: 1, mr: 1 }}
                // label={formik.values.attachmentFiles.name}
                onClick={e => handleFullScreen(e.target.value)}
                // onDelete={() => {
                //   formik.setFieldValue('attachmentFiles', null)
                //   formik.setFieldValue('fileName', null)
                // }}
              />
            </div>
          ) : (
            <div>
              <Tooltip title='ADD ATTACHMENT'>
                <IconButton
                  variant='text'
                  size='small'
                  onClick={e => {
                    handleAttachment(e)
                  }}
                >
                  <AttachFileIcon fontSize='small' />
                </IconButton>
              </Tooltip>
              <input
                // multiple
                type='file'
                ref={fileInputRef}
                style={{ display: 'none' }}
                onChange={handleFileChange}
                accept='.pdf'
              />
            </div>
          )} */}
      <Tooltip title='ADD ATTACHMENT'>
        <IconButton
          variant='text'
          size='small'
          onClick={e => {
            handleAttachment(e)
          }}
        >
          <AttachFile fontSize='small' />
        </IconButton>
      </Tooltip>
      <IconButton
        color='inherit'
        type='submit'
        variant='contained'
        size='small'
        // disabled={!Boolean(formik.values.message) && !Boolean(formik.values.attachmentFiles)}
        // endIcon={<Send />}
        // sx={{ backgroundColor: "rgba(150, 85, 200, 1)" }}
      >
        <Send />
      </IconButton>
    </div>
  )
}

export default RemarksInput
