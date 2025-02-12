import { Button, MenuItem } from '@mui/material';
import PropTypes from 'prop-types';
import { Box, Stack } from '@mui/system';
import ParentCard from '../../components/shared/ParentCard';
import CustomFormLabel from '../../components/forms/theme-elements/CustomFormLabel';
import CustomTextField from '../../components/forms/theme-elements/CustomTextField';
import { institution_status, validFileExtensions } from '../../config/Constant';
import MapComponent from './MapComponent';
import PreviewFile from './PreviewFile';
import { Controller } from 'react-hook-form';

const InstitutionForm = ({
  handleSubmit,
  onSubmit,
  control,
  formErrors,
  watch,
  setValue,
  fileInputRef,
  reset,
}) => {
  //map location
  const extractIframeSrcUrl = (iframeHtml) => {
    // Check if the input is already a URL or does not contain iframe structure
    if (iframeHtml.startsWith('http') || !iframeHtml.includes('<iframe')) {
      return iframeHtml; // Assume it's already the extracted URL
    }
    // Use a regular expression to match the src attribute
    const srcMatch = iframeHtml.match(/src="([^"]+)"/);
    // Return the URL if found, otherwise return null
    setValue('map_location', srcMatch ? srcMatch[1] : null);
  };

  // images
  const cover_photo = watch('cover_photo');
  const allowedExts = getAllowedExt('image');

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
              <CustomFormLabel htmlFor="name">Institution name</CustomFormLabel>
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
          name="status"
          render={({ field: { onChange, value } }) => (
            <Box>
              <CustomFormLabel htmlFor="status">Status</CustomFormLabel>
              <CustomTextField
                select
                value={value}
                onChange={onChange}
                error={!!formErrors.status}
                helperText={formErrors.status && formErrors.status.message}
                variant="outlined"
                fullWidth
              >
                {institution_status.map((status) => (
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
          control={control}
          name="address"
          render={({ field: { onChange, value } }) => (
            <Box>
              <CustomFormLabel htmlFor="address">Address</CustomFormLabel>
              <CustomTextField
                value={value}
                onChange={onChange}
                error={!!formErrors.address}
                helperText={formErrors.address && formErrors.address.message}
                variant="outlined"
                fullWidth
              />
            </Box>
          )}
        />

        <CustomFormLabel htmlFor="map_location">Map location</CustomFormLabel>
        <Controller
          control={control}
          name="map_location"
          render={({ field: { onChange, value } }) => (
            <Stack direction="column" spacing={2}>
              <CustomTextField
                value={value}
                onChange={onChange}
                error={!!formErrors?.map_location}
                helperText={formErrors?.map_location?.message}
                variant="outlined"
                multiline
                fullWidth
              />
              <Button
                variant="contained"
                color="primary"
                onClick={() => extractIframeSrcUrl(watch('map_location'))}
              >
                Extract URL
              </Button>
            </Stack>
          )}
        />
        <MapComponent mapUrl={watch('map_location')} />

        <Controller
          control={control}
          name="details"
          render={({ field: { onChange, value } }) => (
            <Box>
              <CustomFormLabel htmlFor="details">Details</CustomFormLabel>
              <CustomTextField
                value={value}
                onChange={onChange}
                error={!!formErrors.details}
                helperText={formErrors.details && formErrors.details.message}
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
          name="video_link"
          render={({ field: { onChange, value } }) => (
            <Box>
              <CustomFormLabel htmlFor="video_link">Video link</CustomFormLabel>
              <CustomTextField
                value={value}
                onChange={onChange}
                error={!!formErrors.video_link}
                helperText={formErrors.video_link && formErrors.video_link.message}
                variant="outlined"
                fullWidth
              />
            </Box>
          )}
        />

        <CustomFormLabel htmlFor="video_link">
          Cover photo (Validate file: [{allowedExts}]){' '}
        </CustomFormLabel>
        <Stack direction="column" gap={2}>
          <Controller
            control={control}
            name="cover_photo"
            render={({ field }) => (
              <input
                id="cover_photo"
                type="file"
                accept={allowedExts}
                ref={fileInputRef}
                onChange={(event) => {
                  const filesArray = Array.from(event.target.files);
                  field.onChange(filesArray);
                  setValue('cover_photo', filesArray);
                }}
              />
            )}
          />
          {cover_photo &&
            (Array.isArray(cover_photo) && cover_photo.length > 0 ? (
              <PreviewFile
                className={{ margin: 'auto' }}
                width={300}
                height={'auto'}
                files={cover_photo}
              />
            ) : (
              <img src={watch('cover_photo')} alt="cover_photo" width={300} height="auto" />
            ))}
        </Stack>

        <Box mt={3}>
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
InstitutionForm.propTypes = {
  reset: PropTypes.func.isRequired,
  handleSubmit: PropTypes.func.isRequired,
  onSubmit: PropTypes.func.isRequired,
  control: PropTypes.object.isRequired,
  formErrors: PropTypes.object.isRequired,
  watch: PropTypes.func.isRequired,
  setValue: PropTypes.func.isRequired,
  fileInputRef: PropTypes.object.isRequired,
};

export default InstitutionForm;