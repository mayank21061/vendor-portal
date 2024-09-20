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

  //eicdata
  eicData: '',
  eicDataIsLoading: false,
  eicDataIsError: false,
  eicDataError: '',
  eicDataIsSuccess: false,

  //deliverydata
  deliveryData: '',
  deliveryDataIsLoading: false,
  deliveryDataIsError: false,
  deliveryDataError: '',
  deliveryDataIsSuccess: false,

  //invoiceUserdata
  invoiceUserData: '',
  invoiceUserDataIsLoading: false,
  invoiceUserDataIsError: false,
  invoiceUserDataError: '',
  invoiceUserDataIsSuccess: false,

  //poNumberListData
  poNumberListData: [],
  poNumberListDataIsLoading: false,
  poNumberListDataIsError: false,
  poNumberListDataError: '',
  poNumberListDataIsSuccess: false,

  uploadInvoiceData: '',
  uploadInvoiceDataIsLoading: false,
  uploadInvoiceDataIsError: false,
  uploadInvoiceDataError: '',
  uploadInvoiceDataIsSuccess: false,

  poDetailsData: {},
  poDetailsDataIsLoading: false,
  poDetailsDataIsError: false,
  poDetailsDataError: '',
  poDetailsDataIsSuccess: false
}

// export const getInvoicesAction = createAsyncThunkWithTokenRefresh(
//   'dashboardSlice/getInvoicesAction',
//   async (token, currentUser, payload) => {
//     const headers = {} // Adjust the value as needed
//     const username = localStorage.getItem('username')
//     return axios.get(
//       `/call/vendor/uploadInvoice/getDashboard?username=${username}`,
//       createAxiosConfig(token, currentUser, headers)
//     )
//   }
// )

export const getEicAction = createAsyncThunkWithTokenRefresh(
  'dashboard/getEicAction',
  async (token, currentUser, payload) => {
    const headers = {} // Adjust the value as needed
    return axios.get(`/call/vendor/uploadInvoice/getAllRoles`, createAxiosConfig(token, currentUser, headers))
  }
)
export const getDeliveryAction = createAsyncThunkWithTokenRefresh(
  'dashboard/getDeliveryAction',
  async (token, currentUser, payload) => {
    const headers = {} // Adjust the value as needed
    return axios.get(`/call/vendor/uploadInvoice/deliveryPlants`, createAxiosConfig(token, currentUser, headers))
  }
)
// export const getInvoiceUserAction = createAsyncThunkWithTokenRefresh(
//   'dashboard/getInvoiceUserAction',
//   async (token, currentUser, poNumber) => {
//     const headers = {} // Adjust the value as needed
//     return axios.get(
//       `/call/vendor/uploadInvoice/get?poNumber=${poNumber}`,
//       createAxiosConfig(token, currentUser, headers)
//     )
//   }
// )
export const getPoNumberAction = createAsyncThunkWithTokenRefresh(
  'dashboard/getPoNumberAction',
  async (token, currentUser, payload) => {
    const headers = {} // Adjust the value as needed
    return axios.get(
      `/call/vendor/Vendorportal/uploadInvoice/poSearch/?ponumber=${payload.poNumber}`,
      createAxiosConfig(token, currentUser, headers)
    )
  }
)

export const getPoDetailsAction = createAsyncThunkWithTokenRefresh(
  'dashboard/getPoDetailsAction',
  async (token, currentUser, payload) => {
    console.log(payload.poNumber)
    const headers = {} // Adjust the value as needed
    return axios.get(
      `/call/vendor/Vendorportal/GetPo/?poNumber=${payload.poNumber}`,
      createAxiosConfig(token, currentUser, headers)
    )
  }
)

export const uploadInvoiceAction = createAsyncThunkWithTokenRefresh(
  'dashboard/uploadInvoice',
  async (token, currentUser, payload) => {
    const headers = {} // Adjust the value as needed
    return axios.post(
      `/call/vendor/Vendorportal/uploadInvoice`,
      payload,
      createAxiosConfig(token, currentUser, headers)
    )
  }
)

