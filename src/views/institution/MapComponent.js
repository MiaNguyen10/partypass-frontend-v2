import { Box } from '@mui/material';
import PropTypes from 'prop-types';

function MapComponent({ mapUrl }) {
  return (
    <Box
      sx={{
        width: '100%',
        height: { xs: '16rem', md: '24rem' },
        overflow: 'hidden',
        borderRadius: 2,
        boxShadow: 3,
        border: 1,
        borderColor: 'grey.300',
        mt: 2,
      }}
    >
      <iframe
        title="Map"
        src={mapUrl}
        style={{ width: '100%', height: '100%' }}
        allowFullScreen
        loading="lazy"
      ></iframe>
    </Box>
  );
}

MapComponent.propTypes = {
  mapUrl: PropTypes.string.isRequired,
};

export default MapComponent;
