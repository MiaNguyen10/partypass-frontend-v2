import { Box } from '@mui/material';
import PageContainer from '../../../components/container/PageContainer';
import Breadcrumb from '../../../layouts/full/shared/breadcrumb/Breadcrumb';
import TableInstitutionTicketList from './TableInstitutionTicketList';

const BCrumb = [
  {
    to: '/',
    title: 'Home',
  },
  {
    title: 'Ticket List',
  },
];

const InstitutionTicketList = () => {
  return (
    <PageContainer title="Party Pass" description="This is Ticket page">
      {/* breadcrumb */}
      <Breadcrumb title="Ticket" items={BCrumb} />
      {/* end breadcrumb */}
      <Box>
        <TableInstitutionTicketList />
      </Box>
    </PageContainer>
  );
};

export default InstitutionTicketList;
