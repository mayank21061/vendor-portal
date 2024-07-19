import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import axios from 'axios'

const initialState = {
  // login
  loginData: {},
  loginIsLoading: false,
  loginIsError: false,
  loginError: '',
  loginIsSuccess: false,

  // refresh
  refreshData: {},
  refreshIsLoading: false,
  refreshIsError: false,
  refreshError: '',
  refreshIsSuccess: false,

  // check token validity
  checkTokenValidityData: {},
  checkTokenValidityIsLoading: false,
  checkTokenValidityIsError: false,
  checkTokenValidityError: '',
  checkTokenValidityIsSuccess: false
}

export const loginAction = createAsyncThunk('auth/loginAction', async payload => {
  try {
    const response = await axios.post(`/auth/token`, payload, {
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json'

        // isManual: true
      }
    })

    return response.data
  } catch (error) {
    //  console.log('loginAction error', error.response)
    if (error.response && error.response.status === 504) {
      throw new Error('Gateway Timeout')
    } else if (error.response && error.response.status === 404) {
      throw new Error('Resource Not Found')
    } else if (error.response && error.response.data.error) {
      throw new Error(error.response.data.error)
    } else if (error.response && error.response.data.message) {
      throw new Error(error.response.data.message)
    } else {
      throw new Error('There was an error with the internal server. Please contact your site administrator.')
    }
  }
})

export const authRefreshAction = createAsyncThunk('auth/authRefreshAction', async thunkAPI => {
  try {
    const refresh_token = localStorage.getItem('refresh_token')

    const refreshResponse = await axios.post(
      `/auth/refresh-token`,
      {
        refresh_token: refresh_token,
        grant_type: 'refresh_token'
      },
      {
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json'
        }
      }
    )

    if (refreshResponse.data && refreshResponse.data.access_token) {
      // console.log('refreshResponse', refreshResponse)

      localStorage.setItem('token', refreshResponse.data.access_token)
      localStorage.setItem('sessionId', refreshResponse.data.session_state)

      return refreshResponse.data
    } else {
      throw new Error('Your login has expired. Please log in again.')
    }
  } catch (refreshError) {
    if (refreshError.response && refreshError.response.status === 504) {
      throw new Error('Gateway Timeout')
    } else if (refreshError.response && refreshError.response.status === 404) {
      throw new Error('Resource Not Found')
    } else if (refreshError.response && refreshError.response.data.error) {
      throw new Error(refreshError.response.data.error)
    } else if (refreshError.response && refreshError.response.data.message) {
      throw new Error(refreshError.response.data.message)
    } else {
      throw new Error('There was an error with the internal server. Please contact your site administrator.')
    }
  }
})

export const checkTokenValidtyAction = createAsyncThunk('auth/checkTokenValidtyAction', async (payload, thunkAPI) => {
  try {
    const token = localStorage.getItem('token')

    const response = await axios.get(`/user_service/api/version`, {
      headers: {
        Authorization: `Bearer ${token}`
      }
    })

    return response.data
  } catch (error) {
    if (error.response && error.response.status === 504) {
      throw new Error('Gateway Timeout')
    } else if (error.response && error.response.status === 404) {
      throw new Error('Not Found')
    } else if (error.response && error.response.status === 401) {
      try {
        const refreshedTokenAction = await thunkAPI.dispatch(authRefreshAction())

        const refreshedToken = await refreshedTokenAction

        // console.log('checkError', refreshedToken.payload.access_token)

        const retryResponse = await axios.get(`/user_service/api/version`, {
          headers: {
            Authorization: `Bearer ${refreshedToken.payload.access_token}`
          }
        })

        // console.log('refreshedToken', refreshedToken)
        localStorage.setItem('token', refreshedToken.payload.access_token)
        localStorage.setItem('sessionId', refreshedToken.payload.session_state)

        return retryResponse.data
      } catch (refreshError) {
        // console.error('Error dispatching authRefreshAction:', refreshError)
        if (refreshError.response && refreshError.response.status === 504) {
          throw new Error('Gateway Timeout')
        } else if (refreshError.response && refreshError.response.data.error) {
          throw new Error(refreshError.response.data.error)
        } else if (refreshError.response && refreshError.response.data.message) {
          throw new Error(refreshError.response.data.message)
        } else {
          throw new Error('There was an error with the internal server. Please contact your site administrator.')
        }
      }
    }

    // Handle other errors here if needed
    throw new Error(error.response.data.error)
  }
})

