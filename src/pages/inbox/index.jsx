// ** MUI Imports
import Grid from '@mui/material/Grid'
import Paper from '@mui/material/Paper'
import InboxTable from 'src/components/inbox/InboxTable'
import PersistLogin from 'src/components/PersistLogin'

const Inbox = () => {
  return (
    <PersistLogin>
      <Grid container spacing={2}>
        <Grid item xs={12}>
          <InboxTable />
        </Grid>
      </Grid>
    </PersistLogin>
  )
}

export default Inbox
