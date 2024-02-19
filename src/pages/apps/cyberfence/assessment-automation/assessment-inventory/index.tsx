import { useToggle } from '@mantine/hooks';
import { ReactNode } from 'react';

import {
  AssessmentInventoryList,
  CreateAssessmentInventoryModal,
} from '@/features/compliance';
import { AppLayout } from '@/layouts';
import { PageHeader } from '@components/page-header';

const InventoryPage = () => {
  const [openCreateModal, toggleOpenCreateModal] =
    useToggle();

  return (
    <>
      <PageHeader title="คลังแบบประเมิน" />
      <AssessmentInventoryList />
      <CreateAssessmentInventoryModal
        open={openCreateModal}
        toggleModal={() => toggleOpenCreateModal()}
      />
    </>
  );
};

InventoryPage.getLayout = (page: ReactNode) => (
  <AppLayout>{page}</AppLayout>
);

export default InventoryPage;
