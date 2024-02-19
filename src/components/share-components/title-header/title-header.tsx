import { css } from '@emotion/css';
import { Flex } from '@mantine/core';
import { useMediaQuery } from '@mantine/hooks';
import { Typography } from 'antd';
import { useRouter } from 'next/router';
import { ReactNode } from 'react';

import { useBreadcrumb, UseBreadcrumb } from '@/hooks';
import { IntlMessage } from '@utilComponents/intl-message';

export type TitleHeaderProps = UseBreadcrumb & {
  title: string | ReactNode;
  icon?: ReactNode;
};

export const TitleHeader = ({
  title,
  icon,
  start,
  meta,
  tabKeys,
  dictionary,
}: TitleHeaderProps) => {
  const isMobile = useMediaQuery('(max-width: 768px)');

  const router = useRouter();
  const { breadcrumb } = useBreadcrumb({
    start,
    meta,
    tabKeys,
    dictionary,
  });

  return (
    <Flex
      className={css`
        .ant-typography {
          margin: 0 !important;
        }
      `}
      direction={isMobile ? 'column' : 'row'}
      gap={10}
    >
      <Flex align="center">
        <div
          className={css`
            padding: 0 5px;
            width: 35px;
            height: 35px;
            display: ${icon ? 'flex' : 'none'};
            border-radius: 50%;
            font-size: 20px;
            color: #3e79f7;
            justify-content: center;
            align-items: center;
            background-color: ${`#3e79f730`};
            margin-right: 10px;
          `}
        >
          {icon}
        </div>
        <Typography.Title className="mb-0" level={3}>
          {title}
        </Typography.Title>
      </Flex>
      <Flex align="center">
        {breadcrumb.map((item) => (
          <div
            key={item.path}
            className={css`
              margin-bottom: 0;

              .ant-typography {
                color: #3e79f7;
                font-size: 16px;
                font-weight: 400;
                cursor: pointer;

                max-width: 250px;
                overflow: hidden;
                white-space: nowrap;
                text-overflow: ellipsis;

                ::after {
                  color: #1a3353;
                  padding: 0 6px;
                  content: '>';
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
              onClick={
                item.path
                  ? () => router.push(`${item.path}`)
                  : undefined
              }
              className="text-capitalize mb-0"
            >
              <IntlMessage
                id={`breadcrumbs.${item.title}`}
                fallback={item.title}
              />
            </Typography.Title>
          </div>
        ))}
      </Flex>
    </Flex>
  );
};
