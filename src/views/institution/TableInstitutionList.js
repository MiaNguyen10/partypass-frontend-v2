import { Box, IconButton, Tooltip, Typography } from '@mui/material';
import * as React from 'react';

import { IconEye, IconPencil } from '@tabler/icons';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router';
import EnhancedTable from '../../components/table/EnhancedTable';
import { institution_status } from '../../config/Constant';
import { getInstitutions } from '../../store/reducers/institution/institutionSlice';
import { getInstitutionList } from '../../store/thunk/institution';

const TableInstitutionList = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const institutions = useSelector(getInstitutions);

  //Fetch Institution List
  React.useEffect(() => {
    dispatch(getInstitutionList());
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
      id: 'address',
      numeric: false,
      disablePadding: false,
      label: 'Address',
      render: (row) => <Typography color="textSecondary">{row.address}</Typography>,
    },
    {
      id: 'status',
      numeric: false,
      disablePadding: false,
      label: 'Status',
      render: (row) => {
        return (
          <Box display="flex" alignItems="center">
            <Box
              sx={{
                backgroundColor:
                  row.status === 0
                    ? (theme) => theme.palette.error.main
                    : (theme) => theme.palette.success.main,
                borderRadius: '100%',
                height: '10px',
                width: '10px',
              }}
            />
            <Typography
              color="textSecondary"
              variant="subtitle2"
              sx={{
                ml: 1,
              }}
            >
              {row.status === 0 ? institution_status[0].value : institution_status[1].value}
            </Typography>
          </Box>
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
            <IconButton size="small" onClick={() => navigate(`/institutions/${row.institution_id}`)}>
              <IconEye size="1.1rem" />
            </IconButton>
          </Tooltip>
          <Tooltip title="Edit">
            <IconButton size="small" onClick={() => navigate(`/institutions/${row.institution_id}/edit`)}>
              <IconPencil size="1.1rem" />
            </IconButton>
          </Tooltip>
        </>
      ),
    },
  ];

  const handleCreateBtn = () => {
    navigate('/institutions/create');
  };

  return (
    <div>
      <EnhancedTable
        headCells={headCells}
        rows={institutions}
        keyField="institution_id"
        searchPlaceholder={'Search institution'}
        handleCreateBtn={handleCreateBtn}
        keyDelete="institution"
        AddBtnTitle="Add Institution"
      />
    </div>
  );
};

export default TableInstitutionList;
