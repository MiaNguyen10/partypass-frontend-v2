import { Box, CardContent, CircularProgress, Typography } from '@mui/material';
import { Stack, styled } from '@mui/system';
import dayjs from 'dayjs';
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import Breadcrumb from 'src/layouts/full/shared/breadcrumb/Breadcrumb';
import BlankCard from '../../../components/shared/BlankCard';
import { ticket_status } from '../../../config/Constant';
import { selectPurchaseInfo } from '../../../store/reducers/purchase/purchaseSlice';
import { getPurchaseById } from '../../../store/thunk/purchase';

const DetailTypo = styled(Typography)(({ theme }) => ({
  color: theme.palette.black,
  fontSize: '1rem',
}));

const PurchaseDetail = () => {
  const dispatch = useDispatch();
  const { id } = useParams();
  const purchase = useSelector(selectPurchaseInfo);

  useEffect(() => {
    dispatch(getPurchaseById(id));
  }, [dispatch, id]);

  const BCrumb = [
    {
      to: '/',
      title: 'Home',
    },
    {
      to: '/purchase',
      title: 'Purchase List',
    },
    {
      title: 'Detail',
    },
  ];

  return (
    <Box>
      <Breadcrumb title="Institution Detail" items={BCrumb} />
      {purchase ? (
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
                {purchase?.ticket_type?.name}
              </Typography>

              <Stack direction="row" ml="auto" alignItems="center">
                <Typography
                  color="textSecondary"
                  variant="subtitle2"
                  sx={{
                    ml: 1,
                  }}
                >
                  {purchase?.ticket_status && ticket_status[purchase?.ticket_status]?.value}
                </Typography>
              </Stack>
            </Box>
            <Stack direction="row" gap={6} alignItems="center" my={2}>
              <DetailTypo>
                <strong>User name:</strong> {purchase?.user?.name}
              </DetailTypo>
              <DetailTypo>
                <strong>Purchase date:</strong>{' '}
                {dayjs(purchase?.purchase_date).format('DD/MM/YYYY')}
              </DetailTypo>
            </Stack>
            {purchase?.ticket_type?.is_regular === 0 && (
              <DetailTypo>
                <strong>Ticket date:</strong>{' '}
                {dayjs(purchase?.ticket_date).format('DD/MM/YYYY')}. From{' '}
                {purchase.ticket_type.start_datetime} to {purchase.ticket_type.end_datetime}
              </DetailTypo>
            )}
            <Stack direction="row" gap={6} alignItems="center" my={2}>
              <DetailTypo>
                <strong>Payment method:</strong> {purchase?.payment_method}
              </DetailTypo>
              <DetailTypo>
                <strong>Payment status:</strong> {purchase?.payment_status}
              </DetailTypo>
              <DetailTypo>
                <strong>Price amount: </strong> {purchase?.price_amount}
              </DetailTypo>
            </Stack>
          </CardContent>
        </BlankCard>
      ) : (
        <CircularProgress />
      )}
    </Box>
  );
};

export default PurchaseDetail;
