// ** MUI Imports
import Grid from '@mui/material/Grid';
import Paper from '@mui/material/Paper';
import TickPlacementBars from 'src/components/dashboard/Chart';
import DashboardTable from 'src/components/dashboard/DashboardTable';
import PersistLogin from 'src/components/PersistLogin';

// ** Components


const Dashboard = () => {
  return (
    <PersistLogin>
    <Grid container spacing={6}>
      <Grid item xs={4}>
        <Paper elevation={3} sx={{ padding: 2 }}>
          <TickPlacementBars />
        </Paper>
      </Grid>
      <Grid item xs={8}>
        <DashboardTable />
      </Grid>
    </Grid>
    </PersistLogin>
  );
};

export default Dashboard;
