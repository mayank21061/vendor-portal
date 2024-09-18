import { Button, Grid, Typography } from '@mui/material'
import React from 'react'
import { useSelector } from 'react-redux'

const NotificationBar = () => {
  const { notificationsData } = useSelector(state => state.notifications)
  return (
    <Grid alignItems='center' display='flex' flexDirection='column'>
      <Grid item xs={12}>
        <Typography variant='h4'>Notifications</Typography>
      </Grid>
      {notificationsData?.map((item, index) => (
        <Grid item>{index}</Grid>
      ))}
      <Grid item xs={12}>
        <Button variant='contained' size='small'>
          Clear All
        </Button>
      </Grid>
    </Grid>
  )
}

export default NotificationBar
