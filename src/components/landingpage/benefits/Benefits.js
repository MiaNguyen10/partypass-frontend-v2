import {
  Box,
  Container,
  List,
  ListItem,
  ListItemText,
  Typography,
  useMediaQuery,
} from '@mui/material';

import AnimationFadeIn from 'src/components/landingpage/animation/Animation';

//img
import clubGoers from 'src/assets/images/landingpage/club_goers.png';
import venues from 'src/assets/images/landingpage/venues.png';

const Benefits = () => {
  const lg = useMediaQuery((theme) => theme.breakpoints.up('md'));
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
        <AnimationFadeIn>
          <Box mt={5}>
            <Box
              display="flex"
              justifyContent="center"
              gap={4}
              flexDirection={lg ? 'row' : 'column'}
            >
              {lg ? <img src={clubGoers} alt="For Club-Goers" /> : null}
              <Box sx={{ maxWidth: '700px', margin: 'auto', padding: '24px' }}>
                {/* Subheading */}
                <Typography variant="body1" sx={{ color: '#8A226F' }}>
                  For Club-Goers
                </Typography>

                {/* Heading */}
                <Typography variant="h4" sx={{ fontWeight: 'bold', color: '#2A3547', mt: 1 }}>
                  A Seamless Night Out – <br />
                  Stress-Free & Paperless
                </Typography>

                {/* Benefits List */}
                <List sx={{ mt: 3 }}>
                  {[
                    {
                      text: 'Skip the Lines – Scan your QR ticket and walk right in, no waiting.',
                    },
                    {
                      text: 'Secure Your Belongings – Get an auto-assigned locker and enjoy the night worry-free.',
                    },
                    {
                      text: 'One App for All Events – Browse, book, and manage your club visits in one place.',
                    },
                    {
                      text: 'Fast & Contactless Payments – Buy tickets securely with digital payments.',
                    },
                    {
                      text: 'Hassle-Free Checkout – Easily check out and retrieve your belongings with one tap.',
                    },
                  ].map((item, index) => (
                    <ListItem
                      key={index}
                      sx={{
                        display: 'flex',
                        alignItems: 'flex-start',
                        gap: '5px',
                        padding: '8px 0',
                      }}
                    >
                      <Typography sx={{ fontSize: '18px' }}>✅</Typography>
                      <ListItemText
                        primary={item.text}
                        sx={{ color: '#424242', fontSize: '30px' }}
                      />
                    </ListItem>
                  ))}
                </List>
              </Box>
            </Box>
          </Box>
        </AnimationFadeIn>
      </Container>
      <Container maxWidth="lg">
        <AnimationFadeIn>
          <Box display="flex" justifyContent="center" gap={4} flexDirection={lg ? 'row' : 'column'}>
            <Box sx={{ maxWidth: '700px', margin: 'auto', padding: '24px' }}>
              {/* Subheading */}
              <Typography variant="body1" sx={{ color: '#5D87FF' }}>
                For Venues & Organizer
              </Typography>

              {/* Heading */}
              <Typography variant="h4" sx={{ fontWeight: 'bold', color: '#2A3547', mt: 1 }}>
                Effortless Event Management – <br />
                Optimize Your Venue’s Flow
              </Typography>

              {/* Benefits List */}
              <List sx={{ mt: 3 }}>
                {[
                  {
                    text: 'Faster Entry, Higher Revenue – Process more customers per hour with quick QR scans.',
                  },
                  {
                    text: 'Reduce Staffing Costs – Automate check-ins and locker assignments, minimizing manual work.',
                  },
                  {
                    text: 'Real-Time Insights – Track entries, locker usage, and ticket sales with a live dashboard.',
                  },
                  {
                    text: 'Multi-Venue Support – Manage multiple locations seamlessly from one platform.',
                  },
                  {
                    text: 'Security & Compliance – Keep customer data secure with encrypted transactions.',
                  },
                ].map((item, index) => (
                  <ListItem
                    key={index}
                    sx={{
                      display: 'flex',
                      alignItems: 'flex-start',
                      gap: '5px',
                      padding: '8px 0',
                    }}
                  >
                    <Typography sx={{ fontSize: '18px' }}>✔</Typography>
                    <ListItemText primary={item.text} sx={{ color: '#424242', fontSize: '30px' }} />
                  </ListItem>
                ))}
              </List>
            </Box>
            {lg ? <img src={venues} alt="For Venues" /> : null}
          </Box>
        </AnimationFadeIn>
      </Container>
    </Box>
  );
};

export default Benefits;
