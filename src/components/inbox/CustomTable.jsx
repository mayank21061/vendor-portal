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
import styles from './inbox.module.css'
import CustomTextField from 'src/@core/components/mui/text-field'
import DatePickerWrapper from 'src/@core/styles/libs/react-datepicker'
import ReactDatePicker from 'react-datepicker'
import format from 'date-fns/format'
import VisibilityIcon from '@mui/icons-material/Visibility'
import { Add, CalendarMonth, Delete, History } from '@mui/icons-material'
import { getInboxAction, getInvoiceHistoryAction } from 'src/redux/features/inboxSlice'
import HistoryPreview from './HistoryPreview'
import FilePreview from './FilePreview'
import { getFileAction, resetFileAction } from 'src/redux/features/fileUrlSlice'
import { setTableStateAction } from 'src/redux/features/tableSlice'
import { ClassNames } from '@emotion/react'
import { rowsMetaStateInitializer } from '@mui/x-data-grid/internals'
import { blue } from '@mui/material/colors'
import dayjs from 'dayjs'

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

  const { inboxDataIsLoading, inboxDataIsError, inboxDataError, inboxDataIsSuccess, forwardRemarksDataIsSuccess } =
    useSelector(state => state.inbox)
  const { pageNumber, pageSize, toDate, fromDate } = useSelector(state => state.table)

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
  const [anchorEl, setAnchorEl] = useState(null)
  const [open, setOpen] = useState(false)
  const [placement, setPlacement] = useState()
  const [checkedRowDetails, setCheckedRowDetails] = useState([])
  const [pdfUrl, setPdfUrl] = useState('')

  const formatDate = dateString => {
    const formattedDate = moment(dateString).format('DD/MM/YYYY h:mm A')

    return formattedDate
  }

  useEffect(() => {
    console.log(checkedRowDetails)
  }, [checkedRowDetails])

  useEffect(() => {
    if (pdfUrl) {
      dispatch(getFileAction({ fileUrl: data?.[0]?.invoiceurl }))
    }
  }, [pdfUrl])

  useEffect(() => {
    if (data?.length) {
      setPdfUrl(data?.[0]?.invoiceurl)
    }
  }, [data])

  useEffect(() => {
    if (forwardRemarksDataIsSuccess) {
      setPreviewFile(false)
    }
  }, [forwardRemarksDataIsSuccess])

  const handleOnChangeRange = dates => {
    const [start, end] = dates
    const startDate = `${new Date(start).getFullYear()}-${new Date(start).getMonth() + 1}-${new Date(start).getDate()}`
    const endDate = `${new Date(end).getFullYear()}-${new Date(end).getMonth() + 1}-${new Date(end).getDate()}`
    const formDate = new Date(start).format('YYYY-MM-DD')
    const toDate = dayjs(end).format('YYYY-MM-DD')
    console.log({ startDate, endDate })
    dispatch(setTableStateAction({ formDate: startDate, toDate: endDate }))
    if (start !== null && end !== null) {
      setDates(dates)
    }
    // setStartDateRange(start)
    // setEndDateRange(end)
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

  const handlePreviewFile = row => {
    // dispatch(resetFileAction())
    // setPdfUrl('')
    setFileUrl(row.invoiceurl)
    dispatch(getFileAction({ fileUrl: row.invoiceurl }))
    dispatch(getInvoiceHistoryAction({ id: row.id, invoiceNumber: row.invoiceNumber }))
    setPreviewFile(true)
  }

  const filters = ['All', 'New', 'Pending', 'Closed']

  const handleClick = newPlacement => event => {
    setAnchorEl(event.currentTarget)
    setOpen(prev => placement !== newPlacement || !prev)
    setPlacement(newPlacement)
  }

  const columns = [
    {
      sortable: false,
      flex: 0.1,
      minWidth: 100,
      field: 'poNumber',
      headerName: 'PO Number ',
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
      sortable: false,
      flex: 0.1,
      field: 'invoiceNumber',
      minWidth: 135,
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
      sortable: false,
      flex: 0.1,
      field: 'invoiceAmount',
      minWidth: 150,
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
      sortable: false,
      flex: 0.1,
      minWidth: 170,
      field: 'date',
      renderHeader: () => (
        <div style={{ display: 'flex', alignItems: 'center' }}>
          <Typography sx={{ textTransform: 'uppercase', marginRight: '4px', fontSize: 14 }}>Recieved On</Typography>
          <IconButton onClick={handleClick('bottom')}>
            <CalendarMonth sx={{ fontSize: 'medium' }} />
          </IconButton>
        </div>
      ),
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
      sortable: false,
      flex: 0.1,
      minWidth: 150,
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
      sortable: false,
      flex: 0.1,
      minWidth: 50,
      field: 'status',
      headerName: 'Status',
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
                disableColumnMenu
                checkboxSelection
                sx={{ height: '89vh', '.MuiDataGrid-footerContainer': { justifyContent: 'flex-start' } }}
                rows={data || []}
                rowHeight={62}
                columnHeaderHeight={40}
                columns={columns}
                disableRowSelectionOnClick
                onRowClick={row => {
                  setPdfUrl(row.row.invoiceurl)
                  // dispatch(getFileAction({ fileUrl: row.row.invoiceurl }))
                }}
                onRowDoubleClick={row => {
                  handlePreviewFile(row.row)
                  setSelectedRow(row.row)
                }}
                onRowSelectionModelChange={newRowSelectionModel => {
                  // console.log(newRowSelectionModel.map(index => data[index].id))
                  setCheckedRowDetails(newRowSelectionModel)
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
                paginationModel={{ page: pageNumber, pageSize }}
                onPaginationModelChange={e =>
                  dispatch(setTableStateAction({ pageSize: e.pageSize, pageNumber: e.page }))
                }
              />
              <Fab
                size='small'
                variant='contained'
                color='primary'
                disabled={checkedRowDetails.length == 0}
                sx={{ position: 'absolute', bottom: 10, right: 20 }}
              >
                <Delete />
              </Fab>
            </Grid>
          ) : (
            ''
          )}
        </Grid>
      </Paper>
      <HistoryPreview open={previewHistory} setOpen={setPreviewHistory} />
      <FilePreview open={previewFile} setOpen={setPreviewFile} rowData={selectedRow} />

      {/* --------------- poper for calnder  */}

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
                    endDate={toDate && new Date(toDate)}
                    selected={fromDate && new Date(fromDate)}
                    startDate={fromDate && new Date(fromDate)}
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
