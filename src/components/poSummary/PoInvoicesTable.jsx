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
import { getPoInvoicesAction, getPoSummaryAction } from 'src/redux/features/poSummarySlice'
import { Receipt } from '@mui/icons-material'
import styles from './posummary.module.css'
import { getInvoicesAction } from 'src/redux/features/dashboardSlice'

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

const PoInvoicesTable = ({ poNumber }) => {
  const dispatch = useDispatch()
  const { content } = useSelector(state => state.poSummary.poInvoicesData)
  const { poInvoicesDataIsLoading, poInvoicesDataIsSuccess, poInvoicesDataIsError, poInvoicesDataError } = useSelector(
    state => state.poSummary
  )

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

  useEffect(() => {
    if (poNumber) dispatch(getPoInvoicesAction({ poNumber }))
  }, [poNumber])

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
      <Paper elevation={24} sx={{ height: '75vh', overflowY: 'auto' }}>
        <Grid item xs={12}>
          {poInvoicesDataIsLoading ? (
            <Box sx={{ width: '100%', marginTop: '40px' }}>
              <LinearProgress />
            </Box>
          ) : poInvoicesDataIsError ? (
            <>
              <h1>{poInvoicesDataError}</h1>
            </>
          ) : poInvoicesDataIsSuccess ? (
            <DataGrid
              autoHeight
              rows={content || []}
              rowHeight={62}
              columnHeaderHeight={40}
              columns={columns}
              disableRowSelectionOnClick
              onRowSelectionModelChange={newRowSelectionModel => {
                setCheckedRowDetails(newRowSelectionModel.map(index => content[index]))
              }}
              getRowId={row => row.id}
              componentsProps={{
                row: {
                  onMouseEnter: event => {
                    const id = event.currentTarget.dataset.id
                    const hoveredRow = content || [].find(row => row.id === Number(id))
                    setHoveredId(id)
                  },
                  onMouseLeave: event => {
                    setHoveredId(null)
                  }
                }
              }}
              hideFooter
            />
          ) : (
            ''
          )}
        </Grid>
      </Paper>
    </>
  )
}

export default PoInvoicesTable
