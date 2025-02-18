import React from 'react';
import { Box, Button, IconButton, Stack, Typography } from '@mui/material';
import PropTypes from 'prop-types';
import { IconEye, IconEyeOff } from '@tabler/icons';

import CustomFormLabel from '../../../components/forms/theme-elements/CustomFormLabel';
import CustomTextField from '../../../components/forms/theme-elements/CustomTextField';

const AuthLogin = ({
  title,
  subtext,
  handleSubmit,
  usernameError,
  usernameErrorMessage,
  passwordError,
  passwordErrorMessage,
  errorLogin,
}) => {
  const [showPassword, setShowPassword] = React.useState(false);
  const handleClickShowPassword = () => {
    setShowPassword(!showPassword);
  };

  return (
    <>
      {title ? (
        <Typography fontWeight="700" variant="h3" mb={1}>
          {title}
        </Typography>
      ) : null}

      {subtext}

      <Stack component="form" onSubmit={handleSubmit}>
        <Box>
          <CustomFormLabel htmlFor="username">Username</CustomFormLabel>
          <CustomTextField
            id="username"
            name="username"
            variant="outlined"
            error={usernameError}
            helperText={usernameErrorMessage}
            required
            fullWidth
          />
        </Box>
        <Box>
          <CustomFormLabel htmlFor="password">Password</CustomFormLabel>
          <CustomTextField
            id="password"
            name="password"
            type={showPassword ? 'text' : 'password'}
            variant="outlined"
            error={passwordError}
            helperText={passwordErrorMessage}
            required
            fullWidth
            InputProps={{
              endAdornment: (
                <IconButton size="small" onClick={handleClickShowPassword}>
                  {showPassword ? <IconEye size="1.1rem" /> : <IconEyeOff size="1.1rem" />}
                </IconButton>
              ),
            }}
          />
        </Box>
        {errorLogin && (
          <Typography color="error" variant="body2" mt={2}>
            {errorLogin}
          </Typography>
        )}
        <Box mt={3}>
          <Button color="primary" variant="contained" size="large" fullWidth type="submit">
            Sign In
          </Button>
        </Box>
      </Stack>
    </>
  );
};
AuthLogin.propTypes = {
  title: PropTypes.string,
  subtext: PropTypes.node,
  handleSubmit: PropTypes.func,
  usernameError: PropTypes.bool,
  usernameErrorMessage: PropTypes.string,
  passwordError: PropTypes.bool,
  passwordErrorMessage: PropTypes.string,
  errorLogin: PropTypes.string,
};

export default AuthLogin;
