import { css } from '@emotion/css';
import { Card, Typography } from 'antd';
import Image from 'next/image';

import { WHITE_SECONDARY_COLOR } from '@/config/color';
import { AppConfig } from '@/types/apps';

export type AppItemProps = {
  item: AppConfig;
  current: string;
  onClick?: (appId: string) => void;
};
export const AppItem = ({
  item,
  current,
  onClick,
}: AppItemProps) => (
  <Card
    onClick={() => onClick?.(item.id)}
    className={css`
      border: ${current === item.id
        ? '2px solid #1890ff'
        : '1px solid #f0f0f0'};
      height: 100%;

      :hover {
        cursor: pointer;
        box-shadow: rgba(149, 157, 165, 0.2) 0 8px 24px;
      }
    `}
  >
    <Card
      className={css`
        .ant-card-body {
          background-color: ${WHITE_SECONDARY_COLOR};
          text-align: center;
        }
      `}
    >
      <Image
        src={(item?.logo as string) ?? ''}
        alt={`logo app ${item.title}`}
        width={250}
        height={70}
      />
    </Card>
    <Typography.Title level={2}>
      {item.title}
    </Typography.Title>
    <Typography.Text>{item.description}</Typography.Text>
  </Card>
);
