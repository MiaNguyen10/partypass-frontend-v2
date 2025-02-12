import { Box, CardContent, Typography } from '@mui/material';
import { Stack, styled } from '@mui/system';
import dayjs from 'dayjs';
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import Breadcrumb from 'src/layouts/full/shared/breadcrumb/Breadcrumb';
import BlankCard from '../../components/shared/BlankCard';
import { roles } from '../../config/Constant';
import { getUser } from '../../store/reducers/user/userSlice';
import { getUserById } from '../../store/thunk/user';
import PreviewFile from '../institution/PreviewFile';

const DetailTypo = styled(Typography)(({ theme }) => ({
  color: theme.palette.black,
  fontSize: '1rem',
}));

const UserDetail = () => {
  const dispatch = useDispatch();
  const { id } = useParams();
  const user = useSelector(getUser);

  useEffect(() => {
    dispatch(getUserById({ user_id: id }));
  }, [dispatch, id]);

  const BCrumb = [
    {
      to: '/',
      title: 'Home',
    },
    {
      to: '/users',
      title: 'User List',
    },
    {
      title: 'Detail',
    },
  ];

  return (
    <Box>
      <Breadcrumb title="User Detail" items={BCrumb} />
      <BlankCard>
        <CardContent>
          <Box my={3} display="flex" justifyContent="space-between" alignItems="center">
            <Typography
              gutterBottom
              variant="h2"
              fontWeight={600}
              color="inherit"
              sx={{ textDecoration: 'none' }}
            >
              {user?.name}
            </Typography>
          </Box>
          <Stack direction="row" gap={6} alignItems="center" my={2}>
            <DetailTypo>
              <strong>DOB:</strong> {dayjs(user.date_of_birth).format('DD/MM/YYYY')}
            </DetailTypo>
            <DetailTypo>
              <strong>Email:</strong> {user?.email}
            </DetailTypo>
            <DetailTypo>
              <strong>Phone:</strong> {user?.phone}
            </DetailTypo>
          </Stack>
          <Stack direction="row" gap={6} alignItems="center" my={2}>
            <DetailTypo>
              <strong>Role: </strong> {user?.role && roles[user?.role]?.value}
            </DetailTypo>
          </Stack>
          {user?.institution_id && (
            <Stack direction="row" gap={6} alignItems="center" my={2}>
              <DetailTypo>
                <strong>Institution: </strong> {user?.institution_id}
              </DetailTypo>
            </Stack>
          )}
          <Stack direction="row" gap={6} alignItems="center" my={2}>
            <DetailTypo>
              <strong>Social ID: </strong>
              {user.is_social ? user?.social_uuid : `No Social ID`}
            </DetailTypo>
          </Stack>
          <Stack direction="row" gap={6} alignItems="center" my={2}>
            <DetailTypo>
              <strong>Profile picture: </strong>
            </DetailTypo>
            {user?.profile_pic && user?.profile_pic?.length > 0 && (
              <PreviewFile
                className={{ margin: 'auto' }}
                width={300}
                height={'auto'}
                files={user.profile_pic}
              />
            )}
          </Stack>
        </CardContent>
      </BlankCard>
    </Box>
  );
};

export default UserDetail;
