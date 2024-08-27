import { createSlice } from '@reduxjs/toolkit'
import axios from 'axios'
import { toast } from 'react-toastify'
import { createAsyncThunkWithTokenRefresh, createAxiosConfig } from '../common/commonFunctions'

const initialState = {
  fileData: '',
  fileDataIsLoading: false,
  fileDataIsError: false,
  fileDataError: '',
  fileDataIsSuccess: false
}

export const getFileAction = createAsyncThunkWithTokenRefresh(
  'fileUrl/getFileAction',
  async (token, currentUser, payload) => {
    const headers = {
      Authorization: `Bearer ${token}`,
      // 'Content-Type': 'application/json; charset=utf8',
      url: payload.fileUrl
    } // Adjust the value as needed
    const username = localStorage.getItem('username')
    return axios.get(`/call/vendor/Vendorportal/getFileURLObject`, {
      headers,
      responseType: 'arraybuffer'
    })
  }
)

export const fileUrlSlice = createSlice({
  name: 'fileUrl',
  initialState,
  reducers: {
    resetFileAction(state) {
      state.fileData = ''
      state.fileDataIsLoading = false
      state.fileDataIsError = false
      state.fileDataIsError = ''
      state.fileDataIsSuccess = false
    }
  },
  extraReducers(builder) {
    builder
      .addCase(getFileAction.pending, state => {
        state.fileData = ''
        state.fileDataIsLoading = true
        state.fileDataIsError = false
        state.fileDataIsError = ''
        state.fileDataIsSuccess = false
      })
      .addCase(getFileAction.fulfilled, (state, action) => {
        state.fileData = action.payload
        state.fileDataIsLoading = false
        state.fileDataIsError = false
        state.fileDataIsError = ''
        state.fileDataIsSuccess = true
      })
      .addCase(getFileAction.rejected, (state, action) => {
        state.fileData = ''
        state.fileDataIsLoading = false
        state.fileDataIsError = true
        state.fileDataIsError = action.error.message
        state.fileDataIsSuccess = false
      })
  }
})

export const { resetFileAction } = fileUrlSlice.actions
export default fileUrlSlice.reducer
