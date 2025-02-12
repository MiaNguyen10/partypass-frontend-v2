import { Box, Button, Stack, Typography } from '@mui/material';
import PropTypes from 'prop-types';

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
}) => (
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
          type="password"
          variant="outlined"
          error={passwordError}
          helperText={passwordErrorMessage}
          required
          fullWidth
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
