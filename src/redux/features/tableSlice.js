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
      state.fromDate = todayDate
      state.toDate = todayDate
    },
    setTableStateAction(state, action) {
      console.log(dayjs(action.payload.toDate).format('YYYY-MM-DD'))
      console.log(dayjs(action.payload.fromDate).format('YYYY/MM/DD'))
      if (action.payload.pageNumber != null) state.pageNumber = action.payload.pageNumber
      if (action.payload.pageSize != null) state.pageSize = action.payload.pageSize
      if (action.payload.searchText != null) state.searchText = action.payload.searchText
      if (action.payload.filterType != null) state.filterType = action.payload.filterType
      if (action.payload.fromDate != null) state.fromDate = dayjs(action.payload.fromDate).format('YYYY-MM-DD') || null
      if (action.payload.toDate != null) state.toDate = dayjs(action.payload.toDate).format('YYYY-MM-DD') || null
    }
  }
})

export const { setTableStateAction, resetTableAction } = tableSlice.actions
export default tableSlice.reducer
