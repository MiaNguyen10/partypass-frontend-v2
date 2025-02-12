import { IconButton, Tooltip, Typography } from '@mui/material';
import { IconEye, IconPencil } from '@tabler/icons';
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router';
import { roles } from '../../config/Constant';
import { getUsers } from '../../store/reducers/user/userSlice';
import { getUserList } from '../../store/thunk/user';
import EnhancedTable from '../../components/table/EnhancedTable';

const TableUserList = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const users = useSelector(getUsers);

  useEffect(() => {
    dispatch(getUserList());
  }, [dispatch]);

  const headCells = [
    {
      id: 'name',
      numeric: false,
      disablePadding: false,
      label: 'Name',
      render: (row) => <Typography color="textSecondary">{row.name}</Typography>,
    },
    {
      id: 'email',
      numeric: false,
      disablePadding: false,
      label: 'Email',
      render: (row) => <Typography color="textSecondary">{row.email}</Typography>,
    },
    {
      id: 'phone',
      numeric: false,
      disablePadding: false,
      label: 'Phone',
      render: (row) => <Typography color="textSecondary">{row.phone}</Typography>,
    },
    {
        id: 'role',
        numeric: false,
        disablePadding: false,
        label: 'Role',
        render: (row) => <Typography color="textSecondary">{roles[row.role].value}</Typography>,
      },
    {
      id: 'institution',
      numeric: false,
      disablePadding: false,
      label: 'Institution',
      render: (row) => <Typography color="textSecondary">{row.institution_id ? row.institution_id : '-'}</Typography>,
    },
    {
      id: 'action',
      numeric: false,
      disablePadding: false,
      label: 'Action',
      render: (row) => (
        <>
          <Tooltip title="View">
            <IconButton size="small" onClick={() => navigate(`/users/${row.user_id}`)}>
              <IconEye size="1.1rem" />
            </IconButton>
          </Tooltip>
          <Tooltip title="Edit">
            <IconButton size="small" onClick={() => navigate(`/users/${row.user_id}/edit`)}>
              <IconPencil size="1.1rem" />
            </IconButton>
          </Tooltip>
        </>
      ),
    },
  ];

  const handleCreateBtn = () => {
    navigate('/users/create');
  };

  return (
    <div>
      <EnhancedTable
        headCells={headCells}
        rows={users}
        keyField="user_id"
        searchPlaceholder="Search user name"
        handleCreateBtn={handleCreateBtn}
      />
    </div>
  );
};

export default TableUserList;
