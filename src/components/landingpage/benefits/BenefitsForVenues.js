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
import venues from 'src/assets/images/landingpage/venues.png';

const BenefitsForVenues = () => {
  const lg = useMediaQuery((theme) => theme.breakpoints.up('md'));
  return (
    <Container maxWidth="lg">
      <AnimationFadeIn>
        <Box display="flex" justifyContent="center" gap={4} flexDirection={lg ? 'row' : 'column'}>
          <Box sx={{ maxWidth: '700px', margin: 'auto', padding: '24px' }}>
            <Typography variant="body1" sx={{ color: '#5D87FF' }}>
              For Venues & Organizer
            </Typography>

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
  );
};

export default BenefitsForVenues;
