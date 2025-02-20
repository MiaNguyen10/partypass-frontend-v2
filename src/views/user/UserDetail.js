import { Box, CardContent, Typography } from '@mui/material';
import { Stack, styled } from '@mui/system';
import dayjs from 'dayjs';
import { useLocation } from 'react-router-dom';
import Breadcrumb from 'src/layouts/full/shared/breadcrumb/Breadcrumb';
import BlankCard from '../../components/shared/BlankCard';
import { roles } from '../../config/Constant';

const DetailTypo = styled(Typography)(({ theme }) => ({
  color: theme.palette.black,
  fontSize: '1rem',
}));

const UserDetail = () => {
  const location = useLocation();
  const {
    state: { user: userInformatioin },
  } = location;

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
              {userInformatioin?.name}
            </Typography>
          </Box>
          <Stack direction="row" gap={6} alignItems="center" my={2}>
            <DetailTypo>
              <strong>DOB:</strong> {dayjs(userInformatioin.date_of_birth).format('DD/MM/YYYY')}
            </DetailTypo>
            <DetailTypo>
              <strong>Email:</strong> {userInformatioin?.email}
            </DetailTypo>
            <DetailTypo>
              <strong>Phone:</strong> {userInformatioin?.phone}
            </DetailTypo>
          </Stack>
          <Stack direction="row" gap={6} alignItems="center" my={2}>
            <DetailTypo>
              <strong>Role: </strong>{' '}
              {userInformatioin?.role && roles[userInformatioin?.role]?.value}
            </DetailTypo>
          </Stack>
          {userInformatioin?.institution_id && (
            <Stack direction="row" gap={6} alignItems="center" my={2}>
              <DetailTypo>
                <strong>Institution: </strong> {userInformatioin?.institution_id}
              </DetailTypo>
            </Stack>
          )}
          <Stack direction="row" gap={6} alignItems="center" my={2}>
            <DetailTypo>
              <strong>Social ID: </strong>
              {userInformatioin.is_social ? userInformatioin?.social_uuid : `No Social ID`}
            </DetailTypo>
          </Stack>
          <Stack direction="row" gap={6} alignItems="center" my={2}>
            <DetailTypo>
              <strong>Profile picture: </strong>
            </DetailTypo>
            {console.log('profile_pic', userInformatioin?.profile_pic)}
            {userInformatioin?.profile_pic && (
              // <PreviewFile
              //   className={{ margin: 'auto' }}
              //   width={300}
              //   height={'auto'}
              //   files={[userInformatioin.profile_pic]}
              // />
              <img src={userInformatioin.profile_pic} alt="profile picture" width={200} />
            )}
          </Stack>
        </CardContent>
      </BlankCard>
    </Box>
  );
};

export default UserDetail;
