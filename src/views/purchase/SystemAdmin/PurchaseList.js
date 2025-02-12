import { Box } from '@mui/material';
import PageContainer from '../../../components/container/PageContainer';
import Breadcrumb from '../../../layouts/full/shared/breadcrumb/Breadcrumb';
import TablePurchaseList from './TablePurchaseList';

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
        <TablePurchaseList />
      </Box>
    </PageContainer>
  );
};

export default PurchaseList;
