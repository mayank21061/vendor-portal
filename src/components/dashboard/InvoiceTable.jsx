import React, { forwardRef, useCallback } from 'react'
import { useState, useEffect } from 'react'
import Box from '@mui/material/Box'
import Typography from '@mui/material/Typography'
import { DataGrid } from '@mui/x-data-grid'
import CloseIcon from '@mui/icons-material/Close'
import LinearProgress from '@mui/material/LinearProgress'
import moment from 'moment'
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Fab,
  FormControl,
  Grid,
  IconButton,
  MenuItem,
  Paper,
  Select,
  Tooltip
} from '@mui/material'
import CustomAvatar from 'src/@core/components/mui/avatar'
import { getInitials } from 'src/@core/utils/get-initials'
import { useDispatch, useSelector } from 'react-redux'
import CustomTextField from 'src/@core/components/mui/text-field'
import DatePickerWrapper from 'src/@core/styles/libs/react-datepicker'
import ReactDatePicker from 'react-datepicker'
import format from 'date-fns/format'
import VisibilityIcon from '@mui/icons-material/Visibility'
import { getPoSummaryAction } from 'src/redux/features/poSummarySlice'
import { Add, Receipt } from '@mui/icons-material'
import styles from './invoice.module.css'
import { getInvoicesAction } from 'src/redux/features/dashboardSlice'
import UploadInvoices from './UploadInvoices'
import _debounce from 'lodash/debounce'

const renderName = row => {
  if (row.avatar) {
    return <CustomAvatar src={row.avatar} sx={{ mr: 2.5, width: 38, height: 38 }} />
  } else {
    return (
      <CustomAvatar
        skin='light'
        color={row.avatarColor || 'primary'}
        sx={{ mr: 2.5, width: 38, height: 38, fontSize: theme => theme.typography.body1.fontSize }}
      >
        {getInitials(row.name || 'John Doe')}
      </CustomAvatar>
    )
  }
}

const CustomInput = forwardRef((props, ref) => {
  const startDate = props.start !== null ? format(props.start, 'dd/MM/yyyy') : ''
  const endDate = props.end !== null ? ` - ${format(props.end, 'dd/MM/yyyy')}` : null
  const value = `${startDate}${endDate !== null ? endDate : ''}`
  props.start === null && props.dates.length && props.setDates ? props.setDates([]) : null
  const updatedProps = { ...props }
  delete updatedProps.setDates

  return <CustomTextField fullWidth inputRef={ref} {...updatedProps} label={props.label || ''} value={value} />
})

