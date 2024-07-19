import React, { useEffect, useState } from 'react'
import { Box, Card, IconButton, Paper, Tooltip, Typography, Grid, Divider, Slide, LinearProgress } from '@mui/material'
import { DataGrid } from '@mui/x-data-grid'
import { useDispatch, useSelector } from 'react-redux'
import { getInboxAction } from 'src/redux/features/inboxSlice'
import SendIcon from '@mui/icons-material/Send'
import ForwardDialog from './ForwardDialog'
import CustomTextField from 'src/@core/components/mui/text-field'

const InboxTable = () => {
  const dispatch = useDispatch()

  const { getInboxData, getInboxDataIsLoading, getInboxDataIsError, getInboxDataError, getInboxDataIsSuccess } =
    useSelector(state => state.inbox)

  useEffect(() => {
    dispatch(getInboxAction())
  }, [dispatch])

  const [hoveredRowId, setHoveredId] = useState(null)
  const [checkedRowsDetails, setCheckedRowDetails] = useState([])
  const [selectedRow, setSelectedRow] = useState(null)
  const [openForwardDialog, setOpenForwardDialog] = useState(false)
  const [rowSelected, setRowSelected] = useState(false)

  const handleRowClick = params => {
    setSelectedRow(params?.row)
    setRowSelected(true)
  }

  const handleSendClick = () => {
    setOpenForwardDialog(true)
  }

  const handleDialogClose = () => {
    setOpenForwardDialog(false)
  }

  const [filteredData, setFilteredData] = useState([])

  useEffect(() => {
    if (getInboxData) {
      setFilteredData(getInboxData)
    }
  }, [getInboxData])

  const [searchValue, setSearchValue] = useState('')

  const filtering = searchedVal => {
    const filtered = getInboxData.filter(
      item =>
        item.poNumber.toString().toLowerCase().includes(searchedVal.toLowerCase()) ||
        item.invoiceNumber.toString().toLowerCase().includes(searchedVal.toLowerCase()) ||
        item.invoiceAmount.toString().toLowerCase().includes(searchedVal.toLowerCase()) ||
        item.status.toString().toLowerCase().includes(searchedVal.toLowerCase()) ||
        item.deliveryPlant.toString().toLowerCase().includes(searchedVal.toLowerCase())
    )
    setFilteredData(filtered)
  }

  const handleFilter = val => {
    setSearchValue(val)
    filtering(val)
  }


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
          <Typography sx={{ color: 'text.secondary', cursor: 'pointer' }}>{row.poNumber}</Typography>
        </div>
      )
    },
    {
      flex: 0.1,
      field: 'invoiceNumber',
      minWidth: 170,
      headerName: 'invoice Number',
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
            <Typography noWrap sx={{ color: 'text.secondary', fontWeight: 500 }}>
              {row.invoiceNumber}
            </Typography>
          </Box>
        </Box>
      )
    },
    {
      flex: 0.1,
      minWidth: 150,
      field: 'invoiceAmount',
      headerName: 'invoice Amount',
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
          <Typography sx={{ color: 'text.secondary' }}>{row.invoiceAmount}</Typography>
        </div>
      )
    },
    {
      flex: 0.1,
      minWidth: 150,
      field: 'deliveryPlant',
      headerName: 'delivery Plant',
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
          <Typography sx={{ color: 'text.secondary' }}>{row.deliveryPlant}</Typography>
        </div>
      )
    },
    {
      flex: 0.1,
      minWidth: 100,
      field: 'status',
      headerName: 'status',
      headerAlign: 'left',
      align: 'right',
      renderCell: ({ row }) => (
        <div
          style={{
            height: '100%',
            width: '100%',
            display: 'flex',
            justifyContent: 'left',
            alignItems: 'center',
            cursor: 'pointer'
          }}
        >
          <Typography sx={{ color: 'text.secondary' }}>{row.status}</Typography>
        </div>
      )
    }
  ]

  return (
    <Grid container spacing={6}>
      <Grid item xs={rowSelected ? 8 : 12}>
        <Paper elevation={3} sx={{ padding: 2, display: 'flex', flexDirection: 'column', height: '100%' }}>
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }} >
          <Typography variant='h4' sx={{ fontWeight: 'bold', marginBottom: 2 }}>
            Inbox
          </Typography>
          <CustomTextField value={searchValue} placeholder='Search' onChange={e => handleFilter(e.target.value)} />
          </div>
          <Paper elevation={3} sx={{ padding: 2 }}>
            <Card style={{ paddingBottom: '50px' }}>
              {getInboxDataIsLoading ? (
                <Box sx={{ width: '100%', marginTop: '40px' }}>
                  <LinearProgress />
                </Box>
              ) : getInboxDataIsError ? (
                <div>{getInboxDataError}</div>
              ) : getInboxDataIsSuccess && getInboxData.length === 0 ? (
                <div>No Data Found</div>
              ) : getInboxDataIsSuccess ? (
                <DataGrid
                  autoHeight
                  rows={filteredData || []}
                  rowHeight={50}
                  columnHeaderHeight={40}
                  columns={columns}
                  disableRowSelectionOnClick
                  componentsProps={{
                    row: {
                      onMouseEnter: event => {
                        const id = event.currentTarget.dataset.id
                        setHoveredId(id)
                      },
                      onMouseLeave: () => {
                        setHoveredId(null)
                      }
                    }
                  }}
                  onRowSelectionModelChange={newRowSelectionModel => {
                    setCheckedRowDetails(newRowSelectionModel.map(index => getInboxData))
                  }}
                  onRowClick={params => handleRowClick(params)}
                  getRowId={row => row.id}
                  hideFooter
                />
              ) : (
                ''
              )}
            </Card>
          </Paper>
        </Paper>
      </Grid>
      {rowSelected && (
        <Slide direction='left' in={rowSelected} mountOnEnter unmountOnExit>
          <Grid item xs={4}>
            <Paper elevation={3} sx={{ padding: 2, display: 'flex', flexDirection: 'column', height: '100%' }}>
              <Typography variant='h2' sx={{ fontWeight: 'bold', marginBottom: 2 }}>
                Remarks
              </Typography>
              <Divider sx={{ marginBottom: 2 }} />
              {selectedRow?.remarks?.length > 0 ? (
                <div style={{ maxHeight: '300px', overflowY: 'auto' }}>
                  {selectedRow.remarks.map((remark, index) => (
                    <div key={index} style={{ marginBottom: '10px', maxWidth: '80%', wordWrap: 'break-word' }}>
                      <span
                        style={{
                          background: `linear-gradient(94deg, #065188 39%, #154f97 60%, #0071c4 89%)`,
                          color: '#ffffff',
                          padding: '8px',
                          borderRadius: '8px',
                          display: 'inline-block'
                        }}
                      >
                        {remark}
                      </span>
                    </div>
                  ))}
                </div>
              ) : (
                <Typography>No Remarks Available</Typography>
              )}
              <Divider />
              <Box sx={{ flexGrow: 1 }} />
              <Box sx={{ display: 'flex', justifyContent: 'flex-end', marginTop: 2 }}>
                <Tooltip title='Forward Invoice'>
                  <IconButton color='primary' onClick={handleSendClick}>
                    <SendIcon />
                  </IconButton>
                </Tooltip>
              </Box>
            </Paper>
          </Grid>
        </Slide>
      )}
      <ForwardDialog open={openForwardDialog} onClose={handleDialogClose} id={selectedRow?.id} />
    </Grid>
  )
}

export default InboxTable
