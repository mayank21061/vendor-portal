import { Close, CloudUpload, Done } from '@mui/icons-material'
import {
  Autocomplete,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Grid,
  IconButton,
  InputAdornment,
  TextField,
  Tooltip
} from '@mui/material'
import { Form, Formik } from 'formik'
import React, { useRef, useState, forwardRef, useEffect } from 'react'
import DatePickerWrapper from 'src/@core/styles/libs/react-datepicker'
import DatePicker from 'react-datepicker'
import CustomTextField from 'src/@core/components/mui/text-field'
import dayjs from 'dayjs'
import styles from './posummary.module.css'
import { uploadPoAction } from 'src/redux/features/poSummarySlice'
import { useDispatch, useSelector } from 'react-redux'

const PoSummaryForm = ({ open, setOpen }) => {
  let username = ''
  useEffect(() => {
    username = JSON.parse(localStorage.getItem('userData'))?.username
  }, [])
  const { userData } = useSelector(state => state.user)

  const dispatch = useDispatch()
  const [file, setFile] = useState(null)
  const formikRef = useRef(null)

  const paymentTypeList = ['Credit Card', 'Debit Card', 'Net Banking', 'UPI', 'Cash', 'Cheque']

  const stateCapitals = [
    'New Delhi',
    'Amaravati', // Andhra Pradesh
    'Itanagar', // Arunachal Pradesh
    'Dispur', // Assam
    'Patna', // Bihar
    'Raipur', // Chhattisgarh
    'Panaji', // Goa
    'Gandhinagar', // Gujarat
    'Chandigarh', // Haryana (shared with Punjab)
    'Shimla', // Himachal Pradesh
    'Ranchi', // Jharkhand
    'Bengaluru', // Karnataka
    'Thiruvananthapuram', // Kerala
    'Bhopal', // Madhya Pradesh
    'Mumbai', // Maharashtra
    'Imphal', // Manipur
    'Shillong', // Meghalaya
    'Aizawl', // Mizoram
    'Kohima', // Nagaland
    'Bhubaneswar', // Odisha
    'Chandigarh', // Punjab (shared with Haryana)
    'Jaipur', // Rajasthan
    'Gangtok', // Sikkim
    'Chennai', // Tamil Nadu
    'Hyderabad', // Telangana
    'Agartala', // Tripura
    'Lucknow', // Uttar Pradesh
    'Dehradun', // Uttarakhand
    'Kolkata' // West Bengal
  ]

  const fileChange = e => {
    e.preventDefault()
    const file = e.target.files[0]
    if (file) {
      formikRef.current.setFieldValue('poFile', file)
    }
  }
  return (
    <div>
      <Dialog open={open} onClose={() => setOpen(false)} fullWidth maxWidth='md' className={styles.dialog}>
        <DialogTitle id='customized-dialog-title'>Enter PO Details</DialogTitle>
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

        <Formik
          initialValues={{
            poNumber: '',
            issueDate: dayjs(new Date()),
            deliveryDate: dayjs(new Date()).add(3, 'day'),
            eic: '',
            description: '',
            poAmount: '',
            receiver: username,
            deliveryTimelines: '',
            paymentType: '',
            deliveryPlant: [],
            poFile: null
          }}
          innerRef={formikRef}
          onSubmit={values => {
            const formData = new FormData()
            formData.append('poNumber', values.poNumber)
            formData.append('poIssueDate', dayjs(values.issueDate).format('YYYY-MM-DD'))
            formData.append('description', values.description)
            formData.append('deliveryDate', dayjs(values.deliveryDate).format('YYYY-MM-DD'))
            formData.append('eic', values.eic)
            formData.append('poAmount', values.poAmount)
            formData.append('receiver', values.receiver)
            formData.append('deliveryTimelines', values.deliveryTimelines)
            formData.append('paymentType', values.paymentType)
            formData.append('deliveryPlant', values.deliveryPlant)
            formData.append('poFile', values.poFile)
            dispatch(uploadPoAction(formData))
            formikRef.current.resetForm()
          }}
          //   validationSchema={validationSchema}
        >
          {({ isSubmitting, values, touched, errors, handleChange, setFieldValue }) => (
            <Form>
              <DialogContent dividers>
                <Grid container spacing={4} alignItems='center'>
                  <Grid item xs={6}>
                    <TextField
                      name='poNumber'
                      label='PO Number'
                      size='small'
                      fullWidth
                      value={values.poNumber}
                      onChange={handleChange}
                      error={touched.poNumber && Boolean(errors.poNumber)}
                      helperText={touched.poNumber && errors.poNumber}
                    />
                  </Grid>
                  <Grid item xs={3}>
                    <DatePickerWrapper>
                      <DatePicker
                        placeholderText='Issue Date'
                        fullWidth
                        showYearDropdown
                        id='issue-date'
                        autoComplete='off'
                        value={dayjs(values.issueDate).format('DD/MM/YYYY')}
                        selected={new Date(values.issueDate)}
                        dateFormat='dd MMMM yyyy'
                        customInput={<TextField label='Issue Date' size='small' />}
                        onChange={date => setFieldValue('issueDate', date)}
                      />
                    </DatePickerWrapper>
                  </Grid>
                  <Grid item xs={3}>
                    <DatePickerWrapper>
                      <DatePicker
                        disablePast
                        placeholderText='Delivery Date'
                        fullWidth
                        showYearDropdown
                        id='issue-date'
                        autoComplete='off'
                        value={dayjs(values.deliveryDate).format('DD/MM/YYYY')}
                        selected={new Date(values.deliveryDate)}
                        dateFormat='dd MMMM yyyy'
                        customInput={<TextField label='Delivery Date' size='small' />}
                        onChange={date => {
                          setFieldValue('deliveryDate', date)
                        }}
                      />
                    </DatePickerWrapper>
                  </Grid>
                  <Grid item xs={6}>
                    <TextField
                      name='eic'
                      label='EIC'
                      size='small'
                      fullWidth
                      value={values.eic}
                      onChange={handleChange}
                      error={touched.eic && Boolean(errors.eic)}
                      helperText={touched.eic && errors.eic}
                    />
                  </Grid>
                  <Grid item xs={6}>
                    <TextField
                      name='poAmount'
                      label='Amount'
                      size='small'
                      type='number'
                      fullWidth
                      value={values.poAmount}
                      onChange={handleChange}
                      error={touched.poAmount && Boolean(errors.poAmount)}
                      helperText={touched.poAmount && errors.poAmount}
                      InputProps={{
                        startAdornment: <InputAdornment position='start'>Rs.</InputAdornment>
                      }}
                    />
                  </Grid>

                  <Grid item xs={6}>
                    <TextField
                      type='number'
                      name='deliveryTimelines'
                      label='Delivery Timelines'
                      size='small'
                      fullWidth
                      value={values.deliveryTimelines}
                      onChange={handleChange}
                      error={touched.deliveryTimelines && Boolean(errors.deliveryTimelines)}
                      helperText={touched.deliveryTimelines && errors.deliveryTimelines}
                      InputProps={{
                        endAdornment: <InputAdornment position='start'>days</InputAdornment>
                      }}
                    />
                  </Grid>

                  <Grid item xs={6}>
                    <Autocomplete
                      name='paymentType'
                      size='small'
                      options={paymentTypeList}
                      value={values.paymentType}
                      onChange={(e, value) => value && setFieldValue('paymentType', value)}
                      renderInput={params => (
                        <TextField
                          {...params}
                          label='Payment Type'
                          variant='outlined'
                          size='small'
                          error={touched.paymentType && Boolean(errors.paymentType)}
                          helperText={touched.paymentType && errors.paymentType}
                        />
                      )}
                    />
                  </Grid>

                  <Grid item xs={12}>
                    <Autocomplete
                      multiple
                      name='deliveryPlant'
                      size='small'
                      options={stateCapitals}
                      value={values.deliveryPlant}
                      onChange={(e, value) => value && setFieldValue('deliveryPlant', value)}
                      renderInput={params => (
                        <TextField
                          {...params}
                          label='Delivery Plant'
                          variant='outlined'
                          size='small'
                          error={touched.deliveryPlant && Boolean(errors.deliveryPlant)}
                          helperText={touched.deliveryPlant && errors.deliveryPlant}
                        />
                      )}
                    />
                  </Grid>

                  {/* <Grid item xs={12}>
                    <TextField
                      name='deliveryPlant'
                      label='Delivery Plant'
                      size='small'
                      fullWidth
                      value={values.deliveryPlant}
                      onChange={handleChange}
                      error={touched.deliveryPlant && Boolean(errors.deliveryPlant)}
                      helperText={touched.deliveryPlant && errors.deliveryPlant}
                    />
                  </Grid> */}
                  <Grid item xs={12}>
                    <TextField
                      name='description'
                      label='Description'
                      size='small'
                      multiline
                      minRows={3}
                      fullWidth
                      value={values.description}
                      onChange={handleChange}
                    />
                  </Grid>
                  <Grid item xs={12}></Grid>
                </Grid>
              </DialogContent>
              <DialogActions sx={{ p: 3, display: 'flex', justifyContent: 'space-between' }}>
                <>
                  {formikRef?.current?.values?.poFile?.name ? (
                    <div>
                      {formikRef?.current?.values?.poFile?.name}
                      <Tooltip title='Delete'>
                        <IconButton onClick={() => formikRef.current.setFieldValue('poFile', null)}>
                          <Close />
                        </IconButton>
                      </Tooltip>
                    </div>
                  ) : (
                    <>
                      <Button component='label' variant='outlined' startIcon={<CloudUpload />}>
                        Upload PO
                        <input
                          name='file'
                          style={{ display: 'none' }}
                          type='file'
                          accept='application/pdf'
                          onChange={fileChange}
                        />
                      </Button>
                    </>
                  )}
                </>
                <Button type='submit' variant='contained' endIcon={<Done />}>
                  {/* {registerPoiIsLoading ? 'Loading...' : 'REPORT'} */}
                  Submit
                </Button>
              </DialogActions>
            </Form>
          )}
        </Formik>
      </Dialog>
    </div>
  )
}

export default PoSummaryForm
