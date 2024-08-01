import React, { memo, useState, useEffect } from 'react'
import DoneIcon from '@mui/icons-material/Done'
import CloudUploadIcon from '@mui/icons-material/CloudUpload'
import {
  Autocomplete,
  Button,
  Chip,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Divider,
  Grid,
  IconButton,
  Paper,
  styled,
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
      search: '',
      invoiceFile: [],
      supportingDocuments: []
    },
    onSubmit: values => {
      dispatch(uploadInvoiceAction(values))
    }
  })

  const [supportingDocuments, setSupportingDocuments] = useState([])
  const [fileError, setFileError] = useState('')

  const handleInputInvoices = files => {
    formik.setFieldValue('invoiceFile', Array.from(files))
  }

  const handleSupportingFile = files => {
    formik.setFieldValue('supportingDocuments', Array.from(files))
  }

  const handleClose = () => {
    // setSupportingDocuments([])
    // setFiles(null)
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
      maxWidth='lg'
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

                <Grid item xs={4}>
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

                {/* <Grid item xs={4}>
                  <Autocomplete
                    {...config}
                    options={[]}
                    value={formik.values.eic}
                    onChange={formik.handleChange}
                    renderInput={params => (
                      <TextField {...params} label='ENGINEER INCHARGE' name='eic' variant='outlined' size='small' />
                    )}
                  />
                </Grid> */}
                <Grid item xs={4}>
                  <DatePickerWrapper>
                    <DatePicker
                      placeholderText='Payment Date'
                      fullWidth
                      showYearDropdown
                      id='issue-date'
                      autoComplete='off'
                      value={dayjs(formik.values.invoiceDate).format('DD/MM/YYYY')}
                      selected={new Date(formik.values.invoiceDate)}
                      dateFormat='dd MMMM yyyy'
                      customInput={<TextField label='Payment Date' size='small' />}
                      onChange={date => formik.setFieldValue('invoiceDate', date)}
                    />
                  </DatePickerWrapper>
                </Grid>

                <Grid item xs={12}>
                  <TextField
                    {...config}
                    multiline
                    minRows={3}
                    label='REMARKS'
                    value={formik.values.remarks}
                    name='remarks'
                    onChange={formik.handleChange}
                  />
                </Grid>
                <Grid item xs={6}>
                  <TextField
                    {...config}
                    size='small'
                    label='ALTERNATE E-MAIL'
                    name='alternateEmail'
                    value={formik.values.alternateEmail}
                    onChange={formik.handleChange}
                  />
                </Grid>
                <Grid item xs={6}>
                  <TextField
                    {...config}
                    size='small'
                    label='ALTERNATE NUMBER'
                    value={formik.values.alternateMobileNumber}
                    name='alternateMobileNumber'
                    onChange={formik.handleChange}
                  />
                </Grid>
                <Grid item xs={12}>
                  <b>Invoice File: </b>
                  {`${formik.values.invoiceFile.length == 0 ? ' No File selected' : ''}`}
                  {formik.values.invoiceFile.map(item => (
                    <Chip label={item.name} />
                  ))}
                </Grid>
                <Grid item xs={12}>
                  <b>Supporting Documents: </b>
                  {` ${formik.values.invoiceFile.length == 0 ? ' No File selected' : ''}`}
                  {formik.values.supportingDocuments.map(item => (
                    <Chip label={item.name} />
                  ))}
                </Grid>
              </Grid>

              <Grid item xs={12} sm={4}>
                <Paper elevation={3} style={{ padding: '6px' }}>
                  <div>
                    <Typography variant='h5'>Details</Typography>
                    <Divider />
                    <div
                      style={{
                        display: 'flex',
                        flexDirection: 'column',
                        gap: '.5rem',
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
                      <div style={{ marginTop: '1rem' }}>
                        <span style={{ fontWeight: 'bold' }}>EIC:</span>
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
        <DialogActions>
          <Grid container justifyContent='space-between'>
            <Grid item sx={{ display: 'flex', gap: '1rem' }}>
              <Button
                component='label'
                role={undefined}
                variant='outlined'
                tabIndex={-1}
                startIcon={<CloudUploadIcon />}
              >
                Add Invoice
                <VisuallyHiddenInput
                  type='file'
                  accept='application/pdf'
                  onChange={e => handleInputInvoices(e.target.files)}
                />
              </Button>
              <Button
                component='label'
                role={undefined}
                variant='outlined'
                tabIndex={-1}
                startIcon={<CloudUploadIcon />}
              >
                Add Supporting Docs
                <VisuallyHiddenInput
                  type='file'
                  accept='application/pdf'
                  multiple
                  onChange={e => handleSupportingFile(e.target.files)}
                />
              </Button>
            </Grid>
            <Grid item>
              <Button variant='contained' type='submit'>
                UPLOAD
              </Button>
            </Grid>
          </Grid>
        </DialogActions>
      </form>
    </Dialog>
  )
}

export default memo(UploadInvoice)
