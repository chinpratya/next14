import {
  GlobalOutlined,
  SafetyCertificateOutlined,
} from '@ant-design/icons';
import { css } from '@emotion/css';
import { Flex } from '@mantine/core';
import {
  Badge,
  Card,
  Table,
  Tooltip,
  Typography,
} from 'antd';
import { ColumnsType } from 'antd/lib/table';
import Link from 'next/link';
import { useRouter } from 'next/router';

import { DropdownTable } from '@/components/share-components/dropdown-table';
import { ShowTagDate } from '@/components/share-components/show-tag-date';

import { darkWebList } from '../../data';

export const DarkWebList = () => {
  const router = useRouter();

  const columns: ColumnsType<Record<string, unknown>> = [
    {
      title: 'Domain',
      fixed: 'left',
      width: 200,
      render: (data) => (
        <Link href={`${router.asPath}/${data.id}`}>
          {data.domain}
        </Link>
      ),
    },
    {
      title: 'Subdomain',
      dataIndex: 'subdomain',
      align: 'center',
      render: (subdomain) => (
        <Badge
          count={subdomain}
          showZero
          status="default"
          style={{ color: '#999999' }}
        />
      ),
    },
    {
      title: 'Threats',
      dataIndex: 'threats',
      align: 'center',
      render: (threats) => (
        <Badge
          count={threats}
          showZero
          status="success"
        />
      ),
    },
    {
      title: 'Mentions',
      dataIndex: 'mentions',
      align: 'center',
      render: (mentions) => (
        <Badge
          count={mentions}
          showZero
          status="processing"
        />
      ),
    },
    {
      title: 'Module Access',
      dataIndex: 'moduleAccess',
      render: (value: string[]) => (
        <Flex align="center" gap={6}>
          {value.map((item) => (
            <Tooltip title={item} key={item}>
              {item === 'network' ? (
                <GlobalOutlined
                  style={{ fontSize: 20 }}
                />
              ) : (
                <SafetyCertificateOutlined
                  style={{ fontSize: 20 }}
                />
              )}
            </Tooltip>
          ))}
        </Flex>
      ),
    },
    {
      title: 'Tags',
      dataIndex: 'tags',
      render: (value: string[]) => {
        const length = value.length;
        return (
          <>
            {length > 1 ? (
              <Flex align="center" gap={4}>
                <Typography.Text>
                  {value[0]}
                </Typography.Text>
                <div
                  className={css`
                    padding: 0 6px;
                    border: 1px solid #e6ebf1;
                    border-radius: 10px;
                    color: #9ca9b8;
                  `}
                >
                  +{length - 1}
                </div>
              </Flex>
            ) : (
              <Typography.Text>
                {value[0]}
              </Typography.Text>
            )}
          </>
        );
      },
    },
    {
      title: 'Created date',
      dataIndex: 'date',
      align: 'center',
      width: 170,
      render: (date: string) => (
        <ShowTagDate date={date} />
      ),
    },
    {
      key: 'action',
      align: 'right',
      fixed: 'right',
      width: 50,
      render: () => <DropdownTable items={[]} />,
    },
  ];

  return (
    <Card>
      <Table
        rowKey="id"
        dataSource={darkWebList}
        columns={columns}
        scroll={{ x: 1015 }}
        rowSelection={{
          type: 'checkbox',
        }}
      />
    </Card>
  );
};
