import { yupResolver } from '@hookform/resolvers/yup';
import { Grid } from '@mui/material';
import { Box } from '@mui/system';
import { useEffect, useRef } from 'react';
import { useForm } from 'react-hook-form';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate, useParams } from 'react-router';
import { institution_status } from '../../config/Constant';
import Breadcrumb from '../../layouts/full/shared/breadcrumb/Breadcrumb';
import { getInstitution } from '../../store/reducers/institution/institutionSlice';
import { getInstitutionById, updateInstitution } from '../../store/thunk/institution';
import InstitutionForm from './InstitutionForm';
import schemaInstitution from './schemaInstitution';
import Swal from 'sweetalert2';

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
    title: 'Edit',
  },
];

const InstitutionEdit = () => {
  const { id } = useParams();
  const dispatch = useDispatch();
  const navigation = useNavigate();
  const institution = useSelector(getInstitution);
  const fileInputRef = useRef(null);

  useEffect(() => {
    dispatch(getInstitutionById(id));
  }, [dispatch, id]);

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

  useEffect(() => {
    if (institution) {
      reset({
        name: institution.name || '',
        email: institution.email || '',
        phone: institution.phone || '',
        address: institution.address || '',
        map_location: institution.map_location || '',
        details: institution.details || '',
        cover_photo: institution.cover_photo || '',
        video_link: institution.video_link || '',
        status:
          institution.status === 0
            ? institution_status[0].value
            : institution_status[1].value || '',
      });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [institution]);

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

    // Handle cover_photo (file or URL)
    if (data.cover_photo) {
      if (data.cover_photo[0] instanceof File) {
        formData.append('cover_photo', data.cover_photo[0]); // If it's a file
      } else if (typeof data.cover_photo === 'string') {
        formData.append('cover_photo', data.cover_photo); // If it's a URL
      }
    }

    dispatch(updateInstitution({ institutionData: formData, institution_id: id }))
      .then((resultAction) => {
        if (updateInstitution.fulfilled.match(resultAction)) {
          // Fetch updated institution data
          dispatch(getInstitutionById(id));

          // Reset the file input if successful
          if (fileInputRef.current) {
            fileInputRef.current.value = null;
          }

          Swal.fire({
            icon: 'success',
            title: 'Institution updated successfully',
            showConfirmButton: false,
            timer: 1500,
          }).then(() => {
            navigation('/institutions');
          });
        } else {
          // Trigger catch block manually if rejected
          Swal.fire({
            icon: 'error',
            title: 'Oops...',
            text: resultAction.payload?.message || 'Institution update failed!',
          });
        }
      })
      .catch((error) => {
        console.error('Institution update failed:', error);
      });
  };

  return (
    <Box>
      {/* breadcrumb */}
      <Breadcrumb title="Edit Institution" items={BCrumb} />
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

export default InstitutionEdit;
