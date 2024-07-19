import { configureStore } from '@reduxjs/toolkit'
import { setupListeners } from '@reduxjs/toolkit/query'
import authReducer from './features/authSlice'
import userReducer from './features/userSlice'
import demoReducer from './features/demoSlice'
import darkModeReducer from './features/darkMode'
import dashboardReducer from './features/dashboardSlice'
import deliveryReducer from './features/dashboardSlice'
import eicReducer from './features/dashboardSlice'
import invoiceUserReducer from './features/dashboardSlice'
import poSummaryReducer from './features/poSummarySlice'
import inboxReducer from './features/inboxSlice'
import poNumberReducer from './features/dashboardSlice'

export const store = configureStore({
  reducer: {
    auth: authReducer,
    user: userReducer,
    demo: demoReducer,
    darkMode: darkModeReducer,
    dashboard: dashboardReducer,
    poSummary: poSummaryReducer,
    inbox: inboxReducer,
    eic: eicReducer,
    delivery: deliveryReducer,
    invoiceUser: invoiceUserReducer,
    poNumber: poNumberReducer
  },
  middleware: getDefaultMiddleware =>
    getDefaultMiddleware({
      serializableCheck: false
    }),
  devTools: true
})

setupListeners(store.dispatch)
