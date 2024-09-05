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
import { ClassNames } from '@emotion/react'

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

  const theme = useTheme()

  const getFontColor = () => (theme.palette.mode === 'dark' ? '#fff' : 'text.primary')

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
    // if (startDateRange && endDateRange) dispatch(getInboxAction(payload))
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
    dispatch(getFileAction({ fileUrl: id.invoiceurl }))
    setPreviewFile(true)
  }

  console.log(hoverdRowId)

  const filters = ['All', 'New', 'Pending', 'Closed']

  const columns = [
    {
      flex: 0.1,
      minWidth: 130,
      field: 'poNumber',
      headerName: 'PO NUMBER ',
      headerAlign: 'center',
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
          <Typography
            sx={{
              color: hoverdRowId == row.id ? 'black' : getFontColor(),
              fontWeight: hoverdRowId == row.id ? 600 : 500
            }}
          >
            {row.poNumber}
          </Typography>
        </div>
      )
    },
    {
      flex: 0.1,
      field: 'invoiceNumber',
      minWidth: 170,
      headerName: 'Invoice Number',
      headerAlign: 'left',

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
            <Typography
              noWrap
              sx={{
                color: hoverdRowId == row.id ? 'black' : getFontColor(),
                fontWeight: hoverdRowId == row.id ? 600 : 500
              }}
            >
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
            <Typography
              noWrap
              sx={{
                color: hoverdRowId == row.id ? 'black' : getFontColor(),
                fontWeight: hoverdRowId == row.id ? 600 : 500
              }}
            >
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
      headerName: 'Recieved On',
      headerAlign: 'center',

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
          <Typography
            sx={{
              color: hoverdRowId == row.id ? 'black' : getFontColor(),
              fontWeight: hoverdRowId == row.id ? 600 : 500
            }}
          >
            {row.invoiceDate}
          </Typography>
        </div>
      )
    },
    {
      flex: 0.1,
      minWidth: 50,
      field: 'referenceNo',
      headerName: 'Recieved From ',
      headerAlign: 'center',
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
          <Typography
            sx={{
              color: hoverdRowId == row.id ? 'black' : getFontColor(),
              fontWeight: hoverdRowId == row.id ? 600 : 500
            }}
          >
            {row.eic}
          </Typography>
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
          <Typography
            sx={{
              color: hoverdRowId == row.id ? 'black' : getFontColor(),
              fontWeight: hoverdRowId == row.id ? 600 : 500
            }}
          >
            {row.status}
          </Typography>
        </div>
      )
    }
  ]

  return (
    <>
      <Paper elevation={24} sx={{ height: '89vh', overflowY: 'auto' }}>
        <Grid container spacing={2}>
          {inboxDataIsLoading ? (
            <Box sx={{ width: '100%', marginTop: '40px' }}>
              <LinearProgress />
            </Box>
          ) : inboxDataIsError ? (
            <>
              <h1>{inboxDataError}</h1>
            </>
          ) : inboxDataIsSuccess ? (
            <Grid item xs={12}>
              <DataGrid
                sx={{ height: '89vh', '.MuiDataGrid-footerContainer': { justifyContent: 'flex-start' } }}
                rows={data || []}
                rowHeight={62}
                columnHeaderHeight={40}
                columns={columns}
                disableRowSelectionOnClick
                onRowDoubleClick={row => {
                  handlePreviewFile(row.row)
                  setSelectedRow(row.row)
                }}
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
            </Grid>
          ) : (
            ''
          )}
        </Grid>
      </Paper>
      <HistoryPreview open={previewHistory} setOpen={setPreviewHistory} />
      <FilePreview open={previewFile} setOpen={setPreviewFile} rowData={selectedRow} />
    </>
  )
}

export default CustomTable
