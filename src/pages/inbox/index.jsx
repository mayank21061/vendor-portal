// ** MUI Imports
import { LinearProgress } from '@mui/material'
import Grid from '@mui/material/Grid'
import { useSelector } from 'react-redux'
import CustomTable from 'src/components/inbox/CustomTable'
import PdfViewer from 'src/components/PdfViewer'
import PersistLogin from 'src/components/PersistLogin'

const Inbox = () => {
  const { fileData, fileDataIsLoading, fileDataIsSuccess, fileDataIsError } = useSelector(state => state.file)
  return (
    <PersistLogin>
      <Grid container spacing={2}>
        <Grid item xs={8}>
          <CustomTable />
        </Grid>
        <Grid item xs={4} maxHeight='90vh'>
          {fileDataIsLoading ? <LinearProgress /> : fileDataIsSuccess ? <PdfViewer /> : ''}
        </Grid>
      </Grid>
    </PersistLogin>
  )
}

export default Inbox
