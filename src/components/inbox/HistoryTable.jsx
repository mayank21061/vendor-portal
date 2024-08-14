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

const HistoryTable = props => {
  //   const data = useSelector(state => state.inbox.inboxData)
  const data = [
    {
      id: '1',
      date: '123456',
      invoiceNumber: '789012',
      invoiceAmount: '25000',
      type: 'Pending',
      remarks: 'Delhi'
    },
    {
      id: '2',
      date: '654321',
      invoiceNumber: '345678',
      invoiceAmount: '30000',
      type: 'Completed',
      remarks: 'Mumbai'
    },
    {
      id: '3',
      date: '112233',
      invoiceNumber: '998877',
      invoiceAmount: '15000',
      type: 'In Progress',
      remarks: 'Chennai'
    },
    {
      id: '4',
      date: '445566',
      invoiceNumber: '776655',
      invoiceAmount: '40000',
      type: 'Pending',
      remarks: 'Kolkata'
    },
    {
      id: '5',
      date: '778899',
      invoiceNumber: '223344',
      invoiceAmount: '50000',
      type: 'Completed',
      remarks: 'Bangalore'
    },
    {
      id: '6',
      date: '990011',
      invoiceNumber: '554433',
      invoiceAmount: '35000',
      type: 'In Progress',
      remarks: 'Hyderabad'
    }
  ]

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
      //   minWidth: 130,
      field: 'date',
      headerName: 'Date',
      headerAlign: 'left',
      align: 'left',
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
          <Typography sx={{ color: 'text.secondary', cursor: 'pointer' }}>{row.date}</Typography>
        </div>
      )
    },
    {
      flex: 0.1,
      field: 'type',
      //   minWidth: 170,
      headerName: 'Type',
      headerAlign: 'left',
      align: 'left',
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
              {row.type}
            </Typography>
          </Box>
        </Box>
      )
    },
    {
      flex: 0.1,
      //   minWidth: 150,
      field: 'remarks',
      headerName: 'Remarks',
      headerAlign: 'left',
      align: 'left',
      headerClassName: styles.customheader,

      align: 'center',
      renderCell: ({ row }) => (
        <Tooltip title={row.remarks}>
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
            <Typography sx={{ color: 'text.secondary' }}>{row.remarks}</Typography>
          </div>
        </Tooltip>
      )
    }
  ]

  return (
    <>
      <Paper elevation={24} sx={{ height: '100%', overflowY: 'auto' }}>
        <Grid container spacing={2} sx={{ padding: '0rem 1rem 0.5rem 1rem' }}>
          <Grid
            item
            xs={12}
            style={{
              display: 'flex',
              width: '100%'
            }}
          >
            <h4>History</h4>
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
                sx={{ height: '75vh' }}
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
                hideFooterPagination
                hideFooter
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

export default HistoryTable
