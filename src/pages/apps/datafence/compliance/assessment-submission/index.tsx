import { ReactNode } from 'react';
import { useTranslation } from 'react-i18next';

import { AssessmentSubmissionList } from '@/features/compliance';
import { useSearch } from '@/hooks';
import { AppLayout } from '@/layouts';
import { permissions, products } from '@/permissions';
import { InputSearch } from '@components/input-search';
import { PageHeader } from '@components/page-header';
import { IntlMessage } from '@utilComponents/intl-message';

const AssessmentSubmissionPage = () => {
  const { t } = useTranslation();
  const { search, debouncedSearch, onSearch } =
    useSearch();

  return (
    <>
      <PageHeader
        title={
          <IntlMessage id="compliance.assessmentSubmission.title" />
        }
        extra={
          <InputSearch
            placeholder={
              t(
                'compliance.assessmentSubmission.search'
              ) as string
            }
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
) => (
  <AppLayout
    permission={{
      moduleName: ['compliance'],
      productName: products.pdpakit,
      policies: [
        permissions['pdpakit:compliance:submission:read'],
      ],
    }}
  >
    {page}
  </AppLayout>
);

export default AssessmentSubmissionPage;
