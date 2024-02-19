import { ReactElement } from 'react';
import { useTranslation } from 'react-i18next';

import { InputSearch } from '@/components/share-components/input-search';
import { IntlMessage } from '@/components/util-components/intl-message';
import { ArchiveList } from '@/features/log-management';
import { InitalSystemWrapper } from '@/features/shared';
import { useSearch } from '@/hooks';
import { permissions, products } from '@/permissions';
import { logManagementModules } from '@/permissions/log-management';
import { PageHeader } from '@components/page-header';
import AppLayout from '@layouts/AppLayout';

const { lm, core } = logManagementModules;

const ArchivePage = () => {
  const { t } = useTranslation();
  const { debouncedSearch, onSearch } = useSearch();

  return (
    <>
      <PageHeader
        title={
          <IntlMessage id="logManagement.archive.title" />
        }
        extra={
          <InputSearch
            onSearch={onSearch}
            placeholder={
              t('logManagement.search') as string
            }
          />
        }
      />
      <ArchiveList search={debouncedSearch} />
    </>
  );
};

ArchivePage.getLayout = function getLayout(
  page: ReactElement
) {
  return (
    <AppLayout
      permission={{
        moduleName: [lm, core],
        productName: products.cyber,
        policies: [permissions['cyber:lm:archive:read']],
      }}
    >
      <InitalSystemWrapper>{page}</InitalSystemWrapper>
    </AppLayout>
  );
};

export default ArchivePage;
