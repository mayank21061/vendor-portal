import { Box, Card, IconButton, Paper, Tooltip, Typography } from '@mui/material'
import React, { useEffect, useState } from 'react'
import VisibilityIcon from '@mui/icons-material/Visibility'
import { DataGrid } from '@mui/x-data-grid'
import { getPoSummaryAction } from 'src/redux/features/poSummarySlice'
import { useDispatch, useSelector } from 'react-redux'
import LinearProgress from '@mui/material/LinearProgress'
import CustomTextField from 'src/@core/components/mui/text-field'

const PoSummaryCustomTable = () => {
  const dispatch = useDispatch()

  const {
    getPoSummaryData,
    getPoSummaryDataIsLoading,
    getPoSummaryDataIsError,
    getPoSummaryDataError,
    getPoSummaryDataIsSuccess
  } = useSelector(state => state.poSummary)

  useEffect(() => {
    dispatch(getPoSummaryAction())
  }, [])

  const [hoveredRowId, setHoveredId] = useState(null)
  const [checkedRowsDetails, setCheckedRowDetails] = useState([])
  const [singleRowDetails, setSingleRowDetails] = useState({})

  const handleRowClick = (event, id) => {
    event.stopPropagation()
    console.log('checkRowId', id)
    // alert(id);
  }

  const [filteredData, setFilteredData] = useState([])

  useEffect(() => {
    if (getPoSummaryData) {
      setFilteredData(getPoSummaryData)
    }
  }, [getPoSummaryData])

  const [searchValue, setSearchValue] = useState('')

  const filtering = searchedVal => {
    const filtered = getPoSummaryData.filter(
      item =>
        item.poNumber.toString().toLowerCase().includes(searchedVal.toLowerCase()) ||
        item.invoiceNumber.toString().toLowerCase().includes(searchedVal.toLowerCase()) ||
        item.eic.toString().toLowerCase().includes(searchedVal.toLowerCase()) ||
        item.invoiceAmount.toString().toLowerCase().includes(searchedVal.toLowerCase()) ||
        item.type.toString().toLowerCase().includes(searchedVal.toLowerCase()) ||
        item.status.toString().toLowerCase().includes(searchedVal.toLowerCase())
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
      minWidth: 150,
      field: 'poNumber',
      headerName: 'Po Number ',
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
          onClick={event => {
            handleRowClick(event, row.id)
          }}
        >
          <Typography sx={{ color: 'text.secondary', cursor: 'pointer' }}>{row.poNumber}</Typography>
        </div>
      )
    },
    {
      flex: 0.1,
      field: 'invoiceNumber',
      minWidth: 150,
      headerName: 'Invoice Number',
      headerAlign: 'left',
      renderCell: ({ row }) => {
        const { name } = row

        return (
          <Box
            sx={{
              height: '100%',
              width: '100%',
              display: 'flex',
              alignItems: 'center',
              cursor: 'pointer'
            }}
            onClick={event => {
              handleRowClick(event, row.id)
            }}
          >
            <Typography noWrap sx={{ color: 'text.secondary', fontWeight: 500 }}>
              {row.invoiceNumber}
            </Typography>
          </Box>
        )
      }
    },
    {
      flex: 0.1,
      minWidth: 150,
      field: 'eic',
      headerName: 'Eic',
      headerAlign: 'center',
      align: 'center',
      renderCell: ({ row }) => (
        <div
          onClick={event => {
            handleRowClick(event, row.id)
          }}
          style={{
            height: '100%',
            width: '100%',
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            cursor: 'pointer'
          }}
        >
          <Typography sx={{ color: 'text.secondary' }}>{row.eic}</Typography>
        </div>
      )
    },
    {
      flex: 0.1,
      minWidth: 150,
      field: 'invoiceAmount',
      headerName: 'Invoice Amount',
      headerAlign: 'center',
      align: 'center',
      renderCell: ({ row }) => (
        <div
          onClick={event => {
            handleRowClick(event, row.id)
          }}
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
      field: 'type',
      headerName: 'Invoice Type',
      headerAlign: 'center',
      align: 'center',
      renderCell: ({ row }) => (
        <div
          onClick={event => {
            handleRowClick(event, row.id)
          }}
          style={{
            height: '100%',
            width: '100%',
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            cursor: 'pointer'
          }}
        >
          <Typography sx={{ color: 'text.secondary' }}>{row.type}</Typography>
        </div>
      )
    },
    {
      flex: 0.1,
      minWidth: 150,
      field: 'status',
      headerName: 'Status',
      headerAlign: 'center',
      align: 'center',
      renderCell: ({ row }) => (
        <div
          onClick={event => {
            handleRowClick(event, row.id)
          }}
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
    }
  ]

  return (
    <div>
      <Paper>
        <div style={{ display: "flex", justifyContent: "flex-end" }} >
        <CustomTextField value={searchValue} placeholder='Search' onChange={e => handleFilter(e.target.value)} />
        </div>

        <Card style={{ paddingBottom: '50px' }}>
          {getPoSummaryDataIsLoading ? (
            <Box sx={{ width: '100%', marginTop: '40px' }}>
              <LinearProgress />
            </Box>
          ) : getPoSummaryDataIsError ? (
            <div>{getPoSummaryDataError}</div>
          ) : getPoSummaryDataIsSuccess && getPoSummaryData === 0 ? (
            <div>No Data Found</div>
          ) : getPoSummaryDataIsSuccess ? (
            <div>
              {' '}
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
                  setCheckedRowDetails(newRowSelectionModel.map(index => getPoSummaryData))
                }}
                getRowId={row => row.id} // important
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
      </Paper>
    </div>
  )
}

export default PoSummaryCustomTable
