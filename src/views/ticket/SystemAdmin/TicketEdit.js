import { yupResolver } from '@hookform/resolvers/yup';
import { Grid } from '@mui/material';
import { Box } from '@mui/system';
import dayjs from 'dayjs';
import { useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate, useParams } from 'react-router';
import Swal from 'sweetalert2';
import Breadcrumb from '../../../layouts/full/shared/breadcrumb/Breadcrumb';
import { getTicket } from '../../../store/reducers/ticket/ticketSlice';
import { getTicketById, updateTicket } from '../../../store/thunk/ticket';
import schemaTicket from '../schemaTicket';
import TicketForm from './TicketForm';

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
    title: 'Edit',
  },
];

const TicketEdit = () => {
  const { id } = useParams();
  const dispatch = useDispatch();
  const ticket = useSelector(getTicket);
  const navigation = useNavigate();

  useEffect(() => {
    dispatch(getTicketById(id));
  }, [dispatch, id]);

  const {
    handleSubmit,
    control,
    formState: { errors: formErrors },
    reset,
    watch,
  } = useForm({
    resolver: yupResolver(schemaTicket),
    defaultValues: {
      name: '',
      description: '',
      institution_id: '',
      price: 0, // or default to a numeric value if desired
      capacity: 0, // same as price
      benefits: '',
      is_regular: false,
      date: dayjs(),
      start_datetime: dayjs(),
      end_datetime: dayjs(),
    },
  });

  useEffect(() => {
    if (ticket) {
      reset({
        name: ticket.name,
        description: ticket.description,
        institution_id: ticket.institution_id,
        price: ticket.price,
        capacity: ticket.capacity,
        benefits: ticket.benefits,
        is_regular: ticket.is_regular,
        date: ticket.is_regular ? '' : dayjs(ticket.date),
        start_datetime: ticket.is_regular ? '' : ticket.start_datetime,
        end_datetime: ticket.is_regular ? '' : ticket.end_datetime,
      });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [ticket]);

  const onSubmit = (data) => {
    const ticketData = {
      ...data,
      institution_id: parseInt(data.institution_id, 10),
      price: parseFloat(data.price),
      capacity: parseInt(data.capacity, 10),
      is_regular: data.is_regular ? 1 : 0,
      date: data.is_regular ? '' : data.date,
      start_datetime: data.is_regular ? '' : data.start_datetime,
      end_datetime: data.is_regular ? '' : data.end_datetime,
    };

    dispatch(updateTicket({ ticket_id: id, ticketData }))
      .then(() => {
        dispatch(getTicketById(id));
        Swal.fire({
          icon: 'success',
          title: 'Ticket updated successfully',
          showConfirmButton: false,
          timer: 1500,
        }).then(() => {
          navigation('/tickets');
        });
      })
      .catch((error) => {
        console.error(error);
      });
  };

  return (
    <Box>
      {/* breadcrumb */}
      <Breadcrumb title="Edit Ticket" items={BCrumb} />
      {/* end breadcrumb */}

      <Grid container spacing={3}>
        <Grid item lg={12} md={12} xs={12}>
          <TicketForm
            handleSubmit={handleSubmit}
            onSubmit={onSubmit}
            control={control}
            formErrors={formErrors}
            watch={watch}
            reset={reset}
          />
        </Grid>
      </Grid>
    </Box>
  );
};

export default TicketEdit;
