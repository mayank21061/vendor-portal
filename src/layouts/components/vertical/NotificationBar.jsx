import { Avatar, Button, Divider, Grid, List, ListItem, ListItemAvatar, ListItemText, Typography } from '@mui/material'
import React, { Fragment, useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import { toast } from 'react-toastify'
import SockJS from 'sockjs-client'
import { over } from 'stompjs'

const NotificationBar = () => {
  const { notificationsData } = useSelector(state => state.notifications)

  // const onGetNotifications = async (payload) => {
  //   const senderName = sessionStorage.getItem("senderName")
  //   let data = await JSON.parse(payload.body);
  //   console.log(senderName)
  //   console.log(data.sender)
  //   if (senderName === data.sender) { addBotMsg(data); } else {
  //     try {
  //       toast(`New message received from ${data.sender}`, { type: 'success' })
  //       console.log(Notification, Notification.permission)
  //       // if (Notification?.permission) {
  //       //   new Notification("New Notification", { body: `New message received from ${data.sender}` })
  //       // }
  //       setUsers(prevState => prevState.some(item => item === data.sender) ? prevState : [data.sender, ...prevState])
  //     } catch (e) {
  //       console.log(e)
  //     }
  //   }
  // };

  return (
    <Grid alignItems='center' display='flex' flexDirection='column'>
      <Grid item xs={12}>
        <Typography variant='h4'>Notifications</Typography>
      </Grid>
      {/* {notificationsData?.map((item, index) => (
        <Grid item>{index}</Grid>
      ))} */}
      <List sx={{ width: '100%', bgcolor: 'background.paper' }}>
        <ListItem alignItems='flex-start'>
          <ListItemAvatar>
            <Avatar alt='Remy Sharp' src='/static/images/avatar/1.jpg' />
          </ListItemAvatar>
          <ListItemText
            primary='Brunch this weekend?'
            secondary={
              <Fragment>
                <Typography component='span' variant='body2' sx={{ color: 'text.primary', display: 'inline' }}>
                  Ali Connors
                </Typography>
                {" — I'll be in your neighborhood doing errands this…"}
              </Fragment>
            }
          />
        </ListItem>
        <Divider variant='inset' component='li' />
        <ListItem alignItems='flex-start'>
          <ListItemAvatar>
            <Avatar alt='Travis Howard' src='/static/images/avatar/2.jpg' />
          </ListItemAvatar>
          <ListItemText
            primary='Summer BBQ'
            secondary={
              <Fragment>
                <Typography component='span' variant='body2' sx={{ color: 'text.primary', display: 'inline' }}>
                  to Scott, Alex, Jennifer
                </Typography>
                {" — Wish I could come, but I'm out of town this…"}
              </Fragment>
            }
          />
        </ListItem>
        <Divider variant='inset' component='li' />
        <ListItem alignItems='flex-start'>
          <ListItemAvatar>
            <Avatar alt='Cindy Baker' src='/static/images/avatar/3.jpg' />
          </ListItemAvatar>
          <ListItemText
            primary='Oui Oui'
            secondary={
              <Fragment>
                <Typography component='span' variant='body2' sx={{ color: 'text.primary', display: 'inline' }}>
                  Sandra Adams
                </Typography>
                {' — Do you have Paris recommendations? Have you ever…'}
              </Fragment>
            }
          />
        </ListItem>
      </List>
      {notificationsData.length > 0 && (
        <Grid item xs={12}>
          <Button variant='contained' size='small'>
            Clear All
          </Button>
        </Grid>
      )}
    </Grid>
  )
}

export default NotificationBar
