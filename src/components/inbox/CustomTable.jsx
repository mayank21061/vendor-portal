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
import styles from './inbox.module.css'
import CustomTextField from 'src/@core/components/mui/text-field'
import DatePickerWrapper from 'src/@core/styles/libs/react-datepicker'
import ReactDatePicker from 'react-datepicker'
import format from 'date-fns/format'
import VisibilityIcon from '@mui/icons-material/Visibility'
import { Add, History } from '@mui/icons-material'
import { getInboxAction } from 'src/redux/features/inboxSlice'
import HistoryPreview from './HistoryPreview'
import FilePreview from './FilePreview'
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
  const data = useSelector(state => state.inbox.inboxData?.content || [])
  // const data = [
  //   {
  //     id: '1',
  //     poNumber: '123456',
  //     invoiceNumber: '789012',
  //     invoiceAmount: '25000',
  //     status: 'Pending',
  //     deliveryPlant: 'Delhi'
  //   },
  //   {
  //     id: '2',
  //     poNumber: '654321',
  //     invoiceNumber: '345678',
  //     invoiceAmount: '30000',
  //     status: 'Completed',
  //     deliveryPlant: 'Mumbai'
  //   },
  //   {
  //     id: '3',
  //     poNumber: '112233',
  //     invoiceNumber: '998877',
  //     invoiceAmount: '15000',
  //     status: 'In Progress',
  //     deliveryPlant: 'Chennai'
  //   },
  //   {
  //     id: '4',
  //     poNumber: '445566',
  //     invoiceNumber: '776655',
  //     invoiceAmount: '40000',
  //     status: 'Pending',
  //     deliveryPlant: 'Kolkata'
  //   },
  //   {
  //     id: '5',
  //     poNumber: '778899',
  //     invoiceNumber: '223344',
  //     invoiceAmount: '50000',
  //     status: 'Completed',
  //     deliveryPlant: 'Bangalore'
  //   },
  //   {
  //     id: '6',
  //     poNumber: '990011',
  //     invoiceNumber: '554433',
  //     invoiceAmount: '35000',
  //     status: 'In Progress',
  //     deliveryPlant: 'Hyderabad'
  //   }
  // ]

  const { inboxDataIsLoading, inboxDataIsError, inboxDataError, inboxDataIsSuccess } = useSelector(state => state.inbox)

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
  const [previewFile, setPreviewFile] = useState(false)
  const [previewHistory, setPreviewHistory] = useState(false)
  const [selectedRow, setSelectedRow] = useState(null)

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
    if (startDateRange && endDateRange) dispatch(getInboxAction(payload))
  }, [value, endDateRange, startDateRange, filterType, paginationModel])

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

  const handlePreviewHistory = id => {
    console.log(id)
    setPreviewHistory(true)
  }

  const handlePreviewFile = id => {
    console.log(id)

    setPreviewFile(true)
  }

  const filters = ['All', 'New', 'Pending', 'Closed']

  const columns = [
    {
      flex: 0.1,
      minWidth: 130,
      field: 'poNumber',
      headerName: 'PO NUMBER ',
      headerAlign: 'center',
      align: 'center',
      headerClassName: styles.customheader,

      renderCell: ({ row }) => (
        <div
          style={{
            height: '100%',
            width: '100%',
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            cursor: 'pointer'
          }}
        >
          <Typography sx={{ color: 'text.secondary', cursor: 'pointer' }}>{row.poNumber}</Typography>
        </div>
      )
    },
    {
      flex: 0.1,
      field: 'invoiceNumber',
      minWidth: 170,
      headerName: 'Invoice Number',
      headerAlign: 'left',
      headerClassName: styles.customheader,

      renderCell: ({ row }) => (
        <Box
          sx={{
            height: '100%',
            width: '100%',
            display: 'flex',
            alignItems: 'center',
            cursor: 'pointer'
          }}
        >
          <Box sx={{ display: 'flex', flexDirection: 'column' }}>
            <Typography noWrap sx={{ color: 'text.secondary', fontWeight: 500 }}>
              {row.invoiceNumber}
            </Typography>
          </Box>
        </Box>
      )
    },
    {
      flex: 0.1,
      field: 'invoiceAmount',
      minWidth: 170,
      headerName: 'Invoice Amount',
      headerAlign: 'left',
      headerClassName: styles.customheader,

      renderCell: ({ row }) => (
        <Box
          sx={{
            height: '100%',
            width: '100%',
            display: 'flex',
            alignItems: 'center',
            cursor: 'pointer'
          }}
        >
          <Box sx={{ display: 'flex', flexDirection: 'column' }}>
            <Typography noWrap sx={{ color: 'text.secondary', fontWeight: 500 }}>
              {row.invoiceAmount}
            </Typography>
          </Box>
        </Box>
      )
    },
    {
      flex: 0.1,
      minWidth: 150,
      field: 'date',
      headerName: 'Invoice DATE',
      headerAlign: 'center',
      headerClassName: styles.customheader,

      align: 'center',
      renderCell: ({ row }) => (
        <div
          style={{
            height: '100%',
            width: '100%',
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            cursor: 'pointer'
          }}
        >
          <Typography sx={{ color: 'text.secondary' }}>{row.invoiceDate}</Typography>
        </div>
      )
    },
    {
      flex: 0.1,
      minWidth: 50,
      field: 'status',
      headerName: 'status',
      headerAlign: 'center',
      align: 'center',
      headerClassName: styles.customheader,

      renderCell: ({ row }) => (
        <div
          style={{
            height: '100%',
            width: '100%',
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            cursor: 'pointer'
          }}
        >
          <Typography sx={{ color: 'text.secondary' }}>{row.status}</Typography>
        </div>
      )
    },
    {
      flex: 0.1,
      minWidth: 50,
      field: 'referenceNo',
      headerName: 'EIC ',
      headerAlign: 'center',
      align: 'center',
      headerClassName: styles.customheader,

      renderCell: ({ row }) => (
        <div
          style={{
            height: '100%',
            width: '100%',
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            cursor: 'pointer'
          }}
        >
          <Typography sx={{ color: 'text.secondary', cursor: 'pointer' }}>{row.eic}</Typography>
        </div>
      )
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
            <Tooltip title='View Details'>
              <IconButton
                onClick={() => {
                  handlePreviewFile(row.id)
                  dispatch(getFileAction({ fileUrl: row.invoiceurl }))
                }}
              >
                <VisibilityIcon
                  style={{
                    width: '1.2rem',
                    height: '1.2rem',
                    color: '#014361'
                  }}
                />
              </IconButton>
            </Tooltip>
            {/* <Tooltip title='History'>
              <IconButton
                onClick={() => {
                  handlePreviewHistory(row.id)
                }}
              >
                <History
                  style={{
                    width: '1.2rem',
                    height: '1.2rem',
                    color: '#014361'
                  }}
                />
              </IconButton>
            </Tooltip> */}
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
            </div>
          </Grid>
          {/* {inboxDataIsLoading ? (
            <Box sx={{ width: '100%', marginTop: '40px' }}>
              <LinearProgress />
            </Box>
          ) : inboxDataIsError ? (
            <>
              <h1>{inboxDataError}</h1>
            </>
          ) : inboxDataIsSuccess ? (
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
          )} */}
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
        </Grid>
      </Paper>
      <HistoryPreview open={previewHistory} setOpen={setPreviewHistory} />
      <FilePreview open={previewFile} setOpen={setPreviewFile} />
    </>
  )
}

export default CustomTable
