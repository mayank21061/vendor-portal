import { createSlice } from '@reduxjs/toolkit'
import axios from 'axios'
import { toast } from 'react-toastify'
import { createAsyncThunkWithTokenRefresh, createAxiosConfig } from '../common/commonFunctions'

const initialState = {
  // inboxData
  inboxData: '',
  inboxDataIsLoading: false,
  inboxDataIsError: false,
  inboxDataError: '',
  inboxDataIsSuccess: false
}

export const getInboxAction = createAsyncThunkWithTokenRefresh(
  'inbox/getInboxAction',
  async (token, currentUser, payload) => {
    const headers = {} // Adjust the value as needed
    const username = JSON.parse(localStorage.getItem('userData')).username
    return axios.get(
      `/call/vendor/uploadInvoice/InboxData?username=${username}`,
      createAxiosConfig(token, currentUser, headers)
    )
  }
)

export const inboxSlice = createSlice({
  name: 'inbox',
  initialState,
  reducers: {
    resetGetInboxAction(state) {
      ;(state.inboxData = ''),
        (state.inboxDataIsLoading = false),
        (state.inboxDataIsError = false),
        (state.inboxDataError = ''),
        (state.inboxDataIsSuccess = false)
    }
  },
  extraReducers(builder) {
    builder

      // inboxData
      .addCase(getInboxAction.pending, state => {
        ;(state.inboxData = ''),
          (state.inboxDataIsLoading = true),
          (state.inboxDataIsError = false),
          (state.inboxDataError = ''),
          (state.inboxDataIsSuccess = false)
      })
      .addCase(getInboxAction.fulfilled, (state, action) => {
        ;(state.inboxData = action.payload),
          (state.inboxDataIsLoading = false),
          (state.inboxDataIsError = false),
          (state.inboxDataError = ''),
          (state.inboxDataIsSuccess = true)
      })
      .addCase(getInboxAction.rejected, (state, action) => {
        ;(state.inboxData = ''),
          (state.inboxDataIsLoading = false),
          (state.inboxDataIsError = true),
          (state.inboxDataError = action.error.message),
          (state.inboxDataIsSuccess = false)
      })

    //
  }
})

export const { resetGetInboxAction } = inboxSlice.actions
export default inboxSlice.reducer
