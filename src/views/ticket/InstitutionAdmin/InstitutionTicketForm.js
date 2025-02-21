import { Button, FormControlLabel, MenuItem, Stack, TextField } from '@mui/material';
import { Box } from '@mui/system';
import PropTypes from 'prop-types';
import { useEffect } from 'react';
import { Controller } from 'react-hook-form';
import { useDispatch, useSelector } from 'react-redux';
import { getInstitutions } from '../../../store/reducers/institution/institutionSlice';
import { getInstitutionList } from '../../../store/thunk/institution';
import CustomCheckbox from '../../../components/forms/theme-elements/CustomCheckbox';
import { DatePicker, LocalizationProvider, TimePicker } from '@mui/x-date-pickers';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import CustomFormLabel from '../../../components/forms/theme-elements/CustomFormLabel';
import CustomTextField from '../../../components/forms/theme-elements/CustomTextField';
import ParentCard from '../../../components/shared/ParentCard';
import dayjs from 'dayjs';
import { jwtDecode } from 'jwt-decode';

const InstitutionTicketForm = ({ handleSubmit, onSubmit, control, formErrors, watch, reset }) => {
  const dispatch = useDispatch();
  const institutions = useSelector(getInstitutions);
  const { institution_id } = jwtDecode(sessionStorage.getItem("token"));

  useEffect(() => {
    dispatch(getInstitutionList());
  }, [dispatch]);

return (
    <ParentCard>
        <form onSubmit={handleSubmit(onSubmit)}>
            <Controller
                control={control}
                name="name"
                render={({ field: { onChange, value } }) => (
                    <Box width="100%">
                        <CustomFormLabel htmlFor="name">Ticket name</CustomFormLabel>
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
                name="institution_id"
                render={({ field: { onChange, value } }) => (
                    <Box width="100%">
                        <CustomFormLabel htmlFor="status">Institution</CustomFormLabel>
                        <CustomTextField
                            select
                            value={value}
                            onChange={onChange}
                            error={!!formErrors?.institution_id}
                            helperText={formErrors.institution_id && formErrors.institution_id.message}
                            variant="outlined"
                            fullWidth
                            disabled
                        >
                            <MenuItem key={institution_id} value={institution_id}>
                                {institutions.find(inst => inst.institution_id === institution_id)?.name}
                            </MenuItem>
                        </CustomTextField>
                    </Box>
                )}
            />

            <Controller
                control={control}
                name="price"
                render={({ field: { onChange, value } }) => (
                    <Box width="100%">
                        <CustomFormLabel htmlFor="price">Price</CustomFormLabel>
                        <CustomTextField
                            value={value}
                            onChange={onChange}
                            error={!!formErrors.price}
                            helperText={formErrors.price && formErrors.price.message}
                            variant="outlined"
                            fullWidth
                        />
                    </Box>
                )}
            />

            <Controller
                control={control}
                name="capacity"
                render={({ field: { onChange, value } }) => (
                    <Box width="100%">
                        <CustomFormLabel htmlFor="capacity">Capacity</CustomFormLabel>
                        <CustomTextField
                            value={value}
                            onChange={onChange}
                            error={!!formErrors.capacity}
                            helperText={formErrors.capacity && formErrors.capacity.message}
                            variant="outlined"
                            fullWidth
                        />
                    </Box>
                )}
            />

            <Controller
                control={control}
                name="is_regular"
                render={({ field: { onChange, value } }) => (
                    <Box width="100%">
                        <CustomFormLabel htmlFor="status">Regular event: </CustomFormLabel>
                        <FormControlLabel
                            control={
                                <CustomCheckbox
                                    checked={!!value || false}
                                    onChange={(e) => onChange(e.target.checked)}
                                    name="is_regular"
                                    color="primary"
                                />
                            }
                            label="Check if it is a regular event"
                        />
                    </Box>
                )}
            />
            {!watch('is_regular') && (
                <Stack direction="row" gap={2} width="100%">
                    <Controller
                        name="date"
                        control={control}
                        render={({ field: { onChange, value } }) => (
                            <Box width="100%">
                                <CustomFormLabel htmlFor="status">Date </CustomFormLabel>
                                <LocalizationProvider dateAdapter={AdapterDayjs}>
                                    <DatePicker
                                        value={value || null}
                                        onChange={onChange}
                                        inputFormat="DD/MM/YYYY"
                                        renderInput={(params) => (
                                            <TextField
                                                {...params}
                                                error={!!formErrors?.date}
                                                helperText={formErrors?.date?.message}
                                                fullWidth
                                            />
                                        )}
                                    />
                                </LocalizationProvider>
                            </Box>
                        )}
                    />

                    <Controller
                        name="start_datetime"
                        control={control}
                        render={({ field: { onChange, value } }) => (
                            <Box width="100%">
                                <CustomFormLabel htmlFor="status">Start Time</CustomFormLabel>
                                <LocalizationProvider dateAdapter={AdapterDayjs}>
                                    <TimePicker
                                        value={value ? dayjs(value, 'HH:mm') : null}
                                        onChange={(newValue) => {
                                            onChange(newValue ? newValue.format('HH:mm') : null);
                                        }}
                                        format="HH:mm:ss"
                                        renderInput={(params) => (
                                            <TextField
                                                {...params}
                                                error={!!formErrors?.start_datetime}
                                                helperText={formErrors?.start_datetime?.message}
                                                fullWidth
                                            />
                                        )}
                                    />
                                </LocalizationProvider>
                            </Box>
                        )}
                    />
                    <Controller
                        name="end_datetime"
                        control={control}
                        render={({ field: { onChange, value } }) => (
                            <Box width="100%">
                                <CustomFormLabel htmlFor="status">End Time</CustomFormLabel>
                                <LocalizationProvider dateAdapter={AdapterDayjs}>
                                    <TimePicker
                                        value={value ? dayjs(value, 'HH:mm') : null}
                                        onChange={(newValue) => {
                                            onChange(newValue ? newValue.format('HH:mm') : null);
                                        }}
                                        format="HH:mm:ss"
                                        renderInput={(params) => (
                                            <TextField
                                                {...params}
                                                error={!!formErrors?.end_datetime}
                                                helperText={formErrors?.end_datetime?.message}
                                                fullWidth
                                            />
                                        )}
                                    />
                                </LocalizationProvider>
                            </Box>
                        )}
                    />
                </Stack>
            )}

            <Controller
                control={control}
                name="description"
                render={({ field: { onChange, value } }) => (
                    <Box width="100%">
                        <CustomFormLabel htmlFor="description">Description</CustomFormLabel>
                        <CustomTextField
                            value={value}
                            onChange={onChange}
                            error={!!formErrors.description}
                            helperText={formErrors.description && formErrors.description.message}
                            variant="outlined"
                            multiline
                            rows={4}
                            fullWidth
                        />
                    </Box>
                )}
            />

            <Controller
                control={control}
                name="benefits"
                render={({ field: { onChange, value } }) => (
                    <Box width="100%">
                        <CustomFormLabel htmlFor="benefits">Benefits</CustomFormLabel>
                        <CustomTextField
                            value={value}
                            onChange={onChange}
                            error={!!formErrors.benefits}
                            helperText={formErrors.benefits && formErrors.benefits.message}
                            variant="outlined"
                            fullWidth
                            multiline
                            rows={4}
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
InstitutionTicketForm.propTypes = {
  reset: PropTypes.func.isRequired,
  handleSubmit: PropTypes.func.isRequired,
  onSubmit: PropTypes.func.isRequired,
  control: PropTypes.object.isRequired,
  formErrors: PropTypes.object.isRequired,
  watch: PropTypes.func.isRequired,
};

export default InstitutionTicketForm;
