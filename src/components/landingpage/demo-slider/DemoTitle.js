import { Grid, Typography, AvatarGroup, Avatar, Stack } from '@mui/material';
import AnimationFadeIn from '../animation/Animation';
// images
import img1 from 'src/assets/images/landingpage/profile/user1.png';
import img2 from 'src/assets/images/landingpage/profile/user2.png';
import img3 from 'src/assets/images/landingpage/profile/user3.png';

const DemoTitle = () => {
  return (
    <Grid container spacing={3} justifyContent="center">
      <Grid item xs={12} sm={10} lg={8}>
        <AnimationFadeIn>
          <Stack
            direction={{ xs: 'column', sm: 'row' }}
            spacing={1}
            alignItems="center"
            justifyContent="center"
            mb={2}
          >
            <AvatarGroup>
              <Avatar alt="Remy Sharp" src={img1} sx={{ width: 28, height: 28 }} />
              <Avatar alt="Travis Howard" src={img2} sx={{ width: 28, height: 28 }} />
              <Avatar alt="Cindy Baker" src={img3} sx={{ width: 28, height: 28 }} />
            </AvatarGroup>
            <Typography
              variant="h6"
              sx={{
                fontSize: {
                  lg: '16px',
                  xs: '14px',
                  textAlign: 'center',
                },
              }}
            >
              10+{' '}
              <Typography variant="inherit" fontWeight={100} component={'span'}>
                event-goers are using PartyPass for a seamless nightlife experience!
              </Typography>
            </Typography>
          </Stack>
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
            Smart. Scalable. Seamless <br /> Powering Next-Gen Event Access
          </Typography>
          <Typography
            textAlign="center"
            fontWeight={100}
            mt={2}
            sx={{
              fontSize: {
                lg: '15px',
                xs: '12px',
              },
              lineHeight: {
                lg: '25px',
                xs: '15px',
              },
            }}
          >
            Behind every smooth club entry is a powerful system. PartyPass is built with{' '}
            <Typography component="span" color="#5D87FF" variant="inherit">
              speed, automation,
            </Typography>{' '}
            and{' '}
            <Typography component="span" color="#5D87FF" variant="inherit">
              scalability
            </Typography>{' '}
            in mind— designed to handle high-volume venues while keeping operations simple.
          </Typography>
        </AnimationFadeIn>
      </Grid>
    </Grid>
  );
};

export default DemoTitle;
