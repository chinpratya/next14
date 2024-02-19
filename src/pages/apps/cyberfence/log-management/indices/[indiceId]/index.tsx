import { css } from '@emotion/css';
import { Form, Tabs } from 'antd';
import { useRouter } from 'next/router';
import { ReactElement, useEffect, useState } from 'react';

import { FallbackError } from '@/components/util-components/fallback-error';
import { IntlMessage } from '@/components/util-components/intl-message';
import {
  IndiceDetail,
  IndicesAliasHost,
  IndicesInfo,
  IndicesLogForwardingList,
  IndicesNotificationConditionList,
  IndicesPageExtra,
  useGetIndice,
} from '@/features/log-management';
import { usePermission } from '@/hooks';
import { permissions, products } from '@/permissions';
import { logManagementModules } from '@/permissions/log-management';
import { Loading } from '@components/loading';
import { PageHeader } from '@components/page-header';
import AppLayout from '@layouts/AppLayout';

const { lm, core } = logManagementModules;

const moduleName = lm;
const TABS = [
  'info',
  'notification',
  'forwarding',
  'hostname',
];

const DetailIndice = () => {
  const router = useRouter();
  const [form] = Form.useForm();

  const [tab, setTab] = useState('');

  const indiceId = router.query.indiceId as string;

  const {
    data: indice,
    isLoading,
    isError,
  } = useGetIndice(indiceId);

  const createPermission = usePermission({
    moduleName,
    policies: [permissions['cyber:lm:indices:create']],
  });

  const editPermission = usePermission({
    moduleName,
    policies: [permissions['cyber:lm:indices:update']],
  });

  const deletePermission = usePermission({
    moduleName,
    policies: [permissions['cyber:lm:indices:delete']],
  });

  const onTabChange = (key: string) => {
    router.push({
      query: { ...router.query, tab: key },
    });
  };

  const onBack = () => {
    router.push(
      `/apps/cyberfence/log-management/indices`
    );
  };

  useEffect(() => {
    if (
      router.query.tab &&
      TABS.includes(router.query.tab as string)
    ) {
      setTab(router.query.tab as string);
    } else {
      setTab('info');
    }
  }, [router.query.tab]);

  if (isLoading) return <Loading cover="content" />;

  return (
    <FallbackError isError={isError}>
      <PageHeader
        onBack={onBack}
        title={
          <IntlMessage id="logManagement.indices.title" />
        }
        subtitle={indice?.name}
        className={css`
          .ant-page-header-heading {
            min-height: 48px;
          }
        `}
        extra={
          <IndicesPageExtra
            form={form}
            currentTab={tab}
            data={indice}
            isUpdate={editPermission.isAllow}
            isCreate={createPermission.isAllow}
          />
        }
        overlap
      />
      <Tabs
        activeKey={tab}
        items={[
          {
            key: 'info',
            label: (
              <IntlMessage id="logManagement.indices.basicInfomation" />
            ),
            children: (
              <IndicesInfo
                form={form}
                data={indice as IndiceDetail}
              />
            ),
          },
          {
            key: 'notification',
            label: (
              <IntlMessage id="logManagement.indices.notificationConditions" />
            ),
            children: (
              <IndicesNotificationConditionList
                permissions={{
                  isUpdate: editPermission.isAllow,
                  isDelete: deletePermission.isAllow,
                }}
              />
            ),
          },
          {
            key: 'forwarding',
            label: (
              <IntlMessage id="logManagement.indices.logForwarding" />
            ),
            children: (
              <IndicesLogForwardingList
                indiceId={indice?.id as string}
                organization={
                  indice?.organization as string
                }
              />
            ),
          },
          {
            key: 'hostname',
            label: (
              <IntlMessage id="logManagement.indices.host.hosts" />
            ),
            children: <IndicesAliasHost />,
          },
        ]}
        onChange={onTabChange}
      />
    </FallbackError>
  );
};

DetailIndice.getLayout = function getLayout(
  page: ReactElement
) {
  return (
    <AppLayout
      permission={{
        moduleName: [lm, core],
        productName: products.cyber,
        policies: [permissions['cyber:lm:indices:read']],
      }}
    >
      {page}
    </AppLayout>
  );
};

export default DetailIndice;
