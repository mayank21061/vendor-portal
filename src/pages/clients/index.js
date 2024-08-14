// ** MUI Imports
import Grid from '@mui/material/Grid'
import Paper from '@mui/material/Paper'
import CustomTable from 'src/components/clients/CustomTable'
import PersistLogin from 'src/components/PersistLogin'

const poSummary = () => {
  return (
    <PersistLogin>
      <CustomTable />
    </PersistLogin>
  )
}

export default poSummary
