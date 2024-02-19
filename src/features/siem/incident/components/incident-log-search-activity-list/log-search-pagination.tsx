import {
  LeftOutlined,
  RightOutlined,
} from '@ant-design/icons';
import { css } from '@emotion/css';
import { Flex } from '@mantine/core';
import { Button, Typography } from 'antd';

import { IntlMessage } from '@/components/util-components/intl-message';

type LogSearchPaginationProps = {
  current?: number;
  total?: number;
  loading?: boolean;
  onChange?: (page: number) => void;
};

export const LogSearchPagination = ({
  total = 1,
  current = 1,
  loading,
  onChange,
}: LogSearchPaginationProps) => {
  return (
    <Flex
      align="center"
      justify="space-between"
      className="mt-4"
    >
      <Typography.Text>
        <IntlMessage
          id="logManagement.logSearch.pagination.info"
          options={{
            current,
            total: total === 0 ? 1 : total,
          }}
        />
      </Typography.Text>

      <Flex
        gap="sm"
        className={css`
          button {
            width: 32px;
            height: 32px;
            padding: 0;
            border-radius: 2px;

            svg {
              font-size: 12px;
            }
          }
        `}
      >
        <Button
          type="primary"
          ghost
          disabled={current === 1}
          loading={loading}
          onClick={() => onChange?.(current - 1)}
          icon={<LeftOutlined />}
        />
        <Button
          type="primary"
          ghost
          disabled={current >= total}
          loading={loading}
          icon={<RightOutlined />}
          onClick={() => onChange?.(current + 1)}
        />
      </Flex>
    </Flex>
  );
};
