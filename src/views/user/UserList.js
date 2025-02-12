import { Box } from '@mui/material';
import TableUserList from './TableUserList';
import PageContainer from '../../components/container/PageContainer';
import Breadcrumb from '../../layouts/full/shared/breadcrumb/Breadcrumb';

const BCrumb = [
  {
    to: '/',
    title: 'Home',
  },
  {
    title: 'User List',
  },
];

const TicketList = () => {
  return (
    <PageContainer title="Party Pass" description="This is User page">
      {/* breadcrumb */}
      <Breadcrumb title="User" items={BCrumb} />
      {/* end breadcrumb */}
      <Box>
        <TableUserList />
      </Box>
    </PageContainer>
  );
};

export default TicketList;
