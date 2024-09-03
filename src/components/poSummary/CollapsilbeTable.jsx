import PropTypes from 'prop-types'
import Box from '@mui/material/Box'
import Collapse from '@mui/material/Collapse'
import IconButton from '@mui/material/IconButton'
import Table from '@mui/material/Table'
import TableBody from '@mui/material/TableBody'
import TableCell from '@mui/material/TableCell'
import TableContainer from '@mui/material/TableContainer'
import TableHead from '@mui/material/TableHead'
import TableRow from '@mui/material/TableRow'
import Typography from '@mui/material/Typography'
import Paper from '@mui/material/Paper'
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown'
import KeyboardArrowUpIcon from '@mui/icons-material/KeyboardArrowUp'
import {
  Dialog,
  DialogContent,
  DialogTitle,
  Fade,
  LinearProgress,
  TableFooter,
  TablePagination,
  Tooltip
} from '@mui/material'
import { useDispatch, useSelector } from 'react-redux'
import { getPoSummaryAction } from 'src/redux/features/poSummarySlice'
import { forwardRef, Fragment, useEffect, useState } from 'react'
import styles from './posummary.module.css'
import dayjs from 'dayjs'
import {
  HourglassBottom,
  FiberNew,
  DoDisturb,
  Close,
  Receipt,
  CalendarViewMonth,
  CalendarMonth
} from '@mui/icons-material'
import PdfViewer from '../PdfViewer'
import DatePickerWrapper from 'src/@core/styles/libs/react-datepicker'
import ReactDatePicker from 'react-datepicker'
import CustomTextField from 'src/@core/components/mui/text-field'
import Popper from '@mui/material/Popper'
import { setTableStateAction } from 'src/redux/features/tableSlice'
function Row(props) {
  const { row } = props
  const [open, setOpen] = useState(false)

  const formattedAmount = amount => {
    let amt = amount.split('').reverse()
    let str = ''
    amt.map((item, index) => {
      if (index == 3) {
        str += ','
      } else if (index > 3 && index % 2 != 0) {
        str += ','
      }
      str += item
    })

    return str.split('').reverse().join('')
  }

  return (
    <Fragment>
      <TableRow
        className={styles.tableRow}
        onDoubleClick={e => {
          e.stopPropagation()
          props.previewPO()
        }}
      >
        <TableCell>{row.poNumber}</TableCell>
        <TableCell align='left'>{dayjs(row.poIssueDate).format('DD/MM/YYYY')}</TableCell>
        <TableCell align='left' sx={{ width: '25vw', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>
          {row.description}
        </TableCell>
        <TableCell align='left'>{dayjs(row.deliveryDate).format('DD/MM/YYYY')}</TableCell>
        <TableCell align='left'>{row.eic}</TableCell>
        <TableCell align='center'>
          <Tooltip title={row.poStatus}>
            {row.poStatus == 'Pending' ? (
              <HourglassBottom fontSize='small' />
            ) : row.poStatus == 'New' ? (
              <FiberNew fontSize='small' />
            ) : row.poStatus == 'Closed' ? (
              <DoDisturb fontSize='small' />
            ) : (
              ''
            )}
          </Tooltip>
        </TableCell>
        <TableCell align='left'>{`Rs. ${formattedAmount(row.poAmount)}`}</TableCell>
        <TableCell>
          <IconButton aria-label='expand row' size='small' onClick={() => setOpen(!open)}>
            {open ? (
              <Close />
            ) : (
              <Tooltip title='Invoices'>
                <Receipt />
              </Tooltip>
            )}
          </IconButton>
        </TableCell>
      </TableRow>
      <TableRow>
        <TableCell style={{ paddingBottom: 0, paddingTop: 0 }} colSpan={6}>
          <Collapse in={open} timeout='auto' unmountOnExit>
            <Box sx={{ margin: 1 }}>
              <Typography variant='h6' gutterBottom component='div'>
                Invoices
              </Typography>
              <Table size='small' aria-label='purchases'>
                <TableHead>
                  <TableRow>
                    <TableCell>Date</TableCell>
                    <TableCell>Customer</TableCell>
                    <TableCell align='right'>Amount</TableCell>
                    <TableCell align='right'>Total price ($)</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {row?.history?.map(historyRow => (
                    <TableRow key={historyRow.date}>
                      <TableCell component='th' scope='row'>
                        {historyRow.date}
                      </TableCell>
                      <TableCell>{historyRow.customerId}</TableCell>
                      <TableCell align='right'>{historyRow.amount}</TableCell>
                      <TableCell align='right'>{Math.round(historyRow.amount * row.price * 100) / 100}</TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </Box>
          </Collapse>
        </TableCell>
      </TableRow>
    </Fragment>
  )
}

Row.propTypes = {
  row: PropTypes.shape({
    calories: PropTypes.number.isRequired,
    carbs: PropTypes.number.isRequired,
    fat: PropTypes.number.isRequired,
    history: PropTypes.arrayOf(
      PropTypes.shape({
        amount: PropTypes.number.isRequired,
        customerId: PropTypes.string.isRequired,
        date: PropTypes.string.isRequired
      })
    ).isRequired,
    name: PropTypes.string.isRequired,
    price: PropTypes.number.isRequired,
    protein: PropTypes.number.isRequired
  }).isRequired
}

export default function CollapsibleTable() {
  const [dates, setDates] = useState([])
  const [anchorEl, setAnchorEl] = useState(null)
  const [open, setOpen] = useState(false)
  const [placement, setPlacement] = useState()
  const { pageSize, pageNumber } = useSelector(state => state.table)
  console.log(pageSize, pageNumber)
  const CustomInput = forwardRef((props, ref) => {
    const startDate = props.start !== null ? dayjs(props.start).format('DD/MM/YYYY') : ''
    const endDate = props.end !== null ? ` - ${dayjs(props.end).format('DD/MM/YYYY')}` : null
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

  const handleOnChangeRange = dates => {
    const [start, end] = dates
    if (start !== null && end !== null) {
      setDates(dates)
    }
    dispatch(setTableStateAction({ fromDate: start, toDate: end }))
    // setStartDateRange(start)
    // setEndDateRange(end)
  }

  const dispatch = useDispatch()
  const { content } = useSelector(state => state.poSummary.poSummaryData)
  const [previewPO, setPreviewPO] = useState(false)
  const { toDate, fromDate } = useSelector(state => state.table)

  const {
    poSummaryData,
    poSummaryDataIsLoading,
    poSummaryDataIsError,
    poSummaryDataError,
    poSummaryDataIsSuccess,
    uploadPoDataIsSuccess
  } = useSelector(state => state.poSummary)

  // useEffect(() => {
  //   const payload = {
  //     search: '',
  //     fromDate: `2024-01-01`,
  //     toDate: `2024-09-01`,
  //     filterBy: 'All'
  //   }
  //   dispatch(getPoSummaryAction(payload))
  // }, [])

  const handleClick = newPlacement => event => {
    setAnchorEl(event.currentTarget)
    setOpen(prev => placement !== newPlacement || !prev)
    setPlacement(newPlacement)
  }

  return (
    <>
      {poSummaryDataIsLoading ? (
        <Box sx={{ width: '100%', marginTop: '40px' }}>
          <LinearProgress />
        </Box>
      ) : poSummaryDataIsError ? (
        <>
          <h1>{poSummaryDataError}</h1>
        </>
      ) : poSummaryDataIsSuccess ? (
        <TableContainer component={Paper}>
          <Table aria-label='collapsible table' stickyHeader>
            <TableHead className={styles.tableHeader}>
              <TableRow>
                <TableCell>PO Number</TableCell>
                <TableCell align='left'>
                  {'PO Date'}
                  <IconButton onClick={handleClick('bottom')}>
                    <CalendarMonth />
                  </IconButton>
                </TableCell>
                <Popper
                  // Note: The following zIndex style is specifically for documentation purposes and may not be necessary in your application.
                  sx={{ zIndex: 1200 }}
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

                <TableCell align='left'>Description</TableCell>
                <TableCell align='left'>Delivery Date</TableCell>
                <TableCell align='center'>EIC</TableCell>
                <TableCell align='left'>Status</TableCell>
                <TableCell align='center'>{`Amount`}</TableCell>
                <TableCell />
              </TableRow>
            </TableHead>
            <TableBody>
              {content?.map(row => (
                <Row key={row.id} row={row} previewPO={() => setPreviewPO(true)} />
              ))}
            </TableBody>
            <TableFooter>
              <TableRow>
                <TablePagination
                  rowsPerPageOptions={[7, 10, 15]}
                  colSpan={8}
                  count={content?.length || 0}
                  rowsPerPage={pageSize}
                  page={pageNumber + 1}
                  onPageChange={e => dispatch(setTableStateAction({ pageNumber: e.target.value - 1 }))}
                  onRowsPerPageChange={e => dispatch(setTableStateAction(e.target.value))}
                  //   ActionsComponent={TablePaginationActions}
                />
              </TableRow>
            </TableFooter>
          </Table>
        </TableContainer>
      ) : (
        ''
      )}

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
            <Close />
          </IconButton>
        </Tooltip>

        <DialogContent dividers sx={{ height: '80vh' }}>
          <PdfViewer />
        </DialogContent>
      </Dialog>
    </>
  )
}
