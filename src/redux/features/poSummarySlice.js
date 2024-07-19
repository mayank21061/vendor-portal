import { createSlice } from '@reduxjs/toolkit'
import axios from 'axios'
import { toast } from 'react-toastify'
import { createAsyncThunkWithTokenRefresh, createAxiosConfig } from '../common/commonFunctions'

const initialState = {
    // getPoSummaryData
    getPoSummaryData: '',
    getPoSummaryDataIsLoading: false,
    getPoSummaryDataIsError: false,
    getPoSummaryDataError: '',
    getPoSummaryDataIsSuccess: false,
  }

  export const getPoSummaryAction = createAsyncThunkWithTokenRefresh('poSummarySlice/getPoSummaryAction', async (token, currentUser, payload) => {
    const headers = {} // Adjust the value as needed
    const username = JSON.parse(localStorage.getItem('userData')).username
    return axios.get(`/call/vendor/poSummary/getSummary?username=${username}`, createAxiosConfig(token, currentUser, headers))
  })

  export const poSummarySlice = createSlice({
    name: 'poSummary',
    initialState,
    reducers: {
       resetGetPoSummaryAction(state){
        state.getPoSummaryData='',
        state.getPoSummaryDataIsLoading=false,
        state.getPoSummaryDataIsError=false,
        state.getPoSummaryDataError='',
        state.getPoSummaryDataIsSuccess=false
       }
    },
    extraReducers(builder) {
        builder

      // getPoSummaryData
      .addCase(getPoSummaryAction.pending, state => {
        state.getPoSummaryData='',
        state.getPoSummaryDataIsLoading=true,
        state.getPoSummaryDataIsError=false,
        state.getPoSummaryDataError='',
        state.getPoSummaryDataIsSuccess=false
      })
      .addCase(getPoSummaryAction.fulfilled, (state, action) => {
        state.getPoSummaryData= action.payload,
        state.getPoSummaryDataIsLoading=false,
        state.getPoSummaryDataIsError=false,
        state.getPoSummaryDataError='',
        state.getPoSummaryDataIsSuccess=true
      })
      .addCase(getPoSummaryAction.rejected, (state, action) => {
        state.getPoSummaryData='',
        state.getPoSummaryDataIsLoading=false,
        state.getPoSummaryDataIsError=true,
        state.getPoSummaryDataError=action.error.message,
        state.getPoSummaryDataIsSuccess=false
      })

       // 
    }

  })

  export const {resetGetPoSummaryAction} = poSummarySlice.actions;
  export default poSummarySlice.reducer

