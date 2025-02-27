import { IconButton, Tooltip, Typography } from '@mui/material';
import { IconEye, IconPencil } from '@tabler/icons';
import { format } from 'date-fns';
import { jwtDecode } from 'jwt-decode';
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router';
import EnhancedTable from '../../../components/table/EnhancedTable';
import { getTicketListFromSpecificInstitution } from '../../../store/reducers/institution/institutionSlice';
import { getTicketListFromInstitution } from '../../../store/thunk/institution';
import pages from '../../../config/pages';

const TableInstitutionTicketList = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { institution_id } = jwtDecode(sessionStorage.getItem('token'));

  const tickets = useSelector(getTicketListFromSpecificInstitution);

  useEffect(() => {
    dispatch(getTicketListFromInstitution(institution_id));
  }, [dispatch, institution_id]);

  const headCells = [
    {
      id: 'name',
      numeric: false,
      disablePadding: false,
      label: 'Name',
      render: (row) => <Typography color="textSecondary">{row.name}</Typography>,
    },
    // {
    //   id: 'institution',
    //   numeric: false,
    //   disablePadding: false,
    //   label: 'Institution',
    //   render: (row) => <Typography color="textSecondary">{row.institution_id}</Typography>
    // },
    {
      id: 'price',
      numeric: false,
      disablePadding: false,
      label: 'Price',
      render: (row) => <Typography color="textSecondary">{row.price}</Typography>,
    },
    {
      id: 'capacity',
      numeric: false,
      disablePadding: false,
      label: 'Capacity',
      render: (row) => <Typography color="textSecondary">{row.capacity}</Typography>,
    },
    {
      id: 'date',
      numeric: false,
      disablePadding: false,
      label: 'Date',
      render: (row) =>
        row.is_regular === 0 ? (
          <Typography color="textSecondary">{format(new Date(row.date), 'dd/MM/yyyy')}</Typography>
        ) : (
          <Typography color="textSecondary">Regular event</Typography>
        ),
    },
    {
      id: 'start_datetime',
      numeric: false,
      disablePadding: false,
      label: 'Start time',
      render: (row) =>
        row.is_regular === 0 ? (
          <Typography color="textSecondary">{row.start_datetime}</Typography>
        ) : (
          <Typography color="textSecondary">-</Typography>
        ),
    },
    {
      id: 'end_datetime',
      numeric: false,
      disablePadding: false,
      label: 'End time',
      render: (row) =>
        row.is_regular === 0 ? (
          <Typography color="textSecondary">{row.end_datetime}</Typography>
        ) : (
          <Typography color="textSecondary">-</Typography>
        ),
    },
    {
      id: 'action',
      numeric: false,
      disablePadding: false,
      label: 'Action',
      render: (row) => (
        <>
          <Tooltip title="View">
            <IconButton
              size="small"
              onClick={() => navigate(`/tickets_institution/${row.ticket_id}`)}
            >
              <IconEye size="1.1rem" />
            </IconButton>
          </Tooltip>
          <Tooltip title="Edit">
            <IconButton
              size="small"
              onClick={() => navigate(`/tickets_institution/${row.ticket_id}/edit`)}
            >
              <IconPencil size="1.1rem" />
            </IconButton>
          </Tooltip>
        </>
      ),
    },
  ];

  const handleCreateBtn = () => {
    navigate(pages.addTicketPathForInstitution);
  };

  return (
    <div>
      <EnhancedTable
        headCells={headCells}
        rows={tickets}
        keyField="ticket_id"
        searchPlaceholder="Search ticket name"
        handleCreateBtn={handleCreateBtn}
        keyDelete="ticket"
        AddBtnTitle="Add Ticket"
      />
    </div>
  );
};

export default TableInstitutionTicketList;
