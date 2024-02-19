import { PlusOutlined } from '@ant-design/icons';
import { Button } from 'antd';
import { useRouter } from 'next/router';
import { ReactElement } from 'react';
import { useTranslation } from 'react-i18next';

import { PageHeader } from '@/components/share-components/page-header';
import { IntlMessage } from '@/components/util-components/intl-message';
import {
  InitalSystemWrapper,
  PermissionWrapper,
} from '@/features/shared';
import { RuleList } from '@/features/siem';
import { useSearch } from '@/hooks';
import { permissions, products } from '@/permissions';
import { InputSearch } from '@components/input-search';
import AppLayout from '@layouts/AppLayout';

const DetectionRule = () => {
  const router = useRouter();
  const { t } = useTranslation();

  const { search, debouncedSearch, onSearch } =
    useSearch();

  const onCreate = () => {
    router.push(`${router.pathname}/create`);
  };

  return (
    <>
      <PageHeader
        title={
          <IntlMessage id="siem.detectionRule.detectionRule" />
        }
        extra={
          <>
            <InputSearch
              search={search}
              onSearch={onSearch}
              placeholder={
                t('logManagement.search') as string
              }
            />

            <PermissionWrapper
              moduleName="siem"
              policies={[
                permissions['cyber:siem:rule:create'],
              ]}
            >
              <Button type="primary" onClick={onCreate}>
                <PlusOutlined className="mr-2" />
                <IntlMessage id="logManagement.create" />
              </Button>
            </PermissionWrapper>
          </>
        }
      />

      <RuleList search={debouncedSearch} />
    </>
  );
};

DetectionRule.getLayout = function getLayout(
  page: ReactElement
) {
  return (
    <AppLayout
      permission={{
        moduleName: ['siem', 'core'],
        productName: products.cyber,
        policies: [permissions['cyber:siem:rule:read']],
      }}
    >
      <InitalSystemWrapper>{page}</InitalSystemWrapper>
    </AppLayout>
  );
};

export default DetectionRule;
