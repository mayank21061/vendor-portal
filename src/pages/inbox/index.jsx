// ** MUI Imports
import Grid from '@mui/material/Grid'
import CustomTable from 'src/components/inbox/CustomTable'
import PdfViewer from 'src/components/PdfViewer'
import PersistLogin from 'src/components/PersistLogin'

const Inbox = () => {
  return (
    <PersistLogin>
      <Grid container spacing={2}>
        <Grid item xs={8}>
          <CustomTable />
        </Grid>
        <Grid item xs={4} maxHeight='90vh'>
          <PdfViewer />
        </Grid>
      </Grid>
    </PersistLogin>
  )
}

export default Inbox
