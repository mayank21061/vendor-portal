import React, { forwardRef } from 'react'
import { useState, useEffect } from 'react'
import Box from '@mui/material/Box'
import Typography from '@mui/material/Typography'
import { DataGrid } from '@mui/x-data-grid'
import CloseIcon from '@mui/icons-material/Close'
import LinearProgress from '@mui/material/LinearProgress'
import moment from 'moment'
import {
  Dialog,
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
import styles from './posummary.module.css'
import CustomTextField from 'src/@core/components/mui/text-field'
import DatePickerWrapper from 'src/@core/styles/libs/react-datepicker'
import ReactDatePicker from 'react-datepicker'
import format from 'date-fns/format'
import VisibilityIcon from '@mui/icons-material/Visibility'
import { getPoSummaryAction } from 'src/redux/features/poSummarySlice'
import { Add, Receipt } from '@mui/icons-material'
import PoInvoicesTable from './PoInvoicesTable'
import PoSummaryForm from './PoSummaryForm'

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

  return (
    <CustomTextField
      fullWidth
      inputRef={ref}
      {...updatedProps}
      label={props.label || ''}
      value={value}
      autocomplete='off'
    />
  )
})

const CustomTable = props => {
  const data = useSelector(state => state.poSummary.poSummaryData)

  const {
    poSummaryDataIsLoading,
    poSummaryDataIsError,
    poSummaryDataError,
    poSummaryDataIsSuccess,
    uploadPoDataIsSuccess
  } = useSelector(state => state.poSummary)

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
  const [previewInvoices, setPreviewInvoices] = useState(false)
  const [showPoForm, setShowPoForm] = useState(false)
  const [paginationModel, setPaginationModel] = useState({ page: 0, pageSize: 7 })

  const formatDate = dateString => {
    const formattedDate = moment(dateString).format('DD/MM/YYYY h:mm A')

    return formattedDate
  }

  useEffect(() => {
    const payload = {
      search: value,
      fromDate: moment(startDateRange).format('YYYY-MM-DD'),
      toDate: moment(endDateRange).format('YYYY-MM-DD'),
      filterBy: filterType
    }
    if (startDateRange && endDateRange) dispatch(getPoSummaryAction(payload))
  }, [value, endDateRange, startDateRange, filterType, paginationModel])

  useEffect(() => {
    const payload = {
      search: value,
      fromDate: moment(startDateRange).format('YYYY-MM-DD'),
      toDate: moment(endDateRange).format('YYYY-MM-DD'),
      filterBy: filterType
    }
    if (uploadPoDataIsSuccess) {
      setShowPoForm(false)
      dispatch(getPoSummaryAction(payload))
    }
  }, [uploadPoDataIsSuccess])

  const handleOnChangeRange = dates => {
    const [start, end] = dates
    if (start !== null && end !== null) {
      setDates(dates)
    }
    setStartDateRange(start)
    setEndDateRange(end)
  }

  const handleFilter = val => {
    setValue(val)
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

  const handleViewInvoices = (e, rowData) => {
    setPreviewInvoices(true)
    console.log(rowData)
  }

  const filters = ['All', 'New', 'Pending', 'Closed']

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
      flex: 0.2,
      field: 'description',
      headerName: 'DESCRIPTION',
      renderCell: ({ row }) => (
        <>
          <Typography
            sx={{
              color: 'text.secondary',
              whiteSpace: 'pre-line',
              overflowWrap: 'break-word'
            }}
          >{`${row.description}`}</Typography>
        </>
      ),
      headerClassName: styles.customheader
    },
    {
      flex: 0.15,
      field: 'deliveryDate',
      headerName: 'DELIVERY DATE',
      headerClassName: styles.customheader,
      renderCell: ({ row }) => {
        const { deliveryDate } = row

        return (
          <Box sx={{ display: 'flex', alignItems: 'center' }}>
            <Box sx={{ display: 'flex', flexDirection: 'column' }}>
              <Typography
                noWrap
                sx={{ color: 'text.secondary', fontWeight: 500, whiteSpace: 'pre-line', overflowWrap: 'break-word' }}
              >
                {deliveryDate}
              </Typography>
            </Box>
          </Box>
        )
      }
    },
    {
      flex: 0.15,
      field: 'eic',
      headerName: 'EIC',
      headerClassName: styles.customheader,
      renderCell: ({ row }) => {
        return (
          <Box sx={{ display: 'flex', alignItems: 'center' }}>
            <Box sx={{ display: 'flex', flexDirection: 'column' }}>
              <Typography
                noWrap
                sx={{ color: 'text.secondary', fontWeight: 500, whiteSpace: 'pre-line', overflowWrap: 'break-word' }}
              >
                {row.eic}
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
      sortable: false,
      field: 'actions',
      headerName: '',
      headerAlign: 'center',
      align: 'center',
      headerClassName: styles.customheader,
      renderCell: ({ row }) =>
        hoverdRowId !== null &&
        hoverdRowId === row.id && (
          <>
            <Tooltip title='Preview'>
              <IconButton
                onClick={event => {
                  handleViewPDF(event, row)
                }}
              >
                <VisibilityIcon
                  style={{
                    width: '1.2rem',
                    height: '1.2rem',
                    color: row.priority === 'High' ? '#5F2120' : row.priority === 'Medium' ? '#663C00' : '#014361'
                  }}
                />
              </IconButton>
            </Tooltip>
            <Tooltip title='Invoices'>
              <IconButton
                onClick={event => {
                  handleViewInvoices(event, row)
                }}
              >
                <Receipt
                  style={{
                    width: '1.2rem',
                    height: '1.2rem',
                    color: row.priority === 'High' ? '#5F2120' : row.priority === 'Medium' ? '#663C00' : '#014361'
                  }}
                />
              </IconButton>
            </Tooltip>
          </>
        )
    }
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
              justifyContent: 'flex-end'
            }}
          >
            <div
              style={{
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'end',
                gap: '10px',
                flexWrap: 'wrap',
                marginTop: '.5rem'
              }}
            >
              <div style={{ minWidth: '18vw' }}>
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
              </div>
              <div style={{ minWidth: '20vw' }}>
                <CustomTextField
                  fullWidth
                  value={value}
                  placeholder='Search'
                  onChange={e => handleFilter(e.target.value)}
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
              <Tooltip title='CREATE PO'>
                <Fab color='primary' aria-label='add' size='small' onClick={() => setShowPoForm(true)}>
                  <Add />
                </Fab>
              </Tooltip>
            </div>
          </Grid>
          {poSummaryDataIsLoading ? (
            <Box sx={{ width: '100%', marginTop: '40px' }}>
              <LinearProgress />
            </Box>
          ) : poSummaryDataIsError ? (
            <>
              <h1>{poSummaryDataError}</h1>
            </>
          ) : poSummaryDataIsSuccess ? (
            <Grid item xs={12}>
              <Paper elevation={10}>
                <DataGrid
                  sx={{ height: '70vh' }}
                  rows={data || []}
                  rowHeight={62}
                  columnHeaderHeight={40}
                  columns={columns}
                  disableRowSelectionOnClick
                  onRowSelectionModelChange={newRowSelectionModel => {
                    setCheckedRowDetails(newRowSelectionModel.map(index => data[index]))
                  }}
                  getRowId={row => row.id}
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
          ) : (
            ''
          )}
        </Grid>
      </Paper>
      {/* ---------- view events  detail dialog */}
      <Dialog open={previewPO} onClose={() => setPreviewPO(false)} fullWidth maxWidth='md'>
        <DialogTitle id='customized-dialog-title'>PO Details</DialogTitle>
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
            <CloseIcon />
          </IconButton>
        </Tooltip>

        <DialogContent dividers></DialogContent>
      </Dialog>
      <Dialog open={previewInvoices} onClose={() => setPreviewInvoices(false)} fullWidth maxWidth='sm'>
        <DialogTitle id='customized-dialog-title' variant='h5'>
          Invoices Details
        </DialogTitle>
        <Tooltip title='CLOSE'>
          <IconButton
            aria-label='close'
            onClick={() => setPreviewInvoices(false)}
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
          <PoInvoicesTable />
        </DialogContent>
      </Dialog>
      <PoSummaryForm open={showPoForm} setOpen={setShowPoForm} />
    </>
  )
}

export default CustomTable
