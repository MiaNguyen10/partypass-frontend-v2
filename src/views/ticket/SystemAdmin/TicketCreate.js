import { yupResolver } from '@hookform/resolvers/yup';
import { Grid } from '@mui/material';
import { Box } from '@mui/system';
import { jwtDecode } from 'jwt-decode';
import { useForm } from 'react-hook-form';
import { useDispatch } from 'react-redux';
import Breadcrumb from '../../../layouts/full/shared/breadcrumb/Breadcrumb';
import { createTicket } from '../../../store/thunk/ticket';
import schemaLocker from '../../locker/schemaLocker';
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
    title: 'Create',
  },
];

const TicketCreate = () => {
  const dispatch = useDispatch();
  const { institution_id } = jwtDecode(sessionStorage.getItem('token'));

  const {
    handleSubmit,
    control,
    formState: { errors: formErrors },
    reset,
    watch,
  } = useForm({
    resolver: yupResolver(schemaLocker),
    defaultValues: {
      locker_number: '',
      institution_id: '',
      status: '',
    },
  });

  const onSubmit = (data) => {
    const ticketData = {
      ...data,
      institution_id: parseInt(institution_id, 10),
      price: parseFloat(data.price),
      capacity: parseInt(data.capacity, 10),
      is_regular: data.is_regular ? 1 : 0,
      date: data.is_regular ? '' : data.date,
      start_datetime: data.is_regular ? '' : data.start_datetime,
      end_datetime: data.is_regular ? '' : data.end_datetime,
    };
    dispatch(createTicket(ticketData)).catch((error) => {
      console.log(error);
    });
    reset();
  };

  return (
    <Box>
      {/* breadcrumb */}
      <Breadcrumb title="Create Ticket" items={BCrumb} />
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

export default TicketCreate;
