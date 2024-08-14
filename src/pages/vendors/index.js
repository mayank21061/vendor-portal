// ** MUI Imports
import Grid from '@mui/material/Grid'
import Paper from '@mui/material/Paper'
import PersistLogin from 'src/components/PersistLogin'
import CustomTable from 'src/components/vendors/CustomTable'

const poSummary = () => {
  return (
    <PersistLogin>
      <CustomTable />
    </PersistLogin>
  )
}

export default poSummary
