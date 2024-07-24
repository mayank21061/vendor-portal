import { createSlice } from '@reduxjs/toolkit'
import axios from 'axios'
import { toast } from 'react-toastify'
import { createAsyncThunkWithTokenRefresh, createAxiosConfig } from '../common/commonFunctions'

const initialState = {
  // invoicesData
  invoicesData: '',
  invoicesDataIsLoading: false,
  invoicesDataIsError: false,
  invoicesDataError: '',
  invoicesDataIsSuccess: false,

  //getEicdata
  getEicData: '',
  getEicDataIsLoading: false,
  getEicDataIsError: false,
  getEicDataError: '',
  getEicDataIsSuccess: false,

  //getDeliverydata
  getDeliveryData: '',
  getDeliveryDataIsLoading: false,
  getDeliveryDataIsError: false,
  getDeliveryDataError: '',
  getDeliveryDataIsSuccess: false,

  //getInvoiceUserdata
  getInvoiceUserData: '',
  getInvoiceUserDataIsLoading: false,
  getInvoiceUserDataIsError: false,
  getInvoiceUserDataError: '',
  getInvoiceUserDataIsSuccess: false,

  //getPoNumberdata
  getPoNumberData: '',
  getPoNumberDataIsLoading: false,
  getPoNumberDataIsError: false,
  getPoNumberDataError: '',
  getPoNumberDataIsSuccess: false
}

export const getInvoicesAction = createAsyncThunkWithTokenRefresh(
  'dashboardSlice/getInvoicesAction',
  async (token, currentUser, payload) => {
    const headers = {} // Adjust the value as needed
    const username = JSON.parse(localStorage.getItem('userData')).username
    return axios.get(
      `/call/vendor/uploadInvoice/getDashboard?username=${username}`,
      createAxiosConfig(token, currentUser, headers)
    )
  }
)

export const getEicAction = createAsyncThunkWithTokenRefresh(
  'dashboardSlice/getEicAction',
  async (token, currentUser, payload) => {
    const headers = {} // Adjust the value as needed
    return axios.get(`/call/vendor/uploadInvoice/getAllRoles`, createAxiosConfig(token, currentUser, headers))
  }
)
export const getDeliveryAction = createAsyncThunkWithTokenRefresh(
  'dashboardSlice/getDeliveryAction',
  async (token, currentUser, payload) => {
    const headers = {} // Adjust the value as needed
    return axios.get(`/call/vendor/uploadInvoice/deliveryPlants`, createAxiosConfig(token, currentUser, headers))
  }
)
export const getInvoiceUserAction = createAsyncThunkWithTokenRefresh(
  'dashboardSlice/getInvoiceUserAction',
  async (token, currentUser, poNumber) => {
    const headers = {} // Adjust the value as needed
    return axios.get(
      `/call/vendor/uploadInvoice/get?poNumber=${poNumber}`,
      createAxiosConfig(token, currentUser, headers)
    )
  }
)
export const getPoNumberAction = createAsyncThunkWithTokenRefresh(
  'dashboardSlice/getPoNumberAction',
  async (token, currentUser, { poNumber }) => {
    const headers = {} // Adjust the value as needed
    return axios.get(
      `/call/vendor/uploadInvoice/poSearch?poNumber=${poNumber}`,
      createAxiosConfig(token, currentUser, headers)
    )
  }
)