const CustomTable = props => {
  const [paginationModel, setPaginationModel] = useState({ page: 0, pageSize: 7 })
  const [showInvoicesForm, setShowInvoicesForm] = useState(false)
  const data = useSelector(state => state.invoice.invoicesData)

  const { invoicesDataIsLoading, invoicesDataIsError, invoicesDataError, invoicesDataIsSuccess } = useSelector(
    state => state.invoice
  )

  const dispatch = useDispatch()

  const [dates, setDates] = useState([])
  const [endDateRange, setEndDateRange] = useState(new Date())
  const [startDateRange, setStartDateRange] = useState(new Date())
  const [hoverdRowId, setHoveredId] = useState(null)
  const [eventData, seteventData] = useState({})
  const [showeventDetail, setShoweventDetail] = useState(false)
  const [value, setValue] = useState('')
  const [filterType, setFilterType] = useState('All')
  const [previewPO, setPreviewPO] = useState(false)
  const [fileUrl, setFileUrl] = useState(null)

  const formatDate = dateString => {
    const formattedDate = moment(dateString).format('DD/MM/YYYY h:mm A')

    return formattedDate
  }

  // useEffect(() => {
  //   const payload = {
  //     search: value,
  //     fromDate: moment(startDateRange).format('YYYY-MM-DD'),
  //     toDate: moment(endDateRange).format('YYYY-MM-DD'),
  //     filterBy: filterType
  //   }
  //   if (startDateRange && endDateRange) dispatch(getPoSummaryAction(payload))
  // }, [value, endDateRange, startDateRange, filterType])

  const getInvoicesDataDebounce = useCallback(
    _debounce((value, filterType) => {
      dispatch(getInvoicesAction(value, filterType))
    }, 1000),
    []
  )

  useEffect(() => {
    getInvoicesDataDebounce()
  }, [value, filterType])

  const handleOnChangeRange = dates => {
    const [start, end] = dates
    if (start !== null && end !== null) {
      setDates(dates)
    }
    setStartDateRange(start)
    setEndDateRange(end)
  }

  // const handleFilter = useCallback(
  //   _debounce(searchText => {
  //     setValue(searchText)
  //   }, 1000),
  //   []
  // )

  const handleViewPDF = (e, rowData) => {
    setFileUrl(rowData.docUrl)
    seteventData(rowData)
    setPreviewPO(true)
  }

  const handleRowViewClose = () => {
    setShoweventDetail(false)
  }

  const handleChangeFilter = e => {
    setFilterType(e.target.value)
  }

  const filters = [
    'All',
    'Submitted',
    'With EIC',
    'EIC Approved',
    'With Finance',
    'Finance Approved',
    'With Bank',
    'Paid'
  ]

  const columns = [
    {
      flex: 0.1,
      field: 'no',
      headerName: 'NUMBER',
      renderCell: ({ row }) => {
        // const date = new Date(row.date)
        // const options = { weekday: 'short', month: 'short', day: '2-digit', year: 'numeric' }
        // const formattedDate = date.toLocaleDateString('en-US', options)

        return (
          <Typography sx={{ color: 'text.secondary', whiteSpace: 'pre-line', overflowWrap: 'break-word' }}>
            {row.date}
          </Typography>
        )
      },
      headerClassName: styles.customheader
    },
    {
      flex: 0.1,
      field: 'date',
      headerName: 'DATE',
      renderCell: ({ row }) => {
        // const date = new Date(row.date)
        // const options = { weekday: 'short', month: 'short', day: '2-digit', year: 'numeric' }
        // const formattedDate = date.toLocaleDateString('en-US', options)

        return (
          <Typography sx={{ color: 'text.secondary', whiteSpace: 'pre-line', overflowWrap: 'break-word' }}>
            {row.date}
          </Typography>
        )
      },
      headerClassName: styles.customheader
    },
    {
      flex: 0.1,
      field: 'po',
      headerName: 'PO Number',
      renderCell: ({ row }) => {
        // const date = new Date(row.date)
        // const options = { weekday: 'short', month: 'short', day: '2-digit', year: 'numeric' }
        // const formattedDate = date.toLocaleDateString('en-US', options)

        return (
          <Typography sx={{ color: 'text.secondary', whiteSpace: 'pre-line', overflowWrap: 'break-word' }}>
            {row.date}
          </Typography>
        )
      },
      headerClassName: styles.customheader
    },
    {
      flex: 0.1,
      field: 'amount',
      headerName: 'AMOUNT',
      headerClassName: styles.customheader,
      renderCell: ({ row }) => {
        return (
          <Box sx={{ display: 'flex', alignItems: 'center' }}>
            <Box sx={{ display: 'flex', flexDirection: 'column' }}>
              <Typography
                noWrap
                sx={{ color: 'text.secondary', fontWeight: 500, whiteSpace: 'pre-line', overflowWrap: 'break-word' }}
              >
                {row.amount}
              </Typography>
            </Box>
          </Box>
        )
      }
    },
    {
      flex: 0.15,
      field: 'dueDate',
      headerName: 'DUE DATE',
      headerClassName: styles.customheader,
      renderCell: ({ row }) => {
        return (
          <Box sx={{ display: 'flex', alignItems: 'center' }}>
            <Box sx={{ display: 'flex', flexDirection: 'column' }}>
              <Typography
                noWrap
                sx={{ color: 'text.secondary', fontWeight: 500, whiteSpace: 'pre-line', overflowWrap: 'break-word' }}
              >
                {row.dueDate}
              </Typography>
            </Box>
          </Box>
        )
      }
    },
    {
      flex: 0.1,
      field: 'status',
      headerName: 'STATUS',
      headerClassName: styles.customheader,
      renderCell: ({ row }) => {
        return (
          <Box sx={{ display: 'flex', alignItems: 'center' }}>
            <Box sx={{ display: 'flex', flexDirection: 'column' }}>
              <Typography
                noWrap
                sx={{ color: 'text.secondary', fontWeight: 500, whiteSpace: 'pre-line', overflowWrap: 'break-word' }}
              >
                {row.status}
              </Typography>
            </Box>
          </Box>
        )
      }
    }

    // {
    //   sortable: false,
    //   field: 'actions',
    //   headerName: '',
    //   headerAlign: 'center',
    //   align: 'center',
    //   headerClassName: styles.customheader,
    //   renderCell: ({ row }) =>
    //     hoverdRowId !== null &&
    //     hoverdRowId === row.id && (
    //       <>
    //         <Tooltip title='Preview'>
    //           <IconButton
    //             onClick={event => {
    //               handleViewPDF(event, row)
    //             }}
    //           >
    //             <VisibilityIcon
    //               style={{
    //                 width: '1.2rem',
    //                 height: '1.2rem',
    //                 color: row.priority === 'High' ? '#5F2120' : row.priority === 'Medium' ? '#663C00' : '#014361'
    //               }}
    //             />
    //           </IconButton>
    //         </Tooltip>
    //         <Tooltip title='Invoices'>
    //           <IconButton
    //             onClick={event => {
    //               handleViewPDF(event, row)
    //             }}
    //           >
    //             <Receipt
    //               style={{
    //                 width: '1.2rem',
    //                 height: '1.2rem',
    //                 color: row.priority === 'High' ? '#5F2120' : row.priority === 'Medium' ? '#663C00' : '#014361'
    //               }}
    //             />
    //           </IconButton>
    //         </Tooltip>
    //       </>
    //     )
    // }
  ]

  return (
    <>
      <Paper elevation={24} sx={{ height: '85vh', overflowY: 'auto' }}>
        <Grid container spacing={2} sx={{ padding: '0rem 1rem 0.5rem 1rem' }}>
          <Grid
            item
            xs={12}
            style={{
              display: 'flex',
              width: '100%',
              justifyContent: 'space-between',
              alignItems: 'center'
            }}
          >
            <Typography variant='h4' fontWeight='bold' sx={{ mt: 4 }}>
              Invoices
            </Typography>
            <div
              style={{
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'end',
                gap: '10px',
                flexWrap: 'wrap',
                marginTop: '.5rem'
              }}
            >
              {/* <div style={{ minWidth: '18vw' }}>
                <DatePickerWrapper>
                  <ReactDatePicker
                    showYearDropdown
                    isClearable
                    selectsRange
                    monthsShown={2}
                    endDate={endDateRange}
                    selected={startDateRange}
                    startDate={startDateRange}
                    shouldCloseOnSelect={false}
                    id='date-range-picker-months'
                    onChange={handleOnChangeRange}
                    customInput={
                      <CustomInput
                        dates={dates}
                        setDates={setDates}
                        label='Select Date Range'
                        end={endDateRange}
                        start={startDateRange}
                      />
                    }
                  />
                </DatePickerWrapper>
              </div> */}
              <div style={{ minWidth: '20vw' }}>
                <CustomTextField
                  fullWidth
                  value={value}
                  placeholder='Search'
                  onChange={e => setValue(e.target.value)}
                  style={{ marginTop: '18px' }}
                />
              </div>
              <FormControl sx={{ borderRadius: '.8rem', width: '10vw' }} size='small'>
                <Select
                  labelId='demo-select-small-label'
                  id='demo-select-small'
                  value={filterType}
                  onChange={handleChangeFilter}
                >
                  {filters.map((item, index) => (
                    <MenuItem key={index} value={item}>
                      {item}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
              <Tooltip title='CREATE INVOICE'>
                <Fab color='primary' aria-label='add' size='small' onClick={() => setShowInvoicesForm(true)}>
                  <Add />
                </Fab>
              </Tooltip>
            </div>
          </Grid>
          {/* {invoicesDataIsLoading ? (
            <Box sx={{ width: '100%', marginTop: '40px' }}>
              <LinearProgress />
            </Box>
          ) : invoicesDataIsError ? (
            <>
              <h1>{invoicesDataError}</h1>
            </>
          ) : invoicesDataIsSuccess ? ( */}
          <Grid item xs={12}>
            <Paper elevation={10}>
              <DataGrid
                sx={{ height: '70vh' }}
                rows={data || []}
                rowHeight={62}
                columnHeaderHeight={40}
                columns={columns}
                disableRowSelectionOnClick
                getRowId={row => row.id}
                onRowClick={params => console.log(params)}
                componentsProps={{
                  row: {
                    onMouseEnter: event => {
                      const id = event.currentTarget.dataset.id
                      const hoveredRow = data || [].find(row => row.id === Number(id))
                      setHoveredId(id)
                    },
                    onMouseLeave: event => {
                      setHoveredId(null)
                    }
                  }
                }}
                pageSizeOptions={[7, 10, 25, 50]}
                paginationModel={paginationModel}
                onPaginationModelChange={setPaginationModel}
              />
            </Paper>
          </Grid>

          {/*// ) : (
          //   ''
          // )}*/}
        </Grid>
      </Paper>
      {/* ---------- view events  detail dialog */}
      <Dialog
        open={showeventDetail}
        onClose={handleRowViewClose}
        aria-labelledby='alert-dialog-title'
        aria-describedby='alert-dialog-description'
      >
        <DialogTitle id='customized-dialog-title'>Events Detail</DialogTitle>
        <Tooltip title='CLOSE'>
          <IconButton
            aria-label='close'
            onClick={handleRowViewClose}
            sx={{
              position: 'absolute',
              right: 8,
              top: 8,
              color: theme => theme.palette.grey[500]
            }}
          >
            <CloseIcon />
          </IconButton>
        </Tooltip>

        <DialogContent dividers>
          <Grid container spacing={6}>
            <Grid item xs={4}>
              <Typography variant='h6'>DATE : </Typography>
            </Grid>
            <Grid item xs={8}>
              <Typography variant='inherit'>{formatDate(eventData?.date)}</Typography>
            </Grid>
            <Grid item xs={4}>
              <Typography variant='h6'> TYPE : </Typography>
            </Grid>
            <Grid item xs={8}>
              <Typography variant='inherit'>{eventData?.type}</Typography>
            </Grid>
            <Grid item xs={4}>
              <Typography variant='h6'> POI : </Typography>
            </Grid>
            <Grid item xs={8}>
              <Typography variant='inherit'>{eventData?.userNames}</Typography>
            </Grid>
            <Grid item xs={4}>
              <Typography variant='h6'> DESCRIPTION : </Typography>
            </Grid>
            <Grid item xs={8}>
              <Typography variant='inherit'>{eventData?.description}</Typography>
            </Grid>
          </Grid>
        </DialogContent>
      </Dialog>
      <UploadInvoices open={showInvoicesForm} setOpen={setShowInvoicesForm} />
    </>
  )
}

export default CustomTable
