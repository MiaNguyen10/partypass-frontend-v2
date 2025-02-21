import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
} from '@mui/material';
import { jwtDecode } from 'jwt-decode';
import PropTypes from 'prop-types';
import { useDispatch } from 'react-redux';
import Swal from 'sweetalert2';
import { roles } from '../../config/Constant';
import {
  deleteInstitution,
  getInstitutionList,
  getTicketListFromInstitution,
} from '../../store/thunk/institution';
import { deleteLocker, getLockerListByInstitution } from '../../store/thunk/locker';
import { deleteTicket, getTicketList } from '../../store/thunk/ticket';
import { deleteUserById, getUserList } from '../../store/thunk/user';

const FormDialog = ({ openDialog, setOpenDialog, selected, keyDelete, setSelected }) => {
  const dispatch = useDispatch();
  const token = sessionStorage.getItem('token');
  const { institution_id: institutionId, role } = token ? jwtDecode(token) : {};
  const handleClose = () => {
    setOpenDialog(false);
  };

  const handleDelete = async () => {
    try {
      switch (role) {
        case roles[1].id:
          switch (keyDelete) {
            case 'ticket':
              await Promise.all(selected.map((id) => dispatch(deleteTicket(id))));
              await dispatch(getTicketList());
              break;
            case 'institution':
              await Promise.all(selected.map((id) => dispatch(deleteInstitution(id))));
              await dispatch(getInstitutionList());
              break;
            case 'user':
              await Promise.all(selected.map((id) => dispatch(deleteUserById(id))));
              await dispatch(getUserList());
              break;
            default:
              break;
          }
          break;
        case roles[2].id:
          switch (keyDelete) {
            case 'ticket':
              await Promise.all(selected.map((id) => dispatch(deleteTicket(id))));
              await dispatch(getTicketListFromInstitution(institutionId));
              break;
            case 'locker':
              await Promise.all(selected.map((id) => dispatch(deleteLocker(id))));
              await dispatch(getLockerListByInstitution({ institution_id: institutionId }));
              break;
            default:
              break;
          }
          break;
        default:
          break;
      }
      // Reset dialog and selection after deletion
      setOpenDialog(false);
      setSelected([]);
      // Show success alert
      Swal.fire({
        icon: 'success',
        title: 'Deletion successful!',
        showConfirmButton: false,
        timer: 1500,
      });
    } catch (error) {
      console.error('Error during deletion:', error);
      // Show error alert
      Swal.fire({
        icon: 'error',
        title: 'Deletion failed!',
        text: 'An error occurred while deleting.',
      });
    }
  };

  return (
    <>
      <Dialog open={openDialog} onClose={handleClose}>
        <DialogTitle>Confirm delete</DialogTitle>
        <DialogContent>
          <DialogContentText>
            Are you sure you want to delete{' '}
            {`${selected.length > 1 ? `these ${keyDelete}s` : `this ${keyDelete}`}`}?
          </DialogContentText>
        </DialogContent>
        <DialogActions sx={{ mb: 2, mr: 1 }}>
          <Button color="error" onClick={handleClose}>
            Disagree
          </Button>
          <Button onClick={handleDelete}>Agree</Button>
        </DialogActions>
      </Dialog>
    </>
  );
};
FormDialog.propTypes = {
  openDialog: PropTypes.bool.isRequired,
  setOpenDialog: PropTypes.func.isRequired,
  selected: PropTypes.array.isRequired,
  keyDelete: PropTypes.string.isRequired,
  setSelected: PropTypes.func.isRequired,
};

export default FormDialog;
