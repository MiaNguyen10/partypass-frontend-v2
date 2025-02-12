import { yupResolver } from '@hookform/resolvers/yup';
import { Grid } from '@mui/material';
import { Box } from '@mui/system';
import dayjs from 'dayjs';
import { useEffect, useRef } from 'react';
import { useForm } from 'react-hook-form';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router';
import { getUser } from '../../store/reducers/user/userSlice';
import { getUserById, updateUser } from '../../store/thunk/user';
import schemaUser from './schemaUser';
import UserForm from './UserForm';
import Breadcrumb from '../../layouts/full/shared/breadcrumb/Breadcrumb';

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
      title: 'Edit',
    },
  ];

const UserEdit = () => {
  const { id } = useParams();
  const dispatch = useDispatch();
  const user = useSelector(getUser);
  const fileInputRef = useRef(null);

  useEffect(() => {
    dispatch(getUserById({ user_id: id }));
  }, [dispatch, id]);

  const {
    handleSubmit,
    control,
    formState: { errors: formErrors },
    reset,
    watch,
    setValue,
  } = useForm({
    resolver: yupResolver(schemaUser),
    defaultValues: {
        name: "",
        email: "",
        phone: "",
        date_of_birth: dayjs(),
        role: "",
        institution_id: "",
        is_social: false,
        social_uuid: "",
        profile_pic: [],
    },
  });

  useEffect(() => {
    if (user) {
      reset({
        name: user.name,
        email: user.email,
        phone: user.phone,
        date_of_birth: dayjs(user.date_of_birth),
        role: user.role,
        institution_id: user.institution_id || '',
        is_social: user.is_social,
        social_uuid: user.social_uuid,
        profile_pic: user.profile_pic || [],
      });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [user]);

  const onSubmit = (data) => {
    const userData = {
      ...data,
      institution_id: parseInt(data.institution_id, 10),
      role: parseInt(data.role, 10),
    }
    dispatch(updateUser({ user_id: id, userData: userData }))
      .then(() => {
        dispatch(getUserById({ user_id: id }));
        // Reset the file input
        if (fileInputRef.current) {
            fileInputRef.current.value = null;
          }
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
          <UserForm
            handleSubmit={handleSubmit}
            onSubmit={onSubmit}
            control={control}
            formErrors={formErrors}
            watch={watch}
            reset={reset}
            setValue={setValue}
            fileInputRef={fileInputRef}
          />
        </Grid>
      </Grid>
    </Box>
  );
};

export default UserEdit;
