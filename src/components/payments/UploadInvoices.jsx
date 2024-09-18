import React, { memo, useState, useEffect, useCallback } from 'react'
import DoneIcon from '@mui/icons-material/Done'
import CloudUploadIcon from '@mui/icons-material/CloudUpload'
import {
  AppBar,
  Autocomplete,
  Button,
  Chip,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Divider,
  FormControl,
  FormLabel,
  Grid,
  IconButton,
  Paper,
  Radio,
  RadioGroup,
  styled,
  TextField,
  Toolbar,
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
import FormGroup from '@mui/material/FormGroup'
import FormControlLabel from '@mui/material/FormControlLabel'
import Checkbox from '@mui/material/Checkbox'

const UploadInvoice = ({ open, setOpen, rowData }) => {
  const dispatch = useDispatch()
  const { poNumberListData, poDetailsData } = useSelector(state => state.dashboard)
  console.log(poDetailsData.deliveryPlant)

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
      invoiceDate: dayjs().format('YYYY-MM-DD'),
      invoiceAmount: '',
      mobileNumber: '',
      alternateMobileNumber: '',
      email: '',
      alternateEmail: '',
      remarks: '',
      msmeCategory: '',
      search: '',
      file: null,
      supportingDocument: [],
      isagainstLC: false,
      isGst: false,
      sellerGst: '',
      buyerGst: '',
      isTredExchangePayment: false,
      isMDCCPayment: false,
      factoryunitnumber: '',
      mdccnumber: '',
      bankaccountno: '',
      ses: ''
    },
    onSubmit: values => {
      const formData = new FormData()
      for (let key in values) {
        formData.append(key, values[key])
      }
      dispatch(uploadInvoiceAction(formData))
    }
  })

  const [fileError, setFileError] = useState('')

  const handleInputInvoices = files => {
    console.log(files[0])
    formik.setFieldValue('file', files[0])
  }

  const handleSupportingFile = files => {
    formik.setFieldValue('supportingDocument', [...formik.values.supportingDocument, ...Array.from(files)])
  }

  const handleDeleteSupportingDocs = elementIndex => {
    const filterArr = formik.values.supportingDocument.filter((item, index) => index != elementIndex)
    formik.setFieldValue('supportingDocument', filterArr)
  }

  const handleClose = () => {
    // setsupportingDocument([])
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
      <AppBar sx={{ position: 'relative' }}>
        <Toolbar sx={{ height: '3rem', minHeight: '3rem' }}>
          <Typography sx={{ ml: 2, flex: 1, color: 'white' }} variant='h6' component='div'>
            Upload Invoice
          </Typography>
          <IconButton autoFocus color='inherit' onClick={() => setOpen(false)}>
            <Close />
          </IconButton>
        </Toolbar>
      </AppBar>

      <form onSubmit={formik.handleSubmit}>
        <DialogContent>
          <Grid container spacing={2} sx={{ justifyContent: 'space-between' }}>
            <Grid container spacing={2} xs={6} padding={2}>
              <Grid item sm={9.5}>
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
              <Grid item xs={2.5}>
                <Button variant='contained' onClick={() => console.log(poDetailsData.url)}>
                  View Docs
                </Button>
              </Grid>

              <Grid item xs={12}>
                <Autocomplete
                  name='paymentType'
                  size='small'
                  {...config}
                  options={[
                    'CREDIT CARD',
                    'DEBIT CARD',
                    'PAYPAL',
                    'BANK TRANSFER',
                    'CASH',
                    'CHECK',
                    'MOBILE PAYMENT',
                    'CRYPTOCURRENCY',
                    'GIFT CARD',
                    'OTHER'
                  ]}
                  value={formik.values.paymentType}
                  // onChange={formik.handleChange}
                  onChange={(e, value) => formik.setFieldValue('paymentType', value)}
                  renderInput={params => (
                    <TextField {...params} label='PAYMENT TYPE' name='paymentType' variant='outlined' size='small' />
                  )}
                />
              </Grid>

              <Grid item xs={12}>
                <Autocomplete
                  name='deliveryPlant'
                  size='small'
                  {...config}
                  options={poDetailsData.deliveryPlant || []}
                  value={formik.values.deliveryPlant}
                  onChange={(e, value) => formik.setFieldValue('deliveryPlant', value)}
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

              <Grid item sx={12}>
                <FormControl sx={{ display: 'flex', flexDirection: 'row', alignItems: 'center' }}>
                  <FormLabel>Is this Payment Against LC ?</FormLabel>
                  <RadioGroup
                    row
                    aria-labelledby='demo-row-radio-buttons-group-label'
                    name='row-radio-buttons-group'
                    sx={{ ml: 1 }}
                    onChange={event => {
                      console.log(event.target.value)
                      formik.setFieldValue('isagainstLC', event.target.value)
                    }}
                    value={formik.values.isagainstLC}
                  >
                    <FormControlLabel value={true} control={<Radio />} label='Yes' />
                    <FormControlLabel value={false} control={<Radio />} label='No' />
                  </RadioGroup>
                </FormControl>
              </Grid>

              <Grid item xs={12}>
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
                    customInput={<TextField label='Payment Date' size='small' fullWidth />}
                    onChange={date => formik.setFieldValue('invoiceDate', date)}
                  />
                </DatePickerWrapper>
              </Grid>

              <Grid item xs={12}>
                <TextField
                  {...config}
                  size='small'
                  label='INVOICE NUMBER'
                  value={formik.values.invoiceNumber}
                  name='invoiceNumber'
                  onChange={formik.handleChange}
                />
              </Grid>

              <Grid item xs={12}>
                <FormControl sx={{ display: 'flex', flexDirection: 'row', alignItems: 'center' }}>
                  <FormLabel>Is it a GST invoice ?</FormLabel>
                  <RadioGroup
                    row
                    aria-labelledby='demo-row-radio-buttons-group-label'
                    name='row-radio-buttons-group'
                    sx={{ ml: 1 }}
                    onChange={event => formik.setFieldValue('isGst', event.target.value)}
                    value={formik.values.isGst}
                  >
                    <FormControlLabel value={true} control={<Radio />} label='Yes' />
                    <FormControlLabel value={false} control={<Radio />} label='No' />
                  </RadioGroup>
                </FormControl>
              </Grid>

              <Grid item xs={6}>
                <TextField
                  {...config}
                  size='small'
                  label='Seller GST'
                  name='sellerGst'
                  value={formik.values.sellerGst}
                  onChange={formik.handleChange}
                />
              </Grid>

              <Grid item xs={6}>
                <TextField
                  {...config}
                  size='small'
                  label='Buyer GST'
                  name='buyerGst'
                  value={formik.values.buyerGst}
                  onChange={formik.handleChange}
                />
              </Grid>

              <Grid item xs={6}>
                <FormControl>
                  <FormLabel>Is it TRED Exchange Payment ?</FormLabel>
                  <RadioGroup
                    row
                    aria-labelledby='demo-row-radio-buttons-group-label'
                    name='row-radio-buttons-group'
                    sx={{ ml: 1 }}
                    onChange={event => formik.setFieldValue('isTredExchangePayment', event.target.value)}
                    value={formik.values.isTredExchangePayment}
                  >
                    <FormControlLabel value={true} control={<Radio />} label='Yes' />
                    <FormControlLabel value={false} control={<Radio />} label='No' />
                  </RadioGroup>
                </FormControl>
              </Grid>

              <Grid item xs={6}>
                <FormControl>
                  <FormLabel>Is it MDCC Payment ?</FormLabel>
                  <RadioGroup
                    row
                    aria-labelledby='demo-row-radio-buttons-group-label'
                    name='row-radio-buttons-group'
                    sx={{ ml: 1 }}
                    onChange={event => formik.setFieldValue('isMDCCPayment', event.target.value)}
                    value={formik.values.isMDCCPayment}
                  >
                    <FormControlLabel value={true} control={<Radio />} label='Yes' />
                    <FormControlLabel value={false} control={<Radio />} label='No' />
                  </RadioGroup>
                </FormControl>
              </Grid>

              <Grid item xs={6}>
                <TextField
                  {...config}
                  size='small'
                  label='Factor Unit Number'
                  name='factoryunitnumber'
                  disabled={formik.values.isTredExchangePayment == false}
                  value={formik.values.factoryunitnumber}
                  onChange={formik.handleChange}
                />
              </Grid>

              <Grid item xs={6}>
                <TextField
                  {...config}
                  size='small'
                  label='MDCC Number'
                  name='mdccnumber'
                  disabled={formik.values.isMDCCPayment == false}
                  value={formik.values.mdccnumber}
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
            </Grid>

            <Grid container xs={6} padding={2} spacing={2}>
              {/* <Paper elevation={3} style={{ padding: '6px' }}>
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
                </Paper> */}
              <Grid item xs={12}>
                <TextField
                  {...config}
                  size='small'
                  label='AMOUNT OF INVOICE'
                  name='invoiceAmount'
                  value={formik.values.invoiceAmount}
                  onChange={formik.handleChange}
                />
              </Grid>
              <Grid item xs={6}>
                <TextField
                  {...config}
                  size='small'
                  label='Mobile Number'
                  value={formik.values.mobileNumber}
                  name='mobileNumber'
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
              <Grid item xs={6}>
                <TextField
                  {...config}
                  size='small'
                  label='E-MAIL'
                  name='email'
                  value={formik.values.email}
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
              <Grid item xs={12}>
                <TextField
                  {...config}
                  size='small'
                  label='Bank Account for Payment'
                  value={formik.values.bankaccountno}
                  name='bankaccountno'
                  onChange={formik.handleChange}
                />
              </Grid>
              <Grid item xs={12}>
                If Your Bank Account is not updated with us, Kindly get in touch with EIC for updating the same.
              </Grid>
              <Grid item xs={12}>
                SES to be confirmed
              </Grid>
              <Grid item sm={12}>
                <Autocomplete
                  {...config}
                  name='ses'
                  // value={formik.values.poNumber}
                  options={[]}
                  getOptionLabel={option => option.label || option}
                  onInputChange={(event, newValue) => {
                    formik.setFieldValue('ses', newValue)
                    getInvoicesDebounce(newValue)
                  }}
                  onChange={(e, value) => {
                    formik.setFieldValue('ses', value)
                    value && dispatch(getPoDetailsAction({ poNumber: value }))
                  }}
                  renderInput={params => (
                    <TextField
                      {...params}
                      name='ses'
                      label='Please Select SES'
                      variant='outlined'
                      size='small'
                      // type='number'
                    />
                  )}
                />
              </Grid>

              <Grid item xs={6}>
                <Typography fontWeight='bold'>Invoice File: </Typography>
                {`${
                  formik.values.file != null ? (
                    <Chip
                      label={formik.values.file.name}
                      onDelete={() => formik.setFieldValue('file', null)}
                      onClick={() => console.log(file)}
                    />
                  ) : (
                    ' No File selected'
                  )
                }`}
                {/* {formik.values.file?.map(item => (
                  <Chip
                    label={item.name}
                    onDelete={() => formik.setFieldValue('file', [])}
                    onClick={() => console.log(file)}
                  />
                ))} */}
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
              <Grid item xs={6}>
                <Typography fontWeight='bold'>Supporting Documents:</Typography>
                {` ${formik.values.supportingDocument.length == 0 ? ' No File selected' : ''}`}
                {formik.values.supportingDocument.map((item, index) => (
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
              <Grid item xs={12} sx={{ display: 'flex', justifyContent: 'flex-end' }}>
                <Button variant='contained' type='submit'>
                  UPLOAD
                </Button>
              </Grid>
            </Grid>
          </Grid>
        </DialogContent>
      </form>
    </Dialog>
  )
}

export default memo(UploadInvoice)
