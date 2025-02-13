import { Chip, IconButton, Tooltip, Typography } from '@mui/material';
import { IconEye } from '@tabler/icons';
import { format } from 'date-fns';
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router';
import { ticket_status } from '../../../config/Constant';
import { selectPurchaseListForInstitution } from '../../../store/reducers/purchase/purchaseSlice';
import { getPurchaseListForInstitution } from '../../../store/thunk/purchase';
import PurchaseTable from '../PurchaseTable';
import { jwtDecode } from 'jwt-decode';

const TableInstitutionPurchaseList = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { institution_id } = jwtDecode(sessionStorage.getItem('token'));
  const purchaseList = useSelector(selectPurchaseListForInstitution);

  useEffect(() => {
    dispatch(getPurchaseListForInstitution(institution_id));
  }, [dispatch, institution_id]);

  const headCells = [
    {
      id: 'user_name',
      numeric: false,
      disablePadding: false,
      label: 'User Name',
      render: (row) => <Typography color="textSecondary">{row.user_name}</Typography>,
    },
    {
      id: 'purchase_date',
      numeric: false,
      disablePadding: false,
      label: 'Purchase date',
      render: (row) => (
        <Typography color="textSecondary">
          {format(new Date(row.purchase_date), 'dd/MM/yyyy')}
        </Typography>
      ),
    },
    {
      id: 'ticket_status',
      numeric: false,
      disablePadding: false,
      label: 'Ticket status',
      render: (row) => {
        let backgroundColor;
        if (ticket_status[row.ticket_status].value === 'Purchased') {
          backgroundColor = (theme) => theme.palette.success.light;
        } else if (ticket_status[row.ticket_status].value === 'Checked out') {
          backgroundColor = (theme) => theme.palette.error.light;
        } else if (ticket_status[row.ticket_status].value === 'Entered') {
          backgroundColor = (theme) => theme.palette.warning.light;
        }
        return (
          <Chip
            sx={{ backgroundColor }}
            size="small"
            label={ticket_status[row.ticket_status].value}
          />
        );
      },
    },
    {
      id: 'ticket_name',
      numeric: false,
      disablePadding: false,
      label: 'Ticket name',
      render: (row) => <Typography color="textSecondary">{row.ticket_name}</Typography>,
    },
    {
      id: 'price_amount',
      numeric: false,
      disablePadding: false,
      label: 'Price',
      render: (row) => <Typography color="textSecondary">{row.price_amount}</Typography>,
    },
    {
      id: 'action',
      numeric: false,
      disablePadding: false,
      label: 'Action',
      render: (row) => (
        <>
          <Tooltip title="View">
            <IconButton size="small" onClick={() => navigate(`/purchase_institution/${row.purchase_id}`)}>
              <IconEye size="1.1rem" />
            </IconButton>
          </Tooltip>
        </>
      ),
    },
  ];

  const searchByUserName = (row, searchVal) =>
    row.user_name.toLowerCase().includes(searchVal.toLowerCase());

  return (
    <div>
      <PurchaseTable
        headCells={headCells}
        rows={purchaseList}
        keyField="purchase_id"
        searchPlaceholder="Search user name"
        searchPredicate={searchByUserName}
      />
    </div>
  );
};

export default TableInstitutionPurchaseList;
