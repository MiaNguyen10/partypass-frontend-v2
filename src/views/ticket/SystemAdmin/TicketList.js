import { Box } from '@mui/material';
import PageContainer from '../../../components/container/PageContainer';
import Breadcrumb from '../../../layouts/full/shared/breadcrumb/Breadcrumb';
import TableTicketList from './TableTicketList';

const BCrumb = [
  {
    to: '/',
    title: 'Home',
  },
  {
    title: 'Ticket List',
  },
];

const TicketList = () => {
  return (
    <PageContainer title="Party Pass" description="This is Ticket page">
      {/* breadcrumb */}
      <Breadcrumb title="Ticket" items={BCrumb} />
      {/* end breadcrumb */}
      <Box>
        <TableTicketList />
      </Box>
    </PageContainer>
  );
};

export default TicketList;
