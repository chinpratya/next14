import {
  EditOutlined,
  PlusCircleOutlined,
} from '@ant-design/icons';
import {
  Button,
  Card,
  Table,
  Tag,
  Typography,
} from 'antd';
import type { ColumnsType } from 'antd/es/table';

import { useToggle } from '@/hooks';
import { DropdownTable } from '@components/dropdown-table';
import { ShowTagDate } from '@components/show-tag-date';
import { ShowTagStatus } from '@components/show-tag-status';
import { FallbackError } from '@utilComponents/fallback-error';

import { useListRequestVerification } from '../../api/list-request-verification';
import { RequestVerification } from '../../types';
import { RequestDetailVerificationManageModal } from '../request-detail-verification-manage-modal';
import { RequestDetailVerificationMangeModalDetail } from '../request-detail-verification-mange-modal-detail';
type RequestDetailVerificationListProps = {
  requestId: string;
};

export const RequestDetailVerificationList = ({
  requestId,
}: RequestDetailVerificationListProps) => {
  const toggle = useToggle();

  const { data, isLoading, isError } =
    useListRequestVerification(requestId);

  const columns: ColumnsType<RequestVerification> = [
    {
      title: 'วิธีการตรวจสอบ',
      key: 'name',
      ellipsis: true,
      width: 150,
      render: (verification: RequestVerification) => (
        <Typography.Link
          onClick={() => toggle.edit(verification)}
        >
          {verification?.name}
        </Typography.Link>
      ),
    },
    {
      title: 'แสดงความคิดเห็นของงาน',
      dataIndex: 'comment',
      key: 'comment',
      width: 150,
    },
    {
      title: 'สถานะ',
      dataIndex: 'status',
      key: 'status',
      width: 150,
      render: (status: string) => (
        <ShowTagStatus status={`${status}`} />
      ),
    },
    {
      title: 'การยืนยันตัวตน',
      dataIndex: 'result',
      key: 'result',
      width: 150,
      render: (result: string) =>
        result === 'Unverified' ? (
          <Tag color="error">{result}</Tag>
        ) : (
          <Tag color="success">{result}</Tag>
        ),
    },
    {
      title: 'วันที่แก้ไข',
      dataIndex: 'updateDt',
      key: 'updateDt',
      width: 150,
      render: (date: string) => (
        <ShowTagDate date={date} />
      ),
    },
    {
      key: 'action',
      align: 'right',
      width: 50,
      render: (verification: RequestVerification) => (
        <DropdownTable
          items={[
            {
              key: 'edit',
              label: 'Edit',
              icon: <EditOutlined />,
              onClick: () => toggle.manage(verification),
            },
          ]}
        />
      ),
    },
  ];

  return (
    <FallbackError isError={isError}>
      <Card
        bordered={false}
        extra={
          <Button
            type="primary"
            icon={<PlusCircleOutlined />}
            onClick={() => toggle.manage()}
          >
            เพิ่มการตรวจสอบ
          </Button>
        }
      >
        <Table
          rowKey="identifyID"
          tableLayout="fixed"
          scroll={{
            x: 800,
          }}
          columns={columns}
          dataSource={data?.data ?? []}
          loading={isLoading}
          pagination={false}
        />
        <RequestDetailVerificationManageModal
          open={toggle.openManage}
          onCancel={() => toggle.manage()}
          requestId={requestId as string}
          identifyId={toggle.data?.identifyID}
        />
        <RequestDetailVerificationMangeModalDetail
          open={toggle.openEdit}
          onClose={() => toggle.edit()}
          requestId={requestId as string}
          identifyId={toggle.data?.identifyID}
        />
      </Card>
    </FallbackError>
  );
};
