import { Box, CardContent, Typography } from '@mui/material';
import { Stack, styled } from '@mui/system';
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import Breadcrumb from 'src/layouts/full/shared/breadcrumb/Breadcrumb';
import BlankCard from '../../components/shared/BlankCard';
import { locker_status } from '../../config/Constant';
import { getLocker } from '../../store/reducers/locker/lockerSlice';
import { getLockerById } from '../../store/thunk/locker';

const DetailTypo = styled(Typography)(({ theme }) => ({
  color: theme.palette.black,
  fontSize: '1rem',
}));

const LockerDetail = () => {
  const dispatch = useDispatch();
  const { id } = useParams();
  const locker = useSelector(getLocker);

  useEffect(() => {
    dispatch(getLockerById({ locker_id: id }));
  }, [dispatch, id]);

  const BCrumb = [
    {
      to: '/',
      title: 'Home',
    },
    {
      to: '/lockers',
      title: 'Locker List',
    },
    {
      title: 'Detail',
    },
  ];

  return (
    <Box>
      <Breadcrumb title="Locker Detail" items={BCrumb} />
      <BlankCard>
        <CardContent>
          <Box my={3} display="flex" justifyContent="center">
            <Typography
              gutterBottom
              variant="h2"
              fontWeight={600}
              color="inherit"
              sx={{ textDecoration: 'none' }}
            >
              {locker?.locker_number}
            </Typography>

            <Stack direction="row" ml="auto" alignItems="center">
              <Box
                sx={{
                  backgroundColor:
                    locker?.status === 0
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
                {locker?.status === 0
                  ? locker_status[0].value
                  : locker_status[1].value}
              </Typography>
            </Stack>
          </Box>
          <Stack direction="row" gap={6} alignItems="center" my={2}>
            <DetailTypo>
              <strong>Institution:</strong> {locker?.institution?.name}
            </DetailTypo>
          </Stack>
        </CardContent>
      </BlankCard>
    </Box>
  );
};

export default LockerDetail;
