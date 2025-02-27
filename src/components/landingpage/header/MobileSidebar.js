import { Box, Button, Stack } from '@mui/material';
import { NavLink } from 'react-router-dom';
import Logo from 'src/layouts/full/shared/logo/Logo';

const MobileSidebar = () => {
  return (
    <>
      <Box px={3}>
        <Logo />
      </Box>
      <Box p={3}>
        <Stack direction="column" spacing={2}>
          <Button
            color="inherit"
            href="#about"
            sx={{
              justifyContent: 'start',
            }}
          >
            About
          </Button>
          <Button
            color="inherit"
            href="#features"
            sx={{
              justifyContent: 'start',
            }}
          >
            Features
          </Button>
          <Button
            color="inherit"
            href="#club-goers"
            sx={{
              justifyContent: 'start',
            }}
          >
            For Club goers
          </Button>
          <Button
            color="inherit"
            href="#venues"
            sx={{
              justifyContent: 'start',
            }}
          >
            For Venues
          </Button>
          <Button
            color="inherit"
            href="#faq"
            sx={{
              justifyContent: 'start',
            }}
          >
            FAQ
          </Button>
          <Button color="primary" variant="contained" component={NavLink} to="/auth/login">
            Venue Login
          </Button>
        </Stack>
      </Box>
    </>
  );
};

export default MobileSidebar;
