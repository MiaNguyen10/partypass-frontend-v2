import { Button, MenuItem } from '@mui/material';
import { Box } from '@mui/system';
import { jwtDecode } from 'jwt-decode';
import PropTypes from 'prop-types';
import { useEffect } from 'react';
import { Controller } from 'react-hook-form';
import { useDispatch, useSelector } from 'react-redux';
import { locker_status } from '../../config/Constant';
import { getInstitution } from '../../store/reducers/institution/institutionSlice';
import { getInstitutionById } from '../../store/thunk/institution';
import ParentCard from '../../components/shared/ParentCard';
import CustomFormLabel from '../../components/forms/theme-elements/CustomFormLabel';
import CustomTextField from '../../components/forms/theme-elements/CustomTextField';

const LockerForm = ({ handleSubmit, onSubmit, control, formErrors, reset }) => {
  const dispatch = useDispatch();
  const { institution_id } = jwtDecode(sessionStorage.getItem('token'));
  const institution = useSelector(getInstitution);

  useEffect(() => {
    dispatch(getInstitutionById(institution_id));
  }, [dispatch, institution_id]);

  return (
    <ParentCard>
      <form onSubmit={handleSubmit(onSubmit)}>
        <Controller
          control={control}
          name="locker_number"
          render={({ field: { onChange, value } }) => (
            <Box width="100%">
              <CustomFormLabel htmlFor="locker_number">Locker number</CustomFormLabel>
              <CustomTextField
                value={value}
                onChange={onChange}
                error={!!formErrors.locker_number}
                helperText={formErrors.locker_number && formErrors.locker_number.message}
                variant="outlined"
                fullWidth
              />
            </Box>
          )}
        />

        <Controller
          control={control}
          name="status"
          render={({ field: { onChange, value } }) => (
            <Box width="100%">
              <CustomFormLabel htmlFor="status">Status</CustomFormLabel>
              <CustomTextField
                select
                value={value}
                onChange={onChange}
                error={!!formErrors?.status}
                helperText={formErrors.status && formErrors.status.message}
                variant="outlined"
                fullWidth
              >
                {locker_status.map((status) => (
                  <MenuItem key={status.id} value={status.value}>
                    {status.value}
                  </MenuItem>
                ))}
              </CustomTextField>
            </Box>
          )}
        />

        <Controller
          control={control}
          name="institution_id"
          render={({ field: { onChange } }) => (
            <Box width="100%">
              <CustomFormLabel htmlFor="price">Institution</CustomFormLabel>
              <CustomTextField
                value={institution?.name}
                onChange={onChange}
                error={!!formErrors.institution_id}
                helperText={formErrors.institution_id && formErrors.institution_id.message}
                variant="outlined"
                fullWidth
              />
            </Box>
          )}
        />

        <Box mt={3} width="100%">
          <Button
            variant="contained"
            color="error"
            sx={{
              mr: 1,
            }}
            onClick={() => reset()}
          >
            Cancel
          </Button>
          <Button variant="contained" color="primary" type="submit">
            Submit
          </Button>
        </Box>
      </form>
    </ParentCard>
  );
};
LockerForm.propTypes = {
  reset: PropTypes.func.isRequired,
  handleSubmit: PropTypes.func.isRequired,
  onSubmit: PropTypes.func.isRequired,
  control: PropTypes.object.isRequired,
  formErrors: PropTypes.object.isRequired,
};

export default LockerForm;
