import {
  FieldTimeOutlined,
  FolderOpenOutlined,
  SolutionOutlined,
} from '@ant-design/icons';
import { css } from '@emotion/css';
import { Flex } from '@mantine/core';
import { Menu, Typography } from 'antd';
import { useRouter } from 'next/router';

import {
  APP_PATH,
  CYBERFENCE_PATH,
  CYBERFENCE_CYBER_THREAT_INTELLIGENCE_PATH,
} from '@/config/modules';
import utils from '@/utils';

import { color } from '../../../shared';

import data from './mock-data.json';

export const NewsSideBar = () => {
  const path = `${APP_PATH}${CYBERFENCE_PATH}${CYBERFENCE_CYBER_THREAT_INTELLIGENCE_PATH}/news`;
  const router = useRouter();

  return (
    <Menu
      style={{ width: 256 }}
      selectedKeys={utils.navigateSelectedKeys(
        router.pathname
      )}
      defaultOpenKeys={['cyberSecurity']}
      mode="inline"
      className={css`
        .ant-menu-item-group-title {
          font-size: 14px;
        }

        .ant-menu-sub.ant-menu-inline > .ant-menu-item {
          padding-right: 10px !important;
        }
      `}
      items={[
        {
          key: `${path}/today`,
          label: 'ข่าววันนี้',
          icon: <FieldTimeOutlined />,
          onClick: () => router.push(`${path}/today`),
        },
        {
          key: `${path}/source`,
          label: 'แหล่งข่าว',
          icon: <SolutionOutlined />,
          onClick: () => router.push(`${path}/source`),
        },
        { type: 'divider' },
        {
          type: 'group',
          label: 'การติดตาม',
        },
        {
          key: 'cyberSecurity',
          label: 'Cyber Security',
          icon: <FolderOpenOutlined />,
          children: data.cyberSecurity.children.map(
            (item, index) => ({
              key: item.key,
              label: (
                <Flex
                  align="center"
                  justify="space-between"
                >
                  <Typography.Text>
                    {item.label}
                  </Typography.Text>
                  <Typography.Text
                    className={css`
                      border-radius: 10px;
                      border: 1px solid #e6ebf1;
                      height: 20px;
                      width: 36px;
                      font-size: 12px;
                      display: flex;
                      align-items: center;
                      justify-content: center;
                      color: #72849a;
                    `}
                  >
                    +{item.follow}
                  </Typography.Text>
                </Flex>
              ),
              icon: (
                <CustomIcon
                  text={item.label}
                  color={color.list[index]}
                />
              ),
            })
          ),
        },
        {
          key: 'security',
          label: 'Security',
          icon: <FolderOpenOutlined />,
          children: [
            {
              key: 'security1',
              label: 'Security1',
              icon: <SolutionOutlined />,
            },
          ],
        },
        {
          key: 'cyber',
          label: 'Cyber',
          icon: <FolderOpenOutlined />,
          children: [
            {
              key: 'cyber1',
              label: 'Cyber1',
              icon: <SolutionOutlined />,
            },
          ],
        },
      ]}
    />
  );
};

const CustomIcon = ({
  text,
  color,
}: {
  text: string;
  color: string;
}) => {
  return (
    <span
      className={css`
        width: 17px;
        height: 17px;
        display: flex;
        border-radius: 50%;
        background-color: ${color};
        color: #fff;
        font-size: 12px;
        align-items: center;
        justify-content: center;
        margin-right: 10px;
      `}
    >
      {text[0]}
    </span>
  );
};
