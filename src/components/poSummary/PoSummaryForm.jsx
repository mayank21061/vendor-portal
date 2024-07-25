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
  TextField,
  Tooltip
} from '@mui/material'
import { Form, Formik } from 'formik'
import React, { useRef, useState, forwardRef } from 'react'
import DatePickerWrapper from 'src/@core/styles/libs/react-datepicker'
import DatePicker from 'react-datepicker'
import CustomTextField from 'src/@core/components/mui/text-field'
import dayjs from 'dayjs'
import styles from './posummary.module.css'

const PoSummaryForm = ({ open, setOpen }) => {
  const [file, setFile] = useState(null)
  const formikRef = useRef(null)

  const statusList = ['New', 'Pending', 'Closed']

  const fileChange = e => {
    e.preventDefault()
    const file = e.target.files[0]
    if (file) {
      setFile(file)
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
            status: '',
            poAmount: ''
          }}
          innerRef={formikRef}
          onSubmit={values => {
            console.log(values)
            const formData = new FormData()
            formData.append('name', values.poNumber)
            formData.append('issueDate', values.issueDate)
            formData.append('description', values.description)
            formData.append('deliveryDate', values.deliveryDate)
            formData.append('eic', values.eic)
            formData.append('status', values.status)
            formData.append('poAmount', values.poAmount)
            formData.append('file', file)
            const payload = {
              DOB: outputDate,
              body: formData,
              setOpen,
              formikRef
            }
            // dispatch(registerPoiAction(payload))
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
                        customInput={<TextField label='Issue Date' size='small' />}
                        onChange={date => {
                          setFieldValue('deliveryDate', date)
                        }}
                      />
                    </DatePickerWrapper>
                  </Grid>
                  <Grid item xs={4}>
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
                  <Grid item xs={4}>
                    <Autocomplete
                      name='Status'
                      size='small'
                      options={statusList}
                      value={values.status}
                      onChange={(e, value) => value && setFieldValue('status', value)}
                      renderInput={params => (
                        <TextField
                          {...params}
                          label='Status'
                          variant='outlined'
                          size='small'
                          error={touched.status && Boolean(errors.status)}
                          helperText={touched.status && errors.status}
                        />
                      )}
                    />
                  </Grid>
                  <Grid item xs={4}>
                    <TextField
                      name='poAmount'
                      label='Amount'
                      size='small'
                      fullWidth
                      value={values.poAmount}
                      onChange={handleChange}
                      error={touched.poAmount && Boolean(errors.poAmount)}
                      helperText={touched.poAmount && errors.poAmount}
                    />
                  </Grid>
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
                  {file?.name ? (
                    <div>
                      {file?.name}
                      <Tooltip title='Delete'>
                        <IconButton onClick={() => setFile(null)}>
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
