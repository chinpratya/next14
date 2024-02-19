import { AutoComplete, Input } from 'antd';
import { ReactNode } from 'react';
import Scrollbars from 'react-custom-scrollbars';

import { PageHeader } from '@/components/share-components/page-header';
import { InnerAppLayout } from '@/layouts';

import { NewsSideBar } from '../news-side-bar';

type NewsMainLayoutProps = {
  children?: ReactNode;
};

const options = [
  {
    label: 'LINUX',
    options: [
      {
        label: 'Windows Server Windows 10 Pro',
        value: 'Windows Server Windows 10 Pro',
      },
      {
        label: 'Windows 7 Pro',
        value: 'Windows 7 Pro',
      },
    ],
  },
  {
    label: 'UNIX',
    options: [
      {
        label: 'Windows Server Windows 10 Pro',
        value: 'Windows Server Windows 10 Pro2',
      },
      {
        label: 'Windows 7 Pro',
        value: 'Windows 7 Pro2',
      },
    ],
  },
];

export const NewsMainLayout = ({
  children,
}: NewsMainLayoutProps) => {
  return (
    <>
      <PageHeader
        title="News"
        extra={
          <AutoComplete
            dropdownMatchSelectWidth={350}
            style={{ width: 350 }}
            options={options}
          >
            <Input.Search placeholder="ค้นหาแหล่งข่าว" />
          </AutoComplete>
        }
      />
      <InnerAppLayout
        sideContent={<NewsSideBar />}
        mainContent={<Scrollbars>{children}</Scrollbars>}
      />
    </>
  );
};
