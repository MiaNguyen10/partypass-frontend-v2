import { Box, CardContent, Chip, LinearProgress, Paper, Stack, Typography } from '@mui/material';
import { useTheme } from '@mui/material/styles';
import { useSelector } from 'react-redux';
import SavingsImg from '../../../assets/images/backgrounds/piggy.png';
import { getAnalytics } from '../../../store/reducers/dashboard/dashboardSlice';

const SellingProducts = () => {
  const theme = useTheme();
  const analytics = useSelector(getAnalytics);
  const bestSellingProducts = analytics.bestSellingProducts;

  const secondarylight = theme.palette.secondary.light;
  const primarylight = theme.palette.primary.light;
  const secondary = theme.palette.secondary.main;
  const primary = theme.palette.primary.main;
  const borderColor = theme.palette.grey[100];

  return (
    <Paper sx={{ bgcolor: 'primary.main', border: `1px solid ${borderColor}` }} variant="outlined">
      <CardContent>
        <Typography variant="h5" color="white">
          Best selling products
        </Typography>
        {/* <Typography variant="subtitle1" color="white" mb={4}>
          Overview 2023
        </Typography> */}

        <Box textAlign="center" mt={2} mb="-90px">
          <img src={SavingsImg} alt={SavingsImg} width={'300px'} />
        </Box>
      </CardContent>
      <Paper sx={{ overflow: 'hidden', zIndex: '1', position: 'relative', margin: '10px' }}>
        <Box p={3}>
          <Stack spacing={3}>
            {bestSellingProducts.map((product, i) => (
              <Box key={i}>
                <Stack
                  direction="row"
                  spacing={2}
                  mb={1}
                  justifyContent="space-between"
                  alignItems="center"
                >
                  <Box>
                    <Typography variant="h6">{product.ticketName}</Typography>
                    <Typography variant="subtitle2" color="textSecondary">
                      ${product.totalRevenue}
                    </Typography>
                  </Box>
                  <Chip
                    sx={{
                      backgroundColor: i % 2 === 0 ? primarylight : secondarylight,
                      color: i % 2 === 0 ? primary : secondary,
                      borderRadius: '4px',
                      width: 55,
                      height: 24,
                    }}
                    label={product.totalSold + ' sold'}
                  />
                </Stack>
                <LinearProgress
                  value={(product.totalSold / 10) * 100}
                  variant="determinate"
                  color={i % 2 === 0 ? 'primary' : 'secondary'}
                />
              </Box>
            ))}
          </Stack>
        </Box>
      </Paper>
    </Paper>
  );
};

export default SellingProducts;
