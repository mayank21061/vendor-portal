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
  Tooltip,
  useTheme
} from '@mui/material'
import CustomAvatar from 'src/@core/components/mui/avatar'
import { getInitials } from 'src/@core/utils/get-initials'
import { useDispatch, useSelector } from 'react-redux'
import styles from './vendors.module.css'
import CustomTextField from 'src/@core/components/mui/text-field'
import DatePickerWrapper from 'src/@core/styles/libs/react-datepicker'
import ReactDatePicker from 'react-datepicker'
import format from 'date-fns/format'
import VisibilityIcon from '@mui/icons-material/Visibility'
import { Add, History } from '@mui/icons-material'
import { getInboxAction } from 'src/redux/features/inboxSlice'
import VendorsForm from './VendorsForm'
import EditVendorsForm from './EditVendorsForm'

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
  const theme = useTheme()

  const getFontColor = () => (theme.palette.mode === 'dark' ? '#fff' : 'text.primary')

  //   const data = useSelector(state => state.inbox.inboxData)
  const data = [
    {
      id: 1,
      checked: false,
      companyName: ' IBM',
      status: 'Confirmed',
      contactName: 'Pratibha',
      email: 'mailto:demo@gmail.com',
      designation: 'CEO',
      phoneNumber: '9412345689',
      industry: 'Software',
      source: 'Linked In',
      country: 'India',
      city: 'Bangalore',
      state: 'Karnataka',
      panNo: 'ASCW23049134',
      gst: '12412413454123412'
    },
    {
      id: 2,
      checked: false,

      companyName: 'Honda',
      due_date: '12/10/24',
      value: '1000000',
      status: 'Refused',
      email: 'mailto:demo@gmail.com',
      contactName: 'Santosh',
      designation: 'AVP',
      phoneNumber: '9412345689',
      industry: 'Automotive',
      source: 'Google',
      country: 'India',
      city: ' New Delhi',
      state: 'Delhi',
      panNo: 'ASCW23049134',
      gst: '12412413454123412'
    },
    {
      id: 3,
      checked: false,

      companyName: 'Airtel',
      due_date: '13/11/24',
      value: '1000000',
      status: 'In Discussion',
      email: 'mailto:atul123@gmail.com',
      contactName: 'Atul ',
      designation: 'Software developer',
      phoneNumber: '9412345689',
      industry: 'TELECOM',
      source: 'Linked In',
      country: 'India',
      city: ' New Delhi',
      state: 'Delhi',
      panNo: 'ASCW23049134',
      gst: '12412413454123412'
    },
    {
      id: 4,
      checked: false,
      companyName: 'Airtel',
      due_date: '13/11/24',
      value: '1000000',
      status: 'New',
      email: 'mailto:atul@gmail.com',
      contactName: 'Atul ',
      designation: 'Software developer',
      phoneNumber: '9412345689',
      industry: 'TELECOM',
      source: 'Linked In',
      country: 'India',
      city: ' New Delhi',
      state: 'Delhi',
      panNo: 'ASCW23049134',
      gst: '12412413454123412'
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
  const [showVendorsForm, setShowVendorsForm] = useState(false)

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
      headerName: 'Company Name ',
      headerAlign: 'left',
      align: 'left',
      headerClassName: styles.customheader,

      renderCell: ({ row }) => (
        <Box sx={{ display: 'flex', flexDirection: 'column' }}>
          <Typography
            noWrap
            variant='body2'
            sx={{
              color: hoverdRowId == row.id ? 'black' : getFontColor(),
              fontWeight: hoverdRowId == row.id ? 700 : 600
            }}
          >
            {row.companyName}
          </Typography>
          <Typography
            noWrap
            variant='caption'
            sx={{
              color: hoverdRowId == row.id ? 'black' : getFontColor(),
              fontWeight: hoverdRowId == row.id ? 700 : 400
            }}
          >
            {`(${row.industry})`}
          </Typography>
        </Box>
      )
    },
    {
      flex: 0.1,
      field: 'invoiceNumber',
      minWidth: 170,
      headerName: 'Contact Person',
      headerAlign: 'left',
      headerClassName: styles.customheader,

      renderCell: ({ row }) => (
        <Box sx={{ display: 'flex', flexDirection: 'column' }}>
          <Typography
            noWrap
            variant='body2'
            sx={{
              color: hoverdRowId == row.id ? 'black' : getFontColor(),
              fontWeight: hoverdRowId == row.id ? 700 : 600
            }}
          >
            {row.contactName}
          </Typography>
          <Typography
            noWrap
            variant='caption'
            sx={{
              color: hoverdRowId == row.id ? 'black' : getFontColor(),
              fontWeight: hoverdRowId == row.id ? 700 : 400
            }}
          >
            {`(${row.designation})`}
          </Typography>
        </Box>
      )
    },
    {
      flex: 0.1,
      minWidth: 150,
      field: 'invoiceAmount',
      headerName: 'Contact Details',
      headerAlign: 'left',
      headerClassName: styles.customheader,

      align: 'left',
      renderCell: ({ row }) => (
        <Box sx={{ display: 'flex', flexDirection: 'column' }}>
          <Typography
            variant='body2'
            sx={{
              color: hoverdRowId == row.id ? 'black' : getFontColor(),
              fontWeight: hoverdRowId == row.id ? 700 : 600
            }}
          >
            {row.phoneNumber}
          </Typography>
          <Typography
            variant='caption'
            sx={{
              color: hoverdRowId == row.id ? 'black' : getFontColor(),
              fontWeight: hoverdRowId == row.id ? 700 : 400
            }}
          >
            {row.email}
          </Typography>
        </Box>
      )
    },
    {
      flex: 0.1,
      minWidth: 150,
      field: 'deliveryPlant',
      headerName: 'Location',
      headerAlign: 'left',
      align: 'left',
      headerClassName: styles.customheader,

      renderCell: ({ row }) => (
        <Box sx={{ display: 'flex', flexDirection: 'column' }}>
          <Typography
            noWrap
            variant='body2'
            sx={{
              color: hoverdRowId == row.id ? 'black' : getFontColor(),
              fontWeight: hoverdRowId == row.id ? 700 : 600
            }}
          >
            {row.state}
          </Typography>
          <Typography
            noWrap
            variant='body2'
            sx={{
              fontSize: '0.7rem',
              color: hoverdRowId == row.id ? 'black' : getFontColor(),
              fontWeight: hoverdRowId == row.id ? 700 : 600
            }}
          >
            {`(${row.city})`}
          </Typography>
        </Box>
      )
    },
    {
      flex: 0.1,
      minWidth: 100,
      field: 'registration',
      headerName: 'Registration',
      headerAlign: 'left',
      align: 'left',
      headerClassName: styles.customheader,

      renderCell: ({ row }) => (
        <Box sx={{ display: 'flex', flexDirection: 'column' }}>
          <Typography
            noWrap
            variant='body2'
            sx={{
              color: hoverdRowId == row.id ? 'black' : getFontColor(),
              fontWeight: hoverdRowId == row.id ? 700 : 600
            }}
          >
            {`GST No. ${row.gst}`}
          </Typography>
          <Typography
            noWrap
            variant='body2'
            sx={{
              fontSize: '0.7rem',
              color: hoverdRowId == row.id ? 'black' : getFontColor(),
              fontWeight: hoverdRowId == row.id ? 700 : 600
            }}
          >
            {`PAN No. ${row.panNo}`}
          </Typography>
        </Box>
      )
    }
    // {
    //   sortable: false,
    //   field: 'actions',
    //   headerName: '',
    //   headerAlign: 'center',
    //   align: 'left',
    //   headerClassName: styles.customheader,
    //   renderCell: ({ row }) =>
    //     hoverdRowId !== null &&
    //     hoverdRowId === row.id && (
    //       <>
    //         <Tooltip title='View Details'>
    //           <IconButton
    //           // onClick={() => {
    //           //   handlePreviewFile(row.id)
    //           // }}
    //           >
    //             <VisibilityIcon
    //               style={{
    //                 width: '1.2rem',
    //                 height: '1.2rem',
    //                 color: '#014361'
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
              <div style={{ minWidth: '20vw' }}>
                <CustomTextField
                  fullWidth
                  value={value}
                  placeholder='Search'
                  onChange={e => handleFilter(e.target.value)}
                  style={{ marginTop: '18px' }}
                />
              </div>

              <Tooltip title='ADD VENDORS'>
                <Fab color='primary' aria-label='add' size='small' onClick={() => setShowVendorsForm(true)}>
                  <Add />
                </Fab>
              </Tooltip>
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
      <VendorsForm open={showVendorsForm} setOpen={setShowVendorsForm} />
      <EditVendorsForm />
    </>
  )
}

export default CustomTable
