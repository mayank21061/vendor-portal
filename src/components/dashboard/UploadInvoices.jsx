import React, { memo, useState, useEffect } from 'react'
import DoneIcon from '@mui/icons-material/Done'
import CloudUploadIcon from '@mui/icons-material/CloudUpload'
import { Autocomplete, Button, DialogActions, Divider, Grid, Paper, TextField, Typography } from '@mui/material'
import { getInvoiceUserAction, getPoNumberAction } from 'src/redux/features/dashboardSlice'
import { useDispatch, useSelector } from 'react-redux'

const initialState = {
  poNumber: '',
  paymentType: '',
  eic: '',
  packageNumber: '',
  deliveryPlant: '',
  type: '',
  invoiceNumber: '',
  invoiceDate: new Date(),
  invoiceAmount: '',
  mobileNumber: '',
  alternateMobileNumber: '',
  email: '',
  alternateEmail: '',
  remarks: '',
  msmeCategory: '',
  search: ''
}

const UploadInvoice = props => {
  const dispatch = useDispatch()
  const { getPoNumberData } = useSelector(state => state.poNumber)
  const { getInvoiceUserData } = useSelector(state => state.invoiceUser)

  const [state, setState] = useState(initialState)
  const {
    poNumber,
    paymentType,
    eic,
    deliveryPlant,
    type,
    mobileNumber,
    email,
    invoiceNumber,
    invoiceDate,
    invoiceAmount,
    alternateMobileNumber,
    alternateEmail,
    remarks,
    msmeCategory
  } = state

  const [supportingDocuments, setSupportingDocuments] = useState([])
  const [files, setFiles] = useState(null)
  const [fileError, setFileError] = useState('')

  // const handleChange = e => {
  //   const { name, value } = e.target;
  //   setState({ ...state, [name]: value });
  // };
  // const handlePoNumberChange = newValue => {
  //   const poNumber = newValue?.label || newValue || '';
  //   setState({ ...state, poNumber });
  //   dispatch(getPoNumberAction({ poNumber }));
  // };

  const handleChange = (name, value) => {
    // If the name is 'poNumber', handle it separately
    if (name === 'poNumber') {
      dispatch(getPoNumberAction({ poNumber: value }))
    }
    // Update the state for all fields
    setState(prevState => ({
      ...prevState,
      [name]: value
    }))
  }

  useEffect(() => {
    if (poNumber && poNumber.length === 10) {
      dispatch(getInvoiceUserAction(poNumber))
    }
  }, [poNumber, dispatch])

  const handleFile = e => {
    setFileError('')
    setFiles(e.target.files)
  }

  const handleSupportingFile = e => {
    setSupportingDocuments(e.target.files)
  }

  const handleClose = () => {
    setState(initialState)
    setSupportingDocuments([])
    setFiles(null)
    setFileError('')
    if (props && props.onClose) {
      props.onClose();
    }
  }

  const config = {
    variant: 'outlined',
    size: 'medium',
    fullWidth: true
  }

  return (
    <>
      <h1>UPLOAD INVOICE</h1>
      <Divider />
      <form
        onSubmit={e => {
          e.preventDefault()
        }}
      >
        <Grid container spacing={2} style={{ marginTop: '1rem' }}>
          <Grid item container spacing={2} xs={12} sm={8}>
            <Grid item sm={6}>
              <Autocomplete
                {...config}
                options={getPoNumberData || []}
                getOptionLabel={option => option.label || option}
                value={poNumber}
                onInputChange={(event, newValue) => handleChange('poNumber', newValue)}
                renderInput={params => <TextField {...params} label='PO NUMBER' variant='outlined' required />}
              />
            </Grid>

            <Grid item xs={6}>
              <TextField
                {...config}
                label='INVOICE NUMBER'
                value={invoiceNumber}
                name='invoiceNumber'
                onChange={e => handleChange(e.target.name, e.target.value)}
                required
              />
            </Grid>

            <Grid item xs={4}>
              <TextField
                {...config}
                label='AMOUNT OF INVOICE'
                name='invoiceAmount'
                value={invoiceAmount}
                onChange={e => handleChange(e.target.name, e.target.value)}
                required
              />
            </Grid>

            <Grid item xs={4}>
              <Autocomplete
                {...config}
                options={[]}
                value={eic || getInvoiceUserData.eic || ''}
                onChange={e => handleChange(e.target.name, e.target.value)}
                renderInput={params => (
                  <TextField {...params} label='ENGINEER INCHARGE' name='eic' variant='outlined' required />
                )}
              />
            </Grid>
            <Grid item xs={4}>
              <TextField
                {...config}
                type='date'
                value={invoiceDate}
                name='invoiceDate'
                onChange={e => handleChange(e.target.name, e.target.value)}
                required
                InputLabelProps={{
                  style: {
                    marginBottom: '6px'
                  }
                }}
                InputProps={{
                  style: {
                    marginTop: '6px'
                  }
                }}
              />
            </Grid>
            <Grid item xs={4}>
              <TextField
                {...config}
                label='ALTERNATE E-MAIL'
                value={alternateEmail}
                name='alternateEmail'
                onChange={e => handleChange(e.target.name, e.target.value)}
              />
            </Grid>
            <Grid item xs={4}>
              <TextField
                {...config}
                label='ALTERNATE NUMBER'
                value={alternateMobileNumber}
                name='alternateMobileNumber'
                onChange={e => handleChange(e.target.name, e.target.value)}
              />
            </Grid>
            <Grid item xs={4}>
              <Autocomplete
                {...config}
                options={[]}
                value={deliveryPlant || getInvoiceUserData.deliveryPlant || ''}
                onChange={e => handleChange(e.target.name, e.target.value)} 
                renderInput={params => (
                  <TextField {...params} label='DELIVERY PLANT' name='deliveryPlant' variant='outlined' />
                )}
              />
            </Grid>

            <Grid item xs={6} className='fileupload'>
              <label htmlFor='invoice-upload' style={{ width: '100%' }}>
                <span style={{ display: 'flex', justifyContent: 'space-evenly' }}>
                  UPLOAD INVOICE
                  <CloudUploadIcon style={{ color: '#070707' }} />
                  {files && `${files.length} File`}
                </span>
              </label>
              <span style={{ display: 'none' }}>
                <input
                  style={{ display: 'none' }}
                  id='invoice-upload'
                  multiple
                  type='file'
                  accept='.pdf, .doc, .docx'
                  name='Uploadfile'
                  onChange={handleFile}
                />
              </span>
              {fileError && (
                <Typography variant='caption' color='error'>
                  {fileError}
                </Typography>
              )}
            </Grid>
            <Grid item xs={6} className='fileupload'>
              <label htmlFor='file-upload' style={{ width: '100%' }}>
                <span style={{ display: 'flex', justifyContent: 'space-evenly' }}>
                  SUPPORTING DOCUMENTS
                  <CloudUploadIcon style={{ color: '#070707' }} />
                  {supportingDocuments && `${supportingDocuments.length} Files`}
                </span>
              </label>
              <span style={{ display: 'none' }}>
                <input
                  style={{ display: 'none' }}
                  id='file-upload'
                  multiple
                  type='file'
                  accept='.pdf, .doc, .docx'
                  name='supportingDocument'
                  onChange={handleSupportingFile}
                />
              </span>

              {supportingDocuments.length > 0 && (
                <Typography variant='body1' component='div'>
                  <ul></ul>
                </Typography>
              )}
            </Grid>
            <Grid item xs={12}>
              <TextField
                {...config}
                label='REMARKS'
                value={remarks}
                name='remarks'
                onChange={e => handleChange(e.target.name, e.target.value)}
              />
            </Grid>
          </Grid>

          <Grid item xs={12} sm={4}>
            <Paper elevation={3} style={{ padding: '6px', height: 'calc(100vh - 300px)' }}>
              <div>
                <h2>Details</h2>
                <Divider />
                <div
                  style={{
                    fontSize: '16px',
                    padding: '1rem ',
                    justifyContent: 'space-around'
                  }}
                >
                  <div>
                    <span style={{ fontWeight: 'bold' }}>Payment Type:</span> {getInvoiceUserData.paymentType}
                    <br />
                  </div>
                  <Divider />
                  <div style={{ marginTop: '1rem' }}>
                    <span style={{ fontWeight: 'bold' }}>Invoice Type:</span> {getInvoiceUserData.type}
                    <br />
                  </div>
                  <Divider />
                  <div style={{ marginTop: '1rem' }}>
                    <span style={{ fontWeight: 'bold' }}>Category:</span> {getInvoiceUserData.msmeCategory}
                    <br />
                  </div>
                  <Divider />
                  <div style={{ marginTop: '1rem' }}>
                    <span style={{ fontWeight: 'bold' }}>Mobile Number:</span> {getInvoiceUserData.mobileNumber}
                    <br />
                  </div>
                  <Divider />
                  <div style={{ marginTop: '1rem' }}>
                    <span style={{ fontWeight: 'bold' }}>E-mail:</span> {getInvoiceUserData.email}
                    <br />
                  </div>
                  <Divider />
                </div>
              </div>
            </Paper>
          </Grid>
          <Grid item xs={12}>
            <Divider />
            <DialogActions>
              <Button onClick={handleClose} color='secondary' variant='contained'>
                CLOSE
              </Button>
              <Button type='submit' endIcon={<DoneIcon />} color='primary' variant='contained'>
                UPLOAD
              </Button>
            </DialogActions>
          </Grid>
        </Grid>
      </form>
    </>
  )
}

export default memo(UploadInvoice)
