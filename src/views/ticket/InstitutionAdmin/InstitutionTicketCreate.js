import { yupResolver } from '@hookform/resolvers/yup';
import { Grid } from '@mui/material';
import { Box } from '@mui/system';
import dayjs from 'dayjs';
import { useForm } from 'react-hook-form';
import { useDispatch } from 'react-redux';
import Breadcrumb from '../../../layouts/full/shared/breadcrumb/Breadcrumb';
import { createTicket } from '../../../store/thunk/ticket';
import schemaTicket from '../schemaTicket';
import InstitutionTicketForm from './InstitutionTicketForm';

const BCrumb = [
  {
    to: '/',
    title: 'Home',
  },
  {
    to: '/tickets_institution',
    title: 'Ticket List',
  },
  {
    title: 'Create',
  },
];

const InstitutionTicketCreate = () => {
  const dispatch = useDispatch();

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

  const onSubmit = (data) => {
    const ticketData = {
      ...data,
      institution_id: parseInt(data.institution_id, 10),
      price: parseFloat(data.price),
      capacity: parseInt(data.capacity, 10),
      is_regular: data.is_regular ? 1 : 0,
      date: data.is_regular ? "" : data.date,
      start_datetime: data.is_regular ? "" : data.start_datetime,
      end_datetime: data.is_regular ? "" : data.end_datetime,
    };
    dispatch(createTicket(ticketData));
    reset();
  };
  return (
    <Box>
      {/* breadcrumb */}
      <Breadcrumb title="Create Ticket" items={BCrumb} />
      {/* end breadcrumb */}

      <Grid container spacing={3}>
        <Grid item lg={12} md={12} xs={12}>
          <InstitutionTicketForm
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

export default InstitutionTicketCreate;
