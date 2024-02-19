import { css } from '@emotion/css';
import { Tag, Typography } from 'antd';

import { IntlMessage } from '@utilComponents/intl-message';

import { Status, STATUS_ITEMS } from './tag-status-meta';

export type ShowTagStatusProps = {
  status?: string;
  items?: Status[];
  item?: Status;
  bordered?: boolean;
};

export const ShowTagStatus = ({
  status,
  items = [],
  item,
  bordered = true,
}: ShowTagStatusProps) => {
  const statusItem =
    item ??
    [...items, ...STATUS_ITEMS]?.find(
      (item) =>
        item.key.toLowerCase() === status?.toLowerCase()
    );

  if (!statusItem) {
    return null;
  }

  const { label, color, icon } = statusItem;

  return (
    <Tag
      className={css`
        padding: 1px 5px;
        text-align: center;
        background: ${bordered
          ? `${color}10`
          : `${color}30`} !important;
        color: ${color} !important;
        border: ${bordered
          ? `1px solid ${color}`
          : 'none'} !important;
        min-width: 80px;

        .ant-typography {
          color: ${color};
        }
      `}
    >
      <Typography.Text
        className="d-flex align-items-center justify-content-center"
        style={{ gap: 4 }}
      >
        {icon}
        <IntlMessage
          id={typeof label === 'string' ? label : ''}
          fallback={
            typeof label === 'string'
              ? label
              : 'undefined'
          }
        />
      </Typography.Text>
    </Tag>
  );
};