export const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    logOut: () => {
      localStorage.clear()
    },
    resetLoginAction(state) {
      // state.loginData = {}
      state.loginIsLoading = false
      state.loginIsError = false
      state.loginError = ''
      state.loginIsSuccess = false
    },
    resetRefreshction(state) {
      // state.refreshData = {}
      state.refreshIsLoading = false
      state.refreshIsError = false
      state.refreshError = ''
      state.refreshIsSuccess = false
    },
    resetCheckTokenValidtyAction(state) {
      // state.checkTokenValidityData = {}
      state.checkTokenValidityIsLoading = false
      state.checkTokenValidityIsError = false
      state.checkTokenValidityError = ''
      state.checkTokenValidityIsSuccess = false
    }
  },
  extraReducers(builder) {
    builder

      // login
      .addCase(loginAction.pending, state => {
        state.loginData = {}
        state.loginIsLoading = true
        state.loginIsError = false
        state.loginError = ''
        state.loginIsSuccess = false
      })
      .addCase(loginAction.fulfilled, (state, action) => {
        // console.log('loginAction Inside fulfilled', action)

        state.loginData = action.payload
        state.loginIsLoading = false
        state.loginIsError = false
        state.loginError = ''
        state.loginIsSuccess = true
      })
      .addCase(loginAction.rejected, (state, action) => {
        // console.log('loginAction Inside error', action)

        state.loginData = {}
        state.loginIsLoading = false
        state.loginIsError = true
        state.loginError = action.error.message
        state.loginIsSuccess = false
      })

      // refresh
      .addCase(authRefreshAction.pending, state => {
        state.refreshData = {}
        state.refreshIsLoading = true
        state.refreshIsError = false
        state.refreshError = ''
        state.refreshIsSuccess = false
      })
      .addCase(authRefreshAction.fulfilled, (state, action) => {
        // console.log("Inside fulfilled", action)

        state.refreshData = action.payload
        state.refreshIsLoading = false
        state.refreshIsError = false
        state.refreshError = ''
        state.refreshIsSuccess = true
      })
      .addCase(authRefreshAction.rejected, (state, action) => {
        // console.log("Inside error", action)
        state.refreshData = {}
        state.refreshIsLoading = false
        state.refreshIsError = true
        state.refreshError = action.error.message
        state.refreshIsSuccess = false
      })

      // check token validity
      .addCase(checkTokenValidtyAction.pending, state => {
        state.checkTokenValidityData = {}
        state.checkTokenValidityIsLoading = true
        state.checkTokenValidityIsError = false
        state.checkTokenValidityError = ''
        state.checkTokenValidityIsSuccess = false
      })
      .addCase(checkTokenValidtyAction.fulfilled, (state, action) => {
        // console.log("Inside fulfilled", action)

        state.checkTokenValidityData = action.payload
        state.checkTokenValidityIsLoading = false
        state.checkTokenValidityIsError = false
        state.checkTokenValidityError = ''
        state.checkTokenValidityIsSuccess = true
      })
      .addCase(checkTokenValidtyAction.rejected, (state, action) => {
        // console.log("Inside error", action)
        state.checkTokenValidityData = {}
        state.checkTokenValidityIsLoading = false
        state.checkTokenValidityIsError = true
        state.checkTokenValidityError = action.error.message
        state.checkTokenValidityIsSuccess = false
      })
  }
})

export const { logOut, resetLoginAction, resetRefreshction, resetCheckTokenValidtyAction } = authSlice.actions

export default authSlice.reducer

// login
export const loginData = state => state.auth.loginData

export const loginIsLoading = state => state.auth.loginIsLoading

export const loginIsError = state => state.auth.loginIsError

export const loginError = state => state.auth.loginError

export const loginIsSuccess = state => state.auth.loginIsSuccess

// refresh
export const refreshData = state => state.auth.refreshData

export const refreshIsLoading = state => state.auth.refreshIsLoading

export const refreshIsError = state => state.auth.refreshIsError

export const refreshError = state => state.auth.refreshError

export const refreshIsSuccess = state => state.auth.refreshIsSuccess
