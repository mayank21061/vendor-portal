// ** MUI Imports

import {
  Button,
  FormControl,
  InputLabel,
  LinearProgress,
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  MenuItem,
  Select,
  Tooltip,
  Typography
} from '@mui/material'
import Box from '@mui/material/Box'
import IconButton from '@mui/material/IconButton'
import { useRouter } from 'next/router'
// import SettingsIcon from '@mui/icons-material/Settings'
// import NotificationsIcon from '@mui/icons-material/Notifications'
// import InboxIcon from '@mui/icons-material/MoveToInbox'
// import MailIcon from '@mui/icons-material/Mail'
import Drawer from '@mui/material/Drawer'
import Divider from '@mui/material/Divider'

// ** Icon Imports
import Icon from 'src/@core/components/icon'

// ** Components
import UserDropdown from 'src/@core/layouts/components/shared-components/UserDropdown'
import styled from '@emotion/styled'
import React, { useCallback, useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
// import { setCurrentUser } from 'src/redux/features/userSlice'
// import { darkmodefunc } from 'src/redux/features/darkMode'
import NotificationBar from './NotificationBar'
// import { getNotificationsAction } from 'src/redux/features/notificationsSlice'
import dynamic from 'next/dynamic'
import CustomTextField from 'src/@core/components/mui/text-field'
import { borderRadius } from '@mui/system'
import { getPoSummaryAction } from 'src/redux/features/poSummarySlice'
import _debounce from 'lodash/debounce'
import { resetTableAction, setTableStateAction } from 'src/redux/features/tableSlice'
import { getInboxAction } from 'src/redux/features/inboxSlice'
import { getInvoicesAction } from 'src/redux/features/dashboardSlice'
import SockJS from 'sockjs-client'
import { over } from 'stompjs'

// const LatestInfoDropdown = dynamic(() => import('./LatestInfoDropdown'), {
//   loading: () => (
//     <Box sx={{ width: '100%' }}>
//       <LinearProgress />
//     </Box>
//   )
// })

const AppBarContent = props => {
  // ** Props
  const dispatch = useDispatch()
  const { hidden, settings, saveSettings, toggleNavVisibility } = props
  const router = useRouter()
  const [state, setState] = useState(false)
  const [value, setValue] = useState('')
  // const [filterType, setFilterType] = useState('All')
  const currentPath = router.pathname.split('/')[1]
  const { pageNumber, pageSize, searchText, filterType, fromDate, toDate } = useSelector(state => state.table)

  const [stompClient, setStompClient] = useState('')
  const [connected, setConnected] = useState(false)
  const [userId, setUserId] = useState('')

  let userDetails = null

  useEffect(() => {
    if (typeof window !== 'undefined') {
      // Safe to use localStorage
      userDetails = localStorage.getItem('userData')
      // Do something with the item
    }
  }, [])

  useEffect(() => {
    if (userDetails) {
      const userData = JSON.parse(userDetails)
      setUserId(userData?.data?.[0]?.username)
    }
  }, [userDetails])

  useEffect(() => {
    if (stompClient) {
      stompClient.debug = null
      stompClient.connect({}, onConnected, onError)
    } else if (userId) {
      connect()
    }
  }, [stompClient, userId])

  const connect = async () => {
    console.log('connect')
    let Sock = new SockJS('http://socket-test.apps.ocp4.pacosta.com/socket')
    let client = over(Sock)
    setStompClient(client)
  }

  const onConnected = () => {
    console.log(stompClient)
    setConnected(true)
    try {
      stompClient.subscribe(`/user/${userId}/private`, event => console.log('notification', event))
    } catch (e) {
      console.log(e)
    } finally {
      console.log('finally')
    }
    console.log('on connected', stompClient)
  }

  const onError = err => {
    toast(err, { type: 'error' })
  }
  const styles = {
    py: 1.75,
    width: '100%',
    display: 'flex',
    alignItems: 'center',
    color: 'text.primary',
    textDecoration: 'none',
    '& svg': {
      mr: 2.5,
      fontSize: '1.5rem'
      // color: settings.mode === 'dark' ? '' : '#fff'
    }
  }

  const handleModeChange = mode => {
    saveSettings({ ...settings, mode: mode })
  }

  const handleModeToggle = () => {
    if (settings.mode === 'light') {
      handleModeChange('dark')
    } else {
      handleModeChange('light')
    }
  }

  const handleLogout = () => {
    localStorage.clear()
    router.push('/login')
  }

  const [users, setUsers] = useState({})
  const [selectedRole, setSelectedRole] = useState({})

  useEffect(() => {
    setValue('')
    dispatch(resetTableAction())
  }, [currentPath])

  const getDebouncePoSummary = useCallback(
    _debounce(search => {
      dispatch(getPoSummaryAction({ pageNumber, pageSize, search, fromDate, toDate, filterBy: filterType }))
    }, 1000),
    []
  )

  const getDebounceInbox = useCallback(
    _debounce(search => {
      dispatch(getInboxAction({ pageNumber, pageSize, search, fromDate, toDate, filterBy: filterType }))
    }, 1000),
    []
  )

  const getDebouceInvoices = useCallback(
    _debounce(search => {
      dispatch(getInvoicesAction({ pageNumber, pageSize, search, fromDate, toDate, filterBy: filterType }))
    }, 1000),
    []
  )

  useEffect(() => {
    setUsers(localStorage.getItem('username'))
    if (currentPath == 'poSummary') {
      if (value) {
        getDebouncePoSummary(value)
      } else {
        dispatch(getPoSummaryAction({ pageNumber, pageSize, search: value, fromDate, toDate, filterBy: filterType }))
      }
    } else if (currentPath == 'inbox') {
      if (value) {
        getDebounceInbox(value)
      } else {
        dispatch(getInboxAction({ pageNumber, pageSize, search: value, fromDate, toDate, filterBy: filterType }))
      }
    } else if (currentPath == 'invoices') {
      if (value) {
        getDebouceInvoices(value)
      } else {
        console.log(pageNumber, pageSize, value, fromDate, toDate, filterType)
        dispatch(getInvoicesAction({ pageNumber, pageSize, search: value, fromDate, toDate, filterBy: filterType }))
      }
    }
  }, [pageNumber, pageSize, filterType, fromDate, toDate, value, currentPath])

  // useEffect(() => {
  //   setSelectedRole(users?.data?.[0]?.deptRole?.[0])
  //   dispatch(setCurrentUser(users?.data?.[0]?.deptRole?.[0]))
  // }, [users])

  const handleChange = event => {
    // setSelectedRole(event.target.value)
    // dispatch(setCurrentUser(event.target.value))
  }

  const handlenotifaction = () => {
    // console.log("disptach fn")
    // dispatch(getNotificationsAction())
    setState(true)
  }

  const notifactionClose = () => {
    setState(false)
  }

  const handleChangeFilter = e => {
    dispatch(setTableStateAction({ filterType: e.target.value }))
  }

  const filters =
    currentPath === 'invoices'
      ? ['All', 'Submitted', 'With EIC', 'EIC Approved', 'With Finance', 'Finance Approved', 'With Bank', 'Paid']
      : ['All', 'New', 'Pending', 'Closed']

  return (
    <>
      <Box
        sx={{
          width: '100%',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between'
        }}
      >
        <Box className='actions-left' sx={{ mr: 2, display: 'flex', alignItems: 'center' }}>
          {hidden ? (
            <IconButton sx={{ ml: -2.75 }} onClick={toggleNavVisibility}>
              <Icon fontSize='1.5rem' icon='tabler:menu-2' />
            </IconButton>
          ) : null}
        </Box>
        <Typography variant='body1' sx={{ textTransform: 'uppercase', fontWeight: 600 }}>
          {router.pathname.split('/')[1] == 'poSummary'
            ? 'PO SUMMARY'
            : router.pathname.split('/')[1] == 'latestinfo'
            ? ''
            : router.pathname.split('/')[1] == 'geopolitical'
            ? 'Route Analysis'
            : router.pathname.split('/')[1] == 'rtsa'
            ? 'Real Time Situation Analysis'
            : router.pathname.split('/')[1] == 'socialfeeds'
            ? 'Sentiment Analysis of Social Feeds'
            : router.pathname.split('/')[1] == 'osint'
            ? 'Open Source Intelligence'
            : router.pathname.split('/')[1] == 'manualfeed'
            ? 'Manual Feed'
            : router.pathname.split('/')[1] == 'signalint'
            ? 'Events'
            : router.pathname.split('/')[1] == 'documentsummary'
            ? 'Document Summarization'
            : router.pathname.split('/')[1] == 'anomaly-detection-and-forecasting'
            ? 'Anomaly Detection And Forecasting'
            : router.pathname.split('/')[1] == 'anomaly-detection-district'
            ? 'District Wise Anomaly'
            : router.pathname.split('/')[1]}
        </Typography>
        {/* {router.pathname.split('/')[1] == 'latestinfo' && <LatestInfoDropdown />} */}

        <Box
          className='actions-right'
          sx={{ display: 'flex', justifyContent: 'space-between', position: 'absolute', right: '0' }}
        >
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
            {/* <FormControl sx={{ m: 1, borderRadius: '.8rem', color: 'white' }} size='small'>
              <Select
                labelId='demo-select-small-label'
                id='demo-select-small'
                value={selectedRole}
                onChange={handleChange}
                style={{ color: 'white', border: '1px solid white' }}
              >
                {users?.data?.[0]?.deptRole?.map((item, index) => (
                  <MenuItem key={index} value={item}>
                    {item.displayRoleName}
                  </MenuItem>
                ))}
              </Select>
            </FormControl> */}
            {router.pathname.split('/')[1] != 'dashboard' && (
              <div style={{ minWidth: '20vw', marginRight: '1rem' }}>
                <CustomTextField
                  fullWidth
                  value={value}
                  placeholder='Search'
                  onChange={e => setValue(e.target.value)}
                  sx={{ backgroundColor: 'white', borderRadius: '.5rem' }}
                />
              </div>
            )}
            {router.pathname.split('/')[1] != 'dashboard' && (
              <FormControl
                sx={{ borderRadius: '.8rem', width: '10vw', marginRight: '1rem', bgcolor: 'white' }}
                size='small'
              >
                <Select
                  labelId='demo-select-small-label'
                  id='demo-select-small'
                  value={filterType}
                  onChange={handleChangeFilter}
                  sx={{ borderRadius: '.5rem' }}
                >
                  {filters.map((item, index) => (
                    <MenuItem key={index} value={item}>
                      {item}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
            )}
            <div style={{ cursor: 'pointer' }}>
              <Tooltip title='Notification' onClick={handlenotifaction}>
                <Box sx={styles}>
                  <Icon icon='tabler:bell' />
                </Box>
              </Tooltip>
            </div>
            <div style={{ cursor: 'pointer' }}>
              <Tooltip title={settings.mode === 'dark' ? 'Light Mode' : 'Dark Mode'}>
                <Box sx={styles} onClick={handleModeToggle}>
                  <Icon fontSize='1.4rem' icon={settings.mode === 'dark' ? 'tabler:sun' : 'tabler:moon-stars'} />
                </Box>
              </Tooltip>
            </div>
            <div style={{ cursor: 'pointer' }} onClick={handleLogout}>
              <Tooltip title='Logout'>
                <Box sx={styles}>
                  <Icon icon='tabler:logout' fontSize='1.4rem' />
                </Box>
              </Tooltip>
            </div>
            <div>
              <UserDropdown settings={settings} saveSettings={saveSettings} />
            </div>
          </div>
        </Box>
      </Box>
      <div>
        <div>
          <Drawer open={state} anchor='right' onClose={notifactionClose} sx={{ width: '100px' }}>
            <Box sx={{ width: '190px' }}>
              <NotificationBar />
            </Box>
          </Drawer>
        </div>
      </div>
    </>
  )
}

export default AppBarContent
