// ** MUI Imports
import Grid from '@mui/material/Grid'
import Paper from '@mui/material/Paper'
import PersistLogin from 'src/components/PersistLogin'
import CustomTable from 'src/components/poSummary/CustomTable'

const poSummary = () => {
  return (
    <PersistLogin>
      <Grid container spacing={2}>
        <Grid item xs={12}>
          <Paper elevation={3} sx={{ padding: 2 }}>
            <CustomTable />
          </Paper>
        </Grid>
      </Grid>
    </PersistLogin>
  )
}

export default poSummary
