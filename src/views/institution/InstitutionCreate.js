import { yupResolver } from '@hookform/resolvers/yup';
import { Grid } from '@mui/material';
import { Box } from '@mui/system';
import { useRef } from 'react';
import { useForm } from 'react-hook-form';
import { useDispatch } from 'react-redux';
import Breadcrumb from '../../layouts/full/shared/breadcrumb/Breadcrumb';
import { createInstitution } from '../../store/thunk/institution';
import InstitutionForm from './InstitutionForm';
import schemaInstitution from './schemaInstitution';
import Swal from 'sweetalert2';
import { useNavigate } from 'react-router';

const BCrumb = [
  {
    to: '/',
    title: 'Home',
  },
  {
    to: '/institutions',
    title: 'Institution List',
  },
  {
    title: 'Create',
  },
];

const InstitutionCreate = () => {
  const dispatch = useDispatch();
  const navigation = useNavigate();
  const fileInputRef = useRef(null);

  const {
    handleSubmit,
    control,
    formState: { errors: formErrors },
    reset,
    setValue,
    watch,
  } = useForm({
    resolver: yupResolver(schemaInstitution),
    defaultValues: {
      name: '',
      email: '',
      phone: '',
      address: '',
      map_location: '',
      details: '',
      cover_photo: '',
      video_link: '',
      status: '',
    },
  });

  const onSubmit = (data) => {
    // Create a FormData object
    const formData = new FormData();

    // Append fields to the FormData object
    formData.append('name', data.name);
    formData.append('email', data.email);
    formData.append('phone', data.phone);
    formData.append('address', data.address);
    formData.append('map_location', data.map_location);
    formData.append('details', data.details);
    formData.append('video_link', data.video_link);
    formData.append('status', data.status === 'Active' ? 1 : 0);

    // Append the image file
    if (data.cover_photo && data.cover_photo[0]) {
      formData.append('cover_photo', data.cover_photo[0]);
    }

    dispatch(createInstitution({ institutionData: formData }))
      .then(() => {
        if (fileInputRef.current) {
          fileInputRef.current.value = null;
        }
        Swal.fire({
          icon: 'success',
          title: 'New institution created successfully',
          showConfirmButton: false,
          timer: 1500,
        }).then(() => {
          navigation('/institutions');
        });
      })
      .catch((error) => {
        console.log(error);
        Swal.fire({
          icon: 'error',
          title: 'Oops...',
          text: 'Institution creation failed!',
        });
      });
    reset();
  };

  return (
    <Box>
      {/* breadcrumb */}
      <Breadcrumb title="Create Institution" items={BCrumb} />
      {/* end breadcrumb */}

      <Grid container spacing={3}>
        <Grid item lg={12} md={12} xs={12}>
          <InstitutionForm
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

export default InstitutionCreate;
