import { useToggle } from '@mantine/hooks';
import { ReactNode } from 'react';

import {
  AssessmentInventoryList,
  CreateAssessmentInventoryModal,
} from '@/features/compliance';
import { AppLayout } from '@/layouts';
import { permissions, products } from '@/permissions';
import { PageHeader } from '@components/page-header';
import { IntlMessage } from '@utilComponents/intl-message';

const InventoryPage = () => {
  const [openCreateModal, toggleOpenCreateModal] =
    useToggle();

  return (
    <>
      <PageHeader
        title={
          <IntlMessage id="compliance.assessmentInventory.title" />
        }
      />
      <AssessmentInventoryList />
      <CreateAssessmentInventoryModal
        open={openCreateModal}
        toggleModal={() => toggleOpenCreateModal()}
      />
    </>
  );
};

InventoryPage.getLayout = (page: ReactNode) => (
  <AppLayout
    permission={{
      moduleName: ['compliance'],
      productName: products.pdpakit,
      policies: [
        permissions['pdpakit:compliance:template:read'],
      ],
    }}
  >
    {page}
  </AppLayout>
);

export default InventoryPage;
