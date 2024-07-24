import { createSlice } from '@reduxjs/toolkit'
import axios from 'axios'
import { toast } from 'react-toastify'
import { createAsyncThunkWithTokenRefresh, createAxiosConfig } from '../common/commonFunctions'

const initialState = {
  poSummaryData: '',
  poSummaryDataIsLoading: false,
  poSummaryDataIsError: false,
  poSummaryDataError: '',
  poSummaryDataIsSuccess: false
}

export const getPoSummaryAction = createAsyncThunkWithTokenRefresh(
  'poSummarySlice/getPoSummaryAction',
  async (token, currentUser, payload) => {
    const headers = {} // Adjust the value as needed
    const username = JSON.parse(localStorage.getItem('userData')).username
    return axios.get(
      `/call/vendor/poSummary/getSummary?username=${username}`,
      createAxiosConfig(token, currentUser, headers)
    )
  }
)

export const poSummarySlice = createSlice({
  name: 'poSummary',
  initialState,
  reducers: {
    resetGetPoSummaryAction(state) {
      state.poSummaryData = ''
      state.poSummaryDataIsLoading = false
      state.poSummaryDataIsError = false
      state.poSummaryDataError = ''
      state.poSummaryDataIsSuccess = false
    }
  },
  extraReducers(builder) {
    builder
      .addCase(getPoSummaryAction.pending, state => {
        state.poSummaryData = ''
        state.poSummaryDataIsLoading = true
        state.poSummaryDataIsError = false
        state.poSummaryDataError = ''
        state.poSummaryDataIsSuccess = false
      })
      .addCase(getPoSummaryAction.fulfilled, (state, action) => {
        state.poSummaryData = action.payload
        state.poSummaryDataIsLoading = false
        state.poSummaryDataIsError = false
        state.poSummaryDataError = ''
        state.poSummaryDataIsSuccess = true
      })
      .addCase(getPoSummaryAction.rejected, (state, action) => {
        state.poSummaryData = ''
        state.poSummaryDataIsLoading = false
        state.poSummaryDataIsError = true
        state.poSummaryDataError = action.error.message
        state.poSummaryDataIsSuccess = false
      })

    //
  }
})

export const { resetGetPoSummaryAction } = poSummarySlice.actions
export default poSummarySlice.reducer
