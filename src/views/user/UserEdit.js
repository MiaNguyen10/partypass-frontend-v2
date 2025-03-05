import { yupResolver } from '@hookform/resolvers/yup';
import { Grid } from '@mui/material';
import { Box } from '@mui/system';
import dayjs from 'dayjs';
import { useEffect, useRef } from 'react';
import { useForm } from 'react-hook-form';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router';
import { useNavigate } from 'react-router-dom';
import Swal from 'sweetalert2';
import { loading_status, roles } from '../../config/Constant';
import Breadcrumb from '../../layouts/full/shared/breadcrumb/Breadcrumb';
import { getUser } from '../../store/reducers/user/userSlice';
import { getUserById, updateUserById } from '../../store/thunk/user';
import schemaUser from './schemaUser';
import UserForm from './UserForm';

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
  const locationUser = useSelector(getUser);
  const navigation = useNavigate();
  const loadingStatus = useSelector((state) => state.user.loading);

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
      name: '',
      email: '',
      phone: '',
      date_of_birth: dayjs(),
      role: '',
      institution_id: '',
      is_social: false,
      social_uuid: '',
      profile_pic: null,
    },
  });

  useEffect(() => {
    if (locationUser) {
      reset({
        name: locationUser.name,
        email: locationUser.email,
        phone: locationUser.phone,
        date_of_birth: dayjs(locationUser.date_of_birth),
        role: locationUser.role,
        institution_id: locationUser.institution?.institution_id || '',
        is_social: locationUser.is_social === 1,
        social_uuid: locationUser.social_uuid,
        profile_pic: locationUser.profile_pic || [],
      });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [locationUser]);

  const onSubmit = (data) => {
    const userData = {
      ...data,
      institution_id: data.role === roles[1].id ? null : parseInt(data.institution_id, 10),
      role: parseInt(data.role, 10),
      is_social: data.is_social ? 1 : 0,
    };

    const formData = new FormData();

    Object.keys(userData).forEach((key) => {
      if (key === 'profile_pic') {
        // Handle file uploads
        if (Array.isArray(userData[key]) && userData[key].length > 0) {
          userData[key].forEach((file) => {
            formData.append(key, file);
          });
        }
      } else {
        if (key === 'date_of_birth') {
          formData.append('date_of_birth', userData[key].toISOString());
        } else {
          formData.append(key, userData[key]);
        }
      }
    });

    dispatch(updateUserById({ user_id: id, userData: formData }))
      .then((resultAction) => {
        if (updateUserById.fulfilled.match(resultAction)) {
          dispatch(getUserById({ user_id: id }));
          if (fileInputRef.current) {
            fileInputRef.current.value = null;
          }
          Swal.fire({
            icon: 'success',
            title: 'User updated successfully',
            showConfirmButton: false,
            timer: 1500,
          }).then(() => {
            navigation('/users');
          });
        } else {
          Swal.fire({
            icon: 'error',
            title: 'Oops...',
            text: 'User update failed!',
          });
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
            pending={loadingStatus === loading_status.pending}
          />
        </Grid>
      </Grid>
    </Box>
  );
};

export default UserEdit;
