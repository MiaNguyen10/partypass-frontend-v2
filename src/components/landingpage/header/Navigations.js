import { Button, styled } from '@mui/material';
import { NavLink } from 'react-router-dom';

const Navigations = () => {
  const StyledButton = styled(Button)(({ theme }) => ({
    fontSize: '16px',
    color: theme.palette.text.secondary,
  }));

  return (
    <>
      <StyledButton color="inherit" variant="text" href="">
        About
      </StyledButton>
      <StyledButton color="inherit" variant="text" href="">
        Features
      </StyledButton>
      <StyledButton color="inherit" variant="text" href="">
        For Club goers
      </StyledButton>
      <StyledButton color="inherit" variant="text" href="">
        For Venues
      </StyledButton>
      <StyledButton color="inherit" variant="text" href="">
        FAQ
      </StyledButton>
      <Button
        color="primary"
        target="_blank"
        variant="contained"
        component={NavLink}
        to="/auth/login"
      >
        Venue Login
      </Button>
    </>
  );
};

export default Navigations;
