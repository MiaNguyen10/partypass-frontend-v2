import { yupResolver } from '@hookform/resolvers/yup';
import { Grid } from '@mui/material';
import { Box } from '@mui/system';
import dayjs from 'dayjs';
import { useRef } from 'react';
import { useForm } from 'react-hook-form';
import { useDispatch } from 'react-redux';
import Breadcrumb from '../../layouts/full/shared/breadcrumb/Breadcrumb';
import { createUser } from '../../store/thunk/user';
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
      title: 'Create',
    },
  ];

const UserCreate = () => {
  const dispatch = useDispatch();
  const fileInputRef = useRef(null);

  const {
    handleSubmit,
    control,
    formState: { errors: formErrors },
    reset,
    setValue,
    watch,
  } = useForm({
    resolver: yupResolver(schemaUser),
    defaultValues: {
        name: "",
        email: "",
        phone: "",
        date_of_birth: dayjs(),
        password: "",
        role: "",
        institution_id: null,
        is_social: false,
        social_uuid: "",
        profile_pic: [],
    },
  });

  const onSubmit = (data) => {
    // Create a FormData object
    const formData = new FormData();

    // Convert numeric and boolean fields
    formData.append("name", data.name);
    formData.append("email", data.email);
    formData.append("phone", data.phone);
    formData.append("date_of_birth", data.date_of_birth.toISOString());
    formData.append("password", data.password);
    formData.append("role", parseInt(data.role, 10));
    formData.append("institution_id", parseInt(data.institution_id, 10));
    formData.append("is_social", data.is_social ? 1 : 0);
    formData.append("social_uuid", data.social_uuid);

    // Append the image file
    if (data.profile_pic && data.profile_pic[0]) {
        formData.append("profile_pic", data.profile_pic[0]);
      }

    dispatch(createUser({ userData : formData })).then(() => {
        if (fileInputRef.current) {
          fileInputRef.current.value = null;
        }
      });
      reset();
  };

  return (
    <Box>
      {/* breadcrumb */}
      <Breadcrumb title="Create User" items={BCrumb} />
      {/* end breadcrumb */}

      <Grid container spacing={3}>
        <Grid item lg={12} md={12} xs={12}>
          <UserForm
            handleSubmit={handleSubmit}
            onSubmit={onSubmit}
            control={control}
            formErrors={formErrors}
            watch={watch}
            setValue={setValue}
            fileInputRef={fileInputRef}
            reset={reset}
          />
        </Grid>
      </Grid>
    </Box>
  );
};

export default UserCreate;
