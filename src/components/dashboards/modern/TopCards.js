import { Box, CardContent, Grid, Typography } from '@mui/material';
import { useSelector } from 'react-redux';
import icon2 from '../../../assets/images/svgs/icon-briefcase.svg';
import icon6 from '../../../assets/images/svgs/icon-connect.svg';
import icon4 from '../../../assets/images/svgs/icon-favorites.svg';
import icon3 from '../../../assets/images/svgs/icon-mailbox.svg';
import icon5 from '../../../assets/images/svgs/icon-speech-bubble.svg';
import icon1 from '../../../assets/images/svgs/icon-user-male.svg';
import { getAnalytics } from '../../../store/reducers/dashboard/dashboardSlice';
const TopCards = () => {
  const analytics = useSelector(getAnalytics);

  const topcards = [
    {
      icon: icon1,
      title: 'Total Users',
      digits: analytics.totalUsers,
      bgcolor: 'primary',
    },
    {
      icon: icon2,
      title: 'Institutions',
      digits: analytics.totalInstitutions,
      bgcolor: 'warning',
    },
    {
      icon: icon3,
      title: 'Tickets Sold',
      digits: analytics.totalTicketsSold,
      bgcolor: 'error',
    },
    {
      icon: icon4,
      title: 'Events',
      digits: analytics.totalEvents,
      bgcolor: 'success',
    },
    {
      icon: icon5,
      title: 'Revenue',
      digits: `$${analytics.totalRevenue}`,
      bgcolor: 'primary',
    },
    {
      icon: icon6,
      title: 'Customers',
      digits: analytics.totalCustomers,
      bgcolor: 'info',
    },
  ];

  return (
    <Grid container spacing={3} mt={3}>
      {topcards.map((topcard, i) => (
        <Grid item xs={12} sm={4} lg={2} key={i}>
          <Box bgcolor={topcard.bgcolor + '.light'} textAlign="center">
            <CardContent>
              <img src={topcard.icon} alt={topcard.icon} width="50" />
              <Typography
                color={topcard.bgcolor + '.main'}
                mt={1}
                variant="subtitle1"
                fontWeight={600}
              >
                {topcard.title}
              </Typography>
              <Typography color={topcard.bgcolor + '.main'} variant="h4" fontWeight={600}>
                {topcard.digits}
              </Typography>
            </CardContent>
          </Box>
        </Grid>
      ))}
    </Grid>
  );
};

export default TopCards;
