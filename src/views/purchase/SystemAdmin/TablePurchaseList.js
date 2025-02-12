import { IconButton, Tooltip, Typography } from '@mui/material';
import { IconEye } from '@tabler/icons';
import { format } from 'date-fns';
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router';
import { ticket_status } from '../../../config/Constant';
import { selectPurchaseList } from '../../../store/reducers/purchase/purchaseSlice';
import { getPurchaseList } from '../../../store/thunk/purchase';
import PurchaseTable from '../PurchaseTable';

const TablePurchaseList = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const purchaseList = useSelector(selectPurchaseList);

  useEffect(() => {
    dispatch(getPurchaseList());
  }, [dispatch]);

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
      render: (row) => (
        <Typography color="textSecondary">
          {ticket_status[row.ticket_status].value}
        </Typography>
      ),
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
            <IconButton size="small" onClick={() => navigate(`/purchase/${row.purchase_id}`)}>
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

export default TablePurchaseList;
