import { Box } from '@mui/material';
import PageContainer from '../../components/container/PageContainer';
import Breadcrumb from '../../layouts/full/shared/breadcrumb/Breadcrumb';
import TableLockerList from './TableLockerList';

const BCrumb = [
  {
    to: '/',
    title: 'Home',
  },
  {
    title: 'Locker List',
  },
];

const LockerList = () => {
  return (
    <PageContainer title="Party Pass" description="This is Locker page">
      {/* breadcrumb */}
      <Breadcrumb title="Locker" items={BCrumb} />
      {/* end breadcrumb */}
      <Box>
        <TableLockerList />
      </Box>
    </PageContainer>
  );
};

export default LockerList;
