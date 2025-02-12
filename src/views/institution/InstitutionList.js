import { Box } from '@mui/material';
import PageContainer from '../../components/container/PageContainer';
import Breadcrumb from '../../layouts/full/shared/breadcrumb/Breadcrumb';
import TableInstitutionList from './TableInstitutionList';

const BCrumb = [
  {
    to: '/',
    title: 'Home',
  },
  {
    title: 'Institution List',
  },
];

const InstitutionList = () => {
  return (
    <PageContainer title="Party Pass" description="This is Institution page">
      {/* breadcrumb */}
      <Breadcrumb title="Institution" items={BCrumb} />
      {/* end breadcrumb */}
      <Box>
        <TableInstitutionList />
      </Box>
    </PageContainer>
  );
};

export default InstitutionList;
