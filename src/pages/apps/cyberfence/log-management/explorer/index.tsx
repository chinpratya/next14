import { ReactElement } from 'react';

import { FallbackError } from '@/components/util-components/fallback-error';
import { IntlMessage } from '@/components/util-components/intl-message';
import {
  ExplorerFolderList,
  useListDirectory,
} from '@/features/log-management';
import { InitalSystemWrapper } from '@/features/shared';
import { permissions, products } from '@/permissions';
import { logManagementModules } from '@/permissions/log-management';
import { PageHeader } from '@components/page-header';
import AppLayout from '@layouts/AppLayout';

const { core, lm } = logManagementModules;

const ExplorerPage = () => {
  const { data, isLoading, isError } = useListDirectory({
    params: {
      path: '/',
      level: 'index',
    },
  });

  return (
    <FallbackError isError={isError}>
      <PageHeader
        title={
          <IntlMessage id="logManagement.explorer.title" />
        }
      />
      <ExplorerFolderList
        level="index"
        path="/"
        nextLevel="date"
        data={data}
        loading={isLoading}
      />
    </FallbackError>
  );
};

ExplorerPage.getLayout = function getLayout(
  page: ReactElement
) {
  return (
    <AppLayout
      permission={{
        moduleName: [lm, core],
        productName: products.cyber,
        policies: [permissions['cyber:lm:explorer:read']],
      }}
    >
      <InitalSystemWrapper>{page}</InitalSystemWrapper>
    </AppLayout>
  );
};

export default ExplorerPage;
