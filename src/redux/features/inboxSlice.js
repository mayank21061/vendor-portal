import { createSlice } from '@reduxjs/toolkit'
import axios from 'axios'
import { toast } from 'react-toastify'
import { createAsyncThunkWithTokenRefresh, createAxiosConfig } from '../common/commonFunctions'

const initialState = {
    // getInboxData
    getInboxData: '',
    getInboxDataIsLoading: false,
    getInboxDataIsError: false,
    getInboxDataError: '',
    getInboxDataIsSuccess: false,
  }

  export const getInboxAction = createAsyncThunkWithTokenRefresh('inboxSlice/getInboxAction', async (token, currentUser, payload) => {
    const headers = {} // Adjust the value as needed
    const username = JSON.parse(localStorage.getItem('userData')).username
    return axios.get(`/call/vendor/uploadInvoice/InboxData?username=${username}`, createAxiosConfig(token, currentUser, headers))
  })

  export const inboxSlice = createSlice({
    name: 'inbox',
    initialState,
    reducers: {
       resetGetInboxAction(state){
        state.getInboxData='',
        state.getInboxDataIsLoading=false,
        state.getInboxDataIsError=false,
        state.getInboxDataError='',
        state.getInboxDataIsSuccess=false
       }
    },
    extraReducers(builder) {
        builder

      // getInboxData
      .addCase(getInboxAction.pending, state => {
        state.getInboxData='',
        state.getInboxDataIsLoading=true,
        state.getInboxDataIsError=false,
        state.getInboxDataError='',
        state.getInboxDataIsSuccess=false
      })
      .addCase(getInboxAction.fulfilled, (state, action) => {
        state.getInboxData= action.payload,
        state.getInboxDataIsLoading=false,
        state.getInboxDataIsError=false,
        state.getInboxDataError='',
        state.getInboxDataIsSuccess=true
      })
      .addCase(getInboxAction.rejected, (state, action) => {
        state.getInboxData='',
        state.getInboxDataIsLoading=false,
        state.getInboxDataIsError=true,
        state.getInboxDataError=action.error.message,
        state.getInboxDataIsSuccess=false
      })

       // 
    }

  })

  export const {resetGetInboxAction} = inboxSlice.actions;
  export default inboxSlice.reducer