export const dashboardSlice = createSlice({
  name: 'dashboard',
  initialState,
  reducers: {
    resetGetInvoiceAction(state) {
      ;(state.invoicesData = ''),
        (state.invoicesDataIsLoading = false),
        (state.invoicesDataIsError = false),
        (state.invoicesDataError = ''),
        (state.invoicesDataIsSuccess = false)
    },
    resetGetEicAction(state) {
      ;(state.getEicData = ''),
        (state.getEicDataIsLoading = false),
        (state.getEicDataIsError = false),
        (state.getEicDataError = ''),
        (state.getEicDataIsSuccess = false)
    },
    resetGetDeliveryAction(state) {
      ;(state.getDeliveryData = ''),
        (state.getDeliveryDataIsLoading = false),
        (state.getDeliveryDataIsError = false),
        (state.getDeliveryDataError = ''),
        (state.getDeliveryDataIsSuccess = false)
    },
    resetGetInvoiceUserAction(state) {
      ;(state.getInvoiceUserData = ''),
        (state.getInvoiceUserDataIsLoading = false),
        (state.getInvoiceUserDataIsError = false),
        (state.getInvoiceUserDataError = ''),
        (state.getInvoiceUserDataIsSuccess = false)
    },
    resetGetPoNumberAction(state) {
      ;(state.getInvoiceUserData = ''),
        (state.getInvoiceUserDataIsLoading = false),
        (state.getInvoiceUserDataIsError = false),
        (state.getInvoiceUserDataError = ''),
        (state.getInvoiceUserDataIsSuccess = false)
    }
  },
  extraReducers(builder) {
    builder

      // invoicesData
      .addCase(getInvoicesAction.pending, state => {
        ;(state.invoicesData = ''),
          (state.invoicesDataIsLoading = true),
          (state.invoicesDataIsError = false),
          (state.invoicesDataError = ''),
          (state.invoicesDataIsSuccess = false)
      })
      .addCase(getInvoicesAction.fulfilled, (state, action) => {
        ;(state.invoicesData = action.payload),
          (state.invoicesDataIsLoading = false),
          (state.invoicesDataIsError = false),
          (state.invoicesDataError = ''),
          (state.invoicesDataIsSuccess = true)
      })
      .addCase(getInvoicesAction.rejected, (state, action) => {
        ;(state.invoicesData = ''),
          (state.invoicesDataIsLoading = false),
          (state.invoicesDataIsError = true),
          (state.invoicesDataError = action.error.message),
          (state.invoicesDataIsSuccess = false)
      })

      // getEicData
      .addCase(getEicAction.pending, state => {
        ;(state.getEicData = ''),
          (state.getEicDataIsLoading = true),
          (state.getEicDataIsError = false),
          (state.getEicDataError = ''),
          (state.getEicDataIsSuccess = false)
      })
      .addCase(getEicAction.fulfilled, (state, action) => {
        ;(state.getEicData = action.payload),
          (state.getEicDataIsLoading = false),
          (state.getEicDataIsError = false),
          (state.getEicDataError = ''),
          (state.getEicDataIsSuccess = true)
      })
      .addCase(getEicAction.rejected, (state, action) => {
        ;(state.getEicData = ''),
          (state.getEicDataIsLoading = false),
          (state.getEicDataIsError = true),
          (state.getEicDataError = action.error.message),
          (state.getEicDataIsSuccess = false)
      })

      // getDeliveryData
      .addCase(getDeliveryAction.pending, state => {
        ;(state.getDeliveryData = ''),
          (state.getDeliveryDataIsLoading = true),
          (state.getDeliveryDataIsError = false),
          (state.getDeliveryDataError = ''),
          (state.getDeliveryDataIsSuccess = false)
      })
      .addCase(getDeliveryAction.fulfilled, (state, action) => {
        ;(state.getDeliveryData = action.payload),
          (state.getDeliveryDataIsLoading = false),
          (state.getDeliveryDataIsError = false),
          (state.getDeliveryDataError = ''),
          (state.getDeliveryDataIsSuccess = true)
      })
      .addCase(getDeliveryAction.rejected, (state, action) => {
        ;(state.getDeliveryData = ''),
          (state.getDeliveryDataIsLoading = false),
          (state.getDeliveryDataIsError = true),
          (state.getDeliveryDataError = action.error.message),
          (state.getDeliveryDataIsSuccess = false)
      })

      // getInvoiceUserData
      .addCase(getInvoiceUserAction.pending, state => {
        ;(state.getInvoiceUserData = ''),
          (state.getInvoiceUserDataIsLoading = true),
          (state.getInvoiceUserDataIsError = false),
          (state.getInvoiceUserDataError = ''),
          (state.getInvoiceUserDataIsSuccess = false)
      })
      .addCase(getInvoiceUserAction.fulfilled, (state, action) => {
        ;(state.getInvoiceUserData = action.payload),
          (state.getInvoiceUserDataIsLoading = false),
          (state.getInvoiceUserDataIsError = false),
          (state.getInvoiceUserDataError = ''),
          (state.getInvoiceUserDataIsSuccess = true)
      })
      .addCase(getInvoiceUserAction.rejected, (state, action) => {
        ;(state.getInvoiceUserData = ''),
          (state.getInvoiceUserDataIsLoading = false),
          (state.getInvoiceUserDataIsError = true),
          (state.getInvoiceUserDataError = action.error.message),
          (state.getInvoiceUserDataIsSuccess = false)
      })

      // getPoNumberData
      .addCase(getPoNumberAction.pending, state => {
        ;(state.getPoNumberData = ''),
          (state.getPoNumberDataIsLoading = true),
          (state.getPoNumberDataIsError = false),
          (state.getPoNumberDataError = ''),
          (state.getPoNumberDataIsSuccess = false)
      })
      .addCase(getPoNumberAction.fulfilled, (state, action) => {
        ;(state.getPoNumberData = action.payload),
          (state.getPoNumberDataIsLoading = false),
          (state.getPoNumberDataIsError = false),
          (state.getPoNumberDataError = ''),
          (state.getPoNumberDataIsSuccess = true)
      })
      .addCase(getPoNumberAction.rejected, (state, action) => {
        ;(state.getPoNumberData = ''),
          (state.getPoNumberDataIsLoading = false),
          (state.getPoNumberDataIsError = true),
          (state.getPoNumberDataError = action.error.message),
          (state.getPoNumberDataIsSuccess = false)
      })
  }
})

export const {
  resetGetInvoiceAction,
  resetGetEicAction,
  resetGetDeliveryAction,
  resetGetInvoiceUserAction,
  resetGetPoNumberAction
} = dashboardSlice.actions
export default dashboardSlice.reducer
