import { Box, CardContent, CardMedia, Link, Typography } from '@mui/material';
import { Stack, styled } from '@mui/system';
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import Breadcrumb from 'src/layouts/full/shared/breadcrumb/Breadcrumb';
import BlankCard from '../../components/shared/BlankCard';
import { institution_status, roles } from '../../config/Constant';
import { getInstitution } from '../../store/reducers/institution/institutionSlice';
import { getInstitutionById } from '../../store/thunk/institution';
import MapComponent from './MapComponent';
import RestrictedPermission from '../../middlewares/PermissionProvider/RestrictedPermission';

const DetailTypo = styled(Typography)(({ theme }) => ({
  color: theme.palette.black,
  fontSize: '1rem',
}));

const InstitutionDetail = () => {
  const dispatch = useDispatch();
  const { id } = useParams();
  const institution = useSelector(getInstitution);

  useEffect(() => {
    dispatch(getInstitutionById(id));
  }, [dispatch, id]);

  const BCrumb = [
    {
      to: '/',
      title: 'Home',
    },
    {
      to: '/institutions',
      title: 'Institution List',
    },
    {
      title: 'Detail',
    },
  ];

  

  return (
    <Box>
      <Breadcrumb title="Institution Detail" items={BCrumb} />
      <BlankCard>
        {institution.cover_photo ? (
          <CardMedia
            component="img"
            image={institution.cover_photo}
            alt={institution.name}
            sx={{ height: 400 }}
          />
        ) : null}
        <CardContent>
          <Box my={3} display="flex" justifyContent="center">
            <Typography
              gutterBottom
              variant="h2"
              fontWeight={600}
              color="inherit"
              sx={{ textDecoration: 'none' }}
            >
              {institution?.name}
            </Typography>

            <Stack direction="row" ml="auto" alignItems="center">
              <Box
                sx={{
                  backgroundColor:
                    institution.status === 0
                      ? (theme) => theme.palette.error.main
                      : (theme) => theme.palette.success.main,
                  borderRadius: '100%',
                  height: '10px',
                  width: '10px',
                }}
              />
              <Typography
                color="textSecondary"
                variant="subtitle2"
                sx={{
                  ml: 1,
                }}
              >
                {institution.status === 0
                  ? institution_status[0].value
                  : institution_status[1].value}
              </Typography>
            </Stack>
          </Box>
          <Stack direction="row" gap={6} alignItems="center" my={2}>
            <DetailTypo>
              <strong>Email:</strong> {institution?.email}
            </DetailTypo>
            <DetailTypo>
              <strong>Phone:</strong> {institution?.phone}
            </DetailTypo>
            <DetailTypo>
              <strong>Address:</strong> {institution?.address}
            </DetailTypo>
          </Stack>
          <Stack direction="row" gap={6} alignItems="center" my={2}>
            <DetailTypo>
              <strong>Detail: </strong> {institution?.details}
            </DetailTypo>
          </Stack>
          <Stack direction="column" my={2}>
            <DetailTypo>
              <strong>Map location: </strong>
            </DetailTypo>
            {institution.map_location ? (
              <MapComponent mapUrl={institution.map_location} />
            ) : (
              <DetailTypo>No map location</DetailTypo>
            )}
          </Stack>
          <Stack direction="row" gap={6} alignItems="center" my={2}>
            <DetailTypo>
              <strong>Video link:</strong>{' '}
              {institution.video_link ? (
                <Link
                  href={institution.video_link}
                  underline="hover"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  Press here to open video
                </Link>
              ) : (
                <DetailTypo>No video</DetailTypo>
              )}
            </DetailTypo>
          </Stack>
          <RestrictedPermission allowedRoles={[roles[1].value]}>
            <Stack direction="row" gap={6} alignItems="center" my={2}>
              <DetailTypo>
                <strong>Locker page:</strong>{' '}
                <Link
                  href={`/institutions/${id}/lockers`}
                  underline="hover"
                  rel="noopener noreferrer"
                >
                  Press here to open Locker
                </Link>
              </DetailTypo>
            </Stack>
          </RestrictedPermission>
        </CardContent>
      </BlankCard>
    </Box>
  );
};

export default InstitutionDetail;
