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
  registrationDataIsSuccess: false
}

export const clientVendorRegisterAction = createAsyncThunkWithTokenRefresh(
  'registeration/registerAction',
  async (token, currentUser, payload) => {
    const headers = {} // Adjust the value as needed
    const username = localStorage.getItem('username')
    return axios.post(`/call/vendor/user/doRegistration`, payload, createAxiosConfig(token, currentUser, headers))
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
    }
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
      })
      .addCase(clientVendorRegisterAction.rejected, (state, action) => {
        ;(state.registrationData = ''),
          (state.registrationDataIsLoading = false),
          (state.registrationDataIsError = true),
          (state.registrationDataError = action.error.message),
          (state.registrationDataIsSuccess = false)
      })

    //
  }
})

export const { resetclientVendorAction } = registrationSlice.actions
export default registrationSlice.reducer
