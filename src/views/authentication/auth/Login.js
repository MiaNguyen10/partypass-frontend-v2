import { Box, Grid, Typography } from '@mui/material';
import img1 from 'src/assets/images/backgrounds/login-bg.svg';
import PageContainer from 'src/components/container/PageContainer';
import Logo from 'src/layouts/full/shared/logo/Logo';
import AuthLogin from '../authForms/AuthLogin';
import React from 'react';
import { passwordRegExp } from '../../../config/regexFormat';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router';
import { authenticate } from '../../../store/thunk/authenticate';

const Login = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [usernameError, setUsernameError] = React.useState(false);
  const [usernameErrorMessage, setUsernameErrorMessage] = React.useState('');
  const [passwordError, setPasswordError] = React.useState(false);
  const [passwordErrorMessage, setPasswordErrorMessage] = React.useState('');
  const [errorLogin, setErrorLogin] = React.useState('');

  const onSubmit = async (event) => {
    event.preventDefault(); // Prevent default form submission

    if (validateInputs()) {
      const data = new FormData(event.currentTarget);
      const username = data.get('username');
      const password = data.get('password');

      dispatch(authenticate({ email: username, password }))
        .unwrap()
        .then((response) => {
          sessionStorage.setItem('token', response.token);
          navigate('/');
        })  
        .catch((error) => {
          setErrorLogin(`Login failed. ${error.message}`);
        });
    }
  };

  const validateInputs = () => {
    const username = document.getElementById('username').value;
    const password = document.getElementById('password').value;

    let isValid = true;

    if (!username) {
      setUsernameError(true);
      setUsernameErrorMessage('Please enter username');
      isValid = false;
    } else {
      setUsernameError(false);
      setUsernameErrorMessage('');
    }

    if (!password || !passwordRegExp.test(password)) {
      setPasswordError(true);
      setPasswordErrorMessage(
        'Password must be at least 6 characters long, have at least one uppercase letter, one lowercase letter, one number, and one special character.',
      );
      isValid = false;
    } else {
      setPasswordError(false);
      setPasswordErrorMessage('');
    }

    return isValid;
  };

  return (
    <PageContainer title="Login" description="this is Login page">
      <Grid container spacing={0} sx={{ overflowX: 'hidden' }}>
        <Grid
          item
          xs={12}
          sm={12}
          lg={7}
          xl={8}
          sx={{
            position: 'relative',
            '&:before': {
              content: '""',
              background: 'radial-gradient(#d2f1df, #d3d7fa, #bad8f4)',
              backgroundSize: '400% 400%',
              animation: 'gradient 15s ease infinite',
              position: 'absolute',
              height: '100%',
              width: '100%',
              opacity: '0.3',
            },
          }}
        >
          <Box position="relative">
            <Box px={3}>
              <Logo />
            </Box>
            <Box
              alignItems="center"
              justifyContent="center"
              height={'calc(100vh - 75px)'}
              sx={{
                display: {
                  xs: 'none',
                  lg: 'flex',
                },
              }}
            >
              <img
                src={img1}
                alt="bg"
                style={{
                  width: '100%',
                  maxWidth: '500px',
                }}
              />
            </Box>
          </Box>
        </Grid>
        <Grid
          item
          xs={12}
          sm={12}
          lg={5}
          xl={4}
          display="flex"
          justifyContent="center"
          alignItems="center"
        >
          <Box width="100%" maxWidth="400px" p={3}>
            <AuthLogin
              title="Welcome to Party Pass"
              subtext={
                <Typography variant="subtitle1" color="textSecondary">
                  Your Admin Dashboard
                </Typography>
              }
              handleSubmit={onSubmit}
              usernameError={usernameError}
              usernameErrorMessage={usernameErrorMessage}
              passwordError={passwordError}
              passwordErrorMessage={passwordErrorMessage}
              errorLogin={errorLogin}
            />
          </Box>
        </Grid>
      </Grid>
    </PageContainer>
  );
};

export default Login;
