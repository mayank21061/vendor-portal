import { Box, Card, IconButton, Paper, Tooltip, Typography, Dialog, DialogContent, LinearProgress } from '@mui/material'
import React, { useEffect, useState } from 'react'
import AddIcon from '@mui/icons-material/Add'
import { DataGrid } from '@mui/x-data-grid'
import { getInvoicesAction } from 'src/redux/features/dashboardSlice'
import { useDispatch, useSelector } from 'react-redux'
import UploadInvoices from './UploadInvoices' // Import the UploadInvoice component
import CustomTextField from 'src/@core/components/mui/text-field'

const DashboardTable = () => {
  const dispatch = useDispatch()

  const {
    getInvoicesData,
    getInvoicesDataIsLoading,
    getInvoicesDataIsError,
    getInvoicesDataError,
    getInvoicesDataIsSuccess
  } = useSelector(state => state.dashboard)

  useEffect(() => {
    dispatch(getInvoicesAction())
  }, [dispatch])

  const [hoveredRowId, setHoveredId] = useState(null)
  const [checkedRowsDetails, setCheckedRowDetails] = useState([])
  const [singleRowDetails, setSingleRowDetails] = useState({})
  const [openDialog, setOpenDialog] = useState(false)

  const handleRowClick = (event, id) => {
    event.stopPropagation()
    console.log('checkRowId', id)
  }

  const handleDialogOpen = () => {
    setOpenDialog(true)
  }

  const handleDialogClose = () => {
    setOpenDialog(false)
  }

  const [filteredData, setFilteredData] = useState([])

  useEffect(() => {
    if (getInvoicesData?.invoices) {
      setFilteredData(getInvoicesData.invoices)
    }
  }, [getInvoicesData])

  const [searchValue, setSearchValue] = useState('')

  const filtering = searchedVal => {
    const filtered = getInvoicesData?.invoices.filter(
      item =>
        item.status.toString().toLowerCase().includes(searchedVal.toLowerCase()) ||
        item.deliveryPlant.toString().toLowerCase().includes(searchedVal.toLowerCase()) ||
        item.poNumber.toString().toLowerCase().includes(searchedVal.toLowerCase())
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
      minWidth: 200,
      field: 'deliveryPlant',
      headerName: 'Delivery Plant',
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
            cursor: 'pointer',
            padding: '8px'
            // borderBottom: '1px solid #e0e0e0',
          }}
          onClick={event => {
            handleRowClick(event, row.id)
          }}
        >
          <Typography sx={{ color: 'text.secondary', cursor: 'pointer' }}>{row.deliveryPlant}</Typography>
        </div>
      )
    },
    {
      flex: 0.1,
      field: 'poNumber',
      minWidth: 150,
      headerName: 'PO Number',
      headerAlign: 'left',
      renderCell: ({ row }) => {
        return (
          <Box
            sx={{
              height: '100%',
              width: '100%',
              display: 'flex',
              alignItems: 'center',
              cursor: 'pointer',
              padding: '8px'
              // borderBottom: '1px solid #e0e0e0',
            }}
            onClick={event => {
              handleRowClick(event, row.id)
            }}
          >
            <Typography>{row.poNumber}</Typography>
          </Box>
        )
      }
    },
    {
      flex: 0.1,
      field: 'validityDate',
      minWidth: 150,
      headerName: 'PO Validity',
      headerAlign: 'left',
      renderCell: ({ row }) => {
        return (
          <Box
            sx={{
              height: '100%',
              width: '100%',
              display: 'flex',
              alignItems: 'center',
              cursor: 'pointer',
              padding: '8px'
              // borderBottom: '1px solid #e0e0e0',
            }}
            onClick={event => {
              handleRowClick(event, row.id)
            }}
          >
            <Typography>{row.validityDate}</Typography>
          </Box>
        )
      }
    },
    {
      flex: 0.1,
      field: 'status',
      minWidth: 120,
      headerName: 'PO Status',
      headerAlign: 'left',
      renderCell: ({ row }) => {
        return (
          <Box
            sx={{
              height: '100%',
              width: '100%',
              display: 'flex',
              alignItems: 'center',
              cursor: 'pointer',
              padding: '8px'
              // borderBottom: '1px solid #e0e0e0',
            }}
            onClick={event => {
              handleRowClick(event, row.id)
            }}
          >
            <Typography>{row.status}</Typography>
          </Box>
        )
      }
    }
  ]

  return (
    <Paper>
      <Card style={{ paddingBottom: '50px' }}>
        <Box display='flex' justifyContent='space-between' alignItems='center' p={2}>
          <Typography variant='h6' style={{ fontWeight: 'bold' }}>
            MY INVOICES
          </Typography>
          <CustomTextField value={searchValue} placeholder='Search' onChange={e => handleFilter(e.target.value)} />
          <Tooltip title='Upload Invoice'>
            <IconButton
              onClick={handleDialogOpen}
              sx={{ background: 'linear-gradient(94deg, #a3c6e8 39%, #b0cdef 60%, #c7e4ff 89%)' }}
            >
              <AddIcon />
            </IconButton>
          </Tooltip>
        </Box>
        {getInvoicesDataIsLoading ? (
          <Box sx={{ width: '100%', marginTop: '40px' }}>
            <LinearProgress />
          </Box>
        ) : getInvoicesDataIsError ? (
          <div>{getInvoicesDataError}</div>
        ) : getInvoicesDataIsSuccess && getInvoicesData?.invoices.length === 0 ? (
          <div>No Data Found</div>
        ) : getInvoicesDataIsSuccess ? (
          <div>
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
                  },
                  style: params => ({
                    backgroundColor: hoveredRowId === params.row.id ? '#f5f5f5' : ''
                  })
                }
              }}
              onRowSelectionModelChange={newRowSelectionModel => {
                setCheckedRowDetails(newRowSelectionModel.map(index => getInvoicesData?.invoices[index]))
              }}
              getRowId={row => row.id}
              onRowClick={params => {
                setSingleRowDetails(params.row)
              }}
              hideFooter
            />
          </div>
        ) : (
          ''
        )}
      </Card>
      <Dialog open={openDialog} onClose={handleDialogClose} maxWidth='lg' fullWidth>
        <DialogContent>
          <UploadInvoices onClose={handleDialogClose} />
        </DialogContent>
      </Dialog>
    </Paper>
  )
}

export default DashboardTable
