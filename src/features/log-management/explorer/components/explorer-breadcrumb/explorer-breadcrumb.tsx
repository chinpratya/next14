import { css } from '@emotion/css';
import { Typography } from 'antd';
import { useRouter } from 'next/router';

import { Flex } from '@/components/share-components/flex';
import { IntlMessage } from '@/components/util-components/intl-message';

type ExplorerBreadcrumbProps = {
  breadcrumb: { title: string; path: string }[];
};

export const ExplorerBreadcrumb = ({
  breadcrumb,
}: ExplorerBreadcrumbProps) => {
  const router = useRouter();

  const onClick = (path: string) => {
    router.push(
      `/apps/cyberfence/log-management/explorer/${path}`
    );
  };

  return (
    <Flex justifyContent="start" alignItems="center">
      {breadcrumb.map((item, index) => (
        <div
          key={index}
          className={css`
            margin-bottom: 0;

            .ant-typography {
              color: #3e79f7;
              font-size: 14px;
              font-weight: 400;
              cursor: pointer;

              ::after {
                color: #1a3353;
                padding: 0 4px;
                content: '/';
              }
            }

            :last-child .ant-typography {
              color: #455560 !important;
              cursor: default;
              pointer-events: none;

              ::after {
                content: '';
              }
            }
          `}
        >
          <Typography.Title
            level={5}
            onClick={() => onClick(item.path)}
          >
            <IntlMessage
              id={`breadcrumbs.${item.title}`}
              fallback={item.title}
            />
          </Typography.Title>
        </div>
      ))}
    </Flex>
  );
};
