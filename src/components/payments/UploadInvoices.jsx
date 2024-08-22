import React, { memo, useState, useEffect, useCallback } from 'react'
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
import {
  getInvoiceUserAction,
  getPoDetailsAction,
  getPoNumberAction,
  uploadInvoiceAction
} from 'src/redux/features/dashboardSlice'
import { useDispatch, useSelector } from 'react-redux'
import { useFormik } from 'formik'
import * as yup from 'yup'
import dayjs from 'dayjs'
import { Close, FourMp } from '@mui/icons-material'
import DatePickerWrapper from 'src/@core/styles/libs/react-datepicker'
import DatePicker from 'react-datepicker'
import _debounce from 'lodash/debounce'

const UploadInvoice = ({ open, setOpen }) => {
  const dispatch = useDispatch()
  const { poNumberListData, poDetailsData } = useSelector(state => state.dashboard)
  console.log(poDetailsData)

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
    formik.setFieldValue('supportingDocuments', [...formik.values.supportingDocuments, ...Array.from(files)])
  }

  const handleDeleteSupportingDocs = elementIndex => {
    const filterArr = formik.values.supportingDocuments.filter((item, index) => index != elementIndex)
    formik.setFieldValue('supportingDocuments', filterArr)
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

  const getInvoicesDebounce = useCallback(
    _debounce(searchText => {
      if (searchText) {
        dispatch(getPoNumberAction({ poNumber: searchText }))
      }
    }, 1000),
    [dispatch]
  )

  return (
    <Dialog
      open={open}
      onClose={() => setOpen(false)}
      fullScreen
      // maxWidth='lg'
      sx={{ '.MuiPaper-root': { overflowY: 'visible' } }}
    >
      {/* <DialogTitle id='customized-dialog-title'>UPLOAD INVOICE</DialogTitle>
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
      </Tooltip> */}
      <AppBar sx={{ position: 'relative' }}>
        <Toolbar>
          <IconButton edge='start' color='inherit' onClick={handleClose} aria-label='close'>
            <CloseIcon />
          </IconButton>
          <Typography sx={{ ml: 2, flex: 1 }} variant='h6' component='div'>
            Upload Invoice
          </Typography>
          <Button autoFocus color='inherit' onClick={() => setOpen(false)}>
            Close
          </Button>
        </Toolbar>
      </AppBar>
      <form onSubmit={formik.handleSubmit}>
        <DialogContent dividers>
          <Grid container>
            <Grid container spacing={2}>
              <Grid item container spacing={2} xs={12} sm={8}>
                <Grid item sm={6}>
                  <Autocomplete
                    {...config}
                    name='poNumber'
                    value={formik.values.poNumber}
                    options={poNumberListData || []}
                    getOptionLabel={option => option.label || option}
                    onInputChange={(event, newValue) => {
                      formik.setFieldValue('poNumber', newValue)
                      getInvoicesDebounce(newValue)
                    }}
                    onChange={(e, value) => {
                      formik.setFieldValue('poNumber', value)
                      value && dispatch(getPoDetailsAction({ poNumber: value }))
                    }}
                    renderInput={params => (
                      <TextField
                        {...params}
                        name='poNumber'
                        label='PO NUMBER'
                        variant='outlined'
                        size='small'
                        // type='number'
                      />
                    )}
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
                  {`${formik.values.invoiceFile?.length == 0 ? ' No File selected' : ''}`}
                  {formik.values.invoiceFile.map(item => (
                    <Chip
                      label={item.name}
                      onDelete={() => formik.setFieldValue('invoiceFile', [])}
                      onClick={() => console.log(file)}
                    />
                  ))}
                  <IconButton
                    component='label'
                    role={undefined}
                    variant='outlined'
                    tabIndex={-1}
                    // startIcon={}
                  >
                    <CloudUploadIcon />
                    <VisuallyHiddenInput
                      type='file'
                      accept='application/pdf'
                      onChange={e => handleInputInvoices(e.target.files)}
                    />
                  </IconButton>
                </Grid>
                <Grid item xs={12}>
                  <b>Supporting Documents: </b>
                  {` ${formik.values.supportingDocuments.length == 0 ? ' No File selected' : ''}`}
                  {formik.values.supportingDocuments.map((item, index) => (
                    <Chip
                      label={item.name}
                      onDelete={() => handleDeleteSupportingDocs(index)}
                      onClick={() => console.log(item)}
                    />
                  ))}
                  <IconButton component='label' role={undefined} variant='outlined' tabIndex={-1}>
                    <CloudUploadIcon />
                    <VisuallyHiddenInput
                      type='file'
                      accept='application/pdf'
                      multiple
                      onChange={e => handleSupportingFile(e.target.files)}
                    />
                  </IconButton>
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
                        <span style={{ fontWeight: 'bold' }}>PO Issue Date: </span>
                        {poDetailsData?.poIssueDate}
                        <br />
                      </div>
                      <Divider />
                      <div style={{ marginTop: '1rem' }}>
                        <span style={{ fontWeight: 'bold' }}>PO Delivery Date: </span>
                        {poDetailsData?.deliveryDate}
                        <br />
                      </div>
                      <Divider />
                      <div style={{ marginTop: '1rem' }}>
                        <span style={{ fontWeight: 'bold' }}>Description: </span>
                        {poDetailsData?.description}
                        <br />
                      </div>
                      <Divider />
                      <div style={{ marginTop: '1rem' }}>
                        <span style={{ fontWeight: 'bold' }}>Mobile Number: </span>
                        {poDetailsData?.mobileNumber}
                        <br />
                      </div>
                      <Divider />
                      <div style={{ marginTop: '1rem' }}>
                        <span style={{ fontWeight: 'bold' }}>E-mail: </span>
                        {poDetailsData?.email}
                        <br />
                      </div>
                      <Divider />
                      <div style={{ marginTop: '1rem' }}>
                        <span style={{ fontWeight: 'bold' }}>EIC: </span>
                        {poDetailsData?.eic}
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
          <Button variant='contained' type='submit'>
            UPLOAD
          </Button>
        </DialogActions>
      </form>
    </Dialog>
  )
}

export default memo(UploadInvoice)
