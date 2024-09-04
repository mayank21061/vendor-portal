// ** MUI Imports
import { Typography } from '@mui/material'
import Grid from '@mui/material/Grid'
import Paper from '@mui/material/Paper'
import TickPlacementBars from 'src/components/dashboard/Chart'
import InvoiceTable from 'src/components/dashboard/InvoiceTable'
import PersistLogin from 'src/components/PersistLogin'

// ** Components

const Dashboard = () => {
  return (
    <PersistLogin>
      <Grid container spacing={4} padding={2}>
        <Grid item xs={4}>
          <Paper>
            <div>
              <div
                style={{
                  textAlign: 'center',
                  // borderBottom: '1px solid #857c7c',
                  borderTopLeftRadius: '.3rem',
                  borderTopRightRadius: '.3rem'
                  // backgroundColor: '#b0abab8f'
                }}
              >
                <Typography variant='h4' color='black' sx={{ paddingTop: '1rem' }}>
                  Total Bills Created
                </Typography>
              </div>
              <div style={{ height: '16vh', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                <Typography variant='h2' color='black'>
                  83
                </Typography>
              </div>
            </div>
          </Paper>
        </Grid>
        <Grid item xs={4}>
          <Paper>
            <div>
              <div
                style={{
                  // borderBottom: '1px solid #857c7c',
                  textAlign: 'center',
                  borderTopLeftRadius: '.3rem',
                  borderTopRightRadius: '.3rem'
                  // backgroundColor: '#b0abab8f'
                }}
              >
                <Typography variant='h4' color='black' sx={{ paddingTop: '1rem' }}>
                  Total Bills Passed
                </Typography>
              </div>
              <div style={{ height: '16vh', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                <Typography variant='h2' color='black'>
                  82
                </Typography>
                <Typography variant='h2' color='#48BF40'>
                  {'(99%)'}
                </Typography>
              </div>
            </div>
          </Paper>
        </Grid>
        <Grid item xs={4}>
          <Paper>
            <div>
              <div
                style={{
                  // borderBottom: '1px solid #857c7c',
                  textAlign: 'center',
                  borderTopLeftRadius: '.3rem',
                  borderTopRightRadius: '.3rem'
                  // backgroundColor: '#b0abab8f'
                }}
              >
                <Typography variant='h4' color='black' sx={{ paddingTop: '1rem' }}>
                  Total Bills Pending
                </Typography>
              </div>
              <div style={{ height: '16vh', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                <Typography variant='h2' color='black'>
                  1
                </Typography>
                <Typography variant='h2' color='#48BF40'>
                  {'(1%)'}
                </Typography>
              </div>
            </div>
          </Paper>
        </Grid>
        <Grid item xs={12}>
          <Paper elevation={3} sx={{ padding: 2 }}>
            <TickPlacementBars />
          </Paper>
        </Grid>
      </Grid>
    </PersistLogin>
  )
}

export default Dashboard
