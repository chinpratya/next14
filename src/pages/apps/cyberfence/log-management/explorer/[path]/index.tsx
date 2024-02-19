import { decode, encode } from 'punycode';

import {
  AppleOutlined,
  WindowsOutlined,
} from '@ant-design/icons';
import { Button, Dropdown, Typography } from 'antd';
import { useRouter } from 'next/router';
import { ReactElement, useEffect, useState } from 'react';

import { Flex } from '@/components/share-components/flex';
import { FallbackError } from '@/components/util-components/fallback-error';
import { IntlMessage } from '@/components/util-components/intl-message';
import {
  ExplorerBreadcrumb,
  ExplorerFileList,
  ExplorerFolderList,
  useListDirectory,
} from '@/features/log-management';
import { permissions, products } from '@/permissions';
import { logManagementModules } from '@/permissions/log-management';
import { PageHeader } from '@components/page-header';
import AppLayout from '@layouts/AppLayout';

const DIRECTORY_LEVEL = [
  'index',
  'date',
  'hour',
  'hostname',
  'file',
];

const { core, lm } = logManagementModules;

type Breadcrumb = {
  title: string;
  path: string;
};

const ExploreSubFolderPage = () => {
  const router = useRouter();
  const [breadcrumb, setBreadcrumb] = useState<
    Breadcrumb[]
  >([
    {
      title: 'Explorer',
      path: '/apps/cyberfence/log-management/explorer',
    },
  ]);

  const pathQuery = router.query.path;

  const [path, level, indexLabel] = decode(
    window.atob(pathQuery as string)
  ).split('&');

  const { data, isLoading, isError } = useListDirectory({
    params: {
      path,
      level,
    },
    enabled: level === 'file' ? false : true,
  });

  const currentLevelIndex = DIRECTORY_LEVEL.findIndex(
    (item) => item === level
  );

  const nextLevel =
    DIRECTORY_LEVEL[currentLevelIndex + 1];

  const onSetBreadcrumb = (value: Breadcrumb[]) =>
    setBreadcrumb(value);

  useEffect(() => {
    if (pathQuery) {
      let history: Breadcrumb[] = [
        {
          title: 'Explorer',
          path: '',
        },
      ];

      const pathArray = path.split('/');
      if (pathArray.length === 1) {
        history.push({
          title: indexLabel,
          path,
        });
      } else {
        history = [
          ...history,
          ...pathArray.slice(1).map((item, index) => {
            return {
              title: index === 0 ? indexLabel : item,
              path: window.btoa(
                encode(
                  `${pathArray
                    .slice(index === 0 ? 1 : 0, index + 2)
                    .join('/')}&${
                    DIRECTORY_LEVEL[index + 1]
                  }&${indexLabel}`
                )
              ),
            };
          }),
        ];
      }
      setBreadcrumb(history);
    }
  }, [indexLabel, path, pathQuery]);

  return (
    <FallbackError isError={isError}>
      <PageHeader
        title={
          <Flex flexDirection="column">
            <Typography.Text className="mb-2">
              <IntlMessage id="logManagement.explorer.title" />
            </Typography.Text>
            <ExplorerBreadcrumb breadcrumb={breadcrumb} />
          </Flex>
        }
        extra={
          level === 'file' && (
            <Dropdown
              menu={{
                items: [
                  {
                    key: 'windows',
                    label: 'Windows',
                    icon: <WindowsOutlined />,
                  },
                  {
                    key: 'macos',
                    label: 'IOS',
                    icon: <AppleOutlined />,
                  },
                ],
              }}
            >
              <Button type="primary">
                <IntlMessage id="logManagement.explorer.tool" />
              </Button>
            </Dropdown>
          )
        }
      />

      {level === 'file' ? (
        <ExplorerFileList
          path={path}
          onSetBreadcrumb={onSetBreadcrumb}
        />
      ) : (
        <ExplorerFolderList
          path={path}
          level={level}
          nextLevel={nextLevel}
          data={data}
          loading={isLoading}
          indexLabel={indexLabel}
        />
      )}
    </FallbackError>
  );
};

ExploreSubFolderPage.getLayout = function getLayout(
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
      {page}
    </AppLayout>
  );
};

export default ExploreSubFolderPage;
