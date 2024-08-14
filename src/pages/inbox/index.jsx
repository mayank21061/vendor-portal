// ** MUI Imports
import Grid from '@mui/material/Grid'
import CustomTable from 'src/components/inbox/CustomTable'
import PersistLogin from 'src/components/PersistLogin'

const Inbox = () => {
  return (
    <PersistLogin>
      <Grid container spacing={2}>
        <Grid item xs={12}>
          <CustomTable />
        </Grid>
      </Grid>
    </PersistLogin>
  )
}

export default Inbox
