import { yupResolver } from '@hookform/resolvers/yup';
import { Grid } from '@mui/material';
import { Box } from '@mui/system';
import { jwtDecode } from 'jwt-decode';
import { useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router';
import { locker_status } from '../../config/Constant';
import { getLocker } from '../../store/reducers/locker/lockerSlice';
import { getLockerById, updateLocker } from '../../store/thunk/locker';
import LockerForm from './LockerForm';
import schemaLocker from './schemaLocker';
import Breadcrumb from '../../layouts/full/shared/breadcrumb/Breadcrumb';

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
    title: 'Edit',
  },
];

const LockerEdit = () => {
  const { id } = useParams();
  const dispatch = useDispatch();
  const locker = useSelector(getLocker);
  const { institution_id } = jwtDecode(sessionStorage.getItem('token'));

  useEffect(() => {
    dispatch(getLockerById({ locker_id: id }));
  }, [dispatch, id]);

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

  useEffect(() => {
    if (locker) {
      reset({
        locker_number: locker?.locker_number || '',
        institution_id: locker?.institution_id || '',
        status: locker_status[locker?.status]?.value|| '',
      });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [locker]);

  const onSubmit = (data) => {
    const lockerData = {
      ...data,
      institution_id: institution_id,
    };
    dispatch(updateLocker({ locker_id: id, lockerData }))
      .then(() => {
        dispatch(getLockerById({ locker_id: id }));
      })
      .catch((error) => {
        console.error(error);
      });
  };

  return (
    <Box>
      {/* breadcrumb */}
      <Breadcrumb title="Edit Locker" items={BCrumb} />
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

export default LockerEdit;
