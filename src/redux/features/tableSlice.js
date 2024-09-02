import { createSlice } from '@reduxjs/toolkit'
import dayjs from 'dayjs'

const today = dayjs()
const todayDate = today.format('YYYY-MM-DD')

const initialState = {
  pageNumber: 0,
  pageSize: 7,
  searchText: '',
  filterType: 'All',
  fromDate: '2024-01-01',
  toDate: todayDate
}

export const tableSlice = createSlice({
  name: 'table',
  initialState,
  reducers: {
    resetTableAction(state) {
      state.pageNumber = 0
      state.pageSize = 7
      state.searchText = ''
      state.filterType = 'All'
      state.fromDate = '2024-01-01'
      state.toDate = todayDate
    },
    setTableStateAction(state, action) {
      if (action.payload.pageNumber) state.pageNumber = action.payload.pageNumber
      if (action.payload.pageSize) state.pageSize = action.payload.pageSize
      if (action.payload.searchText) state.searchText = action.payload.searchText
      if (action.payload.filterType) state.filterType = action.payload.filterType
      if (action.payload.fromDate) state.fromDate = action.payload.fromDate
      if (action.payload.toDate) state.toDate = action.payload.toDate
    }
  }
})

export const { setTableStateAction, resetTableAction } = tableSlice.actions
export default tableSlice.reducer
