import { Box, Grid } from '@mui/material';
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Welcome from 'src/layouts/full/shared/welcome/Welcome';
import SellingProducts from '../../components/dashboards/modern/SellingProducts';
import TopCards from '../../components/dashboards/modern/TopCards';
import TopPerformers from '../../components/dashboards/modern/TopPerformers';
import { getDashboardAnalytics } from '../../store/thunk/dashboard';

const Modern = () => {
  const dispatch = useDispatch();
  const getDashboard = useSelector((state) => state.dashboard);

  useEffect(() => {
    dispatch(getDashboardAnalytics());
  }, [dispatch]);

  return (
    <Box>
      <Grid container spacing={3}>
        {/* column */}
        <Grid item sm={12} lg={12}>
          {getDashboard.loading === 'succeeded' && <TopCards />}
        </Grid>
        {/* column */}
        <Grid item xs={12} lg={8}>
          {getDashboard.loading === 'succeeded' && <TopPerformers />}
        </Grid>
        {/* column */}
        <Grid item xs={12} lg={4}>
          <Grid container spacing={3}>
            <Grid item xs={12} sm={6} lg={12}>
              {getDashboard.loading === 'succeeded' && <SellingProducts />}
            </Grid>
          </Grid>
        </Grid>
        {/* column */}
        {/* <Grid item xs={12} lg={4}>
          <EmployeeSalary />
        </Grid> */}
        {/* column */}
        {/* <Grid item xs={12} lg={4}>
          <Grid container spacing={3}>
            <Grid item xs={12} sm={6}>
              <Customers />
            </Grid>
            <Grid item xs={12} sm={6}>
              <Projects />
            </Grid>
            <Grid item xs={12}>
              <Social />
            </Grid>
          </Grid>
        </Grid> */}
        {/* column */}
        <Grid item xs={12} lg={4}>
          {/* <SellingProducts /> */}
        </Grid>
        {/* column */}
        <Grid item xs={12} lg={4}>
          {/* <WeeklyStats /> */}
        </Grid>
        {/* column */}
        <Grid item xs={12} lg={8}>
          {/* <TopPerformers /> */}
        </Grid>
      </Grid>
      {/* column */}
      <Welcome />
    </Box>
  );
};

export default Modern;
