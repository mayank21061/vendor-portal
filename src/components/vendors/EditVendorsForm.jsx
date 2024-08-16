import React, { memo, useState, useEffect, useCallback } from 'react'

import {
  Autocomplete,
  Button,
  Checkbox,
  Chip,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Divider,
  FormControlLabel,
  FormGroup,
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

const EditVendorsForm = ({ open, setOpen, rowData }) => {
  console.log(rowData)
  const dispatch = useDispatch()
  const { poNumberListData, poDetailsData } = useSelector(state => state.dashboard)
  const [checked, setChecked] = useState(true)

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

  const validationSchema = yup.object({
    companyName: yup.string().required('Company Name is required'),
    industryType: yup.string().required('Industry Type is required'),
    contactName: yup.string().required('Contact Name is required'),
    contactDesignation: yup.string().required('Designation is required'),
    contactNumber: yup
      .string()
      .matches(/^[0-9]+$/, 'Contact Number must be digits')
      .length(10, 'Contact Number must be exactly 10 digits')
      .required('Contact Number is required'),
    contactEmail: yup.string().email('Invalid email format').required('Email is required'),
    HOaddress: yup.string().when('checked', {
      is: false,
      then: yup.string().required('Head Office Address is required'),
      otherwise: yup.string().notRequired()
    }),
    HOstate: yup.string().when('checked', {
      is: false,
      then: yup.string().required('Head Office State is required'),
      otherwise: yup.string().notRequired()
    }),
    HOcity: yup.string().when('checked', {
      is: false,
      then: yup.string().required('Head Office City is required'),
      otherwise: yup.string().notRequired()
    }),
    HOPincode: yup.string().when('checked', {
      is: false,
      then: yup
        .string()
        .matches(/^[0-9]+$/, 'Head Office Pincode must be digits')
        .length(6, 'Head Office Pincode must be exactly 6 digits')
        .required('Head Office Pincode is required'),
      otherwise: yup.string().notRequired()
    }),
    gstNumber: yup
      .string()
      .matches(/^[A-Z0-9]+$/, 'GST Number must be alphanumeric')
      .required('GST Number is required'),
    panNumber: yup
      .string()
      .matches(/^[A-Z]{5}[0-9]{4}[A-Z]{1}$/, 'PAN Number must be in the format XXXXX9999X')
      .required('PAN Number is required'),
    tanNumber: yup
      .string()
      .matches(/^[A-Z]{4}[0-9]{5}[A-Z]{1}$/, 'TAN Number must be in the format XXXXX99999X')
      .required('TAN Number is required'),
    msmeNumber: yup.string().notRequired(), // Assuming MSME is optional
    regAddress: yup.string().required('Registered Address is required'),
    regState: yup.string().required('Registered State is required'),
    regCity: yup.string().required('Registered City is required'),
    regPincode: yup
      .string()
      .matches(/^[0-9]+$/, 'Registered Pincode must be digits')
      .length(6, 'Registered Pincode must be exactly 6 digits')
      .required('Registered Pincode is required')
  })

  const formik = useFormik({
    // validationSchema,
    initialValues: {
      companyName: '',
      industryType: '',
      contactName: '',
      contactDesignation: '',
      contactNumber: '',
      contactEmail: '',
      HOaddress: '',
      HOstate: '',
      HOcity: '',
      HOPincode: '',
      gstNumber: '',
      panNumber: '',
      tanNumber: '',
      msmeNumber: '',
      regAddress: '',
      regState: '',
      regCity: '',
      regPincode: ''
    },
    onSubmit: values => {
      if (checked) {
        values.HOaddress = values.regAddress
        values.HOstate = values.regState
        values.HOcity = values.regCity
        values.HOPincode = values.regPincode
      }
      console.log(values)
      formik.resetForm()
      setOpen(false)
      setChecked(true)
      // dispatch(uploadInvoiceAction(values))
    }
  })

  useEffect(() => {
    if (rowData) {
      formik.setFieldValue('companyName', rowData.companyName || '')
      formik.setFieldValue('industryType', rowData.industry || '')
      formik.setFieldValue('contactName', rowData.contactName || '')
      formik.setFieldValue('contactDesignation', rowData.designation || '')
      formik.setFieldValue('contactNumber', rowData.phoneNumber || '')
      formik.setFieldValue('contactEmail', rowData.email || '')
      formik.setFieldValue('panNumber', rowData.panNo || '')
      formik.setFieldValue('gstNumber', rowData.gst || '')
      formik.setFieldValue('regState', rowData.state || '')
      formik.setFieldValue('regCity', rowData.city || '')
      formik.setFieldValue('companyName', rowData.companyName || '')
      formik.setFieldValue('companyName', rowData.companyName || '')
    }
  }, [rowData])

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
      fullWidth
      maxWidth='md'
      sx={{ '.MuiPaper-root': { overflowY: 'visible' }, '.MuiPaper-root': { maxHeight: '100%' } }}
    >
      <DialogTitle id='customized-dialog-title' sx={{ p: 4 }}>
        Client Details
      </DialogTitle>
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
              <Grid item sm={4}>
                <TextField
                  {...config}
                  size='small'
                  label='Company Name'
                  name='companyName'
                  value={formik.values.companyName}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  error={formik.touched.companyName && Boolean(formik.errors.companyName)}
                  helperText={formik.touched.companyName && formik.errors.companyName}
                />
              </Grid>
              <Grid item xs={4}>
                <TextField
                  {...config}
                  size='small'
                  label='Industry Type'
                  name='industryType'
                  value={formik.values.industryType}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  error={formik.touched.industryType && Boolean(formik.errors.industryType)}
                  helperText={formik.touched.industryType && formik.errors.industryType}
                />
              </Grid>
              <Grid item xs={4}>
                <TextField
                  {...config}
                  size='small'
                  label='Contact Name'
                  name='contactName'
                  value={formik.values.contactName}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  error={formik.touched.contactName && Boolean(formik.errors.contactName)}
                  helperText={formik.touched.contactName && formik.errors.contactName}
                />
              </Grid>
              <Grid item xs={3}>
                <TextField
                  {...config}
                  size='small'
                  label='Designation'
                  name='contactDesignation'
                  value={formik.values.contactDesignation}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  error={formik.touched.contactDesignation && Boolean(formik.errors.contactDesignation)}
                  helperText={formik.touched.contactDesignation && formik.errors.contactDesignation}
                />
              </Grid>
              <Grid item xs={3}>
                <TextField
                  {...config}
                  size='small'
                  label='Mobile No.'
                  name='contactNumber'
                  value={formik.values.contactNumber}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  error={formik.touched.contactNumber && Boolean(formik.errors.contactNumber)}
                  helperText={formik.touched.contactNumber && formik.errors.contactNumber}
                />
              </Grid>
              <Grid item xs={3}>
                <TextField
                  {...config}
                  size='small'
                  label='Email'
                  name='contactEmail'
                  value={formik.values.contactEmail}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  error={formik.touched.contactEmail && Boolean(formik.errors.contactEmail)}
                  helperText={formik.touched.contactEmail && formik.errors.contactEmail}
                />
              </Grid>
              <Grid item xs={3}>
                <TextField
                  {...config}
                  size='small'
                  label='PAN No.'
                  name='panNumber'
                  value={formik.values.panNumber}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  error={formik.touched.panNumber && Boolean(formik.errors.panNumber)}
                  helperText={formik.touched.panNumber && formik.errors.panNumber}
                />
              </Grid>
              <Grid item xs={4}>
                <TextField
                  {...config}
                  size='small'
                  label='GST No.'
                  name='gstNumber'
                  value={formik.values.gstNumber}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  error={formik.touched.gstNumber && Boolean(formik.errors.gstNumber)}
                  helperText={formik.touched.gstNumber && formik.errors.gstNumber}
                />
              </Grid>
              <Grid item xs={4}>
                <TextField
                  {...config}
                  size='small'
                  label='TAN No.'
                  name='tanNumber'
                  value={formik.values.tanNumber}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  error={formik.touched.tanNumber && Boolean(formik.errors.tanNumber)}
                  helperText={formik.touched.tanNumber && formik.errors.tanNumber}
                />
              </Grid>
              <Grid item xs={4}>
                <TextField
                  {...config}
                  size='small'
                  label='MSME No.'
                  name='msmeNumber'
                  value={formik.values.msmeNumber}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  error={formik.touched.msmeNumber && Boolean(formik.errors.msmeNumber)}
                  helperText={formik.touched.msmeNumber && formik.errors.msmeNumber}
                />
              </Grid>
              <Paper sx={{ mt: 2 }} elevation={6}>
                <Grid container spacing={2} padding={2}>
                  <Grid item xs={12}>
                    <Typography>Registered Address</Typography>
                  </Grid>
                  <Grid item xs={12}>
                    <TextField
                      {...config}
                      // multiline
                      // minRows={2}
                      size='small'
                      label='Address'
                      name='regAddress'
                      value={formik.values.regAddress}
                      onChange={formik.handleChange}
                      onBlur={formik.handleBlur}
                      error={formik.touched.regAddress && Boolean(formik.errors.regAddress)}
                      helperText={formik.touched.regAddress && formik.errors.regAddress}
                    />
                  </Grid>
                  <Grid item xs={4}>
                    <TextField
                      {...config}
                      size='small'
                      label='State'
                      name='regState'
                      value={formik.values.regState}
                      onChange={formik.handleChange}
                      onBlur={formik.handleBlur}
                      error={formik.touched.regState && Boolean(formik.errors.regState)}
                      helperText={formik.touched.regState && formik.errors.regState}
                    />
                  </Grid>
                  <Grid item xs={4}>
                    <TextField
                      {...config}
                      size='small'
                      label='City'
                      name='regCity'
                      value={formik.values.regCity}
                      onChange={formik.handleChange}
                      onBlur={formik.handleBlur}
                      error={formik.touched.regCity && Boolean(formik.errors.regCity)}
                      helperText={formik.touched.regCity && formik.errors.regCity}
                    />
                  </Grid>
                  <Grid item xs={4}>
                    <TextField
                      {...config}
                      size='small'
                      label='Pincode'
                      name='regPincode'
                      value={formik.values.regPincode}
                      onChange={formik.handleChange}
                      onBlur={formik.handleBlur}
                      error={formik.touched.regPincode && Boolean(formik.errors.regPincode)}
                      helperText={formik.touched.regPincode && formik.errors.regPincode}
                    />
                  </Grid>
                </Grid>
              </Paper>
              <Grid item xs={12}>
                <FormGroup>
                  <FormControlLabel
                    control={
                      <Checkbox
                        checked={checked}
                        onChange={e => {
                          setChecked(Boolean(e.target.checked))
                        }}
                      />
                    }
                    label='Head Office Address is same as Registered Address'
                  />
                </FormGroup>
              </Grid>
              {!checked && (
                <Paper elevation={6}>
                  <Grid container spacing={2} padding={2}>
                    <Grid item xs={12}>
                      <Typography>Head Office Address</Typography>
                    </Grid>
                    <Grid item xs={12}>
                      <TextField
                        {...config}
                        // multiline
                        // minRows={2}
                        size='small'
                        label='Address'
                        name='HOaddress'
                        value={formik.values.HOaddress}
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                        error={formik.touched.HOaddress && Boolean(formik.errors.HOaddress)}
                        helperText={formik.touched.HOaddress && formik.errors.HOaddress}
                      />
                    </Grid>
                    <Grid item xs={4}>
                      <TextField
                        {...config}
                        size='small'
                        label='State'
                        name='HOstate'
                        value={formik.values.HOstate}
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                        error={formik.touched.HOstate && Boolean(formik.errors.HOstate)}
                        helperText={formik.touched.HOstate && formik.errors.HOstate}
                      />
                    </Grid>
                    <Grid item xs={4}>
                      <TextField
                        {...config}
                        size='small'
                        label='City'
                        name='HOcity'
                        value={formik.values.HOcity}
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                        error={formik.touched.HOcity && Boolean(formik.errors.HOcity)}
                        helperText={formik.touched.HOcity && formik.errors.HOcity}
                      />
                    </Grid>
                    <Grid item xs={4}>
                      <TextField
                        {...config}
                        size='small'
                        label='Pincode'
                        name='HOPincode'
                        value={formik.values.HOPincode}
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                        error={formik.touched.HOPincode && Boolean(formik.errors.HOPincode)}
                        helperText={formik.touched.HOPincode && formik.errors.HOPincode}
                      />
                    </Grid>
                  </Grid>
                </Paper>
              )}
            </Grid>
          </Grid>
        </DialogContent>
        <DialogActions sx={{ p: 2 }}>
          <Button variant='contained' type='submit'>
            Edit
          </Button>
        </DialogActions>
      </form>
    </Dialog>
  )
}

export default memo(EditVendorsForm)
