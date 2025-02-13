import { Box } from '@mui/material';
import PageContainer from '../../../components/container/PageContainer';
import Breadcrumb from '../../../layouts/full/shared/breadcrumb/Breadcrumb';
import TableInstitutionPurchaseList from './TableInstitutionPurchaseList';

const BCrumb = [
  {
    to: '/',
    title: 'Home',
  },
  {
    title: 'Purchase List',
  },
];

const PurchaseList = () => {
  return (
    <PageContainer title="Party Pass" description="This is Purchase page">
      {/* breadcrumb */}
      <Breadcrumb title="Purchase" items={BCrumb} />
      {/* end breadcrumb */}
      <Box>
        <TableInstitutionPurchaseList />
      </Box>
    </PageContainer>
  );
};

export default PurchaseList;
