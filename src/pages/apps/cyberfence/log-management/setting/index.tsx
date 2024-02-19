import { Menu as AntdMenu, Skeleton } from 'antd';
import { ReactElement, useState } from 'react';
import { useTranslation } from 'react-i18next';

import { FallbackError } from '@/components/util-components/fallback-error';
import { IntlMessage } from '@/components/util-components/intl-message';
import {
  SettingHashingCompression,
  SettingNtp,
  SettingSystem,
  useGetSetting,
  useGetStratum,
} from '@/features/log-management';
import { InitalSystemWrapper } from '@/features/shared';
import { usePermission } from '@/hooks';
import { InnerAppLayout } from '@/layouts';
import { permissions, products } from '@/permissions';
import { logManagementModules } from '@/permissions/log-management';
import { PageHeader } from '@components/page-header';
import AppLayout from '@layouts/AppLayout';

type Menu =
  | 'information'
  | 'ntpSetting'
  | 'hashingAndCompression';

const { lm, core } = logManagementModules;

const SettingPage = () => {
  const { t } = useTranslation();
  const setting = useGetSetting({});
  const stratum = useGetStratum({});

  const [menu, setMenu] = useState<Menu>('information');

  const editPermission = usePermission({
    moduleName: 'core',
    policies: [permissions['cyber:core:setting:update']],
  });

  const items = [
    {
      label: t('logManagement.setting.information'),
      key: 'information',
    },
    {
      label: t('logManagement.setting.ntpSetting'),
      key: 'ntpSetting',
    },
    {
      label: t(
        'logManagement.setting.hashingAndCompression'
      ),
      key: 'hashingAndCompression',
    },
  ];

  return (
    <>
      <PageHeader
        title={
          <IntlMessage id="logManagement.setting.general" />
        }
      />

      <FallbackError
        isError={setting.isError || stratum.isError}
      >
        <InnerAppLayout
          sideContent={
            <AntdMenu
              mode="inline"
              onClick={({ key }) => setMenu(key as Menu)}
              selectedKeys={[menu]}
              style={{ minWidth: 230 }}
              items={items}
            />
          }
          mainContent={
            <>
              {setting.isLoading || stratum.isLoading ? (
                <Skeleton paragraph={{ rows: 6 }} />
              ) : menu === 'ntpSetting' ? (
                <SettingNtp
                  setting={setting.data}
                  stratum={stratum.data}
                  canUpdate={editPermission.isAllow}
                />
              ) : menu === 'information' ? (
                <SettingSystem
                  setting={setting.data}
                  canUpdate={editPermission.isAllow}
                />
              ) : (
                <SettingHashingCompression
                  setting={setting.data}
                  stratum={stratum.data}
                  canUpdate={editPermission.isAllow}
                />
              )}
            </>
          }
        />
      </FallbackError>
    </>
  );
};

SettingPage.getLayout = function getLayout(
  page: ReactElement
) {
  return (
    <AppLayout
      permission={{
        moduleName: [core],
        productName: products.cyber,
        policies: [
          permissions['cyber:core:setting:read'],
        ],
      }}
    >
      <InitalSystemWrapper>{page}</InitalSystemWrapper>
    </AppLayout>
  );
};

export default SettingPage;
