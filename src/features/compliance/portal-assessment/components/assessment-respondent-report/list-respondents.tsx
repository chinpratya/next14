import { EyeOutlined } from '@ant-design/icons';
import { css } from '@emotion/css';
import { useToggle } from '@mantine/hooks';
import { Card, Divider, Table, Typography } from 'antd';
import { ColumnsType } from 'antd/es/table';
import { useState } from 'react';

import { useColumnFiltered } from '@/hooks';
import { DropdownTable } from '@components/dropdown-table';
import { Modal } from '@components/modal';
import { ShowPassTagDate } from '@components/show-pass-tag-date';
import { ShowTagStatus } from '@components/show-tag-status';
import { IntlMessage } from '@utilComponents/intl-message';

import { STATUS_ITEMS } from '../../config/status';
import { ListAssessors } from '../../types/report';

import { RespondentDetail } from './respondent-detail';

export type ListRespondentsProps = {
  isLoading: boolean;
  respondents: ListAssessors[];
  assessmentId: string;
};

type getColumnsProps = {
  toggleModal: (id: string) => void;
};

const getColumns = ({
  toggleModal,
}: getColumnsProps): ColumnsType<ListAssessors> => {
  return [
    {
      title: (
        <IntlMessage id="compliancePortal.result.detail.respondent.name" />
      ),
      key: 'name',
      width: 300,
      render: (data: ListAssessors) => (
        <Typography.Link
          onClick={() => toggleModal(data.ObjectUUID)}
        >
          {data.name}
        </Typography.Link>
      ),
    },
    {
      title: (
        <IntlMessage id="compliancePortal.result.detail.respondent.email" />
      ),
      key: 'email',
      width: 250,
      dataIndex: 'email',
    },
    {
      title: (
        <IntlMessage id="compliancePortal.result.detail.respondent.approver" />
      ),
      key: 'approver',
      width: 250,
      dataIndex: 'approver',
    },
    {
      title: (
        <IntlMessage id="compliancePortal.result.detail.respondent.status" />
      ),
      key: 'status',
      width: 200,
      dataIndex: 'status',
      render: (status) => (
        <ShowTagStatus
          status={status}
          items={STATUS_ITEMS}
        />
      ),
    },
    {
      title: (
        <IntlMessage id="compliancePortal.result.detail.respondent.deadlineDt" />
      ),
      key: 'deadlineDt',
      width: 300,
      dataIndex: 'deadlineDt',
      render: (date: string) => (
        <ShowPassTagDate date={date} />
      ),
    },
    {
      title: (
        <IntlMessage id="compliancePortal.result.detail.respondent.isExtend" />
      ),
      key: 'isExtend',
      width: 300,
      dataIndex: 'isExtend',
      render: (isExtend: boolean) =>
        isExtend ? (
          <IntlMessage id="compliancePortal.result.detail.respondent.isExtend.true" />
        ) : (
          <IntlMessage id="compliancePortal.result.detail.respondent.isExtend.false" />
        ),
    },
    {
      key: 'action',
      width: 50,
      render: (data: ListAssessors) => (
        <DropdownTable
          items={[
            {
              key: 'edit',
              label: (
                <IntlMessage id="compliancePortal.result.detail.respondent.view" />
              ),
              icon: <EyeOutlined />,
              onClick: () => toggleModal(data.ObjectUUID),
            },
          ]}
        />
      ),
    },
  ];
};

export const ListRespondents = ({
  isLoading,
  respondents,
  assessmentId,
}: ListRespondentsProps) => {
  const [respondentId, setRespondentId] = useState('');
  const [openModal, toggleModal] = useToggle();
  const showDetails = (id: string) => {
    toggleModal();
    setRespondentId(id);
  };
  const { filteredColumns, ColumnTransfer } =
    useColumnFiltered({
      columns: getColumns({ toggleModal: showDetails }),
    });

  return (
    <>
      <Card
        loading={isLoading}
        title={
          <IntlMessage id="compliancePortal.result.detail.respondent.title" />
        }
        className={css`
          .ant-card-body {
            padding: ${!isLoading ? '0' : '24px'};
          }
        `}
        extra={ColumnTransfer}
      >
        <Divider className="mb-0" />
        <Table
          rowKey="ObjectUUID"
          columns={filteredColumns}
          dataSource={respondents}
        />
      </Card>
      <Modal
        open={openModal}
        onCancel={() => toggleModal()}
        title={
          <IntlMessage id="compliancePortal.result.detail.respondent.view.title" />
        }
        width={1000}
        footer={null}
      >
        <RespondentDetail
          assessmentId={assessmentId}
          respondentId={respondentId}
        />
      </Modal>
    </>
  );
};
