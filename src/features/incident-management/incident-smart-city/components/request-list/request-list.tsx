import { DownloadOutlined } from '@ant-design/icons';
import { Button, Card, Table, Typography } from 'antd';
import type { ColumnsType } from 'antd/es/table';
import React from 'react';

import {
  PROCESSING_COLOR,
  SUCCESS_COLOR,
  PENDING_COLOR,
} from '@/config/color';
import {
  useColumnFiltered,
  usePagination,
  useSearch,
  useToggle,
} from '@/hooks';
import { DropdownTable } from '@components/dropdown-table';
import { InputSearch } from '@components/input-search';
import { ShowTagDate } from '@components/show-tag-date';
import { ShowTagStatus } from '@components/show-tag-status';
import { FallbackError } from '@utilComponents/fallback-error';

import {
  useListRequest,
  listRequest,
} from '../../api/list-request';
import { Request, RequestResponse } from '../../types';
import { RequestCloseModal } from '../request-close-modal';
import { RequestRejectModal } from '../request-reject-modal';

export type RequestListProps = {
  onEdit?: (request: Request) => void;
};

export const RequestList = ({
  onEdit,
}: RequestListProps) => {
  const toggle = useToggle();

  const { debouncedSearch, search, onSearch } =
    useSearch();
  const {
    page,
    pageSize,
    onPaginationChange,
    Pagination,
  } = usePagination();

  const { data, isLoading, isError } = useListRequest({
    search: debouncedSearch,
    page,
    pageSize,
  });
  const [incidentData, setNewEvent] =
    React.useState<RequestResponse>(
      data as unknown as RequestResponse
    );
  const columns: ColumnsType<Request> = [
    {
      title: 'รหัส',
      key: 'requestID',
      ellipsis: true,
      width: 100,
      render: (request: Request) => (
        <Typography.Link
          onClick={() => onEdit?.(request)}
        >
          {request.requestID}
        </Typography.Link>
      ),
    },
    {
      title: 'ชื่อ',
      dataIndex: 'name',
      key: 'name',
      width: 150,
    },
    {
      title: 'ชื่อขั้นตอนการทำงาน',
      dataIndex: 'workflowName',
      key: 'workflowName',
      width: 150,
    },
    {
      title: 'กลุ่มเหตุการณ์',
      key: 'requestType',
      width: 150,
      ellipsis: true,
      render: (request: Request) => (
        <Typography.Text
          type="secondary"
          style={{
            textTransform: 'capitalize',
          }}
        >
          {request?.requestType?.event_cateogry.replace(
            /_/g,
            ' '
          ) || 'Intrusion'}
        </Typography.Text>
      ),
    },
    {
      title: 'กลุ่มย่อยของเหตุการณ์',
      key: 'requestType',
      width: 150,
      ellipsis: true,
      render: (request: Request) => (
        <Typography.Text
          type="secondary"
          style={{
            textTransform: 'capitalize',
          }}
        >
          {request?.requestType?.sub_event_cateogry.replace(
            /_/g,
            ' '
          ) || 'Emergency Response'}
        </Typography.Text>
      ),
    },
    {
      title: 'ประเภทเหตุการณ์',
      key: 'requestType',
      width: 150,
      ellipsis: true,
      render: (request: Request) => (
        <Typography.Text
          type="secondary"
          style={{
            textTransform: 'capitalize',
          }}
        >
          {request?.requestType?.event_cateogry_type.replace(
            /_/g,
            ' '
          ) || 'Intrusion'}
        </Typography.Text>
      ),
    },
    {
      title: 'สถานะ',
      dataIndex: 'status',
      key: 'status',
      width: 150,
      render: (status: string) => (
        <ShowTagStatus
          status={status}
          items={[
            {
              label: 'เปิด',
              key: 'opened',
              color: PROCESSING_COLOR,
            },
            {
              label: 'กำลังดำเนินการ',
              key: 'inprogress',
              color: PENDING_COLOR,
            },
            {
              label: 'เสร็จสิ้น',
              key: 'closed',
              color: SUCCESS_COLOR,
            },
          ]}
        />
      ),
    },
    {
      title: 'วันที่เหลือ',
      dataIndex: 'timeReminded',
      key: 'timeReminded',
      width: 150,
    },
    {
      title: 'วันที่สร้าง',
      dataIndex: 'createDt',
      key: 'createDt',
      width: 170,
      align: 'center',
      render: (date: string) => (
        <ShowTagDate date={date} />
      ),
    },
    {
      title: 'วันที่แก้ไข',
      dataIndex: 'updateDt',
      key: 'updateDt',
      width: 170,
      align: 'center',
      render: (date: string) => (
        <ShowTagDate date={date} />
      ),
    },
    {
      key: 'action',
      align: 'right',
      width: 50,
      render: (request: Request) => (
        <DropdownTable
          items={[
            {
              key: 'close',
              label: 'Close',
              onClick: () => toggle.remove(request),
            },
            {
              key: 'reject',
              label: 'Reject',
              onClick: () => toggle.reject(request),
            },
          ]}
        />
      ),
    },
  ];

  const { filteredColumns, ColumnTransfer } =
    useColumnFiltered({
      columns,
    });
  // React.useEffect(() => {
  //   setNewEvent(data?.data as unknown as RequestResponse);
  // }, [data?.data]);

  React.useEffect(() => {
    const interval = setInterval(() => {
      const data: Promise<RequestResponse> = listRequest({
        search: debouncedSearch,
        page,
        pageSize,
      });
      data.then((response: RequestResponse) => {
        setNewEvent(response);
      });
    }, 3000);
    return () => clearInterval(interval);
  }, [debouncedSearch, page, pageSize]);

  return (
    <FallbackError isError={isError}>
      <Card
        extra={
          <>
            <InputSearch
              search={search}
              onSearch={onSearch}
              className="mx-2"
            />
            <Button
              type="primary"
              icon={<DownloadOutlined />}
              className="mr-2"
            >
              ส่งออก
            </Button>
            {ColumnTransfer}
          </>
        }
      >
        <Table
          rowKey="requestID"
          tableLayout="fixed"
          scroll={{
            x: 1050,
          }}
          columns={filteredColumns}
          dataSource={incidentData?.data ?? data?.data}
          loading={isLoading}
          pagination={false}
        />
        <Pagination
          current={page}
          total={data?.totalRecord}
          pageSize={pageSize}
          onChange={onPaginationChange}
        />
        <RequestCloseModal
          open={toggle.openRemove}
          onCancel={() => toggle.remove()}
          requestId={toggle?.data?.requestID}
        />
        <RequestRejectModal
          open={toggle.openReject}
          onCancel={() => toggle.reject()}
          requestId={toggle?.data?.requestID}
        />
      </Card>
    </FallbackError>
  );
};
