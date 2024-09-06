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
  Fade,
  FormControl,
  Grid,
  IconButton,
  MenuItem,
  Paper,
  Popper,
  Select,
  Tooltip,
  useTheme
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
import { Add, CalendarMonth, Receipt } from '@mui/icons-material'
import styles from './invoices.module.css'
import { getInvoicesAction } from 'src/redux/features/dashboardSlice'
import UploadInvoices from './UploadInvoices'
import _debounce from 'lodash/debounce'
import { setTableStateAction } from 'src/redux/features/tableSlice'

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
  const dispatch = useDispatch()
  const theme = useTheme()
  const getFontColor = () => (theme.palette.mode === 'dark' ? '#fff' : 'text.primary')
  const [paginationModel, setPaginationModel] = useState({ page: 0, pageSize: 7 })
  const [showInvoicesForm, setShowInvoicesForm] = useState(false)
  const data = useSelector(state => state.invoice.invoicesData?.content)
  const { invoicesDataIsLoading, invoicesDataIsError, invoicesDataError, invoicesDataIsSuccess, invoicesData } =
    useSelector(state => state.invoice)
  console.log(invoicesData)
  const { pageNumber, pageSize } = useSelector(state => state.table)

  const [hoverdRowId, setHoveredId] = useState(null)
  const [eventData, seteventData] = useState({})
  const [showeventDetail, setShoweventDetail] = useState(false)
  const [value, setValue] = useState('')
  const [filterType, setFilterType] = useState('All')
  const [previewPO, setPreviewPO] = useState(false)
  const [fileUrl, setFileUrl] = useState(null)
  const { toDate, fromDate } = useSelector(state => state.table)
  const [anchorEl, setAnchorEl] = useState(null)
  const [open, setOpen] = useState(false)
  const [placement, setPlacement] = useState()
  const [dates, setDates] = useState([])

  const formatDate = dateString => {
    const formattedDate = moment(dateString).format('DD/MM/YYYY h:mm A')

    return formattedDate
  }

  const getInvoicesDataDebounce = useCallback(
    _debounce((value, filterType) => {
      dispatch(getInvoicesAction(value, filterType))
    }, 1000),
    []
  )

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

  const handleClick = newPlacement => event => {
    setAnchorEl(event.currentTarget)
    setOpen(prev => placement !== newPlacement || !prev)
    setPlacement(newPlacement)
  }

  const handleOnChangeRange = dates => {
    const [start, end] = dates
    if (start !== null && end !== null) {
      setDates(dates)
    }
    dispatch(setTableStateAction({ fromDate: start, toDate: end }))
    // setStartDateRange(start)
    // setEndDateRange(end)
  }

  const columns = [
    {
      flex: 0.1,
      field: 'no',
      headerName: 'Invoice no.',
      renderCell: ({ row }) => {
        return (
          <Typography
            sx={{
              color: hoverdRowId == row.id ? 'black' : getFontColor(),
              fontWeight: hoverdRowId == row.id ? 700 : 600,
              fontSize: 'small'
            }}
          >
            {row.invoiceNumber}
          </Typography>
        )
      }
    },
    {
      flex: 0.1,
      field: 'date',
      renderHeader: () => (
        <div style={{ display: 'flex', alignItems: 'center' }}>
          <Typography sx={{ marginRight: '4px' }}>DATE</Typography>

          <IconButton onClick={handleClick('bottom')}>
            <CalendarMonth sx={{ fontSize: 'medium' }} />
          </IconButton>
        </div>
      ),
      renderCell: ({ row }) => {
        const date = new Date(row.invoiceDate)
        const options = { weekday: 'short', month: 'short', day: '2-digit', year: 'numeric' }
        const formattedDate = date.toLocaleDateString('en-US', options)

        return (
          <Typography
            sx={{
              color: hoverdRowId == row.id ? 'black' : getFontColor(),
              fontWeight: hoverdRowId == row.id ? 700 : 600,
              fontSize: 'small'
            }}
          >
            {formattedDate}
          </Typography>
        )
      }
    },
    {
      flex: 0.1,
      field: 'po',
      headerName: 'PO Number',
      renderCell: ({ row }) => {
        return (
          <Typography
            sx={{
              color: hoverdRowId == row.id ? 'black' : getFontColor(),
              fontWeight: hoverdRowId == row.id ? 700 : 600,
              fontSize: 'small'
            }}
          >
            {row.poNumber}
          </Typography>
        )
      }
    },
    {
      flex: 0.1,
      field: 'amount',
      headerName: 'AMOUNT',

      renderCell: ({ row }) => {
        return (
          <Box sx={{ display: 'flex', alignItems: 'center' }}>
            <Box sx={{ display: 'flex', flexDirection: 'column' }}>
              <Typography
                noWrap
                // sx={{ color: 'text.secondary', fontWeight: 500, whiteSpace: 'pre-line', overflowWrap: 'break-word' }}
                sx={{
                  color: hoverdRowId == row.id ? 'black' : getFontColor(),
                  fontWeight: hoverdRowId == row.id ? 700 : 600,
                  fontSize: 'small'
                }}
              >
                {row.invoiceAmount}
              </Typography>
            </Box>
          </Box>
        )
      }
    },
    {
      flex: 0.15,
      field: 'bankDetails',
      headerName: 'BANK DETAILS',

      renderCell: ({ row }) => {
        return (
          <Box sx={{ display: 'flex', alignItems: 'center' }}>
            <Box sx={{ display: 'flex', flexDirection: 'column' }}>
              <Typography
                noWrap
                // sx={{ color: 'text.secondary', fontWeight: 500, whiteSpace: 'pre-line', overflowWrap: 'break-word' }}
                sx={{
                  color: hoverdRowId == row.id ? 'black' : getFontColor(),
                  fontWeight: hoverdRowId == row.id ? 700 : 600,
                  fontSize: 'small'
                }}
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

      renderCell: ({ row }) => {
        return (
          <Box sx={{ display: 'flex', alignItems: 'center' }}>
            <Box sx={{ display: 'flex', flexDirection: 'column' }}>
              <Typography
                noWrap
                // sx={{ color: 'text.secondary', fontWeight: 500, whiteSpace: 'pre-line', overflowWrap: 'break-word' }}
                sx={{
                  color: hoverdRowId == row.id ? 'black' : getFontColor(),
                  fontWeight: hoverdRowId == row.id ? 700 : 600,
                  fontSize: 'small'
                }}
              >
                {row.status}
              </Typography>
            </Box>
          </Box>
        )
      }
    }
  ]

  return (
    <>
      {/* <Paper elevation={24} sx={{ height: '85vh', overflowY: 'auto' }}> */}
      <Grid container spacing={2}>
        <Grid
          item
          xs={12}
          style={{
            display: 'flex',
            width: '100%',
            justifyContent: 'space-between',
            alignItems: 'center'
          }}
        ></Grid>
        {invoicesDataIsLoading ? (
          <Box sx={{ width: '100%', marginTop: '40px' }}>
            <LinearProgress />
          </Box>
        ) : invoicesDataIsError ? (
          <>
            <h1>{invoicesDataError}</h1>
          </>
        ) : invoicesDataIsSuccess ? (
          <Grid item xs={12}>
            <Paper elevation={10}>
              <DataGrid
                sx={{ height: '89vh', '.MuiDataGrid-footerContainer': { justifyContent: 'flex-start' } }}
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
                rowCount={invoicesData?.totalElements}
                pageSizeOptions={[7, 10, 25, 50]}
                paginationModel={{ page: pageNumber, pageSize }}
                onPaginationModelChange={e => {
                  dispatch(setTableStateAction({ pageSize: e.pageSize, pageNumber: e.page }))
                }}
              />
            </Paper>
          </Grid>
        ) : (
          ''
        )}
      </Grid>
      {/* </Paper> */}
      <Tooltip title='CREATE INVOICE'>
        <Fab
          color='primary'
          aria-label='add'
          // size='small'
          onClick={() => setShowInvoicesForm(true)}
          sx={{
            position: 'absolute',
            bottom: '9px',
            right: '1.1rem',
            height: 37,
            width: 37
          }}
        >
          <Add />
        </Fab>
      </Tooltip>

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

      {/* ---------------- popover for calander  */}

      <Popper
        // Note: The following zIndex style is specifically for documentation purposes and may not be necessary in your application.
        sx={{ zIndex: 1200, width: '45vw', paddingLeft: '10rem' }}
        open={open}
        anchorEl={anchorEl}
        placement={placement}
        transition
      >
        {({ TransitionProps }) => (
          <Fade {...TransitionProps} timeout={350}>
            <Box width={250}>
              <Paper>
                <DatePickerWrapper>
                  <ReactDatePicker
                    className={styles.datePicker}
                    showYearDropdown
                    isClearable
                    selectsRange
                    monthsShown={2}
                    endDate={new Date(toDate)}
                    selected={new Date(fromDate)}
                    startDate={new Date(fromDate)}
                    shouldCloseOnSelect={false}
                    id='date-range-picker-months'
                    onChange={handleOnChangeRange}
                    customInput={
                      <CustomInput
                        dates={dates}
                        setDates={setDates}
                        label='Select Date Range'
                        end={new Date(toDate)}
                        start={new Date(fromDate)}
                      />
                    }
                  />
                </DatePickerWrapper>
              </Paper>
            </Box>
          </Fade>
        )}
      </Popper>
    </>
  )
}

export default CustomTable
