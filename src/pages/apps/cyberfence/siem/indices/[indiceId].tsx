import { Form, Tabs } from 'antd';
import { useRouter } from 'next/router';
import { ReactElement, useState } from 'react';

import { FallbackError } from '@/components/util-components/fallback-error';
import { IntlMessage } from '@/components/util-components/intl-message';
import {
  IndiceDetail,
  IndicesAliasHost,
  IndicesInfo,
  IndicesNotificationConditionList,
  IndicesPageExtra,
  useGetIndice,
} from '@/features/siem';
import { usePermission } from '@/hooks';
import { permissions, products } from '@/permissions';
import { Loading } from '@components/loading';
import { PageHeader } from '@components/page-header';
import AppLayout from '@layouts/AppLayout';

const moduleName = 'siem';

const DetailIndice = () => {
  const router = useRouter();
  const [form] = Form.useForm();

  const [tab, setTab] = useState('info');

  const indiceId = router.query.indiceId as string;

  const {
    data: indice,
    isLoading,
    isError,
  } = useGetIndice(indiceId);

  const createPermission = usePermission({
    moduleName,
    policies: [permissions['cyber:siem:indices:create']],
  });

  const editPermission = usePermission({
    moduleName,
    policies: [permissions['cyber:siem:indices:update']],
  });

  const deletePermission = usePermission({
    moduleName,
    policies: [permissions['cyber:siem:indices:delete']],
  });

  const onTabChange = (key: string) => {
    setTab(key);
  };

  if (isLoading) return <Loading cover="content" />;

  return (
    <FallbackError isError={isError}>
      <PageHeader
        onBack={router.back}
        title={
          <IntlMessage id="logManagement.indices.title" />
        }
        subtitle={indice?.name}
        extra={
          <IndicesPageExtra
            isUpdate={editPermission.isAllow}
            isCreate={createPermission.isAllow}
            form={form}
            currentTab={tab}
            data={indice}
          />
        }
        overlap
      />
      <Tabs
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
        moduleName: ['siem', 'core'],
        productName: products.cyber,
        policies: [
          permissions['cyber:siem:indices:read'],
        ],
      }}
    >
      {page}
    </AppLayout>
  );
};

export default DetailIndice;
