import { FolderOpenOutlined } from '@ant-design/icons';
import { css } from '@emotion/css';
import { Flex } from '@mantine/core';
import {
  Button,
  Divider,
  Dropdown,
  Input,
  MenuProps,
  Typography,
} from 'antd';

export const NewsSourceFollowButton = () => {
  const items: MenuProps['items'] = [
    {
      key: '1',
      label: (
        <Typography.Text>
          <FolderOpenOutlined className="mr-2" />
          Cyber Security
        </Typography.Text>
      ),
    },
    {
      key: '2',
      label: (
        <Typography.Text>
          <FolderOpenOutlined className="mr-2" />
          Security
        </Typography.Text>
      ),
    },
    {
      key: '3',
      label: (
        <Typography.Text>
          <FolderOpenOutlined className="mr-2" />
          Cyber
        </Typography.Text>
      ),
    },
  ];

  return (
    <>
      <Dropdown
        trigger={['click']}
        menu={{ items }}
        dropdownRender={(menu) => (
          <div
            className={css`
              width: 416px;
              background: #fff;
              box-shadow: 0 3px 6px -4px rgb(0 0 0 / 12%),
                0 6px 16px 0 rgb(0 0 0 / 8%),
                0 9px 28px 8px rgb(0 0 0 / 5%);
              border-radius: 4px;

              .ant-dropdown-menu {
                box-shadow: none;
                border-radius: 0;
              }
            `}
          >
            {menu}
            <Divider style={{ margin: 0 }} />
            <Flex align="center" gap={16} className="p-3">
              <Input
                placeholder="กรอกชื่อโฟลเดอร์"
                style={{ maxWidth: 280 }}
              />
              <Typography.Link
                style={{
                  color: 'rgba(112, 74, 255, 0.8)',
                }}
              >
                + เพิ่มโฟลเดอร์
              </Typography.Link>
            </Flex>
          </div>
        )}
      >
        <Button
          type="primary"
          style={{ backgroundColor: '#7F61FF' }}
        >
          ติดตาม
        </Button>
      </Dropdown>
    </>
  );
};
