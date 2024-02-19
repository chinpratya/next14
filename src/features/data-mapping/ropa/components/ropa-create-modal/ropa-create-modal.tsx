import {
  Table,
  Steps,
  Row,
  Col,
  Divider,
  Form,
} from 'antd';
import type { ColumnsType } from 'antd/es/table';
import { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';

import {
  usePagination,
  useRowSelection,
  useSearch,
} from '@/hooks';
import { useNotifications } from '@/stores/notifications';
import { Flex } from '@components/flex';
import { InputSearch } from '@components/input-search';
import { Modal } from '@components/modal';
import { ShowTagDate } from '@components/show-tag-date';
import { ShowTagStatus } from '@components/show-tag-status';
import { FallbackError } from '@utilComponents/fallback-error';
import { IntlMessage } from '@utilComponents/intl-message';

import {
  Activity,
  useListActivity,
} from '../../../activity';
import { useCreateRopa } from '../../api/create-ropa';
import { RopaBaseInfoForm } from '../ropa-base-info-form';

type RopaCreateModalProps = {
  open: boolean;
  onCancel: () => void;
};

export const RopaCreateModal = ({
  open,
  onCancel,
}: RopaCreateModalProps) => {
  const { t } = useTranslation();
  const { showNotification } = useNotifications();
  const { debouncedSearch, search, onSearch } =
    useSearch();
  const {
    page,
    pageSize,
    onPaginationChange,
    Pagination,
  } = usePagination();
  const [current, setCurrent] = useState(0);
  const [value, setValue] = useState();
  const [form] = Form.useForm();
  const { rowSelection, setSelectedRowKeys } =
    useRowSelection({});

  const { data, isLoading, isError } = useListActivity({
    search: debouncedSearch,
    page,
    pageSize,
    status: 'active',
  });

  const createRopa = useCreateRopa({
    onSuccess: () => {
      showNotification({
        type: 'success',
        message: t(
          'dataMapping.notification.ropa.create'
        ) as string,
      });
      onCancel();
    },
  });

  const columns: ColumnsType<Activity> = [
    {
      title: (
        <IntlMessage id="dataMapping.ropa.create.id" />
      ),
      key: 'ObjectUUID',
      dataIndex: 'ObjectUUID',
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
      key: 'activityType',
      dataIndex: 'activityType',
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

  useEffect(() => {
    if (!open) {
      setSelectedRowKeys([]);
    }
  }, [open, setSelectedRowKeys]);

  const onSubmit = async () => {
    switch (current) {
      case 0:
        await form.validateFields();
        setValue(form.getFieldsValue());
        setCurrent(1);
        console.log('onSubmit', form.getFieldsValue());

        break;
      case 1:
        const payload = {
          ...(value ?? {}),
          activityID: rowSelection.selectedRowKeys,
        };

        createRopa.submit(payload);

        break;

      default:
        break;
    }
  };
  return (
    <Modal
      title={
        <IntlMessage id="dataMapping.ropa.create.title" />
      }
      open={open}
      onCancel={onCancel}
      width={1200}
      loading={isLoading}
      okButtonProps={{
        loading: createRopa.isLoading,
      }}
      onOk={() => onSubmit()}
      afterClose={() => {
        form.resetFields();
        setCurrent(0);
      }}
    >
      <FallbackError isError={isError}>
        <Row justify="center" align="middle">
          <Col style={{ width: '70%' }}>
            <Steps
              current={current}
              items={[
                {
                  title: (
                    <IntlMessage id="dataMapping.ropa.create.baseInfo" />
                  ),
                },
                {
                  title: (
                    <IntlMessage id="dataMapping.ropa.create.title" />
                  ),
                },
              ]}
            />
          </Col>
        </Row>
        <Divider />
        {current === 0 ? (
          <RopaBaseInfoForm form={form} />
        ) : (
          <>
            <Flex justifyContent="end" className="mb-3">
              <InputSearch
                search={search}
                onSearch={onSearch}
              />
            </Flex>
            <Table
              tableLayout="fixed"
              scroll={{ x: 1000 }}
              rowKey="ObjectUUID"
              columns={columns}
              dataSource={data?.data ?? []}
              rowSelection={rowSelection}
              pagination={false}
            />
            <Pagination
              total={data?.totalRecord}
              current={page}
              pageSize={pageSize}
              onChange={onPaginationChange}
            />
          </>
        )}
      </FallbackError>
    </Modal>
  );
};
