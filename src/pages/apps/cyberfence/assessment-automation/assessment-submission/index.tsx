import { ReactNode } from 'react';

import { AssessmentSubmissionList } from '@/features/compliance';
import { useSearch } from '@/hooks';
import { AppLayout } from '@/layouts';
import { InputSearch } from '@components/input-search';
import { PageHeader } from '@components/page-header';

const AssessmentSubmissionPage = () => {
  const { search, debouncedSearch, onSearch } =
    useSearch();

  return (
    <>
      <PageHeader
        title="รายการส่งแบบประเมิน"
        extra={
          <InputSearch
            placeholder="ค้นหาชื่อแบบประเมิน, ประเภทแบบฟอร์ม"
            search={search}
            onSearch={onSearch}
          />
        }
      />
      <AssessmentSubmissionList
        search={debouncedSearch}
      />
    </>
  );
};

AssessmentSubmissionPage.getLayout = (
  page: ReactNode
) => <AppLayout>{page}</AppLayout>;

export default AssessmentSubmissionPage;
