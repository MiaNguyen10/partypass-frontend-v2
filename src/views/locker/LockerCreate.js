import { yupResolver } from '@hookform/resolvers/yup';
import { Grid } from '@mui/material';
import { Box } from '@mui/system';
import { jwtDecode } from 'jwt-decode';
import { useForm } from 'react-hook-form';
import { useDispatch } from 'react-redux';
import Breadcrumb from '../../layouts/full/shared/breadcrumb/Breadcrumb';
import { createLocker } from '../../store/thunk/locker';
import LockerForm from './LockerForm';
import schemaLocker from './schemaLocker';
import Swal from 'sweetalert2';
import { useNavigate } from 'react-router';

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
    title: 'Create',
  },
];

const LockerCreate = () => {
  const dispatch = useDispatch();
  const navigation = useNavigate();
  const { institution_id } = jwtDecode(sessionStorage.getItem('token'));

  const {
    handleSubmit,
    control,
    formState: { errors: formErrors },
    reset,
  } = useForm({
    resolver: yupResolver(schemaLocker),
    defaultValues: {
      locker_number: '',
      institution_id: '',
      status: '',
    },
  });

  const onSubmit = (data) => {
    const lockerData = {
      ...data,
      institution_id: parseInt(institution_id, 10),
    };
    dispatch(createLocker({ lockerData }))
      .then((resultAction) => {
        if (createLocker.fulfilled.match(resultAction)) {
          Swal.fire({
            icon: 'success',
            title: 'New locker created successfully',
            showConfirmButton: false,
            timer: 1500,
          }).then(() => {
            navigation('/lockers');
          });
        } else {
          Swal.fire({
            icon: 'error',
            title: 'Oops...',
            text: 'Locker creation failed!',
          });
        }
      })
      .catch((error) => {
        console.error(error);
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
          <LockerForm
            handleSubmit={handleSubmit}
            onSubmit={onSubmit}
            control={control}
            formErrors={formErrors}
            reset={reset}
          />
        </Grid>
      </Grid>
    </Box>
  );
};

export default LockerCreate;
