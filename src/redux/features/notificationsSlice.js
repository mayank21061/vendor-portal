import { createSlice } from '@reduxjs/toolkit'
import axios from 'axios'
import { toast } from 'react-toastify'
import { createAsyncThunkWithTokenRefresh, createAxiosConfig } from '../common/commonFunctions'

const initialState = {
  notificationsData: [],
  notificationsDataIsLoading: false,
  notificationsDataIsError: false,
  notificationsDataError: '',
  notificationsDataIsSuccess: false
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
      state.notificationsData = []
      state.notificationsDataIsLoading = false
      state.notificationsDataIsError = false
      state.notificationsDataIsError = ''
      state.notificationsDataIsSuccess = false
    }
  },
  extraReducers(builder) {
    builder
      .addCase(getFileAction.pending, state => {
        state.notificationsData = []
        state.notificationsDataIsLoading = true
        state.notificationsDataIsError = false
        state.notificationsDataIsError = ''
        state.notificationsDataIsSuccess = false
      })
      .addCase(getFileAction.fulfilled, (state, action) => {
        state.notificationsData = action.payload
        state.notificationsDataIsLoading = false
        state.notificationsDataIsError = false
        state.notificationsDataIsError = ''
        state.notificationsDataIsSuccess = true
      })
      .addCase(getFileAction.rejected, (state, action) => {
        state.notificationsData = []
        state.notificationsDataIsLoading = false
        state.notificationsDataIsError = true
        state.notificationsDataIsError = action.error.message
        state.notificationsDataIsSuccess = false
      })
  }
})

export const { resetFileAction } = fileUrlSlice.actions
export default fileUrlSlice.reducer
