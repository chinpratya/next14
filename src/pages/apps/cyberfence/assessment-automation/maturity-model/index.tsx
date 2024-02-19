import { Button } from 'antd';
import { ReactNode } from 'react';

import {
  MaturityModelList,
  MaturityModelCreateModal,
} from '@/features/compliance';
import type { MaturityModel } from '@/features/compliance';
import { useToggle, useSearch } from '@/hooks';
import { AppLayout } from '@/layouts';
import { InputSearch } from '@components/input-search';
import { PageHeader } from '@components/page-header';

const MaturityModelPage = () => {
  const toggle = useToggle<MaturityModel>();
  const { search, debouncedSearch, onSearch } =
    useSearch();

  return (
    <>
      <PageHeader
        title={'Maturity Model'}
        extra={
          <>
            <InputSearch
              search={search}
              onSearch={onSearch}
            />
            <Button
              type="primary"
              onClick={() => toggle.create()}
            >
              เพิ่ม Maturity Model
            </Button>
          </>
        }
      />
      <MaturityModelList search={debouncedSearch} />
      <MaturityModelCreateModal
        open={toggle.openCreate}
        onCancel={() => toggle.create()}
      />
    </>
  );
};

MaturityModelPage.getLayout = (page: ReactNode) => (
  <AppLayout>{page}</AppLayout>
);

export default MaturityModelPage;
