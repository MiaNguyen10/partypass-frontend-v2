import { Box, CardContent, Typography } from '@mui/material';
import { Stack, styled } from '@mui/system';
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import Breadcrumb from 'src/layouts/full/shared/breadcrumb/Breadcrumb';
import { getTicket } from '../../../store/reducers/ticket/ticketSlice';
import { getTicketById } from '../../../store/thunk/ticket';
import { format } from 'date-fns';
import BlankCard from '../../../components/shared/BlankCard';

const DetailTypo = styled(Typography)(({ theme }) => ({
  color: theme.palette.black,
  fontSize: '1rem',
}));

const TicketDetail = () => {
  const dispatch = useDispatch();
  const { id } = useParams();
  const ticket = useSelector(getTicket);

  useEffect(() => {
    dispatch(getTicketById(id));
  }, [dispatch, id]);

  const BCrumb = [
    {
      to: '/',
      title: 'Home',
    },
    {
      to: '/tickets',
      title: 'Ticket List',
    },
    {
      title: 'Detail',
    },
  ];

  return (
    <Box>
      <Breadcrumb title="Institution Detail" items={BCrumb} />
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
              {ticket?.name}
            </Typography>

            {ticket?.is_regular === 1 && (
              <Stack direction="row" ml="auto" alignItems="center">
                <Box
                  sx={{
                    backgroundColor: (theme) => theme.palette.success.main,
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
                  Regular event
                </Typography>
              </Stack>
            )}
          </Box>
          <Stack direction="row" gap={6} alignItems="center" my={2}>
            <DetailTypo>
              <strong>Institution:</strong> {ticket?.institution_name}
            </DetailTypo>
            <DetailTypo>
              <strong>Price:</strong> {ticket?.price}
            </DetailTypo>
            <DetailTypo>
              <strong>Capacity:</strong> {ticket?.capacity}
            </DetailTypo>
          </Stack>
          {ticket?.is_regular === 0 && (
            <Stack direction="row" gap={6} alignItems="center" my={2}>
              <DetailTypo>
                <strong>Date: </strong> {format(new Date(ticket.date), 'dd/MM/yyyy')}
              </DetailTypo>
              <DetailTypo>
                <strong>Start time: </strong> {ticket.start_datetime}
              </DetailTypo>
              <DetailTypo>
                <strong>End time: </strong> {ticket.end_datetime}
              </DetailTypo>
            </Stack>
          )}
          <Stack direction="row" gap={6} alignItems="center" my={2}>
            <DetailTypo>
              <strong>Description: </strong> {ticket?.description}
            </DetailTypo>
          </Stack>
          <Stack direction="row" gap={6} alignItems="center" my={2}>
            <DetailTypo>
              <strong>Benefits: </strong> {ticket?.benefits}
            </DetailTypo>
          </Stack>
        </CardContent>
      </BlankCard>
    </Box>
  );
};

export default TicketDetail;
