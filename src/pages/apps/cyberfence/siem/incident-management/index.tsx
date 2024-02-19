import { ReactElement } from 'react';
import { useTranslation } from 'react-i18next';

import { InputSearch } from '@/components/share-components/input-search';
import { IntlMessage } from '@/components/util-components/intl-message';
import { InitalSystemWrapper } from '@/features/shared';
import { IncidentList } from '@/features/siem';
import { useSearch } from '@/hooks';
import { permissions, products } from '@/permissions';
import { PageHeader } from '@components/page-header';
import AppLayout from '@layouts/AppLayout';

const IncidentManagement = () => {
  const { t } = useTranslation();
  const { search, debouncedSearch, onSearch } =
    useSearch();

  return (
    <>
      <PageHeader
        title={
          <IntlMessage id="siem.incidentManagement.incidentManagement" />
        }
        extra={
          <InputSearch
            search={search}
            placeholder={
              t('logManagement.search') as string
            }
            onSearch={onSearch}
          />
        }
      />
      <IncidentList search={debouncedSearch} />
    </>
  );
};

IncidentManagement.getLayout = function getLayout(
  page: ReactElement
) {
  return (
    <AppLayout
      permission={{
        moduleName: ['siem', 'core'],
        productName: products.cyber,
        policies: [
          permissions['cyber:siem:incident:read'],
        ],
      }}
    >
      <InitalSystemWrapper>{page}</InitalSystemWrapper>
    </AppLayout>
  );
};

export default IncidentManagement;
