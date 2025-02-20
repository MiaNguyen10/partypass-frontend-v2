import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  Stack,
  Typography,
} from '@mui/material';
import PropTypes from 'prop-types';
import { IconExclamationCircle, IconRosetteDiscountCheck } from '@tabler/icons-react';

const AlertDialog2 = ({
  openAlertDialog,
  setOpenAlertDialog,
  noticeText,
  noticeText2,
  success,
}) => {
  const handleClose = () => {
    setOpenAlertDialog(false);
  };

  return (
    <Dialog
      open={openAlertDialog}
      onClose={handleClose}
      aria-labelledby="alert-dialog-title"
      aria-describedby="alert-dialog-description"
      maxWidth="xs"
      fullWidth
    >
      <DialogContent>
        <DialogContentText id="alert-dialog-description">
          <Stack direction="column" alignItems="center" gap={2}>
            {success ? (
              <IconRosetteDiscountCheck size="5rem" style={{ color: 'green' }} />
            ) : (
              <IconExclamationCircle size="5rem" style={{ color: 'orange' }} />
            )}
            {success ? (
              <Typography variant="h4" align="center" color="green">
                {noticeText}
              </Typography>
            ) : (
              <Typography variant="h4" align="center" color="orange">
                {noticeText}
              </Typography>
            )}
            <Typography variant="body1" align="center">
              {noticeText2}
            </Typography>
          </Stack>
        </DialogContentText>
      </DialogContent>
      <DialogActions>
        <Button
          onClick={handleClose}
          autoFocus
          variant="contained"
          sx={{ mx: 'auto', mb: 2, backgroundColor: success ? 'green' : 'orange', color: 'white' }}
        >
          OK
        </Button>
      </DialogActions>
    </Dialog>
  );
};

AlertDialog2.propTypes = {
  openAlertDialog: PropTypes.bool.isRequired,
  setOpenAlertDialog: PropTypes.func.isRequired,
  noticeText: PropTypes.string.isRequired,
  noticeText2: PropTypes.string.isRequired,
  success: PropTypes.bool.isRequired,
};

export default AlertDialog2;
