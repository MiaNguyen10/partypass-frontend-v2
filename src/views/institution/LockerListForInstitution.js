import { Box, Typography } from '@mui/material';
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router';
import PageContainer from '../../components/container/PageContainer';
import { locker_status } from '../../config/Constant';
import Breadcrumb from '../../layouts/full/shared/breadcrumb/Breadcrumb';
import { getLockersByInstitution } from '../../store/reducers/locker/lockerSlice';
import { getLockerListByInstitution } from '../../store/thunk/locker';
import LockerTableForInstitution from './LockerTableForInstitution';

const LockerListForInstitution = () => {
  const { id } = useParams();
  const dispatch = useDispatch();
  const lockers = useSelector(getLockersByInstitution);

  useEffect(() => {
    dispatch(getLockerListByInstitution({ institution_id: id }));
  }, [dispatch, id]);

  const BCrumb = [
    {
      to: '/',
      title: 'Home',
    },
    {
      to: '/institutions',
      title: 'Institution List',
    },
    {
      to: `/institutions/${id}`,
      title: 'Detail',
    },
    {
      title: 'Locker List',
    },
  ];

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
      render: (row) => (
        <Typography color="textSecondary">{locker_status[row.status].value}</Typography>
      ),
    },
  ];

  return (
    <PageContainer title="Party Pass" description="This is Locker page for institution">
      {/* breadcrumb */}
      <Breadcrumb title="Locker" items={BCrumb} />
      {/* end breadcrumb */}
      <Box>
        <LockerTableForInstitution
          headCells={headCells}
          rows={lockers}
          keyField="id"
          searchPlaceholder="Search locker"
          searchPredicate={(row, searchTerm) =>(
            row.locker_number.toLowerCase().includes(searchTerm.toLowerCase())
          )}
        />
      </Box>
    </PageContainer>
  );
};

export default LockerListForInstitution;
