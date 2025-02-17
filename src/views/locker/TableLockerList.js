import { Chip, IconButton, Tooltip, Typography } from '@mui/material';
import { IconEye, IconPencil } from '@tabler/icons';
import { jwtDecode } from 'jwt-decode';
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router';
import EnhancedTable from '../../components/table/EnhancedTable';
import { locker_status } from '../../config/Constant';
import { getLockersByInstitution } from '../../store/reducers/locker/lockerSlice';
import { getLockerListByInstitution } from '../../store/thunk/locker';

const TableLockerList = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const lockers = useSelector(getLockersByInstitution);
  const { institution_id } = jwtDecode(sessionStorage.getItem('token'));

  useEffect(() => {
    dispatch(getLockerListByInstitution({ institution_id: institution_id }));
  }, [dispatch, institution_id]);

  const headCells = [
    {
      id: 'locker_number',
      numeric: false,
      disablePadding: false,
      label: 'Locker number',
      render: (row) => <Typography color="textSecondary">{row.locker_number}</Typography>,
    },
    {
      id: 'institution',
      numeric: false,
      disablePadding: false,
      label: 'Institution',
      render: (row) => <Typography color="textSecondary">{row.institution_name}</Typography>,
    },
    {
      id: 'status',
      numeric: false,
      disablePadding: false,
      label: 'Status',
      render: (row) => {
        let backgroundColor;
        if (locker_status[row.status]?.value === 'Active') {
          backgroundColor = (theme) => theme.palette.success.light;
        } else if (locker_status[row.status]?.value === 'Disabled') {
          backgroundColor = (theme) => theme.palette.error.light;
        }
        return (
          <Chip
            sx={{ backgroundColor }}
            size="small"
            label={locker_status[row.status]?.value}
          />
        );
      },
    },
    {
      id: 'action',
      numeric: false,
      disablePadding: false,
      label: 'Action',
      render: (row) => (
        <>
          <Tooltip title="View">
            <IconButton size="small" onClick={() => navigate(`/lockers/${row.id}`)}>
              <IconEye size="1.1rem" />
            </IconButton>
          </Tooltip>
          <Tooltip title="Edit">
            <IconButton size="small" onClick={() => navigate(`/lockers/${row.id}/edit`)}>
              <IconPencil size="1.1rem" />
            </IconButton>
          </Tooltip>
        </>
      ),
    },
  ];

  const handleCreateBtn = () => {
    navigate('/lockers/create');
  };

  return (
    <div>
      <EnhancedTable
        headCells={headCells}
        rows={lockers}
        keyField="id"
        searchPlaceholder="Search locker"
        handleCreateBtn={handleCreateBtn}
        keyDelete='locker'
      />
    </div>
  );
};

export default TableLockerList;
