import { useToggle } from '@mantine/hooks';
import { Button } from 'antd';
import { ReactNode } from 'react';

import {
  OrganizationList,
  OrganizationListAddModal,
} from '@/features/compliance';
import { useSearch } from '@/hooks';
import { AppLayout } from '@/layouts';
import { InputSearch } from '@components/input-search';
import { PageHeader } from '@components/page-header';

const InventoryPage = () => {
  const [openAddModal, toggleOpenAddModal] = useToggle();
  const { search, debouncedSearch, onSearch } =
    useSearch();

  return (
    <>
      <PageHeader
        title="องค์กร"
        extra={
          <>
            <InputSearch
              placeholder="ค้นหาชื่อองค์กร, สังกัดหน่วยงาน,แท็ก"
              onSearch={onSearch}
              search={search}
            />
            <Button
              type="primary"
              onClick={() => toggleOpenAddModal()}
            >
              เพิ่มองค์กร
            </Button>
          </>
        }
      />
      <OrganizationList search={debouncedSearch} />
      <OrganizationListAddModal
        open={openAddModal}
        toggleModal={() => toggleOpenAddModal()}
      />
    </>
  );
};

InventoryPage.getLayout = (page: ReactNode) => (
  <AppLayout>{page}</AppLayout>
);

export default InventoryPage;
