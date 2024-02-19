import { Table, Form, Tabs, Typography } from 'antd';
import type { ColumnsType } from 'antd/es/table';
import { useEffect } from 'react';

import { useSearch } from '@/hooks';
import { Flex } from '@components/flex';
import { InputSearch } from '@components/input-search';
import { Modal } from '@components/modal';
import { ShowTagDate } from '@components/show-tag-date';
import { ShowTagStatus } from '@components/show-tag-status';
import { FallbackError } from '@utilComponents/fallback-error';
import { IntlMessage } from '@utilComponents/intl-message';

import { useGetRopa } from '../../api/get-ropa';
import { RopaDetail } from '../../types';
import { RopaBaseInfoForm } from '../ropa-base-info-form';

type RopaDetailModalProps = {
  open: boolean;
  onCancel: () => void;
  ropaId: string;
};

export const RopaDetailModal = ({
  open,
  onCancel,
  ropaId,
}: RopaDetailModalProps) => {
  const { debouncedSearch, onSearch } = useSearch();
  const [form] = Form.useForm();
  const { data, isLoading, isError } = useGetRopa({
    ropaId,
    search: debouncedSearch,
  });

  useEffect(() => {
    if (data) {
      form.setFieldsValue({ ...data.data.basicinfo });
    }
  }, [data, form]);

  const columns: ColumnsType<RopaDetail> = [
    {
      title: (
        <IntlMessage id="dataMapping.ropa.create.id" />
      ),
      key: 'ropaID',
      dataIndex: 'ropaID',
      ellipsis: true,
      width: 150,
    },
    {
      title: (
        <IntlMessage id="dataMapping.ropa.create.name" />
      ),
      key: 'name',
      dataIndex: 'name',
      width: 200,
    },
    {
      title: (
        <IntlMessage id="dataMapping.ropa.create.activityType" />
      ),
      key: 'actor',
      dataIndex: 'actor',
      width: 150,
    },
    {
      title: (
        <IntlMessage id="dataMapping.ropa.create.group" />
      ),
      key: 'group',
      dataIndex: 'group',
      width: 150,
    },
    {
      title: (
        <IntlMessage id="dataMapping.ropa.create.status" />
      ),
      key: 'status',
      dataIndex: 'status',
      width: 150,
      render: (status: string) => (
        <ShowTagStatus status={status} />
      ),
    },
    {
      title: (
        <IntlMessage id="dataMapping.ropa.create.owner" />
      ),
      key: 'owner',
      dataIndex: 'owner',
      width: 150,
    },
    {
      title: (
        <IntlMessage id="dataMapping.ropa.create.organization" />
      ),
      key: 'organization',
      dataIndex: 'organization',
      width: 150,
    },
    {
      title: (
        <IntlMessage id="dataMapping.ropa.create.createdDt" />
      ),
      dataIndex: 'created_dt',
      key: 'created_dt',
      width: 150,
      render: (date) => <ShowTagDate date={date} />,
    },
    {
      title: (
        <IntlMessage id="dataMapping.ropa.create.updatedDt" />
      ),
      dataIndex: 'updated_dt',
      key: 'updated_dt',
      width: 150,
      render: (date) => <ShowTagDate date={date} />,
    },
  ];

  return (
    <Modal
      title={
        <>
          <IntlMessage id="dataMapping.ropa.detail.title" />{' '}
          <Typography.Text type="secondary">
            {data?.data?.basicinfo?.name}
          </Typography.Text>
        </>
      }
      open={open}
      onCancel={onCancel}
      width={1200}
      loading={isLoading}
      footer={null}
      centered
    >
      <Tabs
        items={[
          {
            key: 'base-info',
            label: (
              <IntlMessage id="dataMapping.ropa.create.baseInfo" />
            ),
            children: <RopaBaseInfoForm form={form} />,
          },
          {
            key: 'processing',
            label: (
              <IntlMessage id="dataMapping.ropa.create.title" />
            ),
            children: (
              <FallbackError isError={isError}>
                <Flex
                  justifyContent="end"
                  className="mb-3"
                >
                  <InputSearch onSearch={onSearch} />
                </Flex>
                <Table
                  tableLayout="fixed"
                  scroll={{ x: 1000 }}
                  rowKey="ropaID"
                  columns={columns}
                  dataSource={data?.data.activity ?? []}
                />
              </FallbackError>
            ),
          },
        ]}
      />
    </Modal>
  );
};
