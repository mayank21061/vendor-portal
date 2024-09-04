import { AttachFile, Send } from '@mui/icons-material'
import { Box, Button, Chip, IconButton, TextField, Tooltip } from '@mui/material'
import React, { useRef, useState } from 'react'
import styles from './inbox.module.css'

const RemarksInput = () => {
  const [note, setNote] = useState('')
  const [files, setFiles] = useState(null)
  const fileInputRef = useRef(null)

  const handleNoteChange = event => {
    setNote(event.target.value)
  }

  const handleAttachment = e => {
    fileInputRef.current.click()
  }

  const handleFileChange = e => {
    setFiles(e.target.files[0])
  }

  return (
    <div className={styles.inputActions}>
      <input name='message' multiline type='text' value={note} onChange={e => setNote(e.target.value)} />
      {files != null ? (
        <Chip label={files.name} onDelete={() => setFiles(null)} />
      ) : (
        <>
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
          <input
            // multiple
            type='file'
            ref={fileInputRef}
            style={{ display: 'none' }}
            onChange={handleFileChange}
            accept='.pdf'
          />
        </>
      )}
      <IconButton color='inherit' type='submit' variant='contained' size='small'>
        <Send />
      </IconButton>
    </div>
  )
}

export default RemarksInput
