import { AttachFile, Send } from '@mui/icons-material'
import { Box, Button, Chip, IconButton, TextareaAutosize, TextField, Tooltip } from '@mui/material'
import React, { useRef, useState } from 'react'
import styles from './inbox.module.css'
import { useDispatch } from 'react-redux'
import { forwardRemarksAction } from 'src/redux/features/inboxSlice'

const RemarksInput = () => {
  const dispatch = useDispatch()
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

  const handleSubmit = () => {
    const formData = new FormData()
    formData.append('remarks', note)
    formData.append('file', files)
    dispatch(forwardRemarksAction({ data: formData }))
  }

  return (
    <div className={styles.inputActions}>
      <TextareaAutosize
        name='message'
        minRows={2}
        maxRows={4}
        placeholder='Add your reply here'
        type='text'
        value={note}
        onChange={e => setNote(e.target.value)}
      />
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
      <IconButton color='inherit' onClick={e => handleSubmit()} variant='contained' size='small'>
        <Send />
      </IconButton>
    </div>
  )
}

export default RemarksInput
