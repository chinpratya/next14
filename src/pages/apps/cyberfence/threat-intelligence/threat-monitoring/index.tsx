import type { MenuProps } from 'antd';
import { Card, Menu } from 'antd';
import { ReactElement, useState } from 'react';

import { InputSearch } from '@/components/share-components/input-search';
import { PageHeader } from '@/components/share-components/page-header';
import { ThreatMonitoringList } from '@/features/threat-intelligence';
import { InnerAppLayout } from '@/layouts';
import AppLayout from '@layouts/AppLayout';

const ThreatMonitoringPage = () => {
  const items: MenuProps['items'] = [
    {
      label: 'Network Access',
      key: 'networkAccess',
      children: [
        {
          label: 'Network Access1',
          key: 'networkAccess1',
        },
      ],
    },
    {
      label: 'Security Tools',
      key: 'securityTools',
      children: [],
    },
    {
      label: 'Access Control',
      key: 'accessControl',
      children: [],
    },
    {
      label: 'Software',
      key: 'software',
      children: [],
    },
    {
      label: 'ระบบปฏิบัติการ',
      key: 'systems',
      children: [
        {
          label: 'Microsoft Windows',
          key: 'microsoftWindows',
        },
        {
          label: 'LINUX',
          key: 'linux',
        },
        {
          label: 'UNIX',
          key: 'unix',
        },
      ],
    },
  ];

  const [currentMenu, setCurrentMenu] = useState<string>(
    'microsoftWindows'
  );

  return (
    <>
      <PageHeader
        title="Threat Monitoring"
        extra={
          <InputSearch placeholder="ค้นหาแหล่งข่าว" />
        }
      />

      <Card bodyStyle={{ padding: 0 }}>
        <InnerAppLayout
          sideContent={
            <Menu
              items={items}
              style={{ minWidth: 230 }}
              mode="inline"
              defaultOpenKeys={['systems']}
              defaultSelectedKeys={[currentMenu]}
              onClick={({ key }) => setCurrentMenu(key)}
            />
          }
          mainContent={
            <ThreatMonitoringList menu={currentMenu} />
          }
        />
      </Card>
    </>
  );
};

ThreatMonitoringPage.getLayout = function getLayout(
  page: ReactElement
) {
  return <AppLayout>{page}</AppLayout>;
};

export default ThreatMonitoringPage;