export const getInvoicesAction = createAsyncThunkWithTokenRefresh(
  'dashboard/getInvoiceUserAction',
  async (token, currentUser, payload) => {
    console.log(payload)
    const username = localStorage.getItem('username')
    const headers = { ...payload, username } // Adjust the value as needed
    return axios.get(`/call/vendor/Vendorportal/searchInvoices`, createAxiosConfig(token, currentUser, headers))
  }
)

export const dashboardSlice = createSlice({
  name: 'dashboard',
  initialState,
  reducers: {
    resetGetInvoiceAction(state) {
      state.invoicesData = ''
      state.invoicesDataIsLoading = false
      state.invoicesDataIsError = false
      state.invoicesDataError = ''
      state.invoicesDataIsSuccess = false
    },
    resetGetEicAction(state) {
      state.eicData = ''
      state.eicDataIsLoading = false
      state.eicDataIsError = false
      state.eicDataError = ''
      state.eicDataIsSuccess = false
    },
    resetGetDeliveryAction(state) {
      state.deliveryData = ''
      state.deliveryDataIsLoading = false
      state.deliveryDataIsError = false
      state.deliveryDataError = ''
      state.deliveryDataIsSuccess = false
    },
    resetGetInvoiceUserAction(state) {
      // state.invoiceUserData = ''
      state.invoiceUserDataIsLoading = false
      state.invoiceUserDataIsError = false
      state.invoiceUserDataError = ''
      state.invoiceUserDataIsSuccess = false
    },
    // resetGetPoNumberAction(state) {
    //   state.invoiceUserData = ''
    //   state.invoiceUserDataIsLoading = false
    //   state.invoiceUserDataIsError = false
    //   state.invoiceUserDataError = ''
    //   state.invoiceUserDataIsSuccess = false
    // },
    resetUploadInvoicesAction(state) {
      // state.uploadInvoiceData = ''
      state.uploadInvoiceDataIsLoading = false
      state.uploadInvoiceDataIsError = false
      state.uploadInvoiceDataError = ''
      state.uploadInvoiceDataIsSuccess = false
    },
    resetPoDetailsDataAction(state) {
      // state.poDetailsData = {}
      state.poDetailsDataIsLoading = false
      state.poDetailsDataIsError = false
      state.poDetailsDataError = ''
      state.poDetailsDataIsSuccess = false
    }
  },
  extraReducers(builder) {
    builder
      // invoicesData
      .addCase(getInvoicesAction.pending, state => {
        state.invoicesData = ''
        state.invoicesDataIsLoading = true
        state.invoicesDataIsError = false
        state.invoicesDataError = ''
        state.invoicesDataIsSuccess = false
      })
      .addCase(getInvoicesAction.fulfilled, (state, action) => {
        state.invoicesData = action.payload
        state.invoicesDataIsLoading = false
        state.invoicesDataIsError = false
        state.invoicesDataError = ''
        state.invoicesDataIsSuccess = true
      })
      .addCase(getInvoicesAction.rejected, (state, action) => {
        state.invoicesData = ''
        state.invoicesDataIsLoading = false
        state.invoicesDataIsError = true
        state.invoicesDataError = action.error.message
        state.invoicesDataIsSuccess = false
      })

      // eicData
      .addCase(getEicAction.pending, state => {
        state.eicData = ''
        state.eicDataIsLoading = true
        state.eicDataIsError = false
        state.eicDataError = ''
        state.eicDataIsSuccess = false
      })
      .addCase(getEicAction.fulfilled, (state, action) => {
        state.eicData = action.payload
        state.eicDataIsLoading = false
        state.eicDataIsError = false
        state.eicDataError = ''
        state.eicDataIsSuccess = true
      })
      .addCase(getEicAction.rejected, (state, action) => {
        state.eicData = ''
        state.eicDataIsLoading = false
        state.eicDataIsError = true
        state.eicDataError = action.error.message
        state.eicDataIsSuccess = false
      })

      // deliveryData
      .addCase(getDeliveryAction.pending, state => {
        state.deliveryData = ''
        state.deliveryDataIsLoading = true
        state.deliveryDataIsError = false
        state.deliveryDataError = ''
        state.deliveryDataIsSuccess = false
      })
      .addCase(getDeliveryAction.fulfilled, (state, action) => {
        state.deliveryData = action.payload
        state.deliveryDataIsLoading = false
        state.deliveryDataIsError = false
        state.deliveryDataError = ''
        state.deliveryDataIsSuccess = true
      })
      .addCase(getDeliveryAction.rejected, (state, action) => {
        state.deliveryData = ''
        state.deliveryDataIsLoading = false
        state.deliveryDataIsError = true
        state.deliveryDataError = action.error.message
        state.deliveryDataIsSuccess = false
      })

      // invoiceUserData
      // .addCase(getInvoiceUserAction.pending, state => {
      //   state.invoiceUserData = ''
      //   state.invoiceUserDataIsLoading = true
      //   state.invoiceUserDataIsError = false
      //   state.invoiceUserDataError = ''
      //   state.invoiceUserDataIsSuccess = false
      // })
      // .addCase(getInvoiceUserAction.fulfilled, (state, action) => {
      //   state.invoiceUserData = action.payload
      //   state.invoiceUserDataIsLoading = false
      //   state.invoiceUserDataIsError = false
      //   state.invoiceUserDataError = ''
      //   state.invoiceUserDataIsSuccess = true
      // })
      // .addCase(getInvoiceUserAction.rejected, (state, action) => {
      //   state.invoiceUserData = ''
      //   state.invoiceUserDataIsLoading = false
      //   state.invoiceUserDataIsError = true
      //   state.invoiceUserDataError = action.error.message
      //   state.invoiceUserDataIsSuccess = false
      // })

      // poNumberListData
      .addCase(getPoNumberAction.pending, state => {
        state.poNumberListData = []
        state.poNumberListDataIsLoading = true
        state.poNumberListDataIsError = false
        state.poNumberListDataError = ''
        state.poNumberListDataIsSuccess = false
      })
      .addCase(getPoNumberAction.fulfilled, (state, action) => {
        state.poNumberListData = action.payload
        state.poNumberListDataIsLoading = false
        state.poNumberListDataIsError = false
        state.poNumberListDataError = ''
        state.poNumberListDataIsSuccess = true
      })
      .addCase(getPoNumberAction.rejected, (state, action) => {
        state.poNumberListData = []
        state.poNumberListDataIsLoading = false
        state.poNumberListDataIsError = true
        state.poNumberListDataError = action.error.message
        state.poNumberListDataIsSuccess = false
      })

      .addCase(uploadInvoiceAction.pending, state => {
        state.uploadInvoiceData = ''
        state.uploadInvoiceDataIsLoading = true
        state.uploadInvoiceDataIsError = false
        state.uploadInvoiceDataError = ''
        state.uploadInvoiceDataIsSuccess = false
      })
      .addCase(uploadInvoiceAction.fulfilled, (state, action) => {
        state.uploadInvoiceData = action.payload
        state.uploadInvoiceDataIsLoading = false
        state.uploadInvoiceDataIsError = false
        state.uploadInvoiceDataError = ''
        state.uploadInvoiceDataIsSuccess = true
        toast(action.payload, { type: 'success' })
      })
      .addCase(uploadInvoiceAction.rejected, (state, action) => {
        state.uploadInvoiceData = ''
        state.uploadInvoiceDataIsLoading = false
        state.uploadInvoiceDataIsError = true
        state.uploadInvoiceDataError = action.error.message
        state.uploadInvoiceDataIsSuccess = false
        toast(action.error.message, { type: 'error' })
      })

      .addCase(getPoDetailsAction.pending, state => {
        state.poDetailsData = {}
        state.poDetailsDataIsLoading = true
        state.poDetailsDataIsError = false
        state.poDetailsDataError = ''
        state.poDetailsDataIsSuccess = false
      })
      .addCase(getPoDetailsAction.fulfilled, (state, action) => {
        state.poDetailsData = action.payload
        state.poDetailsDataIsLoading = false
        state.poDetailsDataIsError = false
        state.poDetailsDataError = ''
        state.poDetailsDataIsSuccess = true
      })
      .addCase(getPoDetailsAction.rejected, (state, action) => {
        state.poDetailsData = {}
        state.poDetailsDataIsLoading = false
        state.poDetailsDataIsError = true
        state.poDetailsDataError = action.error.message
        state.poDetailsDataIsSuccess = false
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
