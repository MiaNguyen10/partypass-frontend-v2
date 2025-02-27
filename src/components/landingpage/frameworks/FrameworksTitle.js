import { Grid, Typography } from '@mui/material';

const FrameworksTitle = () => {
  return (
    <Grid container spacing={3} justifyContent="center">
      <Grid item xs={12} sm={10} lg={9}>
        <Typography
          variant="h2"
          fontWeight={700}
          textAlign="center"
          sx={{
            fontSize: {
              lg: '36px',
              xs: '25px',
            },
            lineHeight: {
              lg: '43px',
              xs: '30px',
            },
          }}
        >
          Optimize Your Venue’s Entry & Locker System – Faster Check-ins, Happier Guests!
        </Typography>
      </Grid>
    </Grid>
  );
};

export default FrameworksTitle;
