// ** MUI Imports
import Grid from '@mui/material/Grid'
import Paper from '@mui/material/Paper'
import PersistLogin from 'src/components/PersistLogin'
import CollapsibleTable from 'src/components/poSummary/CollapsilbeTable'
import CustomTable from 'src/components/poSummary/CustomTable'

const poSummary = () => {
  return (
    <PersistLogin>
      <CollapsibleTable />
    </PersistLogin>
  )
}

export default poSummary
