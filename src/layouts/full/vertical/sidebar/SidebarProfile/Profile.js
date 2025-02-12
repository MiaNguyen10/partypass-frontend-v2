import { Avatar, Box, IconButton, Tooltip, Typography, useMediaQuery } from '@mui/material';
import { IconPower } from '@tabler/icons';
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { roles } from '../../../../../config/Constant';
import { getUserLogin } from '../../../../../store/reducers/user/userSlice';
import { getUserInformation } from '../../../../../store/thunk/user';

export const Profile = () => {
  const customizer = useSelector((state) => state.customizer);
  const lgUp = useMediaQuery((theme) => theme.breakpoints.up('lg'));
  const hideMenu = lgUp ? customizer.isCollapse && !customizer.isSidebarHover : '';
  const dispatch = useDispatch();
  const currentUser = useSelector(getUserLogin);

  useEffect(() => {
    dispatch(getUserInformation());
  }, [dispatch]);

  return (
    <Box
      display={'flex'}
      alignItems="center"
      gap={2}
      sx={{ m: 3, p: 2, bgcolor: `${'secondary.light'}` }}
    >
      {!hideMenu ? (
        <>
          <Avatar src={currentUser.profile_pic} alt={currentUser.name} />

          <Box>
            <Typography variant="h6" color="textPrimary">
              {currentUser.name}
            </Typography>
            <Typography variant="caption" color="textSecondary">
              {roles.find((role) => role.id === currentUser.role)?.value}
            </Typography>
          </Box>
          <Box sx={{ ml: 'auto' }}>
            <Tooltip title="Logout" placement="top">
              <IconButton
                color="primary"
                component={Link}
                to="/auth/login"
                aria-label="logout"
                size="small"
              >
                <IconPower size="20" />
              </IconButton>
            </Tooltip>
          </Box>
        </>
      ) : (
        ''
      )}
    </Box>
  );
};
