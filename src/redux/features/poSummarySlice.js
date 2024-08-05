import { createSlice } from '@reduxjs/toolkit'
import axios from 'axios'
import { toast } from 'react-toastify'
import { createAsyncThunkWithTokenRefresh, createAxiosConfig } from '../common/commonFunctions'

const initialState = {
  poSummaryData: '',
  poSummaryDataIsLoading: false,
  poSummaryDataIsError: false,
  poSummaryDataError: '',
  poSummaryDataIsSuccess: false,

  uploadPoData: '',
  uploadPoDataIsLoading: false,
  uploadPoDataIsError: false,
  uploadPoDataError: '',
  uploadPoDataIsSuccess: false
}

export const getPoSummaryAction = createAsyncThunkWithTokenRefresh(
  'poSummary/getPoSummaryAction',
  async (token, currentUser, payload) => {
    const username = localStorage.getItem('username')
    const headers = { ...payload, username } // Adjust the value as needed
    return axios.get(
      `/call/vendor/Vendorportal/poSummary/getSummary/?username=${username}`,
      createAxiosConfig(token, currentUser, headers)
    )
  }
)

export const uploadPoAction = createAsyncThunkWithTokenRefresh(
  'poSummary/uploadPoAction',
  async (token, currentUser, payload) => {
    console.log(currentUser)
    const headers = {}
    return axios.post(`/call/vendor/Vendorportal/createPO`, payload, createAxiosConfig(token, currentUser, headers))
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
    },
    resetUploadPoAction(state) {
      state.uploadPoData = ''
      state.uploadPoDataIsLoading = false
      state.uploadPoDataIsError = false
      state.uploadPoDataError = ''
      state.uploadPoDataIsSuccess = false
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
      .addCase(uploadPoAction.pending, state => {
        state.uploadPoData = ''
        state.uploadPoDataIsLoading = true
        state.uploadPoDataIsError = false
        state.uploadPoDataError = ''
        state.uploadPoDataIsSuccess = false
      })
      .addCase(uploadPoAction.fulfilled, (state, action) => {
        state.uploadPoData = action.payload
        state.uploadPoDataIsLoading = false
        state.uploadPoDataIsError = false
        state.uploadPoDataError = ''
        state.uploadPoDataIsSuccess = true
        toast('PO uploaded successfully', { type: 'success' })
      })
      .addCase(uploadPoAction.rejected, (state, action) => {
        state.uploadPoData = ''
        state.uploadPoDataIsLoading = false
        state.uploadPoDataIsError = true
        state.uploadPoDataError = action.error.message
        state.uploadPoDataIsSuccess = false
      })

    //
  }
})

export const { resetGetPoSummaryAction } = poSummarySlice.actions
export default poSummarySlice.reducer
