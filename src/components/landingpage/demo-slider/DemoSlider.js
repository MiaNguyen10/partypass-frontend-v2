import { Box, Card, CardContent, Container, Typography } from '@mui/material';

import DemoTitle from './DemoTitle';
import AnimationFadeIn from '../animation/Animation';

// images
import cloudBased from 'src/assets/images/landingpage/cloud_based.png';
import lockerAssignment from 'src/assets/images/landingpage/locker.png';
import paperlessSytem from 'src/assets/images/landingpage/paperless.png';
import realTimeTrackingImg from 'src/assets/images/landingpage/real_time.png';
import securePayment from 'src/assets/images/landingpage/secure.png';

const demos = [
  {
    backgroundColor: '#FFEEF9',
    img: realTimeTrackingImg,
    alt: 'Real-Time Tracking',
    title: 'Real-Time Tracking',
    color: '#F50D51',
  },
  {
    backgroundColor: '#E8F6F0',
    img: lockerAssignment,
    alt: 'Locker Assignment',
    title: 'Locker Assignment',
    color: '#2D9566',
  },
  {
    backgroundColor: '#F1E7FB',
    img: securePayment,
    alt: 'Secure Payments',
    title: 'Secure Payments',
    color: '#7811F5',
  },
  {
    backgroundColor: '#E3F4FF',
    img: cloudBased,
    alt: 'Cloud-Based',
    title: 'Cloud-Based',
    color: '#2F495E',
  },
  {
    backgroundColor: '#EAFBF8',
    img: paperlessSytem,
    alt: 'Paperless System',
    title: 'Paperless System',
    color: '#2F495E',
  },
];

const DemoSlider = () => {
  return (
    <Box
      pb="140px"
      overflow="hidden"
      sx={{
        pt: {
          sm: '60px',
          lg: '0',
        },
      }}
    >
      <Container maxWidth="lg">
        {/* Title */}
        <DemoTitle />

        {/* slider */}
        <AnimationFadeIn>
          <Box mt={9}>
            <Box display="flex" justifyContent="center" gap={4} flexWrap="wrap">
              {demos.map((demo, index) => (
                <Card
                  key={index}
                  sx={{
                    width: 200,
                    height: 180,
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                    justifyContent: 'center',
                    boxShadow: 3,
                    backgroundColor: demo.backgroundColor,
                  }}
                >
                  <CardContent
                    sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}
                  >
                    <img
                      src={demo.img}
                      alt={demo.alt}
                      style={{ width: 50, height: 48, marginBottom: 8 }}
                    />
                    <Typography
                      variant="body1"
                      align="center"
                      color={demo.color}
                      sx={{
                        whiteSpace: { xs: 'normal', lg: 'nowrap' },
                        overflow: 'hidden',
                        textOverflow: 'ellipsis',
                        maxWidth: '100%',
                        marginTop: 2,
                      }}
                    >
                      {demo.title}
                    </Typography>
                  </CardContent>
                </Card>
              ))}
            </Box>
          </Box>
        </AnimationFadeIn>
      </Container>
    </Box>
  );
};

export default DemoSlider;
