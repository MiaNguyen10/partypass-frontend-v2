import { Box, Container, Grid, Stack, useMediaQuery } from '@mui/material';
import BannerContent from './BannerContent';
import mobileImg1 from 'src/assets/images/landingpage/mobile_app_1.png';
import mobileImg2 from 'src/assets/images/landingpage/mobile_app_2.png';

const Banner = () => {
  const lgUp = useMediaQuery((theme) => theme.breakpoints.up('md'));

  return (
    <Box mb={10} sx={{ overflow: 'hidden' }}>
      <Container maxWidth="lg">
        <Grid container spacing={3} alignItems="center">
          <Grid item xs={12} lg={6} md={8}>
            <BannerContent />
          </Grid>
          {lgUp ? (
            <Grid item xs={12} lg={6} md={4}>
              <Box
                p={3.2}
                sx={{
                  backgroundColor: (theme) => theme.palette.primary.light,
                  minWidth: '900px',
                  height: 'calc(100vh - 100px)',
                  maxHeight: '850px',
                  display: 'flex',
                  justifyContent: 'center',
                  alignItems: 'center',
                }}
              >
                <Stack direction={'row'} spacing={4} justifyContent="center" alignItems="center">
                  <Box
                    component="img"
                    src={mobileImg1}
                    alt="mobile app 1"
                    style={{
                      width: '100%',
                      maxWidth: '500px',
                    }}
                    sx={{
                      height: { lg: '400px', xl: '550px' },
                      '@media (min-width: 1920px)': { height: '100%' }
                    }}
                  />
                  <Box
                    component="img"
                    src={mobileImg2}
                    alt="mobile app 2"
                    style={{
                      width: '100%',
                      maxWidth: '500px',
                    }}
                    sx={{
                      height: { lg: '400px', xl: '550px' },
                      '@media (min-width: 1920px)': { height: '100%' }
                    }}
                  />
                </Stack>
              </Box>
            </Grid>
          ) : null}
        </Grid>
      </Container>
    </Box>
  );
};

export default Banner;
