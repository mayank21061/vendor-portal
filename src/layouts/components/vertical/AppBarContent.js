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
import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
// import { setCurrentUser } from 'src/redux/features/userSlice'
// import { darkmodefunc } from 'src/redux/features/darkMode'
// import NotificationBar from './Notifaction'
// import { getNotificationsAction } from 'src/redux/features/notificationsSlice'
import dynamic from 'next/dynamic'

// const LatestInfoDropdown = dynamic(() => import('./LatestInfoDropdown'), {
//   loading: () => (
//     <Box sx={{ width: '100%' }}>
//       <LinearProgress />
//     </Box>
//   )
// })

const AppBarContent = props => {
  // ** Props
  // const dispatch = useDispatch()
  const { hidden, settings, saveSettings, toggleNavVisibility } = props
  const router = useRouter()
  const [state, setState] = useState(false)

  const styles = {
    py: 1.75,
    width: '100%',
    display: 'flex',
    alignItems: 'center',
    color: 'text.primary',
    textDecoration: 'none',
    '& svg': {
      mr: 2.5,
      fontSize: '1.5rem',
      color: settings.mode === 'dark' ? '' : '#fff'
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
    setUsers(JSON.parse(localStorage.getItem('userData')))
  }, [])

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
              <Icon fontSize='1.5rem' icon='tabler:menu-2' color={settings.mode === 'dark' ? '' : '#fff'} />
            </IconButton>
          ) : null}
        </Box>
        <Typography
          variant='body1'
          sx={{ textTransform: 'uppercase', fontWeight: 600, color: settings.mode === 'dark' ? '' : '#ffffffd6' }}
        >
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
            <Box sx={{ width: '190px' }}>{/* <NotificationBar /> */}</Box>
          </Drawer>
        </div>
      </div>
    </>
  )
}

export default AppBarContent
