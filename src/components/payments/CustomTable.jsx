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
import { Add, Close, Receipt } from '@mui/icons-material'
import styles from './invoices.module.css'
import { getInvoicesAction } from 'src/redux/features/dashboardSlice'
import UploadInvoices from './UploadInvoices'
import _debounce from 'lodash/debounce'
import { setTableStateAction } from 'src/redux/features/tableSlice'
import PdfViewer from '../PdfViewer'
import { getFileAction } from 'src/redux/features/fileUrlSlice'

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
  //   if (startDateRange && endDateRange) dispatch(getInvoicesAction(payload))
  // }, [value, endDateRange, startDateRange, filterType])

  const getInvoicesDataDebounce = useCallback(
    _debounce((value, filterType) => {
      dispatch(getInvoicesAction(value, filterType))
    }, 1000),
    []
  )

  const handleOnChangeRange = dates => {
    const [start, end] = dates
    if (start !== null && end !== null) {
      setDates(dates)
    }
    setStartDateRange(start)
    setEndDateRange(end)
  }

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
      headerName: 'DATE',
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
      <Paper elevation={24} sx={{ m: 1 }}>
        <Grid container spacing={0}>
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
                  onRowDoubleClick={params => {
                    dispatch(getFileAction({ fileUrl: params.row.invoiceurl }))
                    setPreviewPO(true)
                  }}
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
      </Paper>
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
      <Dialog open={previewPO} onClose={() => setPreviewPO(false)} fullWidth maxWidth='md'>
        <DialogTitle id='customized-dialog-title'>Details</DialogTitle>
        <Tooltip title='CLOSE'>
          <IconButton
            aria-label='close'
            onClick={() => setPreviewPO(false)}
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

        <DialogContent dividers sx={{ height: '80vh' }}>
          <PdfViewer />
        </DialogContent>
      </Dialog>
      <UploadInvoices open={showInvoicesForm} setOpen={setShowInvoicesForm} />
    </>
  )
}

export default CustomTable
