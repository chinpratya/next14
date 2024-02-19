import {
  DownOutlined,
  FilterOutlined,
  SearchOutlined,
} from '@ant-design/icons';
import { css } from '@emotion/css';
import { Flex } from '@mantine/core';
import { Button, Card, Dropdown, Input } from 'antd';

import { IntlMessage } from '@/components/util-components/intl-message';

export const FeedSearch = () => {
  return (
    <Card>
      <Flex className="w-100" gap={16}>
        <Button
          icon={<FilterOutlined />}
          style={{ width: 70 }}
        />

        <Dropdown
          menu={{ items: [] }}
          trigger={['click']}
          className={css`
            width: 170px;
          `}
        >
          <Button
            className={css`
              display: flex;
              align-items: center;
              justify-content: space-between;
              gap: 14px;
            `}
          >
            Templates
            <DownOutlined style={{ color: '#D0D4D7' }} />
          </Button>
        </Dropdown>

        <Input.Search
          enterButton={
            <Button
              icon={<SearchOutlined className="mr-2" />}
              type="primary"
            >
              <IntlMessage id="logManagement.search" />
            </Button>
          }
        />
      </Flex>
    </Card>
  );
};
