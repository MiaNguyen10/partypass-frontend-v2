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

  console.log(role);

  const handleDelete = async () => {
    try {
      switch (role) {
        case roles[1].id:
          switch (keyDelete) {
            case 'ticket':
              await Promise.all(selected.map((id) => dispatch(deleteTicket(id))));
              await dispatch(getTicketList());
              setOpenDialog(false);
              setSelected([]);
              break;
            case 'institution':
              await Promise.all(selected.map((id) => dispatch(deleteInstitution(id))));
              await dispatch(getInstitutionList());
              setOpenDialog(false);
              setSelected([]);
              break;
            case 'user':
              await Promise.all(selected.map((id) => dispatch(deleteUserById(id))));
              await dispatch(getUserList());
              setOpenDialog(false);
              setSelected([]);
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
              setOpenDialog(false);
              setSelected([]);
              break;
            case 'locker':
              await Promise.all(
                selected.map((id) => {
                  console.log(id);
                  return dispatch(deleteLocker(id));
                }),
              );
              await dispatch(getLockerListByInstitution(institutionId));
              setOpenDialog(false);
              setSelected([]);
              break;
            default:
              break;
          }
          break;
        default:
          break;
      }
    } catch (error) {
      console.error('Error during deletion:', error);
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
