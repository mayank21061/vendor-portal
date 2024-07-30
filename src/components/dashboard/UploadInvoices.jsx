import React, { memo, useState, useEffect } from 'react'
import DoneIcon from '@mui/icons-material/Done'
import CloudUploadIcon from '@mui/icons-material/CloudUpload'
import {
  Autocomplete,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Divider,
  Grid,
  IconButton,
  Paper,
  TextField,
  Tooltip,
  Typography
} from '@mui/material'
import { getInvoiceUserAction, getPoNumberAction, uploadInvoiceAction } from 'src/redux/features/dashboardSlice'
import { useDispatch, useSelector } from 'react-redux'
import { useFormik } from 'formik'
import * as yup from 'yup'
import dayjs from 'dayjs'
import { Close, FourMp } from '@mui/icons-material'
import DatePickerWrapper from 'src/@core/styles/libs/react-datepicker'
import DatePicker from 'react-datepicker'

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

const UploadInvoice = ({ open, setOpen }) => {
  const dispatch = useDispatch()
  // const { getPoNumberData } = useSelector(state => state.poNumber)
  // const { getInvoiceUserData } = useSelector(state => state.invoiceUser)

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

  const formik = useFormik({
    initialValues: {
      poNumber: '',
      paymentType: '',
      eic: '',
      packageNumber: '',
      deliveryPlant: '',
      type: '',
      invoiceNumber: '',
      invoiceDate: dayjs(),
      invoiceAmount: '',
      mobileNumber: '',
      alternateMobileNumber: '',
      email: '',
      alternateEmail: '',
      remarks: '',
      msmeCategory: '',
      search: ''
    },
    onSubmit: values => {
      dispatch(uploadInvoiceAction(values))
    }
  })

  const [supportingDocuments, setSupportingDocuments] = useState([])
  const [files, setFiles] = useState(null)
  const [fileError, setFileError] = useState('')

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
      props.onClose()
    }
  }

  const config = {
    variant: 'outlined',
    size: 'medium',
    fullWidth: true
  }

  useEffect(() => {
    if (open) {
      dispatch(getPoNumberAction({ poNumber: formik.values.poNumber }))
    }
  }, [open])

  return (
    <Dialog
      open={open}
      onClose={() => setOpen(false)}
      fullWidth
      maxWidth='md'
      sx={{ '.MuiPaper-root': { overflowY: 'visible' } }}
    >
      <DialogTitle id='customized-dialog-title'>UPLOAD INVOICE</DialogTitle>
      <Tooltip title='CLOSE'>
        <IconButton
          aria-label='close'
          onClick={() => setOpen(false)}
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
      <form onSubmit={formik.handleSubmit}>
        <DialogContent dividers>
          <Grid container>
            <Grid container spacing={2}>
              <Grid item container spacing={2} xs={12} sm={8}>
                <Grid item sm={6}>
                  <Autocomplete
                    {...config}
                    options={[]}
                    getOptionLabel={option => option.label || option}
                    value={formik.values.poNumber}
                    onInputChange={(event, newValue) => formik.setFieldValue('poNumber', newValue)}
                    renderInput={params => <TextField {...params} label='PO NUMBER' variant='outlined' size='small' />}
                  />
                </Grid>

                <Grid item xs={6}>
                  <TextField
                    {...config}
                    size='small'
                    label='INVOICE NUMBER'
                    value={formik.values.invoiceNumber}
                    name='invoiceNumber'
                    onChange={formik.handleChange}
                  />
                </Grid>

                <Grid item xs={4}>
                  <TextField
                    {...config}
                    size='small'
                    label='AMOUNT OF INVOICE'
                    name='invoiceAmount'
                    value={formik.values.invoiceAmount}
                    onChange={formik.handleChange}
                  />
                </Grid>

                <Grid item xs={4}>
                  <Autocomplete
                    {...config}
                    options={[]}
                    value={formik.values.eic}
                    onChange={formik.handleChange}
                    renderInput={params => (
                      <TextField {...params} label='ENGINEER INCHARGE' name='eic' variant='outlined' size='small' />
                    )}
                  />
                </Grid>
                <Grid item xs={4}>
                  <DatePickerWrapper>
                    <DatePicker
                      placeholderText='Invoice Date'
                      fullWidth
                      showYearDropdown
                      id='issue-date'
                      autoComplete='off'
                      value={dayjs(formik.values.invoiceDate).format('DD/MM/YYYY')}
                      selected={new Date(formik.values.invoiceDate)}
                      dateFormat='dd MMMM yyyy'
                      customInput={<TextField label='Issue Date' size='small' />}
                      onChange={date => formik.setFieldValue('invoiceDate', date)}
                    />
                  </DatePickerWrapper>
                </Grid>
                <Grid item xs={4}>
                  <TextField
                    {...config}
                    size='small'
                    label='ALTERNATE E-MAIL'
                    name='alternateEmail'
                    value={formik.values.alternateEmail}
                    onChange={formik.handleChange}
                  />
                </Grid>
                <Grid item xs={4}>
                  <TextField
                    {...config}
                    size='small'
                    label='ALTERNATE NUMBER'
                    value={formik.values.alternateMobileNumber}
                    name='alternateMobileNumber'
                    onChange={formik.handleChange}
                  />
                </Grid>
                <Grid item xs={4}>
                  <Autocomplete
                    size='small'
                    {...config}
                    options={[]}
                    value={formik.values.deliveryPlant}
                    onChange={formik.handleChange}
                    renderInput={params => (
                      <TextField
                        {...params}
                        label='DELIVERY PLANT'
                        name='deliveryPlant'
                        variant='outlined'
                        size='small'
                      />
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
                    value={formik.values.remarks}
                    name='remarks'
                    onChange={formik.handleChange}
                  />
                </Grid>
              </Grid>

              <Grid item xs={12} sm={4}>
                <Paper elevation={3} style={{ padding: '6px' }}>
                  <div>
                    <Typography variant='h5'>Details</Typography>
                    <Divider />
                    <div
                      style={{
                        fontSize: '14px',
                        padding: '1rem ',
                        justifyContent: 'space-around'
                      }}
                    >
                      <div>
                        <span style={{ fontWeight: 'bold' }}>Payment Type:</span>
                        {/* {getInvoiceUserData.paymentType} */}
                        <br />
                      </div>
                      <Divider />
                      <div style={{ marginTop: '1rem' }}>
                        <span style={{ fontWeight: 'bold' }}>Invoice Type:</span>
                        {/* {getInvoiceUserData.type} */}
                        <br />
                      </div>
                      <Divider />
                      <div style={{ marginTop: '1rem' }}>
                        <span style={{ fontWeight: 'bold' }}>Category:</span>
                        {/* {getInvoiceUserData.msmeCategory} */}
                        <br />
                      </div>
                      <Divider />
                      <div style={{ marginTop: '1rem' }}>
                        <span style={{ fontWeight: 'bold' }}>Mobile Number:</span>
                        {/* {getInvoiceUserData.mobileNumber} */}
                        <br />
                      </div>
                      <Divider />
                      <div style={{ marginTop: '1rem' }}>
                        <span style={{ fontWeight: 'bold' }}>E-mail:</span>
                        {/* {getInvoiceUserData.email} */}
                        <br />
                      </div>
                      <Divider />
                    </div>
                  </div>
                </Paper>
              </Grid>
            </Grid>
          </Grid>
        </DialogContent>
        <DialogActions sx={{ p: 1 }}>
          <Button variant='contained' type='submit'>
            UPLOAD
          </Button>
        </DialogActions>
      </form>
    </Dialog>
  )
}

export default memo(UploadInvoice)
