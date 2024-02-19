import { PlusCircleOutlined } from '@ant-design/icons';
import { css } from '@emotion/css';
import { Flex } from '@mantine/core';
import {
  Card,
  Dropdown,
  Rate,
  Table,
  Tag,
  Typography,
} from 'antd';
import type { ColumnsType } from 'antd/lib/table';
import Link from 'next/link';
import { useRouter } from 'next/router';

import { ShowTagDate } from '@/components/share-components/show-tag-date';

import { FeedSearch } from '../feed-search';

import mock from './mock.json';

export const FeedList = () => {
  const router = useRouter();

  const columns: ColumnsType<Record<string, unknown>> = [
    {
      key: 'rating',
      title: 'Rating',
      dataIndex: 'rating',
      width: 160,
      render: (rating: number) => (
        <Rate
          disabled
          allowHalf
          defaultValue={rating}
          style={{ fontSize: 16 }}
        />
      ),
    },
    {
      key: 'source',
      title: 'Source',
      render: ({ id, source }) => {
        return (
          <Flex direction="column" gap={4}>
            <Link
              href={`${router.pathname}/${id}/analysis`}
              style={{ fontWeight: 'bold' }}
            >
              {source.title}
            </Link>
            <Typography.Text style={{ color: '#72849a' }}>
              {source.body}
            </Typography.Text>

            <Flex wrap="wrap">
              {source.tag.map((item: string) => (
                <Tag
                  key={item}
                  className={css`
                    width: fit-content;
                    background-color: #f2efff;
                    color: #704aff;
                    font-weight: 700;
                  `}
                >
                  {item}
                </Tag>
              ))}
            </Flex>
          </Flex>
        );
      },
    },
    {
      key: 'detail',
      title: 'Detail',
      dataIndex: 'detail',
      width: 240,
      render: (detail) => (
        <Flex direction="column">
          <Typography.Text strong>
            {detail.title}
          </Typography.Text>
          <Typography.Text style={{ color: '#72849a' }}>
            Total Data : {detail.total_data}
          </Typography.Text>
          <Typography.Text style={{ color: '#72849a' }}>
            Update Frequency : {detail.update_frequency}
          </Typography.Text>
        </Flex>
      ),
    },
    {
      key: 'updatedAt',
      title: 'Update At',
      dataIndex: 'updatedAt',
      align: 'center',
      width: 170,
      render: (date) => <ShowTagDate date={date} />,
    },
    {
      key: 'action',
      title: 'Action',
      align: 'center',
      width: 100,
      fixed: 'right',
      render: () => (
        <Dropdown menu={{ items: [] }}>
          <PlusCircleOutlined />
        </Dropdown>
      ),
    },
  ];

  return (
    <>
      <FeedSearch />

      <Card>
        <Table
          rowKey="id"
          dataSource={mock.data}
          columns={columns}
          scroll={{ x: 1000 }}
        />
      </Card>
    </>
  );
};
