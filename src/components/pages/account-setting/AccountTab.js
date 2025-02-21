import {
  Box,
  Button,
  CardContent,
  FormControlLabel,
  Grid,
  Stack,
  TextField,
  Typography,
} from '@mui/material';

// components
import CustomFormLabel from '../../forms/theme-elements/CustomFormLabel';
import CustomTextField from '../../forms/theme-elements/CustomTextField';
import BlankCard from '../../shared/BlankCard';

// images
import { yupResolver } from '@hookform/resolvers/yup';
import { DatePicker, LocalizationProvider } from '@mui/x-date-pickers';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import dayjs from 'dayjs';
import { useEffect, useRef } from 'react';
import { Controller, useForm } from 'react-hook-form';
import { useDispatch, useSelector } from 'react-redux';
import Swal from 'sweetalert2';
import { roles, validFileExtensions } from '../../../config/Constant';
import { getUserLogin } from '../../../store/reducers/user/userSlice';
import { getUserInformation, updateUser } from '../../../store/thunk/user';
import PreviewFile from '../../../views/institution/PreviewFile';
import schemaUser from '../../../views/user/schemaUser';
import CustomCheckbox from '../../forms/theme-elements/CustomCheckbox';

const AccountTab = () => {
  const dispatch = useDispatch();
  const userInfo = useSelector(getUserLogin);
  const fileInputRef = useRef(null);

  useEffect(() => {
    dispatch(getUserInformation());
  }, [dispatch]);

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
      profile_pic: [],
    },
  });

  useEffect(() => {
    if (userInfo) {
      reset({
        name: userInfo.name,
        email: userInfo.email,
        phone: userInfo.phone,
        date_of_birth: dayjs(userInfo.date_of_birth),
        role: userInfo.role,
        institution: userInfo.institution.name || '',
        is_social: userInfo.is_social,
        social_uuid: userInfo.social_uuid,
        profile_pic: userInfo.profile_pic || [],
      });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [userInfo]);

  const onSubmit = (data) => {
    const userData = {
      ...data,
      institution_id: parseInt(data.institution_id, 10),
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
        formData.append(key, userData[key]);
      }
    });

    dispatch(updateUser({ userData: formData }))
      .then(() => {
        dispatch(getUserInformation());
        // Reset the file input
        if (fileInputRef.current) {
          fileInputRef.current.value = null;
        }
        Swal.fire({
          icon: 'success',
          title: 'Success',
          text: 'User has been updated',
        });
      })
      .catch((error) => {
        console.error(error);
        Swal.fire({
          icon: 'error',
          title: 'Oops...',
          text: 'User update failed!',
        });
      });
  };

  function getAllowedExt(type) {
    return validFileExtensions[type].map((e) => `.${e}`).toString();
  }

  const profile_pic = watch('profile_pic');
  const role = watch('role');
  const allowedExts = getAllowedExt('image');

  return (
    <Grid>
      <form onSubmit={handleSubmit(onSubmit)}>
        {/* Edit Details */}
        <Grid item xs={12}>
          <BlankCard>
            <CardContent>
              <Typography variant="h5" mb={1}>
                Personal Details
              </Typography>
              <Typography color="textSecondary" mb={3}>
                To change your personal detail , edit and save from here
              </Typography>
              <Grid container spacing={3}>
                <Grid item xs={12} sm={6}>
                  <Controller
                    name="name"
                    control={control}
                    render={({ field: { onChange, value } }) => (
                      <Box>
                        <CustomFormLabel
                          sx={{
                            mt: 0,
                          }}
                          htmlFor="text-name"
                        >
                          Your Name
                        </CustomFormLabel>
                        <CustomTextField
                          value={value}
                          onChange={onChange}
                          error={!!formErrors.name}
                          helperText={formErrors.name && formErrors.name.message}
                          variant="outlined"
                          fullWidth
                        />
                      </Box>
                    )}
                  />
                </Grid>
                <Grid item xs={12} sm={6}>
                  <Controller
                    name="password"
                    control={control}
                    render={({ field: { onChange, value } }) => (
                      <Box>
                        <CustomFormLabel
                          sx={{
                            mt: 0,
                          }}
                          htmlFor="password"
                        >
                          Password
                        </CustomFormLabel>
                        <CustomTextField
                          type="password"
                          value={value}
                          onChange={onChange}
                          error={!!formErrors.password}
                          helperText={formErrors.password && formErrors.password.message}
                          variant="outlined"
                          fullWidth
                        />
                      </Box>
                    )}
                  />
                </Grid>
                <Grid item xs={12} sm={6}>
                  <Controller
                    control={control}
                    name="email"
                    render={({ field: { onChange, value } }) => (
                      <Box>
                        <CustomFormLabel
                          sx={{
                            mt: 0,
                          }}
                          htmlFor="email"
                        >
                          Email
                        </CustomFormLabel>
                        <CustomTextField
                          value={value}
                          onChange={onChange}
                          error={!!formErrors.email}
                          helperText={formErrors.email && formErrors.email.message}
                          type="email"
                          variant="outlined"
                          fullWidth
                        />
                      </Box>
                    )}
                  />
                </Grid>
                <Grid item xs={12} sm={6}>
                  <Controller
                    control={control}
                    name="phone"
                    render={({ field: { onChange, value } }) => (
                      <Box>
                        <CustomFormLabel
                          sx={{
                            mt: 0,
                          }}
                          htmlFor="phone"
                        >
                          Phone
                        </CustomFormLabel>
                        <CustomTextField
                          value={value}
                          onChange={onChange}
                          error={!!formErrors.phone}
                          helperText={formErrors.phone && formErrors.phone.message}
                          variant="outlined"
                          fullWidth
                        />
                      </Box>
                    )}
                  />
                </Grid>
                <Grid item xs={12} sm={6}>
                  {/* 4 */}
                  <Controller
                    name="date_of_birth"
                    control={control}
                    render={({ field: { onChange, value } }) => (
                      <Box width="100%">
                        <CustomFormLabel
                          sx={{
                            mt: 0,
                          }}
                          htmlFor="date_of_birth"
                        >
                          Date of birth
                        </CustomFormLabel>
                        <LocalizationProvider dateAdapter={AdapterDayjs}>
                          <DatePicker
                            value={value || null}
                            onChange={onChange}
                            inputFormat="DD/MM/YYYY"
                            renderInput={(params) => (
                              <TextField
                                {...params}
                                error={!!formErrors?.date_of_birth}
                                helperText={formErrors?.date_of_birth?.message}
                                fullWidth
                              />
                            )}
                          />
                        </LocalizationProvider>
                      </Box>
                    )}
                  />
                </Grid>
                <Grid item xs={12} sm={6}>
                  {/* 5 */}
                  <Controller
                    control={control}
                    name="role"
                    render={({ field: { onChange, value } }) => (
                      <Box>
                        <CustomFormLabel
                          sx={{
                            mt: 0,
                          }}
                          htmlFor="role"
                        >
                          Role
                        </CustomFormLabel>
                        <CustomTextField
                          value={roles[value]?.value}
                          onChange={onChange}
                          error={!!formErrors.role}
                          helperText={formErrors.role && formErrors.role.message}
                          variant="outlined"
                          fullWidth
                          disabled
                        />
                      </Box>
                    )}
                  />
                </Grid>
                {
                  // If the user is an institutional admin/ staff, show the institution field
                  role === 2 || role === 3 ? (
                    <Grid item xs={12} sm={6}>
                      <Controller
                        control={control}
                        name="institution_id"
                        render={({ field: { onChange, value } }) => (
                          <Box>
                            <CustomFormLabel
                              sx={{
                                mt: 0,
                              }}
                              htmlFor="institution_id"
                            >
                              Institution
                            </CustomFormLabel>
                            <CustomTextField
                              value={value}
                              onChange={onChange}
                              error={!!formErrors.institution_id}
                              helperText={
                                formErrors.institution_id && formErrors.institution_id.message
                              }
                              variant="outlined"
                              fullWidth
                              disabled
                            />
                          </Box>
                        )}
                      />
                    </Grid>
                  ) : null
                }
                <Grid item xs={12}>
                  <Box>
                    <Controller
                      control={control}
                      name="is_social"
                      render={({ field: { onChange, value } }) => (
                        <Box width="100%">
                          <CustomFormLabel sx={{ mt: 0 }} htmlFor="check-social">
                            Have Social UUID:
                          </CustomFormLabel>
                          <FormControlLabel
                            control={
                              <CustomCheckbox
                                checked={!!value} // Convert value to boolean
                                onChange={(e) => onChange(e.target.checked)}
                                name="is_social"
                                color="primary"
                              />
                            }
                            label="Check if user have Social UUID"
                          />
                        </Box>
                      )}
                    />

                    {watch('is_social') == 1 && (
                      <Controller
                        control={control}
                        name="social_uuid"
                        render={({ field: { onChange, value } }) => (
                          <Box>
                            <CustomFormLabel
                              sx={{
                                mt: 0,
                              }}
                              htmlFor="social_uuid"
                            >
                              Social UUID
                            </CustomFormLabel>
                            <CustomTextField
                              value={value}
                              onChange={onChange}
                              error={!!formErrors.social_uuid}
                              helperText={formErrors.social_uuid && formErrors.social_uuid.message}
                              variant="outlined"
                              fullWidth
                            />
                          </Box>
                        )}
                      />
                    )}
                  </Box>
                </Grid>
                <Grid item xs={12}>
                  <CustomFormLabel
                    sx={{
                      mt: 0,
                    }}
                    htmlFor="profile_pic"
                  >
                    Profile picture
                  </CustomFormLabel>
                  <Box textAlign="center" display="flex" justifyContent="center">
                    <Controller
                      control={control}
                      name="profile_pic"
                      render={({ field }) => (
                        <Box>
                          {profile_pic && Array.isArray(profile_pic) && profile_pic.length > 0 ? (
                            <PreviewFile
                              className={{ margin: '0 auto' }}
                              width={120}
                              height="120"
                              files={profile_pic}
                            />
                          ) : (
                            profile_pic &&
                            typeof profile_pic === 'string' && (
                              <img
                                src={profile_pic}
                                alt="profile image"
                                width={120}
                                height={120}
                                style={{ margin: '0 auto' }}
                              />
                            )
                          )}
                          <Stack direction="row" justifyContent="center" spacing={2} my={3}>
                            <Button variant="contained" color="primary" component="label">
                              Upload
                              <input
                                id="images"
                                type="file"
                                hidden
                                accept={allowedExts}
                                ref={fileInputRef}
                                onChange={(event) => {
                                  const filesArray = Array.from(event.target.files);
                                  field.onChange(filesArray);
                                  setValue('profile_pic', filesArray);
                                }}
                              />
                            </Button>
                            <Button
                              variant="outlined"
                              color="error"
                              onClick={() => setValue('profile_pic', userInfo.profile_pic || [])}
                            >
                              Reset
                            </Button>
                          </Stack>
                          <Typography variant="subtitle1" color="textSecondary" mb={4}>
                            Validate file: [{allowedExts}]
                          </Typography>
                        </Box>
                      )}
                    />
                  </Box>
                </Grid>
                <Grid item xs={12}>
                  <Stack direction="row" spacing={2} sx={{ justifyContent: 'end' }} mt={3}>
                    <Button size="large" variant="contained" color="primary" type="submit">
                      Save
                    </Button>
                    <Button size="large" variant="text" color="error" onClick={() => reset()}>
                      Cancel
                    </Button>
                  </Stack>
                </Grid>
              </Grid>
            </CardContent>
          </BlankCard>
        </Grid>
      </form>
    </Grid>
  );
};

export default AccountTab;
