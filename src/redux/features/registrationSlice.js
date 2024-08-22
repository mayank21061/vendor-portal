import { createSlice } from '@reduxjs/toolkit'
import axios from 'axios'
import { toast } from 'react-toastify'
import { createAsyncThunkWithTokenRefresh, createAxiosConfig } from '../common/commonFunctions'

const initialState = {
  // registrationData
  registrationData: '',
  registrationDataIsLoading: false,
  registrationDataIsError: false,
  registrationDataError: '',
  registrationDataIsSuccess: false,

  clientVendorData: {},
  clientVendorDataIsLoading: false,
  clientVendorDataIsError: false,
  clientVendorDataError: '',
  clientVendorDataIsSuccess: false,

  updateClientVendorData: {},
  updateClientVendorDataIsLoading: false,
  updateClientVendorDataIsError: false,
  updateClientVendorDataError: '',
  updateClientVendorDataIsSuccess: false
}

export const clientVendorRegisterAction = createAsyncThunkWithTokenRefresh(
  'registeration/registerAction',
  async (token, currentUser, payload) => {
    console.log(payload)
    const headers = { isClient: payload.isClient } // Adjust the value as needed
    const username = localStorage.getItem('username')
    return axios.post(
      `/call/vendor/user/doRegistration`,
      payload.values,
      createAxiosConfig(token, currentUser, headers)
    )
  }
)

export const getClientVendorDataAction = createAsyncThunkWithTokenRefresh(
  'registeration/getDataAction',
  async (token, currentUser, payload) => {
    console.log(payload)
    const headers = { isClient: payload.isClient, pageNumber: payload.page, pageSize: payload.pageSize } // Adjust the value as needed
    const username = localStorage.getItem('username')
    return axios.get(`/call/vendor/user/getAllClientsORvendor`, createAxiosConfig(token, currentUser, headers))
  }
)

export const updateClientVendorDataAction = createAsyncThunkWithTokenRefresh(
  'registeration/updateDataAction',
  async (token, currentUser, payload) => {
    console.log(payload)
    const headers = { isClient: payload.isClient, id: payload.id } // Adjust the value as needed
    const username = localStorage.getItem('username')
    return axios.post(
      `/call/vendor/user/getAllClientsORvendor`,
      payload.values,
      createAxiosConfig(token, currentUser, headers)
    )
  }
)

export const registrationSlice = createSlice({
  name: 'registeration',
  initialState,
  reducers: {
    resetclientVendorAction(state) {
      ;(state.registrationData = ''),
        (state.registrationDataIsLoading = false),
        (state.registrationDataIsError = false),
        (state.registrationDataError = ''),
        (state.registrationDataIsSuccess = false)
    },
    resetGetCleintVendorData(state) {}
  },
  extraReducers(builder) {
    builder

      // registrationData
      .addCase(clientVendorRegisterAction.pending, state => {
        ;(state.registrationData = ''),
          (state.registrationDataIsLoading = true),
          (state.registrationDataIsError = false),
          (state.registrationDataError = ''),
          (state.registrationDataIsSuccess = false)
      })
      .addCase(clientVendorRegisterAction.fulfilled, (state, action) => {
        ;(state.registrationData = action.payload),
          (state.registrationDataIsLoading = false),
          (state.registrationDataIsError = false),
          (state.registrationDataError = ''),
          (state.registrationDataIsSuccess = true)
        toast(action.payload.title, { type: 'success' })
      })
      .addCase(clientVendorRegisterAction.rejected, (state, action) => {
        ;(state.registrationData = ''),
          (state.registrationDataIsLoading = false),
          (state.registrationDataIsError = true),
          (state.registrationDataError = action.error.message),
          (state.registrationDataIsSuccess = false)
        toast(action.error.message, { type: 'error' })
      })

      .addCase(getClientVendorDataAction.pending, state => {
        ;(state.clientVendorData = ''),
          (state.clientVendorDataIsLoading = true),
          (state.clientVendorDataIsError = false),
          (state.clientVendorDataError = ''),
          (state.clientVendorDataIsSuccess = false)
      })
      .addCase(getClientVendorDataAction.fulfilled, (state, action) => {
        ;(state.clientVendorData = action.payload),
          (state.clientVendorDataIsLoading = false),
          (state.clientVendorDataIsError = false),
          (state.clientVendorDataError = ''),
          (state.clientVendorDataIsSuccess = true)
      })
      .addCase(getClientVendorDataAction.rejected, (state, action) => {
        ;(state.clientVendorData = ''),
          (state.clientVendorDataIsLoading = false),
          (state.clientVendorDataIsError = true),
          (state.clientVendorDataError = action.error.message),
          (state.clientVendorDataIsSuccess = false)
        toast(action.error.message, { type: 'error' })
      })

      .addCase(updateClientVendorDataAction.pending, state => {
        ;(state.updateClientVendorData = ''),
          (state.updateClientVendorDataIsLoading = true),
          (state.updateClientVendorDataIsError = false),
          (state.updateClientVendorDataError = ''),
          (state.updateClientVendorDataIsSuccess = false)
      })
      .addCase(updateClientVendorDataAction.fulfilled, (state, action) => {
        ;(state.updateClientVendorData = action.payload),
          (state.updateClientVendorDataIsLoading = false),
          (state.updateClientVendorDataIsError = false),
          (state.updateClientVendorDataError = ''),
          (state.updateClientVendorDataIsSuccess = true)
      })
      .addCase(updateClientVendorDataAction.rejected, (state, action) => {
        ;(state.updateClientVendorData = ''),
          (state.updateClientVendorDataIsLoading = false),
          (state.updateClientVendorDataIsError = true),
          (state.updateClientVendorDataError = action.error.message),
          (state.updateClientVendorDataIsSuccess = false)
        toast(action.error.message, { type: 'error' })
      })

    //
  }
})

export const { resetclientVendorAction } = registrationSlice.actions
export default registrationSlice.reducer
