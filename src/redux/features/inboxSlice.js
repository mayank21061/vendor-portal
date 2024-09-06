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
  inboxDataIsSuccess: false,

  forwardRemarksData: '',
  forwardRemarksDataIsLoading: false,
  forwardRemarksDataIsError: false,
  forwardRemarksDataError: '',
  forwardRemarksDataIsSuccess: false,

  invoiceHistoryData: '',
  invoiceHistoryDataIsLoading: false,
  invoiceHistoryDataIsError: false,
  invoiceHistoryDataError: '',
  invoiceHistoryDataIsLoading: false
}

export const getInboxAction = createAsyncThunkWithTokenRefresh(
  'inbox/getInboxAction',
  async (token, currentUser, payload) => {
    const headers = { ...payload } // Adjust the value as needed
    const username = localStorage.getItem('username')
    return axios.get(
      `/call/vendor/Vendorportal/InboxData?username=${username}`,
      createAxiosConfig(token, currentUser, headers)
    )
  }
)

export const getInvoiceHistoryAction = createAsyncThunkWithTokenRefresh(
  'inbox/getInvoiceHistoryAction',
  async (token, currentUser, payload) => {
    const headers = { ...payload } // Adjust the value as needed
    const username = localStorage.getItem('username')
    return axios.get(
      `/call/vendor/Vendorportal/Inbox/History/${payload.invoiceNumber}`,
      createAxiosConfig(token, currentUser, headers)
    )
  }
)

export const forwardRemarksAction = createAsyncThunkWithTokenRefresh(
  'inbox/forwardRemarksAction',
  async (token, currentUser, payload) => {
    const username = localStorage.getItem('username')
    const headers = { id: payload.invoiceId, username } // Adjust the value as needed
    return axios.post(
      `/call/vendor/Vendorportal/forwardinvoice`,
      payload.data,
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
    },
    resetForwardRemarksAction(state) {
      ;(state.forwardRemarksData = ''),
        (state.forwardRemarksDataIsLoading = false),
        (state.forwardRemarksDataIsError = false),
        (state.forwardRemarksDataError = ''),
        (state.forwardRemarksDataIsSuccess = false)
    }
  },
  extraReducers(builder) {
    builder
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
      .addCase(forwardRemarksAction.pending, state => {
        ;(state.forwardRemarksData = ''),
          (state.forwardRemarksDataIsLoading = true),
          (state.forwardRemarksDataIsError = false),
          (state.forwardRemarksDataError = ''),
          (state.forwardRemarksDataIsSuccess = false)
      })
      .addCase(forwardRemarksAction.fulfilled, (state, action) => {
        ;(state.forwardRemarksData = action.payload),
          (state.forwardRemarksDataIsLoading = false),
          (state.forwardRemarksDataIsError = false),
          (state.forwardRemarksDataError = ''),
          (state.forwardRemarksDataIsSuccess = true)
      })
      .addCase(forwardRemarksAction.rejected, (state, action) => {
        ;(state.forwardRemarksData = ''),
          (state.forwardRemarksDataIsLoading = false),
          (state.forwardRemarksDataIsError = true),
          (state.forwardRemarksDataError = action.error.message),
          (state.forwardRemarksDataIsSuccess = false)
      })
      .addCase(getInvoiceHistoryAction.pending, state => {
        ;(state.invoiceHistoryData = ''),
          (state.invoiceHistoryDataIsLoading = true),
          (state.invoiceHistoryDataIsError = false),
          (state.invoiceHistoryDataError = ''),
          (state.invoiceHistoryDataIsSuccess = false)
      })
      .addCase(getInvoiceHistoryAction.fulfilled, (state, action) => {
        ;(state.invoiceHistoryData = action.payload),
          (state.invoiceHistoryDataIsLoading = false),
          (state.invoiceHistoryDataIsError = false),
          (state.invoiceHistoryDataError = ''),
          (state.invoiceHistoryDataIsSuccess = true)
      })
      .addCase(getInvoiceHistoryAction.rejected, (state, action) => {
        ;(state.invoiceHistoryData = ''),
          (state.invoiceHistoryDataIsLoading = false),
          (state.invoiceHistoryDataIsError = true),
          (state.invoiceHistoryDataError = action.error.message),
          (state.invoiceHistoryDataIsSuccess = false)
      })
  }
})

export const { resetGetInboxAction, resetForwardRemarksAction } = inboxSlice.actions
export default inboxSlice.reducer
