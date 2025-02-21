import { Button, FormControlLabel, MenuItem, TextField } from '@mui/material';
import { Box, Stack } from '@mui/system';
import { DatePicker, LocalizationProvider } from '@mui/x-date-pickers';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import PropTypes from 'prop-types';
import { useEffect } from 'react';
import { Controller } from 'react-hook-form';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router';
import CustomCheckbox from '../../components/forms/theme-elements/CustomCheckbox';
import CustomFormLabel from '../../components/forms/theme-elements/CustomFormLabel';
import CustomTextField from '../../components/forms/theme-elements/CustomTextField';
import ParentCard from '../../components/shared/ParentCard';
import { roles, validFileExtensions } from '../../config/Constant';
import { getInstitutions } from '../../store/reducers/institution/institutionSlice';
import { getInstitutionList } from '../../store/thunk/institution';
import PreviewFile from '../institution/PreviewFile';

const UserForm = ({
  handleSubmit,
  onSubmit,
  control,
  formErrors,
  watch,
  setValue,
  reset,
  fileInputRef,
  pending,
}) => {
  const profile_pic = watch('profile_pic');
  const role = watch('role');
  const allowedExts = getAllowedExt('image');
  const institutions = useSelector(getInstitutions);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    dispatch(getInstitutionList());
  }, [dispatch]);

  function getAllowedExt(type) {
    return validFileExtensions[type].map((e) => `.${e}`).toString();
  }

  return (
    <ParentCard>
      <form onSubmit={handleSubmit(onSubmit)}>
        <Controller
          control={control}
          name="name"
          render={({ field: { onChange, value } }) => (
            <Box>
              <CustomFormLabel htmlFor="name">User name</CustomFormLabel>
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

        <Controller
          control={control}
          name="email"
          render={({ field: { onChange, value } }) => (
            <Box>
              <CustomFormLabel htmlFor="email">Email</CustomFormLabel>
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

        <Controller
          control={control}
          name="phone"
          render={({ field: { onChange, value } }) => (
            <Box>
              <CustomFormLabel htmlFor="phone">Phone</CustomFormLabel>
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

        <Controller
          name="date_of_birth"
          control={control}
          render={({ field: { onChange, value } }) => (
            <Box width="100%">
              <CustomFormLabel htmlFor="date_of_birth">Date of birth </CustomFormLabel>
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

        <Controller
          control={control}
          name="role"
          render={({ field: { onChange, value } }) => (
            <Box>
              <CustomFormLabel htmlFor="role">Role</CustomFormLabel>

              <CustomTextField
                select
                value={value}
                onChange={onChange}
                error={!!formErrors.role}
                helperText={formErrors.role && formErrors.role.message}
                variant="outlined"
                fullWidth
              >
                {roles.map((role) => (
                  <MenuItem key={role.id} value={role.id}>
                    {role.value}
                  </MenuItem>
                ))}
              </CustomTextField>
            </Box>
          )}
        />
        {role === 2 || role === 3 ? (
          <Controller
            control={control}
            name="institution_id"
            render={({ field: { onChange, value } }) => (
              <Box width="100%">
                <CustomFormLabel htmlFor="status">Institution</CustomFormLabel>
                <CustomTextField
                  select
                  value={value || ''}
                  onChange={onChange}
                  error={!!formErrors?.institution_id}
                  helperText={formErrors.institution_id && formErrors.institution_id.message}
                  variant="outlined"
                  fullWidth
                >
                  {institutions.map((institution) => (
                    <MenuItem key={institution.institution_id} value={institution.institution_id}>
                      {institution.name}
                    </MenuItem>
                  ))}
                </CustomTextField>
              </Box>
            )}
          />
        ) : null}

        <Controller
          control={control}
          name="password"
          render={({ field: { onChange, value } }) => (
            <Box>
              <CustomFormLabel htmlFor="password">Password</CustomFormLabel>
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

        <Controller
          control={control}
          name="is_social"
          render={({ field: { onChange, value } }) => (
            <Box width="100%">
              <CustomFormLabel htmlFor="status">Have Social UUID: </CustomFormLabel>
              <FormControlLabel
                control={
                  <CustomCheckbox
                    checked={value || false}
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

        {watch('is_social') && (
          <Controller
            control={control}
            name="social_uuid"
            render={({ field: { onChange, value } }) => (
              <Box>
                <CustomFormLabel htmlFor="social_uuid">Social UUID</CustomFormLabel>
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

        <CustomFormLabel htmlFor="profile_pic">
          Profile picture (Validate file: [{allowedExts}])
        </CustomFormLabel>
        <Stack direction="column" gap={2}>
          <Controller
            control={control}
            name="profile_pic"
            render={({ field }) => (
              <input
                id="images"
                type="file"
                accept={allowedExts}
                ref={fileInputRef}
                onChange={(event) => {
                  const filesArray = Array.from(event.target.files);
                  field.onChange(filesArray);
                  setValue('profile_pic', filesArray);
                }}
              />
            )}
          />

          {profile_pic && Array.isArray(profile_pic) && profile_pic.length > 0 ? (
            <PreviewFile
              className={{ margin: 'auto' }}
              width={300}
              height="auto"
              files={profile_pic}
            />
          ) : (
            profile_pic &&
            typeof profile_pic === 'string' && (
              <img src={profile_pic} alt="profile image" width={300} height="auto" />
            )
          )}
        </Stack>

        <Box mt={3}>
          <Button
            variant="contained"
            color="error"
            sx={{
              mr: 1,
            }}
            onClick={() => {
              reset();
              navigate('/users');
            }}
          >
            Cancel
          </Button>
          <Button variant="contained" color="primary" type="submit" disabled={pending}>
            Submit
          </Button>
        </Box>
      </form>
    </ParentCard>
  );
};

UserForm.propTypes = {
  reset: PropTypes.func.isRequired,
  handleSubmit: PropTypes.func.isRequired,
  onSubmit: PropTypes.func.isRequired,
  control: PropTypes.object.isRequired,
  formErrors: PropTypes.object.isRequired,
  watch: PropTypes.func.isRequired,
  setValue: PropTypes.func.isRequired,
  fileInputRef: PropTypes.object.isRequired,
  pending: PropTypes.bool.isRequired,
};

export default UserForm;
