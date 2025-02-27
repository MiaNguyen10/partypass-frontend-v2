import { Avatar, Box, Button, Divider, IconButton, Menu, Typography } from '@mui/material';
import { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import * as dropdownData from './data';

import { Stack } from '@mui/system';
import { IconMail } from '@tabler/icons';

import { useDispatch, useSelector } from 'react-redux';
import Scrollbar from 'src/components/custom-scroll/Scrollbar';
import { roles } from '../../../../config/Constant';
import { logout } from '../../../../store/reducers/authenticate/authenticateSlice';
import { getUserLogin } from '../../../../store/reducers/user/userSlice';
import { getUserInformation } from '../../../../store/thunk/user';

const Profile = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const currentUser = useSelector(getUserLogin);
  const [anchorEl2, setAnchorEl2] = useState(null);
  const handleClick2 = (event) => {
    setAnchorEl2(event.currentTarget);
  };
  const handleClose2 = () => {
    setAnchorEl2(null);
  };

  useEffect(() => {
    dispatch(getUserInformation());
  }, [dispatch]);

  const handleLogout = () => {
    dispatch(logout());
    navigate('/auth/login');
  };

  return (
    <Box>
      <IconButton
        size="large"
        aria-label="show 11 new notifications"
        color="inherit"
        aria-controls="msgs-menu"
        aria-haspopup="true"
        sx={{
          ...(typeof anchorEl2 === 'object' && {
            color: 'primary.main',
          }),
        }}
        onClick={handleClick2}
      >
        <Avatar
          src={currentUser.profile_pic}
          alt={currentUser.name}
          sx={{
            width: 35,
            height: 35,
          }}
        />
      </IconButton>
      {/* ------------------------------------------- */}
      {/* Message Dropdown */}
      {/* ------------------------------------------- */}
      <Menu
        id="msgs-menu"
        anchorEl={anchorEl2}
        keepMounted
        open={Boolean(anchorEl2)}
        onClose={handleClose2}
        anchorOrigin={{ horizontal: 'right', vertical: 'bottom' }}
        transformOrigin={{ horizontal: 'right', vertical: 'top' }}
        sx={{
          '& .MuiMenu-paper': {
            width: '360px',
          },
        }}
      >
        <Scrollbar sx={{ height: '100%', maxHeight: '85vh' }}>
          <Box p={3}>
            <Typography variant="h5">User Profile</Typography>
            <Stack direction="row" py={3} spacing={2} alignItems="center">
              <Avatar
                src={currentUser.profile_pic}
                alt={currentUser.name}
                sx={{ width: 95, height: 95 }}
              />
              <Box>
                <Typography variant="subtitle2" color="textPrimary" fontWeight={600}>
                  {currentUser.name}
                </Typography>
                <Typography variant="subtitle2" color="textSecondary">
                  {roles.find((role) => role.id === currentUser.role)?.value}
                </Typography>

                {(currentUser.role === 2 || currentUser.role === 3) && currentUser.institution && (
                  <Typography
                    variant="subtitle2"
                    color="grey"
                    sx={{ fontStyle: 'italic', fontSize: '0.85rem' }}
                  >
                    {currentUser.institution.name}
                  </Typography>
                )}
                <Typography
                  variant="subtitle2"
                  color="textSecondary"
                  display="flex"
                  alignItems="center"
                  gap={1}
                >
                  <IconMail width={15} height={15} />
                  {currentUser.email}
                </Typography>
              </Box>
            </Stack>
            <Divider />
            {dropdownData.profile.map((profile) => (
              <Box key={profile.title}>
                <Box sx={{ py: 2, px: 0 }} className="hover-text-primary">
                  <Link to={profile.href}>
                    <Stack direction="row" spacing={2}>
                      <Box
                        width="45px"
                        height="45px"
                        bgcolor="primary.light"
                        display="flex"
                        alignItems="center"
                        justifyContent="center"
                      >
                        <Avatar
                          src={profile.icon}
                          alt={profile.icon}
                          sx={{
                            width: 24,
                            height: 24,
                            borderRadius: 0,
                          }}
                        />
                      </Box>
                      <Box>
                        <Typography
                          variant="subtitle2"
                          fontWeight={600}
                          color="textPrimary"
                          className="text-hover"
                          noWrap
                          sx={{
                            width: '240px',
                          }}
                        >
                          {profile.title}
                        </Typography>
                        <Typography
                          color="textSecondary"
                          variant="subtitle2"
                          sx={{
                            width: '240px',
                          }}
                          noWrap
                        >
                          {profile.subtitle}
                        </Typography>
                      </Box>
                    </Stack>
                  </Link>
                </Box>
              </Box>
            ))}
            <Box mt={2}>
              <Button
                onClick={handleLogout}
                variant="outlined"
                color="primary"
                component={Link}
                fullWidth
              >
                Logout
              </Button>
            </Box>
          </Box>
        </Scrollbar>
      </Menu>
    </Box>
  );
};

export default Profile;
