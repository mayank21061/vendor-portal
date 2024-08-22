import React, { memo, useState, useEffect, useCallback } from 'react'
import DoneIcon from '@mui/icons-material/Done'
import CloudUploadIcon from '@mui/icons-material/CloudUpload'
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
import { clientVendorRegisterAction } from 'src/redux/features/registrationSlice'

const VendorsForm = ({ open, setOpen }) => {
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
    companyname: yup.string().required('Company Name is required'),
    industryType: yup.string().required('Industry Type is required'),
    contactpersonname: yup.string().required('Contact Name is required'),
    contactpersondesignation: yup.string().required('Designation is required'),
    contactpersonmobilenumber: yup
      .string()
      .matches(/^[0-9]+$/, 'Contact Number must be digits')
      .length(10, 'Contact Number must be exactly 10 digits')
      .required('Contact Number is required'),
    contactpersonemail: yup.string().email('Invalid email format').required('Email is required'),
    otherAddress: yup.string().when('checked', {
      is: false,
      then: yup.string().required('Head Office Address is required'),
      otherwise: yup.string().notRequired()
    }),
    otherState: yup.string().when('checked', {
      is: false,
      then: yup.string().required('Head Office State is required'),
      otherwise: yup.string().notRequired()
    }),
    otherCity: yup.string().when('checked', {
      is: false,
      then: yup.string().required('Head Office City is required'),
      otherwise: yup.string().notRequired()
    }),
    otherZipCode: yup.string().when('checked', {
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
    tanno: yup
      .string()
      .matches(/^[A-Z]{4}[0-9]{5}[A-Z]{1}$/, 'TAN Number must be in the format XXXXX99999X')
      .required('TAN Number is required'),
    msmeno: yup.string().notRequired(), // Assuming MSME is optional
    registrationAddress: yup.string().required('Registered Address is required'),
    registrationState: yup.string().required('Registered State is required'),
    registrationCity: yup.string().required('Registered City is required'),
    registrationZipCode: yup
      .string()
      .matches(/^[0-9]+$/, 'Registered Pincode must be digits')
      .length(6, 'Registered Pincode must be exactly 6 digits')
      .required('Registered Pincode is required')
  })

  const formik = useFormik({
    // validationSchema,
    initialValues: {
      companyname: '',
      industryType: '',
      contactpersonname: '',
      contactpersondesignation: '',
      contactpersonmobilenumber: '',
      contactpersonemail: '',
      otherAddress: {
        address: '',
        country: 'India',
        state: '',
        city: '',
        zipCode: ''
      },
      // otherState: '',
      // otherCity: '',
      // otherZipCode: '',
      gstNumber: '',
      panNumber: '',
      tanno: '',
      msmeno: '',
      registrationAddress: {
        address: '',
        country: 'India',
        state: '',
        city: '',
        zipCode: ''
      },
      // registrationState: '',
      // registrationCity: '',
      // registrationZipCode: '',
      isClient: 'false'
    },
    onSubmit: values => {
      if (checked) {
        values.otherAddress = values.registrationAddress
        // values.otherState = values.registrationState
        // values.otherCity = values.registrationCity
        // values.otherZipCode = values.registrationZipCode
      }
      console.log(values)
      formik.resetForm()
      setOpen(false)
      setChecked(true)
      dispatch(clientVendorRegisterAction({ isClient: values.isClient, values }))
    }
  })

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
        Create Vendor
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
                  name='companyname'
                  value={formik.values.companyname}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  error={formik.touched.companyname && Boolean(formik.errors.companyname)}
                  helperText={formik.touched.companyname && formik.errors.companyname}
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
                  name='contactpersonname'
                  value={formik.values.contactpersonname}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  error={formik.touched.contactpersonname && Boolean(formik.errors.contactpersonname)}
                  helperText={formik.touched.contactpersonname && formik.errors.contactpersonname}
                />
              </Grid>
              <Grid item xs={3}>
                <TextField
                  {...config}
                  size='small'
                  label='Designation'
                  name='contactpersondesignation'
                  value={formik.values.contactpersondesignation}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  error={formik.touched.contactpersondesignation && Boolean(formik.errors.contactpersondesignation)}
                  helperText={formik.touched.contactpersondesignation && formik.errors.contactpersondesignation}
                />
              </Grid>
              <Grid item xs={3}>
                <TextField
                  {...config}
                  size='small'
                  label='Mobile No.'
                  name='contactpersonmobilenumber'
                  value={formik.values.contactpersonmobilenumber}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  error={formik.touched.contactpersonmobilenumber && Boolean(formik.errors.contactpersonmobilenumber)}
                  helperText={formik.touched.contactpersonmobilenumber && formik.errors.contactpersonmobilenumber}
                />
              </Grid>
              <Grid item xs={3}>
                <TextField
                  {...config}
                  size='small'
                  label='Email'
                  name='contactpersonemail'
                  value={formik.values.contactpersonemail}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  error={formik.touched.contactpersonemail && Boolean(formik.errors.contactpersonemail)}
                  helperText={formik.touched.contactpersonemail && formik.errors.contactpersonemail}
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
                  name='tanno'
                  value={formik.values.tanno}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  error={formik.touched.tanno && Boolean(formik.errors.tanno)}
                  helperText={formik.touched.tanno && formik.errors.tanno}
                />
              </Grid>
              <Grid item xs={4}>
                <TextField
                  {...config}
                  size='small'
                  label='MSME No.'
                  name='msmeno'
                  value={formik.values.msmeno}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  error={formik.touched.msmeno && Boolean(formik.errors.msmeno)}
                  helperText={formik.touched.msmeno && formik.errors.msmeno}
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
                      name='registrationAddress.address'
                      value={formik.values.registrationAddress?.address}
                      onChange={formik.handleChange}
                      onBlur={formik.handleBlur}
                      error={
                        formik.touched.registrationAddress?.address &&
                        Boolean(formik.errors.registrationAddress?.address)
                      }
                      helperText={
                        formik.touched.registrationAddress?.address && formik.errors.registrationAddress?.address
                      }
                    />
                  </Grid>
                  <Grid item xs={4}>
                    <TextField
                      {...config}
                      size='small'
                      label='State'
                      name='registrationAddress.state'
                      value={formik.values.registrationAddress?.state}
                      onChange={formik.handleChange}
                      onBlur={formik.handleBlur}
                      error={
                        formik.touched.registrationAddress?.state && Boolean(formik.errors.registrationAddress?.state)
                      }
                      helperText={formik.touched.registrationAddress?.state && formik.errors.registrationAddress?.state}
                    />
                  </Grid>
                  <Grid item xs={4}>
                    <TextField
                      {...config}
                      size='small'
                      label='City'
                      name='registrationAddress.city'
                      value={formik.values.registrationAddress?.city}
                      onChange={formik.handleChange}
                      onBlur={formik.handleBlur}
                      error={
                        formik.touched.registrationAddress?.city && Boolean(formik.errors.registrationAddress?.city)
                      }
                      helperText={formik.touched.registrationAddress?.city && formik.errors.registrationAddress?.city}
                    />
                  </Grid>
                  <Grid item xs={4}>
                    <TextField
                      {...config}
                      size='small'
                      label='Pincode'
                      name='registrationAddress.zipCode'
                      value={formik.values.registrationAddress?.zipCode}
                      onChange={formik.handleChange}
                      onBlur={formik.handleBlur}
                      error={
                        formik.touched.registrationAddress?.zipCode &&
                        Boolean(formik.errors.registrationAddress?.zipCode)
                      }
                      helperText={
                        formik.touched.registrationAddress?.zipCode && formik.errors.registrationAddress?.zipCode
                      }
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
                        name='otherAddress.address'
                        value={formik.values.otherAddress?.address}
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                        error={formik.touched.otherAddress?.address && Boolean(formik.errors.otherAddress?.address)}
                        helperText={formik.touched.otherAddress?.address && formik.errors.otherAddress?.address}
                      />
                    </Grid>
                    <Grid item xs={4}>
                      <TextField
                        {...config}
                        size='small'
                        label='State'
                        name='otherAddress.state'
                        value={formik.values.otherAddress?.state}
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                        error={formik.touched.otherAddress?.state && Boolean(formik.errors.otherAddress?.state)}
                        helperText={formik.touched.otherAddress?.state && formik.errors.otherAddress?.state}
                      />
                    </Grid>
                    <Grid item xs={4}>
                      <TextField
                        {...config}
                        size='small'
                        label='City'
                        name='otherAddress.city'
                        value={formik.values.otherAddress?.city}
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                        error={formik.touched.otherAddress?.city && Boolean(formik.errors.otherAddress?.city)}
                        helperText={formik.touched.otherAddress?.city && formik.errors.otherAddress?.city}
                      />
                    </Grid>
                    <Grid item xs={4}>
                      <TextField
                        {...config}
                        size='small'
                        label='Pincode'
                        name='otherAddress.zipCode'
                        value={formik.values.otherAddress?.zipCode}
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                        error={formik.touched.otherAddress?.zipCode && Boolean(formik.errors.otherAddress?.zipCode)}
                        helperText={formik.touched.otherAddress?.zipCode && formik.errors.otherAddress?.zipCode}
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
            Create
          </Button>
        </DialogActions>
      </form>
    </Dialog>
  )
}

export default memo(VendorsForm)
